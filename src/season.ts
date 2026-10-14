import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Settings } from "./types";

export type Season = "ramadan" | "eid" | null;

/** Hijri date from the browser's Umm al-Qura calendar: Ramadan is month 9; Eid al-Fitr 1–3 Shawwal, Eid al-Adha 10–13 Dhu al-Hijjah. */
export function hijri(now = new Date()): { month: number; day: number } | undefined {
  try {
    const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn", { month: "numeric", day: "numeric" }).formatToParts(now);
    const month = Number(parts.find((p) => p.type === "month")?.value);
    const day = Number(parts.find((p) => p.type === "day")?.value);
    return month && day ? { month, day } : undefined;
  } catch {
    return undefined;
  }
}

export function currentSeason(s: Settings, now = new Date()): Season {
  if (s.season === "off") return null;
  if (s.season === "ramadan" || s.season === "eid") return s.season;
  const h = hijri(now);
  if (!h) return null;
  if (h.month === 9) return "ramadan";
  if ((h.month === 10 && h.day <= 3) || (h.month === 12 && h.day >= 10 && h.day <= 13)) return "eid";
  return null;
}

const lantern = (x: number, len: number, delay: number, scale: number) => svg`<g style="transform-origin:${x}px 0;animation:sn-sway 4.5s cubic-bezier(0.77,0,0.175,1) ${delay}s infinite alternate">
  <line x1=${x} y1="0" x2=${x} y2=${len} stroke="#E9971D" stroke-opacity=".7" stroke-width="1.2"></line>
  <g transform="translate(${x} ${len}) scale(${scale})">
    <path d="M-10 0h20l-3 6h-14z" fill="#B87410"></path>
    <path d="M-12 6h24l-4 26h-16z" fill="#E9971D" fill-opacity=".9"></path>
    <path d="M-7 10h14l-2 18h-10z" fill="#FFE2A8"></path>
    <path d="M-8 32h16l-5 6h-6z" fill="#B87410"></path>
    <circle cx="0" cy="19" r="9" fill="#FFD27A" opacity=".35" style="animation:sn-flicker 2.6s ease-in-out ${delay}s infinite alternate"></circle>
  </g>
</g>`;

/** Decorative layer: hanging lanterns and a crescent for Ramadan, bunting for Eid. Never blocks taps. */
@customElement("sn-season")
export class SnSeason extends LitElement {
  @property() season: Season = null;
  /** Inside a card (corner decoration) rather than across the top of the screen. */
  @property({ type: Boolean, reflect: true }) inline = false;

  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 150px;
      z-index: 71; /* over the screensaver; never takes taps */
      pointer-events: none;
      overflow: hidden;
    }
    :host([inline]) {
      position: absolute;
      top: 0;
      left: auto;
      right: auto;
      inset-inline-end: 8px;
      width: 150px;
      height: 120px;
      z-index: 0;
    }
    svg {
      width: 100%;
      height: 100%;
    }
    @keyframes sn-sway {
      from {
        transform: rotate(-3deg);
      }
      to {
        transform: rotate(3deg);
      }
    }
    @keyframes sn-flicker {
      to {
        opacity: 0.6;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      * {
        animation: none !important;
      }
    }
  `;

  render() {
    if (!this.season) return nothing;
    if (this.season === "ramadan" && this.inline)
      return html`<svg viewBox="0 0 150 120" aria-hidden="true">
        ${lantern(40, 30, 0, 0.9)} ${lantern(95, 55, 0.7, 1.1)} ${lantern(132, 22, 1.3, 0.7)}
      </svg>`;
    if (this.season === "eid" && this.inline)
      return html`<svg viewBox="0 0 150 120" aria-hidden="true">
        ${["#E9971D", "#2FB57A", "#18BCF2", "#F26B68", "#E9971D"].map(
          (c, i) => svg`<path d="M${10 + i * 28} ${6 + Math.sin((i / 4) * Math.PI) * 10} l26 2 l-13 24 z" fill=${c} opacity=".85"
            style="transform-origin:${10 + i * 28}px 6px;animation:sn-sway 3.5s cubic-bezier(0.77,0,0.175,1) ${i * 0.3}s infinite alternate"></path>`
        )}
      </svg>`;
    if (this.season === "ramadan")
      return html`<svg viewBox="0 0 1200 150" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
        ${lantern(90, 70, 0, 1)} ${lantern(230, 40, 0.8, 0.8)} ${lantern(970, 50, 0.4, 0.9)} ${lantern(1110, 85, 1.2, 1.1)}
        ${svg`<g transform="translate(1040 34)"><circle r="16" fill="#F5D9A0"></circle><circle cx="7" cy="-4" r="14" fill="var(--bg, #151A1E)"></circle></g>`}
        ${[160, 300, 900, 1180, 60].map((x, i) => svg`<circle cx=${x} cy=${18 + (i % 3) * 14} r="1.6" fill="#F5D9A0" style="animation:sn-flicker 2s ease-in-out ${i * 0.4}s infinite alternate"></circle>`)}
      </svg>`;
    // Eid: a bunting of triangles in brand colours.
    const flags = Array.from({ length: 24 }, (_, i) => {
      const x = 20 + i * 50;
      const y = 8 + Math.sin((i / 23) * Math.PI) * 26;
      const c = ["#E9971D", "#2FB57A", "#18BCF2", "#F26B68"][i % 4];
      return svg`<path d="M${x - 14} ${y} L${x + 14} ${y + 2} L${x} ${y + 28} Z" fill=${c} opacity=".85"
        style="transform-origin:${x}px ${y}px;animation:sn-sway 3.5s cubic-bezier(0.77,0,0.175,1) ${(i % 5) * 0.3}s infinite alternate"></path>`;
    });
    return html`<svg viewBox="0 0 1200 150" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <path d="M0 8 Q600 70 1200 8" fill="none" stroke="#E9971D" stroke-opacity=".5" stroke-width="1.5"></path>
      ${flags}
    </svg>`;
  }
}
