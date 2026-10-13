import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Hass, HassEntity, Widget } from "../types";
import { hasKey, type I18nKey } from "../i18n";
import { entityName, formatNumber, ltr, stateLabel } from "../entities";
import { shared } from "../theme";
import "../ui/icon";

// Roborock part lifetimes in hours (the integration reports time left, not a percentage).
export const PARTS: { key: string; label: I18nKey; life: number }[] = [
  { key: "main_brush_time_left", label: "main_brush", life: 300 },
  { key: "side_brush_time_left", label: "side_brush", life: 200 },
  { key: "filter_time_left", label: "filter", life: 150 },
  { key: "sensor_time_left", label: "sensors_part", life: 30 },
];

interface RoomChoice {
  id: string; // segment id (as text) or HA area id
  name: string;
}

interface RobotParts {
  map?: string; // image entity
  mop?: string; // select entity
  area?: string; // sensor: cleaned area
  time?: string; // sensor: cleaning time
  empty?: string; // button: empty the dock bin
  parts: Record<string, string>; // part key → sensor
}

/** Finds the robot's sibling entities (map image, mop select, part sensors) through the device registry. */
export function robotParts(hass: Hass, vacuum: string): RobotParts {
  const out: RobotParts = { parts: {} };
  const device = hass.entities?.[vacuum]?.device_id;
  if (!device) return out;
  for (const reg of Object.values(hass.entities ?? {})) {
    if (reg.device_id !== device) continue;
    const [domain, object] = reg.entity_id.split(".");
    const key = reg.translation_key ?? object;
    if (domain === "image" && !out.map) out.map = reg.entity_id;
    else if (domain === "select" && /mop_intensity|water_box/.test(key)) out.mop = reg.entity_id;
    else if (domain === "sensor" && /cleaning_area$/.test(key)) out.area = reg.entity_id;
    else if (domain === "sensor" && /cleaning_time$/.test(key)) out.time = reg.entity_id;
    else if (domain === "button" && /empty/.test(key)) out.empty = reg.entity_id;
    else if (domain === "sensor") for (const p of PARTS) if (key.endsWith(p.key)) out.parts[p.key] = reg.entity_id;
  }
  return out;
}

export function hoursLeft(e: HassEntity | undefined): number | undefined {
  const v = Number(e?.state);
  if (!e || Number.isNaN(v)) return undefined;
  const unit = e.attributes.unit_of_measurement;
  return unit === "s" ? v / 3600 : unit === "min" ? v / 60 : unit === "d" ? v * 24 : v;
}

/**
 * The robot page: live map, rooms to pick in cleaning order, suction / mop / passes, and part wear.
 * Rooms come from Roborock itself (roborock.get_maps, cleaned with segment numbers). If that isn't
 * available, HA areas are offered and cleaned through vacuum.clean_area (HA 2026.3+, needs the
 * robot's rooms mapped to areas in its entity settings).
 */
