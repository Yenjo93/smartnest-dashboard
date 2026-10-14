import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { LOCALE } from "../i18n";
import { WEEK, automationEntity, builderSheet, dayName, type AutoModel } from "../automations";
import { shared } from "../theme";
import "../ui/icon";

/** The week at a glance: every timed SmartNest automation as a dot on its day and hour. */
@customElement("sn-w-schedule")
export class SnSchedule extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private items: AutoModel[] = [];
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
        padding: 14px 16px;
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 8px;
        overflow: hidden;
      }
      h3 {
        margin: 0;
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 16px;
        --icon-size: 20px;
      }
      h3 sn-icon {
        color: var(--accent-text);
      }
      .grid {
        display: grid;
        grid-template-columns: 52px 1fr;
        grid-auto-rows: 1fr;
        gap: 4px 8px;
        min-height: 0;
        direction: ltr;
      }
      .day {
        font-size: 12px;
        color: var(--text-2);
        align-self: center;
        text-align: end;
      }
      .day.today {
        color: var(--accent-text);
        font-weight: 700;
      }
      .lane {
        position: relative;
        border-radius: 8px;
        background: var(--surface-2);
      }
      .dot {
        position: absolute;
        top: 50%;
        width: 22px;
        height: 22px;
        margin: -11px 0 0 -11px;
        border-radius: 999px;
        background: var(--accent);
        color: var(--on-accent);
        display: grid;
        place-items: center;
        --icon-size: 13px;
        box-shadow: var(--shadow);
        animation: pop 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .dot.off {
        background: var(--surface-solid);
        color: var(--text-2);
      }
      .now {
        position: absolute;
        top: -2px;
        bottom: -2px;
        width: 2px;
        background: var(--alert);
        border-radius: 1px;
      }
      .hours {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        color: var(--text-2);
        padding-inline-start: 60px;
        direction: ltr;
      }
      @keyframes pop {
        from {
          opacity: 0;
          transform: scale(0.6);
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.load();
    this.timer = window.setInterval(() => this.load(), 5 * 60_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
  }

  private async load() {
    try {
      this.items = (await this.ctx.hass.callWS<{ items: AutoModel[] }>({ type: "smartnest/automations/get" })).items;
    } catch {
      this.items = [];
    }
  }

  /** Hour of day (0-24) a trigger fires, or undefined for event-based ones. Sun times come from sun.sun. */
  private hourOf(m: AutoModel): number | undefined {
    const tr = m.trigger;
    if (tr.kind === "time") {
      const [h, mi] = tr.at.split(":").map(Number);
      return h + mi / 60;
    }
    if (tr.kind === "sun") {
      const s = this.ctx.hass.states["sun.sun"]?.attributes;
      const iso = tr.event === "sunrise" ? s?.next_rising : s?.next_setting;
      const d = iso ? new Date(iso) : undefined;
      const base = d ? d.getHours() + d.getMinutes() / 60 : tr.event === "sunrise" ? 6 : 18;
      return (base + tr.offset / 60 + 24) % 24;
    }
    return undefined;
  }

  render() {
    const { ctx } = this;
    const loc = LOCALE[ctx.lang];
    const now = new Date();
    const today = WEEK[now.getDay()];
    const nowPct = ((now.getHours() + now.getMinutes() / 60) / 24) * 100;
    const timed = this.items.map((m) => ({ m, h: this.hourOf(m) })).filter((x) => x.h !== undefined) as { m: AutoModel; h: number }[];
    return html`<div class="card glass">
      <h3><sn-icon icon="schedule"></sn-icon>${ctx.t("widget_schedule")}</h3>
      <div class="grid">
        ${WEEK.map(
          (d, di) => html`<span class="day ${d === today ? "today" : ""}">${dayName(d, loc)}</span>
            <div class="lane">
              ${d === today ? html`<span class="now" style="left:${nowPct}%"></span>` : ""}
              ${timed
                .filter(({ m }) => !m.days.length || m.days.includes(d))
                .map(({ m, h }) => {
                  const on = automationEntity(ctx.hass, m.id)?.state !== "off";
                  return html`<button
                    class="dot ${on ? "" : "off"}"
                    style="left:${(h / 24) * 100}%;animation-delay:${di * 30}ms"
                    title=${`${m.name}`}
                    aria-label=${m.name}
                    @click=${() => ctx.isAdmin && builderSheet(ctx, m, () => this.load())}
                  >
                    <sn-icon icon=${m.trigger.kind === "sun" ? "sun" : "clock-outline"}></sn-icon>
                  </button>`;
                })}
            </div>`
        )}
      </div>
      <div class="hours"><span>00</span><span>06</span><span>12</span><span>18</span><span>24</span></div>
    </div>`;
  }
}
