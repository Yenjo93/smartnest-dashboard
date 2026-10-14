import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import type { Hass } from "./types";
import { LOCALE, type I18nKey, type Translate } from "./i18n";
import { domainOf, entityIcon, entityName } from "./entities";
import { uid } from "./config";
import { MODES } from "./widgets/modes";
import { shared } from "./theme";
import "./ui/icon";
import "./ui/entity-picker";
import { dismiss, findHabits, habitKey, type Habit } from "./suggest";
import { aiEntity } from "./ai";
import { automationFromText } from "./ai-features";

// ---- model ----

export type Trigger =
  | { kind: "time"; at: string }
  | { kind: "sun"; event: "sunrise" | "sunset"; offset: number }
  | { kind: "state"; entity: string; to: string }
  | { kind: "mode"; mode: string };

export type Action = { kind: "on" | "off"; entity: string } | { kind: "mode"; mode: string } | { kind: "message"; text: string };

export interface AutoModel {
  id: string;
  name: string;
  trigger: Trigger;
  days: string[]; // HA weekdays; empty = every day
  window?: { after: string; before: string };
  actions: Action[];
}

export const WEEK = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const ACTION_DOMAINS = ["light", "switch", "fan", "input_boolean", "media_player", "climate", "cover", "humidifier", "siren", "scene", "script"];

export function dayName(d: string, lang: string, style: "short" | "long" = "short") {
  // 2023-01-01 was a Sunday.
  return new Date(2023, 0, 1 + WEEK.indexOf(d)).toLocaleDateString(lang, { weekday: style });
}

/** Values a device can "become", for the "when a device changes" trigger. */
export function stateOptions(hass: Hass, entity: string, t: Translate): [string, string][] {
  const d = domainOf(entity);
  const cls = hass.states[entity]?.attributes.device_class;
  if (d === "lock") return [["locked", t("locked")], ["unlocked", t("unlocked")]];
  if (d === "cover") return [["open", t("open")], ["closed", t("closed")]];
  if (d === "person") return [["home", t("at_home")], ["not_home", t("away_l")]];
  if (d === "climate") return [["off", t("off")], ["cool", t("cool")], ["heat", t("heat")]];
  if (d === "alarm_control_panel") return [["disarmed", t("disarmed")], ["armed_away", t("armed_away")], ["triggered", t("triggered")]];
  if (d === "binary_sensor" && ["motion", "occupancy", "presence"].includes(cls)) return [["on", t("motion")], ["off", t("clear")]];
  if (d === "binary_sensor" && ["door", "window", "opening", "garage_door"].includes(cls)) return [["on", t("open")], ["off", t("closed")]];
  return [["on", t("on")], ["off", t("off")]];
}

const hms = (hhmm: string) => (hhmm.length === 5 ? `${hhmm}:00` : hhmm);
const offset = (min: number) => `${min < 0 ? "-" : "+"}${String(Math.floor(Math.abs(min) / 60)).padStart(2, "0")}:${String(Math.abs(min) % 60).padStart(2, "0")}:00`;

/** Home Assistant automation config, in the long-standing syntax so it loads on older installs too. */
export function toHA(m: AutoModel) {
  const tr = m.trigger;
  const trigger =
    tr.kind === "time"
      ? { platform: "time", at: hms(tr.at) }
      : tr.kind === "sun"
      ? { platform: "sun", event: tr.event, ...(tr.offset ? { offset: offset(tr.offset) } : {}) }
      : tr.kind === "state"
      ? { platform: "state", entity_id: tr.entity, to: tr.to }
      : { platform: "state", entity_id: "input_select.house_mode", to: tr.mode };
  const condition: Record<string, unknown>[] = [];
  if (m.days.length && m.days.length < 7) condition.push({ condition: "time", weekday: m.days });
  if (m.window) condition.push({ condition: "time", after: hms(m.window.after), before: hms(m.window.before) });
  const action = m.actions.map((a) => {
    if (a.kind === "mode") return { service: "script.turn_on", target: { entity_id: `script.smartnest_mode_${a.mode}` } };
    if (a.kind === "message") return { service: "smartnest.show_message", data: { message: a.text } };
    const d = domainOf(a.entity);
    if (d === "scene" || d === "script") return { service: `${d}.turn_on`, target: { entity_id: a.entity } };
    return { service: `homeassistant.turn_${a.kind}`, target: { entity_id: a.entity } };
  });
  return { id: m.id, alias: `SmartNest · ${m.name}`, description: "Made in the SmartNest dashboard", mode: "single", trigger: [trigger], condition, action };
}

