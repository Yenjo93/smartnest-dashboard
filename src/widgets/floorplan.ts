import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { DashboardConfig, Floor, HassEntity, Marker, Room, Widget } from "../types";
import { centroid, clipPath, inside, snap, type Pt } from "../geometry";
import { toneStyle, domainOf, entityIcon, entityName, formatNumber, isActive, runTap, shortValue, tapKind } from "../entities";
import { findWidget, newFloor, uid, uploadImage } from "../config";
import { shared } from "../theme";
import { LOCALE } from "../i18n";
import "../ui/icon";
import { rolling } from "../ui/num";
import { livingClass, livingStyles, playStateChange } from "../motion";
import { loadRobotRooms, robotRoomFor, type RoomChoice } from "./vacuum";
import { autoPlace, isAreaName } from "../autofill";
import { fxRow } from "../lightfx";
import "../ai-features";
import { detectRooms } from "../plan-detect";
import "../ui/entity-picker";

type MapMode = "off" | "temp" | "humidity" | "co2";


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
  private moved = 0;
  @state() private heat: MapMode = "off";
  @state() private tilt = false;
  @state() private robotRooms?: RoomChoice[];
  @state() private detecting = false;
  /** Replaying the last 24 hours on the plan. */
  @state() private replay?: { start: number; at: number; playing: boolean; data: Record<string, { s: string; lu: number }[]> };
  private replayTimer?: number;
  /** All floors stacked in 3D. */
  @state() private stack = false;
  /** Rooms the robot has been in today, per floor. */
  private cleaned = new Set<string>();
  /** Rooms still to name, one at a time, during the automatic setup. */
  @state() private asking?: string[];
  private askTotal = 0;
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
        transition: opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
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
      .fx {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: -1;
      }
      .fx-door svg {
        position: absolute;
        width: 46px;
        height: 46px;
        inset-inline-start: 50%;
        bottom: 50%;
        overflow: visible;
      }
      .fx-door path {
        fill: color-mix(in srgb, var(--accent) 16%, transparent);
        stroke: var(--accent);
        stroke-width: 2;
        stroke-dasharray: 4 3;
        transform-origin: 4px 36px;
        animation: fx-swing 2.4s cubic-bezier(0.37, 0, 0.63, 1) infinite alternate;
      }
      .fx-ripple i {
        position: absolute;
        inset: 0;
        border-radius: 999px;
        border: 2px solid #3a86ff;
        animation: fx-ripple 2.1s cubic-bezier(0.22, 1, 0.36, 1) infinite;
      }
      .fx-ripple i:nth-child(2) {
        animation-delay: 0.7s;
      }
      .fx-ripple i:nth-child(3) {
        animation-delay: 1.4s;
      }
      .fx-shade {
        inset: 3px;
        border-radius: 999px;
        overflow: hidden;
        z-index: 2;
      }
      .fx-shade::after {
        content: "";
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(180deg, color-mix(in srgb, var(--text) 38%, transparent) 0 3px, transparent 3px 6px);
        transform: scaleY(var(--shut));
        transform-origin: top;
        transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .fx-air {
        top: 100%;
        height: 34px;
      }
      .fx-air i {
        position: absolute;
        top: 0;
        left: 50%;
        width: 18px;
        height: 10px;
        margin-left: -9px;
        border-bottom: 2px solid #5ec8f2;
        border-radius: 0 0 50% 50%;
        opacity: 0;
        animation: fx-blow 1.8s linear infinite;
      }
      .fx-air.hot i {
        border-color: #ff8a3d;
      }
      .fx-air i:nth-child(2) {
        animation-delay: 0.6s;
      }
      .fx-air i:nth-child(3) {
        animation-delay: 1.2s;
      }
      .fx-notes i {
        position: absolute;
        top: 0;
        left: 50%;
        font-style: normal;
        font-size: 14px;
        color: var(--accent);
        opacity: 0;
        animation: fx-note 2.4s ease-out infinite;
      }
      .fx-notes i:nth-child(2) {
        animation-delay: 0.8s;
        --dx: 14px;
      }
      .fx-notes i:nth-child(3) {
        animation-delay: 1.6s;
        --dx: -12px;
      }
      @keyframes fx-swing {
        from {
          transform: rotate(-6deg);
        }
        to {
          transform: rotate(4deg);
        }
      }
      @keyframes fx-ripple {
        from {
          transform: scale(1);
          opacity: 0.9;
        }
        to {
          transform: scale(2.6);
          opacity: 0;
        }
      }
      @keyframes fx-blow {
        0% {
          transform: translateY(0) scaleX(0.6);
          opacity: 0;
        }
        25% {
          opacity: 0.9;
        }
        100% {
          transform: translateY(26px) scaleX(1.5);
          opacity: 0;
        }
      }
      @keyframes fx-note {
        0% {
          transform: translate(0, 0);
          opacity: 0;
        }
        20% {
          opacity: 1;
        }
        100% {
          transform: translate(var(--dx, 6px), -34px);
          opacity: 0;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .fx-door path,
        .fx-ripple i:not(:first-child),
        .fx-air i:not(:first-child),
        .fx-notes i:not(:first-child) {
          animation: none;
        }
        .fx-ripple i:first-child,
        .fx-air i:first-child,
        .fx-notes i:first-child {
          animation: none;
          opacity: 0.8;
        }
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
      .marker.sleepy {
        opacity: 0.3;
        transform: translate(-50%, -50%) scale(calc(var(--inv, 1) * 0.85));
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
        min-width: 170px;
        flex-shrink: 0;
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
      .glow.lit {
        animation: room-breathe 6s cubic-bezier(0.77, 0, 0.175, 1) infinite alternate;
      }
      @keyframes room-breathe {
        from {
          opacity: 0.82;
        }
        to {
          opacity: 1;
        }
      }
      .stage.tilt {
        transform-style: preserve-3d; /* lets markers stand up off the tilted floor */
        transform-origin: 50% 30% !important;
        transition: transform 600ms cubic-bezier(0.77, 0, 0.175, 1);
      }
      .stage.tilt img {
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
      }
      .tilt .marker,
      .tilt .heat-label,
      .tilt .room-label,
      .tilt .person {
        /* stand upright on the tilted floor */
        translate: 0 -10px;
        rotate: x -40deg;
      }
      .person {
        position: absolute;
        transform: translate(-50%, -50%) scale(var(--inv, 1));
        width: 26px;
        height: 26px;
        border-radius: 999px;
        background: var(--accent) center / cover no-repeat;
        color: var(--on-accent);
        display: grid;
        place-items: center;
        font-size: 12px;
        font-weight: 700;
        box-shadow: 0 0 0 2px var(--surface-solid), var(--shadow);
        pointer-events: none;
        z-index: 2;
        transition: left 800ms cubic-bezier(0.77, 0, 0.175, 1), top 800ms cubic-bezier(0.77, 0, 0.175, 1);
      }
      @media (prefers-reduced-motion: reduce) {
        .glow.lit {
          animation: none;
        }
      }
      .hit {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .hit polygon {
        fill: transparent;
        cursor: pointer;
        transition: fill 160ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .hit polygon:active {
        fill: color-mix(in srgb, var(--accent) 14%, transparent);
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
      .marker.roving {
        transition: left 2.4s cubic-bezier(0.65, 0, 0.35, 1), top 2.4s cubic-bezier(0.65, 0, 0.35, 1), transform var(--dur-fast) var(--ease-out);
      }
      .clean {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.5) 45%, transparent 60%) 0 0 / 300% 100%,
          color-mix(in srgb, #2bb673 12%, transparent);
        animation: shine 4s linear infinite;
      }
      .clean-tag {
        position: absolute;
        transform: translate(-50%, -150%);
        font-size: 18px;
        pointer-events: none;
      }
      @keyframes shine {
        from {
          background-position: 150% 0, 0 0;
        }
        to {
          background-position: -150% 0, 0 0;
        }
      }
      .stack {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        perspective: 1600px;
        overflow: hidden;
      }
      .slab {
        position: absolute;
        width: min(62%, 560px);
        border: 0;
        padding: 0;
        background: none;
        cursor: pointer;
        transform-style: preserve-3d;
        transform: translateY(calc(((var(--n) - 1) / 2 - var(--i)) * 34%)) rotateX(58deg) rotateZ(-28deg);
        animation: slab-in 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
        animation-delay: calc(var(--i) * 90ms);
        transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .slab:hover {
        transform: translateY(calc(((var(--n) - 1) / 2 - var(--i)) * 34% - 12px)) rotateX(58deg) rotateZ(-28deg);
      }
      .plate {
        position: relative;
        display: block;
        border-radius: 14px;
        overflow: hidden;
        background: var(--surface-solid);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.35), 0 0 0 1px var(--border);
      }
      .plate img {
        display: block;
        width: 100%;
        opacity: 0.92;
      }
      .plate .lit {
        position: absolute;
        width: 18%;
        aspect-ratio: 1;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 196, 120, 0.85), rgba(255, 196, 120, 0) 70%);
      }
      .slab-tag {
        position: absolute;
        top: 50%;
        inset-inline-start: 12px;
        transform: translateY(calc(-50% + ((var(--n) - 1) / 2 - var(--i)) * min(17vw, 150px)));
        pointer-events: none;
        padding: 6px 12px;
        border-radius: 999px;
        background: var(--surface-solid);
        font: 600 14px var(--font);
        color: var(--text);
        white-space: nowrap;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
      }
      @keyframes slab-in {
        from {
          opacity: 0;
          transform: translateY(0) rotateX(58deg) rotateZ(-28deg) scale(0.9);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .slab,
        .clean {
          animation: none;
        }
      }
      .tools.replay {
        width: min(620px, calc(100% - 24px));
        border-radius: var(--r-lg);
        padding: 8px 10px;
        gap: 10px;
      }
      .rp {
        flex: 1;
        min-width: 0;
        display: grid;
        gap: 4px;
      }
      .rp-top {
        display: flex;
        gap: 8px;
        align-items: baseline;
        font-size: 14px;
        min-width: 0;
      }
      .rp-top b {
        font-size: 18px;
        font-variant-numeric: tabular-nums;
      }
      .rp-top .cap {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: end;
        color: var(--accent-text);
        font-weight: 600;
      }
      .rp input[type="range"] {
        width: 100%;
        accent-color: var(--accent);
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    try {
      const saved = localStorage.getItem(this.heatKey);
      this.heat = saved === "1" ? "temp" : saved === "temp" || saved === "humidity" || saved === "co2" ? saved : "off";
      this.tilt = localStorage.getItem(`${this.heatKey}-3d`) === "1";
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
    window.clearInterval(this.replayTimer);
  }

  /** Remembers which rooms the robot has been in today. */
  private trackRobot() {
    const floor = this.floor;
    if (!floor || !this.ctx?.allows("robot_on_plan")) return;
    let changed = false;
    if (!this.cleaned.size)
      try {
        for (const id of JSON.parse(localStorage.getItem(this.cleanedKey) ?? "[]")) this.cleaned.add(id);
      } catch {
        /* fine */
      }
    for (const m of floor.markers) {
      if (domainOf(m.entity) !== "vacuum") continue;
      const r = this.robotRoom(floor, m.entity);
      if (r && !this.cleaned.has(r.id)) {
        this.cleaned.add(r.id);
        changed = true;
      }
    }
    if (changed)
      try {
        localStorage.setItem(this.cleanedKey, JSON.stringify([...this.cleaned]));
      } catch {
        /* per-tablet memory */
      }
  }

  /** Rooms the robot did today sparkle softly. */
  private renderCleaned(floor: Floor) {
    if (!this.cleaned.size) return nothing;
    return (floor.rooms ?? [])
      .filter((r) => this.cleaned.has(r.id))
      .map((r) => {
        const [cx, cy] = centroid(r.points);
        return html`<div class="clean" style="clip-path:${clipPath(r.points)}"></div><span class="clean-tag" style="left:${cx}%;top:${cy}%">✨</span>`;
      });
  }

  // ---- replay the day ----

  /** A device as it was at the replay time; live otherwise. */
  private st(id: string): HassEntity | undefined {
    const cur = this.ctx.hass.states[id];
    const r = this.replay;
    const rows = r?.data[id];
    if (!r || !cur || !rows?.length) return cur;
    let hit = rows[0];
    for (const x of rows) {
      if (x.lu * 1000 > r.at) break;
      hit = x;
    }
    // Colour and brightness weren't fetched; a light that was on shows in its usual warm white.
    const attributes = hit.s === cur.state ? cur.attributes : { ...cur.attributes, brightness: undefined, rgb_color: undefined, current_position: undefined };
    return { ...cur, state: hit.s, attributes, last_changed: new Date(hit.lu * 1000).toISOString() };
  }

  private async startReplay() {
    const floor = this.floor;
    if (!floor) return;
    const end = Date.now();
    const start = end - 24 * 3_600_000;
    let data: Record<string, { s: string; lu: number }[]> = {};
    try {
      data = await this.ctx.hass.callWS({
        type: "history/history_during_period",
        start_time: new Date(start).toISOString(),
        end_time: new Date(end).toISOString(),
        entity_ids: [...new Set(floor.markers.map((m) => m.entity))],
        minimal_response: true,
        no_attributes: true,
        significant_changes_only: false,
      });
    } catch {
      return this.ctx.toast(this.ctx.t("error"));
    }
    this.zoom = { s: 1, x: 0, y: 0 };
    this.replay = { start, at: start, playing: true, data };
    this.playReplay();
  }

  private playReplay() {
    window.clearInterval(this.replayTimer);
    // A whole day in about 24 seconds: six minutes every tenth of a second.
    this.replayTimer = window.setInterval(() => {
      const r = this.replay;
      if (!r?.playing) return window.clearInterval(this.replayTimer);
      const at = Math.min(Date.now(), r.at + 6 * 60_000);
      this.replay = { ...r, at, playing: at < Date.now() };
    }, 100);
  }

  private stopReplay() {
    window.clearInterval(this.replayTimer);
    this.replay = undefined;
  }

  /** The latest thing that happened before the replay time, as a caption. */
  private replayCaption(): string {
    const r = this.replay!;
    const { ctx } = this;
    let best: { id: string; lu: number; s: string } | undefined;
    for (const [id, rows] of Object.entries(r.data)) {
      const d = domainOf(id);
      if (!["light", "lock", "binary_sensor", "cover", "climate", "switch", "media_player", "vacuum"].includes(d)) continue;
      for (let i = 1; i < rows.length; i++) {
        const t = rows[i].lu * 1000;
        if (t > r.at) break;
        if (r.at - t < 25 * 60_000 && rows[i].s !== rows[i - 1].s && (!best || t > best.lu)) best = { id, lu: t, s: rows[i].s };
      }
    }
    if (!best) return "";
    const e = this.st(best.id);
    const when = new Date(best.lu).toLocaleTimeString(LOCALE[ctx.lang], { hour: "2-digit", minute: "2-digit" });
    return `${when} · ${entityName(ctx.hass, ctx.config, best.id)}: ${e ? shortValue(ctx.t, { ...e, state: best.s }, ctx.lang) : best.s}`;
  }

  private renderReplay() {
    const r = this.replay!;
    const { t, lang } = this.ctx;
    const now = Date.now();
    const at = new Date(r.at);
    return html`<div class="tools glass replay" @pointerdown=${(e: Event) => e.stopPropagation()}>
      <button
        class="icon-btn primary pressable"
        aria-label=${t(r.playing ? "pause" : "play")}
        @click=${() => {
          const restart = r.at >= now - 60_000;
          this.replay = { ...r, playing: !r.playing, at: restart && !r.playing ? r.start : r.at };
          if (this.replay.playing) this.playReplay();
        }}
      >
        <sn-icon icon=${r.playing ? "pause" : "play"} style="--icon-size:22px"></sn-icon>
      </button>
      <div class="rp">
        <div class="rp-top">
          <b class="ltr">${at.toLocaleTimeString(LOCALE[lang], { hour: "2-digit", minute: "2-digit" })}</b>
          <span class="muted">${at.toDateString() === new Date().toDateString() ? t("today") : t("yesterday")}</span>
          <span class="cap">${this.replayCaption()}</span>
        </div>
        <input
          type="range"
          min=${r.start}
          max=${now}
          step="60000"
          .value=${String(r.at)}
          style="direction:ltr"
          aria-label=${t("replay")}
          @input=${(e: any) => (this.replay = { ...r, at: Number(e.target.value), playing: false })}
        />
      </div>
      <button class="icon-btn pressable" aria-label=${t("close")} @click=${() => this.stopReplay()}>
        <sn-icon icon="close" style="--icon-size:20px"></sn-icon>
      </button>
    </div>`;
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
    this.trackRobot();
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

  // ---- tap a room ----

  /** Everything placed in the room, with one switch for all its lights. */
  private roomSheet(room: Room) {
    if (this.moved > 8) return; // that was a pan, not a tap
    const floor = this.floor;
    if (!floor) return;
    const ids = floor.markers.filter((m) => inside([m.x, m.y], room.points)).map((m) => m.entity);
    if (!ids.length) return;
    const flew = this.flyTo(room);
    this.ctx.showSheet({
      title: room.name,
      onClose: () => {
        if (!flew) return;
        this.settling = true;
        this.zoom = { s: 1, x: 0, y: 0 };
      },
      render: (c) => {
        const lights = ids.filter((id) => domainOf(id) === "light");
        const anyOn = lights.some((id) => c.hass.states[id]?.state === "on");
        return html`<div style="display:grid;gap:10px">
          ${lights.length
            ? html`<button
                class="btn ${anyOn ? "" : "primary"} pressable"
                @click=${() => c.hass.callService("light", anyOn ? "turn_off" : "turn_on", { entity_id: lights }).catch(() => c.toast(c.t("error")))}
              >
                <sn-icon icon=${anyOn ? "lightbulb-outline" : "lightbulb"} style="--icon-size:20px"></sn-icon>${c.t(anyOn ? "room_lights_off" : "room_lights_on")}
              </button>`
            : nothing}
          ${c.allows("light_fx") && lights.some((id) => (c.hass.states[id]?.attributes.supported_color_modes ?? []).some((m: string) => ["hs", "rgb", "rgbw", "rgbww", "xy"].includes(m)))
            ? fxRow(c, lights)
            : nothing}
          <sn-ai-scene .ctx=${c} .lights=${lights}></sn-ai-scene>
          ${ids.map((id) => {
            const e = c.hass.states[id];
            return html`<button
              class="glass pressable"
              style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:var(--r-md);text-align:start"
              @click=${(ev: Event) => c.openEntity(id, ev.currentTarget as Element)}
            >
              <span style="display:grid;place-items:center;width:40px;height:40px;border-radius:999px;background:${isActive(e) ? "var(--tone)" : "var(--surface-2)"};color:${isActive(e) ? "var(--on-tone)" : "var(--text-2)"};${toneStyle(e)}">
                <sn-icon .icon=${entityIcon(e, id)} style="--icon-size:20px"></sn-icon>
              </span>
              <span style="flex:1;font-weight:500">${entityName(c.hass, c.config, id)}</span>
              <span class="muted" style="font-size:14px;unicode-bidi:plaintext">${rolling(shortValue(c.t, e, c.lang))}</span>
            </button>`;
          })}
        </div>`;
      },
    });
  }

  // ---- heat map ----

  private get heatKey() {
    return `smartnest-heat-${this.widget.id}`;
  }

  /** Per-room average of the readings placed inside it, for one kind of map. */
  private roomValues(floor: Floor, mode: Exclude<MapMode, "off">): Map<string, number> {
    const out = new Map<string, number>();
    for (const r of floor.rooms ?? []) {
      const vals = floor.markers
        .filter((m) => inside([m.x, m.y], r.points))
        .map((m) => {
          const e = this.ctx.hass.states[m.entity];
          if (!e) return NaN;
          const cls = e.attributes.device_class;
          if (mode === "temp") return domainOf(m.entity) === "climate" ? Number(e.attributes.current_temperature) : cls === "temperature" ? Number(e.state) : NaN;
          if (mode === "humidity") return domainOf(m.entity) === "climate" ? Number(e.attributes.current_humidity) : cls === "humidity" ? Number(e.state) : NaN;
          return cls === "carbon_dioxide" ? Number(e.state) : NaN;
        })
        .filter((v) => !Number.isNaN(v));
      if (vals.length) out.set(r.id, vals.reduce((x, y) => x + y, 0) / vals.length);
    }
    return out;
  }

  /** Map modes this plan has readings for, in toggle order. */
  private mapModes(floor: Floor): Exclude<MapMode, "off">[] {
    if (!this.ctx.allows("heat_map")) return [];
    const modes: Exclude<MapMode, "off">[] = ["temp"];
    if (this.ctx.allows("air_maps")) modes.push("humidity", "co2");
    return modes.filter((m) => this.roomValues(floor, m).size > 0);
  }

  private static SCALES: Record<Exclude<MapMode, "off">, [number, [number, number, number]][]> = {
    // Cool blue → comfortable green → warm gold → hot coral.
    temp: [[17, [24, 188, 242]], [21.5, [47, 181, 122]], [25.5, [233, 151, 29]], [29, [242, 107, 104]]],
    // Dry gold → comfortable green → damp blue.
    humidity: [[25, [233, 151, 29]], [45, [47, 181, 122]], [70, [24, 188, 242]]],
    // Fresh green → stuffy gold → open-a-window coral.
    co2: [[450, [47, 181, 122]], [1000, [233, 151, 29]], [1500, [242, 107, 104]]],
  };

  private mapColor(mode: Exclude<MapMode, "off">, t: number): string {
    const stops = SnFloorplan.SCALES[mode];
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

  private renderHeat(floor: Floor, mode: Exclude<MapMode, "off">) {
    const vals = this.roomValues(floor, mode);
    const unit = mode === "temp" ? "°" : mode === "humidity" ? "%" : " ppm";
    return (floor.rooms ?? []).map((r) => {
      const v = vals.get(r.id);
      if (v === undefined) return nothing;
      const [cx, cy] = centroid(r.points);
      return html`<div class="heat" style="clip-path:${clipPath(r.points)};background-color:${this.mapColor(mode, v)};opacity:${this.ctx.dark ? 0.42 : 0.34}"></div>
        <span class="heat-label" style="left:${cx}%;top:${cy}%">${formatNumber(v, this.ctx.lang, mode === "temp" ? 1 : 0)}${unit}</span>`;
    });
  }

  // ---- family on the plan ----

  /**
   * Room-level presence (Bermuda, ESPresense…) reports a person's room as a sensor like
   * sensor.abu_mohammad_area = "Living room". When that matches a drawn room, their photo sits in it.
   */
  private renderPeople(floor: Floor) {
    if (!this.ctx.allows("people_on_plan") || !floor.rooms?.length) return nothing;
    const { hass } = this.ctx;
    const norm = (x: string) => x.trim().toLowerCase();
    const placed = new Map<string, number>();
    return Object.values(hass.states)
      .filter((p) => p.entity_id.startsWith("person.") && p.state === "home")
      .map((p) => {
        const slug = p.entity_id.split(".")[1];
        const room = Object.values(hass.states)
          .filter((e) => e.entity_id.startsWith("sensor.") && e.entity_id.includes(slug) && /_(area|room|location)$/.test(e.entity_id))
          .map((e) => floor.rooms!.find((r) => norm(r.name) === norm(e.state) || norm(hass.areas?.[e.state]?.name ?? "") === norm(r.name)))
          .find(Boolean);
        if (!room) return nothing;
        const n = placed.get(room.id) ?? 0;
        placed.set(room.id, n + 1);
        const [cx, cy] = centroid(room.points);
        const pic = p.attributes.entity_picture as string | undefined;
        return html`<span class="person" style="left:calc(${cx}% + ${n * 26 - 13}px);top:calc(${cy}% + 22px);${pic ? `background-image:url('${hass.hassUrl(pic)}')` : ""}" title=${p.attributes.friendly_name ?? ""}
          >${pic ? "" : (p.attributes.friendly_name ?? "?").slice(0, 1)}</span
        >`;
      });
  }

  /** Zooms the plan into a room, like the camera flying in, while its devices open. */
  private flyTo(room: Room): boolean {
    if (!this.ctx.allows("fly_to_room") || this.zoom.s > 1 || this.tilt || matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    const { w, h } = this.stageSize();
    const xs = room.points.map((p) => (p[0] / 100) * w);
    const ys = room.points.map((p) => (p[1] / 100) * h);
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    const s = Math.min(3, Math.max(1.2, Math.min(w / ((x1 - x0) * 1.4), h / ((y1 - y0) * 1.4))));
    this.settling = true;
    this.zoom = this.clampZoom({ s, x: w / 2 - ((x0 + x1) / 2) * s, y: h / 2 - ((y0 + y1) / 2) * s });
    return true;
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
    this.moved = 0;
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
    this.moved += Math.abs(e.movementX) + Math.abs(e.movementY);
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

  /**
   * One button for everything: traces the rooms off the plan, names them (AI Task when the house has one, else asks
   * the installer room by room), then puts every device in its room.
   */
  private async autoAdd() {
    const { ctx } = this;
    const { t, hass } = ctx;
    const floor = this.floor;
    if (!floor?.image || this.detecting) return;
    if (!Object.keys(hass.areas ?? {}).length) return ctx.toast(t("auto_need_areas"));
    this.detecting = true;
    let fresh: Room[];
    try {
      fresh = await this.findRooms(floor);
    } catch {
      return ctx.toast(t("detect_failed"));
    } finally {
      this.detecting = false;
    }
    if (!fresh.length && !floor.rooms?.length) return ctx.toast(t("detect_none"));
    // New rooms nobody could name (no AI, or it couldn't read them): ask what each one is.
    // Rooms skipped before, or named by the AI after a room HA doesn't have, aren't asked about.
    const unknown = fresh.filter((r, i) => r.name === t("room_default", { n: (floor.rooms?.length ?? 0) + i + 1 }) && !isAreaName(hass, r.name));
    if (unknown.length) {
      this.roomMode = true;
      this.selected = undefined;
      this.asking = unknown.map((r) => r.id);
      this.askTotal = unknown.length;
      this.selRoom = unknown[0].id;
      return;
    }
    this.placeAll();
  }

  private nextQuestion() {
    const rest = this.asking?.slice(1) ?? [];
    this.asking = rest.length ? rest : undefined;
    this.selRoom = rest[0];
    if (!rest.length) this.placeAll();
  }

  private async placeAll() {
    // Let the renamed rooms land in the draft first.
    await new Promise((r) => setTimeout(r));
    await this.updateComplete;
    const floor = this.floor;
    if (!floor) return;
    const placed = autoPlace(this.ctx.hass, floor);
    if (placed.length) this.edit((_f, fl) => fl && (fl.markers = [...fl.markers, ...placed]));
    this.roomMode = false;
    this.selRoom = undefined;
    const { t } = this.ctx;
    this.ctx.toast(placed.length ? t("detect_done_placed", { n: floor.rooms?.length ?? 0, m: placed.length }) : t("auto_nothing"));
  }

  /** Traces the rooms off the plan image and names them with AI Task when the house has one. Adds and returns them. */
  private async findRooms(floor: Floor): Promise<Room[]> {
    const { hass, t } = this.ctx;
    const existing = floor.rooms ?? [];
    const found = (await detectRooms(floor.image!)).filter((f) => !existing.some((r) => inside(f.center, r.points)));
    if (!found.length) return [];
    const rooms: Room[] = found.map((f, i) => ({ id: uid(), name: t("room_default", { n: existing.length + i + 1 }), points: f.points }));
    const ai = Object.keys(hass.states).find((id) => id.startsWith("ai_task."));
    if (ai)
      try {
        const res = await hass.callWS<{ rooms: { label: string; area: string; x: number; y: number }[] }>({
          type: "smartnest/plan/read_rooms",
          image: floor.image,
          entity_id: ai,
          areas: Object.values(hass.areas ?? {}).map((a) => a.name),
        });
        for (const l of res.rooms) {
          const p: Pt = [l.x, l.y];
          // The label's own room, else the nearest room centre: the model's positions are approximate.
          let j = found.findIndex((f) => inside(p, f.points));
          if (j < 0) {
            const d = found.map((f) => Math.hypot(f.center[0] - p[0], f.center[1] - p[1]));
            const k = d.indexOf(Math.min(...d));
            if (d[k] < 15) j = k;
          }
          if (j >= 0) rooms[j].name = l.area || l.label;
        }
      } catch {
        // No names, then: the installer is asked room by room.
      }
    this.edit((_f, fl) => fl && (fl.rooms = [...(fl.rooms ?? []), ...rooms]));
    return rooms;
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
    const radius = Math.max(120, stageW * 0.3);
    return (floor.rooms ?? []).map((room) => {
      const lights = floor.markers.filter((m) => domainOf(m.entity) === "light" && inside([m.x, m.y], room.points));
      const lit = lights.filter((m) => this.st(m.entity)?.state === "on");
      const layers = lit.map((m) => {
        const a = this.st(m.entity)!.attributes;
        const [r, g, b] = Array.isArray(a.rgb_color) ? a.rgb_color : [255, 196, 120];
        const level = typeof a.brightness === "number" ? a.brightness / 255 : 1;
        const alpha = (this.ctx.dark ? 0.35 : 0.22) + (this.ctx.dark ? 0.45 : 0.25) * level;
        return `radial-gradient(circle ${radius}px at ${m.x}% ${m.y}%, rgba(${r},${g},${b},${alpha.toFixed(2)}) 0%, rgba(${r},${g},${b},${(alpha * 0.45).toFixed(2)}) 45%, rgba(${r},${g},${b},${(alpha * 0.18).toFixed(2)}) 100%)`;
      });
      return html`<div
        class="glow ${lit.length ? "lit" : ""}"
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
    const areas = Object.values(this.ctx.hass.areas ?? {})
      .map((a) => a.name)
      .sort((a, b) => a.localeCompare(b));
    if (this.asking?.length && room) {
      const taken = new Set((this.floor?.rooms ?? []).map((r) => r.name));
      return html`<div class="tools glass" @pointerdown=${stop}>
        <span class="label">${t("which_room")} ${this.askTotal - this.asking.length + 1}/${this.askTotal}</span>
        <select
          aria-label=${t("which_room")}
          style="width:auto;min-height:40px"
          @change=${(e: any) => {
            const name = e.target.value;
            if (!name) return;
            this.edit((_f, fl) => {
              const r = fl?.rooms?.find((x) => x.id === room.id);
              if (r) r.name = name;
            });
            this.nextQuestion();
          }}
        >
          <option value="" selected>🏠 ${t("room_area")}</option>
          ${areas.filter((a) => !taken.has(a)).map((a) => html`<option value=${a}>🏠 ${a}</option>`)}
        </select>
        <button class="btn pressable" @click=${() => this.nextQuestion()}>${t("skip_room")}</button>
        <button class="btn pressable" @click=${() => ((this.asking = undefined), this.placeAll())}>${t("finish")}</button>
      </div>`;
    }
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
        ${areas.length
          ? html`<select
              aria-label=${t("room_area")}
              title=${t("room_area")}
              style="width:auto;min-height:40px"
              @change=${(e: any) =>
                e.target.value &&
                this.edit((_f, fl) => {
                  const r = fl?.rooms?.find((x) => x.id === room.id);
                  if (r) r.name = e.target.value;
                })}
            >
              <option value="" ?selected=${!areas.includes(room.name)}>🏠 ${t("room_area")}</option>
              ${areas.map((a) => html`<option value=${a} ?selected=${a === room.name}>🏠 ${a}</option>`)}
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
      ${this.floor?.rooms?.length ? nothing : html`<span class="hint">${t("rooms_hint")}</span>`}
      <button class="btn primary pressable" @click=${() => (this.drawing = [])}>
        <sn-icon icon="rooms" style="--icon-size:20px"></sn-icon>${t("draw_room")}
      </button>
      <button class="btn pressable" ?disabled=${this.detecting} @click=${() => this.autoAdd()}>
        <sn-icon icon="auto-fix" style="--icon-size:20px"></sn-icon>${t(this.detecting ? "detecting" : "detect_rooms")}
      </button>
      ${this.floor?.rooms?.length
        ? html`<button
            class="btn pressable"
            @click=${() => {
              const floor = this.floor!;
              const added = autoPlace(this.ctx.hass, floor);
              this.edit((_f, fl) => fl && (fl.markers = [...fl.markers, ...added]));
              this.ctx.toast(t("autofill_done", { n: added.length }));
            }}
          >
            <sn-icon icon="marker-plus" style="--icon-size:20px"></sn-icon>${t("autofill_rooms")}
          </button>`
        : nothing}
      <button class="btn pressable" @click=${() => (this.roomMode = false)}>${t("done")}</button>
    </div>`;
  }

  // ---- render ----

  private renderMarker(m: Marker) {
    const { ctx } = this;
    const e = this.st(m.entity);
    const on = isActive(e);
    const dragging = this.drag?.id === m.id;
    // A cleaning robot drives to the room it's in.
    const roving = !ctx.editing && domainOf(m.entity) === "vacuum" && this.floor && ctx.allows("robot_on_plan") ? this.robotRoom(this.floor, m.entity) : undefined;
    const [rx, ry] = roving ? centroid(roving.points) : [m.x, m.y];
    const x = dragging ? this.drag!.x : rx;
    const y = dragging ? this.drag!.y : ry;
    const motion = on && domainOf(m.entity) === "binary_sensor" && ["motion", "occupancy", "presence"].includes(e?.attributes.device_class);
    const cls = [
      "marker",
      on ? "on" : "",
      motion ? "pulse" : "",
      !e || e.state === "unavailable" ? "dim" : "",
      !on && !ctx.editing && ctx.dark && ctx.config.settings.night_plan && !this.selected ? "sleepy" : "",
      ctx.editing ? "editable" : "",
      dragging ? "dragging" : "",
      roving ? "roving" : "",
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
      ${ctx.allows("plan_fx") && !ctx.editing ? this.fx(e) : nothing}
      <span class="ic"><sn-icon class=${livingClass(e)} .icon=${entityIcon(e, m.entity)}></sn-icon></span>
      ${m.display === "value" ? html`<span class="val">${rolling(shortValue(ctx.t, e, ctx.lang))}</span>` : nothing}
      ${ctx.editing && this.selected === m.id && !dragging
        ? html`<span class="tag">${entityName(ctx.hass, ctx.config, m.entity)}</span>`
        : nothing}
    </div>`;
  }

  /** Every floor as a slab, one above the other; lit lights glow through. Tap one to go there. */
  private renderStack() {
    const floors = this.floors.filter((f) => f.image);
    const n = floors.length;
    return html`<div class="stack" @pointerdown=${(e: Event) => e.stopPropagation()}>
      ${floors.map(
        (f, i) => html`<button
          class="slab pressable"
          style="--i:${i};--n:${n};z-index:${n - i}"
          aria-label=${f.name}
          @click=${() => {
            this.floorIdx = this.floors.indexOf(f);
            this.natural = undefined;
            this.stack = false;
          }}
        >
          <span class="plate">
            <img src=${f.image} alt="" />
            ${f.markers
              .filter((m) => domainOf(m.entity) === "light" && this.ctx.hass.states[m.entity]?.state === "on")
              .map((m) => html`<i class="lit" style="left:${m.x}%;top:${m.y}%"></i>`)}
          </span>
        </button>`
      )}
      ${floors.map((f, i) => html`<span class="slab-tag" style="--i:${i};--n:${n}">${f.name}</span>`)}
    </div>`;
  }

  /** Where a cleaning robot is: its "current room" sensor matched to a drawn room. */
  private robotRoom(floor: Floor, vacuum: string): Room | undefined {
    const { hass } = this.ctx;
    if (hass.states[vacuum]?.state !== "cleaning" || !floor.rooms?.length) return undefined;
    const dev = hass.entities?.[vacuum]?.device_id;
    const sensor = Object.values(hass.entities ?? {}).find((r) => r.device_id && r.device_id === dev && r.entity_id.startsWith("sensor.") && /current_room|_room$/.test(r.entity_id));
    const v = sensor ? hass.states[sensor.entity_id]?.state : undefined;
    if (!v) return undefined;
    const norm = (x: string) => x.trim().toLowerCase();
    const area = hass.areas?.[v]?.name;
    return floor.rooms.find((r) => norm(r.name) === norm(v) || (area && norm(r.name) === norm(area)) || r.robot_room === v);
  }

  private get cleanedKey() {
    return `smartnest-cleaned-${this.widget.id}-${new Date().toDateString()}`;
  }

  /** The plan comes alive: an open door swings, blinds sit where they are, the AC blows, a leak ripples, music plays. */
  private fx(e: HassEntity | undefined) {
    if (!e) return nothing;
    const d = domainOf(e.entity_id);
    const cls = e.attributes.device_class;
    if (d === "binary_sensor" && ["door", "window", "opening", "garage_door"].includes(cls) && e.state === "on")
      return html`<span class="fx fx-door" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M4 36 L4 4 A32 32 0 0 1 36 36" /></svg></span>`;
    if (d === "binary_sensor" && cls === "moisture" && e.state === "on")
      return html`<span class="fx fx-ripple" aria-hidden="true"><i></i><i></i><i></i></span>`;
    if (d === "cover" && typeof e.attributes.current_position === "number")
      return html`<span class="fx fx-shade" aria-hidden="true" style="--shut:${(100 - e.attributes.current_position) / 100}"></span>`;
    if (d === "climate" && e.state !== "off" && e.state !== "unavailable") {
      const hot = e.state === "heat" || e.attributes.hvac_action === "heating";
      return html`<span class="fx fx-air ${hot ? "hot" : ""}" aria-hidden="true"><i></i><i></i><i></i></span>`;
    }
    if (d === "media_player" && e.state === "playing") return html`<span class="fx fx-notes" aria-hidden="true"><i>♪</i><i>♫</i><i>♪</i></span>`;
    return nothing;
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
      <button class="btn pressable" ?disabled=${!floor?.image || this.detecting} @click=${() => this.autoAdd()}>
        <sn-icon icon="auto-fix" style="--icon-size:20px"></sn-icon>${t(this.detecting ? "detecting" : "auto_add")}
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
    const modes = floor ? this.mapModes(floor) : [];
    const mode = modes.includes(this.heat as Exclude<MapMode, "off">) ? (this.heat as Exclude<MapMode, "off">) : undefined;
    const tilt = this.tilt && ctx.allows("plan_3d") && !ctx.editing && this.zoom.s === 1;
    const save = () => {
      try {
        localStorage.setItem(this.heatKey, this.heat);
        localStorage.setItem(`${this.heatKey}-3d`, this.tilt ? "1" : "0");
      } catch {
        /* per-device preference */
      }
    };
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
      ${floor?.image && !ctx.editing && (modes.length || ctx.allows("plan_3d") || ctx.allows("plan_replay"))
        ? html`<div class="corner-btns" @pointerdown=${(e: Event) => e.stopPropagation()}>
            ${modes.length
              ? html`<button
                  class="pressable"
                  aria-pressed=${!!mode}
                  aria-label=${t("heat_map")}
                  title=${mode ? t(mode === "temp" ? "map_temp" : mode === "humidity" ? "map_humidity" : "map_co2") : t("heat_map")}
                  @click=${() => {
                    // off → temperature → humidity → CO₂ → off, skipping maps this house has no sensors for.
                    const order: MapMode[] = ["off", ...modes];
                    this.heat = order[(order.indexOf(mode ?? "off") + 1) % order.length];
                    save();
                  }}
                >
                  <sn-icon icon=${mode === "humidity" ? "humidity" : mode === "co2" ? "co2" : "thermometer"}></sn-icon>
                </button>`
              : nothing}
            ${ctx.allows("floor_stack") && floors.filter((f) => f.image).length > 1
              ? html`<button class="pressable" aria-pressed=${this.stack} aria-label=${t("all_floors")} title=${t("all_floors")} @click=${() => (this.stack = !this.stack)}>
                  <sn-icon icon="floors"></sn-icon>
                </button>`
              : nothing}
            ${ctx.allows("plan_replay") && floor.markers.length
              ? html`<button class="pressable" aria-pressed=${!!this.replay} aria-label=${t("replay")} title=${t("replay")} @click=${() => (this.replay ? this.stopReplay() : this.startReplay())}>
                  <sn-icon icon="history"></sn-icon>
                </button>`
              : nothing}
            ${ctx.allows("plan_3d")
              ? html`<button
                  class="pressable"
                  aria-pressed=${this.tilt}
                  aria-label=${t("plan_3d")}
                  title=${t("plan_3d")}
                  @click=${() => {
                    this.tilt = !this.tilt;
                    this.zoom = { s: 1, x: 0, y: 0 };
                    save();
                  }}
                >
                  <sn-icon icon="cube"></sn-icon>
                </button>`
              : nothing}
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
        ${this.stack && !ctx.editing
          ? this.renderStack()
          : floor?.image
          ? html`<div
              class="stage ${this.roomMode ? "room-mode" : ""} ${this.drawing ? "drawing" : ""} ${this.settling ? "settle" : ""} ${tilt ? "tilt" : ""}"
              style="width:${stage.w}px;height:${stage.h}px;transform:${tilt
                ? "perspective(1400px) rotateX(40deg) scale(0.86)"
                : `translate(${this.zoom.x}px, ${this.zoom.y}px) scale(${this.zoom.s})`};--inv:${1 / this.zoom.s}"
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
              ${mode && !ctx.editing ? this.renderHeat(floor, mode) : ctx.allows("room_glow") ? this.renderGlow(floor, stage.w) : nothing}
              ${!ctx.editing && floor.rooms?.length
                ? html`<svg class="hit" viewBox="0 0 100 100" preserveAspectRatio="none">
                    ${floor.rooms.map((r) => svg`<polygon points=${r.points.map((p) => p.join(",")).join(" ")} @click=${() => this.roomSheet(r)}></polygon>`)}
                  </svg>`
                : nothing}
              ${!ctx.editing && ctx.allows("robot_on_plan") ? this.renderCleaned(floor) : nothing}
              ${floor.markers.map((m) => this.renderMarker(m))} ${ctx.editing ? nothing : this.renderPeople(floor)}
              ${ctx.editing && this.roomMode ? this.renderRoomEditor(floor) : nothing}
            </div>`
          : html`<div class="empty">
              <sn-icon icon="image"></sn-icon>
              <strong>${t("no_plan")}</strong>
              ${ctx.isAdmin && !ctx.editing ? html`<span>${t("no_plan_admin")}</span>` : nothing}
            </div>`}
      </div>
      ${ctx.editing && floor ? this.renderTools() : nothing}
      ${this.replay && !ctx.editing ? this.renderReplay() : nothing}
    </div>`;
  }
}
