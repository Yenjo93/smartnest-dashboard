import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { domainOf, entityIcon, entityName, formatNumber, isActive, ltr, shortValue } from "../entities";
import { areaOf } from "../autofill";
import { shared } from "../theme";
import "../ui/icon";

/**
 * A room as a photo, Apple Home style: the real room behind, its name, temperature and what's on, a light switch for
 * the whole room, and everything in it one tap away.
 */
@customElement("sn-w-room")
export class SnRoom extends LitElement {
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
        position: relative;
        height: 100%;
        border-radius: var(--r-xl, 32px);
        overflow: hidden;
        color: #fff;
        cursor: pointer;
        background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 55%, #1e252b), #1e252b);
        box-shadow: var(--shadow);
        isolation: isolate;
      }
      .photo {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        z-index: -2;
        transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), filter 800ms;
      }
      .card:hover .photo {
        transform: scale(1.04);
      }
      .card.dark .photo {
        filter: brightness(0.55) saturate(0.7);
      }
      .card::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 30%, rgba(0, 0, 0, 0.7));
      }
      .glow {
        position: absolute;
        inset: auto -20% -40% -20%;
        height: 80%;
        z-index: -1;
        background: radial-gradient(ellipse at 50% 100%, var(--glow), transparent 65%);
        opacity: 0;
        transition: opacity 800ms;
      }
      .card.lit .glow {
        opacity: 0.55;
      }
      .body {
        position: absolute;
        inset: auto 0 0 0;
        padding: 16px 18px;
        display: grid;
        gap: 8px;
      }
      h3 {
        margin: 0;
        font-size: clamp(18px, 2.4vw, 24px);
        font-weight: var(--display-weight, 700);
        letter-spacing: var(--display-track, 0);
        text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
      }
      .meta {
        display: flex;
        gap: 12px;
        font-size: 14px;
        opacity: 0.9;
        flex-wrap: wrap;
      }
      .meta span {
        display: flex;
        gap: 4px;
        align-items: center;
        direction: ltr;
      }
      .quick {
        position: absolute;
        top: 12px;
        inset-inline-end: 12px;
        display: flex;
        gap: 8px;
      }
      .quick button {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: rgba(255, 255, 255, 0.18);
        -webkit-backdrop-filter: var(--glass-filter, blur(14px));
        backdrop-filter: var(--glass-filter, blur(14px));
        color: #fff;
        transition: background 300ms, color 300ms, transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .quick button.on {
        background: #ffd27a;
        color: #3a2a10;
      }
      .quick button:active {
        transform: scale(0.9);
      }
    `,
  ];

  /** The room's devices: the HA area's, or the ones the installer picked. */
  private devices(): string[] {
    const { hass } = this.ctx;
    const c = this.widget.config;
    if (Array.isArray(c.entities) && c.entities.length) return c.entities.filter((id: string) => hass.states[id]);
    if (!c.area) return [];
    return Object.keys(hass.states).filter((id) => areaOf(hass, id) === c.area && !hass.entities?.[id]?.entity_category && !hass.entities?.[id]?.hidden);
  }

  private openSheet() {
    const ids = this.devices().filter((id) => ["light", "switch", "climate", "cover", "fan", "media_player", "lock", "sensor", "binary_sensor"].includes(domainOf(id)));
    this.ctx.showSheet({
      title: this.roomTitle,
      origin: this.renderRoot.querySelector(".card") ?? undefined,
      render: (c) => html`<div style="display:grid;gap:8px">
        ${ids.map((id) => {
          const e = c.hass.states[id];
          return html`<button
            class="glass pressable"
            style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:var(--r-md);text-align:start"
            @click=${(ev: Event) => c.openEntity(id, ev.currentTarget as Element)}
          >
            <sn-icon .icon=${entityIcon(e, id)} style="--icon-size:22px;color:${isActive(e) ? "var(--accent-text)" : "var(--text-2)"}"></sn-icon>
            <span style="flex:1;font-weight:500">${entityName(c.hass, c.config, id)}</span>
            <span class="muted" style="font-size:14px;unicode-bidi:plaintext">${shortValue(c.t, e, c.lang)}</span>
          </button>`;
        })}
      </div>`,
    });
  }

  private get roomTitle(): string {
    const c = this.widget.config;
    return c.name || (c.area ? this.ctx.hass.areas?.[c.area]?.name : "") || this.ctx.t("widget_room");
  }

  render() {
    const { ctx } = this;
    const { hass, lang } = ctx;
    const ids = this.devices();
    const lights = ids.filter((id) => domainOf(id) === "light");
    const lit = lights.filter((id) => hass.states[id]?.state === "on");
    const temp = ids.map((id) => hass.states[id]).find((e) => e?.attributes.device_class === "temperature" && domainOf(e.entity_id) === "sensor");
    const hum = ids.map((id) => hass.states[id]).find((e) => e?.attributes.device_class === "humidity" && domainOf(e.entity_id) === "sensor");
    const ac = ids.find((id) => domainOf(id) === "climate");
    const acOn = ac && isActive(hass.states[ac]);
    const rgb = lit.map((id) => hass.states[id].attributes.rgb_color).find(Array.isArray) ?? [255, 190, 120];
    const photo = this.widget.config.photo as string | undefined;
    return html`<div
      class="card ${lit.length ? "lit" : ""} ${!lit.length && ctx.dark ? "dark" : ""}"
      style="--glow:rgb(${rgb.join(",")})"
      role="button"
      tabindex="0"
      aria-label=${this.roomTitle}
      @click=${() => this.openSheet()}
    >
      ${photo ? html`<div class="photo" style="background-image:url('${photo}')"></div>` : nothing}
      <div class="glow"></div>
      <div class="quick" @click=${(e: Event) => e.stopPropagation()}>
        ${ac
          ? html`<button class=${acOn ? "on" : ""} aria-label=${entityName(hass, ctx.config, ac)} @click=${() => hass.callService("climate", acOn ? "turn_off" : "turn_on", { entity_id: ac }).catch(() => undefined)}>
              <sn-icon icon="air-conditioner" style="--icon-size:20px"></sn-icon>
            </button>`
          : nothing}
        ${lights.length
          ? html`<button
              class=${lit.length ? "on" : ""}
              aria-label=${ctx.t(lit.length ? "room_lights_off" : "room_lights_on")}
              @click=${() => hass.callService("light", lit.length ? "turn_off" : "turn_on", { entity_id: lights }).catch(() => undefined)}
            >
              <sn-icon icon=${lit.length ? "lightbulb" : "lightbulb-outline"} style="--icon-size:20px"></sn-icon>
            </button>`
          : nothing}
      </div>
      <div class="body">
        <h3>${this.roomTitle}</h3>
        <div class="meta">
          ${temp ? html`<span><sn-icon icon="thermometer" style="--icon-size:16px"></sn-icon>${ltr(`${formatNumber(Number(temp.state), lang, 1)}°`)}</span>` : nothing}
          ${hum ? html`<span><sn-icon icon="humidity" style="--icon-size:16px"></sn-icon>${ltr(`${formatNumber(Number(hum.state), lang, 0)}%`)}</span>` : nothing}
          ${lights.length ? html`<span><sn-icon icon="lightbulb" style="--icon-size:16px"></sn-icon>${lit.length}/${lights.length}</span>` : nothing}
        </div>
      </div>
    </div>`;
  }
}
