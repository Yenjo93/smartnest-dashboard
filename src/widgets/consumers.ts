import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Hass, Widget } from "../types";
import { domainOf, entityName, formatNumber, ltr } from "../entities";
import { guessEnergy } from "./energy";
import { shared } from "../theme";
import "../ui/icon";
import "../ui/num";

export interface Consumer {
  id: string; // power sensor
  w: number;
  /** The switch, light or appliance on the same device, to turn it off from here. */
  control?: string;
  /** Drawing power while its control is off: standby. */
  standby: boolean;
}

const CONTROL = ["switch", "light", "media_player", "climate", "fan", "water_heater", "humidifier"];

const toW = (hass: Hass, id: string) => {
  const e = hass.states[id];
  const v = Number(e?.state);
  if (!e || Number.isNaN(v)) return undefined;
  const u = e.attributes.unit_of_measurement;
  return u === "kW" ? v * 1000 : u === "W" || !u ? v : undefined;
};

/** Every device drawing power right now, biggest first, from the per-device power sensors. */
export function liveConsumers(hass: Hass, settingsPower?: string): Consumer[] {
  const g = guessEnergy(hass);
  const skip = new Set([g.solar, g.grid, g.battery, g.home, settingsPower].filter(Boolean));
  const out: Consumer[] = [];
  for (const e of Object.values(hass.states)) {
    const id = e.entity_id;
    if (!id.startsWith("sensor.") || e.attributes.device_class !== "power" || skip.has(id)) continue;
    // Whole-house meters aren't one device.
    if (/total|house|home|grid|import|export|solar|pv|inverter|battery|mains|phase/.test(id)) continue;
    const w = toW(hass, id);
    if (w === undefined || w < 1) continue;
    const dev = hass.entities?.[id]?.device_id;
    const control = dev
      ? Object.values(hass.entities ?? {}).find((r) => r.device_id === dev && CONTROL.includes(domainOf(r.entity_id)) && !r.entity_category && hass.states[r.entity_id])?.entity_id
      : undefined;
    const st = control ? hass.states[control]?.state : undefined;
    out.push({ id, w, control, standby: !!control && (st === "off" || st === "standby" || st === "idle") && w >= 2 });
  }
  return out.sort((a, b) => b.w - a.w);
}

const COLORS = ["#E9971D", "#3A86FF", "#2BB673", "#E5484D", "#8E6CEF", "#14B8C4", "#9AA0A6"];

/** Who's using power right now: a ring of the biggest users, and the ones quietly drawing power while "off". */
@customElement("sn-w-consumers")
export class SnConsumers extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;

  static styles = [
    shared,
    css`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        grid-template-columns: minmax(110px, 38%) 1fr;
        gap: 16px;
        align-items: center;
        overflow: hidden;
      }
      .ring {
        position: relative;
        aspect-ratio: 1;
        width: 100%;
        max-height: 100%;
      }
      .ring svg {
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
      }
      .ring circle {
        fill: none;
        stroke-width: 14;
        transition: stroke-dasharray 700ms cubic-bezier(0.22, 1, 0.36, 1), stroke-dashoffset 700ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .mid {
        position: absolute;
        inset: 0;
        display: grid;
        place-content: center;
        text-align: center;
      }
      .mid b {
        font-size: 22px;
      }
      .mid span {
        font-size: 12px;
        color: var(--text-2);
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 6px;
        overflow: auto;
        max-height: 100%;
        align-self: stretch;
        align-content: center;
      }
      li {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
      }
      .sw {
        width: 10px;
        height: 10px;
        border-radius: 3px;
        flex: none;
      }
      .nm {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .w {
        color: var(--text-2);
        font-variant-numeric: tabular-nums;
      }
      .tag {
        font-size: 11px;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 999px;
        background: color-mix(in srgb, var(--alert) 16%, transparent);
        color: var(--alert-text);
        border: 0;
        cursor: pointer;
      }
      h3 {
        grid-column: 1 / -1;
        margin: 0;
        font-size: 16px;
        display: flex;
        gap: 8px;
        align-items: center;
      }
    `,
  ];

  render() {
    const { ctx } = this;
    const { t, hass, lang } = ctx;
    const list = liveConsumers(hass, ctx.config.settings.power_entity);
    const total = list.reduce((a, c) => a + c.w, 0);
    const top = list.slice(0, 6);
    const rest = list.slice(6).reduce((a, c) => a + c.w, 0);
    const parts = [...top.map((c) => c.w), ...(rest ? [rest] : [])];
    const C = 2 * Math.PI * 40;
    let acc = 0;
    const fmt = (w: number) => ltr(w >= 1000 ? `${formatNumber(w / 1000, lang, 1)} kW` : `${formatNumber(w, lang, 0)} W`);
    const standby = list.filter((c) => c.standby);
    return html`<div class="card glass">
      <h3><sn-icon icon="lightning-bolt" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${t("widget_consumers")}</h3>
      ${list.length
        ? html`<div class="ring">
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="40" stroke="var(--surface-2)"></circle>
                ${parts.map((w, i) => {
                  const len = (w / total) * C;
                  const el = svg`<circle cx="50" cy="50" r="40" stroke=${COLORS[i] ?? COLORS[6]} stroke-dasharray="${Math.max(0, len - 1.2)} ${C}" stroke-dashoffset=${-acc}></circle>`;
                  acc += len;
                  return el;
                })}
              </svg>
              <div class="mid"><b><sn-num .value=${fmt(total)}></sn-num></b><span>${t("now")}</span></div>
            </div>
            <ul>
              ${top.map(
                (c, i) => html`<li>
                  <span class="sw" style="background:${COLORS[i]}"></span>
                  <span class="nm">${entityName(hass, ctx.config, c.control ?? c.id)}</span>
                  ${c.standby
                    ? html`<button class="tag" title=${t("standby_hint")} @click=${() => c.control && ctx.openEntity(c.control)}>${t("standby")}</button>`
                    : nothing}
                  <span class="w">${fmt(c.w)}</span>
                </li>`
              )}
              ${rest ? html`<li><span class="sw" style="background:${COLORS[6]}"></span><span class="nm">${t("others")}</span><span class="w">${fmt(rest)}</span></li>` : nothing}
              ${standby.length && !top.some((c) => c.standby)
                ? html`<li class="muted" style="font-size:12px">${t("standby_total", { w: fmt(standby.reduce((a, c) => a + c.w, 0)) })}</li>`
                : nothing}
            </ul>`
        : html`<span class="muted" style="grid-column:1/-1">${t("no_entities")}</span>`}
    </div>`;
  }
}
