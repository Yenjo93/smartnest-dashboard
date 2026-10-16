// Everyday cards: doors & windows, comfort per room, a kitchen timer, family reminders, a photo frame, who's on the
// Wi-Fi, and a baby room. Each finds its devices by itself; the widget's settings narrow it down.
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { HassEntity, Widget } from "../types";
import { areaOf, domainOf, entityIcon, entityName, formatNumber, isActive, ltr, relativeTime, runTap, seen } from "../entities";
import { uid } from "../config";
import { LOCALE } from "../i18n";
import { loadKv, saveKv, watchKv } from "../kv";
import { playBell } from "../sounds";
import { shared } from "../theme";
import { haptic } from "../ui/haptic";
import "../ui/icon";
import "../ui/num";
import "./camera";

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
      grid-template-columns: minmax(0, 1fr);
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
    h3 .side {
      margin-inline-start: auto;
      font-size: 13px;
      font-weight: 500;
      color: var(--text-2);
    }
    .big {
      font-size: 34px;
      font-weight: var(--display-weight, 700);
      line-height: 1;
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
    .row.good {
      background: color-mix(in srgb, var(--success) 14%, var(--surface-2));
    }
    .row.dim {
      opacity: 0.55;
    }
    .row sn-icon {
      --icon-size: 20px;
    }
    .grid2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
      gap: 8px;
    }
    .stat {
      padding: 10px 12px;
      border-radius: var(--r-md);
      background: var(--surface-2);
      display: grid;
      gap: 2px;
      cursor: pointer;
    }
    .stat b {
      font-size: 20px;
    }
    .stat span {
      font-size: 12px;
      color: var(--text-2);
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .chips .btn {
      min-height: 36px;
      padding-inline: 12px;
      font-size: 14px;
    }
    input {
      font: inherit;
      color: inherit;
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: var(--r-md);
      padding: 8px 10px;
      min-width: 0;
    }
  `,
];

const visible = (ctx: Ctx, e: HassEntity) => !ctx.hass.entities?.[e.entity_id]?.entity_category && !ctx.hass.entities?.[e.entity_id]?.hidden;
const chosen = (ctx: Ctx, w: Widget, find: () => string[]) => {
  const c: string[] = w.config.entities ?? [];
  return (c.length ? c : find()).filter((id) => ctx.hass.states[id]);
};
const roomName = (ctx: Ctx, id: string) => {
  const a = areaOf(ctx.hass, id);
  return a ? ctx.hass.areas?.[a]?.name ?? a : undefined;
};

// ---- doors & windows ----

const OPENING = ["door", "window", "garage_door", "opening"];

/** Every door and window sensor, the open ones first; "All closed" when the house is shut. Garage doors and gates too. */
@customElement("sn-w-openings")
export class SnOpenings extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  static styles = base;

  render() {
    const { ctx } = this;
    const { t, hass, config } = ctx;
    const ids = chosen(ctx, this.widget, () =>
      Object.values(hass.states)
        .filter(
          (e) =>
            visible(ctx, e) &&
            ((e.entity_id.startsWith("binary_sensor.") && OPENING.includes(e.attributes.device_class)) ||
              (e.entity_id.startsWith("cover.") && ["garage", "gate", "door", "window"].includes(e.attributes.device_class)))
        )
        .map((e) => e.entity_id)
    );
    const isOpen = (id: string) => {
      const s = hass.states[id].state;
      return domainOf(id) === "cover" ? ["open", "opening", "closing"].includes(s) : s === "on";
    };
    const open = ids.filter(isOpen).sort((a, b) => Date.parse(hass.states[a].last_changed) - Date.parse(hass.states[b].last_changed));
    const shut = ids.filter((id) => !isOpen(id));
    const row = (id: string, o: boolean) => {
      const e = hass.states[id];
      const room = roomName(ctx, id);
      return html`<div class="row ${o ? "bad" : ""}" @click=${() => ctx.openEntity(id, this)}>
        <sn-icon .icon=${entityIcon(e, id)} style=${o ? "color:var(--alert)" : "color:var(--text-2)"}></sn-icon>
        <b>${entityName(hass, config, id)}${room ? html` <span class="muted2">· ${room}</span>` : nothing}</b>
        <span class="muted2">${o ? relativeTime(t, e.last_changed) : t("closed")}</span>
      </div>`;
    };
    return html`<div class="card glass">
      <h3>
        <sn-icon icon=${open.length ? "door-open" : "door-closed-lock"} style=${open.length ? "color:var(--alert)" : ""}></sn-icon>${this.widget.config.title || t("widget_openings")}
        <span class="side">${ids.length ? (open.length ? t("openings_open_n", { n: open.length }) : t("openings_all_closed")) : ""}</span>
      </h3>
      ${ids.length
        ? html`${open.map((id) => row(id, true))} ${this.widget.config.only_open ? nothing : shut.map((id) => row(id, false))}
          ${this.widget.config.only_open && !open.length ? html`<div class="row good"><span>✅</span><b>${t("openings_all_closed")}</b></div>` : nothing}`
        : html`<sn-empty text=${t("no_entities")}></sn-empty>`}
    </div>`;
  }
}

// ---- comfort per room ----

interface Comfort {
  room: string;
  temp?: HassEntity;
  hum?: HassEntity;
  co2?: HassEntity;
  score: number;
}

/** 100 = comfortable. Temperature 21-25°, humidity 40-60%, CO₂ under 800 ppm; each step away costs points. */
function comfortScore(temp?: number, hum?: number, co2?: number) {
  let s = 100;
  if (temp !== undefined && !Number.isNaN(temp)) s -= Math.min(40, Math.max(0, 21 - temp, temp - 25) * 8);
  if (hum !== undefined && !Number.isNaN(hum)) s -= Math.min(30, Math.max(0, 40 - hum, hum - 60) * 1.5);
  if (co2 !== undefined && !Number.isNaN(co2)) s -= Math.min(40, Math.max(0, co2 - 800) / 20);
  return Math.max(0, Math.round(s));
}

/** Each room's temperature, humidity and air with one comfort score, the least comfortable room first. */
@customElement("sn-w-comfort")
export class SnComfort extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  static styles = [
    ...base,
    css`
      .room {
        display: grid;
        grid-template-columns: 44px minmax(0, 1fr);
        gap: 10px;
        align-items: center;
        padding: 8px 10px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      .ring {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        font-weight: 700;
        font-size: 14px;
        background: conic-gradient(var(--c) calc(var(--p) * 1%), color-mix(in srgb, var(--text-2) 18%, transparent) 0);
        position: relative;
      }
      .ring::before {
        content: "";
        position: absolute;
        inset: 4px;
        border-radius: 50%;
        background: var(--surface-2);
      }
      .ring span {
        position: relative;
      }
      .room b {
        display: block;
        font-weight: 600;
      }
      .vals {
        display: flex;
        gap: 12px;
        font-size: 13px;
        color: var(--text-2);
        flex-wrap: wrap;
      }
      .vals span {
        cursor: pointer;
      }
    `,
  ];

  render() {
    const { ctx } = this;
    const { t, hass, lang } = ctx;
    const only: string[] | undefined = this.widget.config.areas?.length ? this.widget.config.areas : undefined;
    const rooms = new Map<string, Comfort>();
    for (const e of Object.values(hass.states)) {
      if (!e.entity_id.startsWith("sensor.") || !visible(ctx, e) || Number.isNaN(Number(e.state))) continue;
      const kind = e.attributes.device_class === "temperature" ? "temp" : e.attributes.device_class === "humidity" ? "hum" : e.attributes.device_class === "carbon_dioxide" ? "co2" : undefined;
      if (!kind) continue;
      const area = areaOf(hass, e.entity_id);
      if (!area || (only && !only.includes(area))) continue;
      const r = rooms.get(area) ?? { room: hass.areas?.[area]?.name ?? area, score: 100 };
      if (!r[kind]) r[kind] = e;
      rooms.set(area, r);
    }
    const list = [...rooms.values()]
      .filter((r) => r.temp || r.co2)
      .map((r) => ({ ...r, score: comfortScore(r.temp && Number(r.temp.state), r.hum && Number(r.hum.state), r.co2 && Number(r.co2.state)) }))
      .sort((a, b) => a.score - b.score);
    const color = (s: number) => (s >= 80 ? "var(--success)" : s >= 55 ? "var(--accent)" : "var(--alert)");
    const val = (e: HassEntity | undefined, unit: string, digits: number) =>
      e ? html`<span class="ltr" @click=${() => ctx.openEntity(e.entity_id, this)}>${ltr(`${formatNumber(Number(e.state), lang, digits)}${unit}`)}</span>` : nothing;
    const avg = list.length ? Math.round(list.reduce((s, r) => s + r.score, 0) / list.length) : 0;
    return html`<div class="card glass">
      <h3><sn-icon icon="sofa-single-outline"></sn-icon>${t("widget_comfort")}${list.length ? html`<span class="side">${t("comfort_house", { n: avg })}</span>` : nothing}</h3>
      ${list.length
        ? list.map(
            (r) => html`<div class="room">
              <div class="ring" style="--p:${r.score};--c:${color(r.score)}"><span>${r.score}</span></div>
              <div>
                <b>${r.room}</b>
                <div class="vals">${val(r.temp, "°", 1)} ${val(r.hum, "%", 0)} ${val(r.co2, " ppm", 0)}</div>
              </div>
            </div>`
          )
        : html`<sn-empty text=${t("comfort_none")}></sn-empty>`}
    </div>`;
  }
}

// ---- kitchen timer ----

interface Timer {
  id: string;
  name: string;
  ends: number;
  total: number;
}
const TIMERS_KEY = "smartnest-kitchen-timers";
const readTimers = (): Timer[] => {
  try {
    return JSON.parse(localStorage.getItem(TIMERS_KEY) ?? "[]");
  } catch {
    return [];
  }
};

/** Countdowns on this screen (pasta 8 min, oven 40 min): quick buttons, several at once, rings here when done. */
@customElement("sn-w-ktimer")
export class SnKitchenTimer extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private timers: Timer[] = readTimers();
  @state() private now = Date.now();
  private tick?: number;
  private rang = new Set<string>();
  static styles = [
    ...base,
    css`
      .t {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto auto;
        gap: 8px;
        align-items: center;
        padding: 8px 10px;
        border-radius: var(--r-md);
        background: var(--surface-2);
        position: relative;
        overflow: hidden;
      }
      .t i {
        position: absolute;
        inset: 0;
        background: color-mix(in srgb, var(--accent) 22%, transparent);
        transform-origin: var(--from, left);
        pointer-events: none;
      }
      .t.done {
        background: color-mix(in srgb, var(--alert) 28%, var(--surface-2));
        animation: blink 1s steps(2) infinite;
      }
      @keyframes blink {
        50% {
          opacity: 0.6;
        }
      }
      .t b {
        position: relative;
        font-size: 24px;
        font-variant-numeric: tabular-nums;
      }
      .t span {
        position: relative;
        font-size: 13px;
        color: var(--text-2);
      }
      .t button {
        position: relative;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.tick = window.setInterval(() => this.step(), 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.tick);
  }

  private step() {
    this.now = Date.now();
    for (const tm of this.timers)
      if (tm.ends <= this.now && this.now - tm.ends < 60_000 && Math.floor((this.now - tm.ends) / 1000) % 4 === 0) {
        // Ring every few seconds for a minute, unless someone stops it.
        playBell("melody");
        if (!this.rang.has(tm.id)) {
          this.rang.add(tm.id);
          haptic("success");
          this.ctx.toast(`⏰ ${tm.name || this.ctx.t("widget_ktimer")}`);
        }
      }
  }

  private save(list: Timer[]) {
    this.timers = list;
    try {
      localStorage.setItem(TIMERS_KEY, JSON.stringify(list));
    } catch {
      /* private mode: timers just don't survive a reload */
    }
  }

  private add(min: number, name = "") {
    haptic("tap");
    this.save([...this.timers, { id: uid(), name, ends: Date.now() + min * 60_000, total: min * 60_000 }].sort((a, b) => a.ends - b.ends));
  }

  private custom(e: Event) {
    e.preventDefault();
    const f = e.target as HTMLFormElement;
    const min = Number((f.elements.namedItem("min") as HTMLInputElement).value);
    const name = (f.elements.namedItem("name") as HTMLInputElement).value.trim();
    if (min > 0) this.add(min, name);
    f.reset();
  }

  render() {
    const { t, rtl } = this.ctx;
    const presets: number[] = this.widget.config.presets?.length ? this.widget.config.presets : [3, 5, 10, 15, 30, 60];
    const fmt = (ms: number) => {
      const s = Math.max(0, Math.ceil(ms / 1000));
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const r = s % 60;
      return (h ? `${h}:${String(m).padStart(2, "0")}` : `${m}`) + `:${String(r).padStart(2, "0")}`;
    };
    return html`<div class="card glass">
      <h3><sn-icon icon="timer-outline"></sn-icon>${t("widget_ktimer")}</h3>
      ${this.timers.map((tm) => {
        const left = tm.ends - this.now;
        const done = left <= 0;
        return html`<div class="t ${done ? "done" : ""}">
          <i style="--from:${rtl ? "right" : "left"};transform:scaleX(${done ? 1 : 1 - left / tm.total})"></i>
          <div style="display:grid;position:relative"><b class="ltr">${done ? t("ktimer_done") : ltr(fmt(left))}</b><span>${tm.name}</span></div>
          ${done ? nothing : html`<button class="btn pressable" @click=${() => this.save(this.timers.map((x) => (x.id === tm.id ? { ...x, ends: x.ends + 60_000, total: x.total + 60_000 } : x)))}>+1</button>`}
          <button class="icon-btn small pressable" aria-label=${t("delete")} @click=${() => this.save(this.timers.filter((x) => x.id !== tm.id))}><sn-icon icon="close" style="--icon-size:16px"></sn-icon></button>
        </div>`;
      })}
      <div class="chips">${presets.map((m) => html`<button class="btn pressable" @click=${() => this.add(m)}>${m < 60 ? t("min_n", { n: m }) : t("hour_n", { n: m / 60 })}</button>`)}</div>
      <form style="display:flex;gap:6px;min-width:0" @submit=${this.custom}>
        <input name="name" style="flex:1;width:0" placeholder=${t("ktimer_what")} />
        <input name="min" type="number" min="1" max="600" style="width:70px" placeholder=${t("minutes")} inputmode="numeric" />
        <button class="btn primary pressable" type="submit">▶</button>
      </form>
    </div>`;
  }
}

// ---- reminders ----

interface Reminder {
  id: string;
  text: string;
  /** HH:MM, every day. */
  at: string;
  /** "YYYY-MM-DD" → who did it, for today's tick. */
  done?: Record<string, string>;
}
interface Reminders {
  items: Reminder[];
}

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/** Daily reminders for the family (medicine at 8, feed the cat at 18): late ones turn red, a tap marks them done for today. */
@customElement("sn-w-reminders")
export class SnReminders extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private data: Reminders = { items: [] };
  @state() private adding = false;
  @state() private now = Date.now();
  private unwatch?: Promise<() => void>;
  private tick?: number;
  static styles = base;

  connectedCallback() {
    super.connectedCallback();
    loadKv<Reminders>(this.ctx.hass, "reminders").then((v) => (this.data = { items: v?.items ?? [] }));
    this.unwatch = watchKv<Reminders>(this.ctx.hass, "reminders", (v) => (this.data = { items: v?.items ?? [] }));
    this.tick = window.setInterval(() => (this.now = Date.now()), 60_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unwatch?.then((u) => u()).catch(() => undefined);
    window.clearInterval(this.tick);
  }

  private save(items: Reminder[]) {
    this.data = { items };
    saveKv(this.ctx.hass, "reminders", this.data).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  private toggle(r: Reminder) {
    const d = today();
    haptic(r.done?.[d] ? "tap" : "success");
    // Keep only today's tick: yesterday's don't matter any more.
    this.save(this.data.items.map((x) => (x.id === r.id ? { ...x, done: x.done?.[d] ? {} : { [d]: this.ctx.hass.user?.name ?? "✓" } } : x)));
  }

  private add(e: Event) {
    e.preventDefault();
    const f = e.target as HTMLFormElement;
    const text = (f.elements.namedItem("text") as HTMLInputElement).value.trim();
    const at = (f.elements.namedItem("at") as HTMLInputElement).value || "08:00";
    if (!text) return;
    this.save([...this.data.items, { id: uid(), text, at }].sort((a, b) => a.at.localeCompare(b.at)));
    this.adding = false;
  }

  render() {
    const { t, lang } = this.ctx;
    const d = today();
    const now = new Date(this.now);
    const hm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const items = [...this.data.items].sort((a, b) => a.at.localeCompare(b.at));
    const late = items.filter((r) => !r.done?.[d] && r.at <= hm).length;
    const time = (at: string) => {
      const [h, m] = at.split(":").map(Number);
      return new Date(2023, 0, 1, h, m).toLocaleTimeString(LOCALE[lang], { hour: "numeric", minute: "2-digit" });
    };
    return html`<div class="card glass">
      <h3>
        <sn-icon icon="pill"></sn-icon>${this.widget.config.title || t("widget_reminders")}
        <span class="side">${late ? t("reminders_late", { n: late }) : items.length ? `${items.filter((r) => r.done?.[d]).length}/${items.length}` : ""}</span>
      </h3>
      ${items.map((r) => {
        const done = r.done?.[d];
        return html`<div class="row ${done ? "good" : r.at <= hm ? "bad" : ""}" @click=${() => this.toggle(r)}>
          <span>${done ? "✅" : r.at <= hm ? "⏰" : "⬜"}</span>
          <b style=${done ? "text-decoration:line-through;opacity:.7" : ""}>${r.text}</b>
          <span class="muted2">${done && done !== "✓" ? done : time(r.at)}</span>
          ${this.adding
            ? html`<button class="icon-btn small pressable" aria-label=${t("delete")} @click=${(e: Event) => (e.stopPropagation(), this.save(this.data.items.filter((x) => x.id !== r.id)))}>
                <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
              </button>`
            : nothing}
        </div>`;
      })}
      ${!items.length && !this.adding ? html`<sn-empty text=${t("reminders_none")}></sn-empty>` : nothing}
      ${this.adding
        ? html`<form style="display:flex;gap:6px" @submit=${this.add}>
            <input name="text" style="flex:1;width:0" placeholder=${t("reminders_what")} />
            <input name="at" type="time" value="08:00" />
            <button class="btn primary pressable" type="submit">${t("add")}</button>
          </form>`
        : nothing}
      <button class="btn pressable" style="justify-self:start" @click=${() => (this.adding = !this.adding)}>
        <sn-icon icon=${this.adding ? "check" : "pencil"} style="--icon-size:18px"></sn-icon>${t(this.adding ? "done" : "reminders_edit")}
      </button>
    </div>`;
  }
}

// ---- photo frame ----

/** The family's photos on a card, cross-fading every few seconds, from the screensaver's folder or one of its own. */
@customElement("sn-w-photos")
export class SnPhotos extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private slides: { url: string; key: number }[] = [];
  @state() private empty = false;
  private ids: string[] = [];
  private idx = 0;
  private timer?: number;
  private alive = false;
  static styles = [
    ...base,
    css`
      .frame {
        position: relative;
        height: 100%;
        border-radius: var(--r-lg);
        overflow: hidden;
        background: var(--surface-2);
      }
      img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        animation: fade 1.2s ease both, drift 20s ease-out both;
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @keyframes drift {
        from {
          transform: scale(1.08);
        }
      }
      .frame .card {
        position: absolute;
        inset: 0;
        place-content: center;
        text-align: center;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.alive = true;
    this.load();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.alive = false;
    window.clearTimeout(this.timer);
  }

  private async load() {
    const folder: string = this.widget.config.folder || this.ctx.config.settings.screensaver.photo_folder;
    if (!folder) return void (this.empty = true);
    try {
      const res = await this.ctx.hass.callWS<{ children?: { media_class: string; media_content_id: string }[] }>({
        type: "media_source/browse_media",
        media_content_id: folder.startsWith("media-source://") ? folder : `media-source://media_source/local/${folder}`,
      });
      this.ids = (res.children ?? []).filter((c) => c.media_class === "image").map((c) => c.media_content_id);
    } catch {
      this.ids = [];
    }
    for (let i = this.ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.ids[i], this.ids[j]] = [this.ids[j], this.ids[i]];
    }
    this.empty = !this.ids.length;
    this.next();
  }

  private async next() {
    if (!this.alive || !this.ids.length) return;
    const id = this.ids[this.idx++ % this.ids.length];
    try {
      const { url } = await this.ctx.hass.callWS<{ url: string }>({ type: "media_source/resolve_media", media_content_id: id });
      const full = this.ctx.hass.hassUrl(url);
      await new Promise<void>((ok, fail) => {
        const img = new Image();
        img.onload = () => ok();
        img.onerror = () => fail();
        img.src = full;
      });
      if (!this.alive) return;
      this.slides = [...this.slides.slice(-1), { url: full, key: Date.now() }];
    } catch {
      /* skip a broken file */
    }
    this.timer = window.setTimeout(() => this.next(), Math.max(5, Number(this.widget.config.seconds ?? 15)) * 1000);
  }

  render() {
    const { t } = this.ctx;
    return html`<div class="frame glass">
      ${this.slides.map((s) => html`<img src=${s.url} alt="" />`)}
      ${this.empty ? html`<div class="card"><sn-icon icon="image-multiple" style="--icon-size:36px;color:var(--text-2)"></sn-icon><span class="muted2">${t("photos_none")}</span></div>` : nothing}
    </div>`;
  }
}

