import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { haptic } from "./haptic";
import { spring } from "./spring";
import "./icon";

/**
 * Slide to confirm, like "slide to unlock": a knob dragged all the way across. A brush or a pocket tap can't do it,
 * and there's no second tap to wait for. Lets go early and the knob springs back.
 */
@customElement("sn-slide-confirm")
export class SnSlideConfirm extends LitElement {
  @property() label = "";
  @property() icon = "lock-open";
  /** Colour of the knob and the trail. */
  @property() tone = "var(--accent)";
  @property({ attribute: false }) onConfirm!: () => void;
  @state() private x = 0;
  private drag?: { id: number; from: number; max: number; last: number; t: number; v: number };

  static styles = css`
    :host {
      display: block;
    }
    .track {
      position: relative;
      height: 60px;
      border-radius: 999px;
      background: var(--surface-2);
      overflow: hidden;
      touch-action: none;
      user-select: none;
      direction: ltr;
    }
    .trail {
      position: absolute;
      inset: 0 auto 0 0;
      border-radius: 999px;
      background: color-mix(in srgb, var(--tone) 30%, transparent);
    }
    .label {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      font: 600 16px var(--font);
      color: var(--text-2);
      padding-inline-start: 40px;
      background: linear-gradient(90deg, var(--text-2) 0%, var(--text) 50%, var(--text-2) 100%) 0 0 / 200% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 2.4s linear infinite;
      pointer-events: none;
    }
    .knob {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--tone);
      color: #fff;
      display: grid;
      place-items: center;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
      cursor: grab;
      --icon-size: 24px;
    }
    @keyframes shimmer {
      to {
        background-position: -200% 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .label {
        animation: none;
      }
    }
  `;

  private down = (e: PointerEvent) => {
    const track = this.renderRoot.querySelector<HTMLElement>(".track")!;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* gone */
    }
    this.drag = { id: e.pointerId, from: e.clientX - this.x, max: track.clientWidth - 60, last: e.clientX, t: performance.now(), v: 0 };
    haptic("tap");
  };

  private move = (e: PointerEvent) => {
    const d = this.drag;
    if (!d || e.pointerId !== d.id) return;
    const now = performance.now();
    d.v = (e.clientX - d.last) / Math.max(1, now - d.t);
    d.last = e.clientX;
    d.t = now;
    const x = Math.max(0, Math.min(d.max, e.clientX - d.from));
    if (Math.floor(x / 40) !== Math.floor(this.x / 40)) haptic("tick");
    this.x = x;
  };

  private up = () => {
    const d = this.drag;
    this.drag = undefined;
    if (!d) return;
    if (this.x >= d.max * 0.92) {
      this.x = d.max;
      haptic("success");
      this.onConfirm?.();
      return;
    }
    // Not far enough: back to the start on a spring.
    const knob = this.renderRoot.querySelector<HTMLElement>(".knob")!;
    const from = this.x;
    this.x = 0;
    const { frames, duration } = spring(from, 0, Math.min(0, d.v), (v) => ({ transform: `translateX(${v}px)` }));
    knob.animate(frames, { duration });
  };

  render() {
    return html`<div class="track" style="--tone:${this.tone}">
      <div class="trail" style="width:${this.x + 60}px"></div>
      <span class="label">${this.label}</span>
      <div
        class="knob"
        role="slider"
        aria-label=${this.label}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${Math.round((this.x / ((this.drag?.max ?? 1) || 1)) * 100)}
        tabindex="0"
        style="transform:translateX(${this.x}px)"
        @pointerdown=${this.down}
        @pointermove=${this.move}
        @pointerup=${this.up}
        @pointercancel=${this.up}
        @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this.onConfirm?.()}
      >
        <sn-icon .icon=${this.icon}></sn-icon>
      </div>
    </div>`;
  }
}
