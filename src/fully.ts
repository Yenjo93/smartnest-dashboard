// Drives the wall tablet through Home Assistant's Fully Kiosk Browser integration.
//
// Only the copy of the dashboard running *inside* Fully acts, otherwise a phone with the dashboard open would
// dim the tablet too. Fully exposes `window.fully` when its JavaScript Interface is enabled (Fully PLUS:
// Settings → Advanced Web Settings → Enable JavaScript Interface); that's how this screen recognises itself.
import type { Hass } from "./types";

declare global {
  interface Window {
    fully?: { getDeviceId?: () => string };
  }
}

export interface Tablet {
  deviceId: string;
  name: string;
  screen?: string; // switch: screen on/off
  brightness?: string; // number: 0..255
  motion?: string; // switch: wake on camera motion
  media?: string; // media_player: plays sounds on the tablet speaker
}

const ROLES: [keyof Omit<Tablet, "deviceId" | "name">, string, RegExp][] = [
  ["screen", "switch", /(^|_)screen$/],
  ["brightness", "number", /screen_brightness$/],
  ["motion", "switch", /motion_detection$/],
  ["media", "media_player", /.*/],
];

/** Every Fully tablet HA knows, with its entities sorted by job. */
export function findTablets(hass: Hass): Tablet[] {
  const byDevice = new Map<string, Tablet>();
  for (const reg of Object.values(hass.entities ?? {})) {
    if (reg.platform !== "fully_kiosk" || !reg.device_id) continue;
    let tab = byDevice.get(reg.device_id);
    if (!tab) {
      tab = { deviceId: reg.device_id, name: hass.devices?.[reg.device_id]?.name ?? "Tablet" };
      byDevice.set(reg.device_id, tab);
    }
    const [domain, object] = reg.entity_id.split(".");
    const key = reg.translation_key ?? object;
    for (const [role, d, re] of ROLES) {
      if (domain === d && !tab[role] && (re.test(key) || re.test(object))) {
        tab[role] = reg.entity_id;
        break;
      }
    }
  }
  return [...byDevice.values()];
}

/** The tablet this dashboard is running on, or undefined on phones, laptops and non-Fully browsers. */
export function thisTablet(hass: Hass): Tablet | undefined {
  const fully = window.fully;
  if (!fully) return undefined;
  const tablets = findTablets(hass);
  const id = fully.getDeviceId?.();
  if (id) {
    const match = tablets.find((t) => hass.devices?.[t.deviceId]?.identifiers?.some(([dom, ident]) => dom === "fully_kiosk" && ident === id));
    if (match) return match;
  }
  // One tablet in the house (the usual case): it must be us.
  return tablets.length === 1 ? tablets[0] : undefined;
}

const pct255 = (pct: number) => Math.round((Math.min(100, Math.max(1, pct)) / 100) * 255);

export async function setBrightness(hass: Hass, tab: Tablet, pct: number) {
  if (!tab.brightness) return;
  const target = pct255(pct);
  if (Math.abs(Number(hass.states[tab.brightness]?.state) - target) <= 3) return;
  await hass.callService("number", "set_value", { entity_id: tab.brightness, value: target });
}

export async function setScreen(hass: Hass, tab: Tablet, on: boolean) {
  if (!tab.screen) return;
  if ((hass.states[tab.screen]?.state === "on") === on) return;
  await hass.callService("switch", on ? "turn_on" : "turn_off", { entity_id: tab.screen });
}

export async function setMotionWake(hass: Hass, tab: Tablet, on: boolean) {
  if (!tab.motion) return;
  if ((hass.states[tab.motion]?.state === "on") === on) return;
  await hass.callService("switch", on ? "turn_on" : "turn_off", { entity_id: tab.motion });
}

/** Plays a sound on the tablet's own speaker: works even when the browser would block autoplay. */
export async function playSound(hass: Hass, tab: Tablet, url: string) {
  if (!tab.media) return false;
  await hass.callService("media_player", "play_media", {
    entity_id: tab.media,
    media_content_id: url,
    media_content_type: "music",
  });
  return true;
}
