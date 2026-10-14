import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import { LOCALE } from "./i18n";
import { loadKv, saveKv } from "./kv";
import { shared } from "./theme";
import { haptic } from "./ui/haptic";

export interface AcPlan {
  entity: string;
  on: boolean;
  /** Sunday first; bit n = hour n. */
  hours: number[];
  temp: number;
  mode: string;
}
interface AcWeek {
  plans: AcPlan[];
}

/**
 * The AC's week on one grid: drag across the hours it should run, for each day. Home Assistant runs it (the
 * dashboard can be closed): on at the start of each block in the chosen mode and temperature, off at its end.
 */
@customElement("sn-ac-week")
export class SnAcWeek extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property() entity = "";
  @state() private plan?: AcPlan;
  @state() private all: AcPlan[] = [];
  private paint?: boolean;

  static styles = [
    shared,
    css`
      :host {
        display: grid;
        gap: 14px;
      }
      .grid {
        display: grid;
        grid-template-columns: 34px repeat(24, minmax(10px, 1fr));
        gap: 2px;
        touch-action: none;
        user-select: none;
        direction: ltr;
      }
      .h {
        font-size: 10px;
        color: var(--text-2);
        text-align: center;
      }
      .d {
        font-size: 12px;
        color: var(--text-2);
        align-self: center;
      }
      .c {
        height: 26px;
        border-radius: 5px;
        background: var(--surface-2);
        transition: background 120ms;
      }
      .c.on {
        background: #3a9bff;
      }
      .c.on.heat {
        background: #ff8a3d;
      }
      .row {
        display: flex;
        gap: 10px;
        align-items: center;
        flex-wrap: wrap;
      }
      .row input[type="number"] {
        width: 90px;
      }
    `,
  ];

  async connectedCallback() {
    super.connectedCallback();
    const v = await loadKv<AcWeek>(this.ctx.hass, "ac_week");
    this.all = v?.plans ?? [];
    this.plan = this.all.find((p) => p.entity === this.entity) ?? { entity: this.entity, on: true, hours: [0, 0, 0, 0, 0, 0, 0], temp: 23, mode: "cool" };
  }

  private save() {
    const p = this.plan!;
    this.all = [...this.all.filter((x) => x.entity !== p.entity), p];
    saveKv(this.ctx.hass, "ac_week", { plans: this.all }).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  private set(day: number, hour: number, on: boolean) {
    const p = this.plan!;
    const hours = [...p.hours];
    const bit = 1 << hour;
    const next = on ? hours[day] | bit : hours[day] & ~bit;
    if (next === hours[day]) return;
    hours[day] = next;
    haptic("tick");
    this.plan = { ...p, hours };
  }

  private cellAt(e: PointerEvent): [number, number] | undefined {
    const el = (this.renderRoot as ShadowRoot).elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
    const d = el?.dataset.d;
    return d === undefined ? undefined : [Number(d), Number(el!.dataset.h)];
  }

  render() {
    const { ctx } = this;
    const { t } = ctx;
    const p = this.plan;
    if (!p) return html`<sn-skeleton></sn-skeleton>`;
    const modes: string[] = (ctx.hass.states[this.entity]?.attributes.hvac_modes ?? ["cool", "heat"]).filter((m: string) => m !== "off");
    const day = (i: number) => new Date(2023, 0, 1 + i).toLocaleDateString(LOCALE[ctx.lang], { weekday: "short" });
    return html`<span class="hint" style="margin:0">${t("acw_hint")}</span>
      <div
        class="grid"
        @pointerdown=${(e: PointerEvent) => {
          const c = this.cellAt(e);
          if (!c) return;
          try {
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          } catch {
            /* the finger is already gone */
          }
          this.paint = !((p.hours[c[0]] >> c[1]) & 1);
          this.set(c[0], c[1], this.paint);
        }}
        @pointermove=${(e: PointerEvent) => {
          if (this.paint === undefined) return;
          const c = this.cellAt(e);
          if (c) this.set(c[0], c[1], this.paint);
        }}
        @pointerup=${() => {
          if (this.paint !== undefined) this.save();
          this.paint = undefined;
        }}
        @pointercancel=${() => (this.paint = undefined)}
      >
        <span></span>
        ${Array.from({ length: 24 }, (_, h) => html`<span class="h">${h % 3 === 0 ? h : ""}</span>`)}
        ${Array.from({ length: 7 }, (_, d) => [
          html`<span class="d">${day(d)}</span>`,
          ...Array.from({ length: 24 }, (_, h) => html`<span class="c ${(p.hours[d] >> h) & 1 ? "on" : ""} ${p.mode === "heat" ? "heat" : ""}" data-d=${d} data-h=${h}></span>`),
        ])}
      </div>
      <div class="row">
        <div class="seg">
          ${modes.map((m) => html`<button aria-pressed=${p.mode === m} @click=${() => ((this.plan = { ...p, mode: m }), this.save())}>${t(m as any)}</button>`)}
        </div>
        <input type="number" min="16" max="30" step="0.5" .value=${String(p.temp)} @change=${(e: any) => ((this.plan = { ...p, temp: Number(e.target.value) || 23 }), this.save())} />°
        <div class="seg">
          ${[true, false].map((v) => html`<button aria-pressed=${p.on === v} @click=${() => ((this.plan = { ...p, on: v }), this.save())}>${t(v ? "on" : "off")}</button>`)}
        </div>
      </div>`;
  }
}

export const acWeekSheet = (ctx: Ctx, entity: string, title: string) =>
  ctx.showSheet({ still: true, title, render: (c) => html`<sn-ac-week .ctx=${c} .entity=${entity}></sn-ac-week>` });
