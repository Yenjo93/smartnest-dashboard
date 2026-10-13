import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import { LOCALE } from "./i18n";
import { shortValue } from "./entities";
import { shared } from "./theme";

/**
 * Wall-tablet idle screen in the brand's dark look: charcoal with a warm gold glow.
 * The clock drifts a little every minute so a tablet left on all day doesn't burn in.
 */
@customElement("sn-screensaver")
export class SnScreensaver extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) onWake!: () => void;
  @state() private now = new Date();
  @state() private drift = { x: 0, y: 0 };
  private timer?: number;

  static styles = [
    shared,
    css`
      .ss {
        position: fixed;
        inset: 0;
        z-index: 70;
        color: #fff;
        background: radial-gradient(60% 70% at var(--gx, 30%) var(--gy, 55%), rgba(233, 151, 29, 0.22), rgba(233, 151, 29, 0) 70%), #1e252b;
        display: grid;
        place-items: center;
        cursor: none;
        animation: fade 900ms var(--ease-out);
      }
      .center {
        display: grid;
        justify-items: center;
        gap: 10px;
        transition: transform 4s var(--ease-out);
      }
      .time {
        font-size: clamp(96px, 18vw, 220px);
        font-weight: 700;
        line-height: 0.95;
        letter-spacing: -0.03em;
        font-variant-numeric: tabular-nums;
      }
      .date {
        font-size: clamp(20px, 2.6vw, 30px);
        color: #9aa4ad;
      }
      .temp {
        font-size: clamp(28px, 3.4vw, 40px);
        font-weight: 500;
        color: #e9971d;
      }
      .brand {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 0.7;
        font-size: 14px;
        color: #9aa4ad;
        white-space: nowrap;
      }
      .brand img {
        width: 28px;
        height: 28px;
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.timer = window.setInterval(() => {
      this.now = new Date();
      if (this.now.getSeconds() < 10) this.drift = { x: Math.round(Math.random() * 60 - 30), y: Math.round(Math.random() * 40 - 20) };
    }, 10_000);
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
    return html`<div
      class="ss"
      style="--gx:${30 + this.drift.x / 2}%;--gy:${55 + this.drift.y / 2}%"
      @click=${(e: Event) => {
        // Wake on click (down and up both land here) so the touch can't fall through to a tile underneath.
        e.stopPropagation();
        this.onWake();
      }}
    >
      <div class="center" style="transform:translate(${this.drift.x}px, ${this.drift.y}px)">
        <div class="time ltr">${this.now.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" })}</div>
        <div class="date">${this.now.toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "long" })}</div>
        ${temp ? html`<div class="temp ltr">${shortValue(ctx.t, temp, ctx.lang)}</div>` : nothing}
      </div>
      <div class="brand">
        <img src="${ctx.assetBase}logo/smartnest-symbol-white.svg" alt="" />
        <span>SmartNest · ${ctx.t("tagline")}</span>
      </div>
    </div>`;
  }
}
