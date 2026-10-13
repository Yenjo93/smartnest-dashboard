import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ICONS } from "../icons";

/** Draws a bundled MDI icon by key, or falls back to Home Assistant's own <ha-icon> for "mdi:*" names. */
@customElement("sn-icon")
export class SnIcon extends LitElement {
  @property() icon = "";

  static styles = css`
    :host {
      display: inline-grid;
      place-items: center;
      width: var(--icon-size, 24px);
      height: var(--icon-size, 24px);
      flex: none;
      line-height: 0;
    }
    svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
    ha-icon {
      --mdc-icon-size: var(--icon-size, 24px);
    }
  `;

  render() {
    const path = ICONS[this.icon] ?? ICONS[this.icon.replace(/^mdi:/, "")];
    if (path) return html`<svg viewBox="0 0 24 24" aria-hidden="true">${svg`<path d=${path}></path>`}</svg>`;
    if (this.icon.startsWith("mdi:") && customElements.get("ha-icon")) return html`<ha-icon .icon=${this.icon}></ha-icon>`;
    return this.icon ? html`<svg viewBox="0 0 24 24" aria-hidden="true">${svg`<path d=${ICONS.grid}></path>`}</svg>` : nothing;
  }
}
