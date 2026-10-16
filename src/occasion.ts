import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property } from "lit/decorators.js";


/**
 * The calendar's big days dress the top of the dashboard: lanterns and a crescent through Ramadan, a greeting and
 * stars for the Eids, a string of lights at Christmas, sparkles at New Year. Light, at the top edge, out of the way.
 */
@customElement("sn-occasion")
export class SnOccasion extends LitElement {
  /** What hangs from the header. */
  @property() kind: "lanterns" | "lights" | "bunting" = "lanterns";
  /** Bunting colours, from the theme. */
  @property() accent = "#FF5C8A";
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
      case "lanterns":
        return html`${this.lantern("6%", 30, 30)} ${this.lantern("14%", 60, 24)} ${this.lantern("90%", 44, 28)}
          <svg style="position:absolute;top:10px;right:20%;width:30px;height:30px" viewBox="0 0 24 24" aria-hidden="true">
            ${svg`<path d="M15 3a9 9 0 1 0 6 15.5A7.5 7.5 0 1 1 15 3z" fill="#f4c04f"></path>`}
          </svg>
          ${this.greeting ? html`<span class="greet">${this.greeting}</span>` : nothing}`;
      case "lights": {
        const colors = ["#ff5a5a", "#ffd34d", "#4dd27a", "#58a8ff"];
        return html`<svg class="lights" viewBox="0 0 1000 34" preserveAspectRatio="none" aria-hidden="true">
          ${svg`<path d="M0 6 Q 62 26 125 6 T 250 6 T 375 6 T 500 6 T 625 6 T 750 6 T 875 6 T 1000 6" fill="none" stroke="#2b3a2f" stroke-width="1.5"></path>`}
          ${Array.from({ length: 24 }, (_, i) => {
            const x = 20 + i * 41;
            const y = 6 + Math.abs(Math.sin(((x % 125) / 125) * Math.PI)) * 10 + 6;
            return svg`<ellipse class="bulb" cx=${x} cy=${y} rx="4" ry="6" fill=${colors[i % 4]} style="animation-delay:-${(i * 0.37) % 2.4}s"></ellipse>`;
          })}
        </svg>`;
      }
      case "bunting": {
        // Party flags on a string across the header.
        const colors = [this.accent, "#4dd2ff", "#ffd166", "#7bdc8b", "#b388ff"];
        return html`<svg class="lights" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true">
          ${svg`<path d="M0 4 Q 250 22 500 4 T 1000 4" fill="none" stroke="rgba(120,120,120,.6)" stroke-width="1.2"></path>`}
          ${Array.from({ length: 22 }, (_, i) => {
            const x = 12 + i * 45.5;
            const y = 4 + Math.sin(((x % 500) / 500) * Math.PI) * 17;
            return svg`<path d="M${x - 12} ${y} L${x + 12} ${y} L${x} ${y + 22} Z" fill=${colors[i % colors.length]} opacity=".9"></path>`;
          })}
        </svg>`;
      }
    }
  }
}
