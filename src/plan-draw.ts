import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import type { Door, Floor, Room, RoomKind } from "./types";
import { uid } from "./config";
import { guessKind, planSvg, svgDataUrl } from "./plan-svg";
import { shared } from "./theme";
import { haptic } from "./ui/haptic";
import "./ui/icon";

type Pt = [number, number];
type Drag =
  | { kind: "new"; from: Pt; to: Pt }
  | { kind: "move"; id: string; from: Pt; orig: Pt[] }
  | { kind: "corner"; id: string; corner: number; orig: Pt[] };

const SNAP = 1.2; // % — close enough to another room's wall to line up with it
const isRect = (p: Pt[]) => p.length === 4 && p[0][1] === p[1][1] && p[1][0] === p[2][0] && p[2][1] === p[3][1] && p[3][0] === p[0][0];
const rect = (a: Pt, b: Pt): Pt[] => {
  const [x1, x2] = [Math.min(a[0], b[0]), Math.max(a[0], b[0])];
  const [y1, y2] = [Math.min(a[1], b[1]), Math.max(a[1], b[1])];
  return [[x1, y1], [x2, y1], [x2, y2], [x1, y2]];
};

/**
 * Draw the house's plan in SmartNest: drag out each room, tap a wall for a door, name the rooms. It becomes a clean
 * plan in the demo's style, and the rooms are ready for glow, heat maps and the 3D model. With a photo of the
 * architect's plan, the photo shows faintly underneath to trace over.
 */
