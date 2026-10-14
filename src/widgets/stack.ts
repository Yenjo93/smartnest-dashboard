import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeStatic, html as staticHtml } from "lit/static-html.js";
import { keyed } from "lit/directives/keyed.js";
import type { Ctx } from "../ctx";
import type { Widget, WidgetType } from "../types";
import { shared } from "../theme";

interface Slot {
  type: WidgetType;
  /** Hour it takes over (0-23). */
  from: number;
}

/** Morning weather, daytime power, evening music, night security: a sensible default for most homes. */
const DEFAULT: Slot[] = [
  { type: "forecast", from: 5 },
  { type: "energy_stats", from: 11 },
  { type: "media", from: 17 },
  { type: "check", from: 21 },
];

/**
 * Widgets stacked like iOS's Smart Stack: the right one for the time of day comes to the top by itself, and a
 * swipe (or the dots) shows the others.
 */
@customElement("sn-w-stack")
export class SnStack extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private manual?: number;
  @state() private swipeDir = 1;
  private startY?: number;
  private reset?: number;

  static styles = [
    shared,
    css`
      :host {
        display: block;
        height: 100%;
        position: relative;
      }
      .slot {
        height: 100%;
        animation: in 480ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .slot.up {
        animation-name: in-up;
      }
      .dots {
        position: absolute;
        inset-inline-end: -10px;
        top: 50%;
        translate: 0 -50%;
        display: grid;
        gap: 5px;
        z-index: 2;
      }
      .dots button {
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background: var(--text-2);
        opacity: 0.35;
        transition: height 300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms;
      }
      .dots button[aria-pressed="true"] {
        height: 16px;
        opacity: 0.9;
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(18px) scale(0.97);
        }
      }
      @keyframes in-up {
        from {
          opacity: 0;
          transform: translateY(-18px) scale(0.97);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .slot {
          animation: none;
        }
      }
    `,
  ];

  private get slots(): Slot[] {
    const s: Slot[] = this.widget.config.slots?.length ? this.widget.config.slots : DEFAULT;
    return s.filter((x) => this.ctx.allows(`w_${x.type}` as any));
  }

  /** The slot whose hour has most recently started. */
  private get auto(): number {
    const h = new Date().getHours();
    const s = this.slots;
    let best = 0;
    let bestFrom = -1;
    s.forEach((x, i) => {
      const from = x.from <= h ? x.from : x.from - 24;
      if (from > bestFrom) (bestFrom = from), (best = i);
    });
    return best;
  }

  private go(i: number, dir: number) {
    const n = this.slots.length;
    this.swipeDir = dir;
    this.manual = ((i % n) + n) % n;
    // Back to the time-of-day choice after a minute alone.
    window.clearTimeout(this.reset);
    this.reset = window.setTimeout(() => (this.manual = undefined), 60_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this.reset);
  }

  render() {
    const slots = this.slots;
    if (!slots.length) return nothing;
    const i = this.manual ?? this.auto;
    const slot = slots[i];
    const tag = unsafeStatic(`sn-w-${slot.type.replace(/_/g, "-")}`);
    const inner: Widget = { ...this.widget, id: `${this.widget.id}-${slot.type}`, type: slot.type, config: this.widget.config[slot.type] ?? {} };
    return html`${keyed(
        i,
        html`<div
        class="slot ${this.swipeDir < 0 ? "up" : ""}"
        @pointerdown=${(e: PointerEvent) => (this.startY = e.clientY)}
        @pointerup=${(e: PointerEvent) => {
          if (this.startY === undefined) return;
          const dy = e.clientY - this.startY;
          this.startY = undefined;
          if (Math.abs(dy) > 50) this.go(i + (dy < 0 ? 1 : -1), dy < 0 ? 1 : -1);
        }}
      >
        ${staticHtml`<${tag} .ctx=${this.ctx} .widget=${inner}></${tag}>`}
      </div>`
      )}
      ${slots.length > 1
        ? html`<div class="dots">${slots.map((_, k) => html`<button aria-pressed=${k === i} aria-label=${String(k + 1)} @click=${() => this.go(k, k > i ? 1 : -1)}></button>`)}</div>`
        : nothing}`;
  }
}
