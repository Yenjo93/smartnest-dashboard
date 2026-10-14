import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import type { Ctx } from "./ctx";
import { LOCALE } from "./i18n";
import { shortValue } from "./entities";
import { shared } from "./theme";
import { currentSeason } from "./season";
import "./season";

interface Slide {
  url: string;
  key: number;
  origin: string;
}

// Ken Burns: each photo drifts toward a different corner so consecutive slides don't feel the same.
const ORIGINS = ["20% 30%", "80% 25%", "70% 80%", "25% 75%", "50% 50%"];

/**
 * Wall-tablet idle screen. With family photos in HA's Media folder it becomes a photo frame
 * (slow zoom, cross-fade, clock in the corner); without them it's the brand clock on charcoal and gold.
 * The clock drifts a little every minute so a tablet left on all day doesn't burn in.
 */
@customElement("sn-screensaver")
export class SnScreensaver extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) onWake!: () => void;
  @state() private now = new Date();
  @state() private drift = { x: 0, y: 0 };
  @state() private slides: Slide[] = [];
  private photos: string[] = [];
  private photoIdx = 0;
  private timer?: number;
  private photoTimer?: number;
  private alive = false;

  static styles = [
    shared,
    css`
      .ss {
        position: fixed;
        inset: 0;
        z-index: 70;
        color: #fff;
        background: radial-gradient(60% 70% at var(--gx, 30%) var(--gy, 55%), rgba(233, 151, 29, 0.22), rgba(233, 151, 29, 0) 70%), #1e252b;
        display: grid;
        place-items: center;
        cursor: none;
        overflow: hidden;
        animation: fade 900ms var(--ease-out);
      }
      .center {
        display: grid;
        justify-items: center;
        gap: 10px;
        transition: transform 4s var(--ease-out);
      }
      .time {
        font-size: clamp(96px, 18vw, 220px);
        font-weight: 700;
        line-height: 0.95;
        letter-spacing: -0.03em;
        font-variant-numeric: tabular-nums;
      }
      .date {
        font-size: clamp(20px, 2.6vw, 30px);
        color: #9aa4ad;
      }
      .temp {
        font-size: clamp(28px, 3.4vw, 40px);
        font-weight: 500;
        color: #e9971d;
      }
      .brand {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 0.7;
        font-size: 14px;
        color: #9aa4ad;
        white-space: nowrap;
      }
      .brand img {
        width: 28px;
        height: 28px;
      }
      /* Photo frame */
      .photo {
        position: absolute;
        inset: 0;
        background: center / cover no-repeat;
        animation: in 2s var(--ease-out) both, kenburns var(--dur) linear both;
      }
      .photo.out {
        animation: out 2s var(--ease-in) both;
      }
      .shade {
        position: absolute;
        inset: auto 0 0 0;
        height: 55%;
        background: linear-gradient(to top, rgba(10, 12, 14, 0.75), transparent);
      }
      .corner {
        position: absolute;
        bottom: 48px;
        inset-inline-start: 56px;
        display: grid;
        gap: 6px;
        text-shadow: 0 2px 16px rgba(0, 0, 0, 0.45);
        transition: transform 4s var(--ease-out);
      }
      .corner .time {
        font-size: clamp(64px, 10vw, 128px);
      }
      .corner .date {
        color: rgba(255, 255, 255, 0.85);
      }
      .photos .brand {
        left: auto;
        transform: none;
        inset-inline-end: 56px;
        bottom: 56px;
        opacity: 0.85;
      }
      @media (max-width: 700px) {
        .corner {
          inset-inline-start: 24px;
          bottom: 28px;
        }
        .photos .brand span {
          display: none;
        }
        .photos .brand {
          inset-inline-end: 24px;
          bottom: 28px;
        }
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @keyframes in {
        from {
          opacity: 0;
        }
      }
      @keyframes out {
        to {
          opacity: 0;
        }
      }
      @keyframes kenburns {
        from {
          transform: scale(1);
        }
        to {
          transform: scale(1.12);
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.alive = true;
    this.timer = window.setInterval(() => {
      this.now = new Date();
      if (this.now.getSeconds() < 10) this.drift = { x: Math.round(Math.random() * 60 - 30), y: Math.round(Math.random() * 40 - 20) };
    }, 10_000);
    this.loadPhotos();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.alive = false;
    window.clearInterval(this.timer);
    window.clearTimeout(this.photoTimer);
  }

  private async loadPhotos() {
    const s = this.ctx.config.settings.screensaver;
    if (!s.photos || !this.ctx.allows("photo_frame")) return;
    try {
      const res = await this.ctx.hass.callWS<{ children?: { media_class: string; media_content_id: string }[] }>({
        type: "media_source/browse_media",
        // A folder name means HA's local media; a full media-source:// address can point at Google Photos, Immich, etc.
        media_content_id: s.photo_folder.startsWith("media-source://") ? s.photo_folder : `media-source://media_source/local/${s.photo_folder}`,
      });
      this.photos = (res.children ?? []).filter((c) => c.media_class === "image").map((c) => c.media_content_id);
    } catch {
      this.photos = []; // folder missing or media source off: keep the clock
    }
    // Shuffle, so the family doesn't see the same order every evening.
    for (let i = this.photos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.photos[i], this.photos[j]] = [this.photos[j], this.photos[i]];
    }
    if (this.photos.length) this.next();
  }

  /** Resolves a fresh signed URL right before showing it (they expire), preloads it, then cross-fades. */
  private async next() {
    if (!this.alive || !this.photos.length) return;
    const id = this.photos[this.photoIdx++ % this.photos.length];
    const secs = Math.max(5, this.ctx.config.settings.screensaver.photo_seconds);
    try {
      const { url } = await this.ctx.hass.callWS<{ url: string }>({ type: "media_source/resolve_media", media_content_id: id });
      const full = this.ctx.hass.hassUrl(url);
      await new Promise<void>((ok, fail) => {
        const img = new Image();
        img.onload = () => ok();
        img.onerror = () => fail();
        img.src = full;
      });
      if (!this.alive) return;
      const slide = { url: full, key: Date.now(), origin: ORIGINS[this.photoIdx % ORIGINS.length] };
      // Keep the previous slide underneath while the new one fades in.
      this.slides = [...this.slides.slice(-1), slide];
    } catch {
      /* skip a broken photo */
    }
    this.photoTimer = window.setTimeout(() => this.next(), secs * 1000);
  }

  private renderClock(loc: string, corner: boolean) {
    const { ctx } = this;
    const tempId = ctx.config.settings.screensaver.temp_entity;
    const temp = tempId ? ctx.hass.states[tempId] : undefined;
    return html`<div class=${corner ? "corner" : "center"} style="transform:translate(${this.drift.x}px, ${this.drift.y}px)">
      <div class="time ltr">${this.now.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" })}</div>
      <div class="date">${this.now.toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "long" })}</div>
      ${temp ? html`<div class="temp ltr">${shortValue(ctx.t, temp, ctx.lang)}</div>` : nothing}
    </div>`;
  }

  render() {
    const { ctx } = this;
    const loc = LOCALE[ctx.lang];
    const photos = this.slides.length > 0;
    const secs = Math.max(5, ctx.config.settings.screensaver.photo_seconds) + 2;
    return html`<div
      class="ss ${photos ? "photos" : ""}"
      style="--gx:${30 + this.drift.x / 2}%;--gy:${55 + this.drift.y / 2}%"
      @click=${(e: Event) => {
        // Wake on click (down and up both land here) so the touch can't fall through to a tile underneath.
        e.stopPropagation();
        this.onWake();
      }}
    >
      ${repeat(
        this.slides,
        (s) => s.key,
        (s, i) => html`<div
          class="photo ${i < this.slides.length - 1 ? "out" : ""}"
          style="background-image:url('${s.url}');transform-origin:${s.origin};--dur:${secs}s"
        ></div>`
      )}
      ${photos ? html`<div class="shade"></div>` : nothing} ${this.renderClock(loc, photos)}
      ${ctx.allows("seasons") ? html`<sn-season .season=${currentSeason(ctx.config.settings, this.now)}></sn-season>` : nothing}
      <div class="brand">
        <img src="${ctx.assetBase}logo/smartnest-symbol-white.svg" alt="" />
        <span>SmartNest${photos ? "" : html` · ${ctx.t("tagline")}`}</span>
      </div>
    </div>`;
  }
}
