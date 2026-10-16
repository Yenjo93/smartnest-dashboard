import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import type { ActiveOccasion, OccasionTheme } from "./occasions";
import type { I18nKey } from "./i18n";
import { prayerTimes } from "./widgets/prayer";
import { haptic } from "./ui/haptic";

/**
 * The day's greeting across the top of the page: a birthday with the person's photo, name and age; Ramadan with the
 * time left to iftar; the Eids, Arafah, the Hijri new year… Can be put away for the day.
 */
@customElement("sn-occbanner")
export class SnOccBanner extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) occ!: ActiveOccasion;
  @property({ attribute: false }) theme!: OccasionTheme;
  @state() private now = Date.now();
  private tick?: number;

  static styles = css`
    :host {
      display: block;
      margin-bottom: 16px;
    }
    .b {
      position: relative;
      display: flex;
      align-items: center;
      gap: 18px;
      padding: 18px 22px;
      border-radius: var(--r-xl, 28px);
      overflow: hidden;
      color: #fff;
      background: linear-gradient(120deg, color-mix(in srgb, var(--a) 85%, #000) 0%, color-mix(in srgb, var(--a) 60%, #1a1030) 100%);
      box-shadow: 0 18px 50px -18px var(--a), inset 0 1px 0 rgba(255, 255, 255, 0.25);
      animation: in 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .b::before {
      content: "";
      position: absolute;
      inset: -40% -10%;
      background: radial-gradient(closest-side, rgba(255, 255, 255, 0.35), transparent);
      transform: translateX(-60%);
      animation: sheen 6s ease-in-out infinite;
      animation-play-state: var(--loops, running);
    }
    .emoji {
      font-size: 54px;
      line-height: 1;
      flex: none;
      filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
      animation: bob 3s ease-in-out infinite;
      animation-play-state: var(--loops, running);
    }
    .pic {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: center / cover;
      box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.85);
      flex: none;
    }
    .t {
      flex: 1;
      display: grid;
      gap: 4px;
      position: relative;
    }
    .t b {
      font-size: clamp(22px, 3.2vw, 32px);
      font-weight: var(--display-weight, 800);
      letter-spacing: var(--display-track, 0);
    }
    .t span {
      font-size: 16px;
      opacity: 0.9;
    }
    button {
      position: relative;
      border: 0;
      background: rgba(255, 255, 255, 0.18);
      color: #fff;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 16px;
      flex: none;
    }
    @keyframes in {
      from {
        opacity: 0;
        transform: translateY(-16px) scale(0.96);
      }
    }
    @keyframes sheen {
      50% {
        transform: translateX(60%);
      }
    }
    @keyframes bob {
      50% {
        transform: translateY(-6px) rotate(-4deg);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .b,
      .b::before,
      .emoji {
        animation: none;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.tick = window.setInterval(() => (this.now = Date.now()), 30_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.tick);
  }

  private get key() {
    return `smartnest-occ-hide-${new Date().toDateString()}-${this.occ.kind}-${this.occ.name ?? ""}`;
  }

  /** Ramadan: how long to iftar (Maghrib from the Islamic Prayer Times integration). */
  private iftar(): string | undefined {
    const m = prayerTimes(this.ctx).find((p) => p.name === "maghrib");
    if (!m || m.at < this.now) return undefined;
    const left = Math.round((m.at - this.now) / 60_000);
    return this.ctx.t("occ_iftar_in", { t: left >= 60 ? `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}` : this.ctx.t("min_short", { n: left }) });
  }

  render() {
    try {
      if (localStorage.getItem(this.key)) return nothing;
    } catch {
      /* fine */
    }
    const { ctx, occ, theme } = this;
    const { t, hass } = ctx;
    const pic = occ.person ? (hass.states[occ.person]?.attributes.entity_picture as string | undefined) : undefined;
    const title =
      occ.kind === "birthday"
        ? t("occ_bday_title", { name: occ.name ?? "" })
        : occ.kind === "anniversary"
        ? t("occ_anniv_title", { name: occ.name ?? "" })
        : occ.kind === "custom"
        ? occ.name ?? ""
        : t(`occ_${occ.kind}` as I18nKey);
    const sub =
      occ.kind === "birthday" && occ.years !== undefined
        ? t("occ_bday_age", { n: occ.years })
        : occ.kind === "anniversary" && occ.years !== undefined
        ? t("occ_anniv_years", { n: occ.years })
        : occ.kind === "ramadan"
        ? this.iftar() ?? t("occ_ramadan_sub")
        : occ.kind === "hijri_new_year"
        ? t("occ_hijri_sub", { y: new Intl.DateTimeFormat("ar-u-ca-islamic-umalqura-nu-latn", { year: "numeric" }).format(new Date()).replace(/[^0-9]/g, "") })
        : occ.kind === "new_year"
        ? String(new Date().getFullYear())
        : ["birthday", "anniversary", "custom"].includes(occ.kind)
        ? ""
        : t(`occ_${occ.kind}_sub` as I18nKey);
    return html`<div class="b" style="--a:${theme.accent}" role="status" @click=${() => haptic("success")}>
      ${pic ? html`<span class="pic" style="background-image:url('${hass.hassUrl(pic)}')"></span>` : html`<span class="emoji">${theme.emoji}</span>`}
      <span class="t"><b>${title}</b>${sub ? html`<span>${sub}</span>` : nothing}</span>
      <button
        aria-label=${t("close")}
        @click=${(e: Event) => {
          e.stopPropagation();
          try {
            localStorage.setItem(this.key, "1");
          } catch {
            /* fine */
          }
          this.requestUpdate();
        }}
      >
        ✕
      </button>
    </div>`;
  }
}
