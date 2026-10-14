import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { shared } from "../theme";
import "../ui/icon";
import { haptic } from "../ui/haptic";

export const PANIC_SCRIPT = "script.smartnest_panic";

/**
 * Emergency: hold for two seconds to run the panic script (every light on, siren, family notified).
 * Hold-to-confirm: the deliberate phase fills linearly over 2s; letting go early snaps back in 200ms.
 */
@customElement("sn-w-panic")
export class SnPanic extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private holding = false;
  @state() private fired = false;
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
        display: grid;
        place-items: center;
        align-content: center;
        gap: 10px;
        padding: 12px;
        text-align: center;
      }
      .btn-sos {
        position: relative;
        width: min(120px, 70%);
        aspect-ratio: 1;
        border-radius: 999px;
        background: color-mix(in srgb, var(--alert) 18%, transparent);
        color: var(--alert-text);
        display: grid;
        place-items: center;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
        --icon-size: 40%;
        transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .btn-sos.holding {
        transform: scale(0.96);
      }
      .btn-sos.fired {
        background: var(--alert);
        color: var(--on-alert);
      }
      svg {
        position: absolute;
        inset: -6px;
        width: calc(100% + 12px);
        height: calc(100% + 12px);
        transform: rotate(-90deg);
      }
      circle {
        fill: none;
        stroke: var(--alert);
        stroke-width: 6;
        stroke-linecap: round;
        stroke-dasharray: 302;
        stroke-dashoffset: 302;
        transition: stroke-dashoffset 200ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .holding circle {
        stroke-dashoffset: 0;
        transition: stroke-dashoffset 2s linear;
      }
      .wrap {
        width: 100%;
        display: grid;
        place-items: center;
        align-content: center;
        gap: 8px;
      }
      .lbl {
        font-weight: 700;
      }
      .hint {
        font-size: 12px;
        color: var(--text-2);
      }
    `,
  ];

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this.timer);
  }

  private start(e: PointerEvent) {
    if (this.ctx.editing) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this.holding = true;
    haptic("press");
    this.timer = window.setTimeout(() => this.fire(), 2000);
  }

  private cancel() {
    window.clearTimeout(this.timer);
    this.holding = false;
  }

  private fire() {
    this.holding = false;
    this.fired = true;
    navigator.vibrate?.([200, 80, 200]);
    this.ctx.hass
      .callService("script", "turn_on", { entity_id: PANIC_SCRIPT })
      .then(() => this.ctx.toast(this.ctx.t("panic_sent")))
      .catch(() => this.ctx.toast(this.ctx.t("error")));
    window.setTimeout(() => (this.fired = false), 4000);
  }

  render() {
    const { ctx } = this;
    if (!ctx.hass.states[PANIC_SCRIPT])
      return ctx.isAdmin ? html`<div class="card glass"><span class="hint">${ctx.t("panic_missing")}</span></div>` : nothing;
    return html`<div class="card glass">
      <div class="wrap">
        <button
          class="btn-sos ${this.holding ? "holding" : ""} ${this.fired ? "fired" : ""}"
          aria-label=${ctx.t("widget_panic")}
          @pointerdown=${(e: PointerEvent) => this.start(e)}
          @pointerup=${() => this.cancel()}
          @pointercancel=${() => this.cancel()}
          @contextmenu=${(e: Event) => e.preventDefault()}
        >
          <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48"></circle></svg>
          <sn-icon icon="alert-circle-outline"></sn-icon>
        </button>
        <span class="lbl">${ctx.t("widget_panic")}</span>
        <span class="hint">${ctx.t("panic_hold")}</span>
      </div>
    </div>`;
  }
}
