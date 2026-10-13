import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { DashboardConfig, Floor, Marker, Room, Widget } from "../types";
import { centroid, clipPath, inside, snap, type Pt } from "../geometry";
import { toneStyle, domainOf, entityIcon, entityName, formatNumber, isActive, runTap, shortValue, tapKind } from "../entities";
import { findWidget, newFloor, uid, uploadImage } from "../config";
import { shared } from "../theme";
import "../ui/icon";
import { rolling } from "../ui/num";
import { livingClass, livingStyles, playStateChange } from "../motion";
import { loadRobotRooms, robotRoomFor, type RoomChoice } from "./vacuum";
import "../ui/entity-picker";

interface Drag {
  id: string;
  pointerId: number;
  startX: number;
  startY: number;
  origX: number;
  origY: number;
  x: number;
  y: number;
  moved: boolean;
}

/**
 * The uploaded plan with devices pinned on it. Marker positions are stored as percentages of the image,
 * so they stay put on any screen size, and the stage is always LTR: the kitchen doesn't move in Arabic.
 */
@customElement("sn-w-floorplan")
export class SnFloorplan extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private floorIdx = 0;
  @state() private selected?: string;
  @state() private drag?: Drag;
  @state() private natural?: { w: number; h: number };
  @state() private area = { w: 0, h: 0 };
  @state() private uploading = false;
  // Room outlines (edit mode)
  @state() private roomMode = false;
  @state() private drawing?: Pt[];
  @state() private selRoom?: string;
  @state() private vtx?: { room: string; idx: number; pointerId: number; p: Pt };
  private ro?: ResizeObserver;
  private prevStates = new Map<string, string>();
  // Pinch-zoom (view mode): scale and pan of the stage, in stage pixels.
  @state() private zoom = { s: 1, x: 0, y: 0 };
  @state() private settling = false;
  private pointers = new Map<number, { x: number; y: number }>();
  private pinch?: { d: number; mx: number; my: number; s: number; x: number; y: number };
  private pan?: { x: number; y: number; zx: number; zy: number };
  private lastTap?: { t: number; x: number; y: number };
  @state() private heat = false;
  @state() private robotRooms?: RoomChoice[];
  private press?: { id: string; x: number; y: number; timer: number };

  static styles = [
    shared,
    livingStyles,
    css`
      :host {
        display: block;
        height: 100%;
      }
      .wrap {
        position: relative;
        height: 100%;
        border-radius: var(--r-lg);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      .area {
        position: relative;
        flex: 1;
        min-height: 0;
        display: grid;
        place-items: center;
        padding: 16px;
      }
      :host([narrow]) .area {
        flex: none;
        padding: 12px;
      }
      .stage {
        position: relative;
        direction: ltr;
      }
      .stage img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        user-select: none;
        -webkit-user-drag: none;
        pointer-events: none;
        border-radius: var(--r-sm);
      }
      :host([dark]) .stage img.plan-light {
        /* Line drawings on white turn into glowing outlines on charcoal. */
        filter: invert(0.88) hue-rotate(180deg) brightness(1.05);
      }
      .marker {
        position: absolute;
        transform: translate(-50%, -50%) scale(var(--inv, 1));
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px;
        border-radius: 999px;
        background: var(--surface);
        -webkit-backdrop-filter: blur(16px) saturate(170%);
        backdrop-filter: blur(16px) saturate(170%);
        border: 1px solid var(--border);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
        cursor: pointer;
        transition: transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
        z-index: 1;
      }
      .marker:active {
        transform: translate(-50%, -50%) scale(calc(var(--inv, 1) * 0.92));
      }
      .marker .ic {
        display: grid;
        place-items: center;
        width: 36px;
        height: 36px;
        border-radius: 999px;
        background: var(--surface-2);
        color: var(--text-2);
        --icon-size: 20px;
        transition: background-color var(--dur) var(--ease-out), color var(--dur) var(--ease-out);
      }
      .marker .val {
        unicode-bidi: plaintext;
        padding-inline-end: 10px;
        font-size: 14px;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        color: var(--text);
      }
      .marker.on .ic {
        background: var(--tone);
        color: var(--on-tone);
        box-shadow: 0 0 0 6px color-mix(in srgb, var(--tone) 28%, transparent);
      }
      .marker.pulse::after {
        content: "";
        position: absolute;
        inset: -2px;
        border-radius: 999px;
        border: 2px solid var(--tone);
        animation: pulse 1.6s var(--ease-out) infinite;
        pointer-events: none;
      }
      :host([narrow]) .marker {
        padding: 2px;
      }
      :host([narrow]) .marker .ic {
        width: 26px;
        height: 26px;
        --icon-size: 15px;
      }
      :host([narrow]) .marker .val {
        font-size: 11px;
        padding-inline-end: 6px;
      }
      :host([narrow]) .marker.on .ic {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--tone) 28%, transparent);
      }
      .marker.dim {
        opacity: 0.5;
      }
      .marker.editable {
        cursor: grab;
      }
      .marker.dragging {
        cursor: grabbing;
        transform: translate(-50%, -50%) scale(calc(var(--inv, 1) * 1.15));
        box-shadow: var(--shadow-lift);
        z-index: 3;
        transition: none;
      }
      .marker.selected {
        outline: 2px solid var(--accent);
        outline-offset: 3px;
        z-index: 2;
      }
      .tag {
        position: absolute;
        top: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        padding: 3px 8px;
        border-radius: 6px;
        background: var(--surface-solid);
        color: var(--text);
        font-size: 12px;
        white-space: nowrap;
        box-shadow: var(--shadow);
        pointer-events: none;
      }
      @keyframes pulse {
        from {
          transform: scale(1);
          opacity: 0.9;
        }
        to {
          transform: scale(1.7);
          opacity: 0;
        }
      }
      .floors {
        position: absolute;
        top: 12px;
        inset-inline-start: 12px;
        z-index: 4;
        max-width: calc(100% - 24px);
      }
      :host([editing]) .floors {
        inset-inline-start: 60px; /* clear the grid's drag handle */
        max-width: calc(100% - 84px);
      }
      .floors .seg {
        background: var(--surface);
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        box-shadow: var(--shadow);
      }
      .tools {
        position: absolute;
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 4;
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px;
        border-radius: 999px;
        max-width: calc(100% - 24px);
        overflow-x: auto;
        scrollbar-width: none;
        animation: up 420ms var(--spring);
      }
      .tools .btn {
        min-height: 40px;
        padding: 0 14px;
        font-size: 14px;
      }
      .tools .label {
        padding-inline: 10px 4px;
        font-weight: 700;
        white-space: nowrap;
        max-width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      @keyframes up {
        from {
          transform: translate(-50%, 16px);
          opacity: 0;
        }
      }
      .empty {
        display: grid;
        justify-items: center;
        gap: 10px;
        text-align: center;
        color: var(--text-2);
        --icon-size: 56px;
      }
      .empty strong {
        color: var(--text);
        font-size: 17px;
      }
      /* Rooms that glow with their lights. Clipped to the room so light never spills through walls. */
      .glow {
        position: absolute;
        inset: 0;
        pointer-events: none;
        transition: opacity 900ms var(--ease-out);
      }
      :host([dark]) .glow {
        mix-blend-mode: screen;
      }
      .rooms-svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        overflow: visible;
        z-index: 2;
      }
      .rooms-svg polygon {
        fill: color-mix(in srgb, var(--accent) 12%, transparent);
        stroke: var(--accent);
        stroke-width: 2;
        stroke-dasharray: 6 5;
        vector-effect: non-scaling-stroke;
        cursor: pointer;
      }
      .rooms-svg polygon.sel {
        fill: color-mix(in srgb, var(--accent) 26%, transparent);
        stroke-dasharray: none;
      }
      .rooms-svg polyline {
        fill: none;
        stroke: var(--accent);
        stroke-width: 2.5;
        vector-effect: non-scaling-stroke;
      }
      .room-label {
        position: absolute;
        transform: translate(-50%, -50%) scale(var(--inv, 1));
        padding: 3px 10px;
        border-radius: 999px;
        background: var(--surface-solid);
        color: var(--text);
        font-size: 12px;
        font-weight: 700;
        white-space: nowrap;
        pointer-events: none;
        z-index: 3;
        box-shadow: var(--shadow);
      }
      .vtx {
        position: absolute;
        width: 22px;
        height: 22px;
        margin: -11px 0 0 -11px;
        border-radius: 999px;
        background: var(--surface-solid);
        border: 3px solid var(--accent);
        z-index: 4;
        touch-action: none;
        cursor: grab;
      }
      .vtx.first {
        background: var(--accent);
        animation: beckon 1.2s ease-in-out infinite alternate;
      }
      @keyframes beckon {
        to {
          transform: scale(1.35);
        }
      }
      .stage.drawing {
        cursor: crosshair;
      }
      .stage.room-mode .marker {
        opacity: 0.35;
        pointer-events: none;
      }
      .tools .hint {
        font-size: 13px;
        color: var(--text-2);
        padding-inline: 8px;
        max-width: 280px;
      }
      .stage {
        transform-origin: 0 0;
      }
      .stage.settle {
        transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .area.zoomable {
        touch-action: pan-y; /* fitted: vertical drags still scroll the page, pinches reach us */
        overflow: hidden;
      }
      .area.zoomed {
        touch-action: none; /* zoomed in: every drag pans the plan */
      }
      .heat {
        position: absolute;
        inset: 0;
        pointer-events: none;
        transition: background-color 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .heat-label {
        position: absolute;
        transform: translate(-50%, -50%) scale(var(--inv, 1));
        padding: 4px 10px;
        border-radius: 999px;
        background: var(--surface-solid);
        color: var(--text);
        font-size: 13px;
        font-weight: 700;
        box-shadow: var(--shadow);
        pointer-events: none;
        z-index: 2;
        direction: ltr;
      }
      .corner-btns {
        position: absolute;
        top: 12px;
        inset-inline-end: 12px;
        z-index: 4;
        display: flex;
        gap: 6px;
      }
      .corner-btns button {
        width: 40px;
        height: 40px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: var(--surface);
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        box-shadow: var(--shadow);
        color: var(--text-2);
        --icon-size: 20px;
        transition: background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
      }
      .corner-btns button[aria-pressed="true"] {
        background: var(--accent);
        color: var(--on-accent);
      }
      input[type="file"] {
        display: none;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    try {
      this.heat = localStorage.getItem(this.heatKey) === "1";
    } catch {
      /* per-device preference only */
    }
    this.ro = new ResizeObserver(() => this.measure());
    this.updateComplete.then(() => {
      const area = this.renderRoot.querySelector(".area");
      if (area) this.ro!.observe(area);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.ro?.disconnect();
  }

  private measure() {
    const area = this.renderRoot.querySelector<HTMLElement>(".area");
    if (!area) return;
    const cs = getComputedStyle(area);
    const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    const w = area.clientWidth - padX;
    const h = area.clientHeight - padY;
    if (w !== this.area.w || h !== this.area.h) this.area = { w, h };
  }

  private get floors(): Floor[] {
    return (this.widget.config.floors as Floor[]) ?? [];
  }

  private get floor(): Floor | undefined {
    return this.floors[Math.min(this.floorIdx, this.floors.length - 1)];
  }

  /** Edits this widget's floors inside the draft config. */
  private edit(fn: (floors: Floor[], floor: Floor | undefined, draft: DashboardConfig) => void) {
    const idx = Math.min(this.floorIdx, this.floors.length - 1);
    this.ctx.update((draft) => {
      const w = findWidget(draft, this.widget.id);
      if (!w) return;
      w.config.floors ??= [];
      fn(w.config.floors, w.config.floors[idx], draft);
    });
  }

  protected updated() {
    for (const m of this.floor?.markers ?? []) {
      const e = this.ctx.hass.states[m.entity];
      playStateChange(this.renderRoot.querySelector(`[data-m="${m.id}"] sn-icon`), e, this.prevStates.get(m.id));
      if (e) this.prevStates.set(m.id, e.state);
    }
  }

  protected willUpdate(changed: Map<string, unknown>) {
    if (changed.has("ctx") && this.ctx.editing && this.zoom.s !== 1) this.zoom = { s: 1, x: 0, y: 0 };
    if (changed.has("floorIdx")) this.zoom = { s: 1, x: 0, y: 0 };
    if (changed.has("ctx") && !this.ctx.editing) {
      this.selected = undefined;
      this.roomMode = false;
      this.drawing = undefined;
      this.selRoom = undefined;
    }
    this.toggleAttribute("editing", this.ctx.editing);
    this.toggleAttribute("narrow", this.ctx.narrow);
    this.toggleAttribute("dark", this.ctx.dark);
  }

  // ---- pointer handling ----

  private markerEl(m: Marker) {
    return this.renderRoot.querySelector(`[data-m="${m.id}"]`) ?? undefined;
  }

  private onDown(e: PointerEvent, m: Marker) {
    if (e.button !== 0) return;
    e.stopPropagation();
    if (this.ctx.editing) {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      this.selected = m.id;
      this.drag = { id: m.id, pointerId: e.pointerId, startX: e.clientX, startY: e.clientY, origX: m.x, origY: m.y, x: m.x, y: m.y, moved: false };
      return;
    }
    window.clearTimeout(this.press?.timer);
    this.press = {
      id: m.id,
      x: e.clientX,
      y: e.clientY,
      timer: window.setTimeout(() => {
        this.press = undefined;
        navigator.vibrate?.(8);
        this.ctx.openEntity(m.entity, this.markerEl(m));
      }, 450),
    };
  }

  private onMove(e: PointerEvent) {
    if (this.drag && e.pointerId === this.drag.pointerId) {
      const stage = this.stageSize();
      const dx = ((e.clientX - this.drag.startX) / stage.w) * 100;
      const dy = ((e.clientY - this.drag.startY) / stage.h) * 100;
      const moved = this.drag.moved || Math.hypot(e.clientX - this.drag.startX, e.clientY - this.drag.startY) > 3;
      this.drag = {
        ...this.drag,
        moved,
        x: Math.min(100, Math.max(0, this.drag.origX + dx)),
        y: Math.min(100, Math.max(0, this.drag.origY + dy)),
      };
      return;
    }
    if (this.press && Math.hypot(e.clientX - this.press.x, e.clientY - this.press.y) > 10) {
      window.clearTimeout(this.press.timer);
      this.press = undefined;
    }
  }

  private onUp(e: PointerEvent, m: Marker) {
    if (this.drag && e.pointerId === this.drag.pointerId) {
      const { x, y, moved } = this.drag;
      this.drag = undefined;
      if (moved)
        this.edit((_f, floor) => {
          const mk = floor?.markers.find((k) => k.id === m.id);
          if (mk) Object.assign(mk, { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
        });
      return;
    }
    if (this.press?.id === m.id) {
      window.clearTimeout(this.press.timer);
      this.press = undefined;
      this.tap(m);
    }
  }

  private onCancel() {
    window.clearTimeout(this.press?.timer);
    this.press = undefined;
    this.drag = undefined;
  }

  private tap(m: Marker) {
    const e = this.ctx.hass.states[m.entity];
    if (!e || e.state === "unavailable" || tapKind(m.entity) === "sheet") return this.ctx.openEntity(m.entity, this.markerEl(m));
    navigator.vibrate?.(5);
    runTap(this.ctx.hass, e).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  private stageSize() {
    const ratio = this.natural ? this.natural.w / this.natural.h : 16 / 10;
    if (this.ctx.narrow) return { w: this.area.w, h: this.area.w / ratio };
    let w = this.area.w;
    let h = w / ratio;
    if (h > this.area.h) {
      h = this.area.h;
      w = h * ratio;
    }
    return { w: Math.max(w, 0), h: Math.max(h, 0) };
  }

  // ---- edit actions ----

  private addFloor() {
    const n = this.floors.length + 1;
    this.edit((floors) => floors.push(newFloor(`${this.ctx.t("floor")} ${n}`)));
    this.floorIdx = this.floors.length; // the new floor, once the update lands
    this.natural = undefined;
  }

  private floorSheet() {
    const { t } = this.ctx;
    const floor = this.floor;
    if (!floor) return;
    this.ctx.showSheet({
      title: t("floor"),
      render: (ctx) => html`
        <div style="display:grid;gap:16px">
          <label class="field"
            >${t("floor_name")}
            <input
              type="text"
              .value=${floor.name}
              @change=${(e: any) => this.edit((_f, fl) => fl && (fl.name = e.target.value.trim() || floor.name))}
            />
          </label>
          ${this.floors.length > 1
            ? html`<button
                class="btn danger pressable"
                @click=${() => {
                  if (!confirm(t("delete_confirm"))) return;
                  const idx = this.floorIdx;
                  this.edit((floors) => floors.splice(idx, 1));
                  this.floorIdx = Math.max(0, idx - 1);
                  ctx.closeSheet();
                }}
              >
                <sn-icon icon="delete"></sn-icon>${t("delete_floor")}
              </button>`
            : nothing}
        </div>
      `,
    });
  }

  private pickFile() {
    this.renderRoot.querySelector<HTMLInputElement>("input[type=file]")?.click();
  }

  private async onFile(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    this.uploading = true;
    try {
      const url = await uploadImage(this.ctx.hass, file);
      this.natural = undefined;
      this.edit((_f, floor) => floor && (floor.image = url));
    } catch {
      this.ctx.toast(this.ctx.t("upload_failed"));
    } finally {
      this.uploading = false;
    }
  }

  private addDevice() {
    this.ctx.showSheet({
      title: this.ctx.t("add_device"),
      render: (ctx) => html`<sn-entity-picker
        .ctx=${ctx}
        .onPick=${(entity: string) => {
          const id = uid();
          const display = ["sensor", "climate"].includes(domainOf(entity)) ? "value" : "icon";
          this.edit((_f, floor) => floor?.markers.push({ id, entity, x: 50, y: 50, display }));
          this.selected = id;
          ctx.closeSheet();
        }}
      ></sn-entity-picker>`,
    });
  }

  private renameDevice(m: Marker) {
    const { t } = this.ctx;
    this.ctx.showSheet({
      title: t("display_name"),
      render: (ctx) => html`<label class="field"
        >${entityName(ctx.hass, ctx.config, m.entity)}
        <input
          type="text"
          .value=${ctx.config.names[m.entity] ?? ""}
          placeholder=${ctx.hass.states[m.entity]?.attributes.friendly_name ?? m.entity}
          @change=${(e: any) =>
            ctx.update((d) => {
              const v = e.target.value.trim();
              if (v) d.names[m.entity] = v;
              else delete d.names[m.entity];
            })}
        />
        <span class="hint">${t("display_name_hint")}</span>
      </label>`,
    });
  }

  // ---- heat map ----

  private get heatKey() {
    return `smartnest-heat-${this.widget.id}`;
  }

  /** Temperature per room: the average of temperature sensors and AC readings placed inside it. */
  private roomTemps(floor: Floor): Map<string, number> {
    const out = new Map<string, number>();
    for (const r of floor.rooms ?? []) {
      const vals = floor.markers
        .filter((m) => inside([m.x, m.y], r.points))
        .map((m) => {
          const e = this.ctx.hass.states[m.entity];
          if (!e) return NaN;
          if (domainOf(m.entity) === "climate") return Number(e.attributes.current_temperature);
          return e.attributes.device_class === "temperature" ? Number(e.state) : NaN;
        })
        .filter((v) => !Number.isNaN(v));
      if (vals.length) out.set(r.id, vals.reduce((a, b) => a + b, 0) / vals.length);
    }
    return out;
  }

  /** Cool blue → comfortable green → warm gold → hot coral, from the brand palette. */
  private heatColor(t: number): string {
    const stops: [number, [number, number, number]][] = [
      [17, [24, 188, 242]],
      [21.5, [47, 181, 122]],
      [25.5, [233, 151, 29]],
      [29, [242, 107, 104]],
    ];
    if (t <= stops[0][0]) return `rgb(${stops[0][1].join(",")})`;
    for (let i = 1; i < stops.length; i++) {
      const [t1, c1] = stops[i];
      const [t0, c0] = stops[i - 1];
      if (t <= t1) {
        const k = (t - t0) / (t1 - t0);
        return `rgb(${c0.map((v, j) => Math.round(v + (c1[j] - v) * k)).join(",")})`;
      }
    }
    return `rgb(${stops[stops.length - 1][1].join(",")})`;
  }

  private renderHeat(floor: Floor) {
    const temps = this.roomTemps(floor);
    return (floor.rooms ?? []).map((r) => {
      const t = temps.get(r.id);
      if (t === undefined) return nothing;
      const [cx, cy] = centroid(r.points);
      return html`<div class="heat" style="clip-path:${clipPath(r.points)};background-color:${this.heatColor(t)};opacity:${this.ctx.dark ? 0.42 : 0.34}"></div>
        <span class="heat-label" style="left:${cx}%;top:${cy}%">${formatNumber(t, this.ctx.lang, 1)}°</span>`;
    });
  }

  // ---- pinch zoom ----

  private canZoom() {
    return !this.ctx.editing && !!this.floor?.image;
  }

  private local(e: PointerEvent) {
    const stage = this.renderRoot.querySelector<HTMLElement>(".stage");
    const area = this.renderRoot.querySelector<HTMLElement>(".area")!.getBoundingClientRect();
    return { x: e.clientX - area.left - (stage?.offsetLeft ?? 0), y: e.clientY - area.top - (stage?.offsetTop ?? 0) };
  }

  /** Keeps the zoomed plan covering its box, so you can't pan it off into nothing. */
  private clampZoom(z: { s: number; x: number; y: number }) {
    const { w, h } = this.stageSize();
    const s = Math.min(4, Math.max(1, z.s));
    return { s, x: Math.min(0, Math.max(w - w * s, z.x)), y: Math.min(0, Math.max(h - h * s, z.y)) };
  }

  private zoomAround(px: number, py: number, s: number, animate: boolean) {
    const z = this.zoom;
    const next = this.clampZoom({ s, x: px - ((px - z.x) / z.s) * s, y: py - ((py - z.y) / z.s) * s });
    this.settling = animate;
    this.zoom = next;
  }

  private onAreaDown(e: PointerEvent) {
    if (!this.canZoom()) return;
    this.pointers.set(e.pointerId, this.local(e));
    if (this.pointers.size === 2) {
      // The first finger may already have started a page swipe; a pinch cancels it.
      this.dispatchEvent(new Event("sn-cancel-swipe", { bubbles: true, composed: true }));
      const [a, b] = [...this.pointers.values()];
      this.pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2, ...this.zoom };
      this.pan = undefined;
    } else if (this.pointers.size === 1) {
      const p = this.local(e);
      // Double-tap toggles between fitted and 2.5x around the finger.
      const now = performance.now();
      if (this.lastTap && now - this.lastTap.t < 300 && Math.hypot(p.x - this.lastTap.x, p.y - this.lastTap.y) < 30) {
        this.lastTap = undefined;
        this.zoomAround(p.x, p.y, this.zoom.s > 1 ? 1 : 2.5, true);
        e.stopPropagation();
        return;
      }
      this.lastTap = { t: now, ...p };
      if (this.zoom.s > 1) this.pan = { x: p.x, y: p.y, zx: this.zoom.x, zy: this.zoom.y };
    }
    // Zoomed in, the plan owns horizontal drags: don't let them flip the page.
    if (this.zoom.s > 1 || this.pointers.size > 1) {
      e.stopPropagation();
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
  }

  private onAreaMove(e: PointerEvent) {
    if (!this.pointers.has(e.pointerId)) return;
    this.pointers.set(e.pointerId, this.local(e));
    if (this.pinch && this.pointers.size >= 2) {
      const [a, b] = [...this.pointers.values()];
      const p = this.pinch;
      const s = Math.min(4, Math.max(1, (p.s * Math.hypot(a.x - b.x, a.y - b.y)) / p.d));
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      this.settling = false;
      this.zoom = this.clampZoom({ s, x: mx - ((p.mx - p.x) / p.s) * s, y: my - ((p.my - p.y) / p.s) * s });
    } else if (this.pan) {
      const q = this.local(e);
      this.settling = false;
      this.zoom = this.clampZoom({ s: this.zoom.s, x: this.pan.zx + q.x - this.pan.x, y: this.pan.zy + q.y - this.pan.y });
    }
  }

  private onAreaUp(e: PointerEvent) {
    this.pointers.delete(e.pointerId);
    if (this.pointers.size < 2) this.pinch = undefined;
    if (!this.pointers.size) this.pan = undefined;
  }

  private onWheel(e: WheelEvent) {
    // Trackpad pinch arrives as ctrl+wheel.
    if (!e.ctrlKey || !this.canZoom()) return;
    e.preventDefault();
    const area = this.renderRoot.querySelector<HTMLElement>(".area")!.getBoundingClientRect();
    const stage = this.renderRoot.querySelector<HTMLElement>(".stage");
    this.zoomAround(e.clientX - area.left - (stage?.offsetLeft ?? 0), e.clientY - area.top - (stage?.offsetTop ?? 0), this.zoom.s * Math.exp(-e.deltaY / 200), false);
  }

  // ---- rooms ----

  private pct(e: PointerEvent): Pt {
    const r = this.renderRoot.querySelector<HTMLElement>(".stage")!.getBoundingClientRect();
    return [Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)), Math.min(100, Math.max(0, ((e.clientY - r.top) / r.height) * 100))];
  }

  private corners(except?: string): Pt[] {
    return (this.floor?.rooms ?? []).filter((r) => r.id !== except).flatMap((r) => r.points);
  }

  private onStageDown(e: PointerEvent) {
    if (!this.roomMode || e.button !== 0) return;
    e.stopPropagation();
    if (!this.drawing) {
      this.selRoom = undefined;
      return;
    }
    const pts = this.drawing;
    const p = this.pct(e);
    // Tapping the first corner again closes the room.
    if (pts.length >= 3 && Math.hypot(p[0] - pts[0][0], p[1] - pts[0][1]) < 3) return this.finishRoom();
    this.drawing = [...pts, snap(p, this.corners())];
  }

  private finishRoom() {
    const pts = this.drawing;
    if (!pts || pts.length < 3) return;
    const id = uid();
    const n = (this.floor?.rooms?.length ?? 0) + 1;
    const room: Room = { id, name: this.ctx.t("room_default", { n }), points: pts };
    this.edit((_f, fl) => {
      if (!fl) return;
      fl.rooms = [...(fl.rooms ?? []), room];
    });
    this.drawing = undefined;
    this.selRoom = id;
  }

  private onVtxDown(e: PointerEvent, room: Room, idx: number) {
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this.selRoom = room.id;
    this.vtx = { room: room.id, idx, pointerId: e.pointerId, p: room.points[idx] };
  }

  private onVtxMove(e: PointerEvent) {
    if (!this.vtx || e.pointerId !== this.vtx.pointerId) return;
    this.vtx = { ...this.vtx, p: snap(this.pct(e), this.corners(this.vtx.room)) };
  }

  private onVtxUp(e: PointerEvent) {
    const v = this.vtx;
    if (!v || e.pointerId !== v.pointerId) return;
    this.vtx = undefined;
    this.edit((_f, fl) => {
      const r = fl?.rooms?.find((x) => x.id === v.room);
      if (r) r.points[v.idx] = v.p;
    });
  }

  private renameRoom(room: Room) {
    this.ctx.showSheet({
      title: this.ctx.t("room_name"),
      render: (ctx) => html`<label class="field"
        >${ctx.t("room_name")}
        <input
          type="text"
          .value=${room.name}
          @change=${(e: any) =>
            this.edit((_f, fl) => {
              const r = fl?.rooms?.find((x) => x.id === room.id);
              if (r) r.name = e.target.value.trim() || room.name;
            })}
        />
      </label>`,
    });
  }

  /** Points of a room, with the corner being dragged right now. */
  private livePoints(r: Room): Pt[] {
    return this.vtx?.room === r.id ? r.points.map((p, i) => (i === this.vtx!.idx ? this.vtx!.p : p)) : r.points;
  }

  private renderGlow(floor: Floor, stageW: number) {
    const { hass } = this.ctx;
    const radius = Math.max(120, stageW * 0.3);
    return (floor.rooms ?? []).map((room) => {
      const lights = floor.markers.filter((m) => domainOf(m.entity) === "light" && inside([m.x, m.y], room.points));
      const lit = lights.filter((m) => hass.states[m.entity]?.state === "on");
      const layers = lit.map((m) => {
        const a = hass.states[m.entity]!.attributes;
        const [r, g, b] = Array.isArray(a.rgb_color) ? a.rgb_color : [255, 196, 120];
        const level = typeof a.brightness === "number" ? a.brightness / 255 : 1;
        const alpha = (this.ctx.dark ? 0.35 : 0.22) + (this.ctx.dark ? 0.45 : 0.25) * level;
        return `radial-gradient(circle ${radius}px at ${m.x}% ${m.y}%, rgba(${r},${g},${b},${alpha.toFixed(2)}) 0%, rgba(${r},${g},${b},${(alpha * 0.45).toFixed(2)}) 45%, rgba(${r},${g},${b},${(alpha * 0.18).toFixed(2)}) 100%)`;
      });
      return html`<div
        class="glow"
        style="clip-path:${clipPath(this.livePoints(room))};opacity:${lit.length ? 1 : 0};${layers.length ? `background:${layers.join(",")}` : ""}"
      ></div>`;
    });
  }

  private renderRoomEditor(floor: Floor) {
    const rooms = floor.rooms ?? [];
    const draw = this.drawing;
    return html`<svg class="rooms-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        ${rooms.map(
          (r) => svg`<polygon
            class=${r.id === this.selRoom ? "sel" : ""}
            points=${this.livePoints(r).map((p) => p.join(",")).join(" ")}
            @pointerdown=${(e: PointerEvent) => {
              if (this.drawing) return;
              e.stopPropagation();
              this.selRoom = r.id;
            }}
          ></polygon>`
        )}
        ${draw ? svg`<polyline points=${draw.map((p) => p.join(",")).join(" ")}></polyline>` : nothing}
      </svg>
      ${rooms.map((r) => {
        const [x, y] = centroid(this.livePoints(r));
        return html`<span class="room-label" style="left:${x}%;top:${y}%">${r.name}</span>`;
      })}
      ${draw?.map((p, i) => html`<span class="vtx ${i === 0 && draw.length >= 3 ? "first" : ""}" style="left:${p[0]}%;top:${p[1]}%;pointer-events:none"></span>`)}
      ${!draw
        ? rooms
            .filter((r) => r.id === this.selRoom)
            .flatMap((r) =>
              this.livePoints(r).map(
                (p, i) => html`<span
                  class="vtx"
                  style="left:${p[0]}%;top:${p[1]}%"
                  @pointerdown=${(e: PointerEvent) => this.onVtxDown(e, r, i)}
                  @pointermove=${(e: PointerEvent) => this.onVtxMove(e)}
                  @pointerup=${(e: PointerEvent) => this.onVtxUp(e)}
                  @pointercancel=${() => (this.vtx = undefined)}
                ></span>`
              )
            )
        : nothing}`;
  }

  private renderRoomTools() {
    const { t } = this.ctx;
    const stop = (e: Event) => e.stopPropagation();
    if (this.drawing)
      return html`<div class="tools glass" @pointerdown=${stop}>
        <span class="hint">${t("draw_hint")}</span>
        <button class="icon-btn pressable" aria-label=${t("undo_point")} ?disabled=${!this.drawing.length} @click=${() => (this.drawing = this.drawing!.slice(0, -1))}>
          <sn-icon icon="undo" style="--icon-size:20px"></sn-icon>
        </button>
        <button class="btn pressable" @click=${() => (this.drawing = undefined)}>${t("cancel")}</button>
        <button class="btn primary pressable" ?disabled=${this.drawing.length < 3} @click=${() => this.finishRoom()}>${t("finish")}</button>
      </div>`;
    const room = this.floor?.rooms?.find((r) => r.id === this.selRoom);
    if (room)
      return html`<div class="tools glass" @pointerdown=${stop}>
        <span class="label">${room.name}</span>
        ${this.robotRooms?.length
          ? html`<select
              aria-label=${t("widget_vacuum")}
              title=${t("widget_vacuum")}
              style="width:auto;min-height:40px"
              @change=${(e: any) =>
                this.edit((_f, fl) => {
                  const r = fl?.rooms?.find((x) => x.id === room.id);
                  if (!r) return;
                  if (e.target.value) r.robot_room = e.target.value;
                  else delete r.robot_room;
                })}
            >
              <option value="" ?selected=${!room.robot_room}>🤖 ${this.robotRooms.find((r) => r.id === robotRoomFor({ ...room, robot_room: undefined }, this.robotRooms!))?.name ?? "–"}</option>
              ${this.robotRooms.map((r) => html`<option value=${r.id} ?selected=${room.robot_room === r.id}>🤖 ${r.name}</option>`)}
            </select>`
          : nothing}
        <button class="icon-btn pressable" aria-label=${t("room_name")} @click=${() => this.renameRoom(room)}>
          <sn-icon icon="pencil" style="--icon-size:20px"></sn-icon>
        </button>
        <button
          class="icon-btn pressable"
          aria-label=${t("delete_room")}
          @click=${() => {
            this.edit((_f, fl) => fl && (fl.rooms = (fl.rooms ?? []).filter((r) => r.id !== room.id)));
            this.selRoom = undefined;
          }}
        >
          <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
        </button>
        <button class="icon-btn primary pressable" aria-label=${t("done")} @click=${() => (this.selRoom = undefined)}>
          <sn-icon icon="check" style="--icon-size:20px"></sn-icon>
        </button>
      </div>`;
    return html`<div class="tools glass" @pointerdown=${stop}>
      <span class="hint">${t("rooms_hint")}</span>
      <button class="btn primary pressable" @click=${() => (this.drawing = [])}>
        <sn-icon icon="rooms" style="--icon-size:20px"></sn-icon>${t("draw_room")}
      </button>
      <button class="btn pressable" @click=${() => (this.roomMode = false)}>${t("done")}</button>
    </div>`;
  }

  // ---- render ----

  private renderMarker(m: Marker) {
    const { ctx } = this;
    const e = ctx.hass.states[m.entity];
    const on = isActive(e);
    const dragging = this.drag?.id === m.id;
    const x = dragging ? this.drag!.x : m.x;
    const y = dragging ? this.drag!.y : m.y;
    const motion = on && domainOf(m.entity) === "binary_sensor" && ["motion", "occupancy", "presence"].includes(e?.attributes.device_class);
    const cls = [
      "marker",
      on ? "on" : "",
      motion ? "pulse" : "",
      !e || e.state === "unavailable" ? "dim" : "",
      ctx.editing ? "editable" : "",
      dragging ? "dragging" : "",
      this.selected === m.id && ctx.editing ? "selected" : "",
    ].join(" ");
    return html`<div
      class=${cls}
      data-m=${m.id}
      style="left:${x}%;top:${y}%;${toneStyle(e)}"
      role="button"
      tabindex="0"
      aria-label=${entityName(ctx.hass, ctx.config, m.entity)}
      @pointerdown=${(ev: PointerEvent) => this.onDown(ev, m)}
      @pointermove=${(ev: PointerEvent) => this.onMove(ev)}
      @pointerup=${(ev: PointerEvent) => this.onUp(ev, m)}
      @pointercancel=${() => this.onCancel()}
      @contextmenu=${(ev: Event) => ev.preventDefault()}
      @keydown=${(ev: KeyboardEvent) => ev.key === "Enter" && !ctx.editing && this.tap(m)}
    >
      <span class="ic"><sn-icon class=${livingClass(e)} .icon=${entityIcon(e, m.entity)}></sn-icon></span>
      ${m.display === "value" ? html`<span class="val">${rolling(shortValue(ctx.t, e, ctx.lang))}</span>` : nothing}
      ${ctx.editing && this.selected === m.id && !dragging
        ? html`<span class="tag">${entityName(ctx.hass, ctx.config, m.entity)}</span>`
        : nothing}
    </div>`;
  }

  private renderTools() {
    const { ctx } = this;
    const { t } = ctx;
    const floor = this.floor;
    if (this.roomMode) return this.renderRoomTools();
    const sel = floor?.markers.find((m) => m.id === this.selected);
    if (sel)
      return html`<div class="tools glass" @pointerdown=${(e: Event) => e.stopPropagation()}>
        <span class="label">${entityName(ctx.hass, ctx.config, sel.entity)}</span>
        <div class="seg">
          ${(["icon", "value"] as const).map(
            (d) => html`<button
              aria-pressed=${sel.display === d}
              @click=${() => this.edit((_f, fl) => {
                const mk = fl?.markers.find((k) => k.id === sel.id);
                if (mk) mk.display = d;
              })}
            >
              ${t(d === "icon" ? "show_icon" : "show_value")}
            </button>`
          )}
        </div>
        <button class="icon-btn pressable" aria-label=${t("display_name")} @click=${() => this.renameDevice(sel)}>
          <sn-icon icon="pencil" style="--icon-size:20px"></sn-icon>
        </button>
        <button
          class="icon-btn pressable"
          aria-label=${t("delete")}
          @click=${() => {
            this.edit((_f, fl) => fl && (fl.markers = fl.markers.filter((k) => k.id !== sel.id)));
            this.selected = undefined;
          }}
        >
          <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>
        </button>
        <button class="icon-btn primary pressable" aria-label=${t("done")} @click=${() => (this.selected = undefined)}>
          <sn-icon icon="check" style="--icon-size:20px"></sn-icon>
        </button>
      </div>`;
    return html`<div class="tools glass" @pointerdown=${(e: Event) => e.stopPropagation()}>
      <button class="btn pressable" ?disabled=${this.uploading} @click=${() => this.pickFile()}>
        <sn-icon icon="image-plus" style="--icon-size:20px"></sn-icon>
        ${this.uploading ? t("loading") : floor?.image ? t("replace_plan") : t("upload_plan")}
      </button>
      <button class="btn pressable" ?disabled=${!floor?.image} @click=${() => {
        this.roomMode = true;
        this.selected = undefined;
        const robot = Object.keys(this.ctx.hass.states).find((id) => id.startsWith("vacuum."));
        if (robot && !this.robotRooms) loadRobotRooms(this.ctx.hass, robot).then((r) => (this.robotRooms = r.rooms));
      }}>
        <sn-icon icon="rooms" style="--icon-size:20px"></sn-icon>${t("rooms")}
      </button>
      <button class="btn primary pressable" ?disabled=${!floor?.image} @click=${() => this.addDevice()}>
        <sn-icon icon="marker-plus" style="--icon-size:20px"></sn-icon>${t("add_device")}
      </button>
      <input type="file" accept="image/png,image/jpeg,image/webp" @change=${this.onFile} />
    </div>`;
  }

  render() {
    const { ctx } = this;
    const { t } = ctx;
    const floor = this.floor;
    const floors = this.floors;
    const stage = this.stageSize();
    const ratio = this.natural ? this.natural.w / this.natural.h : 16 / 10;
    const hasHeat = !!floor && this.roomTemps(floor).size > 0;
    return html`<div class="wrap glass">
      ${floors.length > 1 || ctx.editing
        ? html`<div class="floors" @pointerdown=${(e: Event) => e.stopPropagation()}>
            <div class="seg">
              ${floors.map(
                (f, i) => html`<button
                  aria-pressed=${i === this.floorIdx}
                  @click=${() => {
                    if (i === this.floorIdx && ctx.editing) return this.floorSheet();
                    this.floorIdx = i;
                    this.selected = undefined;
                    this.natural = undefined;
                  }}
                >
                  <sn-icon icon="layers" style="--icon-size:16px"></sn-icon>${f.name}
                </button>`
              )}
              ${ctx.editing
                ? html`<button aria-label=${t("add_floor")} @click=${() => this.addFloor()}>
                    <sn-icon icon="plus" style="--icon-size:18px"></sn-icon>
                  </button>`
                : nothing}
            </div>
          </div>`
        : nothing}
      ${floor?.image && !ctx.editing && hasHeat
        ? html`<div class="corner-btns" @pointerdown=${(e: Event) => e.stopPropagation()}>
            <button
              class="pressable"
              aria-pressed=${this.heat}
              aria-label=${t("heat_map")}
              title=${t("heat_map")}
              @click=${() => {
                this.heat = !this.heat;
                try {
                  localStorage.setItem(this.heatKey, this.heat ? "1" : "0");
                } catch {
                  /* fine */
                }
              }}
            >
              <sn-icon icon="thermometer"></sn-icon>
            </button>
          </div>`
        : nothing}
      <div
        class="area ${this.canZoom() ? "zoomable" : ""} ${this.zoom.s > 1 ? "zoomed" : ""}"
        style=${ctx.narrow ? `aspect-ratio:${ratio}` : ""}
        @pointerdown=${(e: PointerEvent) => this.onAreaDown(e)}
        @pointermove=${(e: PointerEvent) => this.onAreaMove(e)}
        @pointerup=${(e: PointerEvent) => this.onAreaUp(e)}
        @pointercancel=${(e: PointerEvent) => this.onAreaUp(e)}
        @wheel=${(e: WheelEvent) => this.onWheel(e)}
      >
        ${floor?.image
          ? html`<div
              class="stage ${this.roomMode ? "room-mode" : ""} ${this.drawing ? "drawing" : ""} ${this.settling ? "settle" : ""}"
              style="width:${stage.w}px;height:${stage.h}px;transform:translate(${this.zoom.x}px, ${this.zoom.y}px) scale(${this.zoom.s});--inv:${1 / this.zoom.s}"
              @pointerdown=${(e: PointerEvent) => this.onStageDown(e)}
            >
              <img
                class=${this.widget.config.invert_dark ? "plan-light" : ""}
                src=${floor.image}
                alt=""
                @load=${(e: Event) => {
                  const img = e.target as HTMLImageElement;
                  this.natural = { w: img.naturalWidth, h: img.naturalHeight };
                  this.measure();
                }}
              />
              ${this.heat && !ctx.editing ? this.renderHeat(floor) : this.renderGlow(floor, stage.w)}
              ${floor.markers.map((m) => this.renderMarker(m))}
              ${ctx.editing && this.roomMode ? this.renderRoomEditor(floor) : nothing}
            </div>`
          : html`<div class="empty">
              <sn-icon icon="image"></sn-icon>
              <strong>${t("no_plan")}</strong>
              ${ctx.isAdmin && !ctx.editing ? html`<span>${t("no_plan_admin")}</span>` : nothing}
            </div>`}
      </div>
      ${ctx.editing && floor ? this.renderTools() : nothing}
    </div>`;
  }
}
