import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { domainOf, entityName, isActive } from "../entities";
import { LOCALE } from "../i18n";
import { loadKv, saveKv, watchKv } from "../kv";
import { shared } from "../theme";
import "../ui/icon";

export interface Irrigation {
  entity?: string;
  at: string;
  minutes: number;
  days: string[];
  skip_rain: boolean;
  on: boolean;
  last?: { date: string; skipped: boolean; reason?: string };
}

const EMPTY: Irrigation = { at: "05:30", minutes: 15, days: [], skip_rain: true, on: false };
const DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const guess = (ids: string[]) =>
  ids.find((id) => (id.startsWith("valve.") || id.startsWith("switch.")) && /irrigat|sprinkler|garden|lawn|drip|ري|رشاش|جنين|حديق/i.test(id));

/** Garden watering on a schedule that skips itself when rain is coming. Runs on the hub. */
@customElement("sn-w-irrigation")
export class SnIrrigation extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private ir: Irrigation = EMPTY;
  private unwatch?: Promise<() => void>;

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
      .drop {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: color-mix(in srgb, #2bb673 18%, transparent);
        color: #2bb673;
        flex: none;
      }
      .drop.on {
        animation: pulse 1.6s ease-in-out infinite;
      }
      .head b {
        font-size: 17px;
        display: block;
      }
      .head span {
        font-size: 13px;
        color: var(--text-2);
      }
      .row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
      }
      .days button {
        min-width: 34px;
        min-height: 34px;
        border-radius: 999px;
        border: 0;
        background: var(--surface-2);
        color: var(--text);
        font: 600 12px var(--font);
        cursor: pointer;
      }
      .days button[aria-pressed="true"] {
        background: #2bb673;
        color: #fff;
      }
      .last {
        font-size: 13px;
        padding: 8px 10px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      @keyframes pulse {
        50% {
          transform: scale(1.08);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .drop.on {
          animation: none;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    loadKv<Irrigation>(this.ctx.hass, "irrigation").then((v) => (this.ir = { ...EMPTY, ...(v ?? {}) }));
    this.unwatch = watchKv<Irrigation>(this.ctx.hass, "irrigation", (v) => (this.ir = { ...EMPTY, ...(v ?? {}) }));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unwatch?.then((u) => u()).catch(() => undefined);
  }

  /** A valve chosen in the widget's settings goes to the store the hub waters from. */
  updated() {
    const chosen = this.widget.config.entity;
    if (chosen && this.ir.entity !== chosen) this.save({ entity: chosen });
  }

  private save(p: Partial<Irrigation>) {
    const entity = this.widget.config.entity ?? this.ir.entity ?? guess(Object.keys(this.ctx.hass.states));
    this.ir = { ...this.ir, entity, ...p };
    saveKv(this.ctx.hass, "irrigation", this.ir).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  render() {
    const { ctx } = this;
    const { t, hass, config, lang } = ctx;
    const ir = this.ir;
    const id = this.widget.config.entity ?? ir.entity ?? guess(Object.keys(hass.states));
    const e = id ? hass.states[id] : undefined;
    const running = isActive(e) || e?.state === "open";
    return html`<div class="card glass">
      <div class="head">
        <span class="drop ${running ? "on" : ""}"><sn-icon icon="sprinkler" style="--icon-size:24px"></sn-icon></span>
        <div style="flex:1">
          <b>${t("widget_irrigation")}</b>
          <span>${running ? t("irr_running") : ir.on ? t("irr_next", { at: ir.at, n: ir.minutes }) : t("off")}</span>
        </div>
        <div class="seg">${[true, false].map((v) => html`<button aria-pressed=${ir.on === v} @click=${() => this.save({ on: v })}>${t(v ? "on" : "off")}</button>`)}</div>
      </div>
      ${!id ? html`<span class="muted" style="font-size:14px">${t(ctx.isAdmin ? "irr_pick" : "no_entities")}</span>` : nothing}
      <div class="row">
        <input type="time" style="width:auto" .value=${ir.at} @change=${(ev: any) => this.save({ at: ev.target.value })} />
        <input type="number" min="1" max="120" style="width:80px" .value=${String(ir.minutes)} @change=${(ev: any) => this.save({ minutes: Number(ev.target.value) || 15 })} />
        <span>${t("minutes")}</span>
      </div>
      <div class="row days">
        ${DAYS.map((d) => {
          const on = !ir.days.length || ir.days.includes(d);
          return html`<button
            aria-pressed=${on}
            @click=${() => {
              const cur = ir.days.length ? ir.days : [...DAYS];
              const next = on ? cur.filter((x) => x !== d) : [...cur, d];
              this.save({ days: next.length === 7 ? [] : next });
            }}
          >
            ${new Date(2023, 0, 1 + DAYS.indexOf(d)).toLocaleDateString(LOCALE[lang], { weekday: "narrow" })}
          </button>`;
        })}
      </div>
      <label class="row" style="gap:8px"><input type="checkbox" .checked=${ir.skip_rain} @change=${(ev: any) => this.save({ skip_rain: ev.target.checked })} />🌧️ ${t("irr_skip_rain")}</label>
      ${ir.last
        ? html`<div class="last">${ir.last.skipped ? `🌧️ ${t("irr_skipped", { date: ir.last.date })}` : `💧 ${t("irr_watered", { date: ir.last.date })}`}</div>`
        : nothing}
      ${id && !running
        ? html`<button
            class="btn pressable"
            style="justify-self:start"
            @click=${async () => {
              await hass.callService(domainOf(id) === "valve" ? "valve" : "homeassistant", domainOf(id) === "valve" ? "open_valve" : "turn_on", { entity_id: id }).catch(() => undefined);
              hass.callWS({ type: "smartnest/timer/set", entity_id: id, minutes: 10 }).catch(() => undefined);
            }}
          >
            💧 ${t("irr_now")}
          </button>`
        : nothing}
    </div>`;
  }
}
