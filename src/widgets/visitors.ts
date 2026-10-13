import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { LOCALE } from "../i18n";
import { shared } from "../theme";
import "../ui/icon";

interface Visit {
  url: string;
  time: string;
}

/** "Who rang today": a strip of doorbell snapshots the integration saves on every ring. */
@customElement("sn-w-visitors")
export class SnVisitors extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private visits?: Visit[];
  private timer?: number;
  private bellSeen?: string;

  static styles = [
    shared,
    css`
      :host {
        display: block;
        height: 100%;
      }
      .wrap {
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
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        --icon-size: 20px;
      }
      h3 sn-icon {
        color: var(--accent-text);
      }
      .strip {
        display: flex;
        gap: 12px;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        min-height: 0;
      }
      .strip::-webkit-scrollbar {
        display: none;
      }
      .tag {
        position: absolute;
        top: 8px;
        inset-inline-start: 8px;
        padding: 3px 10px;
        border-radius: 999px;
        background: var(--accent);
        color: var(--on-accent);
        font-size: 12px;
        font-weight: 700;
        font-style: normal;
      }
      .shot {
        position: relative;
        flex: none;
        height: 100%;
        aspect-ratio: 4 / 3;
        border-radius: var(--r-md);
        overflow: hidden;
        background: #0d1114;
        scroll-snap-align: start;
        animation: in 500ms var(--spring) both;
      }
      .shot img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .shot span {
        position: absolute;
        bottom: 8px;
        inset-inline-start: 8px;
        padding: 3px 10px;
        border-radius: 999px;
        background: rgba(21, 26, 30, 0.6);
        color: #fff;
        font-size: 13px;
        font-weight: 500;
        direction: ltr;
      }
      .empty {
        align-self: center;
        color: var(--text-2);
        font-size: 14px;
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: scale(0.92);
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.load();
    this.timer = window.setInterval(() => this.load(), 120_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
  }

  protected willUpdate() {
    // A new ring: give the integration a moment to save the snapshot, then refresh.
    const id = this.ctx.config.settings.doorbell.trigger_entity;
    const key = id ? `${this.ctx.hass.states[id]?.state}` : undefined;
    if (this.bellSeen !== undefined && key !== this.bellSeen) window.setTimeout(() => this.load(), 4000);
    this.bellSeen = key;
  }

  private async load() {
    try {
      const res = await this.ctx.hass.callWS<{ visitors: Visit[] }>({ type: "smartnest/visitors/list" });
      this.visits = res.visitors;
    } catch {
      this.visits = [];
    }
  }

  private open(v: Visit) {
    const loc = LOCALE[this.ctx.lang];
    const when = new Date(v.time);
    this.ctx.showSheet({
      title: when.toLocaleString(loc, { weekday: "long", hour: "2-digit", minute: "2-digit" }),
      render: (c) => html`<img src=${c.hass.hassUrl(v.url)} alt="" style="width:100%;border-radius:var(--r-md);display:block" />`,
    });
  }

  render() {
    const { ctx } = this;
    const loc = LOCALE[ctx.lang];
    const visits = this.visits ?? [];
    const dayOf = (d: Date) => {
      const today = new Date();
      const y = new Date(today.getTime() - 86_400_000);
      if (d.toDateString() === today.toDateString()) return ctx.t("today");
      if (d.toDateString() === y.toDateString()) return ctx.t("yesterday");
      return d.toLocaleDateString(loc, { weekday: "short", day: "numeric", month: "short" });
    };
    let lastDay = "";
    return html`<div class="wrap glass">
      <h3><sn-icon icon="doorbell"></sn-icon>${ctx.t("widget_visitors")}</h3>
      <div class="strip" data-no-swipe>
        ${this.visits && !visits.length ? html`<span class="empty">${ctx.t("no_visitors")}</span>` : nothing}
        ${visits.map((v, i) => {
          const d = new Date(v.time);
          const day = dayOf(d);
          const first = day !== lastDay;
          lastDay = day;
          return html`<button class="shot pressable" style="animation-delay:${Math.min(i, 8) * 40}ms" @click=${() => this.open(v)}>
              <img src=${ctx.hass.hassUrl(v.url)} alt="" loading="lazy" />
              ${first ? html`<em class="tag">${day}</em>` : nothing}
              <span>${d.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" })}</span>
            </button>`;
        })}
      </div>
    </div>`;
  }
}
