import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Occasion } from "./look";

/**
 * The calendar's big days dress the top of the dashboard: lanterns and a crescent through Ramadan, a greeting and
 * stars for the Eids, a string of lights at Christmas, sparkles at New Year. Light, at the top edge, out of the way.
 */
@customElement("sn-occasion")
export class SnOccasion extends LitElement {
  @property() kind: Occasion = "ramadan";
  @property() greeting = "";

  static styles = css`
    /* Hangs from the bottom edge of the header. */
    :host {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      height: 0;
      z-index: 4;
      pointer-events: none;
    }
    .lantern {
      position: absolute;
      top: 0;
      transform-origin: top center;
      animation: sway 5s ease-in-out infinite alternate;
      animation-play-state: var(--loops, running);
      filter: drop-shadow(0 6px 14px rgba(255, 180, 70, 0.55));
    }
    .lantern:nth-of-type(2) {
      animation-delay: -1.7s;
      animation-duration: 6s;
    }
    .lantern:nth-of-type(3) {
      animation-delay: -3.1s;
      animation-duration: 5.5s;
    }
    .greet {
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
      padding: 4px 14px;
      border-radius: 999px;
      font: 700 13px var(--font);
      color: #fff6df;
      background: linear-gradient(90deg, #b8792a, #e9b04f, #b8792a);
      box-shadow: 0 4px 14px rgba(185, 120, 40, 0.45);
      white-space: nowrap;
    }
    .lights {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 34px;
    }
    .bulb {
      animation: twinkle 2.4s ease-in-out infinite alternate;
      animation-play-state: var(--loops, running);
    }
    .spark {
      position: absolute;
      top: 8px;
      font-size: 16px;
      animation: twinkle 1.8s ease-in-out infinite alternate;
      animation-play-state: var(--loops, running);
    }
    @keyframes sway {
      from {
        transform: rotate(-4deg);
      }
      to {
        transform: rotate(4deg);
      }
    }
    @keyframes twinkle {
      from {
        opacity: 0.35;
      }
      to {
        opacity: 1;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .lantern,
      .bulb,
      .spark {
        animation: none;
      }
    }
  `;

  private lantern(x: string, len: number, size: number) {
    return html`<svg class="lantern" style="left:${x};width:${size}px;height:${len + size * 1.6}px" viewBox="0 0 40 ${len + 64}" aria-hidden="true">
      ${svg`<line x1="20" y1="0" x2="20" y2=${len} stroke="#c99a45" stroke-width="1.2"></line>
      <path d="M14 ${len} h12 l3 6 h-18z" fill="#c99a45"></path>
      <path d="M11 ${len + 6} h18 q6 18 0 36 h-18 q-6 -18 0 -36z" fill="#f4c04f" opacity=".95"></path>
      <path d="M15 ${len + 10} v28 M20 ${len + 8} v32 M25 ${len + 10} v28" stroke="#b07a25" stroke-width="1.4"></path>
      <path d="M13 ${len + 42} h14 l-3 6 h-8z" fill="#c99a45"></path>
      <circle cx="20" cy=${len + 24} r="5" fill="#fff3c4" opacity=".9"></circle>`}
    </svg>`;
  }

  render() {
    switch (this.kind) {
      case "ramadan":
        return html`${this.lantern("6%", 30, 30)} ${this.lantern("14%", 60, 24)} ${this.lantern("90%", 44, 28)}
          <svg style="position:absolute;top:10px;right:20%;width:30px;height:30px" viewBox="0 0 24 24" aria-hidden="true">
            ${svg`<path d="M15 3a9 9 0 1 0 6 15.5A7.5 7.5 0 1 1 15 3z" fill="#f4c04f"></path>`}
          </svg>
          ${this.greeting ? html`<span class="greet">${this.greeting}</span>` : nothing}`;
      case "eid_fitr":
      case "eid_adha":
        return html`${this.lantern("8%", 36, 26)} ${this.lantern("88%", 36, 26)}
          ${[22, 34, 66, 78].map((x, i) => html`<span class="spark" style="left:${x}%;animation-delay:-${i * 0.4}s">✨</span>`)}
          ${this.greeting ? html`<span class="greet">${this.greeting}</span>` : nothing}`;
      case "christmas": {
        const colors = ["#ff5a5a", "#ffd34d", "#4dd27a", "#58a8ff"];
        return html`<svg class="lights" viewBox="0 0 1000 34" preserveAspectRatio="none" aria-hidden="true">
            ${svg`<path d="M0 6 Q 62 26 125 6 T 250 6 T 375 6 T 500 6 T 625 6 T 750 6 T 875 6 T 1000 6" fill="none" stroke="#2b3a2f" stroke-width="1.5"></path>`}
            ${Array.from({ length: 24 }, (_, i) => {
              const x = 20 + i * 41;
              const y = 6 + Math.abs(Math.sin(((x % 125) / 125) * Math.PI)) * 10 + 6;
              return svg`<ellipse class="bulb" cx=${x} cy=${y} rx="4" ry="6" fill=${colors[i % 4]} style="animation-delay:-${(i * 0.37) % 2.4}s"></ellipse>`;
            })}
          </svg>
          ${this.greeting ? html`<span class="greet" style="top:28px">${this.greeting}</span>` : nothing}`;
      }
      case "new_year":
        return html`${[8, 20, 35, 50, 65, 80, 92].map((x, i) => html`<span class="spark" style="left:${x}%;animation-delay:-${i * 0.3}s">${i % 2 ? "🎆" : "✨"}</span>`)}
          ${this.greeting ? html`<span class="greet" style="top:30px">${this.greeting}</span>` : nothing}`;
    }
  }
}
