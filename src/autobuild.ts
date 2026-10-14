import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import type { Floor, Page, Widget } from "./types";
import { domainOf } from "./entities";
import { devicesByArea } from "./autofill";
import { TEMPLATES, newWidget, pageFromTemplate, uid, type TemplateId } from "./config";
import { shared } from "./theme";
import "./ui/icon";

interface Proposal {
  key: string;
  page: Page;
  /** Devices on it, to show what the house actually gets. */
  devices: number;
  on: boolean;
}

const COLS = 12;

/** An icon for an HA area, from its name (Arabic, English or Hebrew). */
function areaIcon(name: string): string {
  const n = name.toLowerCase();
  if (/نوم|bed|שינה|ولاد|kids|ילדים/.test(n)) return "bed";
  if (/مطبخ|kitchen|מטבח/.test(n)) return "kitchen";
  if (/حمام|bath|shower|מקלחת|אמבט/.test(n)) return "shower";
  if (/جنين|حديق|garden|yard|גינה|حوش|ساح/.test(n)) return "garden";
  if (/كراج|garage|חניה|موقف/.test(n)) return "garage";
  if (/مكتب|office|study|משרד/.test(n)) return "desk";
  if (/غسيل|laundry|כביסה/.test(n)) return "laundry";
  return "sofa";
}

/** One page per HA area: its photo card on top, then every device, cameras last. */
function areaPage(ctx: Ctx, area: { areaId?: string; name?: string; ids: string[] }): Page {
  const widgets: Widget[] = [newWidget("room", { area: area.areaId }, { x: 0, y: 0, w: COLS, h: 5 })];
  let x = 0;
  let y = 5;
  const tiles = area.ids.filter((id) => domainOf(id) !== "camera");
  for (const id of tiles) {
    if (x + 3 > COLS) (x = 0), (y += 2);
    widgets.push(newWidget("tile", { entity: id }, { x, y, w: 3, h: 2 }));
    x += 3;
  }
  y += tiles.length ? 2 : 0;
  area.ids
    .filter((id) => domainOf(id) === "camera")
    .forEach((id, i) => widgets.push(newWidget("camera", { entity: id }, { x: (i % 2) * 6, y: y + Math.floor(i / 2) * 5, w: 6, h: 5 })));
  if (!ctx.allows("w_room")) widgets.shift();
  return { id: uid(), title: area.name ?? ctx.t("other_devices"), icon: areaIcon(area.name ?? ""), widgets };
}

/** Speakers and TVs with their controls. */
function mediaPage(ctx: Ctx): Page {
  const { hass } = ctx;
  const players = Object.keys(hass.states).filter(
    (id) => id.startsWith("media_player.") && hass.entities?.[id]?.platform !== "fully_kiosk" && !hass.entities?.[id]?.entity_category
  );
  const remotes = Object.keys(hass.states).filter((id) => id.startsWith("remote."));
  const widgets: Widget[] = [];
  players.slice(0, 6).forEach((entity, i) => widgets.push(newWidget("media", { entity }, { x: (i % 2) * 6, y: Math.floor(i / 2) * 5, w: 6, h: 5 })));
  const y = Math.ceil(Math.min(players.length, 6) / 2) * 5;
  remotes.slice(0, 3).forEach((entity, i) => widgets.push(newWidget("remote", { entity }, { x: i * 4, y, w: 4, h: 8 })));
  return { id: uid(), title: ctx.t("template_media"), icon: "speaker", widgets };
}

const deviceCount = (p: Page) =>
  p.widgets.reduce((n, w) => n + (w.config.entity ? 1 : 0) + (w.type === "floorplan" || w.type === "hero" || w.type === "energy" || w.type === "water" ? 1 : 0), 0);

/** Everything this house could have, built from its devices. Pages with nothing in them aren't offered. */
export function proposals(ctx: Ctx, perArea: boolean): Proposal[] {
  const { hass, config, t } = ctx;
  const out: Proposal[] = [];
  const add = (key: string, page: Page, on = true) => {
    const devices = deviceCount(page);
    if (devices || key === "home") out.push({ key, page, devices, on });
  };
  const tpl = (id: TemplateId) => pageFromTemplate(id, hass, config, t);
  const pro = config.settings.style === "pro" && ctx.allows("bento");
  // A plan that's already drawn stays the heart of the home page; Bento then comes as its own page.
  const hasPlan = config.pages.some((p) => p.widgets.some((w) => w.type === "floorplan" && w.config.floors?.some((f: Floor) => f.image)));
  add("home", tpl(pro && !hasPlan ? "bento" : "home"));
  if (pro && hasPlan) add("bento", tpl("bento"));
  if (perArea) for (const a of devicesByArea(hass).filter((g) => g.areaId && g.ids.length)) add(`area-${a.areaId}`, areaPage(ctx, a));
  else add("rooms", tpl("rooms"));
  for (const id of ["climate", "power", "security", "doorbell", "water", "robot"] as TemplateId[]) if (TEMPLATES.some((x) => x.id === id)) add(id, tpl(id));
  add("media", mediaPage(ctx));
  for (const id of ["car", "garden", "pets"] as TemplateId[]) add(id, tpl(id), false);
  return out;
}

