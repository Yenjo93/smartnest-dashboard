import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import type { Ctx } from "./ctx";
import type { Page, Widget } from "./types";
import { COLS, WIDGET_SIZES, resolveLayout } from "./config";
import { GAP, ROW_H, shared } from "./theme";
import { widgetSettingsSheet } from "./editors";
import "./ui/icon";
import "./widgets/tile";
import "./widgets/floorplan";
import "./widgets/camera";
import "./widgets/heading";
import "./widgets/clock";

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
        border-radius: var(--r-lg);
        outline: 1.5px dashed color-mix(in srgb, var(--text-2) 45%, transparent);
        outline-offset: 3px;
      }
      .cell.lifted {
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
    const ordered = ctx.narrow ? [...widgets].sort((a, b) => a.y - b.y || a.x - b.x) : widgets;
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
