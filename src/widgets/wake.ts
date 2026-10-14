import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { entityName } from "../entities";
import { uid } from "../config";
import { LOCALE } from "../i18n";
import { loadKv, saveKv, watchKv } from "../kv";
import { shared } from "../theme";
import "../ui/icon";

export interface WakeAlarm {
  id: string;
  time: string; // HH:MM, when the light is at full daylight
  days: string[]; // mon…sun; empty = every day
  light: string;
  minutes: number; // how long the sunrise takes
  on: boolean;
}

// Python weekday names, as the hub checks them.
const DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

/** Sunrise alarm: the bedroom light rises from a dim glow to daylight by wake-up time. Runs on the hub. */
@customElement("sn-w-wake")
export class SnWake extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private alarms: WakeAlarm[] = [];
  @state() private adding = false;
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
        gap: 10px;
        align-content: start;
        overflow: auto;
        position: relative;
      }
      .card::before {
        content: "";
        position: absolute;
        inset: auto 0 0 0;
        height: 60%;
        background: radial-gradient(ellipse at 50% 120%, rgba(255, 170, 70, 0.28), transparent 70%);
        pointer-events: none;
      }
      h3 {
        margin: 0;
        font-size: 16px;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .alarm {
        display: grid;
        grid-template-columns: 1fr auto auto;
        align-items: center;
        gap: 8px 10px;
        padding: 10px 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
        position: relative;
      }
      .alarm.off {
        opacity: 0.55;
      }
      .time {
        font-size: 30px;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        direction: ltr;
      }
      .info {
        grid-column: 1 / -1;
        min-width: 0;
        display: grid;
        gap: 2px;
        font-size: 13px;
        color: var(--text-2);
      }
      .days {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
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
        background: var(--accent);
        color: var(--on-accent);
      }
      form {
        display: grid;
        gap: 8px;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    loadKv<{ alarms: WakeAlarm[] }>(this.ctx.hass, "wake").then((v) => (this.alarms = v?.alarms ?? []));
    this.unwatch = watchKv<{ alarms: WakeAlarm[] }>(this.ctx.hass, "wake", (v) => (this.alarms = v?.alarms ?? []));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unwatch?.then((u) => u()).catch(() => undefined);
  }

  private save(alarms: WakeAlarm[]) {
    this.alarms = alarms;
    saveKv(this.ctx.hass, "wake", { alarms }).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  private patch(id: string, p: Partial<WakeAlarm>) {
    this.save(this.alarms.map((a) => (a.id === id ? { ...a, ...p } : a)));
  }

  render() {
    const { ctx } = this;
    const { t, hass, config } = ctx;
    const lights = Object.keys(hass.states).filter((id) => id.startsWith("light."));
    return html`<div class="card glass">
      <h3><sn-icon icon="weather-sunset-up" style="--icon-size:20px;color:#ff9f43"></sn-icon>${t("widget_wake")}</h3>
      ${this.alarms.map(
        (a) => html`<div class="alarm ${a.on ? "" : "off"}">
          <span class="time">${a.time}</span>
          <div class="seg">
            ${[true, false].map((v) => html`<button aria-pressed=${a.on === v} @click=${() => this.patch(a.id, { on: v })}>${t(v ? "on" : "off")}</button>`)}
          </div>
          <button class="icon-btn small pressable" aria-label=${t("delete")} @click=${() => this.save(this.alarms.filter((x) => x.id !== a.id))}>
            <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
          </button>
          <span class="info">
            <span>${a.light ? entityName(hass, config, a.light) : "–"} · ${t("wake_minutes", { n: a.minutes })}</span>
            <span class="days">
              ${DAYS.map((d) => {
                const on = !a.days.length || a.days.includes(d);
                return html`<button
                  aria-pressed=${on}
                  @click=${() => {
                    const cur = a.days.length ? a.days : [...DAYS];
                    const next = on ? cur.filter((x) => x !== d) : [...cur, d];
                    this.patch(a.id, { days: next.length === 7 ? [] : next });
                  }}
                >
                  ${new Date(2023, 0, 1 + DAYS.indexOf(d)).toLocaleDateString(LOCALE[ctx.lang], { weekday: "narrow" })}
                </button>`;
              })}
            </span>
          </span>
        </div>`
      )}
      ${this.adding
        ? html`<form
            @submit=${(e: SubmitEvent) => {
              e.preventDefault();
              const f = e.currentTarget as HTMLFormElement;
              const val = (n: string) => (f.elements.namedItem(n) as HTMLInputElement).value;
              if (!val("time") || !val("light")) return;
              this.save([...this.alarms, { id: uid(), time: val("time"), light: val("light"), minutes: Number(val("minutes")) || 20, days: [], on: true }]);
              this.adding = false;
            }}
          >
            <input name="time" type="time" value="06:30" />
            <select name="light">
              ${lights.map((id) => html`<option value=${id}>${entityName(hass, config, id)}</option>`)}
            </select>
            <select name="minutes">
              ${[10, 20, 30].map((n) => html`<option value=${n} ?selected=${n === 20}>${t("wake_minutes", { n })}</option>`)}
            </select>
            <div style="display:flex;gap:8px">
              <button class="btn primary pressable" type="submit">${t("save")}</button>
              <button class="btn pressable" type="button" @click=${() => (this.adding = false)}>${t("cancel")}</button>
            </div>
          </form>`
        : html`<button class="btn pressable" style="justify-self:start" @click=${() => (this.adding = true)}>
            <sn-icon icon="plus" style="--icon-size:18px"></sn-icon>${t("wake_add")}
          </button>`}
      ${!this.alarms.length && !this.adding ? html`<span class="muted" style="font-size:14px">${t("wake_hint")}</span>` : nothing}
    </div>`;
  }
}
