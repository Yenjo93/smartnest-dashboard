import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./icon";
import { haptic } from "./haptic";

/** iPhone-style passcode pad. Calls onSubmit when the last digit lands; a wrong code shakes and clears. */
@customElement("sn-pinpad")
export class SnPinpad extends LitElement {
  /** Digits expected; 0 = any length, confirmed with the ✓ key (alarm codes). */
  @property({ type: Number }) length = 4;
  @property() prompt = "";
  @property() error = "";
  @property({ attribute: false }) onSubmit!: (pin: string) => boolean;
  @state() private value = "";
  @state() private wrong = false;

  static styles = css`
    :host {
      display: grid;
      justify-items: center;
      gap: 22px;
      padding: 8px 0 12px;
      direction: ltr;
      user-select: none;
      -webkit-user-select: none;
    }
    .prompt {
      font-size: 17px;
      font-weight: 500;
      color: var(--text);
      min-height: 1.4em;
    }
    .prompt.err {
      color: var(--alert-text);
    }
    .dots {
      display: flex;
      gap: 16px;
      height: 16px;
    }
    .dots.shake {
      animation: shake 420ms cubic-bezier(0.36, 0.07, 0.19, 0.97);
    }
    .dot {
      width: 14px;
      height: 14px;
      border-radius: 999px;
      border: 2px solid var(--text);
      transition: background-color 120ms;
    }
    .dot.on {
      background: var(--text);
    }
    .keys {
      display: grid;
      grid-template-columns: repeat(3, 76px);
      gap: 16px 22px;
    }
    button {
      width: 76px;
      height: 76px;
      border-radius: 999px;
      border: 0;
      font: inherit;
      font-size: 30px;
      font-weight: 500;
      color: var(--text);
      background: var(--surface-2);
      cursor: pointer;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
      transition: background-color 120ms, transform 120ms;
    }
    button:active {
      background: var(--text-2);
      transform: scale(0.94);
    }
    button.ghost {
      background: transparent;
      --icon-size: 28px;
      display: grid;
      place-items: center;
    }
    @keyframes shake {
      10%,
      90% {
        transform: translateX(-2px);
      }
      20%,
      80% {
        transform: translateX(4px);
      }
      30%,
      50%,
      70% {
        transform: translateX(-10px);
      }
      40%,
      60% {
        transform: translateX(10px);
      }
    }
  `;

  private submit() {
    const pin = this.value;
    if (!pin) return;
    if (this.onSubmit(pin)) return;
    this.wrong = true;
    navigator.vibrate?.([60, 40, 60]);
    this.value = "";
  }

  private press(d: string) {
    if (!this.length) {
      if (this.value.length < 12) this.value += d;
      this.wrong = false;
      return;
    }
    if (this.value.length >= this.length) return;
    this.wrong = false;
    this.value += d;
    haptic("tick");
    if (this.value.length === this.length) {
      const pin = this.value;
      // Let the last dot fill in before checking, so the user sees it land.
      window.setTimeout(() => {
        if (this.onSubmit(pin)) return;
        this.wrong = true;
        navigator.vibrate?.([60, 40, 60]);
        this.value = "";
      }, 120);
    }
  }

  render() {
    return html`
      <div class="prompt ${this.wrong ? "err" : ""}">${this.wrong ? this.error : this.prompt}</div>
      <div class="dots ${this.wrong ? "shake" : ""}" aria-hidden="true">
        ${Array.from({ length: this.length || Math.max(4, this.value.length) }, (_, i) => html`<span class="dot ${i < this.value.length ? "on" : ""}"></span>`)}
      </div>
      <div class="keys">
        ${["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => html`<button @click=${() => this.press(d)}>${d}</button>`)}
        ${this.length
          ? html`<span></span>`
          : html`<button class="ghost" aria-label="ok" @click=${() => this.submit()}><sn-icon icon="check"></sn-icon></button>`}
        <button @click=${() => this.press("0")}>0</button>
        <button class="ghost" aria-label="delete" @click=${() => (this.value = this.value.slice(0, -1))}>
          <sn-icon icon="backspace"></sn-icon>
        </button>
      </div>
    `;
  }
}
