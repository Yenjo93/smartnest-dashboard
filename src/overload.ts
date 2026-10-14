import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import { domainOf, entityName, formatNumber, ltr } from "./entities";
import { liveConsumers } from "./widgets/consumers";
import { shared } from "./theme";
import "./ui/icon";

/** The house is drawing more than its limit: what's using it, with an off button for each. */
@customElement("sn-overload")
export class SnOverload extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ type: Number }) watts = 0;
  @property({ attribute: false }) onDismiss!: () => void;

  static styles = [
    shared,
    css`
      :host {
        position: fixed;
        inset-inline: 0;
        top: 12px;
        z-index: 40;
        display: flex;
        justify-content: center;
        padding-inline: 12px;
        pointer-events: none;
      }
      .card {
        pointer-events: auto;
        width: min(560px, 100%);
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        gap: 10px;
        background: var(--surface-solid);
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.25), inset 0 0 0 2px var(--alert);
        animation: drop 420ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      .head {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .head b {
        flex: 1;
        font-size: 17px;
      }
      .bolt {
        display: grid;
        place-items: center;
        width: 40px;
        height: 40px;
        border-radius: 999px;
        background: var(--alert);
        color: #fff;
        animation: pulse 1.4s ease-in-out infinite;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 15px;
      }
      .row span {
        flex: 1;
      }
      .row .w {
        flex: none;
        color: var(--text-2);
        font-variant-numeric: tabular-nums;
      }
      @keyframes drop {
        from {
          opacity: 0;
          transform: translateY(-24px);
        }
      }
      @keyframes pulse {
        50% {
          transform: scale(1.1);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .card,
        .bolt {
          animation: none;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    navigator.vibrate?.([200, 100, 200]);
  }

  render() {
    const { ctx } = this;
    const { t, hass, lang, config } = ctx;
    const kw = (w: number) => ltr(`${formatNumber(w / 1000, lang, 1)} kW`);
    const top = liveConsumers(hass, config.settings.power_entity)
      .filter((c) => c.control && !c.standby)
      .slice(0, 3);
    return html`<div class="card" role="alert">
      <div class="head">
        <span class="bolt"><sn-icon icon="lightning-bolt" style="--icon-size:22px"></sn-icon></span>
        <b>${t("overload_title", { now: kw(this.watts), max: kw(config.settings.power_limit ?? 0) })}</b>
        <button class="btn pressable" @click=${() => this.onDismiss()}>${t("dismiss")}</button>
      </div>
      ${top.length ? html`<span class="muted" style="font-size:14px">${t("overload_hint")}</span>` : nothing}
      ${top.map(
        (c) => html`<div class="row">
          <span>${entityName(hass, config, c.control!)}</span>
          <span class="w">${kw(c.w)}</span>
          <button
            class="btn danger pressable"
            @click=${() =>
              hass
                .callService(domainOf(c.control!) === "climate" ? "climate" : "homeassistant", "turn_off", { entity_id: c.control })
                .then(() => ctx.toast(t("done")))
                .catch(() => ctx.toast(t("error")))}
          >
            ${t("turn_off")}
          </button>
        </div>`
      )}
    </div>`;
  }
}
