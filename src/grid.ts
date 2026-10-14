import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import type { Ctx } from "./ctx";
import type { Page, Widget } from "./types";
import { COLS, WIDGET_SIZES, resolveLayout } from "./config";
import { GAP, ROW_H, shared } from "./theme";
import { widgetSettingsSheet } from "./editors";
import { planFor, widgetFeature } from "./plans";
import type { I18nKey } from "./i18n";
import "./ui/icon";
import "./widgets/tile";
import "./widgets/floorplan";
import "./widgets/camera";
import "./widgets/heading";
import "./widgets/clock";
import "./widgets/modes";
import "./widgets/vacuum";
import "./widgets/visitors";
import "./widgets/energy";
import "./widgets/energy-stats";
import "./widgets/panic";
import "./widgets/check";
import "./widgets/family";
import "./widgets/todo";
import "./widgets/calendar";
import "./widgets/forecast";
import "./widgets/countdown";
import "./widgets/gauge";
import "./widgets/gate";
import "./widgets/frigate";
import "./widgets/schedule";
import "./widgets/media";
import "./widgets/remote";
import "./widgets/prayer";
import "./widgets/group";
import "./widgets/batteries";
import "./widgets/sensor";
import "./widgets/scenes";
import "./widgets/ac";
import "./widgets/room";
import "./widgets/stack";
import "./widgets/hero";
import "./widgets/parcels";
import "./widgets/commute";
import "./widgets/radar";
import "./widgets/verse";
import "./widgets/board";
import "./widgets/internet";
import "./widgets/timeline";
import "./widgets/irrigation";
import "./widgets/boiler";
import "./widgets/air";
import "./widgets/chores";
import "./widgets/wake";
import "./widgets/water";
import "./widgets/consumers";

interface Gesture {
  id: string;
  mode: "move" | "resize";
  pointerId: number;
  offCol: number;
  offRow: number;
}

/** Narrow screens stack widgets: small ones go two per row, everything else spans the width. */
const narrowSpan = (w: Widget) => (w.type === "tile" && w.w <= 4 ? 2 : 4);

