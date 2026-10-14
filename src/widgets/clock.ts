import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { LOCALE } from "../i18n";
import { domainOf, formatNumber, ltr, shortValue } from "../entities";
import { dashboardEntities } from "../chips";
import { countdown, greetingKey, greetingName, nextPrayer, prayerTimes, todayForecast, weatherIcon, type DayForecast } from "../daily";
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
        font-weight: var(--display-weight, 700);
        letter-spacing: var(--display-track, 0);
        white-space: nowrap;
        font-weight: 700;
        line-height: 1;
        letter-spacing: -0.02em;
        font-variant-numeric: tabular-nums;
      }
      .full .time {
        font-size: clamp(40px, 20cqi, 84px);
        font-weight: var(--display-weight, 700);
        letter-spacing: var(--display-track, 0);
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
      .comps {
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 4px;
      }
      .comp {
        position: relative;
        display: grid;
        justify-items: center;
        gap: 2px;
        width: 54px;
      }
      .comp svg {
        width: 48px;
        height: 48px;
      }
      .comp svg circle:last-child {
        transition: stroke-dasharray 900ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .comp b {
        position: absolute;
        top: 14px;
        font-size: 13px;
        font-weight: 700;
      }
      .comp span {
        font-size: 10px;
        color: var(--text-2);
        white-space: nowrap;
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

  /** Watch-face complications: small rings for inside temperature, humidity, power and the next prayer. */
  private renderComplications() {
    const { ctx } = this;
    if (!ctx.allows("complications") || this.widget.w < 4) return nothing;
    const { hass, config, lang, t } = ctx;
    const ids = dashboardEntities(config);
    const find = (cls: string) =>
      (config.settings.screensaver.temp_entity && cls === "temperature" ? hass.states[config.settings.screensaver.temp_entity] : undefined) ??
      ids.map((id) => hass.states[id]).find((e) => e && domainOf(e.entity_id) === "sensor" && e.attributes.device_class === cls && !/out|خارج/.test(e.entity_id));
    const temp = find("temperature");
    const hum = find("humidity");
    const power = config.settings.power_entity ? hass.states[config.settings.power_entity] : undefined;
    const next = config.settings.prayer ? prayerTimes(hass).find((p) => p.at > this.now) : undefined;
    const items: { v: string; frac: number; color: string; label: string }[] = [];
    if (temp) items.push({ v: `${formatNumber(Number(temp.state), lang, 0)}°`, frac: (Number(temp.state) - 10) / 25, color: "#ff8a3d", label: t("hero_inside") });
    if (hum) items.push({ v: `${formatNumber(Number(hum.state), lang, 0)}%`, frac: Number(hum.state) / 100, color: "#3a9bff", label: t("air_humidity") });
    if (power) {
      const w = Number(power.state) * (power.attributes.unit_of_measurement === "kW" ? 1000 : 1);
      items.push({ v: w >= 1000 ? `${formatNumber(w / 1000, lang, 1)}k` : formatNumber(w, lang, 0), frac: w / Math.max(1, config.settings.power_limit ?? 6000), color: "#e9971d", label: "W" });
    }
    if (next) {
      const mins = Math.max(0, Math.round((next.at.getTime() - this.now.getTime()) / 60_000));
      items.push({ v: mins >= 60 ? `${Math.floor(mins / 60)}:${String(mins % 60).padStart(2, "0")}` : `${mins}′`, frac: 1 - Math.min(1, mins / 360), color: "#2bb673", label: t(`p_${next.id}` as any) });
    }
    if (!items.length) return nothing;
    const C = 2 * Math.PI * 20;
    return html`<div class="comps">
      ${items.slice(0, 4).map(
        (x) => html`<div class="comp">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="20" fill="none" stroke="var(--surface-2)" stroke-width="4"></circle>
            <circle cx="24" cy="24" r="20" fill="none" stroke=${x.color} stroke-width="4" stroke-linecap="round" stroke-dasharray="${C * Math.min(1, Math.max(0.02, x.frac))} ${C}" transform="rotate(-90 24 24)"></circle>
          </svg>
          <b class="ltr">${x.v}</b>
          <span>${x.label}</span>
        </div>`
      )}
    </div>`;
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
        ${time} ${date} ${ctx.allows("complications") && this.widget.w >= 4 ? this.renderComplications() : temp ? html`<div class="temp"><sn-icon icon="thermometer"></sn-icon>${shortValue(ctx.t, temp, ctx.lang)}</div>` : nothing}
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
      ${this.renderComplications()}
    </div>`;
  }
}