// ---- Wi-Fi devices ----

/** Phones and gadgets the router sees: how many are connected now, and each one with when it came or left. */
@customElement("sn-w-wifi")
export class SnWifi extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  static styles = base;

  render() {
    const { ctx } = this;
    const { t, hass, config } = ctx;
    const ids = chosen(ctx, this.widget, () =>
      Object.values(hass.states)
        .filter((e) => e.entity_id.startsWith("device_tracker.") && e.attributes.source_type === "router" && visible(ctx, e))
        .map((e) => e.entity_id)
    );
    const on = ids.filter((id) => hass.states[id].state === "home").sort((a, b) => Date.parse(hass.states[b].last_changed) - Date.parse(hass.states[a].last_changed));
    const off = ids.filter((id) => hass.states[id].state !== "home");
    const row = (id: string, here: boolean) => {
      const e = hass.states[id];
      return html`<div class="row ${here ? "" : "dim"}" @click=${() => ctx.openEntity(id, this)}>
        <sn-icon icon=${/phone|iphone|galaxy|pixel|android/i.test(id + (e.attributes.friendly_name ?? "")) ? "cellphone" : /tv|cast|roku|shield/i.test(id) ? "television" : /laptop|macbook|pc|desktop/i.test(id) ? "laptop" : "devices"}></sn-icon>
        <b>${entityName(hass, config, id)}</b>
        <span class="muted2">${relativeTime(t, e.last_changed)}</span>
      </div>`;
    };
    return html`<div class="card glass">
      <h3><sn-icon icon="wifi"></sn-icon>${t("widget_wifi")}${ids.length ? html`<span class="side">${t("wifi_on_n", { n: on.length })}</span>` : nothing}</h3>
      ${ids.length
        ? html`${on.map((id) => row(id, true))} ${this.widget.config.only_on ? nothing : off.map((id) => row(id, false))}`
        : html`<sn-empty text=${t("wifi_none")}></sn-empty>`}
    </div>`;
  }
}

