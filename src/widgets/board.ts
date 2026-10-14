import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { relativeTime } from "../entities";
import { uid } from "../config";
import { loadKv, saveKv, watchKv } from "../kv";
import { shared } from "../theme";
import "../ui/icon";

interface Note {
  id: string;
  text?: string;
  /** Strokes, each a flat list of x,y in 0-1000. */
  paths?: number[][];
  ink?: string;
  color: string;
  by: string;
  at: string;
}
interface Board {
  notes: Note[];
}

const COLORS = ["#fff4b8", "#ffd6e0", "#d4f2e2", "#d8e8ff", "#eadcff"];
const INK = ["#1d1d1f", "#e5484d", "#3a86ff", "#2bb673"];
const KEEP = 24;

/** The fridge door: sticky notes and finger drawings, on every screen and phone. */
@customElement("sn-w-board")
export class SnBoard extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private board: Board = { notes: [] };
  @state() private mode: "" | "text" | "draw" = "";
  @state() private color = COLORS[0];
  @state() private ink = INK[0];
  @state() private strokes: number[][] = [];
  private current?: number[];
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
        padding: 14px;
        display: grid;
        gap: 10px;
        grid-template-rows: auto minmax(0, 1fr);
        overflow: hidden;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .head h3 {
        flex: 1;
        margin: 0;
        font-size: 16px;
      }
      .notes {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        gap: 10px;
        overflow: auto;
        align-content: start;
        padding: 4px;
      }
      .note {
        position: relative;
        min-height: 110px;
        padding: 12px 12px 26px;
        border-radius: 6px 6px 18px 6px;
        color: #1d1d1f;
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
        font-size: 16px;
        line-height: 1.35;
        white-space: pre-wrap;
        word-break: break-word;
        unicode-bidi: plaintext;
        animation: stick 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .note:nth-child(odd) {
        transform: rotate(-1.4deg);
      }
      .note:nth-child(even) {
        transform: rotate(1.2deg);
      }
      .note svg {
        width: 100%;
        aspect-ratio: 1;
        display: block;
      }
      .note .by {
        position: absolute;
        inset-inline: 10px;
        bottom: 6px;
        font-size: 11px;
        opacity: 0.6;
      }
      .note .x {
        position: absolute;
        top: 2px;
        inset-inline-end: 2px;
        border: 0;
        background: none;
        font-size: 16px;
        opacity: 0.4;
        cursor: pointer;
        color: inherit;
      }
      .editor {
        display: grid;
        gap: 8px;
      }
      .pad {
        width: 100%;
        max-width: 360px;
        aspect-ratio: 1;
        border-radius: 12px;
        touch-action: none;
        cursor: crosshair;
        justify-self: center;
        box-shadow: inset 0 0 0 1px var(--border);
      }
      .swatches {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        align-items: center;
      }
      .sw {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid transparent;
        cursor: pointer;
        padding: 0;
      }
      .sw[aria-pressed="true"] {
        border-color: var(--text);
      }
      textarea {
        min-height: 90px;
      }
      @keyframes stick {
        from {
          opacity: 0;
          transform: scale(0.8) rotate(-6deg);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .note {
          animation: none;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    loadKv<Board>(this.ctx.hass, "board").then((v) => (this.board = { notes: v?.notes ?? [] }));
    this.unwatch = watchKv<Board>(this.ctx.hass, "board", (v) => (this.board = { notes: v?.notes ?? [] }));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unwatch?.then((u) => u()).catch(() => undefined);
  }

  private save(notes: Note[]) {
    this.board = { notes: notes.slice(0, KEEP) };
    saveKv(this.ctx.hass, "board", this.board).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  private add(n: Omit<Note, "id" | "by" | "at">) {
    this.save([{ ...n, id: uid(), by: this.ctx.hass.user?.name ?? "", at: new Date().toISOString() }, ...this.board.notes]);
    this.mode = "";
    this.strokes = [];
  }

  // ---- drawing ----

  private pt(e: PointerEvent) {
    const r = (e.currentTarget as SVGElement).getBoundingClientRect();
    return [Math.round(((e.clientX - r.left) / r.width) * 1000), Math.round(((e.clientY - r.top) / r.height) * 1000)];
  }

  private down(e: PointerEvent) {
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    this.current = this.pt(e);
    this.strokes = [...this.strokes, this.current];
  }

  private move(e: PointerEvent) {
    if (!this.current) return;
    const [x, y] = this.pt(e);
    const n = this.current.length;
    // Skip points closer than ~1% to keep the stored drawing small.
    if (Math.abs(x - this.current[n - 2]) + Math.abs(y - this.current[n - 1]) < 10) return;
    this.current.push(x, y);
    this.strokes = [...this.strokes];
  }

  private path(p: number[]) {
    let d = `M${p[0]} ${p[1]}`;
    for (let i = 2; i < p.length; i += 2) d += `L${p[i]} ${p[i + 1]}`;
    return p.length === 2 ? `${d}l0.1 0` : d;
  }

  private drawing(paths: number[][], ink: string) {
    return svg`${paths.map((p) => svg`<path d=${this.path(p)} fill="none" stroke=${ink} stroke-width="14" stroke-linecap="round" stroke-linejoin="round"></path>`)}`;
  }

  private renderEditor() {
    const { t } = this.ctx;
    return html`<div class="editor">
      <div class="swatches">
        ${COLORS.map((c) => html`<button class="sw" style="background:${c}" aria-pressed=${this.color === c} @click=${() => (this.color = c)}></button>`)}
        ${this.mode === "draw"
          ? html`<span style="width:12px"></span>${INK.map((c) => html`<button class="sw" style="background:${c}" aria-pressed=${this.ink === c} @click=${() => (this.ink = c)}></button>`)}`
          : nothing}
      </div>
      ${this.mode === "text"
        ? html`<textarea id="txt" maxlength="200" placeholder=${t("board_placeholder")} style="background:${this.color};color:#1d1d1f"></textarea>`
        : html`<svg
            class="pad"
            viewBox="0 0 1000 1000"
            style="background:${this.color}"
            @pointerdown=${(e: PointerEvent) => this.down(e)}
            @pointermove=${(e: PointerEvent) => this.move(e)}
            @pointerup=${() => (this.current = undefined)}
            @pointercancel=${() => (this.current = undefined)}
          >
            ${this.drawing(this.strokes, this.ink)}
          </svg>`}
      <div style="display:flex;gap:8px">
        <button
          class="btn primary pressable"
          @click=${() => {
            if (this.mode === "text") {
              const text = (this.renderRoot.querySelector("#txt") as HTMLTextAreaElement).value.trim();
              if (text) this.add({ text, color: this.color });
            } else if (this.strokes.length) this.add({ paths: this.strokes, color: this.color, ink: this.ink });
          }}
        >
          ${t("board_stick")}
        </button>
        ${this.mode === "draw" ? html`<button class="btn pressable" @click=${() => (this.strokes = this.strokes.slice(0, -1))}>${t("undo_point")}</button>` : nothing}
        <button class="btn pressable" @click=${() => ((this.mode = ""), (this.strokes = []))}>${t("cancel")}</button>
      </div>
    </div>`;
  }

  render() {
    const { t } = this.ctx;
    return html`<div class="card glass">
      <div class="head">
        <sn-icon icon="note" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>
        <h3>${t("widget_board")}</h3>
        ${this.mode
          ? nothing
          : html`<button class="btn pressable" style="min-height:36px" @click=${() => (this.mode = "text")}>📝 ${t("board_write")}</button>
              <button class="btn pressable" style="min-height:36px" @click=${() => (this.mode = "draw")}>✏️ ${t("board_draw")}</button>`}
      </div>
      ${this.mode
        ? this.renderEditor()
        : html`<div class="notes">
            ${this.board.notes.length
              ? this.board.notes.map(
                  (n) => html`<div class="note" style="background:${n.color}">
                    ${n.paths ? html`<svg viewBox="0 0 1000 1000">${this.drawing(n.paths, n.ink ?? INK[0])}</svg>` : n.text}
                    <span class="by">${n.by ? `${n.by} · ` : ""}${relativeTime(t, n.at)}</span>
                    <button class="x" aria-label=${t("delete")} @click=${() => this.save(this.board.notes.filter((x) => x.id !== n.id))}>×</button>
                  </div>`
                )
              : html`<span class="muted" style="grid-column:1/-1">${t("board_empty")}</span>`}
          </div>`}
    </div>`;
  }
}