@customElement("sn-page-grid")
export class SnPageGrid extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) page!: Page;
  @state() private preview?: Widget[];
  private gesture?: Gesture;
  private rects = new Map<string, DOMRect>();

  static styles = [
    shared,
    css`
      :host {
        display: block;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(${COLS}, minmax(0, 1fr));
        grid-auto-rows: ${ROW_H}px;
        gap: ${GAP}px;
        position: relative;
      }
      .grid.narrow {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        grid-auto-rows: minmax(${ROW_H}px, auto);
      }
      .cell {
        position: relative;
        min-width: 0;
        min-height: 0;
      }
      .cell > :first-child {
        height: 100%;
      }
      .editing .cell {
        animation: wiggle 0.34s ease-in-out infinite alternate;
        animation-play-state: var(--loops, running);
        border-radius: var(--r-lg);
        outline: 1.5px dashed color-mix(in srgb, var(--text-2) 45%, transparent);
        outline-offset: 3px;
      }
      .editing .cell:nth-child(2n) {
        animation-delay: -0.17s;
        animation-direction: alternate-reverse;
      }
      .editing .cell:nth-child(3n) {
        animation-duration: 0.38s;
      }
      @keyframes wiggle {
        from {
          rotate: -0.35deg;
        }
        to {
          rotate: 0.35deg;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .editing .cell {
          animation: none;
        }
      }
      .cell.lifted {
        animation: none;
        z-index: 5;
        filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.25));
        outline-color: var(--accent);
        outline-style: solid;
      }
      .surface {
        position: absolute;
        inset: 0;
        z-index: 6;
        cursor: grab;
        touch-action: none;
        border-radius: var(--r-lg);
      }
      .lifted .surface {
        cursor: grabbing;
      }
      .badge {
        position: absolute;
        top: -10px;
        z-index: 7;
        width: 30px;
        height: 30px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: var(--surface-solid);
        color: var(--text);
        box-shadow: var(--shadow);
        border: 1px solid var(--border);
        --icon-size: 16px;
        animation: badge-in 360ms var(--spring);
      }
      .badge.del {
        inset-inline-start: -10px;
        background: var(--alert);
        color: var(--on-alert);
        border: 0;
      }
      .badge.cog {
        inset-inline-end: -10px;
      }
      .handle {
        position: absolute;
        top: 12px;
        inset-inline-start: 12px;
        z-index: 7;
        width: 36px;
        height: 36px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: var(--surface-solid);
        box-shadow: var(--shadow);
        cursor: grab;
        touch-action: none;
        --icon-size: 18px;
      }
      @keyframes badge-in {
        from {
          transform: scale(0.4);
          opacity: 0;
        }
      }
      .resize {
        position: absolute;
        bottom: -6px;
        inset-inline-end: -6px;
        z-index: 7;
        width: 28px;
        height: 28px;
        border-radius: 999px;
        background: var(--accent);
        color: var(--on-accent);
        display: grid;
        place-items: center;
        cursor: nwse-resize;
        touch-action: none;
        box-shadow: var(--shadow);
        --icon-size: 16px;
      }
      :host([rtl]) .resize {
        cursor: nesw-resize;
      }
      .empty {
        padding: 80px 24px;
        text-align: center;
        color: var(--text-2);
        display: grid;
        gap: 6px;
        justify-items: center;
        --icon-size: 48px;
      }
      .empty strong {
        color: var(--text);
        font-size: 18px;
      }
    `,
  ];

  protected willUpdate() {
    this.toggleAttribute("rtl", this.ctx.rtl);
    // FLIP, step 1: remember where every widget was before this render.
    this.rects.clear();
    if (!this.ctx.editing) return;
    this.renderRoot?.querySelectorAll<HTMLElement>(".cell").forEach((el) => this.rects.set(el.dataset.id!, el.getBoundingClientRect()));
  }

  protected updated() {
    // FLIP, step 2: animate each widget from its old spot to its new one.
    if (!this.rects.size) return;
    this.renderRoot.querySelectorAll<HTMLElement>(".cell").forEach((el) => {
      const before = this.rects.get(el.dataset.id!);
      if (!before || el.classList.contains("lifted")) return;
      const after = el.getBoundingClientRect();
      const dx = before.left - after.left;
      const dy = before.top - after.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
      el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], {
        duration: 320,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      });
    });
  }

  private get widgets(): Widget[] {
    return this.preview ?? this.page.widgets;
  }

  private pointerCell(e: PointerEvent) {
    const grid = this.renderRoot.querySelector<HTMLElement>(".grid")!;
    const r = grid.getBoundingClientRect();
    const pitchX = (r.width + GAP) / COLS;
    const pitchY = ROW_H + GAP;
    const px = this.ctx.rtl ? r.right - e.clientX : e.clientX - r.left;
    const py = e.clientY - r.top;
    return { px, py, pitchX, pitchY, col: Math.floor(px / pitchX), row: Math.floor(py / pitchY) };
  }

  private start(e: PointerEvent, w: Widget, mode: Gesture["mode"]) {
    if (e.button !== 0 || this.ctx.narrow) return;
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const { col, row } = this.pointerCell(e);
    this.gesture = { id: w.id, mode, pointerId: e.pointerId, offCol: col - w.x, offRow: row - w.y };
    this.preview = this.page.widgets.map((x) => ({ ...x }));
    navigator.vibrate?.(6);
  }

  private move(e: PointerEvent) {
    const g = this.gesture;
    if (!g || e.pointerId !== g.pointerId || !this.preview) return;
    const cur = this.preview.find((x) => x.id === g.id)!;
    const { px, py, pitchX, pitchY, col, row } = this.pointerCell(e);
    let next: Widget;
    if (g.mode === "move") {
      next = { ...cur, x: Math.min(Math.max(col - g.offCol, 0), COLS - cur.w), y: Math.max(row - g.offRow, 0) };
    } else {
      const min = WIDGET_SIZES[cur.type];
      next = {
        ...cur,
        w: Math.min(Math.max(Math.round((px - cur.x * pitchX) / pitchX), min.minW), COLS - cur.x),
        h: Math.min(Math.max(Math.round((py - cur.y * pitchY) / pitchY), min.minH), 40),
      };
    }
    if (next.x === cur.x && next.y === cur.y && next.w === cur.w && next.h === cur.h) return;
    const base = this.page.widgets.map((x) => (x.id === g.id ? next : x));
    this.preview = resolveLayout(base, g.id);
  }

  private end(e: PointerEvent) {
    const g = this.gesture;
    if (!g || e.pointerId !== g.pointerId) return;
    this.move(e); // the release point counts, even if no move event fired right before it
    const result = this.preview;
    this.gesture = undefined;
    this.preview = undefined;
    if (!result) return;
    const pageId = this.page.id;
    this.ctx.update((d) => {
      const p = d.pages.find((x) => x.id === pageId);
      if (p) p.widgets = resolveLayout(result);
    });
  }

  private removeWidget(w: Widget) {
    const pageId = this.page.id;
    this.ctx.update((d) => {
      const p = d.pages.find((x) => x.id === pageId);
      if (p) p.widgets = resolveLayout(p.widgets.filter((x) => x.id !== w.id));
    });
  }

  private renderWidget(w: Widget) {
    const { ctx } = this;
    if (!ctx.allows(widgetFeature(w.type)))
      return html`<div class="glass" style="height:100%;border-radius:var(--r-lg);display:grid;place-items:center;align-content:center;gap:6px;color:var(--text-2);text-align:center;padding:12px;--icon-size:26px">
        <sn-icon icon="lock"></sn-icon>
        <span style="font-size:14px">${ctx.t(`widget_${w.type}` as I18nKey)} · ${ctx.t("plan_needed", { plan: ctx.t(`plan_${planFor(widgetFeature(w.type))}` as I18nKey) })}</span>
      </div>`;
    switch (w.type) {
      case "tile":
        return html`<sn-w-tile .ctx=${ctx} .widget=${w}></sn-w-tile>`;
      case "floorplan":
        return html`<sn-w-floorplan .ctx=${ctx} .widget=${w}></sn-w-floorplan>`;
      case "camera":
        return html`<sn-w-camera .ctx=${ctx} .widget=${w}></sn-w-camera>`;
      case "heading":
        return html`<sn-w-heading .ctx=${ctx} .widget=${w}></sn-w-heading>`;
      case "clock":
        return html`<sn-w-clock .ctx=${ctx} .widget=${w}></sn-w-clock>`;
      case "modes":
        return html`<sn-w-modes .ctx=${ctx} .widget=${w}></sn-w-modes>`;
      case "vacuum":
        return html`<sn-w-vacuum .ctx=${ctx} .widget=${w}></sn-w-vacuum>`;
      case "visitors":
        return html`<sn-w-visitors .ctx=${ctx} .widget=${w}></sn-w-visitors>`;
      case "energy":
        return html`<sn-w-energy .ctx=${ctx} .widget=${w}></sn-w-energy>`;
      case "energy_stats":
        return html`<sn-w-energy-stats .ctx=${ctx} .widget=${w}></sn-w-energy-stats>`;
      case "panic":
        return html`<sn-w-panic .ctx=${ctx} .widget=${w}></sn-w-panic>`;
      case "check":
        return html`<sn-w-check .ctx=${ctx} .widget=${w}></sn-w-check>`;
      case "family":
        return html`<sn-w-family .ctx=${ctx} .widget=${w}></sn-w-family>`;
      case "todo":
        return html`<sn-w-todo .ctx=${ctx} .widget=${w}></sn-w-todo>`;
      case "calendar":
        return html`<sn-w-calendar .ctx=${ctx} .widget=${w}></sn-w-calendar>`;
      case "forecast":
        return html`<sn-w-forecast .ctx=${ctx} .widget=${w}></sn-w-forecast>`;
      case "countdown":
        return html`<sn-w-countdown .ctx=${ctx} .widget=${w}></sn-w-countdown>`;
      case "gauge":
        return html`<sn-w-gauge .ctx=${ctx} .widget=${w}></sn-w-gauge>`;
      case "gate":
        return html`<sn-w-gate .ctx=${ctx} .widget=${w}></sn-w-gate>`;
      case "frigate":
        return html`<sn-w-frigate .ctx=${ctx} .widget=${w}></sn-w-frigate>`;
      case "schedule":
        return html`<sn-w-schedule .ctx=${ctx} .widget=${w}></sn-w-schedule>`;
      case "media":
        return html`<sn-w-media .ctx=${ctx} .widget=${w}></sn-w-media>`;
      case "remote":
        return html`<sn-w-remote .ctx=${ctx} .widget=${w}></sn-w-remote>`;
      case "consumers":
        return html`<sn-w-consumers .ctx=${ctx} .widget=${w}></sn-w-consumers>`;
      case "water":
        return html`<sn-w-water .ctx=${ctx} .widget=${w}></sn-w-water>`;
      case "wake":
        return html`<sn-w-wake .ctx=${ctx} .widget=${w}></sn-w-wake>`;
      case "chores":
        return html`<sn-w-chores .ctx=${ctx} .widget=${w}></sn-w-chores>`;
      case "air":
        return html`<sn-w-air .ctx=${ctx} .widget=${w}></sn-w-air>`;
      case "boiler":
        return html`<sn-w-boiler .ctx=${ctx} .widget=${w}></sn-w-boiler>`;
      case "irrigation":
        return html`<sn-w-irrigation .ctx=${ctx} .widget=${w}></sn-w-irrigation>`;
      case "timeline":
        return html`<sn-w-timeline .ctx=${ctx} .widget=${w}></sn-w-timeline>`;
      case "internet":
        return html`<sn-w-internet .ctx=${ctx} .widget=${w}></sn-w-internet>`;
      case "board":
        return html`<sn-w-board .ctx=${ctx} .widget=${w}></sn-w-board>`;
      case "verse":
        return html`<sn-w-verse .ctx=${ctx} .widget=${w}></sn-w-verse>`;
      case "radar":
        return html`<sn-w-radar .ctx=${ctx} .widget=${w}></sn-w-radar>`;
      case "commute":
        return html`<sn-w-commute .ctx=${ctx} .widget=${w}></sn-w-commute>`;
      case "parcels":
        return html`<sn-w-parcels .ctx=${ctx} .widget=${w}></sn-w-parcels>`;
      case "hero":
        return html`<sn-w-hero .ctx=${ctx} .widget=${w}></sn-w-hero>`;
      case "stack":
        return html`<sn-w-stack .ctx=${ctx} .widget=${w}></sn-w-stack>`;
      case "room":
        return html`<sn-w-room .ctx=${ctx} .widget=${w}></sn-w-room>`;
      case "ac":
        return html`<sn-w-ac .ctx=${ctx} .widget=${w}></sn-w-ac>`;
      case "scenes":
        return html`<sn-w-scenes .ctx=${ctx} .widget=${w}></sn-w-scenes>`;
      case "sensor":
        return html`<sn-w-sensor .ctx=${ctx} .widget=${w}></sn-w-sensor>`;
      case "batteries":
        return html`<sn-w-batteries .ctx=${ctx} .widget=${w}></sn-w-batteries>`;
      case "lights":
        return html`<sn-w-group .ctx=${ctx} .widget=${w} domain="light"></sn-w-group>`;
      case "covers":
        return html`<sn-w-group .ctx=${ctx} .widget=${w} domain="cover"></sn-w-group>`;
      case "prayer":
        return html`<sn-w-prayer .ctx=${ctx} .widget=${w}></sn-w-prayer>`;
      default:
        return nothing;
    }
  }

  private renderChrome(w: Widget) {
    const { t, narrow } = this.ctx;
    const lifted = this.gesture?.id === w.id;
    // Small widgets drag from anywhere; the floor plan keeps its surface for placing devices, so it gets a handle.
    return html`
      ${!narrow && w.type !== "floorplan"
        ? html`<div
            class="surface"
            @pointerdown=${(e: PointerEvent) => this.start(e, w, "move")}
            @pointermove=${this.move}
            @pointerup=${this.end}
            @pointercancel=${this.end}
          ></div>`
        : nothing}
      ${!narrow && w.type === "floorplan"
        ? html`<button
            class="handle"
            aria-label="drag"
            @pointerdown=${(e: PointerEvent) => this.start(e, w, "move")}
            @pointermove=${this.move}
            @pointerup=${this.end}
            @pointercancel=${this.end}
          >
            <sn-icon icon="drag"></sn-icon>
          </button>`
        : nothing}
      ${!lifted
        ? html`<button class="badge del pressable" aria-label=${t("delete")} @click=${() => this.removeWidget(w)}>
              <sn-icon icon="minus"></sn-icon>
            </button>
            <button class="badge cog pressable" aria-label=${t("widget_settings")} @click=${() => widgetSettingsSheet(this.ctx, this.page.id, w.id)}>
              <sn-icon icon="cog"></sn-icon>
            </button>`
        : nothing}
      ${!narrow
        ? html`<div
            class="resize"
            aria-label="resize"
            @pointerdown=${(e: PointerEvent) => this.start(e, w, "resize")}
            @pointermove=${this.move}
            @pointerup=${this.end}
            @pointercancel=${this.end}
          >
            <sn-icon icon="resize"></sn-icon>
          </div>`
        : nothing}
    `;
  }

  render() {
    const { ctx } = this;
    const widgets = this.widgets;
    if (!widgets.length)
      return html`<div class="empty">
        <sn-icon icon="dashboard"></sn-icon>
        <strong>${ctx.t("empty_page")}</strong>
        ${ctx.isAdmin && !ctx.editing ? html`<span>${ctx.t("empty_page_admin")}</span>` : nothing}
      </div>`;
    // A card for one device the installer hid goes too (still shown while editing, so it can be removed).
    const hidden = ctx.config.settings.hidden;
    const visible = ctx.editing || !hidden.length ? widgets : widgets.filter((w) => !(w.config.entity && hidden.includes(w.config.entity)));
    const ordered = ctx.narrow ? [...visible].sort((a, b) => a.y - b.y || a.x - b.x) : visible;
    return html`<div class="grid ${ctx.narrow ? "narrow" : ""} ${ctx.editing ? "editing" : ""}">
      ${repeat(
        ordered,
        (w) => w.id,
        (w) => {
          const style = ctx.narrow
            ? `grid-column: span ${narrowSpan(w)}; grid-row: span ${w.type === "floorplan" ? 1 : w.h}`
            : `grid-column: ${w.x + 1} / span ${w.w}; grid-row: ${w.y + 1} / span ${w.h}`;
          return html`<div class="cell ${this.gesture?.id === w.id ? "lifted" : ""}" data-id=${w.id} style=${style}>
            ${this.renderWidget(w)} ${ctx.editing ? this.renderChrome(w) : nothing}
          </div>`;
        }
      )}
    </div>`;
  }
}