@customElement("sn-plan-draw")
export class SnPlanDraw extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) floor!: Floor;
  /** width / height of the canvas */
  @property({ type: Number }) ratio = 1.5;
  /** A picture to trace over (the photo of the plan), or none. */
  @property() trace = "";
  @property({ attribute: false }) onDone!: (floor?: Floor) => void;
  @state() private rooms: Room[] = [];
  @state() private doors: Door[] = [];
  @state() private sel?: string;
  @state() private mode: "room" | "door" = "room";
  @state() private drag?: Drag;
  @state() private box = { w: 0, h: 0 };
  private ro?: ResizeObserver;

  static styles = [
    shared,
    css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 75;
        display: grid;
        grid-template-rows: auto 1fr auto;
        background: var(--bg);
        color: var(--text);
      }
      .bar {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 16px;
        padding-top: max(12px, env(safe-area-inset-top));
        flex-wrap: wrap;
      }
      .bar h2 {
        flex: 1;
        margin: 0;
        font-size: 18px;
      }
      .stage {
        display: grid;
        place-items: center;
        min-height: 0;
        padding: 8px 16px;
      }
      .canvas {
        position: relative;
        border-radius: 14px;
        background-color: var(--surface-2);
        background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
        background-size: 5% 5%;
        touch-action: none;
        overflow: hidden;
        direction: ltr;
      }
      .canvas img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      .canvas img.trace {
        opacity: 0.35;
        object-fit: fill;
      }
      svg.over {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .room {
        fill: transparent;
        stroke: transparent;
        cursor: move;
      }
      .room.sel {
        fill: color-mix(in srgb, var(--accent) 18%, transparent);
        stroke: var(--accent);
        stroke-width: 0.5;
        vector-effect: non-scaling-stroke;
      }
      .ghost {
        fill: color-mix(in srgb, var(--accent) 22%, transparent);
        stroke: var(--accent);
        stroke-dasharray: 4 3;
        stroke-width: 2;
        vector-effect: non-scaling-stroke;
      }
      .label {
        position: absolute;
        transform: translate(-50%, -50%);
        font-size: 13px;
        font-weight: 700;
        color: var(--text);
        background: color-mix(in srgb, var(--surface-solid) 80%, transparent);
        padding: 2px 8px;
        border-radius: 999px;
        pointer-events: none;
        white-space: nowrap;
      }
      .handle {
        position: absolute;
        width: 22px;
        height: 22px;
        margin: -11px 0 0 -11px;
        border-radius: 50%;
        background: #fff;
        border: 3px solid var(--accent);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        cursor: nwse-resize;
      }
      .door {
        position: absolute;
        width: 18px;
        height: 18px;
        margin: -9px 0 0 -9px;
        border-radius: 50%;
        background: var(--accent);
        border: 2px solid #fff;
      }
      .foot {
        display: flex;
        gap: 10px;
        align-items: center;
        padding: 12px 16px;
        padding-bottom: max(12px, env(safe-area-inset-bottom));
        flex-wrap: wrap;
        min-height: 64px;
      }
      .foot input[type="text"] {
        flex: 1;
        min-width: 140px;
      }
      .hint {
        color: var(--text-2);
        font-size: 14px;
        flex: 1;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.rooms = structuredClone(this.floor.rooms ?? []);
    this.doors = structuredClone(this.floor.doors ?? []);
    this.ro = new ResizeObserver(() => this.fit());
    this.ro.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.ro?.disconnect();
  }

  private fit() {
    const stage = this.renderRoot.querySelector<HTMLElement>(".stage");
    if (!stage) return;
    const W = stage.clientWidth - 32;
    const H = stage.clientHeight - 16;
    const w = Math.min(W, H * this.ratio);
    this.box = { w, h: w / this.ratio };
  }

  protected firstUpdated() {
    this.fit();
  }

  /** Pointer to plan percent, snapped to the grid and to the other rooms' walls. */
  private at(e: PointerEvent, skip?: string): Pt {
    const r = this.renderRoot.querySelector<HTMLElement>(".canvas")!.getBoundingClientRect();
    let x = ((e.clientX - r.left) / r.width) * 100;
    let y = ((e.clientY - r.top) / r.height) * 100;
    const xs = this.rooms.filter((o) => o.id !== skip).flatMap((o) => o.points.map((p) => p[0]));
    const ys = this.rooms.filter((o) => o.id !== skip).flatMap((o) => o.points.map((p) => p[1]));
    const near = (v: number, list: number[]) => list.reduce((b, c) => (Math.abs(c - v) < Math.abs(b - v) ? c : b), Infinity);
    const nx = near(x, xs);
    const ny = near(y, ys);
    x = Math.abs(nx - x) < SNAP ? nx : Math.round(x * 2) / 2;
    y = Math.abs(ny - y) < SNAP ? ny : Math.round(y * 2) / 2;
    return [Math.max(0, Math.min(100, x)), Math.max(0, Math.min(100, y))];
  }

  private down = (e: PointerEvent) => {
    if (e.button !== 0) return;
    const target = e.target as Element;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* gone already */
    }
    const p = this.at(e);
    if (this.mode === "door") return this.placeDoor(p, target);
    const corner = (target as HTMLElement).dataset?.corner;
    if (corner !== undefined && this.sel) {
      const r = this.rooms.find((x) => x.id === this.sel)!;
      this.drag = { kind: "corner", id: r.id, corner: Number(corner), orig: r.points.map((q) => [...q] as Pt) };
      return;
    }
    const id = (target as SVGElement).dataset?.room;
    if (id) {
      this.sel = id;
      const r = this.rooms.find((x) => x.id === id)!;
      this.drag = { kind: "move", id, from: this.at(e, id), orig: r.points.map((q) => [...q] as Pt) };
      return;
    }
    this.sel = undefined;
    this.drag = { kind: "new", from: p, to: p };
  };

  private move = (e: PointerEvent) => {
    const d = this.drag;
    if (!d) return;
    if (d.kind === "new") return void (this.drag = { ...d, to: this.at(e) });
    const p = this.at(e, d.id);
    this.rooms = this.rooms.map((r) => {
      if (r.id !== d.id) return r;
      if (d.kind === "move") {
        const dx = p[0] - d.from[0];
        const dy = p[1] - d.from[1];
        return { ...r, points: d.orig.map(([x, y]) => [x + dx, y + dy] as Pt) };
      }
      // A corner of a rectangle: the opposite corner stays, it stays a rectangle.
      const opp = d.orig[(d.corner + 2) % 4];
      return { ...r, points: isRect(d.orig) ? rect(opp, p) : d.orig.map((q, i) => (i === d.corner ? p : q)) };
    });
  };

  private up = () => {
    const d = this.drag;
    this.drag = undefined;
    if (d?.kind !== "new") return;
    const pts = rect(d.from, d.to);
    if (pts[1][0] - pts[0][0] < 3 || pts[2][1] - pts[0][1] < 3) return;
    const name = this.ctx.t("plan_room_n", { n: this.rooms.length + 1 });
    const room: Room = { id: uid(), name, points: pts };
    this.rooms = [...this.rooms, room];
    this.sel = room.id;
    haptic("tap");
    // Name it right away while it's in mind.
    requestAnimationFrame(() => this.renderRoot.querySelector<HTMLInputElement>(".foot input")?.select());
  };

  private placeDoor(p: Pt, target: Element) {
    const hit = (target as HTMLElement).dataset?.door;
    if (hit) return void (this.doors = this.doors.filter((x) => x.id !== hit));
    // Onto the nearest wall.
    let best: { x: number; y: number; d: number } | undefined;
    for (const r of this.rooms)
      for (let i = 0; i < r.points.length; i++) {
        const a = r.points[i];
        const b = r.points[(i + 1) % r.points.length];
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        const t = Math.max(0.08, Math.min(0.92, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)));
        const x = a[0] + t * dx;
        const y = a[1] + t * dy;
        const d = Math.hypot(x - p[0], y - p[1]);
        if (!best || d < best.d) best = { x, y, d };
      }
    if (best && best.d < 6) {
      this.doors = [...this.doors, { id: uid(), x: best.x, y: best.y }];
      haptic("tap");
    }
  }

  private patch(p: Partial<Room>) {
    this.rooms = this.rooms.map((r) => (r.id === this.sel ? { ...r, ...p } : r));
  }

  private save() {
    const W = 1200;
    const H = Math.round(W / this.ratio);
    const image = svgDataUrl(planSvg(this.rooms, this.doors, W, H));
    const old = this.floor;
    // The photo it was traced from stays, to go back to it.
    const photo = old.photo ?? (!old.drawn && old.image ? old.image : undefined);
    this.onDone({ ...old, rooms: this.rooms, doors: this.doors, image, drawn: true, ratio: this.ratio, photo });
  }

  render() {
    const { t } = this.ctx;
    const preview = svgDataUrl(planSvg(this.rooms, this.doors, 1200, Math.round(1200 / this.ratio)));
    const sel = this.rooms.find((r) => r.id === this.sel);
    const d = this.drag;
    const kinds: [RoomKind, string][] = [
      ["wood", t("plan_kind_wood")],
      ["tile", t("plan_kind_tile")],
      ["plain", t("plan_kind_plain")],
      ["outdoor", t("plan_kind_outdoor")],
    ];
    return html`<div class="bar">
        <h2>${t("plan_draw")}</h2>
        <div class="seg">
          <button aria-pressed=${this.mode === "room"} @click=${() => (this.mode = "room")}><sn-icon icon="rooms" style="--icon-size:18px"></sn-icon>${t("plan_mode_room")}</button>
          <button aria-pressed=${this.mode === "door"} @click=${() => ((this.mode = "door"), (this.sel = undefined))}><sn-icon icon="door-open" style="--icon-size:18px"></sn-icon>${t("plan_mode_door")}</button>
        </div>
        <button class="btn pressable" @click=${() => this.onDone()}>${t("cancel")}</button>
        <button class="btn primary pressable" ?disabled=${!this.rooms.length} @click=${() => this.save()}>${t("save")}</button>
      </div>
      <div class="stage">
        <div
          class="canvas"
          style="width:${this.box.w}px;height:${this.box.h}px"
          @pointerdown=${this.down}
          @pointermove=${this.move}
          @pointerup=${this.up}
          @pointercancel=${this.up}
        >
          ${this.trace ? html`<img class="trace" src=${this.trace} alt="" />` : nothing}
          <img src=${preview} alt="" />
          <svg class="over" viewBox="0 0 100 100" preserveAspectRatio="none">
            ${this.rooms.map(
              (r) => svg`<polygon class="room ${r.id === this.sel ? "sel" : ""}" data-room=${r.id} points=${r.points.map((p) => p.join(",")).join(" ")}></polygon>`
            )}
            ${d?.kind === "new" ? svg`<polygon class="ghost" points=${rect(d.from, d.to).map((p) => p.join(",")).join(" ")}></polygon>` : nothing}
          </svg>
          ${this.rooms.map((r) => {
            const cx = r.points.reduce((s, p) => s + p[0], 0) / r.points.length;
            const cy = r.points.reduce((s, p) => s + p[1], 0) / r.points.length;
            return html`<span class="label" style="left:${cx}%;top:${cy}%">${r.name}</span>`;
          })}
          ${sel && this.mode === "room" ? sel.points.map((p, i) => html`<span class="handle" data-corner=${i} style="left:${p[0]}%;top:${p[1]}%"></span>`) : nothing}
          ${this.mode === "door" ? this.doors.map((dr) => html`<span class="door" data-door=${dr.id} style="left:${dr.x}%;top:${dr.y}%"></span>`) : nothing}
        </div>
      </div>
      <div class="foot">
        ${sel
          ? html`<input type="text" .value=${sel.name} @input=${(e: any) => this.patch({ name: e.target.value })} />
              <div class="seg">${kinds.map(([k, label]) => html`<button aria-pressed=${(sel.kind ?? guessKind(sel.name)) === k} @click=${() => this.patch({ kind: k })}>${label}</button>`)}</div>
              <button class="icon-btn pressable" aria-label=${t("delete")} @click=${() => ((this.rooms = this.rooms.filter((r) => r.id !== this.sel)), (this.sel = undefined))}>
                <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
              </button>`
          : html`<span class="hint">${t(this.mode === "door" ? "plan_door_hint" : this.rooms.length ? "plan_draw_more" : "plan_draw_hint")}</span>`}
      </div>`;
  }
}

