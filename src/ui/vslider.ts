import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./icon";

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
    .fill {
      position: absolute;
      inset: auto 0 0 0;
      transition: height 160ms cubic-bezier(0.22, 1, 0.36, 1), background-color 400ms;
    }
    .dragging .fill,
    .dragging .thumb {
      transition: none;
    }
    .thumb {
      position: absolute;
      left: 14px;
      right: 14px;
      height: 6px;
      margin-bottom: -3px;
      border-radius: 3px;
      background: #fff;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
      transition: bottom 160ms cubic-bezier(0.22, 1, 0.36, 1);
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

  private from(e: PointerEvent) {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    return Math.round(Math.min(1, Math.max(0, (r.bottom - e.clientY) / r.height)) * 100);
  }

  private set(v: number | undefined) {
    this.drag = v;
    this.onPreview?.(v);
  }

  render() {
    const v = this.drag ?? this.value;
    const text = this.drag === undefined && this.display !== undefined ? this.display : `${v}%`;
    const thumbMode = !!this.track;
    const iconOnFill = !thumbMode && v > 12;
    return html`<div
      class="track ${this.drag !== undefined ? "dragging" : ""}"
      style=${thumbMode ? `background:${this.track}` : ""}
      role="slider"
      tabindex="0"
      aria-label=${this.label}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow=${v}
      @pointerdown=${(e: PointerEvent) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        this.set(this.from(e));
      }}
      @pointermove=${(e: PointerEvent) => this.drag !== undefined && this.set(this.from(e))}
      @pointerup=${() => {
        const val = this.drag;
        this.set(undefined);
        if (val !== undefined) this.onCommit?.(val);
      }}
      @pointercancel=${() => this.set(undefined)}
      @keydown=${(e: KeyboardEvent) => {
        const step = e.key === "ArrowUp" ? 10 : e.key === "ArrowDown" ? -10 : 0;
        if (!step) return;
        e.preventDefault();
        this.onCommit?.(Math.min(100, Math.max(0, this.value + step)));
      }}
    >
      ${thumbMode
        ? html`<div class="thumb" style="bottom:${v}%"></div>`
        : html`<div class="fill" style="height:${v}%;background:${this.fill}"></div>`}
      <span class="val ${thumbMode ? "on-track" : ""}">${text}</span>
      ${this.icon
        ? html`<sn-icon .icon=${this.icon} style="color:${iconOnFill ? this.onFill : thumbMode ? "#fff" : "var(--text-2)"}"></sn-icon>`
        : nothing}
    </div>`;
  }
}
