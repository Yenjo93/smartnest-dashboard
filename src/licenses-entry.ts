import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Hass, PanelInfo } from "./types";

/** The licenses page's sidebar element: only the installer opens it, so the page itself loads on first open. */
@customElement("smartnest-licenses")
export class SmartNestLicensesEntry extends LitElement {
  @property({ attribute: false }) hass!: Hass;
  @property({ type: Boolean }) narrow = false;
  @property({ attribute: false }) panel?: PanelInfo;
  @state() private ready = false;

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    import("./licenses-panel").then(() => (this.ready = true));
  }

  render() {
    return this.ready ? html`<sn-licenses-page .hass=${this.hass} .narrow=${this.narrow} .panel=${this.panel}></sn-licenses-page>` : nothing;
  }
}
