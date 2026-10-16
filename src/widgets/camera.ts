import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Hass, Widget } from "../types";
import { entityName } from "../entities";
import { shared } from "../theme";
import "../ui/icon";
import { preload, watchVisible } from "../ui/visible";
import { freeStream, takeStream } from "../ui/streams";

export function snapshotUrl(hass: Hass, entityId: string, bust: number): string | undefined {
  const pic = hass.states[entityId]?.attributes.entity_picture as string | undefined;
  if (!pic) return undefined;
  return hass.hassUrl(`${pic}${pic.includes("?") ? "&" : "?"}t=${bust}`);
}

/** MJPEG proxy: works with every camera HA knows about, no extra player needed. */
export function liveUrl(hass: Hass, entityId: string): string | undefined {
  const e = hass.states[entityId];
  const token = e?.attributes.access_token;
  if (!e || !token) return undefined;
  if (e.attributes.entity_picture?.startsWith("/dev/")) return e.attributes.entity_picture; // dev harness
  return hass.hassUrl(`/api/camera_proxy_stream/${entityId}?token=${token}`);
}

/** Whether a camera card plays live: its own setting, else the house's (Settings → cameras live). */
export const cameraLive = (ctx: Ctx, w: Widget) => (w.config.live as boolean | undefined) ?? ctx.config.settings.cameras_live ?? true;

/**
 * Live while on screen (within the stream budget), otherwise a still refreshed every 10 s (2 s when it wanted to be
 * live but had to wait for a slot). Tapping opens the big view.
 */
@customElement("sn-w-camera")
export class SnCamera extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private bust = Date.now();
  /** The frame on screen: a new one replaces it only once it has fully loaded. */
  @state() private shown?: string;
  private timer?: number;
  @state() private visible = true;
  /** Holding a live stream slot. */
  @state() private streaming = false;
  /** The live URL in use: kept while the stream plays (the camera's token renews every few minutes; a running stream doesn't need it). */
  private liveSrc?: string;
  private stopVis?: () => void;

  static styles = [
    shared,
    css`
      :host {
        display: block;
        height: 100%;
      }
      .cam {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: var(--r-lg);
        overflow: hidden;
        background: #0d1114;
        cursor: pointer;
        display: block;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .live {
        position: absolute;
        top: 10px;
        inset-inline-start: 12px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(21, 26, 30, 0.55);
        color: #fff;
        font-size: 11px;
        font-weight: 700;
      }
      .live::before {
        content: "";
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #ff4d4d;
        animation: blink 1.4s ease-in-out infinite;
      }
      @keyframes blink {
        50% {
          opacity: 0.3;
        }
      }
      .label {
        position: absolute;
        inset-inline-start: 12px;
        bottom: 12px;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        border-radius: 999px;
        background: rgba(21, 26, 30, 0.55);
        -webkit-backdrop-filter: blur(12px);
        backdrop-filter: blur(12px);
        color: #fff;
        font-size: 13px;
        font-weight: 500;
      }
      .placeholder {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        color: #55616c;
        --icon-size: 48px;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    // Refresh only while someone can see it; coming back into view brings a fresh frame at once.
    let tick = 0;
    this.timer = window.setInterval(() => {
      tick++;
      // Waiting for a live slot: a fresh still every 2 s; otherwise every 10 s.
      if (this.visible && !this.streaming && (this.wantsLive() || tick % 5 === 0)) this.bust = Date.now();
    }, 2000);
    this.stopVis = watchVisible(this, (on) => {
      this.visible = on;
      this.syncStream();
      if (on && Date.now() - this.bust > 10_000) this.bust = Date.now();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
    this.stopVis?.();
    this.dropStream();
  }

  private wantsLive() {
    return !!this.widget?.config.entity && cameraLive(this.ctx, this.widget) && !this.ctx.editing;
  }

  private dropStream() {
    freeStream(this);
    this.streaming = false;
    this.liveSrc = undefined;
  }

  /** Live only while seen and wanted; the slot goes back the moment it isn't. */
  private syncStream() {
    if (this.visible && this.wantsLive()) this.streaming = takeStream(this, () => this.syncStream());
    else if (this.streaming) this.dropStream();
  }

  protected willUpdate() {
    if (this.hasUpdated) this.syncStream();
  }

  private loading?: string;

  protected updated() {
    const id = this.widget.config.entity as string;
    const url = id ? snapshotUrl(this.ctx.hass, id, this.bust) : undefined;
    if (!url || url === this.shown || url === this.loading) return;
    this.loading = url;
    if (!this.shown) this.shown = url;
    else preload(url).then((u) => this.loading === u && (this.shown = u), () => undefined);
  }

  render() {
    const { ctx } = this;
    const id = this.widget.config.entity as string;
    if (this.streaming && !this.liveSrc) this.liveSrc = liveUrl(ctx.hass, id);
    const live = this.streaming && this.liveSrc;
    const url = live ? this.liveSrc : this.shown;
    return html`
      <button class="cam pressable" @click=${(e: Event) => !ctx.editing && id && ctx.openEntity(id, e.currentTarget as Element)}>
        ${url
          ? html`<img
              src=${url}
              alt=""
              draggable="false"
              @error=${() => {
                // The stream dropped (Home Assistant restarted, the token expired): reconnect with a fresh one.
                if (!live) return;
                this.liveSrc = undefined;
                window.setTimeout(() => this.requestUpdate(), 1500);
              }}
            />`
          : html`<span class="placeholder"><sn-icon icon="cctv"></sn-icon></span>`}
        ${live ? html`<span class="live">${ctx.t("live")}</span>` : nothing}
        <span class="label"><sn-icon icon="cctv" style="--icon-size:16px"></sn-icon>${id ? entityName(ctx.hass, ctx.config, id) : ctx.t("widget_camera")}</span>
      </button>
    `;
  }
}
