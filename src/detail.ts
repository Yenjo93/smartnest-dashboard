import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import type { HassEntity } from "./types";
import { toneStyle, domainOf, entityIcon, formatNumber, isActive, isNumericSensor, ltr, relativeTime, stateLabel } from "./entities";
import { hasKey } from "./i18n";
import { liveUrl } from "./widgets/camera";
import { shared } from "./theme";
import { hsToRgb, onColor, rgbCss, rgbHex } from "./color";
import type { I18nKey } from "./i18n";
import "./ui/icon";
import "./ui/vslider";
import "./ui/color-wheel";
import "./widgets/vacuum";

type LightTab = "brightness" | "color" | "temp";
const COLOR_MODES = ["hs", "xy", "rgb", "rgbw", "rgbww"];
const LIGHT_TAB_ICONS: Record<LightTab, string> = { brightness: "lightbulb", color: "palette", temp: "thermometer" };
const LIGHT_TAB_LABELS: Record<LightTab, I18nKey> = { brightness: "brightness", color: "color", temp: "white_temp" };
// Fixed for every client, in [hue, saturation]: the colours people actually pick.
const PRESETS: [number, number][] = [
  [0, 85], [24, 90], [38, 88], [52, 75], [130, 70], [190, 80], [225, 85], [275, 70], [325, 65],
];
// CoverEntityFeature bits
const COVER_OPEN = 1;
const COVER_CLOSE = 2;
const COVER_STOP = 8;


const HVAC_ICONS: Record<string, string> = {
  off: "power",
  cool: "snowflake",
  heat: "fire",
  auto: "air-conditioner",
  heat_cool: "air-conditioner",
  dry: "humidity",
  fan_only: "fan",
};

