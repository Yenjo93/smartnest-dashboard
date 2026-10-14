import { LitElement, css, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";

/** A small SmartNest drawing for "nothing here yet": a sleepy little house under the stars. */
@customElement("sn-empty")
export class SnEmpty extends LitElement {
  @property() text = "";

  static styles = css`
    :host {
      display: grid;
      justify-items: center;
      gap: 8px;
      text-align: center;
      padding: 8px;
      color: var(--text-2);
      font-size: 14px;
      grid-column: 1 / -1;
    }
    svg {
      width: 96px;
      height: 72px;
      overflow: visible;
    }
    .star {
      animation: twinkle 2.6s ease-in-out infinite;
      transform-origin: center;
      transform-box: fill-box;
    }
    .star:nth-of-type(2) {
      animation-delay: 0.8s;
    }
    .star:nth-of-type(3) {
      animation-delay: 1.6s;
    }
    @keyframes twinkle {
      50% {
        opacity: 0.25;
        transform: scale(0.7);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .star {
        animation: none;
      }
    }
  `;

  render() {
    return html`<svg viewBox="0 0 96 72" aria-hidden="true">
        ${svg`<ellipse cx="48" cy="66" rx="34" ry="4" fill="currentColor" opacity=".12"></ellipse>
        <path d="M24 38 L48 18 L72 38 V62 H24 Z" fill="var(--surface-2)" stroke="currentColor" stroke-opacity=".35" stroke-width="2" stroke-linejoin="round"></path>
        <path d="M18 40 L48 14 L78 40" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
        <rect x="42" y="44" width="12" height="18" rx="3" fill="currentColor" opacity=".25"></rect>
        <rect x="30" y="42" width="8" height="8" rx="2" fill="var(--accent)" opacity=".55"></rect>
        <path class="star" d="M80 10 l1.6 3.4 3.4 1.6 -3.4 1.6 -1.6 3.4 -1.6 -3.4 -3.4 -1.6 3.4 -1.6z" fill="var(--accent)"></path>
        <path class="star" d="M14 18 l1.2 2.6 2.6 1.2 -2.6 1.2 -1.2 2.6 -1.2 -2.6 -2.6 -1.2 2.6 -1.2z" fill="currentColor" opacity=".5"></path>
        <circle class="star" cx="62" cy="6" r="1.6" fill="currentColor" opacity=".5"></circle>`}
      </svg>
      <span>${this.text}</span>`;
  }
}
