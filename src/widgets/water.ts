import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Hass, Widget } from "../types";
import { domainOf, entityName, formatNumber, ltr, relativeTime } from "../entities";
import { shared } from "../theme";
import "../ui/icon";
import "../ui/num";

export interface WaterConfig {
  usage?: string; // today's (or total) water meter
  tank?: string; // tank level, %
  valve?: string; // main valve: valve.* or a switch
}

/** Best guesses from the house, so the widget works before any setup. */
export function guessWater(hass: Hass): WaterConfig {
  const all = Object.values(hass.states);
  const usage = all.find((e) => e.entity_id.startsWith("sensor.") && e.attributes.device_class === "water")?.entity_id;
  const tank = all.find((e) => e.entity_id.startsWith("sensor.") && /tank|خزان/i.test(`${e.entity_id} ${e.attributes.friendly_name ?? ""}`) && e.attributes.unit_of_measurement === "%")?.entity_id;
  const valve =
    all.find((e) => e.entity_id.startsWith("valve.") && /water|main|مي|ماء/i.test(`${e.entity_id} ${e.attributes.friendly_name ?? ""}`))?.entity_id ??
    all.find((e) => e.entity_id.startsWith("valve."))?.entity_id ??
    all.find((e) => e.entity_id.startsWith("switch.") && /valve|محبس/i.test(`${e.entity_id} ${e.attributes.friendly_name ?? ""}`))?.entity_id;
  return { usage, tank, valve };
}

export const leakSensors = (hass: Hass) =>
  Object.values(hass.states).filter((e) => e.entity_id.startsWith("binary_sensor.") && e.attributes.device_class === "moisture");

const valveOpen = (s?: string) => s === "open" || s === "on" || s === "opening";

/** Water at a glance: what the house used, the tank, any leak, and the main valve. */
@customElement("sn-w-water")
export class SnWater extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private confirm = false;
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
        padding: 18px;
        display: grid;
        gap: 14px;
        align-content: start;
        overflow: auto;
        position: relative;
      }
      .card.leak {
        box-shadow: inset 0 0 0 3px var(--alert);
      }
      h3 {
        margin: 0;
        font-size: 16px;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .top {
        display: flex;
        gap: 18px;
        align-items: end;
        flex-wrap: wrap;
      }
      .big {
        font-size: 34px;
        font-weight: 700;
        line-height: 1;
      }
      .lbl {
        font-size: 13px;
        color: var(--text-2);
      }
      .tank {
        flex: 1;
        min-width: 120px;
        display: grid;
        gap: 6px;
      }
      .bar {
        height: 14px;
        border-radius: 999px;
        background: var(--surface-2);
        overflow: hidden;
        position: relative;
      }
      .bar span {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, #3a86ff, #5ec8f2);
        border-radius: inherit;
        transform-origin: var(--from);
        transition: transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .bar span::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
        animation: wave 2.6s linear infinite;
      }
      .status {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
        font-size: 15px;
      }
      .status.bad {
        background: color-mix(in srgb, var(--alert) 18%, transparent);
        color: var(--alert-text);
        font-weight: 600;
      }
      .status .drop {
        animation: drip 1.2s ease-in-out infinite;
      }
      .valve {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .valve span {
        flex: 1;
      }
      @keyframes wave {
        from {
          transform: translateX(-100%);
        }
        to {
          transform: translateX(100%);
        }
      }
      @keyframes drip {
        50% {
          transform: translateY(3px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .bar span::after,
        .status .drop {
          animation: none;
        }
      }
    `,
  ];

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this.timer);
  }

  private get cfg(): WaterConfig {
    const c = this.widget.config as WaterConfig;
    const g = guessWater(this.ctx.hass);
    return { usage: c.usage ?? g.usage, tank: c.tank ?? g.tank, valve: c.valve ?? g.valve };
  }

  private toggleValve(open: boolean) {
    const { hass } = this.ctx;
    const id = this.cfg.valve!;
    const d = domainOf(id);
    const svc = d === "valve" ? (open ? "open_valve" : "close_valve") : open ? "turn_on" : "turn_off";
    hass.callService(d, svc, { entity_id: id }).catch(() => this.ctx.toast(this.ctx.t("error")));
    this.confirm = false;
  }

  render() {
    const { ctx } = this;
    const { t, hass, lang } = ctx;
    const c = this.cfg;
    const usage = c.usage ? hass.states[c.usage] : undefined;
    const tank = c.tank ? hass.states[c.tank] : undefined;
    const valve = c.valve ? hass.states[c.valve] : undefined;
    const leaks = leakSensors(hass).filter((e) => e.state === "on");
    const unit = usage?.attributes.unit_of_measurement ?? "L";
    const lvl = Math.min(100, Math.max(0, Number(tank?.state) || 0));
    const open = valveOpen(valve?.state);
    return html`<div class="card glass ${leaks.length ? "leak" : ""}">
      <h3><sn-icon icon="water" style="--icon-size:20px;color:#3a86ff"></sn-icon>${t("widget_water")}</h3>
      <div class="top">
        ${usage
          ? html`<div>
              <div class="big"><sn-num .value=${ltr(`${formatNumber(Number(usage.state), lang, unit === "m³" ? 2 : 0)} ${unit}`)}></sn-num></div>
              <div class="lbl">${entityName(hass, ctx.config, usage.entity_id)}</div>
            </div>`
          : nothing}
        ${tank
          ? html`<div class="tank">
              <span class="lbl">${t("water_tank")} · ${ltr(`${formatNumber(lvl, lang, 0)}%`)}</span>
              <div class="bar" style="--from:${ctx.rtl ? "right" : "left"}"><span style="transform:scaleX(${lvl / 100})"></span></div>
            </div>`
          : nothing}
      </div>
      <div class="status ${leaks.length ? "bad" : ""}" role=${leaks.length ? "alert" : "status"}>
        <sn-icon class="drop" icon=${leaks.length ? "water-alert" : "check-circle"} style="--icon-size:22px;color:${leaks.length ? "var(--alert)" : "var(--success)"}"></sn-icon>
        ${leaks.length
          ? html`<span>${t("water_leak")}: ${leaks.map((e) => entityName(hass, ctx.config, e.entity_id)).join("، ")} · ${relativeTime(t, leaks[0].last_changed)}</span>`
          : html`<span>${t("water_no_leak")}</span>`}
      </div>
      ${valve
        ? html`<div class="valve">
            <sn-icon icon="valve" style="--icon-size:22px;color:${open ? "#3a86ff" : "var(--text-2)"}"></sn-icon>
            <span>${t("water_valve")} · <b>${t(open ? "open" : "closed")}</b></span>
            ${open
              ? this.confirm
                ? html`<button class="btn danger pressable" @click=${() => this.toggleValve(false)}>${t("water_close_confirm")}</button>`
                : html`<button
                    class="btn pressable ${leaks.length ? "danger" : ""}"
                    @click=${() => {
                      this.confirm = true;
                      window.clearTimeout(this.timer);
                      this.timer = window.setTimeout(() => (this.confirm = false), 4000);
                    }}
                  >
                    ${t("water_close")}
                  </button>`
              : html`<button class="btn primary pressable" @click=${() => this.toggleValve(true)}>${t("water_open")}</button>`}
          </div>`
        : nothing}
      ${!usage && !tank && !valve && !leakSensors(hass).length ? html`<sn-empty text=${t("no_entities")}></sn-empty>` : nothing}
    </div>`;
  }
}
