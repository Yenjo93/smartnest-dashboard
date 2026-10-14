import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { LOCALE, type I18nKey } from "../i18n";
import { shared } from "../theme";
import "../ui/icon";

const NAMES = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"] as const;
type Prayer = (typeof NAMES)[number];

/** Today's times from Home Assistant's Islamic Prayer Times integration (sensor.fajr_prayer, …). */
export function prayerTimes(ctx: Ctx): { name: Prayer; at: number }[] {
  const { hass } = ctx;
  const out: { name: Prayer; at: number }[] = [];
  for (const name of NAMES) {
    const id = Object.keys(hass.states).find(
      (x) => x.startsWith("sensor.") && (hass.entities?.[x]?.platform === "islamic_prayer_times" || /prayer|salat|صلاة/i.test(x)) && x.includes(name)
    );
    const at = id ? Date.parse(hass.states[id].state) : NaN;
    if (!Number.isNaN(at)) out.push({ name, at });
  }
  return out.sort((a, b) => a.at - b.at);
}

/** The five prayers of today, the next one highlighted with how long is left. */
@customElement("sn-w-prayer")
export class SnPrayer extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private now = Date.now();
  private tick?: number;

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
        gap: 10px;
        align-content: start;
        overflow: auto;
      }
      .next {
        display: grid;
        gap: 2px;
      }
      .next span {
        font-size: 13px;
        color: var(--text-2);
      }
      .next b {
        font-size: 26px;
        font-weight: var(--display-weight, 700);
      }
      .next em {
        font-style: normal;
        color: var(--accent-text);
        font-weight: 600;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 4px;
      }
      li {
        display: flex;
        justify-content: space-between;
        padding: 8px 12px;
        border-radius: var(--r-md);
        font-size: 15px;
      }
      li.past {
        color: var(--text-2);
      }
      li.next {
        background: var(--accent);
        color: var(--on-accent);
        font-weight: 700;
      }
      li.sun {
        font-size: 13px;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.tick = window.setInterval(() => (this.now = Date.now()), 30_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.tick);
  }

  render() {
    const { ctx } = this;
    const { t, lang } = ctx;
    const list = prayerTimes(ctx);
    if (!list.length)
      return html`<div class="card glass">
        <sn-icon icon="mosque" style="--icon-size:28px;color:var(--accent-text)"></sn-icon>
        <span class="muted">${t("prayer_setup")}</span>
      </div>`;
    const next = list.find((p) => p.at > this.now && p.name !== "sunrise");
    const fmt = (ms: number) => new Date(ms).toLocaleTimeString(LOCALE[lang], { hour: "2-digit", minute: "2-digit" });
    const left = next ? Math.round((next.at - this.now) / 60_000) : 0;
    const hm = left >= 60 ? t("prayer_in_hm", { h: Math.floor(left / 60), m: left % 60 }) : t("prayer_in_m", { m: left });
    return html`<div class="card glass">
      ${next
        ? html`<div class="next">
            <span>${t("prayer_next")}</span>
            <b>${t(`prayer_${next.name}` as I18nKey)} · ${fmt(next.at)}</b>
            <em>${hm}</em>
          </div>`
        : nothing}
      <ul>
        ${list.map(
          (p) => html`<li class="${p === next ? "next" : p.at < this.now ? "past" : ""} ${p.name === "sunrise" ? "sun" : ""}">
            <span>${t(`prayer_${p.name}` as I18nKey)}</span><span class="ltr">${fmt(p.at)}</span>
          </li>`
        )}
      </ul>
    </div>`;
  }
}
