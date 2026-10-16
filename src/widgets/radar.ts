import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { shared } from "../theme";
import "../ui/icon";

/** Live rain radar around the house (RainViewer), animated over the last two hours. */
@customElement("sn-w-radar")
export class SnRadar extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;

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
        position: relative;
      }
      iframe {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }
      .tag {
        position: absolute;
        top: 10px;
        inset-inline-start: 10px;
        z-index: 1;
        padding: 6px 12px;
        border-radius: 999px;
        background: var(--surface);
        -webkit-backdrop-filter: var(--glass-filter, blur(12px));
        backdrop-filter: var(--glass-filter, blur(12px));
        font-weight: 600;
        font-size: 14px;
        display: flex;
        gap: 6px;
        align-items: center;
        pointer-events: none;
      }
    `,
  ];

  render() {
    const c = this.ctx.hass.config ?? {};
    const lat = c.latitude ?? 31.9;
    const lon = c.longitude ?? 35.2;
    const zoom = this.widget.config.zoom ?? 7;
    const dark = this.ctx.dark ? 1 : 0;
    const src = `https://www.rainviewer.com/map.html?loc=${lat.toFixed(3)},${lon.toFixed(3)},${zoom}&oFa=0&oC=1&oU=0&oCS=1&oF=0&oAP=1&c=3&o=83&lm=${dark}&layer=radar&sm=1&sn=1`;
    return html`<div class="card glass">
      <span class="tag"><sn-icon icon="weather-pouring" style="--icon-size:18px"></sn-icon>${this.ctx.t("widget_radar")}</span>
      <iframe src=${src} title=${this.ctx.t("widget_radar")} loading="lazy" referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin"></iframe>
    </div>`;
  }
}
