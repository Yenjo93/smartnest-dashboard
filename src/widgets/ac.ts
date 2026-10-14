import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { entityName, formatNumber, ltr } from "../entities";
import { hasKey } from "../i18n";
import { shared } from "../theme";
import "../ui/icon";
import "../ui/dial";
import "../ui/num";
import { acWeekSheet } from "../ac-week";

const MODE_ICON: Record<string, string> = { off: "power", cool: "snowflake", heat: "fire", fan_only: "fan", dry: "water-percent", auto: "thermostat-auto", heat_cool: "thermostat-auto" };

/** One AC, big: the set temperature on a dial, what the room is now, and its modes one tap away. */
@customElement("sn-w-ac")
export class SnAc extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private pending?: number;
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
        grid-template-rows: auto 1fr auto;
        gap: 10px;
        overflow: hidden;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }
      .head b {
        flex: 1;
        font-size: 16px;
      }
      .head span {
        font-size: 14px;
        color: var(--text-2);
      }
      .mid {
        display: grid;
        place-items: center;
        min-height: 0;
        container-type: size;
      }
      /* As big as the card allows, in both directions. */
      sn-dial {
        width: min(100cqw, 100cqh, 220px);
      }
      .big {
        display: flex;
        align-items: center;
        gap: 18px;
      }
      .big .v {
        font-size: 52px;
        font-weight: var(--display-weight, 700);
        line-height: 1;
      }
      .off {
        font-size: 22px;
        color: var(--text-2);
      }
      .modes {
        display: flex;
        gap: 6px;
        justify-content: center;
        flex-wrap: wrap;
      }
      .modes button {
        width: 44px;
        height: 44px;
        border-radius: 14px;
        border: 0;
        background: var(--surface-2);
        color: var(--text-2);
        display: grid;
        place-items: center;
        cursor: pointer;
        --icon-size: 22px;
      }
      .modes button[aria-pressed="true"] {
        background: var(--accent);
        color: var(--on-accent);
      }
      .modes button.cool[aria-pressed="true"] {
        background: #3a86ff;
        color: #fff;
      }
      .modes button.off[aria-pressed="true"] {
        background: var(--text-2);
        color: var(--bg);
      }
    `,
  ];

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this.timer);
  }

  private get entity() {
    return this.widget.config.entity ?? Object.keys(this.ctx.hass.states).find((id) => id.startsWith("climate."));
  }

  private set(v: number) {
    this.pending = v;
    window.clearTimeout(this.timer);
    // Taps settle first, so the AC gets one beep, not five.
    this.timer = window.setTimeout(() => {
      this.ctx.hass.callService("climate", "set_temperature", { entity_id: this.entity, temperature: v }).catch(() => this.ctx.toast(this.ctx.t("error")));
      window.setTimeout(() => (this.pending = undefined), 1500);
    }, 600);
  }

  render() {
    const { ctx } = this;
    const { t, hass, config, lang } = ctx;
    const id = this.entity;
    const e = id ? hass.states[id] : undefined;
    if (!id || !e) return html`<div class="card glass"><sn-empty text=${t("no_entities")}></sn-empty></div>`;
    const a = e.attributes;
    const target = this.pending ?? (typeof a.temperature === "number" ? a.temperature : undefined);
    const step = a.target_temp_step ?? 0.5;
    const [min, max] = [a.min_temp ?? 16, a.max_temp ?? 30];
    const modes: string[] = (a.hvac_modes ?? []).filter((m: string) => MODE_ICON[m]);
    const now = typeof a.current_temperature === "number" ? a.current_temperature : undefined;
    const on = e.state !== "off" && e.state !== "unavailable";
    return html`<div class="card glass">
      <div class="head" @click=${() => ctx.openEntity(id, this)}>
        <sn-icon icon=${MODE_ICON[e.state] ?? "thermostat"} style="--icon-size:20px;color:${on ? "var(--accent-text)" : "var(--text-2)"}"></sn-icon>
        <b>${entityName(hass, config, id)}</b>
        ${now !== undefined ? html`<span>${t("current_temp")} <sn-num .value=${ltr(`${formatNumber(now, lang)}°`)}></sn-num></span>` : nothing}
        ${ctx.allows("ac_week")
          ? html`<button
              class="icon-btn small pressable"
              aria-label=${t("acw_title")}
              title=${t("acw_title")}
              @click=${(e: Event) => (e.stopPropagation(), acWeekSheet(ctx, id, `${t("acw_title")} · ${entityName(hass, config, id)}`))}
            >
              <sn-icon icon="calendar" style="--icon-size:18px"></sn-icon>
            </button>`
          : nothing}
      </div>
      <div class="mid">
        ${!on || target === undefined
          ? html`<span class="off">${t("off")}</span>`
          : ctx.allows("dial")
          ? html`<sn-dial
              .value=${target}
              .min=${min}
              .max=${max}
              .step=${step}
              .current=${now}
              .mode=${e.state === "heat" ? "heat" : e.state === "auto" || e.state === "heat_cool" ? "auto" : "cool"}
              label=${hasKey(e.state) ? t(e.state as any) : e.state}
              .onCommit=${(v: number) => this.set(v)}
            ></sn-dial>`
          : html`<div class="big">
              <button class="icon-btn pressable" aria-label="-" @click=${() => this.set(Math.max(min, target - step))}><sn-icon icon="minus"></sn-icon></button>
              <span class="v ltr"><sn-num .value=${`${formatNumber(target, lang)}°`}></sn-num></span>
              <button class="icon-btn pressable" aria-label="+" @click=${() => this.set(Math.min(max, target + step))}><sn-icon icon="plus"></sn-icon></button>
            </div>`}
      </div>
      <div class="modes">
        ${modes.map(
          (m) => html`<button
            class=${m}
            aria-pressed=${e.state === m}
            aria-label=${hasKey(m) ? t(m as any) : m}
            title=${hasKey(m) ? t(m as any) : m}
            @click=${() => hass.callService("climate", "set_hvac_mode", { entity_id: id, hvac_mode: m }).catch(() => ctx.toast(t("error")))}
          >
            <sn-icon icon=${MODE_ICON[m]}></sn-icon>
          </button>`
        )}
      </div>
    </div>`;
  }
}
