import type { Ctx } from "./ctx";
import type { AutoModel } from "./automations";
import { domainOf, entityName } from "./entities";
import { dashboardEntities } from "./chips";
import { uid } from "./config";

export interface Habit {
  entity: string;
  kind: "on" | "off";
  at: string; // HH:MM
  days: number; // how many of the last 14 days it happened around then
  model: AutoModel;
}

const DOMAINS = ["light", "switch", "fan", "cover", "climate", "media_player"];
const DAYS = 14;
const WINDOW = 20; // minutes either side that still count as "the same time"
const DISMISSED = "smartnest-habits-dismissed";

const onLike = (d: string, s: string) => (d === "cover" ? s === "open" : d === "climate" ? s !== "off" : d === "media_player" ? s === "playing" || s === "on" : s === "on");

export function dismissed(): string[] {
  try {
    return JSON.parse(localStorage.getItem(DISMISSED) ?? "[]");
  } catch {
    return [];
  }
}

export function dismiss(key: string) {
  try {
    localStorage.setItem(DISMISSED, JSON.stringify([...dismissed(), key].slice(-100)));
  } catch {
    /* fine: may be suggested again */
  }
}

export const habitKey = (h: Pick<Habit, "entity" | "kind" | "at">) => `${h.entity}|${h.kind}|${h.at.slice(0, 2)}`;

/**
 * Looks at two weeks of history for the devices on the dashboard and finds what the family does by hand at about
 * the same time most days: "the living room light goes off around 23:10". Each one becomes a ready automation.
 */
export async function findHabits(ctx: Ctx, existing: AutoModel[]): Promise<Habit[]> {
  const { hass, config, t } = ctx;
  const ids = dashboardEntities(config)
    .filter((id) => {
      const reg = hass.entities?.[id];
      // The wall tablet's own switches and technical entities aren't habits.
      return DOMAINS.includes(domainOf(id)) && hass.states[id] && reg?.platform !== "fully_kiosk" && !reg?.entity_category;
    })
    .slice(0, 40);
  if (!ids.length) return [];
  const end = new Date();
  const start = new Date(end.getTime() - DAYS * 86_400_000);
  let hist: Record<string, { s: string; lu: number }[]>;
  try {
    hist = await hass.callWS({
      type: "history/history_during_period",
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      entity_ids: ids,
      minimal_response: true,
      no_attributes: true,
      significant_changes_only: false,
    });
  } catch {
    return [];
  }
  const taken = new Set(existing.flatMap((m) => m.actions.map((a) => ("entity" in a ? a.entity : ""))));
  const skip = new Set(dismissed());
  const out: Habit[] = [];
  for (const id of ids) {
    if (taken.has(id)) continue;
    const d = domainOf(id);
    const rows = hist[id] ?? [];
    for (const kind of ["on", "off"] as const) {
      // Minutes past midnight of each change, one list per day.
      const byDay = new Map<string, number[]>();
      let prev: boolean | undefined;
      for (const r of rows) {
        const on = onLike(d, r.s);
        if (r.s === "unavailable" || r.s === "unknown") continue;
        if (prev !== undefined && on !== prev && (kind === "on") === on) {
          const at = new Date(r.lu * 1000);
          const k = at.toDateString();
          byDay.set(k, [...(byDay.get(k) ?? []), at.getHours() * 60 + at.getMinutes()]);
        }
        prev = on;
      }
      if (byDay.size < 5) continue;
      const all = [...byDay.values()].flat();
      let best = { center: 0, days: 0 };
      for (const c of all) {
        const days = [...byDay.values()].filter((list) => list.some((m) => Math.abs(m - c) <= WINDOW)).length;
        if (days > best.days) best = { center: c, days };
      }
      if (best.days < 5) continue;
      // The typical time is the median of the matching changes, rounded to 5 minutes.
      const near = all.filter((m) => Math.abs(m - best.center) <= WINDOW).sort((a, b) => a - b);
      const mid = Math.round(near[Math.floor(near.length / 2)] / 5) * 5;
      const at = `${String(Math.floor(mid / 60) % 24).padStart(2, "0")}:${String(mid % 60).padStart(2, "0")}`;
      const key = habitKey({ entity: id, kind, at });
      if (skip.has(key)) continue;
      const name = entityName(hass, config, id);
      out.push({
        entity: id,
        kind,
        at,
        days: best.days,
        model: {
          id: uid(),
          name: `${name} · ${t(kind === "on" ? "on" : "off")} ${at}`,
          trigger: { kind: "time", at },
          days: [],
          actions: [{ kind, entity: id }],
        },
      });
    }
  }
  return out.sort((a, b) => b.days - a.days).slice(0, 6);
}
