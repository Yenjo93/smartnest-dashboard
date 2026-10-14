import { LitElement, css, html, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { haptic } from "./haptic";

const START = 135; // degrees, the arc opens at the bottom
const SWEEP = 270;

/**
 * A round thermostat, like Nest: turn it with a finger around the ring. Each half degree clicks (a tiny vibration),
 * the ring glows blue for cooling and orange for heating, and the new target is sent when you let go.
 */
@customElement("sn-dial")
export class SnDial extends LitElement {
  @property({ type: Number }) value = 22;
  @property({ type: Number }) min = 16;
  @property({ type: Number }) max = 30;
  @property({ type: Number }) step = 0.5;
  /** Current room temperature, drawn as a small tick on the ring. */
  @property({ type: Number }) current?: number;
  @property() mode: "cool" | "heat" | "off" | "auto" = "cool";
  @property() label = "";
  @property({ attribute: false }) onCommit?: (v: number) => void;
  @state() private drag?: number;

  static styles = css`
    :host {
      display: block;
      width: min(300px, 70vw);
      aspect-ratio: 1;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }
    .wrap {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      cursor: grab;
      outline: none;
    }
    .wrap:focus-visible {
      box-shadow: 0 0 0 3px var(--accent);
    }
    .face {
      position: absolute;
      inset: 14%;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 25%, color-mix(in srgb, var(--surface-solid) 85%, white), var(--surface-solid) 60%);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.35), inset 0 2px 0 rgba(255, 255, 255, 0.35), 0 0 60px -10px var(--glow);
      display: grid;
      place-content: center;
      text-align: center;
      transition: box-shadow 600ms;
    }
    .t {
      font-size: clamp(44px, 16cqi, 64px);
      font-weight: var(--display-weight, 700);
      letter-spacing: var(--display-track, 0);
      line-height: 1;
      direction: ltr;
      color: var(--text);
    }
    .t small {
      font-size: 0.4em;
      vertical-align: top;
      margin-left: 2px;
    }
    .sub {
      margin-top: 6px;
      font-size: 13px;
      color: var(--text-2);
    }
    svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .knob {
      transition: transform 120ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .wrap {
      container-type: inline-size;
    }
  `;

  private angleOf(v: number) {
    return START + ((v - this.min) / (this.max - this.min)) * SWEEP;
  }

  private point(deg: number, r: number) {
    const a = (deg * Math.PI) / 180;
    return [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
  }

  private arc(from: number, to: number, r: number) {
    const [x1, y1] = this.point(from, r);
    const [x2, y2] = this.point(to, r);
    const large = to - from > 180 ? 1 : 0;
    return `M${x1} ${y1} A${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  }

  /** Finger position to a target, snapped to the step, ignoring the gap at the bottom. */
  private rect?: DOMRect;

  private fromPointer(e: PointerEvent) {
    // Measured once per drag: reading the layout on every move makes the browser stop and recalculate.
    const r = this.rect ?? (e.currentTarget as HTMLElement).getBoundingClientRect();
    let deg = (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
    deg = (deg + 360) % 360;
    let rel = (deg - START + 360) % 360;
    if (rel > SWEEP) rel = rel - SWEEP < (360 - SWEEP) / 2 ? SWEEP : 0;
    const raw = this.min + (rel / SWEEP) * (this.max - this.min);
    return Math.min(this.max, Math.max(this.min, Math.round(raw / this.step) * this.step));
  }

  private set(v: number) {
    if (v === this.drag) return; // stepped: most moves don't change the value, so nothing to redraw
    if (this.drag !== undefined) haptic("tick");
    this.drag = v;
  }

  render() {
    const v = this.drag ?? this.value;
    const color = this.mode === "heat" ? "#ff8a3d" : this.mode === "off" ? "var(--text-2)" : this.mode === "auto" ? "#2bb673" : "#3a9bff";
    const end = this.angleOf(v);
    const [kx, ky] = this.point(end, 43);
    const ticks = [];
    for (let i = 0; i <= 54; i++) {
      const deg = START + (i / 54) * SWEEP;
      const [x1, y1] = this.point(deg, 47.5);
      const [x2, y2] = this.point(deg, i % 9 === 0 ? 45 : 46.3);
      ticks.push(svg`<line x1=${x1} y1=${y1} x2=${x2} y2=${y2} stroke="var(--text-2)" stroke-opacity=${deg <= end ? 0.9 : 0.3} stroke-width=".5"></line>`);
    }
    const cur = this.current !== undefined && this.current >= this.min && this.current <= this.max ? this.point(this.angleOf(this.current), 43) : undefined;
    return html`<div
      class="wrap"
      role="slider"
      tabindex="0"
      aria-label=${this.label}
      aria-valuemin=${this.min}
      aria-valuemax=${this.max}
      aria-valuenow=${v}
      style="--glow:${color}"
      @pointerdown=${(e: PointerEvent) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        this.rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        this.drag = this.fromPointer(e);
      }}
      @pointermove=${(e: PointerEvent) => this.drag !== undefined && this.set(this.fromPointer(e))}
      @pointerup=${() => {
        this.rect = undefined;
        if (this.drag !== undefined && this.drag !== this.value) this.onCommit?.(this.drag);
        this.drag = undefined;
      }}
      @pointercancel=${() => ((this.rect = undefined), (this.drag = undefined))}
      @keydown=${(e: KeyboardEvent) => {
        const d = e.key === "ArrowUp" || e.key === "ArrowRight" ? this.step : e.key === "ArrowDown" || e.key === "ArrowLeft" ? -this.step : 0;
        if (!d) return;
        e.preventDefault();
        this.onCommit?.(Math.min(this.max, Math.max(this.min, this.value + d)));
      }}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true">
        ${ticks}
        ${svg`<path d=${this.arc(START, START + SWEEP, 43)} fill="none" stroke="var(--surface-2)" stroke-width="5" stroke-linecap="round"></path>
        <path d=${this.arc(START, Math.max(START + 0.5, end), 43)} fill="none" stroke=${color} stroke-width="5" stroke-linecap="round" style="filter:drop-shadow(0 0 3px ${color})"></path>
        ${cur ? svg`<circle cx=${cur[0]} cy=${cur[1]} r="1.4" fill="var(--text)"></circle>` : ""}
        <g class="knob"><circle cx=${kx} cy=${ky} r="4.2" fill="#fff" stroke=${color} stroke-width="1.6" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.35))"></circle></g>`}
      </svg>
      <div class="face">
        <div class="t">${v.toFixed(this.step < 1 ? 1 : 0)}<small>°</small></div>
        <div class="sub">${this.label}</div>
      </div>
    </div>`;
  }
}
