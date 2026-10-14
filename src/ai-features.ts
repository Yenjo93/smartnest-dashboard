import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import type { AutoModel } from "./automations";
import { aiEntity, askAI, pickJson } from "./ai";
import { domainOf, entityName } from "./entities";
import { dashboardEntities } from "./chips";
import { uid } from "./config";
import "./ui/icon";

const COLOR = ["hs", "rgb", "rgbw", "rgbww", "xy"];

// ---- a mood from a sentence ----

interface SceneLight {
  entity: string;
  on: boolean;
  brightness_pct?: number;
  rgb?: [number, number, number];
  kelvin?: number;
}

/** "Something calm for a movie": the AI picks colour and level for each light in the room. */
async function runScene(ctx: Ctx, lights: string[], ask: string): Promise<string | undefined> {
  const { hass, config } = ctx;
  const facts = lights.map((id) => {
    const modes: string[] = hass.states[id]?.attributes.supported_color_modes ?? [];
    const kind = modes.some((m) => COLOR.includes(m)) ? "colour" : modes.includes("color_temp") ? "white" : "dim only";
    return `${id}: ${entityName(hass, config, id)}, ${kind}`;
  });
  const text = await askAI(ctx, "scene", { ask, facts });
  const plan = pickJson<SceneLight[]>(text, "[");
  if (!plan?.length) return undefined;
  for (const l of plan) {
    if (!lights.includes(l.entity)) continue; // only the room's own lights
    if (!l.on) {
      hass.callService("light", "turn_off", { entity_id: l.entity, transition: 2 }).catch(() => undefined);
      continue;
    }
    const data: Record<string, unknown> = { entity_id: l.entity, transition: 2 };
    if (typeof l.brightness_pct === "number") data.brightness_pct = Math.min(100, Math.max(1, Math.round(l.brightness_pct)));
    if (Array.isArray(l.rgb) && l.rgb.length === 3) data.rgb_color = l.rgb.map((v) => Math.min(255, Math.max(0, Math.round(v))));
    else if (typeof l.kelvin === "number") data.color_temp_kelvin = Math.min(6500, Math.max(2000, Math.round(l.kelvin)));
    hass.callService("light", "turn_on", data).catch(() => undefined);
  }
  return text!.slice(text!.lastIndexOf("]") + 1).trim() || ctx.t("done");
}

@customElement("sn-ai-scene")
export class SnAiScene extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) lights: string[] = [];
  @state() private busy = false;
  @state() private said = "";

  createRenderRoot() {
    return this;
  }

  render() {
    const { t } = this.ctx;
    if (!aiEntity(this.ctx.hass) || !this.ctx.allows("ai_scene") || !this.lights.length) return nothing;
    return html`<form
      style="display:grid;gap:8px"
      @submit=${async (e: SubmitEvent) => {
        e.preventDefault();
        const input = (e.currentTarget as HTMLFormElement).querySelector("input")!;
        if (!input.value.trim()) return;
        this.busy = true;
        this.said = (await runScene(this.ctx, this.lights, input.value.trim())) ?? t("as_error");
        this.busy = false;
      }}
    >
      <span class="muted" style="font-size:13px">✨ ${t("ai_scene_title")}</span>
      <div style="display:flex;gap:8px">
        <input type="text" placeholder=${t("ai_scene_hint")} style="flex:1" />
        <button class="btn primary pressable" type="submit" ?disabled=${this.busy}>${this.busy ? "…" : t("ai_do_it")}</button>
      </div>
      ${this.said ? html`<span style="font-size:14px;unicode-bidi:plaintext">✨ ${this.said}</span>` : nothing}
    </form>`;
  }
}

// ---- an automation from a sentence ----

