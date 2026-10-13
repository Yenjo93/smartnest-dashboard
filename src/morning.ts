import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import { LOCALE } from "./i18n";
import { domainOf, entityName, formatNumber, ltr } from "./entities";
import { dashboardEntities } from "./chips";
import { greetingKey, greetingName, prayerTimes, todayForecast, weatherIcon, type DayForecast } from "./daily";
import { shared } from "./theme";
import "./ui/icon";

const KEY = "smartnest-morning";
const todayKey = () => new Date().toDateString();

/** Once a day, on the first touch after the night window ends and before noon. */
export function morningDue(ctx: Ctx, now: Date): boolean {
  const s = ctx.config.settings;
  if (!s.morning || ctx.editing || ctx.narrow) return false;
  const [h, m] = s.dark_to.split(":").map(Number);
  const mins = now.getHours() * 60 + now.getMinutes();
  if (mins < h * 60 + m || now.getHours() >= 12) return false;
  try {
    return localStorage.getItem(KEY) !== todayKey();
  } catch {
    return false;
  }
}

export function markMorningShown() {
  try {
    localStorage.setItem(KEY, todayKey());
  } catch {
    /* fine: may show again after a reload */
  }
}

interface LogEvent {
  entity_id: string;
  state?: string;
  when: number;
}

/** What happened overnight, in a few plain sentences, from the logbook since the dark window started yesterday. */
async function overnight(ctx: Ctx): Promise<string[]> {
  const { hass, t, config } = ctx;
  const s = config.settings;
  const [h, m] = s.dark_from.split(":").map(Number);
  const start = new Date();
  start.setDate(start.getDate() - 1);
  start.setHours(h, m, 0, 0);
  const bell = s.doorbell.trigger_entity;
  const ids = dashboardEntities(config).filter((id) => {
    const e = hass.states[id];
    if (!e) return false;
    const d = domainOf(id);
    return d === "vacuum" || (d === "binary_sensor" && ["door", "opening", "garage_door"].includes(e.attributes.device_class));
  });
  if (bell) ids.push(bell);
  let events: LogEvent[] = [];
  if (ids.length)
    try {
      events = await hass.callWS<LogEvent[]>({ type: "logbook/get_events", start_time: start.toISOString(), end_time: new Date().toISOString(), entity_ids: ids });
    } catch {
      events = [];
    }
  const lines: string[] = [];
  if (bell) {
    const n = events.filter((e) => e.entity_id === bell && (bell.startsWith("event.") || e.state === "on")).length;
    if (n) lines.push(n === 1 ? t("night_doorbell_1") : t("night_doorbell_n", { n }));
  }
  for (const id of ids.filter((x) => x.startsWith("binary_sensor.")).slice(0, 3)) {
    const n = events.filter((e) => e.entity_id === id && e.state === "on").length;
    const name = entityName(hass, config, id);
    if (n) lines.push(n === 1 ? t("night_door_1", { name }) : t("night_door_n", { name, n }));
  }
  if (events.some((e) => e.entity_id.startsWith("vacuum.") && e.state === "cleaning")) lines.push(t("night_robot"));
  for (const id of dashboardEntities(config).filter((x) => domainOf(x) === "lock" && hass.states[x]?.state === "unlocked"))
    lines.push(t("night_unlocked", { name: entityName(hass, config, id) }));
  return lines.length ? lines : [t("night_quiet")];
}

