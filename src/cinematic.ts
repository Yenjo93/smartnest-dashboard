import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import type { I18nKey } from "./i18n";
import { domainOf, entityName } from "./entities";
import { shared } from "./theme";
import "./ui/icon";

const TEXT: Record<string, I18nKey> = { away: "scene_away", home: "scene_home", sleep: "scene_sleep", evening: "scene_evening", cinema: "scene_cinema" };
const LENGTH: Record<string, number> = { away: 4200, home: 3000, sleep: 3800, evening: 3000, cinema: 3200 };

/** Locks shown in the "away" scene: the ones placed on the dashboard, else every lock in the house. */
function dashboardLocks(ctx: Ctx): string[] {
  const placed = new Set<string>();
  for (const p of ctx.config.pages)
    for (const w of p.widgets) {
      if (w.config.entity) placed.add(w.config.entity);
      for (const f of w.config.floors ?? []) for (const m of f.markers ?? []) placed.add(m.entity);
    }
  const onBoard = [...placed].filter((id) => domainOf(id) === "lock" && ctx.hass.states[id]);
  return (onBoard.length ? onBoard : Object.keys(ctx.hass.states).filter((id) => domainOf(id) === "lock")).slice(0, 4);
}

/**
 * A few seconds of theatre after a house mode: the moon rises for Sleep, the locks click shut one by one
 * for Away, warm light floods in for Home and Evening. Tap anywhere to skip.
 */
