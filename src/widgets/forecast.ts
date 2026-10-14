import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { LOCALE } from "../i18n";
import { formatNumber, ltr } from "../entities";
import { weatherIcon } from "../daily";
import { shared } from "../theme";
import "../ui/icon";

interface Day {
  datetime: string;
  temperature?: number;
  templow?: number;
  condition?: string;
}

/** Seven days ahead: weekday, icon, high and low, with a bar showing each day's range against the week. */
@customElement("sn-w-forecast")
export class SnForecast extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private days: Day[] = [];
  private timer?: number;

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
        padding: 14px;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(64px, 1fr);
        gap: 6px;
        overflow-x: auto;
        scrollbar-width: none;
      }
      .d {
        display: grid;
        justify-items: center;
        align-content: space-between;
        gap: 6px;
        padding: 8px 4px;
        border-radius: 14px;
        font-size: 13px;
        --icon-size: 28px;
        animation: in 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .d.today {
        background: var(--surface-2);
      }
      .d sn-icon {
        color: var(--accent-text);
      }
      .hi {
        font-weight: 700;
        font-size: 16px;
      }
      .lo {
        color: var(--text-2);
      }
      .range {
        width: 6px;
        flex: 1;
        min-height: 24px;
        border-radius: 3px;
        background: var(--surface-2);
        position: relative;
      }
      .range span {
        position: absolute;
        left: 0;
        right: 0;
        border-radius: 3px;
        background: linear-gradient(to top, #18bcf2, #e9971d);
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.load();
    this.timer = window.setInterval(() => this.load(), 60 * 60_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
  }

  private async load() {
    const id = this.ctx.config.settings.weather.entity;
    if (!id || !this.ctx.hass.states[id]) return;
    try {
      const res = await this.ctx.hass.callWS<{ response: Record<string, { forecast: Day[] }> }>({
        type: "call_service",
        domain: "weather",
        service: "get_forecasts",
        target: { entity_id: id },
        service_data: { type: "daily" },
        return_response: true,
      });
      this.days = (res.response?.[id]?.forecast ?? []).slice(0, 7);
    } catch {
      this.days = [];
    }
  }

  render() {
    const { ctx } = this;
    const loc = LOCALE[ctx.lang];
    const his = this.days.map((d) => d.temperature ?? 0);
    const los = this.days.map((d) => d.templow ?? d.temperature ?? 0);
    const max = Math.max(...his, 1);
    const min = Math.min(...los, 0);
    const deg = (v?: number) => (typeof v === "number" ? ltr(`${formatNumber(v, ctx.lang, 0)}°`) : "–");
    return html`<div class="card glass" data-no-swipe>
      ${this.days.map((d, i) => {
        const date = new Date(d.datetime);
        const lo = d.templow ?? d.temperature ?? 0;
        const hi = d.temperature ?? lo;
        const bottom = ((lo - min) / (max - min || 1)) * 100;
        const top = 100 - ((hi - min) / (max - min || 1)) * 100;
        return html`<div class="d ${i === 0 ? "today" : ""}" style="animation-delay:${i * 40}ms">
          <span>${i === 0 ? ctx.t("today") : date.toLocaleDateString(loc, { weekday: "short" })}</span>
          <sn-icon .icon=${weatherIcon(d.condition)}></sn-icon>
          <span class="hi">${deg(d.temperature)}</span>
          <div class="range"><span style="bottom:${bottom}%;top:${top}%"></span></div>
          <span class="lo">${deg(d.templow)}</span>
        </div>`;
      })}
    </div>`;
  }
}
