import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Hass, Widget } from "../types";
import { entityName, formatNumber, ltr } from "../entities";
import { dashboardEntities } from "../chips";
import { shared } from "../theme";
import "../ui/icon";
import "../ui/num";

interface Stat {
  start: number | string;
  change?: number | null;
}

const energySensors = (hass: Hass) =>
  Object.values(hass.states).filter((e) => e.entity_id.startsWith("sensor.") && e.attributes.device_class === "energy" && /kWh|Wh|MWh/.test(e.attributes.unit_of_measurement ?? ""));

/** Best guesses so the bill shows numbers before any setup. */
export function guessBill(hass: Hass) {
  const all = energySensors(hass);
  const total = all.find((e) => /total|import|consumption|grid|house|home/.test(e.entity_id) && !/solar|pv|export/.test(e.entity_id))?.entity_id;
  const solar = all.find((e) => /solar|pv/.test(e.entity_id))?.entity_id;
  return { total, solar };
}

const ms = (v: number | string) => (typeof v === "number" ? (v > 1e12 ? v : v * 1000) : Date.parse(v));

/**
 * This month's electricity in money: the expected bill, how it compares with the same days last month,
 * what the solar saved, and which devices use the most. From HA's long-term statistics, so it works for
 * any meter HA records.
 */
@customElement("sn-w-energy-stats")
export class SnEnergyStats extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private data?: { used: number; projected: number; lastSame: number; solar: number; top: { id: string; kwh: number }[] };
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
        padding: 20px;
        display: grid;
        align-content: start;
        gap: 14px;
        overflow: auto;
      }
      h3 {
        margin: 0;
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 15px;
        color: var(--text-2);
        --icon-size: 20px;
      }
      h3 sn-icon {
        color: var(--accent-text);
      }
      .bill {
        display: grid;
        gap: 2px;
      }
      .bill .big {
        font-size: clamp(34px, 5vw, 52px);
        font-weight: 700;
        letter-spacing: -0.02em;
        line-height: 1.05;
      }
      .bill .lbl {
        font-size: 13px;
        color: var(--text-2);
      }
      .row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 999px;
        background: var(--surface-2);
        font-size: 14px;
        font-weight: 500;
        unicode-bidi: plaintext;
        --icon-size: 16px;
      }
      .up {
        color: var(--alert-text);
      }
      .down {
        color: var(--success);
      }
      .top {
        display: grid;
        gap: 8px;
      }
      .item {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 4px 10px;
        font-size: 14px;
      }
      .bar {
        grid-column: 1 / -1;
        height: 6px;
        border-radius: 3px;
        background: var(--surface-2);
        overflow: hidden;
      }
      .bar span {
        display: block;
        height: 100%;
        width: 100%;
        background: var(--accent);
        border-radius: 3px;
        transform-origin: left;
        transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .muted {
        font-size: 14px;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.load();
    this.timer = window.setInterval(() => this.load(), 15 * 60_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
  }

  private get cfg() {
    const g = guessBill(this.ctx.hass);
    const c = this.widget.config;
    return { total: c.total ?? g.total, solar: c.solar ?? g.solar, tariff: Number(c.tariff ?? 0.6), currency: c.currency ?? "₪" };
  }

  private async load() {
    const { hass } = this.ctx;
    const { total, solar } = this.cfg;
    if (!total) return;
    const onBoard = new Set(dashboardEntities(this.ctx.config));
    const meters = energySensors(hass)
      .map((e) => e.entity_id)
      .filter((id) => id !== total && id !== solar && !/today|daily|month|year/.test(id));
    // Prefer meters the installer placed on the dashboard; otherwise every per-device meter in the house.
    const placed = meters.filter((id) => onBoard.has(id));
    const consumers = (placed.length ? placed : meters).slice(0, 12);
    const now = new Date();
    const startLast = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const startThis = new Date(now.getFullYear(), now.getMonth(), 1);
    const ids = [total, ...(solar ? [solar] : []), ...consumers];
    let res: Record<string, Stat[]> = {};
    try {
      res = await hass.callWS({
        type: "recorder/statistics_during_period",
        start_time: startLast.toISOString(),
        end_time: now.toISOString(),
        statistic_ids: ids,
        period: "day",
        types: ["change"],
      });
    } catch {
      return;
    }
    const sum = (id: string, from: Date, to: Date) =>
      (res[id] ?? []).filter((p) => ms(p.start) >= from.getTime() && ms(p.start) < to.getTime()).reduce((a, p) => a + (p.change ?? 0), 0);
    const day = now.getDate();
    const sameDayLast = new Date(startLast.getFullYear(), startLast.getMonth(), day + 1);
    const used = sum(total, startThis, now);
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const elapsed = Math.max(1, day - 1 + now.getHours() / 24);
    this.data = {
      used,
      projected: (used / elapsed) * daysInMonth,
      lastSame: sum(total, startLast, sameDayLast < startThis ? sameDayLast : startThis),
      solar: solar ? sum(solar, startThis, now) : 0,
      top: consumers
        .map((id) => ({ id, kwh: sum(id, startThis, now) }))
        .filter((x) => x.kwh > 0)
        .sort((a, b) => b.kwh - a.kwh)
        .slice(0, 5),
    };
  }

  render() {
    const { ctx } = this;
    const { t, lang } = ctx;
    const { tariff, currency, total } = this.cfg;
    const money = (v: number) => ltr(`${currency} ${formatNumber(v, lang, 0)}`);
    const d = this.data;
    if (!total) return html`<div class="card glass"><h3><sn-icon icon="lightning-bolt"></sn-icon>${t("bill_title")}</h3><span class="muted">${t("no_entities")}</span></div>`;
    const change = d && d.lastSame > 0 ? Math.round(((d.used - d.lastSame) / d.lastSame) * 100) : undefined;
    const max = d?.top[0]?.kwh ?? 1;
    return html`<div class="card glass">
      <h3><sn-icon icon="lightning-bolt"></sn-icon>${t("bill_title")}</h3>
      ${d
        ? html`<div class="bill">
              <span class="lbl">${t("bill_projected")}</span>
              <span class="big"><sn-num .value=${money(d.projected * tariff)}></sn-num></span>
            </div>
            <div class="row">
              <span class="pill">${t("bill_used")} ${ltr(`${formatNumber(d.used, lang, 0)} kWh`)}</span>
              ${change !== undefined
                ? html`<span class="pill ${change > 0 ? "up" : "down"}"
                    ><sn-icon icon=${change > 0 ? "chevron-up" : "chevron-down"}></sn-icon>${ltr(`${Math.abs(change)}%`)} ${t("bill_vs_last")}</span
                  >`
                : nothing}
              ${d.solar > 0 ? html`<span class="pill down"><sn-icon icon="solar"></sn-icon>${t("bill_solar")} ${money(d.solar * tariff)}</span>` : nothing}
            </div>
            ${d.top.length
              ? html`<div class="top">
                  <span class="lbl" style="font-size:13px;color:var(--text-2)">${t("bill_top")}</span>
                  ${d.top.map(
                    (x) => html`<div class="item">
                      <span>${entityName(ctx.hass, ctx.config, x.id)}</span>
                      <span class="muted">${ltr(`${formatNumber(x.kwh, lang, 0)} kWh · ${currency}${formatNumber(x.kwh * tariff, lang, 0)}`)}</span>
                      <div class="bar"><span style="transform:scaleX(${x.kwh / max});transform-origin:${ctx.rtl ? "right" : "left"}"></span></div>
                    </div>`
                  )}
                </div>`
              : nothing}`
        : html`<span class="muted">${t("loading")}</span>`}
    </div>`;
  }
}
