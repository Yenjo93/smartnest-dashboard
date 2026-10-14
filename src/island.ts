import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { keyed } from "lit/directives/keyed.js";
import type { Ctx } from "./ctx";
import { domainOf, entityName } from "./entities";
import { dashboardEntities } from "./chips";
import { guessBoiler } from "./widgets/boiler";
import { shared } from "./theme";
import "./ui/icon";

interface Activity {
  id: string;
  icon: string;
  color: string;
  title: string;
  detail: string;
  /** 0..1 when we know how far along it is. */
  progress?: number;
  stop?: () => void;
}

/**
 * Live activities, like the iPhone's Dynamic Island: a pill at the top for what's running right now (washer, robot,
 * music, a timer, the water heater). Tap it and it opens into the full list, with a stop button for each.
 */
@customElement("sn-island")
export class SnIsland extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @state() private open = false;
  @state() private timers: Record<string, string> = {};
  @state() private turn = 0;
  private poll?: number;
  private spin?: number;

  static styles = [
    shared,
    css`
      :host {
        display: block;
        position: relative;
      }
      .pill {
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 40px;
        max-width: min(440px, 60vw);
        padding: 4px 14px 4px 6px;
        border-radius: 999px;
        background: #0b0b0d;
        color: #fff;
        box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.6);
        cursor: pointer;
        transition: max-width 500ms cubic-bezier(0.32, 0.72, 0, 1), padding 500ms cubic-bezier(0.32, 0.72, 0, 1);
        animation: grow 520ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      .dot {
        position: relative;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        flex: none;
        background: color-mix(in srgb, var(--c) 30%, transparent);
        color: var(--c);
      }
      .dot svg {
        position: absolute;
        inset: -3px;
        width: 36px;
        height: 36px;
        transform: rotate(-90deg);
      }
      .txt {
        min-width: 0;
        display: grid;
        line-height: 1.15;
      }
      .txt b {
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .txt span {
        font-size: 11px;
        opacity: 0.65;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .more {
        font-size: 11px;
        font-weight: 700;
        padding: 2px 7px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.14);
      }
      .swap {
        animation: swap 420ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .panel {
        position: absolute;
        top: calc(100% + 8px);
        inset-inline-start: 0;
        width: min(420px, 92vw);
        padding: 10px;
        border-radius: 26px;
        background: #0b0b0d;
        color: #fff;
        display: grid;
        gap: 6px;
        z-index: 40;
        box-shadow: 0 30px 70px -20px rgba(0, 0, 0, 0.7);
        animation: drop 460ms cubic-bezier(0.32, 0.72, 0, 1);
        transform-origin: top center;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.06);
      }
      .row .txt b {
        font-size: 15px;
      }
      .row .txt span {
        font-size: 13px;
      }
      .row .txt {
        flex: 1;
      }
      .stop {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: rgba(255, 255, 255, 0.12);
        color: #fff;
      }
      @keyframes grow {
        from {
          max-width: 40px;
          opacity: 0;
        }
      }
      @keyframes swap {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
      @keyframes drop {
        from {
          opacity: 0;
          transform: scale(0.6, 0.3);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .pill,
        .panel,
        .swap {
          animation: none;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    const load = () =>
      this.ctx.hass
        .callWS<Record<string, string>>({ type: "smartnest/timer/list" })
        .then((t) => (this.timers = t))
        .catch(() => undefined);
    load();
    this.poll = window.setInterval(load, 30_000);
    // With several things running, the pill shows each in turn.
    this.spin = window.setInterval(() => (this.turn += 1), 5000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.poll);
    window.clearInterval(this.spin);
  }

  private activities(): Activity[] {
    const { hass, config, t } = this.ctx;
    const out: Activity[] = [];
    const name = (id: string) => entityName(hass, config, id);
    const off = (id: string) => () => hass.callService("homeassistant", "turn_off", { entity_id: id }).catch(() => undefined);
    for (const a of config.settings.appliances ?? []) {
      const w = Number(hass.states[a.power]?.state);
      if (w >= (a.start_w ?? 15)) out.push({ id: a.power, icon: "washing-machine", color: "#5ec8f2", title: a.name, detail: t("act_running") });
    }
    for (const id of dashboardEntities(config)) {
      const e = hass.states[id];
      if (!e) continue;
      if (domainOf(id) === "vacuum" && e.state === "cleaning")
        out.push({ id, icon: "robot-vacuum", color: "#2bb673", title: name(id), detail: t("act_cleaning"), stop: () => hass.callService("vacuum", "return_to_base", { entity_id: id }).catch(() => undefined) });
      if (domainOf(id) === "media_player" && e.state === "playing")
        out.push({ id, icon: "speaker", color: "#e85d9e", title: e.attributes.media_title ?? name(id), detail: e.attributes.media_artist ?? name(id), stop: () => hass.callService("media_player", "media_pause", { entity_id: id }).catch(() => undefined) });
    }
    const boiler = guessBoiler(Object.keys(hass.states), hass);
    if (boiler && hass.states[boiler]?.state === "on") out.push({ id: boiler, icon: "water-boiler", color: "#ff8a3d", title: name(boiler), detail: t("act_heating"), stop: off(boiler) });
    const now = Date.now();
    for (const [id, iso] of Object.entries(this.timers)) {
      const left = Date.parse(iso) - now;
      if (left <= 0 || !hass.states[id]) continue;
      out.push({ id: `timer-${id}`, icon: "timer", color: "#e9971d", title: name(id), detail: t("act_off_in", { n: Math.max(1, Math.round(left / 60_000)) }) });
    }
    if (hass.states["switch.smartnest_travel_mode"]?.state === "on") out.push({ id: "travel", icon: "airplane", color: "#8e6cef", title: t("travel"), detail: t("travel_on") });
    return out;
  }

  private dot(a: Activity, size = 30) {
    const C = 2 * Math.PI * 16;
    return html`<span class="dot" style="--c:${a.color};width:${size}px;height:${size}px">
      <sn-icon icon=${a.icon} style="--icon-size:${Math.round(size * 0.55)}px"></sn-icon>
      ${a.progress !== undefined
        ? html`<svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="16" fill="none" stroke=${a.color} stroke-width="2.5" stroke-linecap="round" stroke-dasharray="${C * a.progress} ${C}"></circle></svg>`
        : nothing}
    </span>`;
  }

  render() {
    const list = this.activities();
    if (!list.length) return nothing;
    const a = list[this.turn % list.length];
    return html`<div class="pill" role="button" tabindex="0" aria-expanded=${this.open} @click=${() => (this.open = !this.open)}>
        ${this.dot(a)}
        ${keyed(a.id, html`<span class="txt swap"><b>${a.title}</b><span>${a.detail}</span></span>`)}
        ${list.length > 1 ? html`<span class="more">+${list.length - 1}</span>` : nothing}
      </div>
      ${this.open
        ? html`<div class="panel" style="--dir:${this.ctx.rtl ? -1 : 1}">
            ${list.map(
              (x) => html`<div class="row">
                ${this.dot(x, 38)}
                <span class="txt"><b>${x.title}</b><span>${x.detail}</span></span>
                ${x.stop
                  ? html`<button class="stop pressable" aria-label=${this.ctx.t("turn_off")} @click=${() => x.stop!()}>
                      <sn-icon icon="pause" style="--icon-size:18px"></sn-icon>
                    </button>`
                  : nothing}
              </div>`
            )}
          </div>`
        : nothing}`;
  }
}