/** The dashboard's own layer (so the drawer gets its theme), found from any element inside it. */
function appOf(from: Element): Element {
  let node: Node = from;
  while (node) {
    const root = node.getRootNode() as ShadowRoot | Document;
    if (!(root instanceof ShadowRoot)) break;
    if (root.host.tagName === "SMARTNEST-PANEL") return root.host.shadowRoot!.querySelector(".app") ?? document.body;
    node = root.host;
  }
  return document.body;
}

/** Opens the plan drawer over the dashboard; resolves with the new floor, or nothing when cancelled. */
export function drawPlan(ctx: Ctx, from: Element, floor: Floor, ratio: number, trace: string): Promise<Floor | undefined> {
  const host = appOf(from);
  return new Promise((done) => {
    const el = document.createElement("sn-plan-draw") as SnPlanDraw;
    el.ctx = ctx;
    el.floor = floor;
    el.ratio = ratio;
    el.trace = trace;
    el.onDone = (f) => {
      el.remove();
      done(f);
    };
    host.appendChild(el);
  });
}

/** Instant clean-up: the rooms already outlined on a photo of the plan become a clean drawn plan of the same shape. */
export function cleanFloor(floor: Floor, ratio: number): Floor {
  const W = 1200;
  const H = Math.round(W / ratio);
  return {
    ...floor,
    image: svgDataUrl(planSvg(floor.rooms ?? [], floor.doors ?? [], W, H)),
    drawn: true,
    ratio,
    photo: floor.photo ?? (!floor.drawn ? floor.image : undefined),
  };
}