@customElement("sn-cinematic")
export class SnCinematic extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property() mode = "";
  @property({ attribute: false }) onDone!: () => void;
  private timer?: number;
  private locks: string[] = [];

  static styles = [
    shared,
    css`
      .stage {
        position: fixed;
        inset: 0;
        z-index: 85;
        display: grid;
        place-items: center;
        color: #fff;
        overflow: hidden;
        animation: stage var(--len) var(--ease-out) both;
      }
      @keyframes stage {
        0% {
          opacity: 0;
        }
        12% {
          opacity: 1;
        }
        84% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      .title {
        position: relative;
        font-size: clamp(34px, 6vw, 64px);
        font-weight: 700;
        letter-spacing: -0.01em;
        text-align: center;
        animation: title 1.4s var(--ease-out) 0.5s both;
        text-shadow: 0 4px 30px rgba(0, 0, 0, 0.35);
      }
      @keyframes title {
        from {
          opacity: 0;
          transform: translateY(18px);
          filter: blur(6px);
        }
      }
      .content {
        display: grid;
        justify-items: center;
        gap: 28px;
        position: relative;
      }

      /* Sleep: night sky, rising moon, stars */
      .sleep {
        background: radial-gradient(120% 90% at 50% 110%, #2a3550 0%, #121826 45%, #07090f 100%);
      }
      .moon {
        position: absolute;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 35%, #fff8e6, #f5d9a0 60%, #e9b866);
        box-shadow: 0 0 80px 20px rgba(245, 217, 160, 0.35);
        top: 18%;
        inset-inline-end: 18%;
        animation: rise 2.6s var(--ease-out) both;
      }
      .moon::after {
        /* crescent shadow */
        content: "";
        position: absolute;
        inset: -14px -34px 18px 44px;
        border-radius: 50%;
        background: #131a29;
      }
      @keyframes rise {
        from {
          transform: translateY(60vh);
          opacity: 0;
        }
      }
      .star {
        position: absolute;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: #fff;
        animation: twinkle 2.2s ease-in-out infinite alternate both;
      }
      @keyframes twinkle {
        from {
          opacity: 0;
        }
        to {
          opacity: 0.9;
        }
      }

      /* Away: charcoal, locks clicking shut */
      .away {
        background: radial-gradient(70% 70% at 50% 40%, #2a333b, #151a1e);
      }
      .locks {
        display: grid;
        gap: 10px;
        min-width: min(360px, 80vw);
      }
      .lock {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 12px 16px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.06);
        font-size: 17px;
        font-weight: 500;
        animation: row 500ms var(--ease-out) both;
      }
      @keyframes row {
        from {
          opacity: 0;
          transform: translateY(12px);
        }
      }
      .lock .ic {
        display: grid;
        place-items: center;
        width: 40px;
        height: 40px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.1);
        --icon-size: 22px;
        animation: shut 400ms var(--spring) both;
        animation-delay: inherit;
      }
      .lock .ok {
        margin-inline-start: auto;
        color: #2fb57a;
        --icon-size: 24px;
        animation: pop 420ms var(--spring) both;
      }
      @keyframes shut {
        from {
          transform: rotate(-20deg) scale(0.8);
        }
      }
      @keyframes pop {
        from {
          transform: scale(0);
          opacity: 0;
        }
      }
      .sub {
        color: #9aa4ad;
        font-size: 15px;
      }

      /* Home: sunrise */
      .home {
        background: #1e252b;
      }
      .home::before,
      .evening::before {
        content: "";
        position: absolute;
        inset: -40%;
        background: radial-gradient(circle at 50% 60%, rgba(255, 190, 90, 0.95) 0%, rgba(233, 151, 29, 0.55) 25%, rgba(30, 37, 43, 0) 60%);
        animation: bloom 2.6s var(--ease-out) both;
      }
      @keyframes bloom {
        from {
          transform: scale(0.2);
          opacity: 0;
        }
      }
      /* Evening: amber dims in from the edges */
      .evening {
        background: #120d08;
      }
      .evening::before {
        background: radial-gradient(circle at 50% 70%, rgba(255, 160, 70, 0.6) 0%, rgba(150, 90, 0, 0.35) 30%, rgba(18, 13, 8, 0) 65%);
      }
      /* Cinema: lights go down, a projector beam opens from above */
      .cinema {
        background: #050608;
      }
      .cinema::before {
        content: "";
        position: absolute;
        top: -10%;
        left: 50%;
        width: 140vmax;
        height: 120vh;
        transform: translateX(-50%);
        background: conic-gradient(from 165deg at 50% 0%, transparent 0deg, rgba(255, 236, 200, 0.22) 15deg, rgba(255, 236, 200, 0.05) 30deg, transparent 30deg);
        animation: beam 2.4s cubic-bezier(0.77, 0, 0.175, 1) both;
      }
      @keyframes beam {
        from {
          opacity: 0;
          transform: translateX(-50%) scaleX(0.2);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .moon,
        .lock,
        .title {
          animation: none;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.locks = this.mode === "away" ? dashboardLocks(this.ctx) : [];
    this.timer = window.setTimeout(() => this.onDone(), LENGTH[this.mode] ?? 3000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this.timer);
  }

  private renderSleep() {
    // Fixed pseudo-random positions so the sky doesn't reshuffle on every render.
    const stars = Array.from({ length: 40 }, (_, i) => ({ x: (i * 137.5) % 100, y: (i * 61.8) % 60, d: (i % 7) * 0.25 }));
    return html`<div class="moon"></div>
      ${stars.map((s) => html`<span class="star" style="left:${s.x}%;top:${s.y}%;animation-delay:${0.6 + s.d}s"></span>`)}`;
  }

  private renderAway() {
    const { ctx } = this;
    if (!this.locks.length) return nothing;
    return html`<div class="locks">
      ${this.locks.map((id, i) => {
        const delay = `${0.9 + i * 0.45}s`;
        return html`<div class="lock" style="animation-delay:${delay}">
          <span class="ic" style="animation-delay:${delay}"><sn-icon icon="lock"></sn-icon></span>
          ${entityName(ctx.hass, ctx.config, id)}
          <sn-icon class="ok" icon="check-circle" style="animation-delay:calc(${delay} + 0.35s)"></sn-icon>
        </div>`;
      })}
    </div>`;
  }

  render() {
    const { t } = this.ctx;
    return html`<div
      class="stage ${this.mode}"
      style="--len:${LENGTH[this.mode] ?? 3000}ms"
      role="status"
      @click=${() => this.onDone()}
    >
      ${this.mode === "sleep" ? this.renderSleep() : nothing}
      <div class="content">
        <div class="title">${this.mode === "cinema" ? "🍿 " : ""}${t(TEXT[this.mode] ?? "done")}</div>
        ${this.mode === "away" ? html`${this.locks.length ? html`<div class="sub">${t("scene_locking")}</div>` : nothing}${this.renderAway()}` : nothing}
      </div>
    </div>`;
  }
}
