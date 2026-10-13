import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

/**
 * Odometer text: each digit is a 0-9 strip that slides to its new value, so "1,840 W" rolls to "1,912 W"
 * instead of jumping. Anything that isn't a digit renders as plain text.
 * Purpose: state indication. Transition (not keyframes) so a value that updates again mid-roll retargets smoothly.
 */
@customElement("sn-num")
export class SnNum extends LitElement {
  @property() value = "";

  static styles = css`
    :host {
      display: inline-flex;
      direction: ltr;
      unicode-bidi: isolate;
      font-variant-numeric: tabular-nums;
      white-space: pre;
    }
    .d {
      display: inline-block;
      height: 1.2em;
      line-height: 1.2em;
      overflow: hidden;
      vertical-align: bottom;
    }
    .strip {
      display: flex;
      flex-direction: column;
      transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    @media (prefers-reduced-motion: reduce) {
      .strip {
        transition: none;
      }
    }
  `;

  render() {
    // Key digits by their position from the right, so "980" → "1,020" keeps the ones/tens/hundreds strips in place.
    const chars = [...this.value.replace(/[⁦-⁩]/g, "")];
    return html`${repeat(
      chars,
      (_c, i) => chars.length - i,
      (c) =>
        /\d/.test(c)
          ? html`<span class="d" aria-hidden="true"
              ><span class="strip" style="transform:translateY(${-Number(c) * 1.2}em)"
                >${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => html`<span>${n}</span>`)}</span
              ></span
            >`
          : html`<span aria-hidden="true">${c}</span>`
    )}<span style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)">${this.value}</span>`;
  }
}

/**
 * Only plain readings roll ("1,840 W", "22.5°C", "76%"). Splitting a label with Arabic or Hebrew letters into
 * per-character spans would break the joined letter shapes, so those stay plain text.
 */
export const isRollable = (s: string) => {
  const plain = s.replace(/[\u2066-\u2069]/g, "");
  return /\d/.test(plain) && plain.length <= 16 && /^[\d\s.,:%°+\-\u2212A-Za-z²³/µ]+$/.test(plain);
};

/** Renders a label, rolling it when it's a plain reading. */
export const rolling = (s: string) => (isRollable(s) ? html`<sn-num .value=${s}></sn-num>` : s);
