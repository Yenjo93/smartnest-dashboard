import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { LOCALE, type I18nKey } from "../i18n";
import { hijri } from "../season";
import { shared } from "../theme";
import "../ui/icon";

interface Countdown {
  title: string;
  date: Date;
  icon: string;
}

const DAY = 86_400_000;
const midnight = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** Next 1 Ramadan, 1 Shawwal and 10 Dhu al-Hijjah, found by walking the Umm al-Qura calendar day by day. */
function islamicDates(t: Ctx["t"]): Countdown[] {
  const want: [number, number, I18nKey, string][] = [
    [9, 1, "next_ramadan", "night"],
    [10, 1, "next_eid", "palette"],
    [12, 10, "next_adha", "palette"],
  ];
  const out: Countdown[] = [];
  const start = midnight(new Date());
  for (let i = 0; i < 400 && out.length < want.length; i++) {
    const d = new Date(start.getTime() + i * DAY);
    const h = hijri(d);
    const hit = h && want.find(([m, day]) => h.month === m && h.day === day);
    if (hit && !out.some((o) => o.title === t(hit[2]))) out.push({ title: t(hit[2]), date: d, icon: hit[3] });
  }
  return out;
}

/** Days until what the family is waiting for: birthdays, trips, and (in Arabic) Ramadan and the Eids. */
@customElement("sn-w-countdown")
export class SnCountdown extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;

  static styles = [
    shared,
    css`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        align-content: start;
        gap: 10px;
        overflow: auto;
      }
      h3 {
        margin: 0;
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 16px;
        --icon-size: 20px;
      }
      h3 sn-icon {
        color: var(--accent-text);
      }
      .row {
        display: flex;
        align-items: center;
        gap: 12px;
        animation: in 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .n {
        min-width: 58px;
        text-align: center;
        padding: 6px 10px;
        border-radius: 12px;
        background: var(--surface-2);
        font-weight: 800;
        font-size: 20px;
        line-height: 1;
        font-variant-numeric: tabular-nums;
      }
      .n small {
        display: block;
        font-size: 10px;
        font-weight: 500;
        color: var(--text-2);
      }
      .n.now {
        background: var(--accent);
        color: var(--on-accent);
      }
      .t {
        display: grid;
        font-weight: 500;
      }
      .t span {
        font-size: 12px;
        color: var(--text-2);
        font-weight: 400;
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
    `,
  ];

  render() {
    const { ctx } = this;
    const loc = LOCALE[ctx.lang];
    const today = midnight(new Date());
    const mine: Countdown[] = ((this.widget.config.events ?? []) as { title: string; date: string; yearly?: boolean }[])
      .map((e) => {
        let d = new Date(`${e.date}T00:00:00`);
        // Birthdays and anniversaries roll over to next year once they've passed.
        if (e.yearly !== false) while (d < today) d = new Date(d.getFullYear() + 1, d.getMonth(), d.getDate());
        return { title: e.title, date: d, icon: "calendar" };
      })
      .filter((e) => e.date >= today);
    const islamic = this.widget.config.islamic ?? ctx.lang === "ar" ? islamicDates(ctx.t) : [];
    const list = [...mine, ...islamic].sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 5);
    return html`<div class="card glass">
      <h3><sn-icon icon="countdown"></sn-icon>${ctx.t("widget_countdown")}</h3>
      ${list.map((e, i) => {
        const days = Math.round((e.date.getTime() - today.getTime()) / DAY);
        return html`<div class="row" style="animation-delay:${i * 50}ms">
          <span class="n ${days === 0 ? "now" : ""}">${days === 0 ? "🎉" : days}${days ? html`<small>${ctx.t("days_left", { n: "" }).trim()}</small>` : nothing}</span>
          <span class="t">${e.title}<span>${days === 0 ? ctx.t("today_event") : e.date.toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "long" })}</span></span>
        </div>`;
      })}
    </div>`;
  }
}
