import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { entityName, stateLabel } from "../entities";
import { snapshotUrl } from "./camera";
import { shared } from "../theme";
import "../ui/icon";
import { watchVisible } from "../ui/visible";

/** Gate or garage with its camera: see who's there, then hold to open. A tap alone never moves a gate. */
@customElement("sn-w-gate")
export class SnGate extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private holding = false;
  @state() private bust = Date.now();
  private timer?: number;
  private seen = true;
  private stopVis?: () => void;
  private hold?: number;

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
        overflow: hidden;
        display: grid;
        grid-template-rows: 1fr auto;
      }
      .cam {
        background: #0d1114 center / cover no-repeat;
        min-height: 0;
        position: relative;
      }
      .cam span {
        position: absolute;
        top: 10px;
        inset-inline-start: 10px;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.55);
        color: #fff;
        font-size: 13px;
      }
      .bar {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 14px;
      }
      .txt {
        flex: 1;
        display: grid;
      }
      .txt b {
        font-size: 16px;
      }
      .txt span {
        font-size: 13px;
        color: var(--text-2);
      }
      .go {
        position: relative;
        overflow: hidden;
        min-height: 48px;
        padding: 0 18px;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
      }
      .go::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.18);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .go.holding::before {
        transform: scaleX(1);
        transition: transform 1s linear;
      }
      .go > * {
        position: relative;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.timer = window.setInterval(() => this.seen && (this.bust = Date.now()), 5000);
    this.stopVis = watchVisible(this, (on) => (this.seen = on));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopVis?.();
    window.clearInterval(this.timer);
    window.clearTimeout(this.hold);
  }

  private start(e: PointerEvent, open: boolean) {
    if (this.ctx.editing) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this.holding = true;
    this.hold = window.setTimeout(() => {
      this.holding = false;
      navigator.vibrate?.(20);
      this.ctx.hass.callService("cover", open ? "open_cover" : "close_cover", { entity_id: this.widget.config.entity }).catch(() => this.ctx.toast(this.ctx.t("error")));
    }, 1000);
  }

  private stop() {
    window.clearTimeout(this.hold);
    this.holding = false;
  }

  render() {
    const { ctx } = this;
    const c = this.widget.config;
    const e = c.entity ? ctx.hass.states[c.entity] : undefined;
    const pic = c.camera ? snapshotUrl(ctx.hass, c.camera, this.bust) : undefined;
    const open = e?.state === "open" || e?.state === "opening";
    return html`<div class="card glass">
      <div class="cam" style=${pic ? `background-image:url('${pic}')` : ""} @click=${() => c.camera && ctx.openEntity(c.camera)}>
        ${c.camera ? html`<span>${entityName(ctx.hass, ctx.config, c.camera)}</span>` : nothing}
      </div>
      <div class="bar">
        <sn-icon icon=${open ? "gate-open" : "gate"}></sn-icon>
        <span class="txt"><b>${e ? entityName(ctx.hass, ctx.config, e.entity_id) : ctx.t("widget_gate")}</b><span>${stateLabel(ctx.t, e, ctx.lang)}</span></span>
        ${e
          ? html`<button
              class="btn ${open ? "" : "primary"} go ${this.holding ? "holding" : ""}"
              @pointerdown=${(ev: PointerEvent) => this.start(ev, !open)}
              @pointerup=${() => this.stop()}
              @pointercancel=${() => this.stop()}
              @contextmenu=${(ev: Event) => ev.preventDefault()}
            >
              <span>${ctx.t(open ? "gate_hold_close" : "gate_hold")}</span>
            </button>`
          : nothing}
      </div>
    </div>`;
  }
}
