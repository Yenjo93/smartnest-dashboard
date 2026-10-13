import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx, SheetSpec } from "../ctx";
import { shared } from "../theme";
import "./icon";

/**
 * Renders the stack of sheets. On a phone they rise from the bottom; on wider screens they sit centred.
 * Lives at the panel root so `position: fixed` isn't trapped by a glass widget's backdrop-filter.
 */
@customElement("sn-sheet-host")
export class SnSheetHost extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) sheets: SheetSpec[] = [];
  @state() private closing = false;

  static styles = [
    shared,
    css`
      .scrim {
        position: fixed;
        inset: 0;
        z-index: 50;
        background: var(--scrim);
        -webkit-backdrop-filter: blur(6px);
        backdrop-filter: blur(6px);
        display: grid;
        place-items: center;
        padding: 24px;
        animation: fade var(--dur) var(--ease-out);
      }
      .scrim.closing {
        animation: fade-out var(--dur-fast) var(--ease-in) forwards;
      }
      .sheet {
        position: relative;
        width: min(560px, 100%);
        max-height: min(86vh, 900px);
        display: flex;
        flex-direction: column;
        border-radius: var(--r-xl);
        background: var(--surface-solid);
        color: var(--text);
        box-shadow: var(--shadow-lift);
        overflow: hidden;
        animation: rise 520ms var(--spring);
      }
      .closing .sheet {
        animation: sink var(--dur-fast) var(--ease-in) forwards;
      }
      header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 18px 20px 6px;
      }
      header h2 {
        flex: 1;
        margin: 0;
        font-size: 20px;
        font-weight: 700;
      }
      .body {
        overflow: auto;
        padding: 12px 20px 24px;
        overscroll-behavior: contain;
      }
      @media (max-width: 600px) {
        .scrim {
          align-items: end;
          padding: 0;
        }
        .sheet {
          width: 100%;
          border-radius: var(--r-xl) var(--r-xl) 0 0;
          max-height: 92vh;
          padding-bottom: env(safe-area-inset-bottom);
        }
        .sheet::before {
          content: "";
          display: block;
          width: 40px;
          height: 5px;
          border-radius: 3px;
          background: var(--surface-2);
          margin: 8px auto 0;
        }
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @keyframes fade-out {
        to {
          opacity: 0;
        }
      }
      @keyframes rise {
        from {
          transform: translateY(40px) scale(0.97);
          opacity: 0;
        }
      }
      @keyframes sink {
        to {
          transform: translateY(30px) scale(0.98);
          opacity: 0;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("keydown", this.onKey);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this.onKey);
  }

  private onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && this.sheets.length) this.dismiss();
  };

  private dismiss() {
    const top = this.sheets[this.sheets.length - 1];
    if (this.sheets.length === 1) {
      // Let the exit animation play before the panel drops the sheet.
      this.closing = true;
      window.setTimeout(() => {
        this.closing = false;
        top.onClose?.();
        this.ctx.closeSheet();
      }, 190);
    } else {
      top.onClose?.();
      this.ctx.closeSheet();
    }
  }

  render() {
    if (!this.sheets.length) return nothing;
    return this.sheets.map(
      (s, i) => html`
        <div
          class="scrim ${this.closing && i === this.sheets.length - 1 ? "closing" : ""}"
          @click=${(e: Event) => e.target === e.currentTarget && i === this.sheets.length - 1 && this.dismiss()}
        >
          <div class="sheet" role="dialog" aria-modal="true" aria-label=${s.title ?? ""}>
            <header>
              <h2>${s.title ?? ""}</h2>
              <button class="icon-btn small pressable" aria-label=${this.ctx.t("close")} @click=${() => this.dismiss()}>
                <sn-icon icon="close" style="--icon-size:20px"></sn-icon>
              </button>
            </header>
            <div class="body">${s.render(this.ctx)}</div>
          </div>
        </div>
      `
    );
  }
}
