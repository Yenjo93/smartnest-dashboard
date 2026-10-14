import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * When it rains outside, a few drops sit on the screen's glass: most stay put, some gather and run down slowly.
 * Over everything but very faint, and only transforms move (the GPU), so it costs next to nothing.
 */
@customElement("sn-rainglass")
export class SnRainGlass extends LitElement {
  /** heavier when pouring */
  @property({ type: Boolean }) heavy = false;

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      z-index: 3;
      pointer-events: none;
      overflow: hidden;
    }
    i {
      position: absolute;
      border-radius: 50% 50% 48% 52% / 56% 56% 44% 44%;
      /* A drop bends the light: bright rim at the bottom, a highlight at the top, clear in between. */
      background: radial-gradient(circle at 34% 28%, rgba(255, 255, 255, 0.9) 0 9%, rgba(255, 255, 255, 0.25) 16%, transparent 26%),
        radial-gradient(circle at 50% 78%, rgba(255, 255, 255, 0.35) 0 18%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.06) 0 58%, rgba(0, 0, 0, 0.28) 70%, transparent 74%);
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.18);
      opacity: 0.85;
    }
    i.run {
      animation: run linear infinite;
      animation-play-state: var(--loops, running);
    }
    i.run::after {
      content: "";
      position: absolute;
      left: 30%;
      right: 30%;
      bottom: 90%;
      height: 160%;
      border-radius: 999px;
      background: linear-gradient(transparent, rgba(255, 255, 255, 0.12));
    }
    @keyframes run {
      0%,
      55% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(110vh);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      i.run {
        animation: none;
      }
    }
  `;

  render() {
    const n = this.heavy ? 38 : 24;
    return html`${Array.from({ length: n }, (_, k) => {
      // Fixed pseudo-random spots, so the drops don't jump around on every redraw.
      const r = (s: number) => ((Math.sin(k * 12.9898 + s * 78.233) * 43758.5453) % 1 + 1) % 1;
      const size = 8 + r(1) * (this.heavy ? 18 : 14);
      const runs = r(2) > 0.7;
      return html`<i
        class=${runs ? "run" : ""}
        style="left:${(r(3) * 100).toFixed(2)}%;top:${(r(4) * 100).toFixed(2)}%;width:${size.toFixed(1)}px;height:${(size * 1.08).toFixed(1)}px;${runs
          ? `animation-duration:${(14 + r(5) * 16).toFixed(1)}s;animation-delay:-${(r(6) * 20).toFixed(1)}s`
          : ""}"
      ></i>`;
    })}`;
  }
}
