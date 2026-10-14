import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { formatNumber } from "../entities";
import { LOCALE } from "../i18n";
import type { Lang } from "../types";

interface Pt {
  t: number; // epoch s
  v: number;
}

/**
 * A day of a sensor as a smooth line with a soft gradient under it. Slide a finger along it to read any moment:
 * a dot rides the line and a bubble shows the value and the time.
 */
@customElement("sn-chart")
export class SnChart extends LitElement {
  @property({ attribute: false }) points: Pt[] = [];
  @property() unit = "";
  @property() lang: Lang = "ar";
  @property() color = "var(--accent)";
  @state() private at?: number; // 0..1 across the chart

  static styles = css`
    :host {
      display: block;
      position: relative;
      touch-action: pan-y;
    }
    svg {
      display: block;
      width: 100%;
      height: 120px;
      overflow: visible;
    }
    .bubble {
      position: absolute;
      top: -6px;
      translate: -50% -100%;
      padding: 4px 10px;
      border-radius: 10px;
      background: var(--surface-solid);
      box-shadow: var(--shadow);
      font-size: 13px;
      white-space: nowrap;
      direction: ltr;
      pointer-events: none;
    }
    .bubble b {
      font-size: 15px;
    }
    .bubble span {
      color: var(--text-2);
      margin-left: 6px;
    }
    .axis {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: var(--text-2);
      direction: ltr;
      margin-top: 4px;
    }
  `;

  /** Catmull-Rom through the points, drawn as cubic Béziers: smooth, but it still passes through every reading. */
  private smooth(xy: [number, number][]) {
    if (xy.length < 2) return "";
    let d = `M${xy[0][0]} ${xy[0][1]}`;
    for (let i = 0; i < xy.length - 1; i++) {
      const p0 = xy[i - 1] ?? xy[i];
      const p1 = xy[i];
      const p2 = xy[i + 1];
      const p3 = xy[i + 2] ?? p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]}`;
    }
    return d;
  }

  render() {
    const pts = this.points;
    if (pts.length < 2) return nothing;
    const t0 = pts[0].t;
    const t1 = Math.max(pts[pts.length - 1].t, Date.now() / 1000);
    const vs = pts.map((p) => p.v);
    const lo = Math.min(...vs);
    const hi = Math.max(...vs);
    const pad = (hi - lo || 1) * 0.15;
    const X = (tt: number) => ((tt - t0) / (t1 - t0 || 1)) * 300;
    const Y = (v: number) => 110 - ((v - (lo - pad)) / (hi - lo + pad * 2 || 1)) * 100;
    // Thin out dense histories so the curve stays calm.
    const step = Math.max(1, Math.floor(pts.length / 80));
    const xy = pts.filter((_, i) => i % step === 0 || i === pts.length - 1).map((p) => [X(p.t), Y(p.v)] as [number, number]);
    xy.push([300, xy[xy.length - 1][1]]);
    const line = this.smooth(xy);
    const id = `g${Math.random().toString(36).slice(2, 7)}`;
    let hover;
    if (this.at !== undefined) {
      const tt = t0 + this.at * (t1 - t0);
      const p = pts.reduce((best, q) => (Math.abs(q.t - tt) < Math.abs(best.t - tt) ? q : best), pts[0]);
      hover = { x: X(p.t), y: Y(p.v), p };
    }
    const time = (s: number) => new Date(s * 1000).toLocaleTimeString(LOCALE[this.lang], { hour: "2-digit", minute: "2-digit" });
    return html`<svg
        viewBox="0 0 300 120"
        preserveAspectRatio="none"
        @pointermove=${(e: PointerEvent) => {
          const r = (e.currentTarget as SVGElement).getBoundingClientRect();
          this.at = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
        }}
        @pointerleave=${() => (this.at = undefined)}
        @pointerup=${(e: PointerEvent) => e.pointerType !== "mouse" && window.setTimeout(() => (this.at = undefined), 1500)}
      >
        ${svg`<defs><linearGradient id=${id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color=${this.color} stop-opacity=".35"></stop>
            <stop offset="1" stop-color=${this.color} stop-opacity="0"></stop>
          </linearGradient></defs>
          <path d="${line} L300 120 L0 120 Z" fill="url(#${id})"></path>
          <path d=${line} fill="none" stroke=${this.color} stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-linecap="round"></path>
          ${hover
            ? svg`<line x1=${hover.x} x2=${hover.x} y1="0" y2="120" stroke="var(--text-2)" stroke-dasharray="2 3" vector-effect="non-scaling-stroke"></line>
                <circle cx=${hover.x} cy=${hover.y} r="4" fill=${this.color} stroke="var(--surface-solid)" stroke-width="2" vector-effect="non-scaling-stroke"></circle>`
            : ""}`}
      </svg>
      ${hover
        ? html`<div class="bubble" style="left:${(hover.x / 300) * 100}%"><b>${formatNumber(hover.p.v, this.lang)} ${this.unit}</b><span>${time(hover.p.t)}</span></div>`
        : nothing}
      <div class="axis"><span>${time(t0)}</span><span>${formatNumber(lo, this.lang)}–${formatNumber(hi, this.lang)} ${this.unit}</span><span>${time(t1)}</span></div>`;
  }
}
