import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import type { Door, Floor, Room, RoomKind } from "./types";
import { uid } from "./config";
import { guessKind, planSvg, svgDataUrl, wallSegments } from "./plan-svg";
import { FURNITURE, FURNITURE_ORDER, furniturePreview, furnitureSvg, type Furniture, type FurnitureKind } from "./furniture";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { shared } from "./theme";
import { haptic } from "./ui/haptic";
import "./ui/icon";
import { entityName } from "./entities";

type Pt = [number, number];
type Opening = NonNullable<Floor["openings"]>[number];
type Wall = NonNullable<Floor["walls"]>[number];
type Drag =
  | { kind: "new"; from: Pt; to: Pt }
  | { kind: "line"; from: Pt; to: Pt }
  | { kind: "fmove"; id: string; from: Pt; orig: Pt }
  | { kind: "fsize"; id: string; from: Pt; orig: { w: number; h: number } }
  | { kind: "frot"; id: string }
  | { kind: "move"; id: string; from: Pt; orig: Pt[] }
  | { kind: "corner"; id: string; corner: number; orig: Pt[] };

const SNAP = 1.2;
const isWindow = (k?: string) => k === "window" || k === "wide_window"; // % — close enough to another room's wall to line up with it
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
  @state() private openings: Opening[] = [];
  @state() private walls: Wall[] = [];
  /** Selected wall line. */
  @state() private selW?: string;
  /** How a new room is drawn: dragged as a rectangle, or point by point for any shape. */
  @state() private shape: "rect" | "poly" = "rect";
  /** A room being drawn point by point, and where the next point would go. */
  @state() private poly: Pt[] = [];
  @state() private hover?: Pt;
  /** What a tap on a wall puts there in the doors mode. */
  @state() private doorKind: NonNullable<Door["kind"]> = "door";
  /** Selected corner of the selected room (to remove it). */
  @state() private selV?: number;
  @state() private furniture: Furniture[] = [];
  /** Selected piece of furniture. */
  @state() private selF?: string;
  @state() private sel?: string;
  @state() private mode: "room" | "line" | "door" | "window" | "wall" | "furn" = "room";
  /** Selected door or window (to link it to a device, change it or remove it). */
  @state() private selD?: string;
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
        grid-template-columns: minmax(0, 1fr);
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
      .pv,
      svg.lifted {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }
      .pv svg {
        width: 100%;
        height: 100%;
        display: block;
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
      .handle.on {
        background: var(--accent);
      }
      /* "+" in the middle of each side: drag it to add a corner there. */
      .mid {
        position: absolute;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border-radius: 50%;
        background: var(--surface-solid);
        color: var(--accent-text);
        border: 2px dashed var(--accent);
        font: 700 14px/16px var(--font);
        text-align: center;
        cursor: copy;
        opacity: 0.85;
      }
      .dot {
        position: absolute;
        width: 14px;
        height: 14px;
        margin: -7px 0 0 -7px;
        border-radius: 50%;
        background: var(--accent);
        border: 2px solid #fff;
        pointer-events: none;
      }
      .dot.first {
        width: 22px;
        height: 22px;
        margin: -11px 0 0 -11px;
        box-shadow: 0 0 0 6px color-mix(in srgb, var(--accent) 30%, transparent);
      }
      .door.on {
        width: 24px;
        height: 24px;
        margin: -12px 0 0 -12px;
        box-shadow: 0 0 0 6px color-mix(in srgb, var(--accent) 30%, transparent);
      }
      .door.linked::after {
        content: "🔗";
        position: absolute;
        top: -16px;
        left: 10px;
        font-size: 11px;
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
      .furn {
        position: absolute;
        border-radius: 4px;
        cursor: move;
      }
      .furn.sel {
        outline: 2px dashed var(--accent);
        outline-offset: 2px;
      }
      /* Twist handle above the piece, on a little stem. */
      .frot {
        position: absolute;
        left: 50%;
        top: -38px;
        width: 26px;
        height: 26px;
        margin-left: -13px;
        border-radius: 50%;
        background: var(--accent);
        border: 3px solid #fff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        cursor: grab;
      }
      .frot::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 100%;
        width: 2px;
        height: 12px;
        margin-left: -1px;
        background: var(--accent);
      }
      .fsize {
        position: absolute;
        right: -11px;
        bottom: -11px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #fff;
        border: 3px solid var(--accent);
        cursor: nwse-resize;
      }
      line.ghostline {
        stroke: var(--accent);
        stroke-width: 8;
        stroke-linecap: round;
        vector-effect: non-scaling-stroke;
        opacity: 0.8;
      }
      line.wl {
        stroke: transparent;
        stroke-width: 22;
        stroke-linecap: round;
        vector-effect: non-scaling-stroke;
        cursor: pointer;
      }
      line.wl.sel {
        stroke: color-mix(in srgb, var(--accent) 60%, transparent);
      }
      line.open {
        stroke: var(--accent);
        stroke-width: 6;
        stroke-linecap: round;
        vector-effect: non-scaling-stroke;
        opacity: 0.8;
        cursor: pointer;
      }
      .palette {
        min-width: 0;
        flex: 1;
        display: flex;
        gap: 8px;
        overflow-x: auto;
        width: 100%;
        padding-bottom: 4px;
        scrollbar-width: thin;
      }
      .palette .item {
        flex: none;
        width: 76px;
        display: grid;
        justify-items: center;
        gap: 4px;
        padding: 8px 4px;
        border: 0;
        border-radius: 14px;
        background: var(--surface-2);
        color: var(--text-2);
        font: 600 11px var(--font);
        cursor: pointer;
      }
      .palette .item svg {
        width: 46px;
        height: 40px;
      }
      .palette .item span {
        max-width: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
    this.openings = structuredClone(this.floor.openings ?? []);
    this.walls = structuredClone(this.floor.walls ?? []);
    this.furniture = structuredClone(this.floor.furniture ?? []);
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
    if (this.mode === "line") {
      const hit = (target as SVGElement).dataset?.wall;
      if (hit) return void (this.selW = hit);
      this.selW = undefined;
      const from = this.endSnap(this.raw(e)) ?? p;
      return void (this.drag = { kind: "line", from, to: from });
    }
    if (this.mode === "door" || this.mode === "window") return this.placeDoor(p, target);
    if (this.mode === "wall") return this.toggleWall(p, target);
    if (this.mode === "furn") {
      const fid = (target as HTMLElement).dataset?.furn;
      const size = (target as HTMLElement).dataset?.fsize;
      const raw = this.raw(e);
      if ((target as HTMLElement).dataset?.frot && this.selF) return void (this.drag = { kind: "frot", id: this.selF });
      if (size && this.selF) {
        const f = this.furniture.find((x) => x.id === this.selF)!;
        return void (this.drag = { kind: "fsize", id: f.id, from: raw, orig: { w: f.w, h: f.h } });
      }
      if (fid) {
        this.selF = fid;
        const f = this.furniture.find((x) => x.id === fid)!;
        return void (this.drag = { kind: "fmove", id: fid, from: raw, orig: [f.x, f.y] });
      }
      // Tapping a room picks where the next piece goes.
      this.selF = undefined;
      this.sel = (target as SVGElement).dataset?.room ?? this.sel;
      return;
    }
    // Point by point: each tap is the next corner; back on the first one closes the room.
    if (this.shape === "poly" && (this.poly.length || !(target as SVGElement).dataset?.room) && (target as HTMLElement).dataset?.corner === undefined && (target as HTMLElement).dataset?.mid === undefined) {
      const q = this.nextPoint(e);
      if (this.poly.length >= 3 && q[0] === this.poly[0][0] && q[1] === this.poly[0][1]) return this.finishPoly();
      this.poly = [...this.poly, q];
      this.sel = undefined;
      haptic("tick");
      return;
    }
    const mid = (target as HTMLElement).dataset?.mid;
    if (mid !== undefined && this.sel) {
      // A new corner in the middle of a side, dragged straight away.
      const i = Number(mid);
      const r = this.rooms.find((x) => x.id === this.sel)!;
      const a = r.points[i];
      const b = r.points[(i + 1) % r.points.length];
      const points = [...r.points.slice(0, i + 1), [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2] as Pt, ...r.points.slice(i + 1)];
      this.rooms = this.rooms.map((x) => (x.id === r.id ? { ...x, points } : x));
      this.selV = i + 1;
      this.drag = { kind: "corner", id: r.id, corner: i + 1, orig: points.map((q) => [...q] as Pt) };
      return;
    }
    const corner = (target as HTMLElement).dataset?.corner;
    if (corner !== undefined && this.sel) {
      const r = this.rooms.find((x) => x.id === this.sel)!;
      this.selV = Number(corner);
      this.drag = { kind: "corner", id: r.id, corner: Number(corner), orig: r.points.map((q) => [...q] as Pt) };
      return;
    }
    this.selV = undefined;
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

  /** Pointer to plan percent, unsnapped (furniture moves freely, half a percent at a time). */
  private raw(e: PointerEvent): Pt {
    const r = this.renderRoot.querySelector<HTMLElement>(".canvas")!.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100];
  }

  /** Where the next corner of a point-by-point room goes: a nearby corner, else straightened from the last one. */
  private nextPoint(e: PointerEvent): Pt {
    const end = this.endSnap(this.raw(e));
    if (end) return end;
    const q = this.poly.length ? this.lineEnd(this.poly[this.poly.length - 1], e) : this.at(e);
    // Line up with the room's other corners (so the last side comes out square with the first).
    for (const c of this.poly.slice(0, -1)) {
      if (Math.abs(q[0] - c[0]) < 1.5) q[0] = c[0];
      if (Math.abs(q[1] - c[1]) < 1.5) q[1] = c[1];
    }
    return q;
  }

  private finishPoly() {
    if (this.poly.length < 3) return;
    const room: Room = { id: uid(), name: this.ctx.t("plan_room_n", { n: this.rooms.length + 1 }), points: this.poly };
    this.rooms = [...this.rooms, room];
    this.poly = [];
    this.hover = undefined;
    this.sel = room.id;
    haptic("success");
    requestAnimationFrame(() => this.renderRoot.querySelector<HTMLInputElement>(".foot input")?.select());
  }

  /** The plan as it was when a piece of furniture was picked up (redrawn once it's put down). */
  private frozen?: string;
  private moveFrame = 0;
  private lastMove?: PointerEvent;

  /** Finger moves come faster than the screen draws: keep the last one and apply it once per frame. */
  private onMoveEvent = (e: PointerEvent) => {
    this.lastMove = e;
    if (this.moveFrame) return;
    this.moveFrame = requestAnimationFrame(() => {
      this.moveFrame = 0;
      if (this.lastMove) this.move(this.lastMove);
    });
  };

  private move = (e: PointerEvent) => {
    const d = this.drag;
    if (!d && this.poly.length) return void (this.hover = this.nextPoint(e));
    if (!d) return;
    if (d.kind === "new") return void (this.drag = { ...d, to: this.at(e) });
    if (d.kind === "line") return void (this.drag = { ...d, to: this.lineEnd(d.from, e) });
    if (d.kind === "frot") {
      // Twist around its centre, following the finger; it settles on every 15° and holds a little at 0/90/180/270.
      const p = this.raw(e);
      this.furniture = this.furniture.map((f) => {
        if (f.id !== d.id) return f;
        const dx = ((p[0] - f.x) / 100) * this.box.w;
        const dy = ((p[1] - f.y) / 100) * this.box.h;
        let a = (Math.atan2(dy, dx) * 180) / Math.PI + 90; // the handle sits above the piece
        a = ((a % 360) + 360) % 360;
        const square = Math.round(a / 90) * 90;
        a = Math.abs(a - square) < 6 ? square % 360 : Math.round(a / 15) * 15 % 360;
        if (a !== f.rot) haptic("tick");
        return { ...f, rot: a };
      });
      return;
    }
    if (d.kind === "fmove" || d.kind === "fsize") {
      const p = this.raw(e);
      const W = 1200;
      const H = W / this.ratio;
      this.furniture = this.furniture.map((f) => {
        if (f.id !== d.id) return f;
        if (d.kind === "fmove")
          return { ...f, x: Math.round((d.orig[0] + p[0] - d.from[0]) * 4) / 4, y: Math.round((d.orig[1] + p[1] - d.from[1]) * 4) / 4 };
        // Resize from the corner: the change in plan units, along the piece's own axes when it's turned.
        // Along the piece's own sides, whatever way it's turned.
        const gx = ((p[0] - d.from[0]) / 100) * W;
        const gy = ((p[1] - d.from[1]) / 100) * H;
        const rad = (-f.rot * Math.PI) / 180;
        const dx = gx * Math.cos(rad) - gy * Math.sin(rad);
        const dy = gx * Math.sin(rad) + gy * Math.cos(rad);
        return { ...f, w: Math.max(20, Math.round(d.orig.w + dx * 2)), h: Math.max(10, Math.round(d.orig.h + dy * 2)) };
      });
      return;
    }
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

  /** The nearest wall end or room corner, when the finger is right next to one: lines join up into one wall. */
  private endSnap(p: Pt): Pt | undefined {
    const ends: Pt[] = [...this.poly, ...this.walls.flatMap((w) => [w.a, w.b]), ...this.rooms.flatMap((r) => r.points)];
    let best: Pt | undefined;
    let bd = 1.6;
    for (const q of ends) {
      const d = Math.hypot(q[0] - p[0], (q[1] - p[1]) / this.ratio);
      if (d < bd) [best, bd] = [q, d];
    }
    return best ? [...best] : undefined;
  }

  /** Where a wall being drawn ends: a nearby corner, else straightened to level or upright (or 45°) when close. */
  private lineEnd(from: Pt, e: PointerEvent): Pt {
    const raw = this.raw(e);
    const end = this.endSnap(raw);
    if (end) return end;
    const p = this.at(e);
    const dx = p[0] - from[0];
    const dy = (p[1] - from[1]) / this.ratio; // in the plan's real proportions
    const ang = Math.abs((Math.atan2(dy, dx) * 180) / Math.PI);
    const near = (a: number) => Math.abs(ang - a) < 8;
    if (near(0) || near(180)) return [p[0], from[1]];
    if (near(90)) return [from[0], p[1]];
    if (near(45) || near(135)) {
      const len = (Math.abs(dx) + Math.abs(dy)) / 2;
      return [from[0] + Math.sign(dx) * len, from[1] + Math.sign(dy) * len * this.ratio];
    }
    return p;
  }

  private up = () => {
    // The last move first, so the piece lands exactly where the finger left it.
    if (this.moveFrame) {
      cancelAnimationFrame(this.moveFrame);
      this.moveFrame = 0;
      if (this.lastMove && this.drag) this.move(this.lastMove);
    }
    const d = this.drag;
    this.drag = undefined;
    if (d?.kind === "line") {
      if (Math.hypot(d.to[0] - d.from[0], d.to[1] - d.from[1]) < 1.5) return;
      this.walls = [...this.walls, { id: uid(), a: d.from, b: d.to }];
      haptic("tap");
      return;
    }
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

  /**
   * Opens (or closes again) the wall under the finger. Between two rooms only the part they share opens, so a living
   * room and a kitchen side by side become one open space.
   */
  private toggleWall(p: Pt, target: Element) {
    const hit = (target as SVGElement).dataset?.opening;
    if (hit) return void (this.openings = this.openings.filter((o) => o.id !== hit));
    let best: { a: Pt; b: Pt; d: number; room: string } | undefined;
    for (const r of this.rooms)
      for (let i = 0; i < r.points.length; i++) {
        const a = r.points[i];
        const b = r.points[(i + 1) % r.points.length];
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)));
        const d = Math.hypot(a[0] + t * dx - p[0], a[1] + t * dy - p[1]);
        if (!best || d < best.d) best = { a, b, d, room: r.id };
      }
    if (!best || best.d > 4) return;
    let { a, b } = best;
    // The stretch another room shares with this wall (same line, overlapping).
    const vertical = Math.abs(a[0] - b[0]) < 0.01;
    const horizontal = Math.abs(a[1] - b[1]) < 0.01;
    if (vertical || horizontal) {
      const along = (q: Pt) => (vertical ? q[1] : q[0]);
      const line = vertical ? a[0] : a[1];
      let lo = Math.min(along(a), along(b));
      let hi = Math.max(along(a), along(b));
      for (const r of this.rooms) {
        if (r.id === best.room) continue;
        for (let i = 0; i < r.points.length; i++) {
          const c = r.points[i];
          const d = r.points[(i + 1) % r.points.length];
          const same = vertical ? Math.abs(c[0] - line) < 0.01 && Math.abs(d[0] - line) < 0.01 : Math.abs(c[1] - line) < 0.01 && Math.abs(d[1] - line) < 0.01;
          if (!same) continue;
          const l2 = Math.max(lo, Math.min(along(c), along(d)));
          const h2 = Math.min(hi, Math.max(along(c), along(d)));
          if (h2 - l2 > 0.5) {
            lo = l2;
            hi = h2;
          }
        }
      }
      a = vertical ? [line, lo] : [lo, line];
      b = vertical ? [line, hi] : [hi, line];
    }
    this.openings = [...this.openings, { id: uid(), a, b }];
    haptic("tap");
  }

  private addFurniture(kind: FurnitureKind) {
    const def = FURNITURE[kind];
    // In the middle of the selected room, or of the plan.
    const room = this.rooms.find((r) => r.id === this.sel);
    const cx = room ? room.points.reduce((s, q) => s + q[0], 0) / room.points.length : 50;
    const cy = room ? room.points.reduce((s, q) => s + q[1], 0) / room.points.length : 50;
    const f: Furniture = { id: uid(), kind, x: cx, y: cy, w: def.w, h: def.h, rot: 0 };
    this.furniture = [...this.furniture, f];
    this.selF = f.id;
    haptic("tap");
  }

  private patchF(p: Partial<Furniture>) {
    this.furniture = this.furniture.map((f) => (f.id === this.selF ? { ...f, ...p } : f));
  }

  private placeDoor(p: Pt, target: Element) {
    const hit = (target as HTMLElement).dataset?.door;
    if (hit) return void (this.selD = hit);
    this.selD = undefined;
    // Onto the nearest wall (a room's outline or a drawn line).
    let best: { x: number; y: number; d: number } | undefined;
    for (const [a, b] of wallSegments(this.rooms, this.walls))
      {
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        const t = Math.max(0.08, Math.min(0.92, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)));
        const x = a[0] + t * dx;
        const y = a[1] + t * dy;
        const d = Math.hypot(x - p[0], y - p[1]);
        if (!best || d < best.d) best = { x, y, d };
      }
    if (best && best.d < 6) {
      const kind = this.mode === "window" ? (isWindow(this.doorKind) ? this.doorKind : "window") : isWindow(this.doorKind) ? "door" : this.doorKind;
      const d: Door = { id: uid(), x: best.x, y: best.y, kind };
      this.doors = [...this.doors, d];
      this.selD = d.id;
      haptic("tap");
    }
  }

  /** Door or window kinds for the mode, the selected one's device link, and remove. */
  private renderDoorFoot() {
    const { t, hass, config } = this.ctx;
    const win = this.mode === "window";
    const kinds = (win ? ["window", "wide_window"] : ["door", "double", "slide"]) as NonNullable<Door["kind"]>[];
    const selD = this.doors.find((d) => d.id === this.selD);
    const setKind = (k: NonNullable<Door["kind"]>) => {
      this.doorKind = k;
      if (selD) this.doors = this.doors.map((d) => (d.id === selD.id ? { ...d, kind: k } : d));
    };
    // Window and door sensors, and the motors that open them.
    const cls = win ? ["window"] : ["door", "garage_door", "gate"];
    const devices = Object.values(hass.states)
      .filter(
        (e) =>
          (e.entity_id.startsWith("binary_sensor.") && [...cls, "opening"].includes(e.attributes.device_class)) ||
          (e.entity_id.startsWith("cover.") && (win ? ["window", "shutter", "awning"] : ["door", "garage", "gate"]).includes(e.attributes.device_class)) ||
          (e.entity_id.startsWith("lock.") && !win)
      )
      .map((e) => e.entity_id);
    return html`<div class="seg">${kinds.map((k) => html`<button aria-pressed=${(selD?.kind ?? this.doorKind) === k} @click=${() => setKind(k)}>${t(`plan_opening_${k}` as any)}</button>`)}</div>
      ${selD
        ? html`<select
              @change=${(e: any) => (this.doors = this.doors.map((d) => (d.id === selD.id ? { ...d, entity: e.target.value || undefined } : d)))}
            >
              <option value="">${t("plan_link_none")}</option>
              ${devices.map((id) => html`<option value=${id} ?selected=${selD.entity === id}>${entityName(hass, config, id)}</option>`)}
            </select>
            <button class="icon-btn pressable" aria-label=${t("delete")} @click=${() => ((this.doors = this.doors.filter((d) => d.id !== selD.id)), (this.selD = undefined))}>
              <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
            </button>
            <button class="btn primary pressable" @click=${() => (this.selD = undefined)}>${t("done")}</button>`
        : html`<span class="hint">${t(win ? "plan_window_hint" : "plan_door_hint")}</span>`}`;
  }

  private patch(p: Partial<Room>) {
    this.rooms = this.rooms.map((r) => (r.id === this.sel ? { ...r, ...p } : r));
  }

  private save() {
    const W = 1200;
    const H = Math.round(W / this.ratio);
    const image = svgDataUrl(planSvg(this.rooms, this.doors, W, H, { openings: this.openings, furniture: this.furniture, walls: this.walls }));
    const old = this.floor;
    // The photo it was traced from stays, to go back to it.
    const photo = old.photo ?? (!old.drawn && old.image ? old.image : undefined);
    this.onDone({ ...old, rooms: this.rooms, doors: this.doors, openings: this.openings, furniture: this.furniture, walls: this.walls, image, drawn: true, ratio: this.ratio, photo });
  }

  render() {
    const { t } = this.ctx;
    const W = 1200;
    const H = Math.round(W / this.ratio);
    // Drawn inline (no picture to decode on every change). While a piece of furniture moves, the plan under it stays
    // as it was and only that piece is drawn on top, following the finger.
    const dd = this.drag;
    const moving = dd && (dd.kind === "fmove" || dd.kind === "fsize" || dd.kind === "frot") ? dd.id : undefined;
    let preview = this.frozen;
    if (!moving || !preview) {
      preview = planSvg(this.rooms, this.doors, W, H, { openings: this.openings, furniture: this.furniture.filter((f) => f.id !== moving), walls: this.walls });
      this.frozen = moving ? preview : undefined;
    }
    const lifted = moving ? this.furniture.find((f) => f.id === moving) : undefined;
    const selF = this.furniture.find((f) => f.id === this.selF);
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
          <button aria-pressed=${this.mode === "line"} @click=${() => ((this.mode = "line"), (this.sel = undefined))}><sn-icon icon="wall" style="--icon-size:18px"></sn-icon>${t("plan_mode_line")}</button>
          <button aria-pressed=${this.mode === "door"} @click=${() => ((this.mode = "door"), (this.sel = undefined), (this.selD = undefined), (this.doorKind = "door"))}><sn-icon icon="door-open" style="--icon-size:18px"></sn-icon>${t("plan_mode_door")}</button>
          <button aria-pressed=${this.mode === "window"} @click=${() => ((this.mode = "window"), (this.sel = undefined), (this.selD = undefined), (this.doorKind = "window"))}><sn-icon icon="window-closed-variant" style="--icon-size:18px"></sn-icon>${t("plan_mode_window")}</button>
          <button aria-pressed=${this.mode === "wall"} @click=${() => ((this.mode = "wall"), (this.sel = undefined))}><sn-icon icon="arrow-split-vertical" style="--icon-size:18px"></sn-icon>${t("plan_mode_wall")}</button>
          <button aria-pressed=${this.mode === "furn"} @click=${() => (this.mode = "furn")}><sn-icon icon="sofa" style="--icon-size:18px"></sn-icon>${t("plan_mode_furn")}</button>
        </div>
        <button class="btn pressable" @click=${() => this.onDone()}>${t("cancel")}</button>
        <button class="btn primary pressable" ?disabled=${!this.rooms.length} @click=${() => this.save()}>${t("save")}</button>
      </div>
      <div class="stage">
        <div
          class="canvas"
          style="width:${this.box.w}px;height:${this.box.h}px"
          @pointerdown=${this.down}
          @pointermove=${this.onMoveEvent}
          @pointerup=${this.up}
          @pointercancel=${this.up}
        >
          ${this.trace ? html`<img class="trace" src=${this.trace} alt="" />` : nothing}
          <div class="pv">${unsafeSVG(preview)}</div>
          ${lifted
            ? html`<svg class="lifted" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
                <g fill="#B4BDC5" fill-opacity=".3" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${unsafeSVG(furnitureSvg(lifted, W, H))}</g>
              </svg>`
            : nothing}
          <svg class="over" viewBox="0 0 100 100" preserveAspectRatio="none">
            ${this.rooms.map(
              (r) => svg`<polygon class="room ${r.id === this.sel ? "sel" : ""}" data-room=${r.id} points=${r.points.map((p) => p.join(",")).join(" ")}></polygon>`
            )}
            ${d?.kind === "new" ? svg`<polygon class="ghost" points=${rect(d.from, d.to).map((p) => p.join(",")).join(" ")}></polygon>` : nothing}
            ${this.poly.length
              ? svg`<polyline class="ghost" points=${[...this.poly, ...(this.hover ? [this.hover] : [])].map((p) => p.join(",")).join(" ")}></polyline>`
              : nothing}
            ${d?.kind === "line" ? svg`<line class="ghostline" x1=${d.from[0]} y1=${d.from[1]} x2=${d.to[0]} y2=${d.to[1]}></line>` : nothing}
            ${this.mode === "line"
              ? this.walls.map((w) => svg`<line class="wl ${w.id === this.selW ? "sel" : ""}" data-wall=${w.id} x1=${w.a[0]} y1=${w.a[1]} x2=${w.b[0]} y2=${w.b[1]}></line>`)
              : nothing}
            ${this.mode === "wall"
              ? this.openings.map((o) => svg`<line class="open" data-opening=${o.id} x1=${o.a[0]} y1=${o.a[1]} x2=${o.b[0]} y2=${o.b[1]}></line>`)
              : nothing}
          </svg>
          ${this.mode === "furn"
            ? this.furniture.map((f) => {
                // The piece's own box, turned like it, in screen pixels.
                const bw = (f.w / W) * this.box.w;
                const bh = (f.h / H) * this.box.h;
                return html`<span
                  class="furn ${f.id === this.selF ? "sel" : ""}"
                  data-furn=${f.id}
                  style="left:${f.x}%;top:${f.y}%;width:${bw}px;height:${bh}px;transform:translate(-50%, -50%) rotate(${f.rot}deg)"
                >${f.id === this.selF ? html`<i class="fsize" data-fsize="1"></i><i class="frot" data-frot="1"></i>` : nothing}</span>`;
              })
            : nothing}
          ${this.rooms.map((r) => {
            const cx = r.points.reduce((s, p) => s + p[0], 0) / r.points.length;
            const cy = r.points.reduce((s, p) => s + p[1], 0) / r.points.length;
            return html`<span class="label" style="left:${cx}%;top:${cy}%">${r.name}</span>`;
          })}
          ${sel && this.mode === "room"
            ? html`${sel.points.map((p, i) => {
                const n = sel.points[(i + 1) % sel.points.length];
                return html`<span class="mid" data-mid=${i} style="left:${(p[0] + n[0]) / 2}%;top:${(p[1] + n[1]) / 2}%">+</span>`;
              })}
              ${sel.points.map((p, i) => html`<span class="handle ${i === this.selV ? "on" : ""}" data-corner=${i} style="left:${p[0]}%;top:${p[1]}%"></span>`)}`
            : nothing}
          ${this.poly.map((p, i) => html`<span class="dot ${i === 0 && this.poly.length >= 3 ? "first" : ""}" style="left:${p[0]}%;top:${p[1]}%"></span>`)}
          ${this.mode === "door" || this.mode === "window"
            ? this.doors
                .filter((dr) => isWindow(dr.kind) === (this.mode === "window"))
                .map((dr) => html`<span class="door ${dr.id === this.selD ? "on" : ""} ${dr.entity ? "linked" : ""}" data-door=${dr.id} style="left:${dr.x}%;top:${dr.y}%"></span>`)
            : nothing}
        </div>
      </div>
      <div class="foot">
        ${this.mode === "furn"
          ? selF
            ? html`<span class="hint">${t(`furn_${selF.kind}` as any)}</span>
                <span class="hint ltr" style="flex:none">${selF.rot}°</span>
                <button class="btn pressable" @click=${() => this.patchF({ rot: (Math.round(selF.rot / 90) * 90 + 90) % 360 })}><sn-icon icon="rotate-right" style="--icon-size:18px"></sn-icon>${t("plan_turn")}</button>
                <button class="btn pressable" @click=${() => {
                  const copy = { ...selF, id: uid(), x: selF.x + 3, y: selF.y + 3 };
                  this.furniture = [...this.furniture, copy];
                  this.selF = copy.id;
                }}><sn-icon icon="content-copy" style="--icon-size:18px"></sn-icon>${t("plan_copy")}</button>
                <button class="icon-btn pressable" aria-label=${t("delete")} @click=${() => ((this.furniture = this.furniture.filter((f) => f.id !== this.selF)), (this.selF = undefined))}>
                  <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
                </button>
                <button class="btn primary pressable" @click=${() => (this.selF = undefined)}>${t("done")}</button>`
            : html`<div class="palette">
                ${FURNITURE_ORDER.map(
                  (k) => html`<button class="item pressable" title=${t(`furn_${k}` as any)} @click=${() => this.addFurniture(k)}>
                    ${unsafeSVG(furniturePreview(k))}<span>${t(`furn_${k}` as any)}</span>
                  </button>`
                )}
              </div>`
          : this.mode === "wall"
          ? html`<span class="hint">${t("plan_wall_hint")}</span>`
          : this.mode === "line"
          ? this.selW
            ? html`<span class="hint">${t("plan_line_sel")}</span>
                <button class="icon-btn pressable" aria-label=${t("delete")} @click=${() => ((this.walls = this.walls.filter((w) => w.id !== this.selW)), (this.selW = undefined))}>
                  <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
                </button>
                <button class="btn primary pressable" @click=${() => (this.selW = undefined)}>${t("done")}</button>`
            : html`<span class="hint">${t("plan_line_hint")}</span>`
          : this.mode === "door" || this.mode === "window"
          ? this.renderDoorFoot()
          : this.poly.length
          ? html`<span class="hint">${t("plan_poly_drawing")}</span>
              <button class="btn pressable" @click=${() => (this.poly = this.poly.slice(0, -1))}><sn-icon icon="undo" style="--icon-size:18px"></sn-icon>${t("plan_poly_undo")}</button>
              <button class="btn pressable" @click=${() => ((this.poly = []), (this.hover = undefined))}>${t("cancel")}</button>
              <button class="btn primary pressable" ?disabled=${this.poly.length < 3} @click=${() => this.finishPoly()}>${t("plan_poly_close")}</button>`
          : sel
          ? html`<input type="text" .value=${sel.name} @input=${(e: any) => this.patch({ name: e.target.value })} />
              <div class="seg">${kinds.map(([k, label]) => html`<button aria-pressed=${(sel.kind ?? guessKind(sel.name)) === k} @click=${() => this.patch({ kind: k })}>${label}</button>`)}</div>
              <button class="btn pressable" aria-pressed=${!sel.nowall} title=${t("plan_room_walls")} @click=${() => this.patch({ nowall: !sel.nowall })}>
                <sn-icon icon=${sel.nowall ? "border-none-variant" : "border-all-variant"} style="--icon-size:18px"></sn-icon>${t(sel.nowall ? "plan_room_nowall" : "plan_room_walls")}
              </button>
              ${this.selV !== undefined && sel.points.length > 3
                ? html`<button
                    class="btn pressable"
                    @click=${() => {
                      this.patch({ points: sel.points.filter((_, i) => i !== this.selV) });
                      this.selV = undefined;
                    }}
                  >
                    ${t("plan_point_remove")}
                  </button>`
                : nothing}
              <button class="icon-btn pressable" aria-label=${t("delete")} @click=${() => ((this.rooms = this.rooms.filter((r) => r.id !== this.sel)), (this.sel = undefined))}>
                <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
              </button>`
          : html`${this.mode === "room"
                ? html`<div class="seg">
                    <button aria-pressed=${this.shape === "rect"} @click=${() => (this.shape = "rect")}><sn-icon icon="square-outline" style="--icon-size:16px"></sn-icon>${t("plan_shape_rect")}</button>
                    <button aria-pressed=${this.shape === "poly"} @click=${() => (this.shape = "poly")}><sn-icon icon="vector-polygon" style="--icon-size:16px"></sn-icon>${t("plan_shape_poly")}</button>
                  </div>`
                : nothing}
              <span class="hint">${t(this.shape === "poly" ? "plan_poly_hint" : this.rooms.length ? "plan_draw_more" : "plan_draw_hint")}</span>`}
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
    image: svgDataUrl(planSvg(floor.rooms ?? [], floor.doors ?? [], W, H, { openings: floor.openings, furniture: floor.furniture, walls: floor.walls })),
    drawn: true,
    ratio,
    photo: floor.photo ?? (!floor.drawn ? floor.image : undefined),
  };
}
