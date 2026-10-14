import { html, nothing } from "lit";
import type { Ctx } from "./ctx";
import type { Settings } from "./types";
import { domainOf } from "./entities";
import { loadKv, saveKv } from "./kv";

const mins = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};
const inside = (now: number, from: string, to: string) => {
  const a = mins(from);
  const b = mins(to);
  return a <= b ? now >= a && now < b : now >= a || now < b;
};

/** Where we are in the day's tariff: "peak", "cheap", or nothing special. */
export function tariffNow(s: Settings["tou"], at = new Date()): "peak" | "cheap" | undefined {
  if (!s?.enabled) return undefined;
  const now = at.getHours() * 60 + at.getMinutes();
  if (inside(now, s.peak_from, s.peak_to)) return "peak";
  if (inside(now, s.cheap_from, s.cheap_to)) return "cheap";
  return undefined;
}

/** The next start of the cheap hours, as epoch seconds. */
function nextCheap(s: Settings["tou"]): number {
  const d = new Date();
  const [h, m] = s.cheap_from.split(":").map(Number);
  d.setHours(h, m, 0, 0);
  if (d.getTime() <= Date.now()) d.setDate(d.getDate() + 1);
  return Math.floor(d.getTime() / 1000);
}

/** "Run it at 23:00 when power is cheap": a button in a switch's window. The hub starts it. */
export function laterButton(ctx: Ctx, entity: string) {
  const s = ctx.config.settings.tou;
  if (!s?.enabled || !ctx.allows("tou") || domainOf(entity) !== "switch" || tariffNow(s) === "cheap") return nothing;
  return html`<button
    class="btn pressable"
    style="margin-top:8px"
    @click=${async () => {
      const cur = (await loadKv<{ jobs: { id: string; entity: string; at: number }[] }>(ctx.hass, "later")) ?? { jobs: [] };
      const jobs = [...cur.jobs.filter((j) => j.entity !== entity), { id: String(Date.now()), entity, at: nextCheap(s) }];
      await saveKv(ctx.hass, "later", { jobs }).catch(() => undefined);
      ctx.toast(ctx.t("tou_scheduled", { at: s.cheap_from }));
    }}
  >
    🌙 ${ctx.t("tou_later", { at: s.cheap_from })}
  </button>`;
}
