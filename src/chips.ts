import { html } from "lit";
import type { Ctx } from "./ctx";
import type { DashboardConfig, HassEntity } from "./types";
import { domainOf, entityIcon, entityName, formatNumber, isNumericSensor, ltr, stateLabel, toneStyle } from "./entities";
import type { I18nKey } from "./i18n";
import { MODES, MODE_SELECT, modeScript } from "./widgets/modes";
import "./ui/icon";
import { tariffNow } from "./tou";
import { haptic } from "./ui/haptic";

export type ChipType = "mode" | "alert" | "unlocked" | "open" | "lights" | "climate" | "motion" | "power" | "package" | "travel" | "appliance" | "arrival" | "outage" | "tou";
export const CHIP_TYPES: { id: ChipType; label: I18nKey }[] = [
  { id: "mode", label: "widget_modes" },
  { id: "alert", label: "chip_t_alert" },
  { id: "unlocked", label: "chip_t_unlocked" },
  { id: "open", label: "chip_t_open" },
  { id: "lights", label: "chip_t_lights" },
  { id: "climate", label: "chip_t_climate" },
  { id: "motion", label: "chip_t_motion" },
  { id: "power", label: "chip_t_power" },
  { id: "package", label: "chip_t_package" },
  { id: "travel", label: "travel" },
  { id: "appliance", label: "h_appliances" },
  { id: "arrival", label: "h_arrival" },
  { id: "outage", label: "h_outage" },
  { id: "tou", label: "tou" },
];

export interface Chip {
  type: ChipType;
  icon: string;
  label: string;
  tone: "neutral" | "accent" | "alert" | "cool";
  entities: string[];
  bulk?: "off" | "lock";
}

/** Every device the installer put on the dashboard. Counting only these keeps "3 lights on" matching what the family sees. */
export function dashboardEntities(config: DashboardConfig): string[] {
  const out = new Set<string>();
  for (const p of config.pages)
    for (const w of p.widgets) {
      if (w.config.entity) out.add(w.config.entity);
      for (const f of w.config.floors ?? []) for (const m of f.markers ?? []) out.add(m.entity);
    }
  return [...out];
}

const dc = (e: HassEntity) => e.attributes.device_class as string | undefined;
const n2 = (t: Ctx["t"], one: I18nKey, many: I18nKey, list: string[], vars: Record<string, string | number> = {}) =>
  list.length === 1 ? t(one, vars) : t(many, { n: list.length, ...vars });

