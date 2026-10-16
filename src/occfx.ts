import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Particles } from "./occasions";

/** Fixed pseudo-random numbers per index, so particles don't jump around on every redraw. */
const rnd = (i: number, s: number) => ((Math.sin(i * 12.9898 + s * 78.233) * 43758.5453) % 1 + 1) % 1;

/**
 * The occasion's moving layer over the page background: twinkling stars for Ramadan nights, confetti and balloons for
 * a birthday, snow at Christmas, fireworks at New Year. Behind the cards, light, transforms and opacity only.
 */
@customElement("sn-occfx")
export class SnOccFx extends LitElement {
  @property({ attribute: false }) kinds: Particles[] = [];
  @property() accent = "#E8B04B";

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      z-index: -1;
      pointer-events: none;
      overflow: hidden;
    }
    i {
      position: absolute;
      display: block;
      animation-play-state: var(--loops, running) !important;
    }
    .star {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0 6px 1px rgba(255, 255, 255, 0.8);
      animation: twinkle ease-in-out infinite alternate;
    }
    .sparkle {
      width: 14px;
      height: 14px;
      background: radial-gradient(circle, #fff 0 18%, transparent 20%), conic-gradient(from 45deg, transparent 0 20%, var(--a) 22% 28%, transparent 30% 45%, var(--a) 47% 53%, transparent 55% 70%, var(--a) 72% 78%, transparent 80% 95%, var(--a) 97%);
      border-radius: 50%;
      animation: twinkle ease-in-out infinite alternate;
    }
    .confetti {
      top: -20px;
      width: 8px;
      height: 14px;
      border-radius: 2px;
      animation: fall linear infinite;
    }
    .snow {
      top: -20px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.9);
      animation: fall linear infinite;
    }
    .petal {
      top: -20px;
      width: 12px;
      height: 16px;
      border-radius: 80% 0 80% 0;
      background: linear-gradient(135deg, #ffd1e3, #ff8fb8);
      animation: fall linear infinite;
    }
    .balloon {
      bottom: -140px;
      width: 46px;
      height: 58px;
      border-radius: 50% 50% 48% 48% / 55% 55% 45% 45%;
      animation: rise linear infinite;
      opacity: 0.85;
    }
    .balloon::before {
      content: "";
      position: absolute;
      left: 30%;
      top: 18%;
      width: 22%;
      height: 26%;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.45);
    }
    .balloon::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 100%;
      width: 1px;
      height: 70px;
      background: rgba(120, 120, 120, 0.5);
    }
    .heart {
      bottom: -40px;
      font-size: 22px;
      line-height: 1;
      animation: rise linear infinite;
      opacity: 0.75;
    }
    .burst {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      background: radial-gradient(circle, transparent 0 30%, var(--a) 31% 33%, transparent 34% 50%, var(--a) 51% 52%, transparent 53%),
        repeating-conic-gradient(var(--a) 0 3deg, transparent 3deg 22deg);
      -webkit-mask: radial-gradient(circle, transparent 0 20%, #000 21% 70%, transparent 72%);
      mask: radial-gradient(circle, transparent 0 20%, #000 21% 70%, transparent 72%);
      animation: burst ease-out infinite;
      opacity: 0;
    }
    @keyframes twinkle {
      from {
        opacity: 0.15;
        transform: scale(0.6);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    @keyframes fall {
      to {
        transform: translate(var(--dx), 110vh) rotate(var(--r));
      }
    }
    @keyframes rise {
      to {
        transform: translate(var(--dx), -120vh) rotate(var(--r));
      }
    }
    @keyframes burst {
      0% {
        opacity: 0;
        transform: scale(0.2);
      }
      12% {
        opacity: 1;
      }
      45% {
        opacity: 0;
        transform: scale(1.2);
      }
      100% {
        opacity: 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host {
        display: none;
      }
    }
  `;

  private many(n: number, make: (i: number) => unknown) {
    return Array.from({ length: n }, (_, i) => make(i));
  }

  render() {
    const a = this.accent;
    const colors = [a, "#ff5c8a", "#4dd2ff", "#ffd166", "#7bdc8b", "#b388ff"];
    return html`${this.kinds.map((k) => {
      switch (k) {
        case "stars":
          return this.many(46, (i) => html`<i class="star" style="left:${rnd(i, 1) * 100}%;top:${rnd(i, 2) * 70}%;animation-duration:${2 + rnd(i, 3) * 3}s;animation-delay:-${rnd(i, 4) * 4}s;transform:scale(${0.5 + rnd(i, 5)})"></i>`);
        case "sparkles":
          return this.many(14, (i) => html`<i class="sparkle" style="--a:${a};left:${rnd(i, 6) * 100}%;top:${rnd(i, 7) * 90}%;animation-duration:${1.6 + rnd(i, 8) * 2}s;animation-delay:-${rnd(i, 9) * 3}s"></i>`);
        case "confetti":
          return this.many(34, (i) => html`<i class="confetti" style="left:${rnd(i, 10) * 100}%;background:${colors[i % colors.length]};animation-duration:${9 + rnd(i, 11) * 9}s;animation-delay:-${rnd(i, 12) * 14}s;--dx:${(rnd(i, 13) - 0.5) * 160}px;--r:${(rnd(i, 14) - 0.5) * 1440}deg"></i>`);
        case "snow":
          return this.many(40, (i) => html`<i class="snow" style="left:${rnd(i, 15) * 100}%;animation-duration:${12 + rnd(i, 16) * 10}s;animation-delay:-${rnd(i, 17) * 18}s;--dx:${(rnd(i, 18) - 0.5) * 120}px;--r:0deg;transform:scale(${0.5 + rnd(i, 19)})"></i>`);
        case "petals":
          return this.many(18, (i) => html`<i class="petal" style="left:${rnd(i, 20) * 100}%;animation-duration:${14 + rnd(i, 21) * 10}s;animation-delay:-${rnd(i, 22) * 20}s;--dx:${(rnd(i, 23) - 0.5) * 200}px;--r:${(rnd(i, 24) - 0.5) * 720}deg"></i>`);
        case "balloons":
          return this.many(9, (i) => html`<i class="balloon" style="left:${5 + rnd(i, 25) * 90}%;background:${colors[(i + 1) % colors.length]};animation-duration:${18 + rnd(i, 26) * 14}s;animation-delay:-${rnd(i, 27) * 28}s;--dx:${(rnd(i, 28) - 0.5) * 120}px;--r:${(rnd(i, 29) - 0.5) * 30}deg"></i>`);
        case "hearts":
          return this.many(12, (i) => html`<i class="heart" style="left:${rnd(i, 30) * 100}%;animation-duration:${14 + rnd(i, 31) * 12}s;animation-delay:-${rnd(i, 32) * 24}s;--dx:${(rnd(i, 33) - 0.5) * 100}px;--r:${(rnd(i, 34) - 0.5) * 60}deg">${i % 3 ? "💗" : "❤️"}</i>`);
        case "fireworks":
          return this.many(6, (i) => html`<i class="burst" style="--a:${colors[i % colors.length]};left:${10 + rnd(i, 35) * 75}%;top:${5 + rnd(i, 36) * 40}%;animation-duration:${3 + rnd(i, 37) * 3}s;animation-delay:-${rnd(i, 38) * 5}s"></i>`);
        case "lanterns":
          return nothing;
      }
    })}`;
  }
}
