import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import { domainOf, entityName } from "./entities";
import { dashboardEntities } from "./chips";
import { liveUrl, snapshotUrl } from "./widgets/camera";
import { shared } from "./theme";
import "./ui/icon";

/** Cameras on the dashboard first; every camera in the house if none were placed. */
export function wallCameras(ctx: Ctx): string[] {
  const placed = dashboardEntities(ctx.config).filter((id) => domainOf(id) === "camera" && ctx.hass.states[id]);
  return placed.length ? placed : Object.keys(ctx.hass.states).filter((id) => domainOf(id) === "camera");
}

/**
 * Every camera at once, full-screen. Stills refresh every 2s (live streams for ten cameras would choke a
 * wall tablet); tap one and it fills the screen with the live stream.
 */
@customElement("sn-camwall")
export class SnCamwall extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) onClose!: () => void;
  @state() private big?: string;
  @state() private bust = Date.now();
  private timer?: number;

  static styles = [
    shared,
    css`
      .wall {
        position: fixed;
        inset: 0;
        z-index: 72;
        background: #0b0e11;
        color: #fff;
        display: grid;
        grid-template-rows: auto 1fr;
        animation: fade 260ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .top {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 18px;
        padding-top: max(14px, env(safe-area-inset-top));
      }
      .top strong {
        flex: 1;
        font-size: 18px;
      }
      .top .icon-btn {
        background: rgba(255, 255, 255, 0.12);
        color: #fff;
      }
      .grid {
        display: grid;
        gap: 8px;
        padding: 0 8px 8px;
        min-height: 0;
      }
      .cam {
        position: relative;
        border-radius: 14px;
        overflow: hidden;
        background: #151a1e;
        min-height: 0;
        animation: in 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .cam img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .cam span {
        position: absolute;
        bottom: 10px;
        inset-inline-start: 10px;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.55);
        font-size: 13px;
        font-weight: 500;
      }
      .big {
        position: absolute;
        inset: 64px 8px 8px;
        border-radius: 14px;
        overflow: hidden;
        background: #000;
        animation: grow 320ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      .big img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .live {
        position: absolute;
        top: 12px;
        inset-inline-start: 12px;
        display: inline-flex;
        gap: 6px;
        align-items: center;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.55);
        font-size: 12px;
        font-weight: 700;
      }
      .live::before {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: #f26b68;
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: scale(0.96);
        }
      }
      @keyframes grow {
        from {
          opacity: 0;
          transform: scale(0.94);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .cam,
        .big {
          animation: fade 200ms ease;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.timer = window.setInterval(() => (this.bust = Date.now()), 2000);
    window.addEventListener("keydown", this.onKey);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
    window.removeEventListener("keydown", this.onKey);
  }

  private onKey = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    if (this.big) this.big = undefined;
    else this.onClose();
  };

  render() {
    const { ctx } = this;
    const cams = wallCameras(ctx);
    // Squarest grid that fits them all.
    const cols = Math.ceil(Math.sqrt(cams.length));
    const rows = Math.ceil(cams.length / cols);
    return html`<div class="wall" role="dialog" aria-label=${ctx.t("widget_camera")}>
      <div class="top">
        <sn-icon icon="cctv"></sn-icon>
        <strong>${ctx.t("camera_wall")}</strong>
        <button class="icon-btn pressable" aria-label=${ctx.t("close")} @click=${() => (this.big ? (this.big = undefined) : this.onClose())}>
          <sn-icon icon=${this.big ? "arrow-left" : "close"}></sn-icon>
        </button>
      </div>
      <div class="grid" style="grid-template-columns:repeat(${cols},1fr);grid-template-rows:repeat(${rows},1fr)">
        ${cams.map(
          (id, i) => html`<button class="cam pressable" style="animation-delay:${Math.min(i, 8) * 40}ms" @click=${() => (this.big = id)}>
            ${snapshotUrl(ctx.hass, id, this.bust) ? html`<img src=${snapshotUrl(ctx.hass, id, this.bust)!} alt="" />` : nothing}
            <span>${entityName(ctx.hass, ctx.config, id)}</span>
          </button>`
        )}
      </div>
      ${this.big
        ? html`<div class="big" @click=${() => (this.big = undefined)}>
            <img src=${liveUrl(ctx.hass, this.big) ?? snapshotUrl(ctx.hass, this.big, this.bust) ?? ""} alt="" />
            <span class="live">${ctx.t("streaming")} · ${entityName(ctx.hass, ctx.config, this.big)}</span>
          </div>`
        : nothing}
    </div>`;
  }
}