/**
 * "Set up the dashboard for me": looks at the house, offers the pages it can fill (with how many devices each),
 * and builds the ticked ones in one go. Replacing keeps the floor plan already drawn.
 */
@customElement("sn-autobuild")
export class SnAutobuild extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @state() private perArea = false;
  @state() private replace = true;
  @state() private list: Proposal[] = [];

  static styles = [
    shared,
    css`
      :host {
        display: grid;
        gap: 14px;
      }
      .hint {
        margin: 0;
        color: var(--text-2);
        font-size: 14px;
      }
      .pages {
        display: grid;
        gap: 8px;
      }
      .p {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
        cursor: pointer;
        transition: opacity 200ms;
      }
      .p.off {
        opacity: 0.5;
      }
      .p .ic {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        background: var(--accent);
        color: var(--on-accent);
        --icon-size: 22px;
        flex: none;
      }
      .p.off .ic {
        background: var(--surface-solid);
        color: var(--text-2);
      }
      .p b {
        flex: 1;
      }
      .p span {
        font-size: 13px;
        color: var(--text-2);
      }
      .check {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        border: 2px solid var(--border);
        --icon-size: 16px;
      }
      .p:not(.off) .check {
        background: var(--success);
        border-color: var(--success);
        color: #fff;
      }
      .opt {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }
      .go {
        min-height: 56px;
        font-size: 17px;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.refresh();
  }

  private refresh() {
    const keep = new Map(this.list.map((p) => [p.key, p.on]));
    this.list = proposals(this.ctx, this.perArea).map((p) => ({ ...p, on: keep.get(p.key) ?? p.on }));
  }

  private build() {
    const { ctx } = this;
    const chosen = this.list.filter((p) => p.on).map((p) => p.page);
    if (!chosen.length) return;
    ctx.update((d) => {
      // Keep the floor plan already drawn (image, rooms, devices): it moves to the new home page.
      const oldPlan = d.pages.flatMap((p) => p.widgets).find((w) => w.type === "floorplan");
      const floors: Floor[] | undefined = oldPlan?.config.floors?.some((f: Floor) => f.image) ? oldPlan.config.floors : undefined;
      if (floors) {
        const plan = chosen.flatMap((p) => p.widgets).find((w) => w.type === "floorplan");
        if (plan) plan.config.floors = floors;
      }
      d.pages = this.replace ? chosen : [...d.pages, ...chosen];
      d.settings.default_page = d.pages[0].id;
    });
    ctx.toast(ctx.t("ab_done", { n: chosen.length }));
    ctx.closeSheet();
  }

  render() {
    const { t } = this.ctx;
    const on = this.list.filter((p) => p.on);
    return html`<p class="hint">${t("ab_hint")}</p>
      <div class="opt">
        <span>${t("ab_per_area")}</span>
        <div class="seg">
          ${[false, true].map(
            (v) => html`<button
              aria-pressed=${this.perArea === v}
              @click=${() => {
                this.perArea = v;
                this.refresh();
              }}
            >
              ${t(v ? "ab_area_pages" : "ab_one_rooms")}
            </button>`
          )}
        </div>
      </div>
      <div class="pages">
        ${this.list.map(
          (p) => html`<div
            class="p ${p.on ? "" : "off"}"
            role="checkbox"
            aria-checked=${p.on}
            tabindex="0"
            @click=${() => (this.list = this.list.map((x) => (x.key === p.key ? { ...x, on: !x.on } : x)))}
          >
            <span class="ic"><sn-icon .icon=${p.page.icon}></sn-icon></span>
            <b>${p.page.title}</b>
            <span>${p.key === "home" ? t("ab_home") : t("ab_devices", { n: p.devices })}</span>
            <span class="check">${p.on ? html`<sn-icon icon="check"></sn-icon>` : nothing}</span>
          </div>`
        )}
      </div>
      <div class="opt">
        <span>${t("ab_mode")}</span>
        <div class="seg">
          ${[true, false].map((v) => html`<button aria-pressed=${this.replace === v} @click=${() => (this.replace = v)}>${t(v ? "ab_replace" : "ab_add")}</button>`)}
        </div>
      </div>
      <button class="btn primary pressable go" ?disabled=${!on.length} @click=${() => this.build()}>
        <sn-icon icon="auto-fix" style="--icon-size:22px"></sn-icon>${t("ab_go", { n: on.length })}
      </button>`;
  }
}

export const autobuildSheet = (ctx: Ctx) => ctx.showSheet({ still: true, title: ctx.t("ab_title"), render: (c) => html`<sn-autobuild .ctx=${c}></sn-autobuild>` });

