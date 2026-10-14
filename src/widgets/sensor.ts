import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { entityIcon, entityName, formatNumber, isNumericSensor, ltr } from "../entities";
import { shared } from "../theme";
import "../ui/icon";
import "../ui/chart";

interface Pt {
  t: number;
  v: number;
}

/** One sensor, big, with its last day as a line: temperature, humidity, power, tank level… */
@customElement("sn-w-sensor")
export class SnSensor extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private pts: Pt[] = [];
  private loadedFor = "";
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
        grid-template-rows: auto auto 1fr;
        gap: 4px;
        overflow: hidden;
        cursor: pointer;
      }
      .name {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: var(--text-2);
      }
      .v {
        font-size: 40px;
        font-weight: var(--display-weight, 700);
        line-height: 1.1;
      }
      .v small {
        font-size: 18px;
        color: var(--text-2);
        font-weight: 500;
      }
      .ch {
        min-height: 60px;
        display: grid;
        align-items: end;
      }
    `,
  ];

  private get entity(): string | undefined {
    return this.widget.config.entity;
  }

  connectedCallback() {
    super.connectedCallback();
    this.timer = window.setInterval(() => this.load(true), 10 * 60_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
  }

  updated() {
    if (this.entity && this.entity !== this.loadedFor) this.load();
  }

  private async load(again = false) {
    const id = this.entity;
    if (!id || (!again && id === this.loadedFor)) return;
    this.loadedFor = id;
    try {
      const start = new Date(Date.now() - 24 * 3600_000).toISOString();
      const res = await this.ctx.hass.callWS<Record<string, { s: string; lu?: number; lc?: number }[]>>({
        type: "history/history_during_period",
        start_time: start,
        entity_ids: [id],
        minimal_response: true,
        no_attributes: true,
        significant_changes_only: false,
      });
      let last = Date.parse(start) / 1000;
      this.pts = (res[id] ?? [])
        .map((p) => {
          last = p.lu ?? p.lc ?? last;
          return { t: last, v: Number(p.s) };
        })
        .filter((p) => !Number.isNaN(p.v));
    } catch {
      this.pts = [];
    }
  }

  render() {
    const { ctx } = this;
    const { t, hass, config, lang } = ctx;
    const id = this.entity;
    const e = id ? hass.states[id] : undefined;
    if (!id || !e) return html`<div class="card glass"><sn-empty text=${t("sensor_pick")}></sn-empty></div>`;
    const unit = e.attributes.unit_of_measurement ?? "";
    const num = isNumericSensor(e);
    return html`<div class="card glass" @click=${() => ctx.openEntity(id, this)}>
      <span class="name"><sn-icon .icon=${entityIcon(e, id)} style="--icon-size:18px"></sn-icon>${entityName(hass, config, id)}</span>
      <span class="v ltr">${num ? formatNumber(Number(e.state), lang) : e.state} <small>${unit}</small></span>
      <div class="ch">${num && this.pts.length > 1 ? html`<sn-chart .points=${this.pts} unit=${unit} .lang=${lang} .color=${this.widget.config.color ?? "var(--accent)"}></sn-chart>` : nothing}</div>
    </div>`;
  }
}
