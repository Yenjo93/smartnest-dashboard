import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import type { I18nKey } from "./i18n";
import { shared } from "./theme";

const KEY = "smartnest-tour";

export const tourDone = () => {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return true;
  }
};
const markDone = () => {
  try {
    localStorage.setItem(KEY, "1");
  } catch {
    /* shows again next time */
  }
};

export interface TourStep {
  /** Finds the thing to point at, inside the panel. */
  target: () => Element | null | undefined;
  text: I18nKey;
}

/** First visit: the dashboard points at its parts one by one ("these are your rooms", "tap a light"…). */
@customElement("sn-tour")
export class SnTour extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) steps: TourStep[] = [];
  @property({ attribute: false }) onDone!: () => void;
  @state() private i = 0;
  @state() private box?: DOMRect;

  static styles = [
    shared,
    css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 70;
      }
      .hole {
        position: fixed;
        border-radius: 18px;
        box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.62), 0 0 0 3px var(--accent);
        transition: all 420ms cubic-bezier(0.32, 0.72, 0, 1);
        pointer-events: none;
      }
      .tip {
        position: fixed;
        width: min(360px, calc(100vw - 32px));
        padding: 16px;
        border-radius: var(--r-lg);
        background: var(--surface-solid);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
        display: grid;
        gap: 12px;
        transition: top 420ms cubic-bezier(0.32, 0.72, 0, 1), left 420ms cubic-bezier(0.32, 0.72, 0, 1);
        animation: in 300ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .tip p {
        margin: 0;
        font-size: 17px;
        line-height: 1.5;
      }
      .row {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .row span {
        flex: 1;
        font-size: 13px;
        color: var(--text-2);
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .hole,
        .tip {
          transition: none;
          animation: none;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.measure();
    window.addEventListener("resize", this.measure);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", this.measure);
  }

  private measure = () => {
    // Skip steps whose part isn't on this dashboard.
    while (this.i < this.steps.length && !this.steps[this.i].target()) this.i++;
    if (this.i >= this.steps.length) return this.finish();
    this.box = this.steps[this.i].target()!.getBoundingClientRect();
  };

  private next() {
    this.i++;
    this.measure();
  }

  private finish() {
    markDone();
    this.onDone();
  }

  render() {
    const step = this.steps[this.i];
    const b = this.box;
    if (!step || !b) return nothing;
    const pad = 8;
    const below = b.bottom + 180 < innerHeight;
    const top = below ? b.bottom + 14 : Math.max(16, b.top - 200);
    const left = Math.min(Math.max(16, b.left + b.width / 2 - 180), innerWidth - Math.min(360, innerWidth - 32) - 16);
    const { t } = this.ctx;
    const last = this.i >= this.steps.length - 1;
    return html`<div class="hole" style="top:${b.top - pad}px;left:${b.left - pad}px;width:${b.width + pad * 2}px;height:${b.height + pad * 2}px"></div>
      <div class="tip" role="dialog" style="top:${top}px;left:${left}px">
        <p>${t(step.text)}</p>
        <div class="row">
          <span>${this.i + 1} / ${this.steps.length}</span>
          <button class="btn pressable" @click=${() => this.finish()}>${t("tour_skip")}</button>
          <button class="btn primary pressable" @click=${() => (last ? this.finish() : this.next())}>${t(last ? "tour_done" : "tour_next")}</button>
        </div>
      </div>`;
  }
}
