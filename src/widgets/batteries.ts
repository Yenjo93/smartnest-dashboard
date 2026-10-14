import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { entityName, formatNumber, ltr } from "../entities";
import { shared } from "../theme";
import "../ui/icon";

/** Every battery in the house, emptiest first: no more guessing which sensor died. */
export function batteries(ctx: Ctx) {
  const { hass } = ctx;
  return Object.values(hass.states)
    .filter((e) => e.entity_id.startsWith("sensor.") && e.attributes.device_class === "battery" && e.attributes.unit_of_measurement === "%" && !Number.isNaN(Number(e.state)))
    .map((e) => ({ id: e.entity_id, level: Number(e.state) }))
    .sort((a, b) => a.level - b.level);
}

@customElement("sn-w-batteries")
export class SnBatteries extends LitElement {
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
        gap: 10px;
        align-content: start;
        overflow: auto;
      }
      h3 {
        margin: 0;
        font-size: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      h3 span {
        margin-inline-start: auto;
        font-size: 13px;
        font-weight: 500;
        color: var(--text-2);
      }
      .row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        grid-template-areas: "n p" "b b";
        gap: 4px 10px;
        align-items: center;
        font-size: 14px;
        cursor: pointer;
      }
      .row b {
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .row b {
        grid-area: n;
      }
      .pct {
        grid-area: p;
      }
      .bar {
        grid-area: b;
        height: 8px;
        border-radius: 999px;
        background: var(--surface-2);
        overflow: hidden;
      }
      .bar i {
        display: block;
        height: 100%;
        border-radius: inherit;
        background: var(--success);
      }
      .row.low .bar i {
        background: var(--alert);
      }
      .row.mid .bar i {
        background: #e9971d;
      }
      .row.low b,
      .row.low .pct {
        color: var(--alert-text);
        font-weight: 700;
      }
      .pct {
        text-align: end;
      }
    `,
  ];

  render() {
    const { ctx } = this;
    const { t, hass, config, lang } = ctx;
    const low = Number(this.widget.config.low ?? 20);
    const list = batteries(ctx);
    const lows = list.filter((b) => b.level <= low).length;
    return html`<div class="card glass">
      <h3>
        <sn-icon icon=${lows ? "battery-alert" : "battery"} style="--icon-size:20px;color:${lows ? "var(--alert)" : "var(--success)"}"></sn-icon>${t("widget_batteries")}
        <span>${lows ? t("bat_low_n", { n: lows }) : list.length ? t("bat_all_good") : ""}</span>
      </h3>
      ${list.length
        ? list.map(
            (b) => html`<div class="row ${b.level <= low ? "low" : b.level <= low * 2 ? "mid" : ""}" @click=${() => ctx.openEntity(b.id, this)}>
              <b>${entityName(hass, config, b.id)}</b>
              <span class="bar"><i style="width:${Math.max(3, Math.min(100, b.level))}%"></i></span>
              <span class="pct ltr">${ltr(`${formatNumber(b.level, lang, 0)}%`)}</span>
            </div>`
          )
        : html`<sn-empty text=${t("no_entities")}></sn-empty>`}
      ${nothing}
    </div>`;
  }
}
