import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { entityName, formatNumber, isActive } from "../entities";
import { shared } from "../theme";
import { watchVisible } from "../ui/visible";
import "../ui/icon";
import "../ui/skeleton";

interface Span {
  from: number;
  to: number;
}

/** Devices whose running time is worth seeing: ACs, lights, the TV, the water heater, pumps. */
function guess(ctx: Ctx): string[] {
  return Object.keys(ctx.hass.states)
    .filter((id) => /^(climate|media_player)\./.test(id) || /^switch\..*(heater|boiler|pump|سخان|مضخة)/i.test(id))
    .filter((id) => !ctx.hass.entities?.[id]?.entity_category)
    .slice(0, 6);
}

/** Today, device by device: a bar of when it was on, and the total. "The bedroom AC ran 7 h 20 today." */
@customElement("sn-w-hours")
export class SnHours extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private spans?: Record<string, Span[]>;
  private timer?: number;
  private seen = true;
  private stopVis?: () => void;

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
        grid-template-rows: auto 1fr;
        gap: 12px;
        overflow: hidden;
      }
      h3 {
        margin: 0;
        font-size: 16px;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .rows {
        display: grid;
        gap: 10px;
        overflow: auto;
        align-content: start;
      }
      .row {
        display: grid;
        gap: 4px;
        cursor: pointer;
      }
      .top {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
      }
      .top b {
        font-weight: 600;
      }
      .top span {
        color: var(--text-2);
        font-variant-numeric: tabular-nums;
      }
      .bar {
        position: relative;
        height: 12px;
        border-radius: 6px;
        background: var(--surface-2);
        overflow: hidden;
        direction: ltr;
      }
      .bar i {
        position: absolute;
        top: 0;
        bottom: 0;
        border-radius: 3px;
        background: var(--accent);
      }
      .bar .now {
        position: absolute;
        top: -2px;
        bottom: -2px;
        width: 2px;
        background: var(--text);
        opacity: 0.6;
      }
      .axis {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        color: var(--text-2);
        direction: ltr;
      }
    `,
  ];

  private get ids(): string[] {
    const c: string[] = this.widget.config.entities ?? [];
    return c.length ? c : guess(this.ctx);
  }

  connectedCallback() {
    super.connectedCallback();
    this.load();
    this.timer = window.setInterval(() => this.seen && this.load(), 5 * 60_000);
    this.stopVis = watchVisible(this, (on) => (this.seen = on));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
    this.stopVis?.();
  }

  private async load() {
    const ids = this.ids;
    if (!ids.length) return void (this.spans = {});
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    try {
      const res = await this.ctx.hass.callWS<Record<string, { s: string; lu?: number; lc?: number }[]>>({
        type: "history/history_during_period",
        start_time: start.toISOString(),
        entity_ids: ids,
        minimal_response: true,
        no_attributes: true,
        significant_changes_only: false,
      });
      const out: Record<string, Span[]> = {};
      for (const id of ids) {
        const rows = res[id] ?? [];
        const spans: Span[] = [];
        let open: number | undefined;
        let last = start.getTime();
        for (const r of rows) {
          last = (r.lu ?? r.lc ?? last / 1000) * 1000;
          const on = isActive({ entity_id: id, state: r.s, attributes: {} } as any);
          if (on && open === undefined) open = Math.max(start.getTime(), last);
          if (!on && open !== undefined) {
            spans.push({ from: open, to: last });
            open = undefined;
          }
        }
        if (open !== undefined) spans.push({ from: open, to: Date.now() });
        // On right now but the history didn't say so (no change since before midnight): on since its last change.
        const cur = this.ctx.hass.states[id];
        if (open === undefined && cur && isActive(cur)) spans.push({ from: Math.max(start.getTime(), Date.parse(cur.last_changed)), to: Date.now() });
        // Only today, up to now: history can reach past either end of the day.
        const lo = start.getTime();
        const hi = Date.now();
        out[id] = spans.map((x) => ({ from: Math.max(lo, Math.min(hi, x.from)), to: Math.max(lo, Math.min(hi, x.to)) })).filter((x) => x.to > x.from);
      }
      this.spans = out;
    } catch {
      this.spans = {};
    }
  }

  render() {
    const { ctx } = this;
    const { t, hass, config, lang } = ctx;
    const day0 = new Date();
    day0.setHours(0, 0, 0, 0);
    const DAY = 86_400_000;
    const pct = (ms: number) => ((ms - day0.getTime()) / DAY) * 100;
    return html`<div class="card glass">
      <h3><sn-icon icon="progress-clock" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${t("widget_hours")}</h3>
      ${!this.spans
        ? html`<sn-skeleton></sn-skeleton>`
        : html`<div class="rows">
            ${this.ids
              .filter((id) => hass.states[id])
              .map((id) => {
                const spans = this.spans![id] ?? [];
                const total = spans.reduce((s, x) => s + (x.to - x.from), 0) / 3_600_000;
                const h = Math.floor(total);
                const m = Math.round((total - h) * 60);
                return html`<div class="row" @click=${() => ctx.openEntity(id)}>
                  <div class="top"><b>${entityName(hass, config, id)}</b><span>${total < 0.02 ? t("hours_none") : h ? t("hours_hm", { h, m }) : t("min_short", { n: m })}</span></div>
                  <div class="bar">
                    ${spans.map((s) => html`<i style="left:${pct(s.from)}%;width:${Math.max(0.4, pct(s.to) - pct(s.from))}%"></i>`)}
                    <span class="now" style="left:${pct(Date.now())}%"></span>
                  </div>
                </div>`;
              })}
            <div class="axis"><span>0</span><span>6</span><span>12</span><span>18</span><span>24</span></div>
          </div>`}
      ${nothing}
    </div>`;
  }
}