/** One readable sentence: "Every weekday at 05:30, turn on Water heater". */
export function sentence(m: AutoModel, hass: Hass, t: Translate, lang: string, names: Record<string, string>): string {
  const nm = (id: string) => names[id] || hass.states[id]?.attributes.friendly_name || id;
  const tr = m.trigger;
  const when =
    tr.kind === "time"
      ? tr.at
      : tr.kind === "sun"
      ? `${t(tr.event)}${tr.offset ? ` ${tr.offset > 0 ? "+" : "−"}${Math.abs(tr.offset)}′` : ""}`
      : tr.kind === "state"
      ? `${nm(tr.entity)} → ${stateOptions(hass, tr.entity, t).find(([v]) => v === tr.to)?.[1] ?? tr.to}`
      : `${t("widget_modes")} → ${t(MODES.find((x) => x.id === tr.mode)?.label ?? "mode_home")}`;
  const days = !m.days.length || m.days.length === 7 ? t("every_day") : m.days.map((d) => dayName(d, lang)).join(" ");
  const what = m.actions
    .map((a) => (a.kind === "mode" ? t(MODES.find((x) => x.id === a.mode)?.label ?? "mode_home") : a.kind === "message" ? `💬 ${a.text}` : `${t(a.kind === "on" ? "act_on" : "act_off")} ${nm(a.entity)}`))
    .join(lang === "ar" ? "، " : ", ");
  return `${days} · ${when} → ${what}`;
}

// ---- storage ----

async function getSummaries(hass: Hass): Promise<AutoModel[]> {
  try {
    return (await hass.callWS<{ items: AutoModel[] }>({ type: "smartnest/automations/get" })).items;
  } catch {
    return [];
  }
}