@customElement("sn-w-vacuum")
export class SnVacuum extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  /** One column, for the long-press sheet. */
  @property({ type: Boolean, reflect: true }) compact = false;
  @state() private rooms: RoomChoice[] = [];
  @state() private method: "segments" | "areas" = "segments";
  @state() private picked: string[] = [];
  @state() private passes = 1;
  @state() private bust = Date.now();
  private timer?: number;

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
        padding: 18px;
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
        gap: 18px;
        overflow: auto;
      }
      :host([compact]) .wrap {
        grid-template-columns: 1fr;
        padding: 0;
        background: none;
        border: 0;
        box-shadow: none;
        backdrop-filter: none;
      }
      .col {
        display: grid;
        gap: 14px;
        align-content: start;
        min-width: 0;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .head .ic {
        display: grid;
        place-items: center;
        width: 52px;
        height: 52px;
        border-radius: 999px;
        background: var(--surface-2);
        color: var(--text-2);
        --icon-size: 28px;
        flex: none;
      }
      .head .ic.on {
        background: var(--accent);
        color: var(--on-accent);
        animation: spin 4s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      .head .name {
        font-weight: 700;
        font-size: 18px;
      }
      .head .state {
        color: var(--text-2);
        font-size: 14px;
        unicode-bidi: plaintext;
      }
      .stats {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .stat {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 999px;
        background: var(--surface-2);
        font-size: 14px;
        font-weight: 500;
        unicode-bidi: plaintext;
        --icon-size: 16px;
      }
      .map {
        border-radius: var(--r-md);
        overflow: hidden;
        background: var(--surface-2);
        aspect-ratio: 4 / 3;
        display: grid;
        place-items: center;
      }
      .map img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      h3 {
        margin: 0;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--text-2);
      }
      .rooms {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .room {
        position: relative;
        min-height: 44px;
        padding: 0 16px;
        border-radius: 999px;
        background: var(--surface-2);
        font-weight: 500;
        transition: background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
      }
      .room[aria-pressed="true"] {
        background: var(--accent);
        color: var(--on-accent);
        padding-inline-end: 36px;
      }
      .order {
        position: absolute;
        inset-inline-end: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 22px;
        height: 22px;
        border-radius: 999px;
        background: var(--on-accent);
        color: var(--accent);
        display: grid;
        place-items: center;
        font-size: 12px;
        font-weight: 700;
        animation: pop 300ms var(--spring);
      }
      @keyframes pop {
        from {
          transform: translateY(-50%) scale(0);
        }
      }
      .opts {
        display: grid;
        gap: 10px;
      }
      .opt {
        display: grid;
        gap: 6px;
        font-size: 13px;
        color: var(--text-2);
        font-weight: 500;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .actions .go {
        flex: 1 1 100%;
        min-height: 52px;
        font-size: 16px;
      }
      .part {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 4px 10px;
        font-size: 14px;
      }
      .bar {
        grid-column: 1 / -1;
        height: 6px;
        border-radius: 3px;
        background: var(--surface-2);
        overflow: hidden;
      }
      .bar > span {
        display: block;
        height: 100%;
        background: var(--success);
        border-radius: 3px;
      }
      .bar.low > span {
        background: var(--alert);
      }
      .muted {
        font-size: 14px;
      }
      @media (max-width: 760px) {
        .wrap {
          grid-template-columns: 1fr;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.loadRooms();
    this.timer = window.setInterval(() => (this.bust = Date.now()), 5000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
  }

  private get entity(): string {
    return this.widget.config.entity ?? "";
  }

  private async loadRooms() {
    const { hass } = this.ctx;
    try {
      const res = await hass.callWS<{ response: Record<string, { maps?: { flag?: number; name?: string; rooms?: Record<string, string> }[] }> }>({
        type: "call_service",
        domain: "roborock",
        service: "get_maps",
        target: { entity_id: this.entity },
        return_response: true,
      });
      const maps = res.response?.[this.entity]?.maps ?? [];
      const rooms = Object.entries(maps[0]?.rooms ?? {}).map(([id, name]) => ({ id, name }));
      if (rooms.length) {
        this.method = "segments";
        this.rooms = rooms;
        return;
      }
    } catch {
      /* not Roborock, or an older integration: fall back to HA areas */
    }
    this.method = "areas";
    this.rooms = Object.values(hass.areas ?? {})
      .map((a) => ({ id: a.area_id, name: a.name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  private toggleRoom(id: string) {
    navigator.vibrate?.(5);
    this.picked = this.picked.includes(id) ? this.picked.filter((x) => x !== id) : [...this.picked, id];
  }

  private call(domain: string, service: string, data: Record<string, any> = {}) {
    navigator.vibrate?.(8);
    return this.ctx.hass.callService(domain, service, { entity_id: this.entity, ...data }).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  private start() {
    if (!this.picked.length) return this.call("vacuum", "start");
    if (this.method === "segments")
      return this.call("vacuum", "send_command", {
        command: "app_segment_clean",
        params: [{ segments: this.picked.map(Number), repeat: this.passes }],
      });
    return this.call("vacuum", "clean_area", { cleaning_area_id: this.picked });
  }

  private label(prefix: "fan" | "mop", v: string) {
    const key = `${prefix}_${v}`;
    return hasKey(key) ? this.ctx.t(key) : v.replace(/_/g, " ");
  }

  render() {
    const { ctx } = this;
    const { t, hass } = ctx;
    const e = hass.states[this.entity];
    if (!e) return html`<div class="wrap glass"><span class="muted">${t("unavailable")}</span></div>`;
    const parts = robotParts(hass, this.entity);
    const cleaning = e.state === "cleaning";
    const battery = e.attributes.battery_level ?? Number(hass.states[`sensor.${this.entity.split(".")[1]}_battery`]?.state);
    const map = parts.map ? hass.states[parts.map] : undefined;
    const mapUrl = map?.attributes.entity_picture ? hass.hassUrl(`${map.attributes.entity_picture}${map.attributes.entity_picture.includes("?") ? "&" : "?"}t=${cleaning ? this.bust : Math.floor(this.bust / 60000)}`) : undefined;
    const fanList: string[] = e.attributes.fan_speed_list ?? [];
    const mop = parts.mop ? hass.states[parts.mop] : undefined;
    const stat = (id: string | undefined, icon: string, label: I18nKey) => {
      const s = id ? hass.states[id] : undefined;
      return s && s.state !== "unknown" && s.state !== "unavailable" ? html`<span class="stat"><sn-icon .icon=${icon}></sn-icon>${t(label)} ${stateLabel(t, s, ctx.lang)}</span>` : nothing;
    };

    const left = html`<div class="col">
      <div class="head">
        <span class="ic ${cleaning ? "on" : ""}"><sn-icon icon="robot-vacuum"></sn-icon></span>
        <div>
          <div class="name">${entityName(hass, ctx.config, this.entity)}</div>
          <div class="state">${stateLabel(t, e, ctx.lang)}</div>
        </div>
      </div>
      <div class="stats">
        ${typeof battery === "number" && !Number.isNaN(battery) ? html`<span class="stat"><sn-icon icon="battery"></sn-icon>${ltr(`${battery}%`)}</span>` : nothing}
        ${stat(parts.area, "rooms", "cleaned_area")} ${stat(parts.time, "clock-outline", "clean_time")}
      </div>
      ${mapUrl ? html`<div class="map"><img src=${mapUrl} alt="" /></div>` : nothing}
    </div>`;

    const right = html`<div class="col">
      <h3>${t("rooms")}</h3>
      ${this.rooms.length
        ? html`<div class="rooms">
            ${this.rooms.map((r) => {
              const order = this.picked.indexOf(r.id);
              return html`<button class="room pressable" aria-pressed=${order >= 0} @click=${() => this.toggleRoom(r.id)}>
                ${r.name}${order >= 0 ? html`<span class="order">${order + 1}</span>` : nothing}
              </button>`;
            })}
          </div>`
        : html`<span class="muted">${t("no_rooms")}</span>`}
      <div class="opts">
        ${fanList.length
          ? html`<div class="opt">
              ${t("suction")}
              <div class="seg">
                ${fanList.map(
                  (f) => html`<button aria-pressed=${e.attributes.fan_speed === f} @click=${() => this.call("vacuum", "set_fan_speed", { fan_speed: f })}>
                    ${this.label("fan", f)}
                  </button>`
                )}
              </div>
            </div>`
          : nothing}
        ${mop?.attributes.options?.length
          ? html`<div class="opt">
              ${t("mop")}
              <div class="seg">
                ${(mop.attributes.options as string[]).map(
                  (o) => html`<button
                    aria-pressed=${mop.state === o}
                    @click=${() => this.ctx.hass.callService("select", "select_option", { entity_id: parts.mop, option: o }).catch(() => ctx.toast(t("error")))}
                  >
                    ${this.label("mop", o)}
                  </button>`
                )}
              </div>
            </div>`
          : nothing}
        ${this.method === "segments" && this.picked.length
          ? html`<div class="opt">
              ${t("passes")}
              <div class="seg">
                ${[1, 2, 3].map((n) => html`<button aria-pressed=${this.passes === n} @click=${() => (this.passes = n)}>${ltr(`×${n}`)}</button>`)}
              </div>
            </div>`
          : nothing}
      </div>
      <div class="actions">
        ${cleaning
          ? html`<button class="btn primary pressable go" @click=${() => this.call("vacuum", "pause")}><sn-icon icon="pause"></sn-icon>${t("pause")}</button>`
          : html`<button class="btn primary pressable go" @click=${() => this.start()}>
              <sn-icon icon="play"></sn-icon>${this.picked.length ? (this.picked.length === 1 ? t("clean_rooms_1") : t("clean_rooms_n", { n: this.picked.length })) : t("clean_all")}
            </button>`}
        <button class="btn pressable" @click=${() => this.call("vacuum", "return_to_base")}><sn-icon icon="home"></sn-icon>${t("return_home")}</button>
        <button class="btn pressable" @click=${() => this.call("vacuum", "locate")}><sn-icon icon="locate"></sn-icon>${t("locate")}</button>
        ${parts.empty
          ? html`<button class="btn pressable" @click=${() => this.ctx.hass.callService("button", "press", { entity_id: parts.empty }).catch(() => ctx.toast(t("error")))}>
              <sn-icon icon="delete"></sn-icon>${t("empty_bin")}
            </button>`
          : nothing}
      </div>
      ${Object.keys(parts.parts).length
        ? html`<h3>${t("parts")}</h3>
            ${PARTS.filter((p) => parts.parts[p.key]).map((p) => {
              const h = hoursLeft(hass.states[parts.parts[p.key]]);
              if (h === undefined) return nothing;
              const pct = Math.max(0, Math.min(100, Math.round((h / p.life) * 100)));
              return html`<div class="part">
                <span>${t(p.label)}</span><span class="muted">${t("hours_left", { n: ltr(formatNumber(h, ctx.lang, 0)) })}</span>
                <div class="bar ${pct < 15 ? "low" : ""}"><span style="width:${pct}%"></span></div>
              </div>`;
            })}`
        : nothing}
    </div>`;

    return html`<div class="wrap ${this.compact ? "" : "glass"}">${left}${right}</div>`;
  }
}
