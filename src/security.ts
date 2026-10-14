import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import type { Hass, HassEntity } from "./types";
import { domainOf, entityName, relativeTime } from "./entities";
import { dashboardEntities } from "./chips";
import { areaOf } from "./autofill";
import { liveUrl, snapshotUrl } from "./widgets/camera";
import { shared } from "./theme";
import "./ui/icon";
import "./ui/pinpad";

// ---- travel mode ----

export const TRAVEL = "switch.smartnest_travel_mode";

/** What travel mode will do here, then one big button. Anyone in the family can start it before leaving. */
export function travelSheet(ctx: Ctx) {
  ctx.showSheet({
    title: ctx.t("travel"),
    render: (c) => {
      const { t, hass, config } = c;
      const on = hass.states[TRAVEL]?.state === "on";
      const s = config.settings.travel;
      const sim: string[] = hass.states[TRAVEL]?.attributes.simulating ?? [];
      const line = (icon: string, text: string) => html`<div style="display:flex;gap:10px;align-items:center;font-size:15px">
        <sn-icon icon=${icon} style="--icon-size:20px;color:var(--accent-text)"></sn-icon><span>${text}</span>
      </div>`;
      return html`<div style="display:grid;gap:14px">
        <div style="display:grid;gap:10px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)">
          ${s.off.length ? line("power", t("travel_off", { x: s.off.map((id) => entityName(hass, config, id)).join("، ") })) : nothing}
          ${s.arm && Object.keys(hass.states).some((id) => id.startsWith("alarm_control_panel.")) ? line("shield-home", t("travel_arm")) : nothing}
          ${s.simulate ? line("lightbulb", t("travel_sim")) : nothing}
          ${s.notify ? line("bell-ring", t("travel_report")) : nothing}
        </div>
        ${on && sim.length ? html`<span class="muted" style="font-size:14px">${t("travel_sim_now", { x: sim.map((id) => entityName(hass, config, id)).join("، ") })}</span>` : nothing}
        <button
          class="btn ${on ? "" : "primary"} pressable"
          style="min-height:56px;font-size:17px"
          @click=${() => {
            hass.callService("switch", on ? "turn_off" : "turn_on", { entity_id: TRAVEL }).then(
              () => c.toast(t(on ? "travel_welcome" : "travel_bye")),
              () => c.toast(t("error"))
            );
            c.closeSheet();
          }}
        >
          <sn-icon icon=${on ? "home" : "airplane"} style="--icon-size:22px"></sn-icon>${t(on ? "travel_stop" : "travel_start")}
        </button>
      </div>`;
    },
  });
}

// ---- alarm going off ----

/** The sensor that most likely set the alarm off: the last door, window or motion change in the past 10 minutes. */
function culprit(hass: Hass): HassEntity | undefined {
  const since = Date.now() - 10 * 60_000;
  return Object.values(hass.states)
    .filter(
      (e) =>
        domainOf(e.entity_id) === "binary_sensor" &&
        e.state === "on" &&
        ["door", "window", "opening", "garage_door", "motion", "occupancy", "presence", "smoke", "gas"].includes(e.attributes.device_class) &&
        Date.parse(e.last_changed) > since
    )
    .sort((a, b) => b.last_changed.localeCompare(a.last_changed))[0];
}

/** A camera looking at that spot: same HA area first, then the door camera, then any. */
function cameraFor(ctx: Ctx, near?: HassEntity): string | undefined {
  const { hass, config } = ctx;
  const cams = Object.keys(hass.states).filter((id) => id.startsWith("camera."));
  const area = near ? areaOf(hass, near.entity_id) : undefined;
  return (area && cams.find((id) => areaOf(hass, id) === area)) || config.settings.doorbell.camera_entity || cams[0];
}

