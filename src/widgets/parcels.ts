import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { shared } from "../theme";
import "../ui/icon";

interface Pkg {
  friendly_name?: string;
  tracking_number: string;
  status?: string;
  info_text?: string;
  location?: string;
  timestamp?: string;
}

const STATUS_ICON: Record<string, string> = { "In Transit": "🚚", Delivered: "✅", Undelivered: "⚠️", Expired: "⌛", "Ready to be picked up": "📬", Alert: "⚠️", "Not Found": "❔" };

/** Parcels on the way, from the 17TRACK integration. */
@customElement("sn-w-parcels")
export class SnParcels extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private pkgs?: Pkg[];
  @state() private missing = false;
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
        padding: 16px;
        display: grid;
        gap: 10px;
        align-content: start;
        overflow: auto;
      }
      h3 {
        margin: 0;
        font-size: 16px;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .p {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 2px 10px;
        padding: 10px 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      .p .i {
        grid-row: span 2;
        font-size: 24px;
        align-self: center;
      }
      .p b {
        font-size: 15px;
      }
      .p span {
        font-size: 12px;
        color: var(--text-2);
        unicode-bidi: plaintext;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.load();
    this.timer = window.setInterval(() => this.load(), 30 * 60_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
  }

  private async load() {
    const { hass } = this.ctx;
    try {
      const res = await hass.callWS<{ packages: Pkg[] }>({ type: "smartnest/parcels" });
      this.pkgs = res.packages;
      this.missing = false;
    } catch {
      this.missing = true;
    }
  }

  render() {
    const { t } = this.ctx;
    const list = (this.pkgs ?? []).filter((p) => p.status !== "Delivered" || (p.timestamp && Date.now() - Date.parse(p.timestamp) < 3 * 86_400_000));
    return html`<div class="card glass">
      <h3><sn-icon icon="package" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${t("widget_parcels")}</h3>
      ${this.missing
        ? html`<span class="muted" style="font-size:14px">${t("parcels_missing")}</span>`
        : !this.pkgs
        ? html`<span class="muted">${t("loading")}</span>`
        : list.length
        ? list.map(
            (p) => html`<div class="p">
              <span class="i">${STATUS_ICON[p.status ?? ""] ?? "📦"}</span>
              <b>${p.friendly_name || p.tracking_number}</b>
              <span>${[p.info_text, p.location].filter(Boolean).join(" · ") || p.status}</span>
            </div>`
          )
        : html`<span class="muted">${t("parcels_none")}</span>`}
      ${nothing}
    </div>`;
  }
}
