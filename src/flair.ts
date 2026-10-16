// The little touches that make SmartNest feel like it lives in the house: welcome moments, the sun's arc,
// a family monogram, seasonal skies, and a ripple of light when a lamp comes on.
import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import type { Hass, HassEntity } from "./types";
import { LOCALE } from "./i18n";
import { shared } from "./theme";

// ---- welcome home ----

/** Someone just got home: their photo, a warm hello, and a soft light behind them. Goes away by itself. */
@customElement("sn-welcome")
export class SnWelcome extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) person!: HassEntity;
  @property({ attribute: false }) onDone!: () => void;
  private timer?: number;

  static styles = [
    shared,
    css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 55;
        display: grid;
        place-items: center;
        background: radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--accent) 35%, transparent), var(--scrim) 70%);
        -webkit-backdrop-filter: var(--glass-filter, blur(12px));
        backdrop-filter: var(--glass-filter, blur(12px));
        animation: fade 500ms ease;
      }
      .card {
        display: grid;
        justify-items: center;
        gap: 14px;
        text-align: center;
        color: var(--text);
        animation: rise 800ms cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .pic {
        width: 132px;
        height: 132px;
        border-radius: 50%;
        background: var(--surface-2) center / cover;
        display: grid;
        place-items: center;
        font: 800 48px var(--font);
        box-shadow: 0 0 0 6px var(--surface-solid), 0 0 60px 10px color-mix(in srgb, var(--accent) 60%, transparent);
      }
      h1 {
        margin: 0;
        font-size: clamp(32px, 6vw, 56px);
        font-weight: var(--display-weight, 800);
        letter-spacing: var(--display-track, 0);
      }
      p {
        margin: 0;
        color: var(--text-2);
        font-size: 18px;
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @keyframes rise {
        from {
          opacity: 0;
          transform: translateY(30px) scale(0.85);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host,
        .card {
          animation: none;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.timer = window.setTimeout(() => this.onDone(), 6000);
    this.addEventListener("click", () => this.onDone());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this.timer);
  }

  render() {
    const { t, hass } = this.ctx;
    const name = this.person.attributes.friendly_name ?? "";
    const pic = this.person.attributes.entity_picture as string | undefined;
    return html`<div class="card" role="status">
      <div class="pic" style=${pic ? `background-image:url('${hass.hassUrl(pic)}')` : ""}>${pic ? "" : name.slice(0, 1)}</div>
      <h1>${t("welcome_home", { name })} 👋</h1>
      <p>${new Date().toLocaleTimeString(LOCALE[this.ctx.lang], { hour: "2-digit", minute: "2-digit" })}</p>
    </div>`;
  }
}

// ---- the sun's arc ----

/** Where the sun (or moon) is today, on a small arc, with sunrise and sunset under it. */
@customElement("sn-sunarc")
export class SnSunArc extends LitElement {
  @property({ attribute: false }) hass!: Hass;
  @property() lang = "ar";

  static styles = css`
    :host {
      display: inline-grid;
      justify-items: center;
      line-height: 1;
    }
    svg {
      width: 64px;
      height: 26px;
      overflow: visible;
    }
    .times {
      display: flex;
      gap: 10px;
      font-size: 9px;
      color: var(--text-2);
      direction: ltr;
      margin-top: 2px;
    }
  `;

  render() {
    const sun = this.hass.states["sun.sun"];
    if (!sun) return nothing;
    const rise = Date.parse(sun.attributes.next_rising);
    const set = Date.parse(sun.attributes.next_setting);
    const now = Date.now();
    // During the day next_setting is today and next_rising is tomorrow.
    const day = sun.state === "above_horizon";
    const start = day ? rise - 86_400_000 : set - 86_400_000;
    const end = day ? set : rise;
    const f = Math.min(1, Math.max(0, (now - start) / (end - start || 1)));
    const a = Math.PI * (1 - f);
    const x = 32 + 28 * Math.cos(a);
    const y = 24 - 20 * Math.sin(a);
    const fmt = (ms: number) => new Date(ms).toLocaleTimeString(LOCALE[this.lang as "ar"] ?? "ar", { hour: "2-digit", minute: "2-digit" });
    return html`<svg viewBox="0 0 64 26" aria-label=${day ? "sun" : "moon"}>
        ${svg`<path d="M4 24 A28 20 0 0 1 60 24" fill="none" stroke="var(--text-2)" stroke-opacity=".35" stroke-width="1.2" stroke-dasharray="2 2.5"></path>
        <line x1="0" x2="64" y1="24.5" y2="24.5" stroke="var(--text-2)" stroke-opacity=".3" stroke-width=".8"></line>
        ${day
          ? svg`<circle cx=${x} cy=${y} r="7" fill="#ffc94d" opacity=".25"></circle><circle cx=${x} cy=${y} r="4" fill="#ffb21f"></circle>`
          : svg`<circle cx=${x} cy=${y} r="4" fill="#dfe6f2"></circle><circle cx=${x + 1.8} cy=${y - 1.4} r="3.4" fill="var(--bg)"></circle>`}`}
      </svg>
      <div class="times"><span>↑${fmt(day ? rise - 86_400_000 : rise)}</span><span>↓${fmt(day ? set : set)}</span></div>`;
  }
}

// ---- family monogram ----

/** A gold seal with the family's initials, instead of the SmartNest mark: every house gets its own crest. */
export function monogram(text: string, size = 40) {
  const words = text.replace(/^(آل|ال|عائلة|عيلة|بيت|the|family)\s+/i, "").trim().split(/\s+/);
  const initials = words.slice(0, 2).map((w) => w.replace(/^ال/, "").slice(0, 1)).join("");
  return html`<svg viewBox="0 0 48 48" width=${size} height=${size} aria-label=${text} role="img">
    ${svg`<defs><linearGradient id="mono-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6d27a"></stop><stop offset=".55" stop-color="#e9971d"></stop><stop offset="1" stop-color="#9b5c0b"></stop></linearGradient></defs>
    <circle cx="24" cy="24" r="22.5" fill="none" stroke="url(#mono-gold)" stroke-width="1.6"></circle>
    <circle cx="24" cy="24" r="19" fill="none" stroke="url(#mono-gold)" stroke-width=".7" stroke-dasharray="1.2 1.6"></circle>
    <circle cx="24" cy="24" r="16.5" fill="color-mix(in srgb, #e9971d 12%, transparent)"></circle>
    <text x="24" y="25" text-anchor="middle" dominant-baseline="middle" font-family="Rubik, sans-serif" font-weight="800" font-size=${initials.length > 1 ? 14 : 18} fill="url(#mono-gold)">${initials}</text>`}
  </svg>`;
}

// ---- seasons ----

export type SkinSeason = "winter" | "summer" | "autumn" | "spring";

export function seasonNow(d = new Date()): SkinSeason {
  const m = d.getMonth();
  return m === 11 || m <= 1 ? "winter" : m <= 4 ? "spring" : m <= 7 ? "summer" : "autumn";
}

/** A light seasonal sky over the dashboard: snow in winter, falling leaves in autumn, petals in spring, heat in summer. */
@customElement("sn-seasonfx")
export class SnSeasonFx extends LitElement {
  @property() season: SkinSeason = "winter";

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 2;
      overflow: hidden;
    }
    i {
      position: absolute;
      top: -20px;
      font-style: normal;
      animation: fall linear infinite;
      animation-play-state: var(--loops, running);
      opacity: 0.75;
    }
    .heat {
      position: absolute;
      inset: auto 0 0 0;
      height: 40vh;
      background: linear-gradient(0deg, rgba(255, 170, 60, 0.12), transparent);
      animation: shimmer 6s ease-in-out infinite alternate;
      animation-play-state: var(--loops, running);
    }
    @keyframes fall {
      to {
        transform: translate(var(--dx), 110vh) rotate(var(--r));
      }
    }
    @keyframes shimmer {
      to {
        opacity: 0.4;
        transform: scaleY(1.1);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host {
        display: none;
      }
    }
  `;

  render() {
    if (this.season === "summer") return html`<div class="heat"></div>`;
    const glyph = this.season === "winter" ? "❄" : this.season === "autumn" ? "🍂" : "🌸";
    const n = this.season === "winter" ? 18 : 9;
    return html`${Array.from({ length: n }, (_, i) => {
      const seed = (i * 37) % 100;
      return html`<i
        style="left:${seed}%;font-size:${this.season === "winter" ? 8 + (i % 4) * 3 : 14 + (i % 3) * 4}px;color:#fff;animation-duration:${14 + (i % 5) * 4}s;animation-delay:-${(i * 2.3) % 18}s;--dx:${(i % 2 ? 1 : -1) * (20 + (i % 4) * 15)}px;--r:${(i % 2 ? 1 : -1) * 200}deg"
        >${glyph}</i
      >`;
    })}`;
  }
}
