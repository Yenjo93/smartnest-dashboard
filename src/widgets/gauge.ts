import { LitElement, css, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { entityName, formatNumber } from "../entities";
import { shared } from "../theme";
import "../ui/icon";
import "../ui/num";

/** A level that matters when it runs low: water tank, gas bottle, pellet store, battery. */
@customElement("sn-w-gauge")
export class SnGauge extends LitElement {
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
        padding: 12px;
        display: grid;
        grid-template-rows: 1fr auto;
        justify-items: center;
        gap: 4px;
        overflow: hidden;
      }
      .dial {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 0;
        display: grid;
        place-items: center;
      }
      svg {
        width: 100%;
        height: 100%;
        position: absolute;
        inset: 0;
      }
      .track {
        fill: none;
        stroke: var(--surface-2);
        stroke-width: 10;
        stroke-linecap: round;
      }
      .val {
        fill: none;
        stroke-width: 10;
        stroke-linecap: round;
        transition: stroke-dashoffset 700ms cubic-bezier(0.22, 1, 0.36, 1), stroke 400ms;
      }
      .mid {
        position: relative;
        display: grid;
        justify-items: center;
        gap: 2px;
        --icon-size: 22px;
      }
      .mid .n {
        font-size: 26px;
        font-weight: 700;
      }
      .mid .low {
        font-size: 11px;
        color: var(--alert-text);
        font-weight: 700;
      }
      .name {
        font-size: 14px;
        font-weight: 500;
        text-align: center;
      }
    `,
  ];

  render() {
    const { ctx } = this;
    const c = this.widget.config;
    const e = c.entity ? ctx.hass.states[c.entity] : undefined;
    const min = Number(c.min ?? 0);
    const max = Number(c.max ?? 100);
    const v = Number(e?.state);
    const pct = Number.isNaN(v) ? 0 : Math.min(1, Math.max(0, (v - min) / (max - min || 1)));
    const lowAt = Number(c.low ?? 20) / 100;
    const color = pct <= lowAt ? "var(--alert)" : pct <= lowAt * 2 ? "var(--accent)" : "var(--success)";
    const name = c.entity ? entityName(ctx.hass, ctx.config, c.entity) : ctx.t("widget_gauge");
    const icon = /gas|غاز|lpg|propane/i.test(`${c.entity} ${name}`) ? "gas" : /water|tank|مي|ماء|خزان|מים/i.test(`${c.entity} ${name}`) ? "pump" : "gauge";
    // 270° arc, open at the bottom.
    const L = 2 * Math.PI * 42 * 0.75;
    const unit = e?.attributes.unit_of_measurement ?? "";
    return html`<div class="card glass">
      <div class="dial">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          ${svg`<circle class="track" cx="50" cy="50" r="42" stroke-dasharray="${L} 999" transform="rotate(135 50 50)"></circle>
          <circle class="val" cx="50" cy="50" r="42" stroke=${color} stroke-dasharray="${L} 999" stroke-dashoffset=${L * (1 - pct)} transform="rotate(135 50 50)"></circle>`}
        </svg>
        <div class="mid">
          <sn-icon .icon=${icon} style="color:${color}"></sn-icon>
          <span class="n"><sn-num .value=${Number.isNaN(v) ? "–" : `${formatNumber(v, ctx.lang, 0)}${unit === "%" ? "%" : ""}`}></sn-num></span>
          ${pct <= lowAt && !Number.isNaN(v) ? html`<span class="low">${ctx.t("gauge_low")}</span>` : ""}
        </div>
      </div>
      <span class="name">${name}</span>
    </div>`;
  }
}
