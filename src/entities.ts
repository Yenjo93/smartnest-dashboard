import type { DashboardConfig, Hass, HassEntity, Lang } from "./types";
import { hasKey, LOCALE, type Translate } from "./i18n";
import { ICONS } from "./icons";
import { onColor, rgbHex } from "./color";

export const domainOf = (entityId: string) => entityId.split(".")[0];

export function entityName(hass: Hass, config: DashboardConfig, entityId: string): string {
  return config.names[entityId] || hass.states[entityId]?.attributes.friendly_name || entityId;
}

const dc = (e: HassEntity) => e.attributes.device_class as string | undefined;

/** "Active" is what lights the tile up: on, open, running, motion seen. */
export function isActive(e: HassEntity | undefined): boolean {
  if (!e) return false;
  const d = domainOf(e.entity_id);
  switch (d) {
    case "climate":
      return e.state !== "off" && e.state !== "unavailable";
    case "vacuum":
      return e.state === "cleaning" || e.state === "returning";
    case "lock":
      return e.state === "unlocked" || e.state === "open" || e.state === "jammed";
    case "cover":
      return e.state === "open" || e.state === "opening" || e.state === "closing";
    case "media_player":
      return e.state === "playing" || e.state === "on";
    case "camera":
      return e.state === "streaming" || e.state === "recording";
    case "alarm_control_panel":
      return e.state.startsWith("armed") || e.state === "triggered" || e.state === "pending" || e.state === "arming";
    case "sensor":
    case "event":
      return false;
    default:
      return e.state === "on" || e.state === "open" || e.state === "home";
  }
}

export type Tone = "accent" | "cool" | "alert";

export function activeTone(e: HassEntity): Tone {
  const d = domainOf(e.entity_id);
  if (d === "climate" && (e.state === "cool" || e.attributes.hvac_action === "cooling")) return "cool";
  if (d === "binary_sensor" && ["smoke", "moisture", "gas", "carbon_monoxide", "problem", "safety"].includes(dc(e) ?? "")) return "alert";
  if (d === "lock" && e.state === "jammed") return "alert";
  if (d === "alarm_control_panel" && e.state === "triggered") return "alert";
  return "accent";
}

/** CSS vars for the "on" colour: a coloured light shows its own colour, everything else its tone. */
export function toneStyle(e: HassEntity | undefined): string {
  const rgb: number[] | undefined = e && domainOf(e.entity_id) === "light" && e.state === "on" ? e.attributes.rgb_color : undefined;
  if (rgb?.length === 3) return `--tone:rgb(${rgb.join(",")});--on-tone:${onColor(rgbHex(rgb))}`;
  const tone = e ? activeTone(e) : "accent";
  return `--tone:var(--${tone});--on-tone:var(--on-${tone})`;
}

/** Returns a key into ICONS. Respects a custom `mdi:` icon from HA when we bundle it. */
export function entityIcon(e: HassEntity | undefined, entityId: string): string {
  const custom = e?.attributes.icon as string | undefined;
  if (custom?.startsWith("mdi:")) {
    const key = custom.slice(4);
    if (ICONS[key]) return key;
    if (customElements.get("ha-icon")) return custom; // rendered by HA's own icon element
  }
  const d = domainOf(entityId);
  const on = isActive(e);
  const cls = e ? dc(e) : undefined;
  switch (d) {
    case "light":
      return on ? "lightbulb" : "lightbulb-outline";
    case "switch":
    case "input_boolean":
      if (cls === "outlet") return on ? "power-plug" : "power-plug-off";
      return on ? "toggle-on" : "toggle-off";
    case "fan":
      return on ? "fan" : "fan-off";
    case "climate":
      return e?.state === "cool" ? "snowflake" : "air-conditioner";
    case "vacuum":
      return "robot-vacuum";
    case "camera":
      return "cctv";
    case "lock":
      return on ? "lock-open" : "lock";
    case "cover":
      if (cls === "garage") return on ? "garage-open" : "garage";
      if (cls === "window") return on ? "window-open" : "window-closed";
      if (cls === "curtain") return "curtains";
      if (cls === "door") return on ? "door-open" : "door-closed";
      return on ? "blinds" : "blinds-closed";
    case "binary_sensor":
      if (cls === "motion" || cls === "occupancy" || cls === "presence") return on ? "motion-sensor" : "motion-sensor-off";
      if (cls === "door" || cls === "opening") return on ? "door-open" : "door-closed";
      if (cls === "window") return on ? "window-open" : "window-closed";
      if (cls === "garage_door") return on ? "garage-open" : "garage";
      if (cls === "moisture") return "leak";
      if (cls === "smoke" || cls === "heat") return "fire";
      return "eye";
    case "sensor":
      if (cls === "temperature") return "thermometer";
      if (cls === "humidity") return "humidity";
      if (cls === "power" || cls === "energy" || cls === "current" || cls === "voltage") return "lightning-bolt";
      if (cls === "battery") return "battery";
      return "gauge";
    case "event":
      return cls === "doorbell" ? "doorbell" : "bell";
    case "alarm_control_panel":
      return "shield-home";
    case "media_player":
      return cls === "speaker" ? "speaker" : "television";
    case "scene":
      return "palette";
    case "script":
    case "button":
    case "input_button":
      return "play-circle";
    default:
      return "grid";
  }
}

