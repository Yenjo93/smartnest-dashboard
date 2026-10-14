import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./icon";
import { haptic } from "./haptic";

/**
 * The tall pill slider from Control Centre. Drag anywhere on it; the value is committed on release,
 * so the device gets one command instead of fifty. Arrow keys step by 10.
 */
@customElement("sn-vslider")
export class SnVSlider extends LitElement {
  @property({ type: Number }) value = 0; // 0..100
  @property() label = "";
  @property() icon = "";
  /** Colour of the filled part. */
  @property() fill = "var(--accent)";
  /** Colour for the icon sitting on the fill. */
  @property() onFill = "var(--on-accent)";
  /** CSS background for the whole track; when set, the slider shows a thumb line instead of a fill. */
  @property() track = "";
  /** Text shown at the top; defaults to the percentage. */
  @property() display?: string;
  @property({ type: Boolean, reflect: true }) small = false;
  @property({ attribute: false }) onCommit?: (value: number) => void;
  @property({ attribute: false }) onPreview?: (value: number | undefined) => void;
  @state() private drag?: number;

  static styles = css`
    :host {
      display: block;
      width: 120px;
      height: 300px;
      max-height: 42vh;
    }
    :host([small]) {
      width: 72px;
    }
    .track {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 34px;
      background: var(--surface-2);
      overflow: hidden;
      touch-action: none;
      cursor: ns-resize;
      outline: none;
      transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    :host([small]) .track {
      border-radius: 24px;
    }
    .track:focus-visible {
      box-shadow: 0 0 0 3px var(--accent);
    }
    .track.dragging {
      transform: scaleX(1.04);
    }
    /* Only transforms move while dragging: drawn by the GPU, no layout, smooth at 120 Hz. */
    .fill {
      position: absolute;
      inset: 0;
      transform-origin: bottom;
      will-change: transform;
      transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1), background-color 400ms;
    }
    .rail {
      position: absolute;
      inset: 0;
      will-change: transform;
      transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .dragging .fill,
    .dragging .rail {
      transition: none;
    }
    .thumb {
      position: absolute;
      top: -3px;
      left: 14px;
      right: 14px;
      height: 6px;
      border-radius: 3px;
      background: #fff;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
    }
    .val {
      position: absolute;
      top: 16px;
      left: 0;
      right: 0;
      text-align: center;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      direction: ltr;
      color: var(--text);
      pointer-events: none;
    }
    .val.on-track {
      color: #fff;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }
    sn-icon {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      --icon-size: 30px;
      pointer-events: none;
    }
  `;

  /** How far past either end the finger went (0..1), for the rubber-band stretch. */
  @state() private over = 0;

  private rect?: DOMRect;
  private frame = 0;
  private next?: number;

  /** Moves come faster than the screen draws: keep the last one and apply it once per frame. */
  private moveTo(v: number) {
    this.next = v;
    if (!this.frame)
      this.frame = requestAnimationFrame(() => {
        this.frame = 0;
        if (this.drag !== undefined && this.next !== undefined) this.set(this.next);
      });
  }

  private from(e: PointerEvent) {
    const r = this.rect ?? (e.currentTarget as HTMLElement).getBoundingClientRect();
    const raw = (r.bottom - e.clientY) / r.height;
    this.over = raw > 1 ? Math.min(1, (raw - 1) * 2) : raw < 0 ? -Math.min(1, -raw * 2) : 0;
    return Math.round(Math.min(1, Math.max(0, raw)) * 100);
  }

  private set(v: number | undefined) {
    // A light tick every 10%, like a physical detent.
    if (v !== undefined && this.drag !== undefined && Math.floor(v / 10) !== Math.floor(this.drag / 10)) haptic("tick");
    this.drag = v;
    this.onPreview?.(v);
  }

  /** On release the pill settles with a little spring. */
  private settle(track: HTMLElement) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const o = this.over;
    this.over = 0;
    track.animate(
      [
        { transform: `scale(1.04, ${1 + Math.abs(o) * 0.05})` },
        { transform: "scale(0.985, 0.99)", offset: 0.45 },
        { transform: "scale(1.006, 1.004)", offset: 0.75 },
        { transform: "none" },
      ],
      { duration: 520, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
    );
  }

  render() {
    const v = this.drag ?? this.value;
    const text = this.drag === undefined && this.display !== undefined ? this.display : `${v}%`;
    const thumbMode = !!this.track;
    const iconOnFill = !thumbMode && v > 12;
    return html`<div
      class="track ${this.drag !== undefined ? "dragging" : ""}"
      style="${thumbMode ? `background:${this.track};` : ""}${this.drag !== undefined && this.over
        ? `transform:scale(1.04, ${1 + Math.abs(this.over) * 0.05});transform-origin:${this.over > 0 ? "bottom" : "top"}`
        : ""}"
      role="slider"
      tabindex="0"
      aria-label=${this.label}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow=${v}
      @pointerdown=${(e: PointerEvent) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        this.rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        this.set(this.from(e));
      }}
      @pointermove=${(e: PointerEvent) => this.drag !== undefined && this.moveTo(this.from(e))}
      @pointerup=${(e: PointerEvent) => {
        cancelAnimationFrame(this.frame);
        this.frame = 0;
        if (this.drag !== undefined) this.drag = this.from(e);
        this.rect = undefined;
        const val = this.drag;
        this.settle(e.currentTarget as HTMLElement);
        this.set(undefined);
        if (val !== undefined) this.onCommit?.(val);
      }}
      @pointercancel=${() => ((this.rect = undefined), this.set(undefined))}
      @keydown=${(e: KeyboardEvent) => {
        const step = e.key === "ArrowUp" ? 10 : e.key === "ArrowDown" ? -10 : 0;
        if (!step) return;
        e.preventDefault();
        this.onCommit?.(Math.min(100, Math.max(0, this.value + step)));
      }}
    >
      ${thumbMode
        ? html`<div class="rail" style="transform:translateY(${100 - v}%)"><div class="thumb"></div></div>`
        : html`<div class="fill" style="transform:scaleY(${v / 100});background:${this.fill}"></div>`}
      <span class="val ${thumbMode ? "on-track" : ""}">${text}</span>
      ${this.icon
        ? html`<sn-icon .icon=${this.icon} style="color:${iconOnFill ? this.onFill : thumbMode ? "#fff" : "var(--text-2)"}"></sn-icon>`
        : nothing}
    </div>`;
  }
}