export function buildChips(ctx: Ctx): Chip[] {
  const { hass, t, config } = ctx;
  const hidden = new Set(config.settings.chips_hidden);
  const ids = dashboardEntities(config).filter((id) => hass.states[id]);
  const st = (id: string) => hass.states[id]!;
  const pick = (fn: (e: HassEntity) => boolean) => ids.filter((id) => fn(st(id)));
  const chips: Chip[] = [];

  if (hass.states["switch.smartnest_travel_mode"]?.state === "on" && ctx.allows("travel"))
    chips.push({ type: "travel", icon: "airplane", label: t("travel_on"), tone: "accent", entities: [] });

  // A parcel at the door: Frigate's package count, or any "package" sensor.
  const parcels = Object.values(hass.states).filter((e) => {
    const id = e.entity_id;
    if (!/package|parcel/.test(id)) return false;
    return (id.startsWith("binary_sensor.") && e.state === "on") || (id.startsWith("sensor.") && Number(e.state) > 0);
  });
  if (parcels.length && ctx.allows("package")) chips.push({ type: "package", icon: "package", label: t("chip_package"), tone: "accent", entities: parcels.map((e) => e.entity_id) });

  // The power is out (battery or generator running the house).
  const out = config.settings.outage?.sensor ? hass.states[config.settings.outage.sensor] : undefined;
  if (out && ctx.allows("home_helpers")) {
    const v = Number(out.state);
    const down = domainOf(out.entity_id) === "binary_sensor" ? out.state === "off" : !Number.isNaN(v) && v < (config.settings.outage.below ?? 50);
    if (down) chips.push({ type: "outage", icon: "power-plug-off", label: t("chip_outage"), tone: "alert", entities: [out.entity_id] });
  }

  // A washer or dishwasher in the middle of a cycle.
  for (const a of config.settings.appliances ?? []) {
    const w = Number(hass.states[a.power]?.state);
    if (!Number.isNaN(w) && w >= (a.start_w ?? 15) && ctx.allows("home_helpers"))
      chips.push({ type: "appliance", icon: "washing-machine", label: t("chip_running", { name: a.name }), tone: "neutral", entities: [a.power] });
  }

  // Someone on the way home (the Proximity integration): "back in ~12 min".
  if (ctx.allows("home_helpers"))
    for (const dir of Object.values(hass.states).filter((e) => e.entity_id.endsWith("_direction_of_travel") && e.state === "towards")) {
      const base = dir.entity_id.replace(/_direction_of_travel$/, "");
      const dist = hass.states[`${base}_distance`];
      const km = Number(dist?.state) / (dist?.attributes.unit_of_measurement === "m" ? 1000 : 1);
      if (!dist || Number.isNaN(km) || km > 40 || km < 0.3) continue;
      const person = Object.values(hass.states).find((p) => p.entity_id.startsWith("person.") && base.endsWith(p.entity_id.split(".")[1]));
      const who = person?.attributes.friendly_name ?? String(dist.attributes.friendly_name ?? "").replace(/distance|home|المسافة/gi, "").trim();
      chips.push({ type: "arrival", icon: "car", label: t("chip_arriving", { name: who, n: Math.max(1, Math.round(km / 0.6)) }), tone: "cool", entities: [dist.entity_id] });
    }

  const tariff = ctx.allows("tou") ? tariffNow(config.settings.tou) : undefined;
  if (tariff) chips.push({ type: "tou", icon: tariff === "peak" ? "lightning-bolt" : "weather-night", label: t(tariff === "peak" ? "chip_peak" : "chip_cheap"), tone: tariff === "peak" ? "alert" : "cool", entities: [] });

  const mode = hass.states[MODE_SELECT]?.state;
  const m = MODES.find((x) => x.id === mode);
  if (m && hass.states[modeScript(m.id)]) chips.push({ type: "mode", icon: m.icon, label: t(m.label), tone: "accent", entities: [] });

  const alerts = pick((e) => domainOf(e.entity_id) === "binary_sensor" && e.state === "on" && ["moisture", "smoke", "gas", "carbon_monoxide", "problem", "safety"].includes(dc(e) ?? ""));
  if (alerts.length) chips.push({ type: "alert", icon: "alert-circle-outline", label: alerts.length === 1 ? entityName(hass, config, alerts[0]) : t("chip_alert"), tone: "alert", entities: alerts });

  const unlocked = pick((e) => domainOf(e.entity_id) === "lock" && (e.state === "unlocked" || e.state === "open" || e.state === "jammed"));
  if (unlocked.length) chips.push({ type: "unlocked", icon: "lock-open", label: n2(t, "chip_unlocked_1", "chip_unlocked_n", unlocked), tone: "alert", entities: unlocked, bulk: "lock" });

  const open = pick((e) => {
    const d = domainOf(e.entity_id);
    if (d === "cover") return e.state === "open" && ["door", "window", "garage", "gate"].includes(dc(e) ?? "");
    return d === "binary_sensor" && e.state === "on" && ["door", "window", "opening", "garage_door"].includes(dc(e) ?? "");
  });
  if (open.length) chips.push({ type: "open", icon: "door-open", label: n2(t, "chip_open_1", "chip_open_n", open), tone: "accent", entities: open });

  const lights = pick((e) => domainOf(e.entity_id) === "light" && e.state === "on");
  if (lights.length) chips.push({ type: "lights", icon: "lightbulb", label: n2(t, "chip_lights_1", "chip_lights_n", lights), tone: "accent", entities: lights, bulk: "off" });

  const ac = pick((e) => domainOf(e.entity_id) === "climate" && e.state !== "off" && e.state !== "unavailable");
  if (ac.length) {
    const temp = st(ac[0]).attributes.temperature;
    const vars = { temp: typeof temp === "number" ? ltr(`${formatNumber(temp, ctx.lang)}°`) : "" };
    chips.push({ type: "climate", icon: "air-conditioner", label: n2(t, "chip_climate_1", "chip_climate_n", ac, vars), tone: "cool", entities: ac, bulk: "off" });
  }

  const motion = pick((e) => domainOf(e.entity_id) === "binary_sensor" && e.state === "on" && ["motion", "occupancy", "presence"].includes(dc(e) ?? ""));
  if (motion.length) chips.push({ type: "motion", icon: "motion-sensor", label: motion.length === 1 ? entityName(hass, config, motion[0]) : t("chip_motion"), tone: "accent", entities: motion });

  const powerId = config.settings.power_entity ?? ids.find((id) => dc(st(id)) === "power" && isNumericSensor(st(id)));
  const power = powerId ? hass.states[powerId] : undefined;
  if (power && isNumericSensor(power)) chips.push({ type: "power", icon: "lightning-bolt", label: stateLabel(t, power, ctx.lang), tone: "neutral", entities: [power.entity_id] });

  return chips.filter((c) => !hidden.has(c.type));
}

/** The sheet behind a chip: the devices it counted, each tappable, with "turn all off" / "lock all". Never "unlock all". */
export function chipSheet(ctx: Ctx, type: ChipType) {
  ctx.showSheet({
    title: CHIP_TYPES.find((c) => c.id === type) ? ctx.t(CHIP_TYPES.find((c) => c.id === type)!.label) : "",
    render: (c) => {
      const chip = buildChips(c).find((x) => x.type === type);
      if (!chip || !chip.entities.length) return html`<p class="muted" style="text-align:center">✓</p>`;
      return html`<div style="display:grid;gap:12px">
        ${chip.bulk
          ? html`<button
              class="btn primary pressable"
              @click=${() => {
                haptic("press");
                const ids = chip.entities;
                const call = chip.bulk === "lock" ? c.hass.callService("lock", "lock", { entity_id: ids }) : c.hass.callService("homeassistant", "turn_off", { entity_id: ids });
                call.catch(() => c.toast(c.t("error")));
              }}
            >
              <sn-icon .icon=${chip.bulk === "lock" ? "lock" : "power"} style="--icon-size:20px"></sn-icon>${c.t(chip.bulk === "lock" ? "lock_all" : "turn_all_off")}
            </button>`
          : null}
        ${chip.entities.map((id) => {
          const e = c.hass.states[id];
          return html`<button
            class="glass pressable"
            style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:var(--r-md);text-align:start"
            @click=${() => c.openEntity(id)}
          >
            <span
              style="display:grid;place-items:center;width:40px;height:40px;border-radius:999px;background:var(--tone);color:var(--on-tone);${toneStyle(e)}"
            >
              <sn-icon .icon=${entityIcon(e, id)} style="--icon-size:20px"></sn-icon>
            </span>
            <span style="flex:1;font-weight:500">${entityName(c.hass, c.config, id)}</span>
            <span class="muted" style="font-size:14px;unicode-bidi:plaintext">${stateLabel(c.t, e, c.lang)}</span>
          </button>`;
        })}
      </div>`;
    },
  });
}
