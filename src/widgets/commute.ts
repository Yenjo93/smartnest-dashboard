import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { HassEntity, Widget } from "../types";
import { entityName, formatNumber } from "../entities";
import { shared } from "../theme";
import "../ui/icon";
import "../ui/num";

/** Travel time sensors from Waze or Google Maps: their platform says so, or their attribution does. */
export const commuteSensors = (ctx: Ctx): HassEntity[] =>
  Object.values(ctx.hass.states).filter((e) => {
    if (!e.entity_id.startsWith("sensor.")) return false;
    const platform = ctx.hass.entities?.[e.entity_id]?.platform ?? "";
    return ["waze_travel_time", "google_travel_time", "here_travel_time"].includes(platform) || /waze|google maps/i.test(String(e.attributes.attribution ?? ""));
  });

/** "To work: 23 min via Route 1": the morning drive at a glance. */
@customElement("sn-w-commute")
export class SnCommute extends LitElement {
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
        gap: 10px;
        align-content: start;
        overflow: auto;
      }
      h3 {
        margin: 0;
        font-size: 16px;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .route {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      .route .nm {
        flex: 1;
        min-width: 0;
      }
      .route .nm b {
        display: block;
      }
      .route .nm span {
        font-size: 12px;
        color: var(--text-2);
      }
      .min {
        font-size: 26px;
        font-weight: 700;
        direction: ltr;
      }
      .min small {
        font-size: 13px;
        font-weight: 500;
        color: var(--text-2);
      }
      .bar {
        width: 6px;
        align-self: stretch;
        border-radius: 3px;
      }
    `,
  ];

  render() {
    const { ctx } = this;
    const { t, hass, config, lang } = ctx;
    const chosen: string[] = this.widget.config.entities ?? [];
    const list = commuteSensors(ctx).filter((e) => !chosen.length || chosen.includes(e.entity_id));
    return html`<div class="card glass">
      <h3><sn-icon icon="car" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${t("widget_commute")}</h3>
      ${list.length
        ? list.map((e) => {
            const min = Number(e.state);
            // Waze gives the no-traffic time too: compare to colour the bar.
            const free = Number(e.attributes.duration ?? e.attributes.duration_in_traffic ?? NaN);
            const ratio = Number.isNaN(free) || !free ? 1 : min / free;
            const color = ratio > 1.4 ? "var(--alert)" : ratio > 1.15 ? "#e9971d" : "var(--success)";
            return html`<div class="route">
              <span class="bar" style="background:${color}"></span>
              <span class="nm"><b>${entityName(hass, config, e.entity_id)}</b><span>${e.attributes.route ?? ""}</span></span>
              <span class="min"><sn-num .value=${formatNumber(min, lang, 0)}></sn-num> <small>${t("minutes")}</small></span>
            </div>`;
          })
        : html`<span class="muted" style="font-size:14px">${t("commute_missing")}</span>`}
      ${nothing}
    </div>`;
  }
}
