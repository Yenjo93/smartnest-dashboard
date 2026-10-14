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
      background: linear-gradient(90deg, var(--surface-2) 0%, color-mix(in srgb, var(--surface-2) 40%, var(--surface-solid)) 50%, var(--surface-2) 100%) 0 0 / 200% 100%;
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
        background-position: -200% 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      i {
        animation: none;
      }
    }
  `;

  render() {
    return html`${Array.from({ length: this.lines }, () => html`<i></i>`)}`;
  }
}
