import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { entityName, isActive } from "../entities";
import { uid } from "../config";
import { LOCALE } from "../i18n";
import { loadKv, saveKv, watchKv } from "../kv";
import { shared } from "../theme";
import "../ui/icon";

interface Plan {
  id: string;
  at: string; // hot water ready by
  days: string[];
  on: boolean;
}
export interface Boiler {
  entity?: string;
  heat_minutes: number;
  keep_minutes: number;
  plans: Plan[];
  /** Turns off at (epoch s). */
  until?: number | null;
  /** Hot by (epoch s), while a plan is heating. */
  ready_at?: number | null;
}

const EMPTY: Boiler = { heat_minutes: 40, keep_minutes: 20, plans: [] };
const DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export const guessBoiler = (ids: string[]) =>
  ids.find((id) => id.startsWith("water_heater.")) ?? ids.find((id) => id.startsWith("switch.") && /boiler|heater|geyser|سخان|دود|بويلر/i.test(id));

/** The water heater: "hot water by 7", a timer, and how long until it's ready. */
@customElement("sn-w-boiler")
export class SnBoiler extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private b: Boiler = EMPTY;
  @state() private loaded = false;
  @state() private now = Date.now();
  private unwatch?: Promise<() => void>;
  private tick?: number;

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
      .tank {
        position: relative;
        width: 44px;
        height: 60px;
        border-radius: 14px;
        background: var(--surface-2);
        overflow: hidden;
        flex: none;
        box-shadow: inset 0 0 0 2px var(--border);
      }
      .tank i {
        position: absolute;
        inset: auto 0 0 0;
        height: var(--fill);
        background: linear-gradient(0deg, #e5484d, #ff9f43);
        transition: height 1s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .tank.on i::after {
        content: "";
        position: absolute;
        inset: -6px 0 auto;
        height: 12px;
        background: radial-gradient(circle at 25% 50%, rgba(255, 255, 255, 0.5) 2px, transparent 3px) 0 0 / 12px 12px;
        animation: bubble 1.6s linear infinite;
      }
      .head b {
        font-size: 18px;
        display: block;
      }
      .head span {
        color: var(--text-2);
        font-size: 14px;
      }
      .row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .plan {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      .plan .t {
        font-size: 22px;
        font-weight: 700;
        direction: ltr;
      }
      .plan .d {
        flex: 1;
        font-size: 12px;
        color: var(--text-2);
      }
      @keyframes bubble {
        to {
          transform: translateY(-14px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .tank.on i::after {
          animation: none;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    loadKv<Boiler>(this.ctx.hass, "boiler").then((v) => {
      this.b = { ...EMPTY, ...(v ?? {}) };
      this.loaded = true;
    });
    this.unwatch = watchKv<Boiler>(this.ctx.hass, "boiler", (v) => (this.b = { ...EMPTY, ...(v ?? {}) }));
    this.tick = window.setInterval(() => (this.now = Date.now()), 30_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unwatch?.then((u) => u()).catch(() => undefined);
    window.clearInterval(this.tick);
  }

  private save(b: Boiler) {
    this.b = b;
    saveKv(this.ctx.hass, "boiler", b).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  private get entity() {
    return this.b.entity ?? guessBoiler(Object.keys(this.ctx.hass.states));
  }

  private power(on: boolean, minutes?: number) {
    const id = this.entity;
    if (!id) return;
    this.ctx.hass.callService("homeassistant", on ? "turn_on" : "turn_off", { entity_id: id }).catch(() => this.ctx.toast(this.ctx.t("error")));
    this.save({ ...this.b, entity: id, until: on && minutes ? Date.now() / 1000 + minutes * 60 : null, ready_at: on && minutes ? Date.now() / 1000 + Math.min(minutes, this.b.heat_minutes) * 60 : null });
  }

  render() {
    const { ctx } = this;
    const { t, hass, config, lang } = ctx;
    const id = this.entity;
    const e = id ? hass.states[id] : undefined;
    const on = isActive(e);
    const b = this.b;
    const left = b.ready_at ? Math.max(0, Math.round((b.ready_at * 1000 - this.now) / 60_000)) : undefined;
    const off = b.until ? Math.max(0, Math.round((b.until * 1000 - this.now) / 60_000)) : undefined;
    // How full of hot water the drawing looks: heating fills it up towards "ready".
    const fill = !on ? 15 : left !== undefined && b.heat_minutes ? Math.round(100 - (left / b.heat_minutes) * 80) : 90;
    const next = b.plans.filter((p) => p.on).map((p) => p.at).sort()[0];
    return html`<div class="card glass">
      <div class="head">
        <span class="tank ${on ? "on" : ""}" style="--fill:${fill}%"><i></i></span>
        <div style="flex:1">
          <b>${id ? entityName(hass, config, id) : t("widget_boiler")}</b>
          <span
            >${!id
              ? t("no_entities")
              : on
              ? left
                ? t("boiler_ready_in", { n: left })
                : off !== undefined
                ? t("boiler_off_in", { n: off })
                : t("boiler_hot")
              : next
              ? t("boiler_next", { at: next })
              : t("off")}</span
          >
        </div>
      </div>
      ${id
        ? html`<div class="row">
            ${on
              ? html`<button class="btn pressable" @click=${() => this.power(false)}>${t("turn_off")}</button>`
              : [30, 45, 60].map((m) => html`<button class="btn pressable" @click=${() => this.power(true, m)}>🔥 ${t("boiler_for", { n: m })}</button>`)}
          </div>`
        : nothing}
      ${this.loaded
        ? html`${b.plans.map(
              (p) => html`<div class="plan">
                <span class="t">${p.at}</span>
                <span class="d">${t("boiler_plan", { n: b.heat_minutes })} · ${p.days.length ? p.days.map((d) => new Date(2023, 0, 1 + DAYS.indexOf(d)).toLocaleDateString(LOCALE[lang], { weekday: "short" })).join("، ") : t("every_day")}</span>
                <div class="seg">
                  ${[true, false].map(
                    (v) => html`<button aria-pressed=${p.on === v} @click=${() => this.save({ ...b, entity: id, plans: b.plans.map((x) => (x.id === p.id ? { ...x, on: v } : x)) })}>${t(v ? "on" : "off")}</button>`
                  )}
                </div>
                <button class="icon-btn small pressable" aria-label=${t("delete")} @click=${() => this.save({ ...b, plans: b.plans.filter((x) => x.id !== p.id) })}>
                  <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                </button>
              </div>`
            )}
            <form
              class="row"
              @submit=${(ev: SubmitEvent) => {
                ev.preventDefault();
                const at = ((ev.currentTarget as HTMLFormElement).elements.namedItem("at") as HTMLInputElement).value;
                if (at) this.save({ ...b, entity: id, plans: [...b.plans, { id: uid(), at, days: [], on: true }] });
              }}
            >
              <span style="align-self:center;font-size:14px">${t("boiler_want")}</span>
              <input name="at" type="time" value="07:00" style="width:auto" />
              <button class="btn primary pressable" type="submit">${t("add")}</button>
            </form>`
        : nothing}
    </div>`;
  }
}
