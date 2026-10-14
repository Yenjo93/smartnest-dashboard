import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx, SheetSpec } from "../ctx";
import { shared } from "../theme";
import "./icon";
import { spring } from "./spring";
import { haptic } from "./haptic";

/**
 * Renders the stack of sheets. On a phone they rise from the bottom; on wider screens they sit centred.
 * Lives at the panel root so `position: fixed` isn't trapped by a glass widget's backdrop-filter.
 */
@customElement("sn-sheet-host")
export class SnSheetHost extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) sheets: SheetSpec[] = [];
  @state() private closing = false;
  private grown = new WeakSet<SheetSpec>();

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
        animation: fade-out var(--dur-fast) var(--ease-out) forwards;
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
        animation: rise 380ms var(--ease-drawer);
      }
      .closing .sheet {
        animation: sink var(--dur-fast) var(--ease-out) forwards;
      }
      .sheet.from-origin,
      .closing .sheet.from-origin {
        animation: none; /* driven by WAAPI from the tile */
      }
      header {
        touch-action: none; /* the header drags the sheet down to close it */
        cursor: grab;
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
        /* The grab handle sits in the header, which is what drags. */
        header {
          position: relative;
          padding-top: 24px;
        }
        header::before {
          content: "";
          position: absolute;
          top: 8px;
          left: 50%;
          width: 40px;
          height: 5px;
          margin-left: -20px;
          border-radius: 3px;
          background: var(--surface-2);
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

  /** Centred-dialog layout only; on a phone the sheet rises from the bottom edge instead. */
  private useOrigin(spec: SheetSpec) {
    return !!spec.origin?.isConnected && window.innerWidth > 600 && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /** Transform that puts the sheet over its origin tile, same centre, uniform scale so text never stretches. */
  private originTransform(sheet: HTMLElement, origin: Element) {
    const f = sheet.getBoundingClientRect();
    const o = origin.getBoundingClientRect();
    const scale = Math.min(1, Math.max(0.2, o.width / f.width));
    const dx = o.left + o.width / 2 - (f.left + f.width / 2);
    const dy = o.top + o.height / 2 - (f.top + f.height / 2);
    return `translate(${dx}px, ${dy}px) scale(${scale})`;
  }

  protected updated() {
    // Grow each newly opened sheet out of the tile it came from. Spatial consistency: the window visibly
    // comes from, and returns to, the device you pressed.
    this.sheets.forEach((spec, i) => {
      if (this.grown.has(spec)) return;
      this.grown.add(spec);
      if (!this.useOrigin(spec)) return;
      const sheet = this.renderRoot.querySelectorAll<HTMLElement>(".sheet")[i];
      if (!sheet) return;
      sheet.classList.add("from-origin");
      sheet.animate([{ transform: this.originTransform(sheet, spec.origin!), opacity: 0.4 }, { transform: "none", opacity: 1 }], {
        duration: 380,
        easing: "cubic-bezier(0.32, 0.72, 0, 1)",
      });
    });
  }

  // ---- pull down to close ----
  private pull?: { id: number; y: number; x: number; dy: number; lastY: number; lastT: number; v: number; on: boolean; sheet: HTMLElement; scrim: HTMLElement };

  private onPullDown = (e: PointerEvent) => {
    if (e.button !== 0 || (e.target as Element).closest("button, input, select, textarea, a")) return;
    const sheet = (e.currentTarget as HTMLElement).closest(".sheet") as HTMLElement;
    this.pull = { id: e.pointerId, y: e.clientY, x: e.clientX, dy: 0, lastY: e.clientY, lastT: performance.now(), v: 0, on: false, sheet, scrim: sheet.parentElement as HTMLElement };
  };

  private onPullMove = (e: PointerEvent) => {
    const p = this.pull;
    if (!p || e.pointerId !== p.id) return;
    const dy = e.clientY - p.y;
    if (!p.on) {
      if (dy < -6 || Math.abs(e.clientX - p.x) > Math.abs(dy)) return void (this.pull = undefined);
      if (dy < 8) return;
      p.on = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
    const now = performance.now();
    p.v = (e.clientY - p.lastY) / Math.max(1, now - p.lastT);
    p.lastY = e.clientY;
    p.lastT = now;
    p.dy = Math.max(0, dy);
    p.sheet.style.transform = `translateY(${p.dy}px)`;
    p.scrim.style.backgroundColor = `color-mix(in srgb, var(--scrim) ${Math.round(100 - Math.min(1, p.dy / 500) * 70)}%, transparent)`;
  };

  private onPullUp = (e: PointerEvent) => {
    const p = this.pull;
    this.pull = undefined;
    if (!p?.on || e.pointerId !== p.id) return;
    const h = p.sheet.offsetHeight;
    const reset = () => {
      p.sheet.style.transform = "";
      p.scrim.style.backgroundColor = "";
    };
    if (p.dy > h * 0.28 || p.v > 0.55) {
      haptic("tick");
      const end = h + 40;
      const ms = Math.max(140, Math.min(320, ((end - p.dy) / Math.max(p.v, 1.2)) | 0));
      p.scrim.animate([{ opacity: 1 }, { opacity: 0 }], { duration: ms, fill: "forwards" });
      p.sheet.animate([{ transform: `translateY(${p.dy}px)` }, { transform: `translateY(${end}px)` }], { duration: ms, easing: "cubic-bezier(0.2, 0.7, 0.4, 1)", fill: "forwards" }).finished.then(() => {
        const top = this.sheets[this.sheets.length - 1];
        top?.onClose?.();
        this.ctx.closeSheet();
        // The next sheet down (if any) reuses these elements: clear what the drag left on them.
        requestAnimationFrame(() => {
          reset();
          p.sheet.getAnimations().forEach((a) => a.cancel());
          p.scrim.getAnimations().forEach((a) => a.cancel());
        });
      });
    } else {
      const { frames, duration } = spring(p.dy, 0, p.v, (y) => ({ transform: `translateY(${y}px)` }));
      reset();
      p.sheet.animate(frames, { duration });
    }
  };

  private dismiss() {
    const top = this.sheets[this.sheets.length - 1];
    if (this.sheets.length === 1 && this.useOrigin(top)) {
      const sheet = this.renderRoot.querySelectorAll<HTMLElement>(".sheet")[0];
      this.closing = true; // fades the scrim
      sheet
        .animate([{ transform: "none", opacity: 1 }, { transform: this.originTransform(sheet, top.origin!), opacity: 0 }], {
          duration: 240,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        })
        .finished.then(() => {
          this.closing = false;
          top.onClose?.();
          this.ctx.closeSheet();
        });
      return;
    }
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

  private still = new WeakMap<SheetSpec, { key: unknown[]; tpl: unknown }>();

  /** A still sheet keeps its last drawing until something it shows from the setup changes. */
  private body(s: SheetSpec) {
    if (!s.still) return s.render(this.ctx);
    const { ctx } = this;
    const key = [ctx.config, ctx.lang, ctx.dark, ctx.editing, ctx.isAdmin];
    const kept = this.still.get(s);
    if (kept && kept.key.every((v, i) => v === key[i])) return kept.tpl;
    const tpl = s.render(ctx);
    this.still.set(s, { key, tpl });
    return tpl;
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
            <header @pointerdown=${this.onPullDown} @pointermove=${this.onPullMove} @pointerup=${this.onPullUp} @pointercancel=${this.onPullUp}>
              <h2>${s.title ?? ""}</h2>
              <button class="icon-btn small pressable" aria-label=${this.ctx.t("close")} @click=${() => this.dismiss()}>
                <sn-icon icon="close" style="--icon-size:20px"></sn-icon>
              </button>
            </header>
            <div class="body">${this.body(s)}</div>
          </div>
        </div>
      `
    );
  }
}
