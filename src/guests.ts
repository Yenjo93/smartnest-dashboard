import { LitElement, css, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import qrcode from "qrcode-generator";
import type { Ctx } from "./ctx";
import { shared } from "./theme";
import "./ui/icon";

const KEY = "smartnest-guests";

export function readGuests(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function writeGuests(on: boolean) {
  try {
    on ? localStorage.setItem(KEY, "1") : localStorage.removeItem(KEY);
  } catch {
    /* per-device */
  }
}

/** The standard Wi-Fi QR payload every phone camera understands. Special characters are backslash-escaped. */
export function wifiPayload(ssid: string, password?: string) {
  const esc = (v: string) => v.replace(/([\;,:"])/g, "\\$1");
  return password ? `WIFI:T:WPA;S:${esc(ssid)};P:${esc(password)};;` : `WIFI:T:nopass;S:${esc(ssid)};;`;
}

/** QR as crisp SVG squares, coloured by the theme. */
export function qrSvg(text: string, size = 160) {
  const qr = qrcode(0, "M");
  qr.addData(text);
  qr.make();
  const n = qr.getModuleCount();
  const cells: string[] = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) cells.push(`M${c} ${r}h1v1h-1z`);
  return html`<svg viewBox="-2 -2 ${n + 4} ${n + 4}" width=${size} height=${size} role="img" aria-label="Wi-Fi QR" shape-rendering="crispEdges">
    ${svg`<rect x="-2" y="-2" width=${n + 4} height=${n + 4} rx="2" fill="#fff"></rect><path d=${cells.join("")} fill="#1E252B"></path>`}
  </svg>`;
}

/** Welcome card for guests: a warm message and the Wi-Fi code to scan. */
@customElement("sn-guests")
export class SnGuests extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ type: Boolean, reflect: true }) dim = false;

  static styles = [
    shared,
    css`
      .card {
        display: flex;
        align-items: center;
        gap: 22px;
        padding: 20px 24px;
        border-radius: var(--r-lg);
        margin-bottom: 14px;
        animation: in 500ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      :host([dim]) .card {
        background: rgba(21, 26, 30, 0.55);
        color: #fff;
        border: 0;
        box-shadow: none;
        margin: 0;
      }
      .txt {
        flex: 1;
        display: grid;
        gap: 6px;
      }
      .txt strong {
        font-size: clamp(22px, 3vw, 32px);
      }
      .txt span {
        color: var(--text-2);
        font-size: 15px;
        display: inline-flex;
        gap: 6px;
        align-items: center;
        --icon-size: 18px;
      }
      :host([dim]) .txt span {
        color: rgba(255, 255, 255, 0.8);
      }
      .qr {
        flex: none;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: var(--shadow);
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
      }
    `,
  ];

  render() {
    const { ctx } = this;
    const g = ctx.config.settings.guests;
    return html`<div class="card glass">
      <div class="txt">
        <strong>${g.welcome || ctx.t("welcome_default")} 🤍</strong>
        ${g.ssid ? html`<span><sn-icon icon="wifi"></sn-icon>${g.ssid}</span><span>${ctx.t("scan_wifi")}</span>` : ""}
      </div>
      ${g.ssid ? html`<div class="qr">${qrSvg(wifiPayload(g.ssid, g.password), this.dim ? 140 : 120)}</div>` : ""}
    </div>`;
  }
}