export type TapKind = "toggle" | "run" | "sheet";

// Locks, alarms and cameras never act on a single tap: a misplaced touch must not open the front door.
export function tapKind(entityId: string): TapKind {
  const d = domainOf(entityId);
  if (["scene", "script", "button", "input_button"].includes(d)) return "run";
  if (["light", "switch", "fan", "input_boolean", "automation", "media_player", "climate", "cover", "vacuum", "humidifier", "siren"].includes(d))
    return "toggle";
  return "sheet";
}

// ---- instant feedback ----
// A tapped light shows its new state at once; Home Assistant confirms (or not) a moment later. If the device doesn't
// follow within a few seconds, or the call fails, the real state shows again.
const guesses = new Map<string, { state: string; from: string; until: number }>();
const FLIPS = ["light", "switch", "fan", "input_boolean", "siren", "humidifier"];

/** The state to draw: the real one, or what a tap just asked for while Home Assistant catches up. */
export function seen(e: HassEntity | undefined): HassEntity | undefined {
  if (!e) return e;
  const g = guesses.get(e.entity_id);
  if (!g) return e;
  if (e.last_updated !== g.from || Date.now() > g.until) {
    guesses.delete(e.entity_id);
    return e;
  }
  return { ...e, state: g.state };
}

export const GUESS_MS = 4000;

export async function runTap(hass: Hass, e: HassEntity): Promise<void> {
  const id = e.entity_id;
  const d = domainOf(id);
  const target = { entity_id: id };
  if (FLIPS.includes(d) && (e.state === "on" || e.state === "off")) {
    guesses.set(id, { state: e.state === "on" ? "off" : "on", from: e.last_updated, until: Date.now() + GUESS_MS });
    return hass.callService("homeassistant", "toggle", target).catch((err) => {
      guesses.delete(id);
      throw err;
    });
  }
  switch (d) {
    case "climate":
      return hass.callService("climate", e.state === "off" ? "turn_on" : "turn_off", target);
    case "vacuum":
      return hass.callService("vacuum", e.state === "cleaning" ? "return_to_base" : "start", target);
    case "cover":
      return hass.callService("cover", "toggle", target);
    case "scene":
    case "script":
      return hass.callService(d, "turn_on", target);
    case "button":
    case "input_button":
      return hass.callService(d, "press", target);
    default:
      return hass.callService("homeassistant", "toggle", target);
  }
}

/** Wraps a reading in a left-to-right isolate so "22°" or "1,840 W" never flips inside Arabic or Hebrew. */
export const ltr = (s: string) => `\u2066${s}\u2069`;

export function formatNumber(value: number, lang: Lang, digits = 1): string {
  return new Intl.NumberFormat(LOCALE[lang], { maximumFractionDigits: digits }).format(value);
}

