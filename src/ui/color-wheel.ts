import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { hsToRgb, rgbCss } from "../color";

/** Hue around the rim, saturation from white in the centre. Picks on release, previews while dragging. */
@customElement("sn-color-wheel")
export class SnColorWheel extends LitElement {
  @property({ type: Array }) hs?: [number, number];
  @property({ attribute: false }) onPick?: (hs: [number, number]) => void;
  @state() private drag?: [number, number];

  static styles = css`
    :host {
      display: block;
      width: 240px;
      max-width: 70vw;
      aspect-ratio: 1;
    }
    .wheel {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      /* Conic hue ring, faded to white toward the middle. */
      background: radial-gradient(circle closest-side, #fff 0%, rgba(255, 255, 255, 0) 100%),
        conic-gradient(from 90deg, red, magenta, blue, cyan, lime, yellow, red);
      touch-action: none;
      cursor: crosshair;
      box-shadow: 0 0 0 1px var(--border), var(--shadow);
      direction: ltr;
    }
    .knob {
      position: absolute;
      width: 34px;
      height: 34px;
      margin: -17px 0 0 -17px;
      border-radius: 50%;
      border: 4px solid #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
      pointer-events: none;
      transition: left 160ms cubic-bezier(0.22, 1, 0.36, 1), top 160ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .dragging .knob {
      transition: none;
      transform: scale(1.15);
    }
  `;

  private from(e: PointerEvent): [number, number] {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    // conic-gradient "from 90deg" puts red at the right edge, going clockwise to magenta below.
    // Screen y grows downward, so atan2 already runs clockwise; mirror it to match the gradient order.
    let hue = (Math.atan2(y, x) * 180) / Math.PI;
    hue = (360 - hue) % 360;
    const sat = Math.min(100, (Math.hypot(x, y) / (r.width / 2)) * 100);
    return [Math.round(hue), Math.round(sat)];
  }

  render() {
    const [h, s] = this.drag ?? this.hs ?? [0, 0];
    const rad = (-h * Math.PI) / 180;
    const left = 50 + (Math.cos(rad) * s) / 2;
    const top = 50 + (Math.sin(rad) * s) / 2;
    return html`<div
      class="wheel ${this.drag ? "dragging" : ""}"
      role="slider"
      aria-label="color"
      aria-valuenow=${h}
      @pointerdown=${(e: PointerEvent) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        this.drag = this.from(e);
      }}
      @pointermove=${(e: PointerEvent) => this.drag && (this.drag = this.from(e))}
      @pointerup=${() => {
        const v = this.drag;
        this.drag = undefined;
        if (v) this.onPick?.(v);
      }}
      @pointercancel=${() => (this.drag = undefined)}
    >
      <div class="knob" style="left:${left}%;top:${top}%;background:${rgbCss(hsToRgb(h, s))}"></div>
    </div>`;
  }
}
