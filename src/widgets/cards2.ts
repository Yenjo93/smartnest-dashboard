// Practical cards for a family house: plants, the pool, the internet, the car, tomorrow's sun, bin day, and when each
// room last saw someone. Each finds its devices by itself; the widget's settings narrow it down.
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { HassEntity, Widget } from "../types";
import { areaOf, domainOf, entityIcon, entityName, formatNumber, isActive, ltr, relativeTime, runTap, seen } from "../entities";
import { LOCALE } from "../i18n";
import { shared } from "../theme";
import { haptic } from "../ui/haptic";
import "../ui/icon";
import "../ui/num";

const base = [
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
    h3 sn-icon {
      --icon-size: 20px;
      color: var(--accent-text);
    }
    .big {
      font-size: 34px;
      font-weight: var(--display-weight, 700);
      line-height: 1;
    }
    .big small {
      font-size: 15px;
      color: var(--text-2);
      font-weight: 500;
    }
    .muted2 {
      color: var(--text-2);
      font-size: 13px;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: var(--r-md);
      background: var(--surface-2);
      font-size: 14px;
      cursor: pointer;
    }
    .row b {
      flex: 1;
      font-weight: 500;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .row.bad {
      background: color-mix(in srgb, var(--alert) 18%, var(--surface-2));
    }
    .bar {
      height: 8px;
      border-radius: 4px;
      background: var(--surface-2);
      overflow: hidden;
    }
    .bar i {
      display: block;
      height: 100%;
      border-radius: inherit;
      transform-origin: var(--from, left);
    }
    .grid2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
      gap: 8px;
    }
    .stat {
      padding: 10px 12px;
      border-radius: var(--r-md);
      background: var(--surface-2);
      display: grid;
      gap: 2px;
    }
    .stat b {
      font-size: 20px;
    }
    .stat span {
      font-size: 12px;
      color: var(--text-2);
    }
  `,
];

const visible = (ctx: Ctx, e: HassEntity) => !ctx.hass.entities?.[e.entity_id]?.entity_category && !ctx.hass.entities?.[e.entity_id]?.hidden;
const label = (e: HassEntity) => `${e.entity_id} ${e.attributes.friendly_name ?? ""}`;
const chosen = (ctx: Ctx, w: Widget, find: () => string[]) => {
  const c: string[] = w.config.entities ?? [];
  return (c.length ? c : find()).filter((id) => ctx.hass.states[id]);
};

// ---- plants ----

/** Soil moisture per plant, driest first, with "needs water" under the threshold. Also HA's own plant entities. */
@customElement("sn-w-plants")
export class SnPlants extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  static styles = base;

  render() {
    const { ctx } = this;
    const { t, hass, config, lang } = ctx;
    const dry = Number(this.widget.config.dry ?? 25);
    const ids = chosen(ctx, this.widget, () =>
      Object.values(hass.states)
        .filter(
          (e) =>
            visible(ctx, e) &&
            ((e.entity_id.startsWith("sensor.") && e.attributes.unit_of_measurement === "%" && (e.attributes.device_class === "moisture" || /soil|plant|زريع|نبت|تربة|צמח|אדמה/i.test(label(e)))) ||
              e.entity_id.startsWith("plant."))
        )
        .map((e) => e.entity_id)
    );
    const rows = ids
      .map((id) => {
        const e = hass.states[id];
        const v = id.startsWith("plant.") ? Number(e.attributes.moisture ?? NaN) : Number(e.state);
        return { id, v, problem: id.startsWith("plant.") && e.state === "problem" };
      })
      .sort((a, b) => (Number.isNaN(a.v) ? 999 : a.v) - (Number.isNaN(b.v) ? 999 : b.v));
    const thirsty = rows.filter((r) => r.v < dry || r.problem).length;
    return html`<div class="card glass">
      <h3><sn-icon icon="sprout"></sn-icon>${t("widget_plants")}<span class="muted2" style="margin-inline-start:auto">${thirsty ? t("plants_thirsty", { n: thirsty }) : rows.length ? t("plants_ok") : ""}</span></h3>
      ${rows.length
        ? rows.map(
            (r) => html`<div class="row ${r.v < dry || r.problem ? "bad" : ""}" @click=${() => ctx.openEntity(r.id)}>
              <span>${r.v < dry || r.problem ? "🥀" : "🌿"}</span>
              <b>${entityName(hass, config, r.id)}</b>
              ${Number.isNaN(r.v) ? nothing : html`<span class="ltr">${ltr(`${formatNumber(r.v, lang, 0)}%`)}</span>`}
            </div>`
          )
        : html`<sn-empty text=${t("plants_none")}></sn-empty>`}
    </div>`;
  }
}

// ---- pool ----

const poolGuess = (ctx: Ctx, re: RegExp, domains: string[], dc?: string[]) =>
  Object.values(ctx.hass.states).find((e) => domains.includes(domainOf(e.entity_id)) && /pool|spa|jacuzzi|بركة|مسبح|جاكوزي|בריכה/i.test(label(e)) && re.test(label(e)) && (!dc || dc.includes(e.attributes.device_class)))?.entity_id;

/** The pool at a glance: water temperature, pump and light, pH and chlorine when there are sensors for them. */
@customElement("sn-w-pool")
export class SnPool extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  static styles = base;

  private toggle(id?: string) {
    if (!id) return;
    haptic("tap");
    runTap(this.ctx.hass, this.ctx.hass.states[id]).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  render() {
    const { ctx } = this;
    const { t, hass, lang } = ctx;
    const c = this.widget.config;
    const temp = c.temp ?? poolGuess(ctx, /./, ["sensor"], ["temperature"]);
    const pump = c.pump ?? poolGuess(ctx, /pump|filter|مضخة|فلتر|משאבה/i, ["switch"]);
    const light = c.light ?? poolGuess(ctx, /light|ضو|إضاءة|אור/i, ["light", "switch"]);
    const heat = c.heater ?? poolGuess(ctx, /heat|سخان|تدفئة|חימום/i, ["climate", "switch", "water_heater"]);
    const ph = poolGuess(ctx, /\bph\b|_ph/i, ["sensor"]);
    const chlorine = poolGuess(ctx, /chlorine|orp|كلور|כלור/i, ["sensor"]);
    const T = temp ? hass.states[temp] : undefined;
    const btn = (id: string | undefined, icon: string, name: string) => {
      if (!id || !hass.states[id]) return nothing;
      const on = isActive(seen(hass.states[id]));
      return html`<button class="btn pressable ${on ? "primary" : ""}" @click=${() => this.toggle(id)}><sn-icon icon=${icon} style="--icon-size:18px"></sn-icon>${name}</button>`;
    };
    return html`<div class="card glass">
      <h3><sn-icon icon="pool"></sn-icon>${t("widget_pool")}</h3>
      ${T ? html`<div class="big ltr"><sn-num .value=${formatNumber(Number(T.state), lang, 1)}></sn-num><small>°</small></div><span class="muted2">${t("pool_water")}</span>` : nothing}
      <div style="display:flex;gap:8px;flex-wrap:wrap">${btn(pump, "pump", t("pool_pump"))} ${btn(light, "lightbulb", t("pool_light"))} ${btn(heat, "fire", t("pool_heat"))}</div>
      ${ph || chlorine
        ? html`<div class="grid2">
            ${ph ? html`<div class="stat"><b class="ltr">${formatNumber(Number(hass.states[ph].state), lang, 1)}</b><span>pH</span></div>` : nothing}
            ${chlorine ? html`<div class="stat"><b class="ltr">${hass.states[chlorine].state} ${hass.states[chlorine].attributes.unit_of_measurement ?? ""}</b><span>${t("pool_chlorine")}</span></div>` : nothing}
          </div>`
        : nothing}
      ${!T && !pump && !light ? html`<sn-empty text=${t("no_entities")}></sn-empty>` : nothing}
    </div>`;
  }
}

// ---- internet ----

/** The connection: download, upload and ping from Speedtest (or the router), whether it's up, and a test button. */
@customElement("sn-w-net")
export class SnNet extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private testing = false;
  static styles = base;

  render() {
    const { ctx } = this;
    const { t, hass, lang } = ctx;
    const all = Object.values(hass.states).filter((e) => e.entity_id.startsWith("sensor."));
    const find = (re: RegExp) => all.find((e) => re.test(e.entity_id) && !Number.isNaN(Number(e.state)));
    const down = find(/speedtest.*download|download.*speed|_download$/i);
    const up = find(/speedtest.*upload|upload.*speed|_upload$/i);
    const ping = find(/speedtest.*ping|_ping$|latency/i);
    const wan = Object.values(hass.states).find((e) => e.entity_id.startsWith("binary_sensor.") && /wan|internet|connectivity/i.test(e.entity_id) && e.attributes.device_class === "connectivity");
    const online = wan ? wan.state === "on" : undefined;
    const run = () => {
      this.testing = true;
      const svc = (hass as any).services?.speedtestdotnet?.speedtest ? hass.callService("speedtestdotnet", "speedtest", {}) : down ? hass.callService("homeassistant", "update_entity", { entity_id: down.entity_id }) : Promise.resolve();
      svc.catch(() => ctx.toast(t("error"))).finally(() => window.setTimeout(() => (this.testing = false), 25_000));
    };
    const stat = (e: HassEntity | undefined, name: string) =>
      e ? html`<div class="stat" @click=${() => ctx.openEntity(e.entity_id)}><b class="ltr">${formatNumber(Number(e.state), lang, 0)} <small style="font-size:12px">${e.attributes.unit_of_measurement ?? ""}</small></b><span>${name}</span></div>` : nothing;
    return html`<div class="card glass">
      <h3>
        <sn-icon icon=${online === false ? "wifi-off" : "wifi"} style=${online === false ? "color:var(--alert)" : ""}></sn-icon>${t("widget_net")}
        ${online !== undefined ? html`<span class="muted2" style="margin-inline-start:auto">${t(online ? "net_online" : "net_offline")}</span>` : nothing}
      </h3>
      ${down || up || ping
        ? html`<div class="grid2">${stat(down, t("net_down"))} ${stat(up, t("net_up"))} ${stat(ping, "ping")}</div>
            <span class="muted2">${down ? relativeTime(t, down.last_updated) : ""}</span>
            <button class="btn pressable" style="justify-self:start" ?disabled=${this.testing} @click=${run}><sn-icon icon="speedometer" style="--icon-size:18px"></sn-icon>${t(this.testing ? "net_testing" : "net_test")}</button>`
        : html`<sn-empty text=${t("net_none")}></sn-empty>`}
    </div>`;
  }
}

// ---- car ----

/** One car: battery or fuel, range, locked, charging, where it is; everything its integration gives, from any one of its entities. */
@customElement("sn-w-car")
export class SnCar extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  static styles = base;

  render() {
    const { ctx } = this;
    const { t, hass, config, lang } = ctx;
    const anchor =
      (this.widget.config.entity as string | undefined) ??
      Object.values(hass.states).find((e) => /tesla|car|vehicle|سيارة|רכב|byd|kia|hyundai|bmw|mercedes|toyota/i.test(label(e)) && /^(sensor|device_tracker|lock)\./.test(e.entity_id))?.entity_id;
    const dev = anchor ? hass.entities?.[anchor]?.device_id : undefined;
    const sibs = dev ? Object.entries(hass.entities ?? {}).filter(([, r]) => r.device_id === dev).map(([id]) => hass.states[id]).filter(Boolean) : anchor ? [hass.states[anchor]] : [];
    const by = (fn: (e: HassEntity) => boolean) => sibs.find((e) => e && fn(e));
    const battery = by((e) => e.entity_id.startsWith("sensor.") && e.attributes.device_class === "battery");
    const fuel = by((e) => e.entity_id.startsWith("sensor.") && /fuel|petrol|وقود|بنزين|דלק/i.test(label(e)));
    const range = by((e) => e.entity_id.startsWith("sensor.") && (e.attributes.device_class === "distance" || /range|مدى/i.test(label(e))) && !/odometer|عداد/i.test(label(e)));
    const lock = by((e) => e.entity_id.startsWith("lock."));
    const charging = by((e) => e.entity_id.startsWith("binary_sensor.") && (e.attributes.device_class === "battery_charging" || /charging|شحن/i.test(label(e))));
    const where = by((e) => e.entity_id.startsWith("device_tracker."));
    const level = battery ?? fuel;
    const v = Number(level?.state);
    if (!anchor) return html`<div class="card glass"><h3><sn-icon icon="car"></sn-icon>${t("widget_car")}</h3><sn-empty text=${t("car_pick")}></sn-empty></div>`;
    return html`<div class="card glass">
      <h3><sn-icon icon="car"></sn-icon>${this.widget.config.title || t("widget_car")}${charging?.state === "on" ? html`<span class="muted2" style="margin-inline-start:auto">⚡ ${t("car_charging")}</span>` : nothing}</h3>
      ${level
        ? html`<div class="big ltr"><sn-num .value=${formatNumber(v, lang, 0)}></sn-num><small>%</small></div>
            <div class="bar" style="--from:${ctx.rtl ? "right" : "left"}"><i style="transform:scaleX(${Math.max(0, Math.min(1, v / 100))});background:${v < 20 ? "var(--alert)" : "var(--success)"}"></i></div>`
        : nothing}
      <div class="grid2">
        ${range ? html`<div class="stat"><b class="ltr">${formatNumber(Number(range.state), lang, 0)} ${range.attributes.unit_of_measurement ?? ""}</b><span>${t("car_range")}</span></div>` : nothing}
        ${where ? html`<div class="stat"><b>${where.state === "home" ? t("at_home") : where.state === "not_home" ? t("away_l") : where.state}</b><span>${t("car_where")}</span></div>` : nothing}
      </div>
      ${lock
        ? html`<div class="row" @click=${() => ctx.openEntity(lock.entity_id)}>
            <sn-icon .icon=${entityIcon(lock, lock.entity_id)} style="--icon-size:20px"></sn-icon><b>${entityName(hass, config, lock.entity_id)}</b><span>${t(lock.state === "locked" ? "locked" : "unlocked")}</span>
          </div>`
        : nothing}
    </div>`;
  }
}

// ---- tomorrow's sun ----

/** Solar forecast (Forecast.Solar or Solcast): today and tomorrow in kWh, and the best hour to run the heavy machines. */
@customElement("sn-w-solarcast")
export class SnSolarCast extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  static styles = base;

  render() {
    const { ctx } = this;
    const { t, hass, lang } = ctx;
    const all = Object.values(hass.states).filter((e) => e.entity_id.startsWith("sensor."));
    const find = (re: RegExp) => all.find((e) => re.test(e.entity_id));
    const today = find(/energy_production_today$|forecast_today$|solcast.*today/);
    const tomorrow = find(/energy_production_tomorrow$|forecast_tomorrow$|solcast.*tomorrow/);
    const peak = find(/power_highest_peak_time_today$|peak_time_today$/);
    const now = find(/power_production_now$/);
    if (!today && !tomorrow) return html`<div class="card glass"><h3><sn-icon icon="solar"></sn-icon>${t("widget_solarcast")}</h3><sn-empty text=${t("solarcast_none")}></sn-empty></div>`;
    const kwh = (e?: HassEntity) => (e ? `${formatNumber(Number(e.state), lang, 1)}` : "–");
    const best = peak && !Number.isNaN(Date.parse(peak.state)) ? new Date(peak.state).toLocaleTimeString(LOCALE[lang], { hour: "2-digit", minute: "2-digit" }) : undefined;
    const t0 = Number(today?.state);
    const t1 = Number(tomorrow?.state);
    return html`<div class="card glass">
      <h3><sn-icon icon="solar"></sn-icon>${t("widget_solarcast")}</h3>
      <div class="grid2">
        <div class="stat"><b class="ltr">${kwh(today)} <small style="font-size:12px">kWh</small></b><span>${t("today")}</span></div>
        <div class="stat"><b class="ltr">${kwh(tomorrow)} <small style="font-size:12px">kWh</small></b><span>${t("tomorrow")} ${!Number.isNaN(t0) && !Number.isNaN(t1) ? (t1 > t0 * 1.1 ? "☀️" : t1 < t0 * 0.7 ? "☁️" : "⛅") : ""}</span></div>
      </div>
      ${best ? html`<div class="row"><span>🧺</span><b>${t("solarcast_best", { at: best })}</b></div>` : nothing}
      ${now ? html`<span class="muted2">${t("solarcast_now")} ${ltr(`${formatNumber(Number(now.state), lang, 0)} ${now.attributes.unit_of_measurement ?? "W"}`)}</span>` : nothing}
    </div>`;
  }
}

// ---- bin day ----

interface Bin {
  name: string;
  color: string;
  /** 0 = Sunday … 6 = Saturday */
  day: number;
}

/** Which bin goes out and when: "General waste tomorrow morning". Set the bins and their days in the widget. */
@customElement("sn-w-bins")
export class SnBins extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  static styles = [
    ...base,
    css`
      .bin {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      .bin.soon {
        box-shadow: inset 0 0 0 2px var(--accent);
      }
      .can {
        width: 30px;
        height: 36px;
        border-radius: 4px 4px 8px 8px;
        position: relative;
        flex: none;
      }
      .can::before {
        content: "";
        position: absolute;
        top: -5px;
        left: -3px;
        right: -3px;
        height: 6px;
        border-radius: 3px;
        background: inherit;
        filter: brightness(0.8);
      }
      .bin b {
        flex: 1;
      }
    `,
  ];

  render() {
    const { ctx } = this;
    const { t, lang } = ctx;
    const bins: Bin[] = this.widget.config.bins ?? [];
    const today = new Date().getDay();
    const list = bins
      .map((b) => ({ ...b, inDays: (b.day - today + 7) % 7 }))
      .sort((a, b) => a.inDays - b.inDays);
    const dayName = (d: number) => new Date(2023, 0, 1 + d).toLocaleDateString(LOCALE[lang], { weekday: "long" });
    return html`<div class="card glass">
      <h3><sn-icon icon="trash-can"></sn-icon>${t("widget_bins")}</h3>
      ${list.length
        ? list.map(
            (b) => html`<div class="bin ${b.inDays <= 1 ? "soon" : ""}">
              <span class="can" style="background:${b.color}"></span>
              <b>${b.name}</b>
              <span>${b.inDays === 0 ? t("today") : b.inDays === 1 ? t("bins_tomorrow") : dayName(b.day)}</span>
            </div>`
          )
        : html`<sn-empty text=${t("bins_set")}></sn-empty>`}
    </div>`;
  }
}

// ---- last activity per room ----

/**
 * When each room last saw someone, from its motion and presence sensors: "Kitchen 4 min · Bedroom 2 h". Rooms quiet
 * for longer than the limit stand out (a parent living alone, a holiday home).
 */
@customElement("sn-w-activity")
export class SnActivity extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  static styles = base;

  render() {
    const { ctx } = this;
    const { t, hass } = ctx;
    const limit = Number(this.widget.config.quiet_hours ?? 6) * 3_600_000;
    const sensors = Object.values(hass.states).filter(
      (e) => e.entity_id.startsWith("binary_sensor.") && ["motion", "occupancy", "presence"].includes(e.attributes.device_class) && visible(ctx, e)
    );
    const rooms = new Map<string, { on: boolean; last: number }>();
    for (const s of sensors) {
      const area = areaOf(hass, s.entity_id);
      const key = area ? hass.areas?.[area]?.name ?? area : entityName(hass, ctx.config, s.entity_id);
      const last = s.state === "on" ? Date.now() : Date.parse(s.last_changed);
      const r = rooms.get(key);
      rooms.set(key, { on: (r?.on ?? false) || s.state === "on", last: Math.max(r?.last ?? 0, last) });
    }
    const list = [...rooms.entries()].sort((a, b) => b[1].last - a[1].last);
    return html`<div class="card glass">
      <h3><sn-icon icon="motion-sensor"></sn-icon>${t("widget_activity")}</h3>
      ${list.length
        ? list.map(([name, r]) => {
            const quiet = !r.on && Date.now() - r.last > limit;
            return html`<div class="row ${quiet ? "bad" : ""}">
              <span>${r.on ? "🟢" : quiet ? "⚠️" : "⚪"}</span><b>${name}</b><span>${r.on ? t("activity_now") : relativeTime(t, new Date(r.last).toISOString())}</span>
            </div>`;
          })
        : html`<sn-empty text=${t("no_entities")}></sn-empty>`}
    </div>`;
  }
}