/** Everything you can do with one device. Opened by long-press, or by tap for sensors, locks and cameras. */
@customElement("sn-entity-detail")
export class SnEntityDetail extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property() entityId = "";
  @state() private lightTab: LightTab = "brightness";
  @state() private wheelOpen = false;
  @state() private pendingTemp?: number;
  @state() private confirmUnlock = false;
  @state() private history?: { t: number; v: number }[];
  private tempTimer?: number;
  private confirmTimer?: number;

  static styles = [
    shared,
    css`
      :host {
        display: grid;
        gap: 22px;
        justify-items: center;
        padding-bottom: 8px;
      }
      .head {
        display: grid;
        justify-items: center;
        gap: 6px;
        text-align: center;
      }
      .big-ic {
        display: grid;
        place-items: center;
        width: 72px;
        height: 72px;
        border-radius: 999px;
        background: var(--surface-2);
        color: var(--text-2);
        --icon-size: 36px;
        transition: background-color var(--dur) var(--ease-out), color var(--dur) var(--ease-out);
      }
      .big-ic.on {
        background: var(--tone);
        color: var(--on-tone);
      }
      .state {
        unicode-bidi: plaintext;
        font-size: 22px;
        font-weight: 700;
      }
      .sub {
        font-size: 13px;
        color: var(--text-2);
      }
      .controls {
        display: flex;
        gap: 16px;
        justify-content: center;
        align-items: flex-start;
      }
      .swatches {
        display: grid;
        grid-template-columns: repeat(5, 48px);
        gap: 14px;
        justify-content: center;
      }
      .swatch {
        width: 48px;
        height: 48px;
        border-radius: 999px;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
        transition: transform var(--dur-fast) var(--spring), box-shadow var(--dur-fast) var(--ease-out);
      }
      .swatch[aria-pressed="true"] {
        box-shadow: 0 0 0 3px var(--surface-solid), 0 0 0 5px var(--text);
        transform: scale(1.06);
      }
      .swatch.more {
        display: grid;
        place-items: center;
        background: conic-gradient(red, yellow, lime, cyan, blue, magenta, red);
        color: #fff;
        --icon-size: 22px;
      }
      .swatch.more sn-icon {
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
      }
      .reveal {
        animation: reveal 420ms var(--spring);
      }
      @keyframes reveal {
        from {
          opacity: 0;
          transform: scale(0.92);
        }
      }
      .power {
        width: 96px;
        height: 96px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: var(--surface-2);
        color: var(--text-2);
        --icon-size: 40px;
      }
      .power.on {
        background: var(--accent);
        color: var(--on-accent);
      }
      .temp {
        direction: ltr; /* minus on the left, plus on the right, in every language */
        display: flex;
        align-items: center;
        gap: 24px;
      }
      .temp .value {
        font-size: 64px;
        font-weight: 700;
        min-width: 3.2ch;
        text-align: center;
        font-variant-numeric: tabular-nums;
        letter-spacing: -0.02em;
      }
      .temp .icon-btn {
        width: 56px;
        height: 56px;
        --icon-size: 28px;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
      }
      .live {
        width: 100%;
        aspect-ratio: 16 / 9;
        border-radius: var(--r-md);
        overflow: hidden;
        background: #0d1114;
      }
      .live img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .chart {
        width: 100%;
        display: grid;
        gap: 6px;
      }
      .chart svg {
        width: 100%;
        height: 120px;
        overflow: visible;
      }
      .chart .labels {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: var(--text-2);
        font-variant-numeric: tabular-nums;
      }
      .lock-btn {
        min-width: 200px;
        min-height: 56px;
        font-size: 17px;
      }
    `,
  ];

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this.tempTimer);
    window.clearTimeout(this.confirmTimer);
  }

  protected firstUpdated() {
    const e = this.ctx.hass.states[this.entityId];
    if (isNumericSensor(e)) this.loadHistory();
  }

  private async loadHistory() {
    try {
      const start = new Date(Date.now() - 24 * 3600_000).toISOString();
      const res = await this.ctx.hass.callWS<Record<string, { s: string; lu?: number; lc?: number }[]>>({
        type: "history/history_during_period",
        start_time: start,
        entity_ids: [this.entityId],
        minimal_response: true,
        no_attributes: true,
        significant_changes_only: false,
      });
      let last = Date.parse(start) / 1000;
      this.history = (res[this.entityId] ?? [])
        .map((p) => {
          last = p.lu ?? p.lc ?? last;
          return { t: last, v: Number(p.s) };
        })
        .filter((p) => !Number.isNaN(p.v));
    } catch {
      this.history = [];
    }
  }

  private call(domain: string, service: string, data: Record<string, any> = {}) {
    navigator.vibrate?.(5);
    this.ctx.hass.callService(domain, service, { entity_id: this.entityId, ...data }).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  // ---- light ----
  private renderLight(e: HassEntity) {
    const { t } = this.ctx;
    const modes: string[] = e.attributes.supported_color_modes ?? [];
    if (!modes.some((m) => m !== "onoff")) return this.renderPower(e);
    const tabs: LightTab[] = ["brightness"];
    if (modes.some((m) => COLOR_MODES.includes(m))) tabs.push("color");
    if (modes.includes("color_temp")) tabs.push("temp");
    const tab = tabs.includes(this.lightTab) ? this.lightTab : "brightness";
    const on = e.state === "on";
    const rgb: number[] | undefined = on ? e.attributes.rgb_color : undefined;
    const fill = rgb ? rgbCss(rgb) : "var(--accent)";
    const brightness = on ? Math.round(((e.attributes.brightness ?? 255) / 255) * 100) : 0;

    let body;
    if (tab === "brightness") {
      body = html`<sn-vslider
        .value=${brightness}
        label=${t("brightness")}
        icon=${brightness ? "lightbulb" : "lightbulb-outline"}
        fill=${fill}
        onFill=${rgb ? onColor(rgbHex(rgb)) : "var(--on-accent)"}
        .onCommit=${(v: number) => (v ? this.call("light", "turn_on", { brightness_pct: v }) : this.call("light", "turn_off"))}
      ></sn-vslider>`;
    } else if (tab === "color") {
      const hs: [number, number] | undefined = e.attributes.color_mode !== "color_temp" ? e.attributes.hs_color : undefined;
      const near = (p: [number, number]) => !!hs && Math.abs(((hs[0] - p[0] + 540) % 360) - 180) < 10 && Math.abs(hs[1] - p[1]) < 12;
      body = html`<div style="display:grid;gap:22px;justify-items:center">
        <div class="swatches">
          ${PRESETS.map(
            (p) => html`<button
              class="swatch pressable"
              style="background:${rgbCss(hsToRgb(p[0], p[1]))}"
              aria-pressed=${near(p)}
              aria-label=${`${p[0]}°`}
              @click=${() => this.call("light", "turn_on", { hs_color: p })}
            ></button>`
          )}
          <button
            class="swatch more pressable"
            aria-pressed=${this.wheelOpen}
            aria-label=${t("more_colors")}
            title=${t("more_colors")}
            @click=${() => (this.wheelOpen = !this.wheelOpen)}
          >
            <sn-icon icon=${this.wheelOpen ? "close" : "plus"}></sn-icon>
          </button>
        </div>
        ${this.wheelOpen
          ? html`<sn-color-wheel class="reveal" .hs=${hs} .onPick=${(v: [number, number]) => this.call("light", "turn_on", { hs_color: v })}></sn-color-wheel>`
          : nothing}
      </div>`;
    } else {
      const min = e.attributes.min_color_temp_kelvin ?? 2000;
      const max = e.attributes.max_color_temp_kelvin ?? 6500;
      const k = e.attributes.color_mode === "color_temp" ? e.attributes.color_temp_kelvin : undefined;
      const pct = typeof k === "number" ? Math.round(((k - min) / (max - min)) * 100) : 50;
      const toK = (v: number) => Math.round((min + ((max - min) * v) / 100) / 50) * 50;
      body = html`<sn-vslider
        .value=${pct}
        label=${t("white_temp")}
        icon="lightbulb"
        track="linear-gradient(to top, #FFA94D, #FFE4C2 45%, #F4F7FF 75%, #BFD6FF)"
        .display=${typeof k === "number" ? `${k}K` : "–"}
        .onCommit=${(v: number) => this.call("light", "turn_on", { color_temp_kelvin: toK(v) })}
      ></sn-vslider>`;
    }
    return html`${body}
      ${tabs.length > 1
        ? html`<div class="seg" role="tablist">
            ${tabs.map(
              (x) => html`<button role="tab" aria-pressed=${x === tab} @click=${() => (this.lightTab = x)}>
                <sn-icon .icon=${LIGHT_TAB_ICONS[x]} style="--icon-size:18px"></sn-icon>${t(LIGHT_TAB_LABELS[x])}
              </button>`
            )}
          </div>`
        : nothing}`;
  }

  private renderPower(e: HassEntity) {
    const on = isActive(e);
    return html`<button
      class="power pressable ${on ? "on" : ""}"
      aria-pressed=${on}
      aria-label=${this.ctx.t(on ? "turn_off" : "turn_on")}
      @click=${() => this.call("homeassistant", "toggle")}
    >
      <sn-icon icon="power"></sn-icon>
    </button>`;
  }

  // ---- climate ----
  private renderClimate(e: HassEntity) {
    const { t, lang } = this.ctx;
    const step = e.attributes.target_temp_step ?? (e.attributes.temperature_unit === "°F" ? 1 : 0.5);
    const target = this.pendingTemp ?? e.attributes.temperature;
    const min = e.attributes.min_temp ?? 16;
    const max = e.attributes.max_temp ?? 30;
    const bump = (d: number) => {
      if (typeof target !== "number") return;
      const v = Math.min(max, Math.max(min, Math.round((target + d) / step) * step));
      this.pendingTemp = v;
      window.clearTimeout(this.tempTimer);
      // Wait for the taps to settle so the AC gets one command, not five.
      this.tempTimer = window.setTimeout(() => {
        this.call("climate", "set_temperature", { temperature: v });
        window.setTimeout(() => (this.pendingTemp = undefined), 1500);
      }, 700);
    };
    const modes: string[] = e.attributes.hvac_modes ?? [];
    return html`
      ${typeof target === "number" && e.state !== "off"
        ? html`<div class="temp">
            <button class="icon-btn pressable" aria-label="-" @click=${() => bump(-step)}><sn-icon icon="minus"></sn-icon></button>
            <span class="value ltr">${formatNumber(target, lang)}°</span>
            <button class="icon-btn pressable" aria-label="+" @click=${() => bump(step)}><sn-icon icon="plus"></sn-icon></button>
          </div>`
        : this.renderPower(e)}
      ${typeof e.attributes.current_temperature === "number"
        ? html`<div class="sub">${t("current_temp")} ${ltr(`${formatNumber(e.attributes.current_temperature, lang)}°`)}</div>`
        : nothing}
      ${modes.length
        ? html`<div class="seg">
            ${modes.map(
              (m) => html`<button aria-pressed=${e.state === m} @click=${() => this.call("climate", "set_hvac_mode", { hvac_mode: m })}>
                <sn-icon .icon=${HVAC_ICONS[m] ?? "air-conditioner"} style="--icon-size:18px"></sn-icon>${hasKey(m) ? t(m) : m}
              </button>`
            )}
          </div>`
        : nothing}
    `;
  }

  // ---- vacuum: the same robot page as the widget, in one column ----
  private renderVacuum(e: HassEntity) {
    const widget = { id: "sheet", type: "vacuum" as const, x: 0, y: 0, w: 12, h: 9, config: { entity: e.entity_id } };
    return html`<sn-w-vacuum compact .ctx=${this.ctx} .widget=${widget} style="width:100%"></sn-w-vacuum>`;
  }

  // ---- cover ----
  private renderCover(e: HassEntity) {
    const { t } = this.ctx;
    const f: number = e.attributes.supported_features ?? 0;
    const pos = e.attributes.current_position;
    const tilt = e.attributes.current_tilt_position;
    const has = (bit: number) => !f || (f & bit) !== 0; // no feature info: offer everything
    return html`${typeof pos === "number" || typeof tilt === "number"
        ? html`<div class="controls">
            ${typeof pos === "number"
              ? html`<sn-vslider
                  .value=${pos}
                  label=${t("position")}
                  icon=${pos ? "blinds" : "blinds-closed"}
                  .onCommit=${(v: number) => this.call("cover", "set_cover_position", { position: v })}
                ></sn-vslider>`
              : nothing}
            ${typeof tilt === "number"
              ? html`<div style="display:grid;gap:8px;justify-items:center">
                  <sn-vslider
                    small
                    .value=${tilt}
                    label=${t("tilt")}
                    icon="blinds"
                    fill="var(--cool)"
                    onFill="var(--on-cool)"
                    .onCommit=${(v: number) => this.call("cover", "set_cover_tilt_position", { tilt_position: v })}
                  ></sn-vslider>
                  <span class="sub">${t("tilt")}</span>
                </div>`
              : nothing}
          </div>`
        : nothing}
      <div class="actions">
        ${has(COVER_OPEN)
          ? html`<button class="btn pressable" @click=${() => this.call("cover", "open_cover")}><sn-icon icon="chevron-up"></sn-icon>${t("cover_open")}</button>`
          : nothing}
        ${has(COVER_STOP)
          ? html`<button class="btn pressable" @click=${() => this.call("cover", "stop_cover")}><sn-icon icon="stop"></sn-icon>${t("stop")}</button>`
          : nothing}
        ${has(COVER_CLOSE)
          ? html`<button class="btn pressable" @click=${() => this.call("cover", "close_cover")}><sn-icon icon="chevron-down"></sn-icon>${t("cover_close")}</button>`
          : nothing}
      </div>`;
  }

  // ---- lock: two deliberate taps to unlock ----
  private renderLock(e: HassEntity) {
    const { t } = this.ctx;
    if (e.state === "unlocked" || e.state === "open")
      return html`<button class="btn primary pressable lock-btn" @click=${() => this.call("lock", "lock")}><sn-icon icon="lock"></sn-icon>${t("lock")}</button>`;
    if (this.confirmUnlock)
      return html`<button
        class="btn danger pressable lock-btn"
        @click=${() => {
          this.confirmUnlock = false;
          this.call("lock", "unlock");
        }}
      >
        <sn-icon icon="lock-open"></sn-icon>${t("unlock_confirm")}
      </button>`;
    return html`<button
      class="btn pressable lock-btn"
      @click=${() => {
        this.confirmUnlock = true;
        window.clearTimeout(this.confirmTimer);
        this.confirmTimer = window.setTimeout(() => (this.confirmUnlock = false), 4000);
      }}
    >
      <sn-icon icon="lock-open"></sn-icon>${t("unlock")}
    </button>`;
  }

  private renderChart(e: HassEntity) {
    const pts = this.history;
    if (!pts || pts.length < 2) return nothing;
    const { lang, t } = this.ctx;
    const t0 = pts[0].t;
    const t1 = Date.now() / 1000;
    const vs = pts.map((p) => p.v);
    const lo = Math.min(...vs);
    const hi = Math.max(...vs);
    const span = hi - lo || 1;
    const X = (tt: number) => ((tt - t0) / (t1 - t0 || 1)) * 300;
    const Y = (v: number) => 100 - ((v - lo) / span) * 90 - 5;
    // Step line: a sensor holds its value until the next report.
    let d = `M0 ${Y(pts[0].v)}`;
    for (let i = 1; i < pts.length; i++) d += ` H${X(pts[i].t)} V${Y(pts[i].v)}`;
    d += ` H300`;
    const unit = e.attributes.unit_of_measurement ?? "";
    return html`<div class="chart">
      <div class="sub">${t("history_24h")}</div>
      <svg viewBox="0 0 300 100" preserveAspectRatio="none" class="ltr">
        ${svg`<path d="${d} V100 H0 Z" fill="var(--accent)" opacity=".14"></path>
        <path d=${d} fill="none" stroke="var(--accent)" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"></path>`}
      </svg>
      <div class="labels ltr"><span>${formatNumber(lo, lang)} ${unit}</span><span>${formatNumber(hi, lang)} ${unit}</span></div>
    </div>`;
  }

  private renderBody(e: HassEntity) {
    switch (domainOf(e.entity_id)) {
      case "light":
        return this.renderLight(e);
      case "climate":
        return this.renderClimate(e);
      case "vacuum":
        return this.renderVacuum(e);
      case "cover":
        return this.renderCover(e);
      case "lock":
        return this.renderLock(e);
      case "camera": {
        const url = liveUrl(this.ctx.hass, e.entity_id);
        return url ? html`<div class="live"><img src=${url} alt="" /></div>` : nothing;
      }
      case "sensor":
        return this.renderChart(e);
      case "switch":
      case "fan":
      case "input_boolean":
      case "media_player":
      case "automation":
      case "humidifier":
      case "siren":
        return this.renderPower(e);
      case "scene":
      case "script":
        return html`<button class="btn primary pressable" @click=${() => this.call(domainOf(e.entity_id), "turn_on")}>
          <sn-icon icon="play"></sn-icon>${this.ctx.t("start")}
        </button>`;
      default:
        return nothing;
    }
  }

  render() {
    const { ctx } = this;
    const e = ctx.hass.states[this.entityId];
    if (!e) return html`<div class="sub">${ctx.t("unavailable")}</div>`;
    // The robot page has its own header.
    if (domainOf(e.entity_id) === "vacuum" && e.state !== "unavailable") return this.renderVacuum(e);
    const on = isActive(e);
    const unavailable = e.state === "unavailable";
    return html`
      <div class="head">
        <span class="big-ic ${on ? "on" : ""}" style=${toneStyle(e)}>
          <sn-icon .icon=${entityIcon(e, this.entityId)}></sn-icon>
        </span>
        <span class="state">${stateLabel(ctx.t, e, ctx.lang)}</span>
        <span class="sub">${ctx.t("last_changed")} ${relativeTime(ctx.t, e.last_changed)}</span>
      </div>
      ${unavailable ? nothing : this.renderBody(e)}
    `;
  }
}
