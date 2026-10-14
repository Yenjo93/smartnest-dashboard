import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { toneStyle, entityIcon, entityName, isActive, runTap, stateLabel, tapKind, domainOf, seen, GUESS_MS } from "../entities";
import { bindPress } from "../ui/press";
import { shared } from "../theme";
import { playUi } from "../sounds";
import "../ui/icon";
import { rolling } from "../ui/num";
import { livingClass, livingStyles, playStateChange } from "../motion";
import { openRadial } from "../ui/radial";
import { haptic } from "../ui/haptic";
import { minutesLeft, onTimers } from "../live-timers";

const QUICK = ["light", "cover", "switch", "fan", "input_boolean", "climate", "media_player"];

/** One device, Apple Home style: tap toggles, long-press opens its quick actions; press and slide dims a light. */
@customElement("sn-w-tile")
export class SnTile extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  private unbind?: () => void;
  private prevState?: string;
  /** Brightness while sliding a finger along a light (0–100), shown as a fill across the tile. */
  @state() private dim?: number;
  private slide?: { id: number; x: number; y: number; from: number; armed: boolean; on: boolean; timer?: number; w: number };

  static styles = [
    shared,
    livingStyles,
    css`
      :host {
        display: block;
        height: 100%;
      }
      .tile {
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        border-radius: var(--r-lg);
        cursor: pointer;
        text-align: start;
        overflow: hidden;
      }
      .tile.vertical {
        padding: 12px 14px;
        gap: 6px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
      }
      .ic {
        display: grid;
        place-items: center;
        width: 44px;
        height: 44px;
        border-radius: 999px;
        background: var(--surface-2);
        color: var(--text-2);
        flex: none;
        transition: background-color var(--dur) var(--ease-out), color var(--dur) var(--ease-out);
      }
      .text {
        min-width: 0;
        display: grid;
        gap: 2px;
      }
      .name {
        font-weight: 700;
        font-size: 15px;
        line-height: 1.25;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .state {
        unicode-bidi: plaintext; /* "1,840 W" stays LTR inside Arabic text */
        font-size: 13px;
        color: var(--text-2);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      /* 2.0: what's on breathes slowly in its own colour. */
      .tile.on::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        box-shadow: 0 0 0 1px color-mix(in srgb, var(--tone, var(--accent)) 40%, transparent), 0 0 24px color-mix(in srgb, var(--tone, var(--accent)) 45%, transparent);
        opacity: 0;
        animation: breathe-glow 4.5s ease-in-out infinite;
        animation-play-state: var(--loops, running);
        display: var(--breathe, none);
      }
      @keyframes breathe-glow {
        50% {
          opacity: 1;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .tile.on::after {
          animation: none;
        }
      }
      .tile:not(.on) {
        opacity: var(--idle-opacity, 1);
        transition: opacity 600ms var(--ease-out);
      }
      .tile.on {
        --duo-fill: 0.95;
        background: var(--surface-solid);
        box-shadow: 0 16px 40px -14px color-mix(in srgb, var(--tone, var(--accent)) var(--on-glow, 0%), transparent), var(--shadow);
        border-color: transparent;
      }
      .tile.on .ic {
        background: var(--tone);
        color: var(--on-tone);
      }
      .tile.on .state {
        color: var(--text);
      }
      .tile.off-line {
        opacity: 0.55;
      }
      /* Press and slide on a light: the tile fills with its brightness. */
      .dim {
        position: absolute;
        inset: 0;
        transform-origin: var(--from, left);
        background: color-mix(in srgb, var(--tone, var(--accent)) 35%, transparent);
        pointer-events: none;
      }
      .dimv {
        position: absolute;
        z-index: 1;
        pointer-events: none;
        inset-inline-end: 14px;
        top: 10px;
        font-size: 15px;
      }
      /* 2.0: a slow light runs around the border of whatever is on. */
      .ring {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 1.5px;
        overflow: hidden;
        pointer-events: none;
        display: var(--active-glow, none);
        -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
      }
      .ring i {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300%;
        aspect-ratio: 1;
        translate: -50% -50%;
        background: conic-gradient(transparent 0 72%, color-mix(in srgb, var(--tone, var(--accent)) 90%, #fff) 88%, transparent 100%);
        animation: ring 5s linear infinite;
        animation-play-state: var(--loops, running);
      }
      @keyframes ring {
        to {
          rotate: 360deg;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .ring {
          display: none;
        }
      }
      /* A live countdown: "off in 30 min", or the washer's time left. */
      .left {
        position: absolute;
        top: 8px;
        inset-inline-end: 10px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 3px 8px;
        border-radius: 999px;
        background: color-mix(in srgb, var(--tone, var(--accent)) 22%, transparent);
        color: var(--text);
        font-size: 12px;
        font-weight: 700;
        --icon-size: 13px;
      }
      .tile.armed {
        transform: scale(0.97);
        transition: transform 160ms var(--ease-out);
      }
    `,
  ];

  private bind() {
    const el = this.renderRoot.querySelector<HTMLElement>(".tile");
    if (el && !this.unbind) {
      const off = bindPress(el, () => this.tap(), () => this.long(el));
      el.addEventListener("pointerdown", this.slideDown);
      el.addEventListener("pointermove", this.slideMove);
      el.addEventListener("pointerup", this.slideUp);
      el.addEventListener("pointercancel", this.slideUp);
      this.unbind = () => {
        off();
        el.removeEventListener("pointerdown", this.slideDown);
        el.removeEventListener("pointermove", this.slideMove);
        el.removeEventListener("pointerup", this.slideUp);
        el.removeEventListener("pointercancel", this.slideUp);
      };
    }
  }

  private leftTick?: number;
  private offTimers?: () => void;

  private renderLeft(id: string, on: boolean) {
    if (!on) return "";
    const l = minutesLeft(this.ctx.hass, id);
    // Keep the countdown moving while it shows (the tile otherwise only redraws when its device changes).
    if (l && !this.leftTick) this.leftTick = window.setInterval(() => this.requestUpdate(), 30_000);
    if (!l && this.leftTick) (window.clearInterval(this.leftTick), (this.leftTick = undefined));
    if (!l) return "";
    const txt = l.left >= 60 ? `${Math.floor(l.left / 60)}:${String(l.left % 60).padStart(2, "0")}` : this.ctx.t("min_short", { n: l.left });
    return html`<span class="left ltr"><sn-icon icon=${l.kind === "timer" ? "timer-outline" : "progress-clock"}></sn-icon>${txt}</span>`;
  }

  private long(el: HTMLElement) {
    if (this.ctx.editing || this.slide?.on) return;
    const id = this.widget.config.entity as string;
    const e = this.ctx.hass.states[id];
    if (e && e.state !== "unavailable" && QUICK.includes(domainOf(id))) openRadial(this.ctx, id, el);
    else this.ctx.openEntity(id, el);
  }

  private dimmable() {
    const id = this.widget.config.entity as string;
    const modes: string[] = this.ctx.hass.states[id]?.attributes.supported_color_modes ?? [];
    return domainOf(id) === "light" && modes.some((m) => m !== "onoff");
  }

  // ---- press and slide to dim ----
  // Hold a moment (so a swipe between pages or a scroll still works), then slide sideways: brightness follows.
  private slideDown = (e: PointerEvent) => {
    if (e.button !== 0 || this.ctx.editing || !this.dimmable()) return;
    const ent = this.ctx.hass.states[this.widget.config.entity];
    const from = ent?.state === "on" ? Math.round(((ent.attributes.brightness ?? 255) / 255) * 100) : 0;
    const s = { id: e.pointerId, x: e.clientX, y: e.clientY, from, armed: false, on: false, w: (e.currentTarget as HTMLElement).offsetWidth } as NonNullable<SnTile["slide"]>;
    s.timer = window.setTimeout(() => {
      s.armed = true;
      (e.target as HTMLElement).closest(".tile")?.classList.add("armed");
    }, 260);
    this.slide = s;
  };

  private slideMove = (e: PointerEvent) => {
    const s = this.slide;
    if (!s || e.pointerId !== s.id) return;
    const dx = e.clientX - s.x;
    if (!s.armed) {
      if (Math.hypot(dx, e.clientY - s.y) > 10) this.endSlide(e.currentTarget as HTMLElement);
      return;
    }
    if (!s.on) {
      if (Math.abs(dx) < 6) return;
      s.on = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      // The page under the finger mustn't take this as a swipe.
      this.dispatchEvent(new CustomEvent("sn-cancel-swipe", { bubbles: true, composed: true }));
      haptic("tick");
    }
    const dir = this.ctx.rtl ? -1 : 1;
    const v = Math.round(Math.min(100, Math.max(0, s.from + ((dx * dir) / Math.max(120, s.w)) * 100)));
    if (this.dim !== undefined && Math.floor(v / 10) !== Math.floor(this.dim / 10)) haptic("tick");
    this.dim = v;
  };

  private slideUp = (e: PointerEvent) => {
    const s = this.slide;
    if (!s || e.pointerId !== s.id) return;
    const v = this.dim;
    this.endSlide(e.currentTarget as HTMLElement);
    if (s.on && v !== undefined) {
      const id = this.widget.config.entity as string;
      const call = v === 0 ? this.ctx.hass.callService("light", "turn_off", { entity_id: id }) : this.ctx.hass.callService("light", "turn_on", { entity_id: id, brightness_pct: v });
      call.catch(() => this.ctx.toast(this.ctx.t("error")));
    }
  };

  private endSlide(el: HTMLElement) {
    window.clearTimeout(this.slide?.timer);
    el.classList.remove("armed");
    this.slide = undefined;
    // Keep the fill for a beat so the change doesn't flicker before Home Assistant reports it.
    if (this.dim !== undefined) window.setTimeout(() => (this.dim = undefined), 600);
  }

  protected firstUpdated() {
    this.bind();
  }

  protected updated() {
    const e = this.ctx.hass.states[this.widget.config.entity];
    playStateChange(this.renderRoot.querySelector(".ic sn-icon"), e, this.prevState);
    this.prevState = e?.state;
  }

  connectedCallback() {
    super.connectedCallback();
    this.offTimers = onTimers(() => this.requestUpdate());
    if (this.hasUpdated) this.bind(); // re-attached after a drag reorder
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.leftTick);
    this.leftTick = undefined;
    this.offTimers?.();
    this.offTimers = undefined;
    this.unbind?.();
    this.unbind = undefined;
  }

  private tap() {
    if (this.ctx.editing) return;
    const id = this.widget.config.entity as string;
    const e = this.ctx.hass.states[id];
    if (!e || e.state === "unavailable" || tapKind(id) === "sheet") return this.ctx.openEntity(id, this.renderRoot.querySelector(".tile") ?? undefined);
    haptic("tap");
    // A light coming on sends a ripple of its colour across the screen (2.0).
    if (domainOf(id) === "light" && !isActive(e) && this.ctx.allows("light_wave")) {
      const r = this.getBoundingClientRect();
      const rgb = Array.isArray(e.attributes.rgb_color) ? e.attributes.rgb_color : [255, 196, 120];
      this.dispatchEvent(new CustomEvent("sn-light-wave", { bubbles: true, composed: true, detail: { x: r.left + r.width / 2, y: r.top + r.height / 2, color: `rgb(${rgb.join(",")})` } }));
    }
    playUi(domainOf(id) === "lock" ? (e.state === "locked" ? "unlock" : "lock") : isActive(e) ? "off" : "on");
    runTap(this.ctx.hass, e).catch(() => (this.ctx.toast(this.ctx.t("error")), this.requestUpdate()));
    // Show the tap at once, and the real state again if the device never follows.
    this.requestUpdate();
    window.setTimeout(() => this.requestUpdate(), GUESS_MS + 50);
  }

  render() {
    const { ctx } = this;
    const id = (this.widget.config.entity as string) ?? "";
    const e = seen(ctx.hass.states[id]);
    const on = isActive(e);
    const vertical = ctx.narrow || this.widget.h >= 3 || this.widget.w <= 2;
    return html`
      <div
        class="tile glass pressable ${vertical ? "vertical" : ""} ${on ? "on" : ""} ${!e || e.state === "unavailable" ? "off-line" : ""}"
        style=${toneStyle(e)}
        role="button"
        tabindex="0"
        aria-pressed=${on}
      >
        ${this.dim !== undefined
          ? html`<div class="dim" style="transform:scaleX(${this.dim / 100});--from:${this.ctx.rtl ? "right" : "left"}"></div><b class="dimv ltr">${this.dim}%</b>`
          : ""}
        ${on ? html`<span class="ring" aria-hidden="true"><i></i></span>` : ""}
        ${this.renderLeft(id, on)}
        <span class="ic"><sn-icon class=${livingClass(e)} .icon=${entityIcon(e, id)}></sn-icon></span>
        <span class="text">
          <span class="name">${entityName(ctx.hass, ctx.config, id)}</span>
          <span class="state">${rolling(stateLabel(ctx.t, e, ctx.lang))}</span>
        </span>
      </div>
    `;
  }
}
