import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { LOCALE } from "../i18n";
import { shortValue } from "../entities";
import { shared } from "../theme";
import "../ui/icon";

@customElement("sn-w-clock")
export class SnClock extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private now = new Date();
  private timer?: number;

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
      .time {
        font-size: clamp(28px, 22cqi, 60px); /* sized to the card, not the screen */
        white-space: nowrap;
        font-weight: 700;
        line-height: 1;
        letter-spacing: -0.02em;
        font-variant-numeric: tabular-nums;
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
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.timer = window.setInterval(() => (this.now = new Date()), 15_000);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
  }

  render() {
    const { ctx } = this;
    const loc = LOCALE[ctx.lang];
    const tempId = ctx.config.settings.screensaver.temp_entity;
    const temp = tempId ? ctx.hass.states[tempId] : undefined;
    return html`<div class="card glass">
      <div class="time ltr">${this.now.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" })}</div>
      <div class="date">${this.now.toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "long" })}</div>
      ${temp ? html`<div class="temp"><sn-icon icon="thermometer"></sn-icon>${shortValue(ctx.t, temp, ctx.lang)}</div>` : nothing}
    </div>`;
  }
}