/** Turns "every night at 11 turn off the living room lights" into a ready automation for the builder. */
export async function automationFromText(ctx: Ctx, ask: string): Promise<AutoModel | undefined> {
  const { hass, config } = ctx;
  const ids = dashboardEntities(config).filter((id) => hass.states[id]);
  const extra = Object.keys(hass.states).filter((id) => id.startsWith("person.") || id.startsWith("alarm_control_panel."));
  const facts = [...ids, ...extra].slice(0, 150).map((id) => `${id}: ${entityName(hass, config, id)}`);
  const m = pickJson<Partial<AutoModel>>(await askAI(ctx, "automation", { ask, facts }), "{");
  if (!m?.trigger || !Array.isArray(m.actions) || !m.actions.length) return undefined;
  const known = new Set([...ids, ...extra]);
  const actions = m.actions.filter((a: any) => a.kind === "message" || ((a.kind === "on" || a.kind === "off") && known.has(a.entity)));
  if (!actions.length) return undefined;
  if ((m.trigger as any).entity && !known.has((m.trigger as any).entity)) return undefined;
  return {
    id: uid(),
    name: String(m.name ?? ask).slice(0, 60),
    trigger: m.trigger as AutoModel["trigger"],
    days: Array.isArray(m.days) ? m.days : [],
    ...(m.window && (m.window as any).after ? { window: m.window } : {}),
    actions: actions as AutoModel["actions"],
  };
}

// ---- today on the cameras ----

/** Frigate's detections today, as two or three sentences. */
export async function cameraDigest(ctx: Ctx, instance = "frigate"): Promise<string | undefined> {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  let events: { label: string; sub_label?: string | [string, number] | null; camera: string; start_time: number; zones?: string[] }[] = [];
  try {
    const raw = await ctx.hass.callWS<any>({ type: "frigate/events/get", instance_id: instance, after: Math.floor(start.getTime() / 1000), limit: 120 });
    events = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch {
    return undefined;
  }
  if (!events.length) return ctx.t("ai_cam_quiet");
  const facts = events
    .sort((a, b) => a.start_time - b.start_time)
    .map((e) => {
      const who = Array.isArray(e.sub_label) ? e.sub_label[0] : e.sub_label;
      return `${new Date(e.start_time * 1000).toTimeString().slice(0, 5)} ${e.camera}: ${e.label}${who ? ` (${who})` : ""}${e.zones?.length ? ` in ${e.zones.join("/")}` : ""}`;
    });
  return askAI(ctx, "cameras", { facts });
}

@customElement("sn-ai-ask-button")
export class SnAiAskButton extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property() label = "";
  @property({ attribute: false }) run!: () => Promise<string | undefined>;
  @state() private busy = false;
  @state() private text = "";

  createRenderRoot() {
    return this;
  }

  render() {
    if (!aiEntity(this.ctx.hass)) return nothing;
    return html`<div style="display:grid;gap:6px">
      ${this.text ? html`<div style="font-size:14px;line-height:1.5;unicode-bidi:plaintext">✨ ${this.text}</div>` : nothing}
      ${this.text
        ? nothing
        : html`<button
            class="btn pressable"
            style="justify-self:start;min-height:36px;font-size:13px"
            ?disabled=${this.busy}
            @click=${async () => {
              this.busy = true;
              this.text = (await this.run()) ?? this.ctx.t("as_error");
              this.busy = false;
            }}
          >
            ✨ ${this.busy ? this.ctx.t("ai_looking") : this.label}
          </button>`}
    </div>`;
  }
}

/** Plain facts about this month's power for "why is the bill like this?". */
export function billFacts(ctx: Ctx, d: { used: number; projected: number; lastSame: number; solar: number; top: { id: string; kwh: number }[] }, tariff: number, currency: string): string[] {
  const { hass, config } = ctx;
  return [
    `Used so far this month: ${Math.round(d.used)} kWh (${currency}${Math.round(d.used * tariff)})`,
    `Same days last month: ${Math.round(d.lastSame)} kWh`,
    `Expected for the whole month: ${Math.round(d.projected)} kWh (${currency}${Math.round(d.projected * tariff)})`,
    ...(d.solar ? [`Solar made ${Math.round(d.solar)} kWh`] : []),
    ...d.top.map((x) => `${entityName(hass, config, x.id)}: ${Math.round(x.kwh)} kWh`),
    ...Object.values(hass.states)
      .filter((e) => domainOf(e.entity_id) === "climate" && e.state !== "off")
      .map((e) => `${entityName(hass, config, e.entity_id)} is on now (${e.state}, set to ${e.attributes.temperature}°)`),
  ];
}
