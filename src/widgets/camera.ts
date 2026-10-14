import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Hass, Widget } from "../types";
import { entityName } from "../entities";
import { shared } from "../theme";
import "../ui/icon";
import { preload, watchVisible } from "../ui/visible";

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

/** Still frame refreshed every 10s; tapping opens the live view. Ten live streams on one tablet would choke it. */
@customElement("sn-w-camera")
export class SnCamera extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private bust = Date.now();
  /** The frame on screen: a new one replaces it only once it has fully loaded. */
  @state() private shown?: string;
  private timer?: number;
  private visible = true;
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
    this.timer = window.setInterval(() => this.visible && (this.bust = Date.now()), 10_000);
    this.stopVis = watchVisible(this, (on) => {
      this.visible = on;
      if (on && Date.now() - this.bust > 10_000) this.bust = Date.now();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
    this.stopVis?.();
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
    const url = this.shown;
    return html`
      <button class="cam pressable" @click=${(e: Event) => !ctx.editing && id && ctx.openEntity(id, e.currentTarget as Element)}>
        ${url ? html`<img src=${url} alt="" draggable="false" />` : html`<span class="placeholder"><sn-icon icon="cctv"></sn-icon></span>`}
        <span class="label"><sn-icon icon="cctv" style="--icon-size:16px"></sn-icon>${id ? entityName(ctx.hass, ctx.config, id) : ctx.t("widget_camera")}</span>
      </button>
    `;
  }
}
