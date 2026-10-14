import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import type { I18nKey } from "../i18n";
import { shared } from "../theme";
import "../ui/icon";
import { haptic } from "../ui/haptic";

export const MODES: { id: string; icon: string; label: I18nKey }[] = [
  { id: "away", icon: "leave", label: "mode_away" },
  { id: "home", icon: "entrance", label: "mode_home" },
  { id: "sleep", icon: "night", label: "mode_sleep" },
  { id: "evening", icon: "lamp", label: "mode_evening" },
];

export const MODE_SELECT = "input_select.house_mode";
export const modeScript = (id: string) => `script.smartnest_mode_${id}`;

/** The house modes from the SmartNest YAML package. A button shows only when its script exists. */
@customElement("sn-w-modes")
export class SnModes extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;

  static styles = [
    shared,
    css`
      :host {
        display: block;
        height: 100%;
      }
      .row {
        height: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 12px;
      }
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        border-radius: var(--r-lg);
        font-size: 17px;
        font-weight: 700;
        min-height: 64px;
      }
      .ic {
        display: grid;
        place-items: center;
        width: 44px;
        height: 44px;
        border-radius: 999px;
        background: var(--surface-2);
        color: var(--text-2);
        transition: background-color var(--dur) var(--ease-out), color var(--dur) var(--ease-out);
      }
      button[aria-pressed="true"] {
        background: var(--surface-solid);
      }
      button[aria-pressed="true"] .ic {
        background: var(--accent);
        color: var(--on-accent);
      }
      .missing {
        height: 100%;
        display: grid;
        place-items: center;
        padding: 12px 20px;
        border-radius: var(--r-lg);
        color: var(--text-2);
        font-size: 14px;
        text-align: center;
      }
    `,
  ];

  private run(id: string) {
    if (this.ctx.editing) return;
    haptic("press");
    this.ctx.hass.callService("script", "turn_on", { entity_id: modeScript(id) }).catch(() => this.ctx.toast(this.ctx.t("error")));
    this.ctx.cinematic(id);
  }

  render() {
    const { ctx } = this;
    const available = MODES.filter((m) => ctx.hass.states[modeScript(m.id)]);
    if (!available.length) return ctx.isAdmin ? html`<div class="missing glass">${ctx.t("modes_missing")}</div>` : nothing;
    const current = ctx.hass.states[MODE_SELECT]?.state;
    return html`<div class="row">
      ${available.map(
        (m) => html`<button class="glass pressable" aria-pressed=${current === m.id} @click=${() => this.run(m.id)}>
          <span class="ic"><sn-icon .icon=${m.icon}></sn-icon></span>${ctx.t(m.label)}
        </button>`
      )}
    </div>`;
  }
}