function numericState(e: HassEntity, lang: Lang): string | undefined {
  const n = Number(e.state);
  if (e.state === "" || Number.isNaN(n)) return undefined;
  const unit = e.attributes.unit_of_measurement ?? "";
  const sep = unit === "%" || unit.startsWith("°") ? "" : " ";
  return ltr(`${formatNumber(n, lang)}${unit ? sep + unit : ""}`);
}

export function stateLabel(t: Translate, e: HassEntity | undefined, lang: Lang): string {
  if (!e) return t("unavailable");
  if (e.state === "unavailable" || e.state === "unknown") return t(e.state);
  const d = domainOf(e.entity_id);
  const cls = dc(e);
  if (d === "sensor") return numericState(e, lang) ?? (hasKey(e.state) ? t(e.state) : e.state);
  if (d === "binary_sensor") {
    const on = e.state === "on";
    if (cls === "motion" || cls === "occupancy" || cls === "presence") return t(on ? "motion" : "clear");
    if (["door", "window", "opening", "garage_door"].includes(cls ?? "")) return t(on ? "open" : "closed");
    if (["moisture", "smoke", "gas", "carbon_monoxide", "problem"].includes(cls ?? "")) return t(on ? "detected" : "clear");
    return t(on ? "on" : "off");
  }
  if (d === "light" && e.state === "on" && typeof e.attributes.brightness === "number")
    return ltr(`${Math.round((e.attributes.brightness / 255) * 100)}%`);
  if (d === "climate" && e.state !== "off") {
    const target = e.attributes.temperature;
    const mode = hasKey(e.state) ? t(e.state) : e.state;
    return typeof target === "number" ? `${mode} · ${ltr(`${formatNumber(target, lang)}°`)}` : mode;
  }
  if (d === "event") return relativeTime(t, e.state);
  if (["scene", "script", "button", "input_button"].includes(d)) return t("tap_to_run");
  if (d === "vacuum" && typeof e.attributes.battery_level === "number" && e.state === "docked")
    return `${t("docked")} · ${ltr(`${e.attributes.battery_level}%`)}`;
  return hasKey(e.state) ? t(e.state) : e.state;
}

/** Short value next to a floor-plan marker in "value" mode. */
export function shortValue(t: Translate, e: HassEntity | undefined, lang: Lang): string {
  if (!e) return "–";
  const d = domainOf(e.entity_id);
  if (d === "sensor") return numericState(e, lang) ?? e.state;
  if (d === "climate") {
    const cur = e.attributes.current_temperature;
    return typeof cur === "number" ? ltr(`${formatNumber(cur, lang)}°`) : stateLabel(t, e, lang);
  }
  if (d === "light" && e.state === "on" && typeof e.attributes.brightness === "number")
    return ltr(`${Math.round((e.attributes.brightness / 255) * 100)}%`);
  return stateLabel(t, e, lang);
}

export function relativeTime(t: Translate, iso: string): string {
  const ts = Date.parse(iso);
  if (Number.isNaN(ts)) return "–";
  const min = Math.round((Date.now() - ts) / 60000);
  if (min < 1) return t("just_now");
  if (min < 60) return t("min_ago", { n: min });
  return t("hours_ago", { n: Math.round(min / 60) });
}

export function isNumericSensor(e: HassEntity | undefined): boolean {
  return !!e && domainOf(e.entity_id) === "sensor" && e.state !== "" && !Number.isNaN(Number(e.state));
}

export interface EntityFilter {
  domains?: string[];
  deviceClasses?: string[];
}

export function listEntities(hass: Hass, config: DashboardConfig, filter: EntityFilter = {}) {
  return Object.values(hass.states)
    .filter((e) => !filter.domains || filter.domains.includes(domainOf(e.entity_id)))
    .filter((e) => !filter.deviceClasses || filter.deviceClasses.includes(dc(e) ?? ""))
    .map((e) => ({ id: e.entity_id, name: entityName(hass, config, e.entity_id), entity: e }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Which room a device is in: its own area, else its device's. */
export function areaOf(hass: Hass, id: string): string | undefined {
  const reg = hass.entities?.[id];
  return reg?.area_id ?? (reg?.device_id ? hass.devices?.[reg.device_id]?.area_id ?? undefined : undefined);
}
