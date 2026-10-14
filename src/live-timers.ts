import type { Hass, HassEntity } from "./types";

// Countdowns shown right on the tiles (like Live Activities): SmartNest's own "off in 30 minutes" timers, and the
// remaining time appliances report (washer, dryer, dishwasher, oven).

let due: Record<string, number> = {};
let last = 0;
let loading: Promise<void> | undefined;
const listeners = new Set<() => void>();

/** Tiles listen, and redraw only when the list of timers actually changed. */
export function onTimers(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** Fetches the SmartNest timers, at most every 20 s (or at once after one was just set). */
export function refreshTimers(hass: Hass, force = false): Promise<void> {
  if (loading || (!force && Date.now() - last < 20_000)) return loading ?? Promise.resolve();
  loading = hass
    .callWS<Record<string, string>>({ type: "smartnest/timer/list" })
    .then((r) => {
      const next = Object.fromEntries(Object.entries(r).map(([k, v]) => [k, Date.parse(v)]));
      last = Date.now();
      if (JSON.stringify(next) === JSON.stringify(due)) return;
      due = next;
      listeners.forEach((cb) => cb());
    })
    .catch(() => undefined)
    .finally(() => (loading = undefined));
  return loading;
}

/** Minutes left for this device, from a SmartNest timer or the appliance's own remaining-time sensor. */
export function minutesLeft(hass: Hass, id: string): { left: number; kind: "timer" | "cycle" } | undefined {
  const t = due[id];
  if (t && t > Date.now()) return { left: Math.max(1, Math.round((t - Date.now()) / 60_000)), kind: "timer" };
  const dev = hass.entities?.[id]?.device_id;
  if (!dev) return undefined;
  for (const [eid, reg] of Object.entries(hass.entities ?? {})) {
    if (reg.device_id !== dev || !eid.startsWith("sensor.")) continue;
    const e: HassEntity | undefined = hass.states[eid];
    if (!e || !/remaining|finish|end_time|time_left|program_end/i.test(eid)) continue;
    if (e.attributes.device_class === "timestamp") {
      const ms = Date.parse(e.state) - Date.now();
      if (ms > 0 && ms < 24 * 3600_000) return { left: Math.max(1, Math.round(ms / 60_000)), kind: "cycle" };
    } else {
      const n = Number(e.state);
      const unit = e.attributes.unit_of_measurement;
      const mins = unit === "h" ? n * 60 : unit === "s" ? n / 60 : n;
      if (n > 0 && mins < 24 * 60) return { left: Math.max(1, Math.round(mins)), kind: "cycle" };
    }
  }
  return undefined;
}
