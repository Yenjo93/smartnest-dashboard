import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  mdiAccountGroupOutline, mdiAccountHeartOutline, mdiAccountOutline, mdiAlarmLightOutline, mdiBedOutline, mdiBellOutline, mdiBellRingOutline, mdiBookOpenVariantOutline, mdiBullhornOutline, mdiCalendarMonthOutline, mdiCameraOutline, mdiCarOutline, mdiCreationOutline, mdiFlashOutline, mdiFloorLampOutline, mdiHomeOutline, mdiLayersOutline, mdiLayersTripleOutline, mdiLightbulbOutline, mdiLightningBoltOutline, mdiLockOpenVariantOutline, mdiLockOutline, mdiMessageTextOutline, mdiMicrophoneOutline, mdiMovieOpenOutline, mdiPawOutline, mdiPowerPlugOffOutline, mdiPowerPlugOutline, mdiRobotHappyOutline, mdiShieldHomeOutline, mdiSofaOutline, mdiStarOutline, mdiToggleSwitchOutline, mdiTreeOutline, mdiViewDashboardOutline, mdiWaterAlertOutline, mdiWaterOutline, mdiWrenchOutline,
} from "@mdi/js";
import { ICONS } from "../icons";

/** 2.0 two-tone icons: the solid shape softly tinted behind, the outline drawn crisp on top. */
const DUO: Record<string, string> = {
  "bell": mdiBellOutline,
  "bell-ring": mdiBellRingOutline,
  "camera": mdiCameraOutline,
  "home": mdiHomeOutline,
  "lightbulb": mdiLightbulbOutline,
  "lightning-bolt": mdiLightningBoltOutline,
  "lock": mdiLockOutline,
  "lock-open": mdiLockOpenVariantOutline,
  "shield-home": mdiShieldHomeOutline,
  "sofa": mdiSofaOutline,
  "power-plug": mdiPowerPlugOutline,
  "power-plug-off": mdiPowerPlugOffOutline,
  "bed": mdiBedOutline,
  "garden": mdiTreeOutline,
  "car": mdiCarOutline,
  "lamp": mdiFloorLampOutline,
  "calendar": mdiCalendarMonthOutline,
  "message": mdiMessageTextOutline,
  "person": mdiAccountOutline,
  "family": mdiAccountGroupOutline,
  "star": mdiStarOutline,
  "water": mdiWaterOutline,
  "water-alert": mdiWaterAlertOutline,
  "leak": mdiWaterAlertOutline,
  "alarm-light": mdiAlarmLightOutline,
  "paw": mdiPawOutline,
  "automation": mdiRobotHappyOutline,
  "guests": mdiAccountHeartOutline,
  "assistant": mdiCreationOutline,
  "microphone": mdiMicrophoneOutline,
  "book-open-variant": mdiBookOpenVariantOutline,
  "floors": mdiLayersTripleOutline,
  "layers": mdiLayersOutline,
  "movie": mdiMovieOpenOutline,
  "bullhorn": mdiBullhornOutline,
  "wrench": mdiWrenchOutline,
  "dashboard": mdiViewDashboardOutline,
  "flash": mdiFlashOutline,
  "toggle-on": mdiToggleSwitchOutline,
};

/**
 * Draws a bundled MDI icon by key, or falls back to Home Assistant's own <ha-icon> for "mdi:*" names.
 * In the 2.0 look (inherited --duo-on / --mono-on) icons become two-tone, or get a soft glow when MDI has no outline.
 */
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
      grid-area: 1 / 1;
    }
    .mono {
      display: var(--mono-on, block);
    }
    .duo {
      display: var(--duo-on, none);
      overflow: visible;
    }
    .duo .back {
      opacity: var(--duo-fill, 0.3);
      transition: opacity 400ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .duo .halo {
      fill: none;
      stroke: currentColor;
      stroke-width: 2.6;
      stroke-linejoin: round;
      opacity: calc(var(--duo-fill, 0.3) * 0.55);
      filter: blur(1.2px);
    }
    ha-icon {
      --mdc-icon-size: var(--icon-size, 24px);
    }
  `;

  render() {
    const key = this.icon.replace(/^mdi:/, "");
    const path = ICONS[this.icon] ?? ICONS[key];
    if (path) {
      const outline = DUO[key];
      return html`<svg class="mono" viewBox="0 0 24 24" aria-hidden="true">${svg`<path d=${path}></path>`}</svg>
        <svg class="duo" viewBox="0 0 24 24" aria-hidden="true">
          ${outline
            ? svg`<path class="back" d=${path}></path><path d=${outline}></path>`
            : svg`<path class="halo" d=${path}></path><path d=${path}></path>`}
        </svg>`;
    }
    if (this.icon.startsWith("mdi:") && customElements.get("ha-icon")) return html`<ha-icon .icon=${this.icon}></ha-icon>`;
    return this.icon ? html`<svg viewBox="0 0 24 24" aria-hidden="true">${svg`<path d=${ICONS.grid}></path>`}</svg>` : nothing;
  }
}