async function saveModel(hass: Hass, m: AutoModel) {
  const res = await hass.fetchWithAuth(`/api/config/automation/config/${m.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toHA(m)),
  });
  if (!res.ok) throw new Error(`save ${res.status}`);
  const items = (await getSummaries(hass)).filter((x) => x.id !== m.id);
  await hass.callWS({ type: "smartnest/automations/set", items: [...items, m] });
}

async function deleteModel(hass: Hass, id: string) {
  await hass.fetchWithAuth(`/api/config/automation/config/${id}`, { method: "DELETE" });
  await hass.callWS({ type: "smartnest/automations/set", items: (await getSummaries(hass)).filter((x) => x.id !== id) });
}

export const automationEntity = (hass: Hass, id: string) => Object.values(hass.states).find((e) => e.entity_id.startsWith("automation.") && e.attributes.id === id);

// ---- UI ----

/** Admin sheet: SmartNest's own automations, each with on/off, edit and delete. */
export function automationsSheet(ctx: Ctx) {
  ctx.showSheet({ title: ctx.t("automations"), render: (c) => html`<sn-auto-list .ctx=${c}></sn-auto-list>` });
}

export function builderSheet(ctx: Ctx, model?: AutoModel, onSaved?: () => void) {
  ctx.showSheet({
    title: model ? model.name : ctx.t("new_automation"),
    render: (c) => html`<sn-auto-builder .ctx=${c} .initial=${model} .onSaved=${onSaved}></sn-auto-builder>`,
  });
}

@customElement("sn-auto-list")
export class SnAutoList extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @state() private items?: AutoModel[];
  @state() private habits?: Habit[];
  @state() private thinking = false;

  static styles = [
    shared,
    css`
      :host {
        display: grid;
        gap: 10px;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      .txt {
        flex: 1;
        min-width: 0;
        display: grid;
        gap: 2px;
      }
      .txt b {
        font-size: 15px;
      }
      .txt span {
        font-size: 13px;
        color: var(--text-2);
        unicode-bidi: plaintext;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.load();
  }

  private async load() {
    this.items = await getSummaries(this.ctx.hass);
    if (this.ctx.allows("habits")) findHabits(this.ctx, this.items).then((h) => (this.habits = h));
  }

  private renderHabits() {
    const { ctx } = this;
    const { t } = ctx;
    if (!this.habits?.length) return nothing;
    return html`<h4 style="margin:10px 0 0;display:flex;gap:6px;align-items:center">
        <sn-icon icon="lightbulb-auto" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${t("habits_title")}
      </h4>
      ${this.habits.map(
        (h) => html`<div class="row">
          <span class="txt"
            ><b>${sentence(h.model, ctx.hass, t, LOCALE[ctx.lang], ctx.config.names)}</b><span>${t("habits_seen", { n: h.days })}</span></span
          >
          <button class="btn primary pressable" @click=${() => builderSheet(ctx, h.model, () => this.load())}>${t("habits_make")}</button>
          <button
            class="icon-btn small pressable"
            aria-label=${t("dismiss")}
            @click=${() => {
              dismiss(habitKey(h));
              this.habits = this.habits!.filter((x) => x !== h);
            }}
          >
            <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
          </button>
        </div>`
      )}`;
  }

  render() {
    const { ctx } = this;
    const { t, hass } = ctx;
    return html`<button class="btn primary pressable" @click=${() => builderSheet(ctx, undefined, () => this.load())}>
        <sn-icon icon="plus" style="--icon-size:20px"></sn-icon>${t("new_automation")}
      </button>
      ${aiEntity(hass) && ctx.allows("ai_automation")
        ? html`<form
            style="display:flex;gap:8px"
            @submit=${async (e: SubmitEvent) => {
              e.preventDefault();
              const input = (e.currentTarget as HTMLFormElement).querySelector("input")!;
              const ask = input.value.trim();
              if (!ask) return;
              this.thinking = true;
              const model = await automationFromText(ctx, ask);
              this.thinking = false;
              if (!model) return ctx.toast(t("ai_auto_fail"));
              input.value = "";
              builderSheet(ctx, model, () => this.load());
            }}
          >
            <input type="text" style="flex:1" placeholder=${t("ai_auto_hint")} />
            <button class="btn pressable" type="submit" ?disabled=${this.thinking}>✨ ${this.thinking ? "…" : t("ai_do_it")}</button>
          </form>`
        : nothing}
      ${this.items && !this.items.length ? html`<p class="muted" style="margin:0">${t("auto_empty")}</p>` : nothing}
      ${(this.items ?? []).map((m) => {
        const ent = automationEntity(hass, m.id);
        const on = ent?.state === "on";
        return html`<div class="row">
          <sn-icon icon="automation" style="color:var(--accent-text)"></sn-icon>
          <span class="txt"><b>${m.name}</b><span>${sentence(m, hass, t, LOCALE[ctx.lang], ctx.config.names)}</span></span>
          ${ent
            ? html`<div class="seg">
                ${[true, false].map(
                  (v) => html`<button aria-pressed=${on === v} @click=${() => hass.callService("automation", v ? "turn_on" : "turn_off", { entity_id: ent.entity_id })}>${t(v ? "on" : "off")}</button>`
                )}
              </div>`
            : nothing}
          <button class="icon-btn small pressable" aria-label=${t("edit")} @click=${() => builderSheet(ctx, m, () => this.load())}><sn-icon icon="pencil" style="--icon-size:16px"></sn-icon></button>
          <button
            class="icon-btn small pressable"
            aria-label=${t("delete")}
            @click=${async () => {
              if (!confirm(t("delete_confirm"))) return;
              await deleteModel(hass, m.id).catch(() => ctx.toast(t("error")));
              this.load();
            }}
          >
            <sn-icon icon="delete" style="--icon-size:16px"></sn-icon>
          </button>
        </div>`;
      })}
      ${this.renderHabits()}`;
  }
}

@customElement("sn-auto-builder")
export class SnAutoBuilder extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) initial?: AutoModel;
  @property({ attribute: false }) onSaved?: () => void;
  @state() private m!: AutoModel;
  @state() private saving = false;

  static styles = [
    shared,
    css`
      :host {
        display: grid;
        gap: 18px;
      }
      h4 {
        margin: 0;
        font-size: 13px;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--accent-text);
      }
      .box {
        display: grid;
        gap: 10px;
        padding: 14px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      .box input,
      .box select {
        background: var(--surface-solid);
      }
      .row {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;
      }
      .days {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }
      .days button {
        min-width: 44px;
        min-height: 40px;
        border-radius: 12px;
        background: var(--surface-solid);
        font-size: 13px;
        font-weight: 500;
      }
      .days button[aria-pressed="true"] {
        background: var(--accent);
        color: var(--on-accent);
      }
      .pick {
        flex: 1;
        justify-content: flex-start;
        border-radius: var(--r-sm);
        background: var(--surface-solid);
      }
      .preview {
        font-size: 15px;
        padding: 12px 14px;
        border-radius: var(--r-md);
        background: color-mix(in srgb, var(--accent) 14%, transparent);
        unicode-bidi: plaintext;
      }
    `,
  ];

  protected willUpdate() {
    if (!this.m)
      this.m = this.initial
        ? structuredClone(this.initial)
        : { id: `smartnest_${uid()}`, name: "", trigger: { kind: "time", at: "07:00" }, days: [], actions: [{ kind: "on", entity: "" }] };
  }

  private set(fn: (m: AutoModel) => void) {
    const next = structuredClone(this.m);
    fn(next);
    this.m = next;
  }

  private pickEntity(filter: { domains?: string[] }, onPick: (id: string) => void) {
    this.ctx.showSheet({
      title: this.ctx.t("choose_entity"),
      render: (c) => html`<sn-entity-picker
        .ctx=${c}
        .filter=${filter}
        .onPick=${(id: string) => {
          onPick(id);
          c.closeSheet();
        }}
      ></sn-entity-picker>`,
    });
  }

  private entityBtn(id: string, filter: { domains?: string[] }, onPick: (id: string) => void): TemplateResult {
    const { ctx } = this;
    const e = id ? ctx.hass.states[id] : undefined;
    return html`<button class="btn pick pressable" @click=${() => this.pickEntity(filter, onPick)}>
      ${id ? html`<sn-icon .icon=${entityIcon(e, id)} style="--icon-size:20px"></sn-icon>${entityName(ctx.hass, ctx.config, id)}` : html`<span class="muted">${ctx.t("choose_entity")}</span>`}
    </button>`;
  }

  private renderTrigger() {
    const { t, hass } = this.ctx;
    const tr = this.m.trigger;
    const kinds: [Trigger["kind"], I18nKey][] = [
      ["time", "trig_time"],
      ["sun", "trig_sun"],
      ["state", "trig_state"],
      ["mode", "trig_mode"],
    ];
    return html`<div class="box">
      <div class="seg">
        ${kinds.map(
          ([k, label]) => html`<button
            aria-pressed=${tr.kind === k}
            @click=${() =>
              this.set((m) => {
                m.trigger =
                  k === "time" ? { kind: "time", at: "07:00" } : k === "sun" ? { kind: "sun", event: "sunset", offset: 0 } : k === "state" ? { kind: "state", entity: "", to: "on" } : { kind: "mode", mode: "away" };
              })}
          >
            ${t(label)}
          </button>`
        )}
      </div>
      ${tr.kind === "time"
        ? html`<input type="time" .value=${tr.at} @change=${(e: any) => this.set((m) => ((m.trigger as { at: string }).at = e.target.value || "07:00"))} />`
        : tr.kind === "sun"
        ? html`<div class="row">
            <div class="seg">
              ${(["sunrise", "sunset"] as const).map(
                (ev) => html`<button aria-pressed=${tr.event === ev} @click=${() => this.set((m) => ((m.trigger as { event: string }).event = ev))}>${t(ev)}</button>`
              )}
            </div>
            <label class="field" style="flex:1">${t("offset_min")}<input type="number" step="5" .value=${String(tr.offset)} @change=${(e: any) => this.set((m) => ((m.trigger as { offset: number }).offset = Number(e.target.value) || 0))} /></label>
          </div>`
        : tr.kind === "state"
        ? html`<div class="row">
              ${this.entityBtn(tr.entity, {}, (id) =>
                this.set((m) => {
                  m.trigger = { kind: "state", entity: id, to: stateOptions(hass, id, t)[0][0] };
                })
              )}
            </div>
            ${tr.entity
              ? html`<div class="row">
                  <span>${t("becomes")}</span>
                  <div class="seg">
                    ${stateOptions(hass, tr.entity, t).map(
                      ([v, label]) => html`<button aria-pressed=${tr.to === v} @click=${() => this.set((m) => ((m.trigger as { to: string }).to = v))}>${label}</button>`
                    )}
                  </div>
                </div>`
              : nothing}`
        : html`<div class="seg">
            ${MODES.map((md) => html`<button aria-pressed=${tr.mode === md.id} @click=${() => this.set((m) => ((m.trigger as { mode: string }).mode = md.id))}>${t(md.label)}</button>`)}
          </div>`}
    </div>`;
  }

  private renderDays() {
    const { t, lang } = this.ctx;
    const loc = LOCALE[lang];
    const all = !this.m.days.length;
    return html`<div class="box">
      <div class="row" style="justify-content:space-between">
        <b style="font-size:14px">${t("days")}</b>
        <button class="btn pressable" style="min-height:34px" @click=${() => this.set((m) => (m.days = []))}>${t("every_day")}</button>
      </div>
      <div class="days">
        ${WEEK.map((d) => {
          const on = all || this.m.days.includes(d);
          return html`<button
            aria-pressed=${on}
            @click=${() =>
              this.set((m) => {
                const cur = m.days.length ? m.days : [...WEEK];
                m.days = on ? cur.filter((x) => x !== d) : [...cur, d];
                if (m.days.length === 7) m.days = [];
              })}
          >
            ${dayName(d, loc)}
          </button>`;
        })}
      </div>
      <div class="row">
        <label class="row" style="gap:6px;font-size:14px">
          <input
            type="checkbox"
            .checked=${!!this.m.window}
            @change=${(e: any) => this.set((m) => (m.window = e.target.checked ? { after: "18:00", before: "23:00" } : undefined))}
            style="width:auto;min-height:auto"
          />${t("only_if")}
        </label>
        ${this.m.window
          ? html`<input type="time" style="width:auto" .value=${this.m.window.after} @change=${(e: any) => this.set((m) => (m.window!.after = e.target.value))} />
              <span>–</span>
              <input type="time" style="width:auto" .value=${this.m.window.before} @change=${(e: any) => this.set((m) => (m.window!.before = e.target.value))} />`
          : nothing}
      </div>
    </div>`;
  }

  private renderActions() {
    const { t } = this.ctx;
    return html`<div class="box">
      ${this.m.actions.map((a, i) => {
        const kinds: [Action["kind"], I18nKey][] = [
          ["on", "act_on"],
          ["off", "act_off"],
          ["mode", "act_mode"],
          ["message", "act_message"],
        ];
        return html`<div style="display:grid;gap:8px;padding-bottom:10px;border-bottom:1px solid var(--border)">
          <div class="row">
            <div class="seg" style="flex:1">
              ${kinds.map(
                ([k, label]) => html`<button
                  aria-pressed=${a.kind === k}
                  @click=${() =>
                    this.set((m) => {
                      const prev = m.actions[i];
                      m.actions[i] =
                        k === "mode" ? { kind: "mode", mode: "sleep" } : k === "message" ? { kind: "message", text: "" } : { kind: k, entity: "entity" in prev ? prev.entity : "" };
                    })}
                >
                  ${t(label)}
                </button>`
              )}
            </div>
            ${this.m.actions.length > 1
              ? html`<button class="icon-btn small pressable" aria-label=${t("delete")} @click=${() => this.set((m) => m.actions.splice(i, 1))}><sn-icon icon="close" style="--icon-size:16px"></sn-icon></button>`
              : nothing}
          </div>
          ${a.kind === "on" || a.kind === "off"
            ? this.entityBtn(a.entity, { domains: ACTION_DOMAINS }, (id) => this.set((m) => ((m.actions[i] as { entity: string }).entity = id)))
            : a.kind === "mode"
            ? html`<div class="seg">
                ${MODES.map((md) => html`<button aria-pressed=${a.mode === md.id} @click=${() => this.set((m) => ((m.actions[i] as { mode: string }).mode = md.id))}>${t(md.label)}</button>`)}
              </div>`
            : html`<input type="text" placeholder=${t("message_placeholder")} .value=${(a as { text: string }).text} @change=${(e: any) => this.set((m) => ((m.actions[i] as { text: string }).text = e.target.value))} />`}
        </div>`;
      })}
      <button class="btn pressable" style="justify-self:start" @click=${() => this.set((m) => m.actions.push({ kind: "on", entity: "" }))}>
        <sn-icon icon="plus" style="--icon-size:18px"></sn-icon>${t("add")}
      </button>
    </div>`;
  }

  private valid() {
    const m = this.m;
    if (m.trigger.kind === "state" && !m.trigger.entity) return false;
    return m.actions.length > 0 && m.actions.every((a) => (a.kind === "on" || a.kind === "off" ? !!a.entity : a.kind === "message" ? !!a.text.trim() : true));
  }

  private async save() {
    const { ctx } = this;
    if (!this.valid()) return;
    const m = structuredClone(this.m);
    if (!m.name.trim()) m.name = sentence(m, ctx.hass, ctx.t, LOCALE[ctx.lang], ctx.config.names).split("→")[0].trim();
    this.saving = true;
    try {
      await saveModel(ctx.hass, m);
      ctx.toast(ctx.t("auto_saved"));
      this.onSaved?.();
      ctx.closeSheet();
    } catch {
      ctx.toast(ctx.t("save_failed"));
    } finally {
      this.saving = false;
    }
  }

  render() {
    const { ctx } = this;
    const { t } = ctx;
    return html`<label class="field">${t("auto_name")}<input type="text" .value=${this.m.name} @change=${(e: any) => this.set((m) => (m.name = e.target.value.trim()))} /></label>
      <h4>${t("when")}</h4>
      ${this.renderTrigger()} ${this.renderDays()}
      <h4>${t("then")}</h4>
      ${this.renderActions()}
      <div class="preview">${sentence(this.m, ctx.hass, t, LOCALE[ctx.lang], ctx.config.names)}</div>
      <button class="btn primary pressable" ?disabled=${!this.valid() || this.saving} @click=${() => this.save()}>${this.saving ? t("saving") : t("save")}</button>`;
  }
}
