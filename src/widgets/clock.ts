import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { LOCALE } from "../i18n";
import { formatNumber, ltr, shortValue } from "../entities";
import { countdown, greetingKey, greetingName, nextPrayer, todayForecast, weatherIcon, type DayForecast } from "../daily";
import { shared } from "../theme";
import { currentSeason } from "../season";
import "../season";
import "../ui/icon";

/**
 * Greeting card: "Good morning, Abu Mohammad", the time, today's weather and the next prayer.
 * At 3 rows or less it folds down to just the clock, so old layouts keep working.
 */
@customElement("sn-w-clock")
export class SnClock extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private now = new Date();
  @state() private forecast: DayForecast = {};
  private timer?: number;
  private forecastTimer?: number;

  static styles = [
    shared,
    css`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        container-type: inline-size;
        height: 100%;
        border-radius: var(--r-lg);
        padding: 18px 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 4px;
        overflow: hidden;
      }
      .full {
        justify-content: space-between;
        padding: 22px 24px;
      }
      .greet {
        font-size: 17px;
        font-weight: 500;
        color: var(--accent-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .time {
        font-size: clamp(28px, 22cqi, 60px);
        white-space: nowrap;
        font-weight: 700;
        line-height: 1;
        letter-spacing: -0.02em;
        font-variant-numeric: tabular-nums;
      }
      .full .time {
        font-size: clamp(40px, 20cqi, 84px);
      }
      .date {
        color: var(--text-2);
        font-size: 15px;
      }
      .temp {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        color: var(--accent-text);
        font-weight: 500;
        --icon-size: 18px;
      }
      .pills {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-height: 40px;
        padding: 0 14px 0 10px;
        border-radius: 999px;
        background: var(--surface-2);
        font-size: 15px;
        font-weight: 500;
        white-space: nowrap;
        unicode-bidi: plaintext;
        --icon-size: 22px;
      }
      .pill sn-icon {
        color: var(--accent-text);
      }
      .pill .muted {
        font-weight: 400;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.timer = window.setInterval(() => (this.now = new Date()), 15_000);
    this.loadForecast();
    this.forecastTimer = window.setInterval(() => this.loadForecast(), 30 * 60_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
    window.clearInterval(this.forecastTimer);
  }

  private async loadForecast() {
    const id = this.ctx?.config.settings.weather.entity;
    if (this.widget?.h >= 4 && id && this.ctx.hass.states[id]) this.forecast = await todayForecast(this.ctx.hass, id);
  }

  private renderWeather() {
    const { ctx } = this;
    const id = ctx.config.settings.weather.entity;
    const w = id ? ctx.hass.states[id] : undefined;
    if (!w) return nothing;
    const night = ctx.hass.states["sun.sun"]?.state === "below_horizon";
    const deg = (v: unknown) => (typeof v === "number" ? ltr(`${formatNumber(v, ctx.lang, 0)}°`) : "");
    const { high, low } = this.forecast;
    return html`<span class="pill">
      <sn-icon .icon=${weatherIcon(w.state, night)}></sn-icon>${deg(w.attributes.temperature)}
      ${high !== undefined ? html`<span class="muted">${deg(high)} / ${deg(low)}</span>` : nothing}
    </span>`;
  }

  private renderPrayer() {
    const { ctx } = this;
    if (!ctx.config.settings.prayer) return nothing;
    const next = nextPrayer(ctx.hass, this.now);
    if (!next) return nothing;
    return html`<span class="pill">
      <sn-icon icon="mosque"></sn-icon>${ctx.t(`p_${next.id}`)}
      <span class="muted">${countdown(ctx.t, next.at, this.now)}</span>
    </span>`;
  }

  render() {
    const { ctx } = this;
    const loc = LOCALE[ctx.lang];
    const time = html`<div class="time ltr">${this.now.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" })}</div>`;
    const date = html`<div class="date">${this.now.toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "long" })}</div>`;
    if (this.widget.h < 4) {
      const tempId = ctx.config.settings.screensaver.temp_entity;
      const temp = tempId ? ctx.hass.states[tempId] : undefined;
      return html`<div class="card glass">
        ${time} ${date} ${temp ? html`<div class="temp"><sn-icon icon="thermometer"></sn-icon>${shortValue(ctx.t, temp, ctx.lang)}</div>` : nothing}
      </div>`;
    }
    const name = greetingName(ctx.hass, ctx.config.settings.greeting_name);
    const season = ctx.allows("seasons") ? currentSeason(ctx.config.settings, this.now) : null;
    return html`<div class="card glass full" style="position:relative">
      ${season ? html`<sn-season inline .season=${season}></sn-season>` : nothing}
      <div class="greet">
        ${season ? html`${ctx.t(season === "ramadan" ? "ramadan_kareem" : "eid_mubarak")} ${season === "ramadan" ? "🌙" : "🎉"} · ` : nothing}${ctx.t(greetingKey(this.now))}${name ? (ctx.lang === "ar" ? "، " : ", ") + name : ""}
      </div>
      <div>${time} ${date}</div>
      <div class="pills">${this.renderWeather()} ${this.renderPrayer()}</div>
    </div>`;
  }
}
