import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import type { Door, Floor, Room, RoomKind } from "./types";
import { uid } from "./config";
import { guessKind, planSvg, svgDataUrl } from "./plan-svg";
import { FURNITURE, FURNITURE_ORDER, furniturePreview, type Furniture, type FurnitureKind } from "./furniture";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { shared } from "./theme";
import { haptic } from "./ui/haptic";
import "./ui/icon";

type Pt = [number, number];
type Opening = NonNullable<Floor["openings"]>[number];
type Drag =
  | { kind: "new"; from: Pt; to: Pt }
  | { kind: "fmove"; id: string; from: Pt; orig: Pt }
  | { kind: "fsize"; id: string; from: Pt; orig: { w: number; h: number } }
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
  @state() private openings: Opening[] = [];
  @state() private furniture: Furniture[] = [];
  /** Selected piece of furniture. */
  @state() private selF?: string;
  @state() private sel?: string;
  @state() private mode: "room" | "door" | "wall" | "furn" = "room";
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
      .furn {
        position: absolute;
        border-radius: 4px;
        cursor: move;
      }
      .furn.sel {
        outline: 2px dashed var(--accent);
        outline-offset: 2px;
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
    if (this.mode === "door") return this.placeDoor(p, target);
    if (this.mode === "wall") return this.toggleWall(p, target);
    if (this.mode === "furn") {
      const fid = (target as HTMLElement).dataset?.furn;
      const size = (target as HTMLElement).dataset?.fsize;
      const raw = this.raw(e);
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

  /** Pointer to plan percent, unsnapped (furniture moves freely, half a percent at a time). */
  private raw(e: PointerEvent): Pt {
    const r = this.renderRoot.querySelector<HTMLElement>(".canvas")!.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100];
  }

  private move = (e: PointerEvent) => {
    const d = this.drag;
    if (!d) return;
    if (d.kind === "new") return void (this.drag = { ...d, to: this.at(e) });
    if (d.kind === "fmove" || d.kind === "fsize") {
      const p = this.raw(e);
      const W = 1200;
      const H = W / this.ratio;
      this.furniture = this.furniture.map((f) => {
        if (f.id !== d.id) return f;
        if (d.kind === "fmove")
          return { ...f, x: Math.round((d.orig[0] + p[0] - d.from[0]) * 4) / 4, y: Math.round((d.orig[1] + p[1] - d.from[1]) * 4) / 4 };
        // Resize from the corner: the change in plan units, along the piece's own axes when it's turned.
        let dx = ((p[0] - d.from[0]) / 100) * W;
        let dy = ((p[1] - d.from[1]) / 100) * H;
        if (f.rot % 180) [dx, dy] = [dy, dx];
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
    const image = svgDataUrl(planSvg(this.rooms, this.doors, W, H, { openings: this.openings, furniture: this.furniture }));
    const old = this.floor;
    // The photo it was traced from stays, to go back to it.
    const photo = old.photo ?? (!old.drawn && old.image ? old.image : undefined);
    this.onDone({ ...old, rooms: this.rooms, doors: this.doors, openings: this.openings, furniture: this.furniture, image, drawn: true, ratio: this.ratio, photo });
  }

  render() {
    const { t } = this.ctx;
    const W = 1200;
    const H = Math.round(W / this.ratio);
    const preview = svgDataUrl(planSvg(this.rooms, this.doors, W, H, { openings: this.openings, furniture: this.furniture }));
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
          <button aria-pressed=${this.mode === "door"} @click=${() => ((this.mode = "door"), (this.sel = undefined))}><sn-icon icon="door-open" style="--icon-size:18px"></sn-icon>${t("plan_mode_door")}</button>
          <button aria-pressed=${this.mode === "wall"} @click=${() => ((this.mode = "wall"), (this.sel = undefined))}><sn-icon icon="wall" style="--icon-size:18px"></sn-icon>${t("plan_mode_wall")}</button>
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
            ${this.mode === "wall"
              ? this.openings.map((o) => svg`<line class="open" data-opening=${o.id} x1=${o.a[0]} y1=${o.a[1]} x2=${o.b[0]} y2=${o.b[1]}></line>`)
              : nothing}
          </svg>
          ${this.mode === "furn"
            ? this.furniture.map((f) => {
                const turned = f.rot % 180 !== 0;
                const bw = ((turned ? f.h : f.w) / W) * 100;
                const bh = ((turned ? f.w : f.h) / H) * 100;
                return html`<span
                  class="furn ${f.id === this.selF ? "sel" : ""}"
                  data-furn=${f.id}
                  style="left:${f.x - bw / 2}%;top:${f.y - bh / 2}%;width:${bw}%;height:${bh}%"
                >${f.id === this.selF ? html`<i class="fsize" data-fsize="1"></i>` : nothing}</span>`;
              })
            : nothing}
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
        ${this.mode === "furn"
          ? selF
            ? html`<span class="hint">${t(`furn_${selF.kind}` as any)}</span>
                <button class="btn pressable" @click=${() => this.patchF({ rot: (selF.rot + 90) % 360 })}><sn-icon icon="rotate-right" style="--icon-size:18px"></sn-icon>${t("plan_turn")}</button>
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
          : sel
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
    image: svgDataUrl(planSvg(floor.rooms ?? [], floor.doors ?? [], W, H, { openings: floor.openings, furniture: floor.furniture })),
    drawn: true,
    ratio,
    photo: floor.photo ?? (!floor.drawn ? floor.image : undefined),
  };
}
