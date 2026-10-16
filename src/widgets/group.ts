import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { areaOf, entityIcon, entityName, formatNumber, isActive, ltr } from "../entities";
import { shared } from "../theme";
import "../ui/icon";
import { saveAsScene } from "../scene-save";
import { haptic } from "../ui/haptic";


export type GroupDomain = "light" | "cover" | "switch" | "fan";
const NAME = { light: "widget_lights", cover: "widget_covers", switch: "widget_switches", fan: "widget_fans" } as const;
const ICON = { light: "lightbulb", cover: "blinds", switch: "power-socket", fan: "fan" } as const;

function members(ctx: Ctx, domain: GroupDomain, w: Widget): string[] {
  const { hass } = ctx;
  if (w.config.entities?.length) return (w.config.entities as string[]).filter((id) => hass.states[id]);
  return Object.keys(hass.states).filter(
    (id) =>
      id.startsWith(`${domain}.`) &&
      !hass.entities?.[id]?.hidden &&
      !hass.entities?.[id]?.entity_category &&
      // Gates and garage doors have their own widget, and shouldn't move with "close all blinds".
      !(domain === "cover" && ["gate", "garage", "door"].includes(hass.states[id].attributes.device_class)) &&
      (!w.config.area || areaOf(hass, id) === w.config.area)
  );
}

/**
 * A room's (or the whole house's) lights or blinds in one card: how many are on or open, everything at once,
 * and each one on its own row.
 */
@customElement("sn-w-group")
export class SnGroup extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @property() domain: GroupDomain = "light";

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
        padding: 14px;
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 10px;
        overflow: hidden;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .head div {
        flex: 1;
        display: grid;
      }
      .head b {
        font-size: 16px;
      }
      .head span {
        font-size: 13px;
        color: var(--text-2);
      }
      .head .btn {
        min-height: 38px;
        font-size: 14px;
        padding-inline: 12px;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 6px;
        overflow: auto;
        align-content: start;
      }
      /* Narrow card: each blind keeps up and down, the stop is in the header. */
      @container (max-width: 260px) {
        li .cv button.st {
          display: none;
        }
      }
      .card {
        container-type: inline-size;
      }
      li {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      li .nm {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        cursor: pointer;
        min-width: 0;
      }
      li .nm span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      li.on .nm sn-icon {
        color: var(--tone, var(--accent));
      }
      li small {
        color: var(--text-2);
        font-size: 12px;
      }
      .sw {
        width: 46px;
        height: 28px;
        border-radius: 999px;
        border: 0;
        background: var(--border);
        position: relative;
        cursor: pointer;
        flex: none;
        transition: background 200ms;
      }
      .sw::after {
        content: "";
        position: absolute;
        top: 3px;
        inset-inline-start: 3px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #fff;
        transition: inset-inline-start 200ms;
      }
      .sw[aria-checked="true"] {
        background: var(--accent);
      }
      .sw[aria-checked="true"]::after {
        inset-inline-start: 21px;
      }
      .cv {
        display: flex;
        gap: 4px;
      }
      .cv button {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        border: 0;
        background: var(--surface-solid);
        color: var(--text);
        display: grid;
        place-items: center;
        cursor: pointer;
        --icon-size: 18px;
      }
    `,
  ];

  private call(service: string, ids: string[]) {
    if (!ids.length) return;
    haptic("tap");
    const run = () => this.ctx.hass.callService(this.domain, service, { entity_id: ids });
    // Several at once can be put back for a few seconds; a single one is a tap away anyway.
    if (ids.length > 1 && service !== "stop_cover") this.ctx.undoable(ids, this.ctx.t("undo_n", { n: ids.length }), run);
    else run().catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  render() {
    const { ctx, domain } = this;
    const { t, hass, config, lang } = ctx;
    const ids = members(ctx, domain, this.widget);
    const area = this.widget.config.area ? hass.areas?.[this.widget.config.area]?.name : undefined;
    const title = this.widget.config.title || (area ? `${t(NAME[domain])} · ${area}` : t(NAME[domain]));
    const active = ids.filter((id) => (domain !== "cover" ? hass.states[id].state === "on" : ["open", "opening"].includes(hass.states[id].state)));
    if (!ids.length) return html`<div class="card glass"><sn-empty text=${t("no_entities")}></sn-empty></div>`;
    return html`<div class="card glass">
      <div class="head">
        <sn-icon icon=${ICON[domain]} style="--icon-size:22px;color:${active.length ? "var(--accent-text)" : "var(--text-2)"}"></sn-icon>
        <div>
          <b>${title}</b>
          <span>${domain !== "cover" ? t("lights_on_n", { n: active.length, of: ids.length }) : t("covers_open_n", { n: active.length, of: ids.length })}</span>
        </div>
        ${ctx.isAdmin
          ? html`<button class="icon-btn small pressable" aria-label=${t("scene_keep")} title=${t("scene_keep")} @click=${() => saveAsScene(ctx, ids, title).catch(() => ctx.toast(t("error")))}>
              <sn-icon icon="content-save" style="--icon-size:18px"></sn-icon>
            </button>`
          : nothing}
        ${domain !== "cover"
          ? active.length
            ? html`<button class="btn pressable" @click=${() => this.call("turn_off", active)}>${t("all_off")}</button>`
            : html`<button class="btn primary pressable" @click=${() => this.call("turn_on", ids)}>${t("all_on")}</button>`
          : html`<div class="cv">
              <button aria-label=${t("open")} @click=${() => this.call("open_cover", ids)}><sn-icon icon="arrow-up"></sn-icon></button>
              <button aria-label="stop" @click=${() => this.call("stop_cover", ids)}><sn-icon icon="stop"></sn-icon></button>
              <button aria-label=${t("closed")} @click=${() => this.call("close_cover", ids)}><sn-icon icon="arrow-down"></sn-icon></button>
            </div>`}
      </div>
      <ul>
        ${ids.map((id) => {
          const e = hass.states[id];
          const on = isActive(e);
          const rgb = e.attributes.rgb_color;
          const pos = e.attributes.current_position;
          const bri = e.attributes.brightness;
          return html`<li class=${on ? "on" : ""} style=${on && Array.isArray(rgb) ? `--tone:rgb(${rgb.join(",")})` : ""}>
            <span class="nm" @click=${() => ctx.openEntity(id, this)}>
              <sn-icon .icon=${entityIcon(e, id)} style="--icon-size:20px"></sn-icon>
              <span>${entityName(hass, config, id)}</span>
              ${domain === "light" && on && typeof bri === "number" ? html`<small class="ltr">${ltr(`${formatNumber((bri / 255) * 100, lang, 0)}%`)}</small>` : nothing}
              ${domain === "cover" && typeof pos === "number" ? html`<small class="ltr">${ltr(`${pos}%`)}</small>` : nothing}
            </span>
            ${domain !== "cover"
              ? html`<button class="sw" role="switch" aria-checked=${on} aria-label=${entityName(hass, config, id)} @click=${() => this.call("toggle", [id])}></button>`
              : html`<div class="cv">
                  <button aria-label=${t("open")} @click=${() => this.call("open_cover", [id])}><sn-icon icon="arrow-up"></sn-icon></button>
                  <button class="st" aria-label="stop" @click=${() => this.call("stop_cover", [id])}><sn-icon icon="stop"></sn-icon></button>
                  <button aria-label=${t("closed")} @click=${() => this.call("close_cover", [id])}><sn-icon icon="arrow-down"></sn-icon></button>
                </div>`}
          </li>`;
        })}
      </ul>
    </div>`;
  }
}
