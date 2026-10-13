import { html } from "lit";
import type { Ctx } from "./ctx";
import type { DashboardConfig, HassEntity } from "./types";
import { domainOf, entityIcon, entityName, formatNumber, isNumericSensor, ltr, stateLabel, toneStyle } from "./entities";
import type { I18nKey } from "./i18n";
import { MODES, MODE_SELECT, modeScript } from "./widgets/modes";
import "./ui/icon";

export type ChipType = "mode" | "alert" | "unlocked" | "open" | "lights" | "climate" | "motion" | "power";
export const CHIP_TYPES: { id: ChipType; label: I18nKey }[] = [
  { id: "mode", label: "widget_modes" },
  { id: "alert", label: "chip_t_alert" },
  { id: "unlocked", label: "chip_t_unlocked" },
  { id: "open", label: "chip_t_open" },
  { id: "lights", label: "chip_t_lights" },
  { id: "climate", label: "chip_t_climate" },
  { id: "motion", label: "chip_t_motion" },
  { id: "power", label: "chip_t_power" },
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
                navigator.vibrate?.(10);
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
