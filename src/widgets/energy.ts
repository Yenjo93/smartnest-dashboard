import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Hass, Widget } from "../types";
import { formatNumber, ltr } from "../entities";
import { shared } from "../theme";
import "../ui/icon";

export interface EnergyConfig {
  solar?: string;
  grid?: string;
  battery?: string;
  soc?: string;
  home?: string;
  flip_grid?: boolean;
  flip_battery?: boolean;
}

const watts = (hass: Hass, id?: string): number | undefined => {
  const e = id ? hass.states[id] : undefined;
  const v = Number(e?.state);
  if (!e || Number.isNaN(v)) return undefined;
  const unit = e.attributes.unit_of_measurement;
  return unit === "kW" ? v * 1000 : unit === "MW" ? v * 1_000_000 : v;
};

/** Best guess from entity ids, so a new widget on a solar house shows something before any setup. */
export function guessEnergy(hass: Hass): EnergyConfig {
  const power = Object.values(hass.states).filter((e) => e.entity_id.startsWith("sensor.") && e.attributes.device_class === "power");
  const find = (re: RegExp) => power.find((e) => re.test(e.entity_id))?.entity_id;
  const soc = Object.values(hass.states).find(
    (e) => e.entity_id.startsWith("sensor.") && e.attributes.device_class === "battery" && /(home|house|storage|inverter|powerwall)_?battery|battery_(soc|level|state_of_charge)/.test(e.entity_id)
  )?.entity_id;
  return { solar: find(/solar|pv/), grid: find(/grid/), battery: find(/battery_power|battery/), soc, home: find(/home_power|house|load|consumption/) };
}

// Fixed layout (LTR on purpose: it's a diagram, not text). Home sits in the middle.
const NODES = {
  solar: { x: 150, y: 46 },
  grid: { x: 46, y: 150 },
  home: { x: 254, y: 150 },
  battery: { x: 150, y: 254 },
};
const COLORS = { solar: "#E9971D", grid: "#18BCF2", battery: "#2FB57A", home: "var(--text)" };

/** Live energy flow: glowing dots travel along each line, faster and denser as more power flows. */
@customElement("sn-w-energy")
export class SnEnergy extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;

  static styles = [
    shared,
    css`
      :host {
        display: block;
        height: 100%;
      }
      .wrap {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 12px;
        display: grid;
        grid-template-rows: minmax(0, 1fr);
        overflow: hidden;
      }
      svg {
        width: 100%;
        height: 100%;
        min-height: 0;
        direction: ltr;
        overflow: visible;
      }
      .node {
        fill: var(--surface-solid);
        stroke-width: 3;
      }
      .val {
        font: 700 15px var(--font);
        fill: var(--text);
        text-anchor: middle;
      }
      .lbl {
        font: 500 11px var(--font);
        fill: var(--text-2);
        text-anchor: middle;
      }
      .line {
        fill: none;
        stroke: var(--border);
        stroke-width: 4;
        stroke-linecap: round;
      }
      @media (prefers-reduced-motion: reduce) {
        .dot {
          display: none;
        }
      }
    `,
  ];

  private get cfg(): EnergyConfig {
    const c = this.widget.config as EnergyConfig;
    return c.solar || c.grid || c.battery ? c : { ...guessEnergy(this.ctx.hass), ...c };
  }

  private edge(id: string, from: { x: number; y: number }, to: { x: number; y: number }, w: number | undefined, color: string) {
    const p = Math.abs(w ?? 0);
    const path = `M${from.x} ${from.y} L${to.x} ${to.y}`;
    const live = w !== undefined && p >= 10;
    // More power: shorter trip and more dots. Log scale so 50 W and 5 kW both read well.
    const dur = Math.max(0.9, 5 - Math.log10(Math.max(p, 10)) * 1.1);
    const dots = live ? Math.min(5, 2 + Math.floor(Math.log10(p))) : 0;
    const reversed = (w ?? 0) < 0;
    return svg`<path id=${id} class="line" d=${path}></path>
      ${Array.from(
        { length: dots },
        (_, i) => svg`<circle class="dot" r="4.5" fill=${color} style="filter:drop-shadow(0 0 4px ${color})">
          <animateMotion dur="${dur}s" repeatCount="indefinite" begin="${-(dur / dots) * i}s"
            keyPoints=${reversed ? "1;0" : "0;1"} keyTimes="0;1" calcMode="linear">
            <mpath href="#${id}"></mpath>
          </animateMotion>
        </circle>`
      )}`;
  }

  private node(key: keyof typeof NODES, icon: string, label: string, value: string, sub?: string) {
    const n = NODES[key];
    const c = COLORS[key];
    return svg`<g>
      <circle class="node" cx=${n.x} cy=${n.y} r="38" stroke=${c}></circle>
      <foreignObject x=${n.x - 13} y=${n.y - 30} width="26" height="26">
        <sn-icon .icon=${icon} style="--icon-size:26px;color:${c === "var(--text)" ? "var(--text-2)" : c}"></sn-icon>
      </foreignObject>
      <text class="val" x=${n.x} y=${n.y + 13}>${value}</text>
      <text class="lbl" x=${n.x} y=${n.y + 54}>${sub ? `${label} · ${sub}` : label}</text>
    </g>`;
  }

  render() {
    const { ctx } = this;
    const { hass, t } = ctx;
    const c = this.cfg;
    const solar = watts(hass, c.solar);
    let grid = watts(hass, c.grid);
    let battery = watts(hass, c.battery);
    if (grid !== undefined && c.flip_grid) grid = -grid;
    if (battery !== undefined && c.flip_battery) battery = -battery;
    const home = watts(hass, c.home) ?? (solar ?? 0) + (grid ?? 0) - (battery ?? 0);
    const soc = c.soc ? hass.states[c.soc]?.state : undefined;
    const kw = (w: number | undefined) => (w === undefined ? "–" : ltr(Math.abs(w) >= 1000 ? `${formatNumber(Math.abs(w) / 1000, ctx.lang, 1)} kW` : `${formatNumber(Math.abs(w), ctx.lang, 0)} W`));
    return html`<div class="wrap glass">
      <svg viewBox="0 0 300 310" role="img" aria-label=${t("widget_energy")}>
        ${c.solar ? this.edge("e-solar", NODES.solar, NODES.home, solar, COLORS.solar) : nothing}
        ${c.grid ? this.edge("e-grid", NODES.grid, NODES.home, grid, COLORS.grid) : nothing}
        ${c.battery ? this.edge("e-bat", NODES.battery, NODES.home, battery === undefined ? undefined : -battery, COLORS.battery) : nothing}
        ${c.solar ? this.node("solar", "solar", t("e_solar"), kw(solar)) : nothing}
        ${c.grid ? this.node("grid", "tower", t("e_grid"), kw(grid)) : nothing}
        ${c.battery ? this.node("battery", "battery", t("e_battery"), kw(battery), soc && !Number.isNaN(Number(soc)) ? ltr(`${Math.round(Number(soc))}%`) : undefined) : nothing}
        ${this.node("home", "home", t("e_home"), kw(home))}
      </svg>
    </div>`;
  }
}