// ---- baby room ----

/** The baby's room in one card: the camera, temperature and humidity, the night light and the white noise. */
@customElement("sn-w-baby")
export class SnBaby extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  static styles = [
    ...base,
    css`
      .card {
        grid-template-rows: auto auto auto;
      }
      .cam {
        height: 180px;
        border-radius: var(--r-md);
        overflow: hidden;
      }
      .ok {
        color: var(--success);
      }
      .warn {
        color: var(--alert);
      }
    `,
  ];

  private toggle(id: string) {
    haptic("tap");
    runTap(this.ctx.hass, this.ctx.hass.states[id]).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  render() {
    const { ctx } = this;
    const { t, hass, config, lang } = ctx;
    const c = this.widget.config;
    const area: string | undefined = c.area;
    const inRoom = (e: HassEntity) => (area ? areaOf(hass, e.entity_id) === area : /baby|nursery|طفل|بيبي|תינוק/i.test(`${e.entity_id} ${e.attributes.friendly_name ?? ""}`));
    const find = (fn: (e: HassEntity) => boolean) => Object.values(hass.states).find((e) => visible(ctx, e) && inRoom(e) && fn(e))?.entity_id;
    const cam: string | undefined = c.camera ?? find((e) => e.entity_id.startsWith("camera."));
    const temp: string | undefined = c.temp ?? find((e) => e.entity_id.startsWith("sensor.") && e.attributes.device_class === "temperature");
    const hum: string | undefined = c.humidity ?? find((e) => e.entity_id.startsWith("sensor.") && e.attributes.device_class === "humidity");
    const light: string | undefined = c.light ?? find((e) => e.entity_id.startsWith("light."));
    const noise: string | undefined = c.noise ?? find((e) => /^(media_player|switch)\./.test(e.entity_id) && /noise|sound|music|ضجيج|صوت|רעש/i.test(`${e.entity_id} ${e.attributes.friendly_name ?? ""}`));
    const tv = temp && hass.states[temp] ? Number(hass.states[temp].state) : NaN;
    const hv = hum && hass.states[hum] ? Number(hass.states[hum].state) : NaN;
    // A baby's room: 20-22° and 40-60% are the usual advice.
    const tOk = Number.isNaN(tv) || (tv >= 19 && tv <= 23);
    const hOk = Number.isNaN(hv) || (hv >= 40 && hv <= 60);
    const btn = (id: string | undefined, icon: string, name: string) => {
      if (!id || !hass.states[id]) return nothing;
      const on = isActive(seen(hass.states[id]));
      return html`<button class="btn pressable ${on ? "primary" : ""}" @click=${() => this.toggle(id)}><sn-icon icon=${icon} style="--icon-size:18px"></sn-icon>${name}</button>`;
    };
    if (!cam && !temp && !light) return html`<div class="card glass"><h3><sn-icon icon="baby-face-outline"></sn-icon>${c.title || t("widget_baby")}</h3><sn-empty text=${t("baby_pick")}></sn-empty></div>`;
    return html`<div class="card glass">
      <h3><sn-icon icon="baby-face-outline"></sn-icon>${c.title || t("widget_baby")}<span class="side ${tOk && hOk ? "ok" : "warn"}">${tOk && hOk ? t("baby_ok") : t("baby_check")}</span></h3>
      ${cam && hass.states[cam] ? html`<div class="cam"><sn-w-camera .ctx=${ctx} .widget=${{ ...this.widget, type: "camera", config: { entity: cam, live: c.live } }}></sn-w-camera></div>` : nothing}
      <div class="grid2">
        ${temp && hass.states[temp]
          ? html`<div class="stat" @click=${() => ctx.openEntity(temp, this)}><b class="ltr ${tOk ? "" : "warn"}">${formatNumber(tv, lang, 1)}°</b><span>${entityName(hass, config, temp)}</span></div>`
          : nothing}
        ${hum && hass.states[hum] ? html`<div class="stat" @click=${() => ctx.openEntity(hum, this)}><b class="ltr ${hOk ? "" : "warn"}">${formatNumber(hv, lang, 0)}%</b><span>${t("humidity")}</span></div>` : nothing}
      </div>
      <div class="chips">${btn(light, "lightbulb-night-outline", t("baby_light"))} ${btn(noise, "waveform", t("baby_noise"))}</div>
    </div>`;
  }
}
