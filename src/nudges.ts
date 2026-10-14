import type { Ctx } from "./ctx";
import type { HassEntity } from "./types";
import { areaOf, entityName } from "./entities";

export interface Nudge {
  key: string;
  icon: string;
  text: string;
  action: string;
  run: () => Promise<unknown>;
  /** devices it changes, so it can be undone */
  ids: string[];
}

const minsSince = (iso: string) => (Date.now() - Date.parse(iso)) / 60_000;
const visible = (ctx: Ctx, e: HassEntity) => !ctx.hass.entities?.[e.entity_id]?.entity_category && !ctx.hass.entities?.[e.entity_id]?.hidden;

/**
 * A gentle "you probably want this": the house noticing something wasteful and offering the fix in one tap.
 * Never acts on its own; one at a time; each can be waved away for an hour.
 */
export function findNudge(ctx: Ctx, dismissed: (key: string) => boolean): Nudge | undefined {
  const { hass, t, config } = ctx;
  const all = Object.values(hass.states).filter((e) => visible(ctx, e));
  const name = (id: string) => entityName(hass, config, id);
  const out: Nudge[] = [];

  // 1. A window or door open for a few minutes while the AC in the same room runs.
  const acs = all.filter((e) => e.entity_id.startsWith("climate.") && !["off", "unavailable"].includes(e.state));
  const openings = all.filter(
    (e) => e.entity_id.startsWith("binary_sensor.") && ["window", "door", "opening"].includes(e.attributes.device_class) && e.state === "on" && minsSince(e.last_changed) >= 3
  );
  for (const ac of acs) {
    const room = areaOf(hass, ac.entity_id);
    const win = openings.find((o) => room && areaOf(hass, o.entity_id) === room);
    if (win) out.push({ key: `win-${ac.entity_id}`, icon: "window-open", text: t("nudge_window_ac", { win: name(win.entity_id), ac: name(ac.entity_id) }), action: t("nudge_ac_off"), ids: [ac.entity_id], run: () => hass.callService("climate", "turn_off", { entity_id: ac.entity_id }) });
  }

  // 2. Everybody left and lights are still on.
  const people = all.filter((e) => e.entity_id.startsWith("person."));
  const lightsOn = all.filter((e) => e.entity_id.startsWith("light.") && e.state === "on").map((e) => e.entity_id);
  if (people.length && people.every((p) => p.state !== "home") && lightsOn.length && people.every((p) => minsSince(p.last_changed) >= 5))
    out.push({ key: "away-lights", icon: "home-export-outline", text: t("nudge_away_lights", { n: lightsOn.length }), action: t("nudge_lights_off"), ids: lightsOn, run: () => hass.callService("light", "turn_off", { entity_id: lightsOn }) });

  // 3. A room's light on with no movement there for half an hour.
  const motions = all.filter((e) => e.entity_id.startsWith("binary_sensor.") && ["motion", "occupancy", "presence"].includes(e.attributes.device_class));
  for (const id of lightsOn) {
    const room = areaOf(hass, id);
    const here = room ? motions.filter((m) => areaOf(hass, m.entity_id) === room) : [];
    if (here.length && here.every((m) => m.state === "off" && minsSince(m.last_changed) >= 30) && minsSince(hass.states[id].last_changed) >= 30) {
      out.push({ key: `idle-${id}`, icon: "lightbulb-off-outline", text: t("nudge_idle_light", { light: name(id), room: hass.areas?.[room!]?.name ?? "" }), action: t("nudge_turn_off"), ids: [id], run: () => hass.callService("light", "turn_off", { entity_id: id }) });
      break;
    }
  }

  // 4. A TV playing to an empty house.
  const tv = all.find((e) => e.entity_id.startsWith("media_player.") && ["playing", "on"].includes(e.state) && e.attributes.device_class === "tv");
  if (tv && people.length && people.every((p) => p.state !== "home"))
    out.push({ key: `tv-${tv.entity_id}`, icon: "television-off", text: t("nudge_tv", { tv: name(tv.entity_id) }), action: t("nudge_turn_off"), ids: [], run: () => hass.callService("media_player", "turn_off", { entity_id: tv.entity_id }) });

  return out.find((n) => !dismissed(n.key));
}

const KEY = "smartnest-nudges";

export function nudgeDismissed(key: string): boolean {
  try {
    const until = JSON.parse(localStorage.getItem(KEY) ?? "{}")[key];
    return !!until && until > Date.now();
  } catch {
    return false;
  }
}

export function dismissNudge(key: string) {
  try {
    const m = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    m[key] = Date.now() + 3600_000;
    localStorage.setItem(KEY, JSON.stringify(m));
  } catch {
    /* per screen */
  }
}