/** "Good morning": today's weather, the day's prayers, and what happened while everyone slept. */
@customElement("sn-morning")
export class SnMorning extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) onDone!: () => void;
  @state() private forecast: DayForecast = {};
  @state() private lines?: string[];
  private timer?: number;

  static styles = [
    shared,
    css`
      .scrim {
        position: fixed;
        inset: 0;
        z-index: 75;
        display: grid;
        place-items: center;
        padding: 24px;
        background: radial-gradient(80% 70% at 50% 0%, rgba(255, 200, 120, 0.45), transparent 70%), var(--scrim);
        -webkit-backdrop-filter: blur(18px);
        backdrop-filter: blur(18px);
        animation: fade 700ms var(--ease-out);
      }
      .card {
        width: min(900px, 100%);
        border-radius: var(--r-xl);
        background: var(--surface-solid);
        color: var(--text);
        box-shadow: var(--shadow-lift);
        padding: 32px;
        max-height: calc(100vh - 48px);
        overflow: auto;
        display: grid;
        gap: 26px;
        animation: up 700ms var(--spring);
      }
      .hello {
        display: grid;
        gap: 4px;
      }
      .hello h1 {
        margin: 0;
        font-size: clamp(30px, 4vw, 44px);
        font-weight: 700;
      }
      .hello .date {
        color: var(--text-2);
        font-size: 17px;
      }
      .cols {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
      }
      .box {
        border-radius: var(--r-lg);
        background: var(--surface-2);
        padding: 18px;
        display: grid;
        gap: 10px;
        align-content: start;
        animation: up 600ms var(--spring) both;
      }
      .box h2 {
        margin: 0;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--text-2);
      }
      .wx {
        display: flex;
        align-items: center;
        gap: 14px;
        --icon-size: 52px;
      }
      .wx sn-icon {
        color: var(--accent-text);
      }
      .wx .t {
        font-size: 40px;
        font-weight: 700;
        line-height: 1;
      }
      .wx .hl {
        color: var(--text-2);
        unicode-bidi: plaintext;
      }
      .row {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        font-size: 15px;
      }
      .row.past {
        opacity: 0.45;
      }
      .row .when {
        font-variant-numeric: tabular-nums;
        direction: ltr;
      }
      ul {
        margin: 0;
        padding-inline-start: 18px;
        display: grid;
        gap: 6px;
        font-size: 15px;
      }
      .go {
        justify-self: center;
        min-width: 200px;
        min-height: 52px;
        font-size: 17px;
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @keyframes up {
        from {
          opacity: 0;
          transform: translateY(24px) scale(0.98);
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    const id = this.ctx.config.settings.weather.entity;
    if (id && this.ctx.hass.states[id]) todayForecast(this.ctx.hass, id).then((f) => (this.forecast = f));
    overnight(this.ctx).then((l) => (this.lines = l));
    this.timer = window.setTimeout(() => this.onDone(), 60_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this.timer);
  }

  render() {
    const { ctx } = this;
    const { t } = ctx;
    const loc = LOCALE[ctx.lang];
    const now = new Date();
    const name = greetingName(ctx.hass, ctx.config.settings.greeting_name);
    const wid = ctx.config.settings.weather.entity;
    const w = wid ? ctx.hass.states[wid] : undefined;
    const deg = (v: unknown) => (typeof v === "number" ? ltr(`${formatNumber(v, ctx.lang, 0)}°`) : "–");
    const prayers = ctx.config.settings.prayer ? prayerTimes(ctx.hass) : [];
    return html`<div class="scrim" @click=${(e: Event) => e.target === e.currentTarget && this.onDone()}>
      <div class="card" role="dialog" aria-label=${t("morning_summary")}>
        <div class="hello">
          <h1>${t(greetingKey(now))}${name ? (ctx.lang === "ar" ? "، " : ", ") + name : ""} ☀️</h1>
          <span class="date">${now.toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "long" })}</span>
        </div>
        <div class="cols">
          ${w
            ? html`<div class="box" style="animation-delay:120ms">
                <h2>${t("today_weather")}</h2>
                <div class="wx">
                  <sn-icon .icon=${weatherIcon(this.forecast.condition ?? w.state)}></sn-icon>
                  <div>
                    <div class="t">${deg(w.attributes.temperature)}</div>
                    ${this.forecast.high !== undefined ? html`<div class="hl">${deg(this.forecast.high)} / ${deg(this.forecast.low)}</div>` : nothing}
                  </div>
                </div>
              </div>`
            : nothing}
          ${prayers.length
            ? html`<div class="box" style="animation-delay:220ms">
                <h2>${t("prayer")}</h2>
                ${prayers.map(
                  (p) => html`<div class="row ${p.at < now ? "past" : ""}">
                    <span>${t(`p_${p.id}`)}</span><span class="when">${p.at.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>`
                )}
              </div>`
            : nothing}
          <div class="box" style="animation-delay:320ms">
            <h2>${t("overnight")}</h2>
            ${this.lines ? html`<ul>${this.lines.map((l) => html`<li>${l}</li>`)}</ul>` : html`<span class="muted">${t("loading")}</span>`}
          </div>
        </div>
        <button class="btn primary pressable go" @click=${() => this.onDone()}>${t("lets_go")}</button>
      </div>
    </div>`;
  }
}
