import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Hass, HassEntity, Widget } from "../types";
import type { I18nKey } from "../i18n";
import { entityName, formatNumber, isActive, ltr } from "../entities";
import { shared } from "../theme";
import "../ui/icon";
import "../ui/num";

interface Reading {
  key: "co2" | "pm25" | "voc" | "humidity";
  label: I18nKey;
  e: HassEntity;
  /** 0 good … 2 bad */
  level: 0 | 1 | 2;
}

const CLASSES: Record<Reading["key"], { classes: string[]; re: RegExp; label: I18nKey; levels: [number, number] }> = {
  co2: { classes: ["carbon_dioxide"], re: /co2/, label: "air_co2", levels: [900, 1400] },
  pm25: { classes: ["pm25"], re: /pm2_?5/, label: "air_pm25", levels: [15, 35] },
  voc: { classes: ["volatile_organic_compounds", "volatile_organic_compounds_parts"], re: /voc|tvoc/, label: "air_voc", levels: [300, 1000] },
  humidity: { classes: ["humidity"], re: /humidity/, label: "air_humidity", levels: [60, 70] },
};

/** The worst reading of each kind in the house (or in the chosen room's sensors). */
function readings(hass: Hass, only?: string[]): Reading[] {
  const all = Object.values(hass.states).filter((e) => e.entity_id.startsWith("sensor.") && !Number.isNaN(Number(e.state)) && (!only?.length || only.includes(e.entity_id)));
  const out: Reading[] = [];
  for (const [key, def] of Object.entries(CLASSES) as [Reading["key"], (typeof CLASSES)[Reading["key"]]][]) {
    const found = all.filter((e) => def.classes.includes(e.attributes.device_class) || (!e.attributes.device_class && def.re.test(e.entity_id)));
    if (!found.length) continue;
    const worst = found.sort((a, b) => Number(b.state) - Number(a.state))[0];
    const v = Number(worst.state);
    const level = key === "humidity" ? (v > def.levels[1] || v < 25 ? 2 : v > def.levels[0] || v < 35 ? 1 : 0) : v > def.levels[1] ? 2 : v > def.levels[0] ? 1 : 0;
    out.push({ key, label: def.label, e: worst, level: level as 0 | 1 | 2 });
  }
  return out;
}

const COLOR = ["var(--success)", "#e9971d", "var(--alert)"];

/** Air at home: CO₂, fine dust, VOCs and humidity, one plain piece of advice, and the purifier. */
@customElement("sn-w-air")
export class SnAir extends LitElement {
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
        padding: 16px;
        display: grid;
        gap: 12px;
        align-content: start;
        overflow: auto;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .orb {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        color: #fff;
        flex: none;
        box-shadow: 0 0 0 6px color-mix(in srgb, var(--c) 22%, transparent);
        background: var(--c);
        animation: breathe 4s ease-in-out infinite;
      }
      .head b {
        font-size: 18px;
        display: block;
      }
      .head span {
        font-size: 14px;
        color: var(--text-2);
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
        gap: 8px;
      }
      .r {
        padding: 10px 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
        display: grid;
        gap: 2px;
        border-inline-start: 4px solid var(--c);
      }
      .r .v {
        font-size: 20px;
        font-weight: 700;
      }
      .r .l {
        font-size: 12px;
        color: var(--text-2);
      }
      @keyframes breathe {
        50% {
          transform: scale(1.06);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .orb {
          animation: none;
        }
      }
    `,
  ];

  render() {
    const { ctx } = this;
    const { t, hass, lang, config } = ctx;
    const list = readings(hass, this.widget.config.entities);
    const worst = list.reduce<number>((m, r) => Math.max(m, r.level), 0) as 0 | 1 | 2;
    const bad = list.filter((r) => r.level === worst && worst > 0)[0];
    const advice: I18nKey = !bad ? "air_good" : bad.key === "co2" ? "air_tip_co2" : bad.key === "pm25" ? "air_tip_pm" : bad.key === "voc" ? "air_tip_voc" : Number(bad.e.state) < 35 ? "air_tip_dry" : "air_tip_humid";
    const purifier =
      this.widget.config.purifier ??
      Object.keys(hass.states).find((id) => /^fan\..*(purifier|air_clean|airpurifier)/.test(id) || /^humidifier\./.test(id) || /^fan\..*air/.test(id));
    const p = purifier ? hass.states[purifier] : undefined;
    return html`<div class="card glass">
      <div class="head">
        <span class="orb" style="--c:${COLOR[worst]}"><sn-icon icon=${worst ? "air-filter" : "leaf"} style="--icon-size:26px"></sn-icon></span>
        <div><b>${t(worst === 0 ? "air_level_good" : worst === 1 ? "air_level_ok" : "air_level_bad")}</b><span>${t(advice)}</span></div>
      </div>
      ${list.length
        ? html`<div class="grid">
            ${list.map(
              (r) => html`<div class="r" style="--c:${COLOR[r.level]}" title=${entityName(hass, config, r.e.entity_id)}>
                <span class="v"><sn-num .value=${ltr(`${formatNumber(Number(r.e.state), lang, 0)} ${r.e.attributes.unit_of_measurement ?? ""}`.trim())}></sn-num></span>
                <span class="l">${t(r.label)}</span>
              </div>`
            )}
          </div>`
        : html`<sn-empty text=${t("no_entities")}></sn-empty>`}
      ${p
        ? html`<button
            class="btn ${isActive(p) ? "" : "primary"} pressable"
            style="justify-self:start"
            @click=${() => hass.callService("homeassistant", "toggle", { entity_id: purifier }).catch(() => ctx.toast(t("error")))}
          >
            <sn-icon icon="air-purifier" style="--icon-size:18px"></sn-icon>${entityName(hass, config, purifier!)} · ${t(isActive(p) ? "on" : "off")}
          </button>`
        : nothing}
    </div>`;
  }
}
