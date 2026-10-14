import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import type { DashboardConfig, Lang } from "./types";
import { LANGS, LOCALE } from "./i18n";
import { normalizeConfig, pageFromTemplate, type TemplateId } from "./config";
import { dashboardEntities } from "./chips";
import { entityName, domainOf } from "./entities";
import { shared } from "./theme";
import "./ui/icon";

// ---- move a dashboard between houses ----

/** Downloads the dashboard as a file; another house imports it and keeps the layout, rooms and pages. */
export function exportConfig(config: DashboardConfig) {
  const blob = new Blob([JSON.stringify({ smartnest: 1, config }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `smartnest-${(config.settings.home_name || "home").replace(/\s+/g, "-")}.json`;
  a.click();
  window.setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

export function importConfig(ctx: Ctx, file: File) {
  file
    .text()
    .then((txt) => {
      const data = JSON.parse(txt);
      if (!data?.smartnest || !Array.isArray(data.config?.pages)) throw new Error("not smartnest");
      const next = normalizeConfig(data.config, ctx.lang);
      ctx.update((d) => Object.assign(d, next));
      ctx.toast(ctx.t("import_done"));
    })
    .catch(() => ctx.toast(ctx.t("import_bad")));
}

// ---- maintenance ----

export function maintenanceDue(config: DashboardConfig, now = Date.now()) {
  return config.settings.maintenance.map((m) => {
    const next = Date.parse(m.last) + m.every_days * 86_400_000;
    return { ...m, days: Math.round((next - now) / 86_400_000) };
  });
}

// ---- first-run wizard ----

const HOUSES: Record<string, TemplateId[]> = {
  flat: ["home", "rooms", "power", "security"],
  villa: ["home", "rooms", "power", "security", "doorbell", "climate", "robot"],
  office: ["home", "rooms", "power", "climate"],
};

/** Three questions when the integration is first added: name and language, kind of home, then pages are built from what's there. */
@customElement("sn-wizard")
export class SnWizard extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) onDone!: (config: DashboardConfig) => void;
  @state() private step = 0;
  @state() private name = "";
  @state() private language: Lang = "ar";
  @state() private house = "flat";

  static styles = [
    shared,
    css`
      :host {
        display: grid;
        gap: 18px;
      }
      .dots {
        display: flex;
        gap: 6px;
        justify-content: center;
      }
      .dots span {
        width: 8px;
        height: 8px;
        border-radius: 99px;
        background: var(--surface-2);
        transition: width 300ms cubic-bezier(0.22, 1, 0.36, 1), background-color 300ms;
      }
      .dots span.on {
        width: 24px;
        background: var(--accent);
      }
      .houses {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }
      .houses button {
        display: grid;
        gap: 8px;
        justify-items: center;
        padding: 18px 10px;
        border-radius: var(--r-md);
        background: var(--surface-2);
        font-weight: 500;
        --icon-size: 30px;
      }
      .houses button[aria-pressed="true"] {
        background: var(--accent);
        color: var(--on-accent);
      }
      .step {
        display: grid;
        gap: 14px;
        animation: in 360ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateX(14px);
        }
      }
    `,
  ];

  protected firstUpdated() {
    this.name = this.ctx.config.settings.home_name || this.ctx.hass.config?.location_name || "";
    this.language = this.ctx.lang;
  }

  private finish() {
    const { ctx } = this;
    const base: DashboardConfig = structuredClone(ctx.config);
    base.settings.home_name = this.name;
    base.settings.language = this.language;
    base.pages = HOUSES[this.house].map((id) => pageFromTemplate(id, ctx.hass, base, ctx.t));
    base.settings.default_page = base.pages[0].id;
    base.settings.setup_done = true;
    this.onDone(base);
  }

  render() {
    const { t } = this.ctx;
    return html`<div class="dots">${[0, 1].map((i) => html`<span class=${i === this.step ? "on" : ""}></span>`)}</div>
      ${this.step === 0
        ? html`<div class="step">
            <label class="field">${t("home_name")}<input type="text" .value=${this.name} @input=${(e: any) => (this.name = e.target.value)} /></label>
            <div class="field">
              ${t("language")}
              <div class="seg">${LANGS.map((l) => html`<button aria-pressed=${this.language === l.id} @click=${() => (this.language = l.id)}>${l.label}</button>`)}</div>
            </div>
            <button class="btn primary pressable" @click=${() => (this.step = 1)}>${t("wizard_next")}</button>
          </div>`
        : html`<div class="step">
            <b>${t("wizard_house")}</b>
            <div class="houses">
              ${(
                [
                  ["flat", "house_flat", "home-outline"],
                  ["villa", "house_villa", "home"],
                  ["office", "house_office", "desk"],
                ] as const
              ).map(([id, label, icon]) => html`<button aria-pressed=${this.house === id} @click=${() => (this.house = id)}><sn-icon .icon=${icon}></sn-icon>${t(label)}</button>`)}
            </div>
            <button class="btn primary pressable" @click=${() => this.finish()}>${t("wizard_finish")}</button>
          </div>`}`;
  }
}

// ---- rate the installer ----

export function rateSheet(ctx: Ctx) {
  let stars = 0;
  ctx.showSheet({
    title: ctx.t("rate_service"),
    render: (c) => html`<form
      style="display:grid;gap:14px;justify-items:center"
      @submit=${(e: SubmitEvent) => {
        e.preventDefault();
        if (!stars) return;
        const comment = (e.currentTarget as HTMLFormElement).querySelector("input")!.value.trim();
        c.hass
          .callWS({ type: "smartnest/feedback", stars, comment })
          .then(() => {
            c.toast(c.t("rate_thanks"));
            c.closeSheet();
          })
          .catch(() => c.toast(c.t("error")));
      }}
    >
      <div style="display:flex;gap:6px;direction:ltr" role="radiogroup">
        ${[1, 2, 3, 4, 5].map(
          (n) => html`<button
            type="button"
            class="pressable"
            aria-label=${`${n}`}
            style="--icon-size:40px;color:var(--accent)"
            @click=${(e: Event) => {
              stars = n;
              const row = (e.currentTarget as HTMLElement).parentElement!;
              [...row.querySelectorAll("sn-icon")].forEach((ic, i) => ((ic as HTMLElement & { icon: string }).icon = i < n ? "star" : "star-outline"));
            }}
          >
            <sn-icon icon="star-outline"></sn-icon>
          </button>`
        )}
      </div>
      <input type="text" placeholder=${c.t("rate_comment")} style="width:100%" />
      <button class="btn primary pressable" type="submit">${c.t("send")}</button>
    </form>`,
  });
}

// ---- faults this week (for the health sheet) ----

export async function weeklyFaults(ctx: Ctx, days = 7): Promise<{ id: string; name: string; n: number }[]> {
  const ids = dashboardEntities(ctx.config).filter((id) => ctx.hass.states[id] && domainOf(id) !== "event");
  if (!ids.length) return [];
  try {
    const ev = await ctx.hass.callWS<{ entity_id: string; state?: string }[]>({
      type: "logbook/get_events",
      start_time: new Date(Date.now() - days * 86_400_000).toISOString(),
      end_time: new Date().toISOString(),
      entity_ids: ids,
    });
    const counts = new Map<string, number>();
    for (const e of ev) if (e.state === "unavailable") counts.set(e.entity_id, (counts.get(e.entity_id) ?? 0) + 1);
    return [...counts.entries()].map(([id, n]) => ({ id, n, name: entityName(ctx.hass, ctx.config, id) })).sort((a, b) => b.n - a.n).slice(0, 8);
  } catch {
    return [];
  }
}

export const fmtDate = (iso: string, lang: Lang) => new Date(iso).toLocaleDateString(LOCALE[lang], { day: "numeric", month: "short" });

