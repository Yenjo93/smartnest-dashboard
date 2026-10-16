import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import { entityName } from "./entities";
import { liveUrl } from "./widgets/camera";
import { haptic } from "./ui/haptic";
import "./ui/icon";

/**
 * A camera in a small floating window that stays over the dashboard (picture in picture): drag it to any corner,
 * tap it for the full view, close it with the ×.
 */
@customElement("sn-pip")
export class SnPip extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property() entityId = "";
  @property({ attribute: false }) onClose!: () => void;
  @state() private pos = { x: 16, y: 96 }; // from the bottom-end corner
  private drag?: { id: number; sx: number; sy: number; ox: number; oy: number; moved: boolean };
  private src?: string;

  static styles = css`
    :host {
      position: fixed;
      z-index: 78;
      width: min(340px, calc(100vw - 32px));
      border-radius: 16px;
      overflow: hidden;
      background: #0d1114;
      box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08);
      touch-action: none;
      animation: pop 380ms cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: grab;
    }
    img {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      pointer-events: none;
    }
    .bar {
      position: absolute;
      inset: 0 0 auto 0;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      background: linear-gradient(rgba(0, 0, 0, 0.55), transparent);
      color: #fff;
      font: 600 13px var(--font, sans-serif);
    }
    .bar span {
      flex: 1;
    }
    .bar i {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ff4d4d;
    }
    button {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 0;
      background: rgba(0, 0, 0, 0.45);
      color: #fff;
      display: grid;
      place-items: center;
      cursor: pointer;
      --icon-size: 16px;
    }
    @keyframes pop {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
    }
  `;

  private down = (e: PointerEvent) => {
    if ((e.target as Element).closest("button")) return;
    try {
      this.setPointerCapture(e.pointerId);
    } catch {
      /* gone */
    }
    this.drag = { id: e.pointerId, sx: e.clientX, sy: e.clientY, ox: this.pos.x, oy: this.pos.y, moved: false };
  };

  private move = (e: PointerEvent) => {
    const d = this.drag;
    if (!d || e.pointerId !== d.id) return;
    const rtl = getComputedStyle(this).direction === "rtl";
    const dx = (e.clientX - d.sx) * (rtl ? 1 : -1);
    const dy = -(e.clientY - d.sy);
    d.moved ||= Math.hypot(dx, dy) > 6;
    this.pos = { x: Math.max(8, Math.min(window.innerWidth - this.offsetWidth - 8, d.ox + dx)), y: Math.max(8, Math.min(window.innerHeight - this.offsetHeight - 8, d.oy + dy)) };
  };

  private up = () => {
    const d = this.drag;
    this.drag = undefined;
    if (!d) return;
    if (!d.moved) return this.ctx.openEntity(this.entityId);
    // Settle into the nearest corner.
    const left = this.pos.x > (window.innerWidth - this.offsetWidth) / 2;
    const top = this.pos.y > (window.innerHeight - this.offsetHeight) / 2;
    haptic("tick");
    this.pos = { x: left ? window.innerWidth - this.offsetWidth - 16 : 16, y: top ? window.innerHeight - this.offsetHeight - 16 : 96 };
  };

  render() {
    this.src ??= liveUrl(this.ctx.hass, this.entityId);
    this.style.insetInlineEnd = `${this.pos.x}px`;
    this.style.bottom = `${this.pos.y}px`;
    this.style.transition = this.drag ? "none" : "inset-inline-end 300ms cubic-bezier(0.22, 1, 0.36, 1), bottom 300ms cubic-bezier(0.22, 1, 0.36, 1)";
    return html`<div @pointerdown=${this.down} @pointermove=${this.move} @pointerup=${this.up} @pointercancel=${this.up}>
      <img src=${this.src ?? ""} alt="" @error=${() => ((this.src = undefined), window.setTimeout(() => this.requestUpdate(), 1500))} />
      <div class="bar">
        <i></i><span>${entityName(this.ctx.hass, this.ctx.config, this.entityId)}</span>
        <button aria-label=${this.ctx.t("close")} @click=${() => this.onClose()}><sn-icon icon="close"></sn-icon></button>
      </div>
    </div>`;
  }
}

/** Floats a camera over the dashboard; opening one replaces the last. */
export function openPip(ctx: Ctx, entityId: string, from: Element) {
  let node: Node = from;
  let app: Element = document.body;
  while (node) {
    const root = node.getRootNode() as ShadowRoot | Document;
    if (!(root instanceof ShadowRoot)) break;
    if (root.host.tagName === "SMARTNEST-PANEL") {
      app = root.host.shadowRoot!.querySelector(".app") ?? document.body;
      break;
    }
    node = root.host;
  }
  app.querySelector("sn-pip")?.remove();
  const el = document.createElement("sn-pip") as SnPip;
  el.ctx = ctx;
  el.entityId = entityId;
  el.onClose = () => el.remove();
  app.appendChild(el);
}
