import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Floor } from "../types";
import { domainOf, entityIcon, entityName, isActive } from "../entities";
import { centroid, inside, type Pt } from "../geometry";
import "../ui/icon";

const WALL = 9; // wall height, in plan units (the plan is 100 wide)
const COS = Math.cos(Math.PI / 6);
const SIN = Math.sin(Math.PI / 6);

/**
 * The plan as a little 3D house: every drawn room gets a floor and walls, seen from above at an angle (isometric).
 * Rooms with a light on glow in that light's colour, and the devices float above their spot.
 */
@customElement("sn-plan-model")
export class SnPlanModel extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) floor!: Floor;
  /** Image width/height, so rooms keep their real proportions. */
  @property({ type: Number }) ratio = 1.5;
  @state() private size = { w: 0, h: 0 };
  private ro?: ResizeObserver;

  connectedCallback() {
    super.connectedCallback();
    this.ro = new ResizeObserver(([e]) => (this.size = { w: e.contentRect.width, h: e.contentRect.height }));
    this.ro.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.ro?.disconnect();
  }

  static styles = css`
    :host {
      display: grid;
      place-items: center;
      width: 100%;
      height: 100%;
    }
    .box {
      position: relative;
    }
    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
      animation: rise 900ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .wall {
      transition: fill 600ms;
    }
    .floor {
      transition: fill 800ms;
    }
    .pin {
      position: absolute;
      translate: -50% -100%;
      display: grid;
      place-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--surface-solid);
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.3);
      border: 0;
      cursor: pointer;
      color: var(--text-2);
      --icon-size: 17px;
      animation: drop 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }
    .pin.on {
      background: var(--tone, var(--accent));
      color: #fff;
      box-shadow: 0 0 18px var(--tone, var(--accent));
    }
    .pin::after {
      content: "";
      position: absolute;
      top: 100%;
      width: 2px;
      height: 10px;
      background: currentColor;
      opacity: 0.4;
    }
    .label {
      font: 600 2.4px var(--font, sans-serif);
      fill: var(--text);
      text-anchor: middle;
      paint-order: stroke;
      stroke: var(--surface-solid);
      stroke-width: 0.6px;
    }
    @keyframes rise {
      from {
        opacity: 0;
        transform: translateY(14px) scale(0.96);
      }
    }
    @keyframes drop {
      from {
        opacity: 0;
        transform: translateY(-14px);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      svg,
      .pin {
        animation: none;
      }
    }
  `;

  /** Plan point (percent, z up) to the isometric drawing. */
  private iso(p: Pt, z = 0): Pt {
    const x = p[0];
    const y = (p[1] / 100) * (100 / this.ratio);
    return [(x - y) * COS, (x + y) * SIN - z];
  }

  render() {
    const { ctx } = this;
    const { hass, config } = ctx;
    const rooms = this.floor.rooms ?? [];
    if (!rooms.length) return nothing;
    // Light colour per room, from its lights that are on.
    const roomLight = new Map<string, string>();
    for (const r of rooms) {
      const lit = this.floor.markers.filter((m) => domainOf(m.entity) === "light" && hass.states[m.entity]?.state === "on" && inside([m.x, m.y], r.points));
      if (lit.length) {
        const rgb = hass.states[lit[0].entity].attributes.rgb_color ?? [255, 196, 120];
        roomLight.set(r.id, `rgb(${rgb.join(",")})`);
      }
    }
    // Walls: every room edge, drawn back to front so nearer walls cover farther ones.
    const walls: { d: string; depth: number; light: number }[] = [];
    for (const r of rooms) {
      const pts = r.points;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        const b = pts[(i + 1) % pts.length];
        const [a0, b0, b1, a1] = [this.iso(a), this.iso(b), this.iso(b, WALL), this.iso(a, WALL)];
        // Faces looking towards the viewer are lighter.
        const nx = b[1] - a[1];
        const ny = -(b[0] - a[0]);
        walls.push({ d: `M${a0} L${b0} L${b1} L${a1} Z`, depth: a[0] + a[1] + b[0] + b[1], light: nx + ny > 0 ? 0.92 : 0.7 });
      }
    }
    walls.sort((x, y) => x.depth - y.depth);
    const all = rooms.flatMap((r) => r.points.map((p) => this.iso(p))).concat(rooms.flatMap((r) => r.points.map((p) => this.iso(p, WALL))));
    const xs = all.map((p) => p[0]);
    const ys = all.map((p) => p[1]);
    const [minX, maxX, minY, maxY] = [Math.min(...xs) - 4, Math.max(...xs) + 4, Math.min(...ys) - 8, Math.max(...ys) + 4];
    const vb = `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
    const toPct = (p: Pt) => [((p[0] - minX) / (maxX - minX)) * 100, ((p[1] - minY) / (maxY - minY)) * 100];
    const dark = ctx.dark;
    const wallFill = (l: number) => (dark ? `hsl(220 10% ${Math.round(l * 30)}%)` : `hsl(35 20% ${Math.round(l * 96)}%)`);
    // The drawing's own proportions, fitted inside the widget, so the pins (in %) line up with it.
    const vr = (maxX - minX) / (maxY - minY);
    const bw = Math.min(this.size.w, this.size.h * vr);
    const bh = bw / vr;
    return html`<div class="box" style="width:${bw}px;height:${bh}px"><svg viewBox=${vb} preserveAspectRatio="none" aria-hidden="true">
        ${svg`<defs>${rooms.map((r) =>
          roomLight.has(r.id)
            ? svg`<radialGradient id="g-${r.id}" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color=${roomLight.get(r.id)} stop-opacity=".9"></stop><stop offset="1" stop-color=${roomLight.get(r.id)} stop-opacity=".25"></stop></radialGradient>`
            : ""
        )}</defs>`}
        ${rooms.map(
          (r) => svg`<path class="floor" d="M${r.points.map((p) => this.iso(p)).join(" L")} Z" fill=${roomLight.has(r.id) ? `url(#g-${r.id})` : dark ? "hsl(220 10% 16%)" : "hsl(35 25% 90%)"}></path>`
        )}
        ${walls.map((w) => svg`<path class="wall" d=${w.d} fill=${wallFill(w.light)} stroke=${dark ? "rgba(255,255,255,.08)" : "rgba(30,37,43,.12)"} stroke-width=".25"></path>`)}
        ${rooms.map((r) => {
          const [cx, cy] = this.iso(centroid(r.points), WALL + 3);
          return svg`<text class="label" x=${cx} y=${cy}>${r.name}</text>`;
        })}
      </svg>
      ${this.floor.markers
        .filter((m) => ["light", "climate", "lock", "cover", "fan", "media_player", "switch", "vacuum"].includes(domainOf(m.entity)))
        .map((m, i) => {
          const e = hass.states[m.entity];
          const [x, y] = toPct(this.iso([m.x, m.y], WALL * 0.6));
          const on = isActive(e);
          const tone = domainOf(m.entity) === "light" && Array.isArray(e?.attributes.rgb_color) ? `rgb(${e!.attributes.rgb_color.join(",")})` : undefined;
          return html`<button
            class="pin ${on ? "on" : ""}"
            style="left:${x}%;top:${y}%;animation-delay:${400 + i * 40}ms;${tone ? `--tone:${tone}` : ""}"
            title=${entityName(hass, config, m.entity)}
            aria-label=${entityName(hass, config, m.entity)}
            @click=${() => ctx.openEntity(m.entity)}
          >
            <sn-icon .icon=${entityIcon(e, m.entity)}></sn-icon>
          </button>`;
        })}</div>`;
  }
}