/** Full screen while the alarm is going off: what tripped it, the camera there, and who to call. */
@customElement("sn-alarm")
export class SnAlarm extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) alarm!: HassEntity;
  @property({ attribute: false }) onHide!: () => void;
  @state() private code = false;

  static styles = [
    shared,
    css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 60;
        display: grid;
        place-items: center;
        padding: 16px;
        background: radial-gradient(circle at 50% 30%, rgba(229, 72, 77, 0.55), rgba(70, 0, 6, 0.92));
        animation: flash 1.2s ease-in-out infinite alternate;
        color: #fff;
        -webkit-backdrop-filter: blur(14px);
        backdrop-filter: blur(14px);
      }
      .card {
        width: min(760px, 100%);
        display: grid;
        gap: 14px;
      }
      h1 {
        margin: 0;
        font-size: clamp(28px, 5vw, 44px);
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .why {
        font-size: 18px;
        opacity: 0.92;
      }
      .cam {
        border-radius: var(--r-lg);
        overflow: hidden;
        background: #000;
        aspect-ratio: 16 / 9;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      }
      .cam img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .row {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }
      .row a,
      .row button {
        flex: 1;
        min-width: 150px;
        min-height: 60px;
        font-size: 17px;
        text-decoration: none;
        justify-content: center;
      }
      .call {
        background: #fff;
        color: #b4141b;
      }
      .pad {
        background: var(--surface-solid);
        color: var(--text);
        border-radius: var(--r-lg);
        padding: 16px;
      }
      @keyframes flash {
        from {
          background-color: rgba(120, 0, 10, 0.2);
        }
        to {
          background-color: rgba(200, 20, 30, 0.35);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host {
          animation: none;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    navigator.vibrate?.([400, 200, 400, 200, 400]);
  }

  render() {
    const { ctx } = this;
    const { t, hass, config } = ctx;
    const why = culprit(hass);
    const cam = cameraFor(ctx, why);
    const url = cam ? liveUrl(hass, cam) ?? snapshotUrl(hass, cam, Date.now()) : undefined;
    const em = config.settings.emergency;
    return html`<div class="card" role="alertdialog" aria-label=${t("alarm_triggered")}>
      <h1><sn-icon icon="alarm-light" style="--icon-size:44px"></sn-icon>${t("alarm_triggered")}</h1>
      <span class="why">${why ? `${entityName(hass, config, why.entity_id)} · ${relativeTime(t, why.last_changed)}` : entityName(hass, config, this.alarm.entity_id)}</span>
      ${url ? html`<div class="cam"><img src=${url} alt="" /></div>` : nothing}
      ${this.code
        ? html`<div class="pad">
            <sn-pinpad
              .length=${0}
              prompt=${t("alarm_code")}
              error=${t("wrong_pin")}
              .onSubmit=${(code: string) => {
                hass
                  .callService("alarm_control_panel", "alarm_disarm", { entity_id: this.alarm.entity_id, code })
                  .catch(() => ctx.toast(t("wrong_pin")));
                this.code = false;
                return true;
              }}
            ></sn-pinpad>
          </div>`
        : html`<div class="row">
            ${em.police ? html`<a class="btn call pressable" href="tel:${em.police}"><sn-icon icon="phone"></sn-icon>${t("call_police")} ${em.police}</a>` : nothing}
            ${em.contacts.map((p) => html`<a class="btn call pressable" href="tel:${p.phone}"><sn-icon icon="phone"></sn-icon>${p.name}</a>`)}
          </div>
          <div class="row">
            <button class="btn primary pressable" @click=${() => (this.code = true)}><sn-icon icon="shield-off"></sn-icon>${t("alarm_stop")}</button>
            <button class="btn pressable" @click=${() => this.onHide()}>${t("alarm_hide")}</button>
          </div>`}
    </div>`;
  }
}

// ---- weather vs open windows ----

const BAD = ["rainy", "pouring", "lightning", "lightning-rainy", "hail", "snowy", "snowy-rainy", "windy", "windy-variant", "exceptional"];

/** Rain, storm or a dust wind on the way while windows or blinds are open. */
export function weatherRisk(ctx: Ctx): { condition: string; open: string[]; covers: string[] } | undefined {
  const { hass, config } = ctx;
  const w = config.settings.weather.entity ? hass.states[config.settings.weather.entity] : undefined;
  if (!w) return undefined;
  const wind = Number(w.attributes.wind_speed);
  const condition = BAD.includes(w.state) ? w.state : wind >= 45 ? "windy" : "";
  if (!condition) return undefined;
  const ids = dashboardEntities(config);
  const open = ids.filter((id) => {
    const e = hass.states[id];
    return e && domainOf(id) === "binary_sensor" && e.state === "on" && ["window", "opening"].includes(e.attributes.device_class);
  });
  const covers = ids.filter((id) => {
    const e = hass.states[id];
    return e && domainOf(id) === "cover" && e.state === "open" && !["garage", "door", "gate"].includes(e.attributes.device_class);
  });
  return open.length || covers.length ? { condition, open, covers } : undefined;
}

@customElement("sn-weather-alert")
export class SnWeatherAlert extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) risk!: { condition: string; open: string[]; covers: string[] };
  @property({ attribute: false }) onDismiss!: () => void;

  static styles = [
    shared,
    css`
      :host {
        position: fixed;
        inset-inline: 0;
        top: 12px;
        z-index: 39;
        display: flex;
        justify-content: center;
        padding-inline: 12px;
        pointer-events: none;
      }
      .card {
        pointer-events: auto;
        width: min(560px, 100%);
        border-radius: var(--r-lg);
        padding: 14px 16px;
        display: grid;
        gap: 8px;
        background: var(--surface-solid);
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.22), inset 0 0 0 2px #3a86ff;
        animation: drop 420ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      .head {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .head b {
        flex: 1;
        font-size: 16px;
      }
      .row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      @keyframes drop {
        from {
          opacity: 0;
          transform: translateY(-24px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .card {
          animation: none;
        }
      }
    `,
  ];

  render() {
    const { ctx, risk } = this;
    const { t, hass, config } = ctx;
    const names = [...risk.open, ...risk.covers].map((id) => entityName(hass, config, id));
    return html`<div class="card" role="alert">
      <div class="head">
        <sn-icon icon=${risk.condition.includes("wind") ? "weather-windy" : "weather-pouring"} style="--icon-size:28px;color:#3a86ff"></sn-icon>
        <b>${t(risk.condition.includes("wind") ? "wx_alert_wind" : "wx_alert_rain")}</b>
      </div>
      <span class="muted" style="font-size:14px">${t("wx_alert_open", { x: names.slice(0, 4).join("، ") })}</span>
      <div class="row">
        ${risk.covers.length
          ? html`<button
              class="btn primary pressable"
              @click=${() => {
                hass.callService("cover", "close_cover", { entity_id: risk.covers }).catch(() => ctx.toast(t("error")));
                this.onDismiss();
              }}
            >
              ${t("wx_close_covers")}
            </button>`
          : nothing}
        <button class="btn pressable" @click=${() => this.onDismiss()}>${t("dismiss")}</button>
      </div>
    </div>`;
  }
}
