import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/** Shimmering placeholder bars while something loads, in the shape of the content to come. */
@customElement("sn-skeleton")
export class SnSkeleton extends LitElement {
  @property({ type: Number }) lines = 3;

  static styles = css`
    :host {
      display: grid;
      gap: 10px;
      padding: 4px 0;
    }
    i {
      display: block;
      height: 14px;
      border-radius: 7px;
      background: var(--surface-2);
      position: relative;
      overflow: hidden;
    }
    /* The shine moves by transform (GPU) rather than background-position (a repaint every frame). */
    i::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--surface-solid) 60%, transparent), transparent);
      transform: translateX(-100%);
      animation: shine 1.4s linear infinite;
    }
    i:first-child {
      height: 22px;
      width: 55%;
    }
    i:last-child {
      width: 70%;
    }
    @keyframes shine {
      to {
        transform: translateX(100%);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      i::after {
        animation: none;
      }
    }
  `;

  render() {
    return html`${Array.from({ length: this.lines }, () => html`<i></i>`)}`;
  }
}
