import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Hass, Widget } from "../types";
import { entityName } from "../entities";
import { shared } from "../theme";
import "../ui/icon";

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
  private timer?: number;

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
    this.timer = window.setInterval(() => (this.bust = Date.now()), 10_000);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
  }

  render() {
    const { ctx } = this;
    const id = this.widget.config.entity as string;
    const url = id ? snapshotUrl(ctx.hass, id, this.bust) : undefined;
    return html`
      <button class="cam pressable" @click=${() => !ctx.editing && id && ctx.openEntity(id)}>
        ${url ? html`<img src=${url} alt="" draggable="false" />` : html`<span class="placeholder"><sn-icon icon="cctv"></sn-icon></span>`}
        <span class="label"><sn-icon icon="cctv" style="--icon-size:16px"></sn-icon>${id ? entityName(ctx.hass, ctx.config, id) : ctx.t("widget_camera")}</span>
      </button>
    `;
  }
}
