import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { LOCALE } from "../i18n";
import { shared } from "../theme";
import "../ui/icon";

interface Ev {
  summary: string;
  start: Date;
  allDay: boolean;
  cal: string;
}

const COLORS = ["#E9971D", "#18BCF2", "#2FB57A", "#F26B68", "#A78BFA"];

/** The family's next seven days from HA calendars (Google, CalDAV, local), grouped by day. */
@customElement("sn-w-calendar")
export class SnCalendar extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private events?: Ev[];
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
        grid-template-rows: auto 1fr;
        gap: 10px;
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
      .list {
        overflow: auto;
        display: grid;
        align-content: start;
        gap: 10px;
      }
      .day {
        font-size: 12px;
        font-weight: 700;
        color: var(--text-2);
        letter-spacing: 0.03em;
      }
      .ev {
        display: grid;
        grid-template-columns: 4px 1fr auto;
        gap: 10px;
        align-items: center;
        font-size: 15px;
        animation: in 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .ev i {
        height: 100%;
        min-height: 22px;
        border-radius: 2px;
      }
      .ev .when {
        font-size: 13px;
        color: var(--text-2);
        direction: ltr;
      }
      .empty {
        color: var(--text-2);
        font-size: 14px;
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(4px);
        }
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

  private get calendars(): string[] {
    const set: string[] | undefined = this.widget.config.entities;
    return set?.length ? set : Object.keys(this.ctx.hass.states).filter((id) => id.startsWith("calendar."));
  }

  private async load() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start.getTime() + 7 * 86_400_000);
    const all: Ev[] = [];
    await Promise.all(
      this.calendars.map(async (cal) => {
        try {
          const res = await this.ctx.hass.fetchWithAuth(`/api/calendars/${cal}?start=${encodeURIComponent(start.toISOString())}&end=${encodeURIComponent(end.toISOString())}`);
          if (!res.ok) return;
          for (const e of (await res.json()) as { summary: string; start: { dateTime?: string; date?: string } }[]) {
            const allDay = !e.start.dateTime;
            all.push({ summary: e.summary, start: new Date(e.start.dateTime ?? `${e.start.date}T00:00:00`), allDay, cal });
          }
        } catch {
          /* one calendar failing shouldn't hide the others */
        }
      })
    );
    this.events = all.filter((e) => e.allDay || e.start.getTime() > Date.now() - 3600_000).sort((a, b) => a.start.getTime() - b.start.getTime()).slice(0, 20);
  }

  render() {
    const { ctx } = this;
    const loc = LOCALE[ctx.lang];
    const cals = this.calendars;
    const dayLabel = (d: Date) => {
      const today = new Date();
      const tm = new Date(today.getTime() + 86_400_000);
      if (d.toDateString() === today.toDateString()) return ctx.t("today");
      if (d.toDateString() === tm.toDateString()) return ctx.t("tomorrow");
      return d.toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "short" });
    };
    let last = "";
    return html`<div class="card glass">
      <h3><sn-icon icon="calendar"></sn-icon>${ctx.t("widget_calendar")}</h3>
      <div class="list">
        ${this.events && !this.events.length ? html`<span class="empty">${ctx.t("no_events")}</span>` : nothing}
        ${(this.events ?? []).map((e, i) => {
          const day = dayLabel(e.start);
          const head = day !== last ? html`<span class="day">${day}</span>` : nothing;
          last = day;
          return html`${head}<div class="ev" style="animation-delay:${Math.min(i, 10) * 30}ms">
              <i style="background:${COLORS[cals.indexOf(e.cal) % COLORS.length]}"></i><span>${e.summary}</span>
              <span class="when">${e.allDay ? ctx.t("all_day") : e.start.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" })}</span>
            </div>`;
        })}
      </div>
    </div>`;
  }
}
