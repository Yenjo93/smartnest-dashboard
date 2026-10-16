import { FONTS } from "./look";
import "./occasions-settings";
import { shared } from "./theme";
import { LitElement, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeStatic, html as staticHtml } from "lit/static-html.js";
import type { Ctx } from "./ctx";
import type { DashboardConfig, Lang, Page, ThemeMode, Widget, WidgetType } from "./types";
import { domainOf, entityIcon, entityName, type EntityFilter } from "./entities";
import { dashboardEntities } from "./chips";
import { DEFAULT_ACCENT, TEMPLATES, WIDGET_SIZES, findWidget, newFloor, newWidget, nextRow, pageFromTemplate, resolveLayout } from "./config";
import { LANGS, type I18nKey } from "./i18n";
import { PAGE_ICONS } from "./icons";
import { hashPin, newSalt } from "./kiosk";
import { findTablets, thisTablet } from "./fully";
import { CHIP_TYPES } from "./chips";
import { guessEnergy } from "./widgets/energy";
import { guessBill } from "./widgets/energy-stats";
import { healthSheet } from "./health";
import { planFor, widgetFeature } from "./plans";
import { automationsSheet } from "./automations";
import { exportConfig, importConfig, rateSheet } from "./installer";
import { uid, uploadImage, logoDataUrl } from "./config";
import "./ui/entity-picker";
import "./ui/icon";
import { guessWater } from "./widgets/water";
import { historySheet, licensesSheet, presetPicker, printReport } from "./business";
import { autobuildSheet } from "./autobuild";

const col = (...items: unknown[]) => html`<div style="display:grid;gap:18px">${items}</div>`;
const row = (...items: unknown[]) => html`<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">${items}</div>`;
const section = (title: string, ...items: unknown[]) =>
  html`<section style="display:grid;gap:12px;padding-top:6px">
    <h3 style="margin:0;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--text-2)">${title}</h3>
    ${items}
  </section>`;

/** A button showing the chosen device; tapping it stacks a picker sheet on top. */
export function entityField(
  ctx: Ctx,
  label: string,
  value: string | undefined,
  filter: EntityFilter,
  onPick: (id: string | undefined) => void,
  allowNone = false
): TemplateResult {
  const e = value ? ctx.hass.states[value] : undefined;
  return html`<div class="field">
    ${label}
    <div style="display:flex;gap:8px">
      <button
        class="btn pressable"
        style="flex:1;justify-content:flex-start;border-radius:var(--r-sm)"
        @click=${() =>
          ctx.showSheet({
            still: true,
            title: label,
            render: (c) => html`<sn-entity-picker
              .ctx=${c}
              .filter=${filter}
              .onPick=${(id: string) => {
                onPick(id);
                c.closeSheet();
              }}
            ></sn-entity-picker>`,
          })}
      >
        ${value
          ? html`<sn-icon .icon=${entityIcon(e, value)} style="--icon-size:20px"></sn-icon>${entityName(ctx.hass, ctx.config, value)}`
          : html`<span class="muted">${ctx.t(allowNone ? "none" : "choose_entity")}</span>`}
      </button>
      ${allowNone && value
        ? html`<button class="icon-btn pressable" aria-label=${ctx.t("delete")} @click=${() => onPick(undefined)}>
            <sn-icon icon="close" style="--icon-size:18px"></sn-icon>
          </button>`
        : nothing}
    </div>
  </div>`;
}

/** Several devices: the chosen ones as chips (tap to drop), and a button to add one more. Empty means "all, automatically". */
export function multiField(ctx: Ctx, label: string, value: string[] | undefined, filter: EntityFilter, onChange: (ids: string[] | undefined) => void, emptyHint: I18nKey = "auto_all") {
  const ids = value ?? [];
  return html`<div class="field">
    ${label}
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      ${ids.map(
        (id) => html`<button class="btn pressable" style="min-height:36px;font-size:14px" @click=${() => onChange(ids.length > 1 ? ids.filter((x) => x !== id) : undefined)}>
          ${entityName(ctx.hass, ctx.config, id)}<sn-icon icon="close" style="--icon-size:14px"></sn-icon>
        </button>`
      )}
      <button
        class="btn primary pressable"
        style="min-height:36px;font-size:14px"
        @click=${() =>
          ctx.showSheet({
            still: true,
            title: label,
            render: (c) => html`<sn-entity-picker
              .ctx=${c}
              .filter=${filter}
              .onPick=${(id: string) => {
                if (!ids.includes(id)) onChange([...ids, id]);
                c.closeSheet();
              }}
            ></sn-entity-picker>`,
          })}
      >
        <sn-icon icon="plus" style="--icon-size:16px"></sn-icon>${ctx.t("add")}
      </button>
    </div>
    ${ids.length ? nothing : html`<span class="hint">${ctx.t(emptyHint)}</span>`}
  </div>`;
}

/** The devices hidden from the whole dashboard: tap one to bring it back, or hide another. */
function hiddenDevices(ctx: Ctx, ids: string[], onChange: (ids: string[]) => void) {
  const full = ctx.fullHass ?? ctx.hass;
  return html`<span class="hint" style="margin-top:-4px">${ctx.t("hidden_hint")}</span>
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      ${ids.map(
        (id) => html`<button class="btn pressable" style="min-height:36px;font-size:14px" title=${ctx.t("hidden_show")} @click=${() => onChange(ids.filter((x) => x !== id))}>
          <sn-icon icon="eye-off" style="--icon-size:16px"></sn-icon>${entityName(full, ctx.config, id)}<sn-icon icon="close" style="--icon-size:14px"></sn-icon>
        </button>`
      )}
      <button
        class="btn primary pressable"
        style="min-height:36px;font-size:14px"
        @click=${() =>
          ctx.showSheet({
            still: true,
            title: ctx.t("hidden_add"),
            render: (c) => html`<sn-entity-picker
              .ctx=${c}
              .filter=${{}}
              .onPick=${(id: string) => {
                onChange([...ids.filter((x) => x !== id), id]);
                c.closeSheet();
              }}
            ></sn-entity-picker>`,
          })}
      >
        <sn-icon icon="plus" style="--icon-size:16px"></sn-icon>${ctx.t("hidden_add")}
      </button>
    </div>`;
}

function titleField(ctx: Ctx, widgetId: string, value?: string) {
  return html`<label class="field"
    >${ctx.t("widget_title")}
    <input type="text" .value=${value ?? ""} @change=${(e: any) => editWidget(ctx, widgetId, (x) => (x.config.title = e.target.value.trim() || undefined))} />
  </label>`;
}

function nameField(ctx: Ctx, entityId: string) {
  return html`<label class="field"
    >${ctx.t("display_name")}
    <input
      type="text"
      .value=${ctx.config.names[entityId] ?? ""}
      placeholder=${ctx.hass.states[entityId]?.attributes.friendly_name ?? entityId}
      @change=${(e: any) =>
        ctx.update((d) => {
          const v = e.target.value.trim();
          if (v) d.names[entityId] = v;
          else delete d.names[entityId];
        })}
    />
    <span class="hint">${ctx.t("display_name_hint")}</span>
  </label>`;
}

const ENTITY_FILTERS: Partial<Record<WidgetType, EntityFilter>> = {
  camera: { domains: ["camera"] },
  vacuum: { domains: ["vacuum"] },
  todo: { domains: ["todo"] },
  gauge: { domains: ["sensor"] },
  gate: { domains: ["cover"] },
  media: { domains: ["media_player"] },
  remote: { domains: ["remote", "media_player"] },
};

function editWidget(ctx: Ctx, widgetId: string, fn: (w: Widget, d: DashboardConfig) => void) {
  ctx.update((d) => {
    const w = findWidget(d, widgetId);
    if (w) fn(w, d);
  });
}

export function widgetSettingsSheet(ctx: Ctx, _pageId: string, widgetId: string) {
  ctx.showSheet({
    still: true,
    title: ctx.t("widget_settings"),
    render: (c) => {
      const w = findWidget(c.config, widgetId);
      if (!w) return html``;
      return col(widgetBody(c, w, widgetId), w.type === "floorplan" ? nothing : moveToRoom(c, w));
    },
  });
}

/**
 * "Room": the card jumps to another page (a room's page, made by "set up the dashboard for me", or any other), placed
 * at its end, instead of being dragged across pages. When that page is a Home Assistant area's page, the device's
 * area in Home Assistant follows, so everything that goes by rooms (glow, nudges, the auto-built pages) agrees.
 */
function moveToRoom(c: Ctx, w: Widget) {
  const t = c.t;
  const here = c.config.pages.find((p) => p.widgets.some((x) => x.id === w.id));
  const areaOfPage = (p: Page) => p.widgets.find((x) => x.type === "room" && x.config.area)?.config.area as string | undefined;
  const areaNamed = (name: string) => Object.values(c.hass.areas ?? {}).find((a) => a.name.trim() === name.trim())?.area_id;
  // On a page with a title per room (the Rooms page), each title is a place the card can go.
  const headings = (here?.widgets ?? []).filter((x) => x.type === "heading" && x.config.text).sort((a, b) => a.y - b.y);
  const mine = [...headings].reverse().find((h) => h.y < w.y);
  const follow = async (area?: string) => {
    const id = w.config.entity as string | undefined;
    if (area && id && c.hass.entities?.[id] && (c.hass.entities[id].area_id ?? undefined) !== area)
      await c.hass.callWS({ type: "config/entity_registry/update", entity_id: id, area_id: area }).catch(() => undefined);
  };
  return html`<label class="field"
    >${t("move_room")}
    <select
      @change=${async (e: any) => {
        const [kind, target] = String(e.target.value).split(":");
        if (kind === "h") {
          const h = headings.find((x) => x.id === target);
          if (!h || h.id === mine?.id) return;
          c.update((d) => {
            const page = d.pages.find((p) => p.widgets.some((x) => x.id === w.id));
            const card = page?.widgets.find((x) => x.id === w.id);
            if (!page || !card) return;
            page.widgets = sectionPlace(page.widgets, card, target);
          });
          await follow(areaNamed(h.config.text));
          c.toast(t("moved_to", { page: h.config.text }));
          return c.closeSheet();
        }
        const to = c.config.pages.find((p) => p.id === target);
        if (!to || to.id === here?.id) return;
        c.update((d) => {
          const from = d.pages.find((p) => p.widgets.some((x) => x.id === w.id));
          const dest = d.pages.find((p) => p.id === to.id);
          const card = from?.widgets.find((x) => x.id === w.id);
          if (!from || !dest || !card) return;
          from.widgets = resolveLayout(from.widgets.filter((x) => x.id !== w.id));
          const bottom = dest.widgets.reduce((m, x) => Math.max(m, x.y + x.h), 0);
          dest.widgets = resolveLayout([...dest.widgets, { ...card, x: 0, y: bottom }]);
        });
        await follow(areaOfPage(to));
        c.toast(t("moved_to", { page: to.title }));
        c.closeSheet();
      }}
    >
      ${headings.length
        ? html`<optgroup label=${t("move_this_page")}>
            ${headings.map((h) => html`<option value=${`h:${h.id}`} ?selected=${h.id === mine?.id}>${h.config.text}</option>`)}
          </optgroup>`
        : nothing}
      <optgroup label=${t("move_other_page")}>
        ${c.config.pages.map((p) => html`<option value=${`p:${p.id}`} ?selected=${!headings.length && p.id === here?.id}>${p.title}</option>`)}
      </optgroup>
    </select>
    <span class="hint">${t("move_room_hint")}</span>
  </label>`;
}

/**
 * The card at the end of a room's section on the same page (the section runs from its title to the next title):
 * in a free spot on the section's last row, or on a new row there, with everything below moved down to make room.
 */
function sectionPlace(widgets: Widget[], card: Widget, headingId: string): Widget[] {
  const ws = resolveLayout(widgets.filter((x) => x.id !== card.id)).map((x) => ({ ...x }));
  const titles = ws.filter((x) => x.type === "heading").sort((a, b) => a.y - b.y);
  const h = titles.find((x) => x.id === headingId);
  if (!h) return widgets;
  const next = titles.find((x) => x.y > h.y);
  const inSec = ws.filter((x) => x.type !== "heading" && x.y > h.y && (!next || x.y < next.y));
  const free = (x: number, y: number) => x + card.w <= 12 && !ws.some((o) => x < o.x + o.w && o.x < x + card.w && y < o.y + o.h && o.y < y + card.h);
  if (inSec.length) {
    const lastRow = Math.max(...inSec.map((x) => x.y));
    for (let x = 0; x + card.w <= 12; x++) if (free(x, lastRow)) return resolveLayout([...ws, { ...card, x, y: lastRow }], card.id);
  }
  const bottom = inSec.length ? Math.max(...inSec.map((x) => x.y + x.h)) : h.y + h.h;
  for (const o of ws) if (o.y >= bottom) o.y += card.h;
  return resolveLayout([...ws, { ...card, x: 0, y: bottom }], card.id);
}

function widgetBody(c: Ctx, w: Widget, widgetId: string) {
      const t = c.t;
      switch (w.type) {
        case "camera":
          return col(
            entityField(c, t("entity"), w.config.entity, { domains: ["camera"] }, (id) => editWidget(c, widgetId, (x) => (x.config.entity = id))),
            w.config.entity ? nameField(c, w.config.entity) : nothing,
            html`<div class="field">
              ${t("camera_mode")}
              <div class="seg">
                ${(["auto", "live", "still"] as const).map(
                  (v) => html`<button
                    aria-pressed=${(w.config.live === undefined ? "auto" : w.config.live ? "live" : "still") === v}
                    @click=${() => editWidget(c, widgetId, (x) => (v === "auto" ? delete x.config.live : (x.config.live = v === "live")))}
                  >
                    ${t(`camera_${v}` as I18nKey)}
                  </button>`
                )}
              </div>
              <span class="hint">${t("camera_mode_hint")}</span>
            </div>`
          );
        case "tile":
        case "vacuum":
        case "media":
        case "remote":
          return col(
            entityField(c, t("entity"), w.config.entity, ENTITY_FILTERS[w.type] ?? {}, (id) =>
              editWidget(c, widgetId, (x) => (x.config.entity = id))
            ),
            w.config.entity ? nameField(c, w.config.entity) : nothing
          );
        case "gauge":
          return col(
            entityField(c, t("entity"), w.config.entity, { domains: ["sensor"] }, (id) => editWidget(c, widgetId, (x) => (x.config.entity = id))),
            html`<div class="row" style="display:flex;gap:8px">
              ${(["min", "max", "low"] as const).map(
                (k) => html`<label class="field" style="flex:1"
                  >${k === "low" ? t("gauge_low") + " %" : k}
                  <input type="number" .value=${String(w.config[k] ?? (k === "max" ? 100 : k === "low" ? 20 : 0))} @change=${(e: any) => editWidget(c, widgetId, (x) => (x.config[k] = Number(e.target.value)))} />
                </label>`
              )}
            </div>`,
            c.allows("refill")
              ? html`<label class="field"
                  >${t("refill_phone")}
                  <input type="tel" class="ltr" placeholder="972501234567" .value=${w.config.supplier ?? ""} @change=${(e: any) => editWidget(c, widgetId, (x) => (x.config.supplier = e.target.value.trim() || undefined))} />
                  <span class="hint">${t("refill_hint")}</span>
                </label>`
              : nothing
          );
        case "gate":
          return col(
            entityField(c, t("widget_gate"), w.config.entity, { domains: ["cover"] }, (id) => editWidget(c, widgetId, (x) => (x.config.entity = id))),
            entityField(c, t("widget_camera"), w.config.camera, { domains: ["camera"] }, (id) => editWidget(c, widgetId, (x) => (x.config.camera = id)), true)
          );
        case "frigate":
          return html`<label class="field"
            >Frigate instance ID
            <input type="text" class="ltr" .value=${w.config.instance ?? "frigate"} @change=${(e: any) => editWidget(c, widgetId, (x) => (x.config.instance = e.target.value.trim() || "frigate"))} />
          </label>`;
        case "todo":
          return entityField(c, t("widget_todo"), w.config.entity, { domains: ["todo"] }, (id) => editWidget(c, widgetId, (x) => (x.config.entity = id)));
        case "calendar": {
          const cals = Object.keys(c.hass.states).filter((id) => id.startsWith("calendar."));
          const chosen: string[] = w.config.entities ?? [];
          return html`<div style="display:grid;gap:8px">
            ${cals.map((id) => {
              const on = !chosen.length || chosen.includes(id);
              return html`<button
                class="btn pressable ${on ? "primary" : ""}"
                style="justify-content:flex-start;font-weight:500"
                @click=${() =>
                  editWidget(c, widgetId, (x) => {
                    const cur: string[] = x.config.entities?.length ? x.config.entities : [...cals];
                    x.config.entities = on ? cur.filter((y) => y !== id) : [...cur, id];
                  })}
              >
                <sn-icon icon=${on ? "check" : "close"} style="--icon-size:18px"></sn-icon>${entityName(c.hass, c.config, id)}
              </button>`;
            })}
          </div>`;
        }
        case "countdown": {
          const events: { title: string; date: string }[] = w.config.events ?? [];
          return col(
            html`<div class="field">${t("next_ramadan")} / ${t("next_eid")} ${toggle(c, w.config.islamic ?? c.lang === "ar", (v) => editWidget(c, widgetId, (x) => (x.config.islamic = v)))}</div>`,
            ...events.map(
              (ev, i) => html`<div style="display:flex;gap:8px;align-items:center">
                <span style="flex:1">${ev.title}</span><span class="muted ltr">${ev.date}</span>
                <button class="icon-btn small pressable" aria-label=${t("delete")} @click=${() => editWidget(c, widgetId, (x) => x.config.events.splice(i, 1))}>
                  <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                </button>
              </div>`
            ),
            html`<form
              style="display:grid;gap:8px"
              @submit=${(e: SubmitEvent) => {
                e.preventDefault();
                const f = e.currentTarget as HTMLFormElement;
                const title = (f.elements.namedItem("title") as HTMLInputElement).value.trim();
                const date = (f.elements.namedItem("date") as HTMLInputElement).value;
                if (!title || !date) return;
                editWidget(c, widgetId, (x) => (x.config.events = [...(x.config.events ?? []), { title, date }]));
                f.reset();
              }}
            >
              <input name="title" type="text" placeholder=${t("event_title")} />
              <input name="date" type="date" />
              <button class="btn primary pressable" type="submit" style="justify-self:start">${t("add_event")}</button>
            </form>`
          );
        }
        case "energy_stats": {
          const g = guessBill(c.hass);
          const field = (key: "total" | "solar", label: I18nKey) =>
            entityField(c, t(label), w.config[key] ?? g[key], { domains: ["sensor"], deviceClasses: ["energy"] }, (id) => editWidget(c, widgetId, (x) => (x.config[key] = id)), true);
          return col(
            field("total", "e_total_energy"),
            field("solar", "e_solar_energy"),
            html`<label class="field"
              >${t("tariff")}
              <input type="number" step="0.01" min="0" .value=${String(w.config.tariff ?? 0.6)} @change=${(e: any) => editWidget(c, widgetId, (x) => (x.config.tariff = Number(e.target.value) || 0))} />
            </label>`,
            html`<label class="field"
              >${t("bill_budget")}
              <input type="number" min="0" .value=${String(w.config.budget ?? "")} placeholder="–" @change=${(e: any) => editWidget(c, widgetId, (x) => (x.config.budget = Number(e.target.value) || undefined))} />
            </label>`,
            html`<label class="field"
              >${t("currency")}
              <input type="text" maxlength="4" .value=${w.config.currency ?? "₪"} @change=${(e: any) => editWidget(c, widgetId, (x) => (x.config.currency = e.target.value.trim() || "₪"))} />
            </label>`
          );
        }
        case "energy": {
          const g = guessEnergy(c.hass);
          const field = (key: "solar" | "grid" | "battery" | "soc" | "home", label: I18nKey, classes: string[]) =>
            entityField(c, t(label), w.config[key] ?? g[key], { domains: ["sensor"], deviceClasses: classes }, (id) => editWidget(c, widgetId, (x) => (x.config[key] = id)), true);
          const flip = (key: "flip_grid" | "flip_battery") =>
            html`<div class="field">${t("e_flip")} ${toggle(c, !!w.config[key], (v) => editWidget(c, widgetId, (x) => (x.config[key] = v)))}</div>`;
          return col(
            field("solar", "e_solar_entity", ["power"]),
            field("grid", "e_grid_entity", ["power"]),
            flip("flip_grid"),
            field("battery", "e_battery_entity", ["power"]),
            flip("flip_battery"),
            field("soc", "e_soc_entity", ["battery"]),
            field("home", "e_home_entity", ["power"])
          );
        }
        case "room": {
          const areas = Object.values(c.hass.areas ?? {});
          return col(
            html`<label class="field"
              >${t("room_area")}
              <select @change=${(e: any) => editWidget(c, widgetId, (x) => (x.config.area = e.target.value || undefined))}>
                <option value="">–</option>
                ${areas.map((a) => html`<option value=${a.area_id} ?selected=${w.config.area === a.area_id}>${a.name}</option>`)}
              </select>
            </label>`,
            html`<label class="field">${t("room_name")}<input type="text" .value=${w.config.name ?? ""} @change=${(e: any) => editWidget(c, widgetId, (x) => (x.config.name = e.target.value.trim() || undefined))} /></label>`,
            html`<label class="field"
              >${t("room_photo")}
              <input
                type="file"
                accept="image/*"
                @change=${async (e: any) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const url = await uploadImage(c.hass, file);
                    editWidget(c, widgetId, (x) => (x.config.photo = url));
                  } catch {
                    c.toast(t("error"));
                  }
                }}
              />
            </label>`
          );
        }
        case "water": {
          const g = guessWater(c.hass);
          const pick = (key: "usage" | "tank" | "valve", label: I18nKey, filter: EntityFilter) =>
            entityField(c, t(label), w.config[key] ?? g[key], filter, (id) => editWidget(c, widgetId, (x) => (x.config[key] = id)), true);
          return col(
            pick("usage", "water_usage", { domains: ["sensor"], deviceClasses: ["water"] }),
            pick("tank", "water_tank", { domains: ["sensor"] }),
            pick("valve", "water_valve", { domains: ["valve", "switch"] })
          );
        }
        case "ac":
          return entityField(c, t("entity"), w.config.entity, { domains: ["climate"] }, (id) => editWidget(c, widgetId, (x) => (x.config.entity = id)));
        case "sensor":
          return col(
            entityField(c, t("entity"), w.config.entity, { domains: ["sensor"] }, (id) => editWidget(c, widgetId, (x) => (x.config.entity = id))),
            w.config.entity ? nameField(c, w.config.entity) : nothing
          );
        case "batteries":
          return html`<label class="field"
            >${t("bat_low_at")}
            <input type="number" min="5" max="60" .value=${String(w.config.low ?? 20)} @change=${(e: any) => editWidget(c, widgetId, (x) => (x.config.low = Number(e.target.value) || 20))} />
          </label>`;
        case "family":
          return multiField(c, t("family_who"), w.config.entities, { domains: ["person", "device_tracker", "binary_sensor"] }, (ids) => editWidget(c, widgetId, (x) => (x.config.entities = ids)), "family_all");
        case "hours":
          return multiField(c, t("widget_hours"), w.config.entities, { domains: ["light", "switch", "climate", "fan", "media_player", "water_heater", "input_boolean"] }, (ids) => editWidget(c, widgetId, (x) => (x.config.entities = ids)));
        case "plants":
          return col(
            multiField(c, t("widget_plants"), w.config.entities, { domains: ["sensor", "plant"] }, (ids) => editWidget(c, widgetId, (x) => (x.config.entities = ids))),
            numberField(t("plants_dry_at"), w.config.dry ?? 25, 5, 80, (v) => editWidget(c, widgetId, (x) => (x.config.dry = v)))
          );
        case "pool": {
          const pick = (key: "temp" | "pump" | "light" | "heater", label: I18nKey, domains: string[]) =>
            entityField(c, t(label), w.config[key], { domains }, (id) => editWidget(c, widgetId, (x) => (x.config[key] = id)), true);
          return col(pick("temp", "pool_water", ["sensor"]), pick("pump", "pool_pump", ["switch"]), pick("light", "pool_light", ["light", "switch"]), pick("heater", "pool_heat", ["climate", "switch", "water_heater"]));
        }
        case "car":
          return col(
            titleField(c, widgetId, w.config.title),
            entityField(c, t("car_pick"), w.config.entity, { domains: ["sensor", "device_tracker", "lock", "binary_sensor"] }, (id) => editWidget(c, widgetId, (x) => (x.config.entity = id)), true)
          );
        case "openings":
          return col(
            titleField(c, widgetId, w.config.title),
            html`<div class="field">${t("openings_only_open")} ${toggle(c, !!w.config.only_open, (v) => editWidget(c, widgetId, (x) => (x.config.only_open = v)))}</div>`,
            multiField(c, t("widget_openings"), w.config.entities, { domains: ["binary_sensor", "cover"] }, (ids) => editWidget(c, widgetId, (x) => (x.config.entities = ids)))
          );
        case "comfort": {
          const chosenAreas: string[] = w.config.areas ?? [];
          return html`<div class="field">
            ${t("comfort_rooms")}
            <div style="display:flex;flex-wrap:wrap;gap:6px">
              ${Object.values(c.hass.areas ?? {}).map((a) => {
                const on = chosenAreas.includes(a.area_id);
                return html`<button class="btn pressable ${on ? "primary" : ""}" aria-pressed=${on} @click=${() =>
                  editWidget(c, widgetId, (x) => (x.config.areas = on ? chosenAreas.filter((id) => id !== a.area_id) : [...chosenAreas, a.area_id]))}>${a.name}</button>`;
              })}
            </div>
            <span class="muted">${t("auto_all")}</span>
          </div>`;
        }
        case "ktimer":
          return html`<label class="field"
            >${t("ktimer_presets")}
            <input
              .value=${(w.config.presets ?? [3, 5, 10, 15, 30, 60]).join(", ")}
              @change=${(e: any) =>
                editWidget(c, widgetId, (x) => (x.config.presets = String(e.target.value).split(/[,،\s]+/).map(Number).filter((n) => n > 0).slice(0, 8)))}
            />
          </label>`;
        case "reminders":
          return titleField(c, widgetId, w.config.title);
        case "photos":
          return col(
            html`<label class="field"
              >${t("photos_folder")}
              <input .value=${w.config.folder ?? ""} placeholder=${c.config.settings.screensaver.photo_folder} @change=${(e: any) => editWidget(c, widgetId, (x) => (x.config.folder = e.target.value.trim() || undefined))} />
            </label>`,
            numberField(t("photos_seconds"), w.config.seconds ?? 15, 5, 300, (v) => editWidget(c, widgetId, (x) => (x.config.seconds = v)))
          );
        case "wifi":
          return col(
            html`<div class="field">${t("wifi_only_on")} ${toggle(c, !!w.config.only_on, (v) => editWidget(c, widgetId, (x) => (x.config.only_on = v)))}</div>`,
            multiField(c, t("widget_wifi"), w.config.entities, { domains: ["device_tracker"] }, (ids) => editWidget(c, widgetId, (x) => (x.config.entities = ids)))
          );
        case "baby": {
          const pick = (key: "camera" | "temp" | "humidity" | "light" | "noise", label: I18nKey, domains: string[]) =>
            entityField(c, t(label), w.config[key], { domains }, (id) => editWidget(c, widgetId, (x) => (x.config[key] = id)), true);
          return col(
            titleField(c, widgetId, w.config.title),
            html`<label class="field"
              >${t("room_area")}
              <select @change=${(e: any) => editWidget(c, widgetId, (x) => (x.config.area = e.target.value || undefined))}>
                <option value="">–</option>
                ${Object.values(c.hass.areas ?? {}).map((a) => html`<option value=${a.area_id} ?selected=${w.config.area === a.area_id}>${a.name}</option>`)}
              </select>
            </label>`,
            pick("camera", "camera", ["camera"]),
            pick("temp", "temperature", ["sensor"]),
            pick("humidity", "humidity", ["sensor"]),
            pick("light", "baby_light", ["light", "switch"]),
            pick("noise", "baby_noise", ["media_player", "switch"])
          );
        }
        case "activity":
          return numberField(t("quiet_hours"), w.config.quiet_hours ?? 6, 1, 48, (v) => editWidget(c, widgetId, (x) => (x.config.quiet_hours = v)));
        case "bins": {
          const bins: { name: string; color: string; day: number }[] = w.config.bins ?? [];
          const day = (d: number) => new Date(2023, 0, 1 + d).toLocaleDateString(c.lang === "ar" ? "ar" : c.lang, { weekday: "long" });
          return col(
            ...bins.map(
              (b, i) => html`<div style="display:flex;gap:8px;align-items:center">
                <span style="width:18px;height:18px;border-radius:4px;background:${b.color}"></span>
                <span style="flex:1">${b.name}</span><span class="muted">${day(b.day)}</span>
                <button class="icon-btn small pressable" aria-label=${t("delete")} @click=${() => editWidget(c, widgetId, (x) => x.config.bins.splice(i, 1))}>
                  <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                </button>
              </div>`
            ),
            html`<form
              style="display:flex;gap:8px;flex-wrap:wrap"
              @submit=${(e: SubmitEvent) => {
                e.preventDefault();
                const f = e.currentTarget as HTMLFormElement;
                const name = (f.elements.namedItem("n") as HTMLInputElement).value.trim();
                if (!name) return;
                const color = (f.elements.namedItem("c") as HTMLInputElement).value;
                const d = Number((f.elements.namedItem("d") as HTMLSelectElement).value);
                editWidget(c, widgetId, (x) => (x.config.bins = [...(x.config.bins ?? []), { name, color, day: d }]));
                f.reset();
              }}
            >
              <input name="n" type="text" placeholder=${t("bins_name")} style="flex:1;min-width:140px" />
              <select name="d">${[0, 1, 2, 3, 4, 5, 6].map((d) => html`<option value=${d}>${day(d)}</option>`)}</select>
              <input name="c" type="color" value="#2bb673" style="width:44px;height:38px;padding:2px" />
              <button class="icon-btn primary pressable" type="submit" aria-label=${t("add")}><sn-icon icon="plus" style="--icon-size:18px"></sn-icon></button>
            </form>`
          );
        }
        case "folder":
          return col(
            titleField(c, widgetId, w.config.title),
            multiField(c, t("widget_folder"), w.config.entities, { domains: ["light", "switch", "fan", "cover", "climate", "lock", "media_player", "input_boolean", "scene", "script"] }, (ids) =>
              editWidget(c, widgetId, (x) => (x.config.entities = ids))
            )
          );
        case "scenes":
          return col(
            titleField(c, widgetId, w.config.title),
            multiField(c, t("widget_scenes"), w.config.entities, { domains: ["scene", "script"] }, (ids) => editWidget(c, widgetId, (x) => (x.config.entities = ids)))
          );
        case "lights":
        case "covers":
        case "switches":
        case "fans": {
          const areas = Object.values(c.hass.areas ?? {});
          return col(
            titleField(c, widgetId, w.config.title),
            html`<label class="field"
              >${t("room_area")}
              <select @change=${(e: any) => editWidget(c, widgetId, (x) => (x.config.area = e.target.value || undefined))}>
                <option value="">${t("area_all")}</option>
                ${areas.map((a) => html`<option value=${a.area_id} ?selected=${w.config.area === a.area_id}>${a.name}</option>`)}
              </select>
            </label>`,
            multiField(c, t(`widget_${w.type}` as I18nKey), w.config.entities, { domains: [{ lights: "light", covers: "cover", switches: "switch", fans: "fan" }[w.type as "lights"]] }, (ids) =>
              editWidget(c, widgetId, (x) => (x.config.entities = ids))
            )
          );
        }
        case "boiler":
          return entityField(c, t("boiler_pick"), w.config.entity, { domains: ["switch", "water_heater", "input_boolean", "light"] }, (id) =>
            editWidget(c, widgetId, (x) => (x.config.entity = id))
          );
        case "irrigation":
          return entityField(c, t("widget_irrigation"), w.config.entity, { domains: ["valve", "switch", "input_boolean"] }, (id) =>
            editWidget(c, widgetId, (x) => (x.config.entity = id))
          );
        case "air":
          return col(
            entityField(c, t("air_purifier"), w.config.purifier, { domains: ["fan", "humidifier", "switch", "climate"] }, (id) => editWidget(c, widgetId, (x) => (x.config.purifier = id)), true),
            multiField(c, t("air_sensors"), w.config.entities, { domains: ["sensor"] }, (ids) => editWidget(c, widgetId, (x) => (x.config.entities = ids)))
          );
        case "commute":
          return multiField(c, t("widget_commute"), w.config.entities, { domains: ["sensor"] }, (ids) => editWidget(c, widgetId, (x) => (x.config.entities = ids)));
        case "timeline":
          return entityField(c, t("widget_camera"), w.config.camera, { domains: ["camera"] }, (id) => editWidget(c, widgetId, (x) => (x.config.camera = id)), true);
        case "heading":
          return html`<label class="field"
            >${t("heading_text")}
            <input type="text" .value=${w.config.text ?? ""} @change=${(e: any) => editWidget(c, widgetId, (x) => (x.config.text = e.target.value))} />
          </label>`;
        case "floorplan":
          return col(
            html`<div class="field">
              ${t("plan_in_dark")}
              <div class="seg">
                ${[false, true].map(
                  (v) => html`<button aria-pressed=${!!w.config.invert_dark === v} @click=${() => editWidget(c, widgetId, (x) => (x.config.invert_dark = v))}>
                    ${t(v ? "plan_invert" : "plan_original")}
                  </button>`
                )}
              </div>
            </div>`,
            c.allows("sun_on_plan")
              ? html`<label class="field"
                  >${t("plan_north")}
                  <input type="number" min="0" max="359" step="5" .value=${String(w.config.north ?? 0)} @change=${(e: any) => editWidget(c, widgetId, (x) => (x.config.north = (Number(e.target.value) || 0) % 360))} />
                  <span class="hint">${t("plan_north_hint")}</span>
                </label>`
              : nothing,
            html`<p class="muted" style="margin:0;font-size:14px">${t("drag_hint")}</p>`
          );
        default:
          return html`<p class="muted">${t(`widget_${w.type}` as I18nKey)}</p>`;
      }
}

const WIDGET_CHOICES: { type: WidgetType; icon: string }[] = [
  { type: "tile", icon: "lightbulb" },
  { type: "floorplan", icon: "layers" },
  { type: "camera", icon: "cctv" },
  { type: "modes", icon: "leave" },
  { type: "vacuum", icon: "robot-vacuum" },
  { type: "visitors", icon: "doorbell" },
  { type: "energy", icon: "solar" },
  { type: "energy_stats", icon: "lightning-bolt" },
  { type: "check", icon: "night" },
  { type: "panic", icon: "alert-circle-outline" },
  { type: "family", icon: "family" },
  { type: "todo", icon: "todo" },
  { type: "calendar", icon: "calendar" },
  { type: "forecast", icon: "w-partlycloudy" },
  { type: "countdown", icon: "countdown" },
  { type: "gauge", icon: "gas" },
  { type: "gate", icon: "gate" },
  { type: "frigate", icon: "cctv" },
  { type: "schedule", icon: "schedule" },
  { type: "media", icon: "speaker" },
  { type: "remote", icon: "television" },
  { type: "consumers", icon: "lightning-bolt" },
  { type: "water", icon: "water" },
  { type: "wake", icon: "weather-sunset-up" },
  { type: "chores", icon: "star" },
  { type: "air", icon: "leaf" },
  { type: "boiler", icon: "water-boiler" },
  { type: "irrigation", icon: "sprinkler" },
  { type: "timeline", icon: "history" },
  { type: "internet", icon: "wifi" },
  { type: "board", icon: "note" },
  { type: "verse", icon: "book-open-variant" },
  { type: "radar", icon: "weather-pouring" },
  { type: "commute", icon: "car" },
  { type: "parcels", icon: "package" },
  { type: "hero", icon: "home" },
  { type: "stack", icon: "layers" },
  { type: "room", icon: "sofa" },
  { type: "ac", icon: "air-conditioner" },
  { type: "scenes", icon: "palette" },
  { type: "sensor", icon: "chart-line" },
  { type: "batteries", icon: "battery" },
  { type: "lights", icon: "lightbulb-group" },
  { type: "covers", icon: "blinds" },
  { type: "prayer", icon: "mosque" },
  { type: "folder", icon: "folder" },
  { type: "story", icon: "book-open-variant" },
  { type: "hours", icon: "progress-clock" },
  { type: "plants", icon: "sprout" },
  { type: "pool", icon: "pool" },
  { type: "net", icon: "wifi" },
  { type: "car", icon: "car" },
  { type: "solarcast", icon: "solar" },
  { type: "bins", icon: "trash-can" },
  { type: "activity", icon: "motion-sensor" },
  { type: "openings", icon: "door-open" },
  { type: "comfort", icon: "sofa-single-outline" },
  { type: "ktimer", icon: "timer-outline" },
  { type: "reminders", icon: "pill" },
  { type: "photos", icon: "image-multiple" },
  { type: "wifi", icon: "wifi" },
  { type: "baby", icon: "baby-face-outline" },
  { type: "switches", icon: "power-socket" },
  { type: "fans", icon: "fan" },
  { type: "clock", icon: "clock-outline" },
  { type: "heading", icon: "title" },
];

/** Widgets that work without picking a device first: the gallery shows them live, shrunk down. */
const PREVIEW: WidgetType[] = ["clock", "hero", "verse", "forecast", "consumers", "energy_stats", "energy", "air", "water", "board", "commute", "modes", "family", "countdown"];

function preview(c: Ctx, type: WidgetType) {
  const size = WIDGET_SIZES[type];
  const w = Math.min(560, size.w * 60);
  const h = Math.min(420, size.h * 56);
  const scale = Math.min(150 / w, 96 / h);
  const tag = unsafeStatic(`sn-w-${type.replace(/_/g, "-")}`);
  const widget: Widget = { id: `preview-${type}`, type, x: 0, y: 0, w: size.w, h: size.h, config: {} };
  return html`<span style="position:relative;display:block;width:${w * scale}px;height:${h * scale}px;pointer-events:none;border-radius:14px;overflow:hidden" aria-hidden="true">
    <span style="position:absolute;top:0;left:0;width:${w}px;height:${h}px;transform:scale(${scale});transform-origin:0 0;direction:${c.rtl ? "rtl" : "ltr"}">
      ${staticHtml`<${tag} .ctx=${c} .widget=${widget}></${tag}>`}
    </span>
  </span>`;
}

export function addWidgetSheet(ctx: Ctx, pageId: string) {
  const add = (c: Ctx, type: WidgetType, config: Record<string, any>) => {
    let id = "";
    c.update((d) => {
      const p = d.pages.find((x) => x.id === pageId);
      if (!p) return;
      const w = newWidget(type, config, { y: nextRow(p.widgets) });
      id = w.id;
      p.widgets = resolveLayout([...p.widgets, w]);
    });
    return id;
  };
  ctx.showSheet({
    still: true,
    title: ctx.t("add_widget"),
    render: (c) => html`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
      ${WIDGET_CHOICES.map(
        (choice) => c.allows(widgetFeature(choice.type)) ? html`<button
          class="glass pressable"
          style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500"
          @click=${() => {
            if (["tile", "camera", "vacuum", "gauge", "gate", "media", "remote"].includes(choice.type)) {
              c.showSheet({
                still: true,
                title: c.t("choose_entity"),
                render: (c2) => html`<sn-entity-picker
                  .ctx=${c2}
                  .filter=${ENTITY_FILTERS[choice.type] ?? {}}
                  .onPick=${(entity: string) => {
                    add(c2, choice.type, { entity });
                    c2.closeSheet();
                    c2.closeSheet();
                  }}
                ></sn-entity-picker>`,
              });
              return;
            }
            const config = choice.type === "floorplan" ? { floors: [newFloor(c.t("floor_default"))] } : choice.type === "heading" ? { text: "" } : {};
            const id = add(c, choice.type, config);
            c.closeSheet();
            if (choice.type === "heading") widgetSettingsSheet(c, pageId, id);
          }}
        >
          ${PREVIEW.includes(choice.type) && c.allows("live_gallery")
            ? preview(c, choice.type)
            : html`<span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--accent);color:var(--on-accent)">
                <sn-icon .icon=${choice.icon}></sn-icon>
              </span>`}
          ${c.t(`widget_${choice.type}` as I18nKey)}
          <span class="muted ltr" style="font-size:12px">${WIDGET_SIZES[choice.type].w}×${WIDGET_SIZES[choice.type].h}</span>
        </button>` : html`<div
          class="glass"
          style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500;opacity:.55"
          title=${c.t("plan_needed", { plan: c.t(`plan_${planFor(widgetFeature(choice.type))}` as I18nKey) })}
        >
          <span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--surface-2)"><sn-icon icon="lock"></sn-icon></span>
          ${c.t(`widget_${choice.type}` as I18nKey)}
          <span style="font-size:12px;color:var(--accent-text)">${c.t("plan_needed", { plan: c.t(`plan_${planFor(widgetFeature(choice.type))}` as I18nKey) })}</span>
        </div>`
      )}
    </div>`,
  });
}

export function addPageSheet(ctx: Ctx, onCreated: (pageId: string) => void) {
  ctx.showSheet({
    still: true,
    title: ctx.t("add_page"),
    render: (c) => section(
      c.t("choose_template"),
      html`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
        ${TEMPLATES.map(
          (tpl) => html`<button
            class="glass pressable"
            style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500"
            @click=${() => {
              const page = pageFromTemplate(tpl.id, c.hass, c.config, c.t);
              c.update((d) => d.pages.push(page));
              c.closeSheet();
              onCreated(page.id);
            }}
          >
            <span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--surface-2)">
              <sn-icon .icon=${tpl.icon}></sn-icon>
            </span>
            ${c.t(tpl.label)}
          </button>`
        )}
      </div>`
    ),
  });
}

export function pageSettingsSheet(ctx: Ctx, pageId: string, onDeleted: () => void) {
  const edit = (c: Ctx, fn: (d: DashboardConfig, idx: number) => void) =>
    c.update((d) => {
      const idx = d.pages.findIndex((p) => p.id === pageId);
      if (idx >= 0) fn(d, idx);
    });
  ctx.showSheet({
    still: true,
    title: ctx.t("page_settings"),
    render: (c) => {
      const idx = c.config.pages.findIndex((p) => p.id === pageId);
      const page = c.config.pages[idx];
      if (!page) return html``;
      const t = c.t;
      const swap = (dir: -1 | 1) =>
        edit(c, (d, i) => {
          const j = i + dir;
          if (j < 0 || j >= d.pages.length) return;
          [d.pages[i], d.pages[j]] = [d.pages[j], d.pages[i]];
        });
      return col(
        c.allows("page_users") ? html`<sn-page-users .ctx=${c} .page=${page} .onChange=${(ids: string[]) => edit(c, (d, i) => (ids.length ? (d.pages[i].users = ids) : delete d.pages[i].users))}></sn-page-users>` : nothing,
        html`<label class="field"
          >${t("page_title")}
          <input type="text" .value=${page.title} @change=${(e: any) => edit(c, (d, i) => (d.pages[i].title = e.target.value.trim() || page.title))} />
        </label>`,
        html`<div class="field">
          ${t("page_icon")}
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(48px,1fr));gap:6px">
            ${PAGE_ICONS.map(
              (icon) => html`<button
                class="icon-btn pressable ${page.icon === icon ? "primary" : ""}"
                style="width:100%;border-radius:var(--r-sm)"
                aria-pressed=${page.icon === icon}
                @click=${() => edit(c, (d, i) => (d.pages[i].icon = icon))}
              >
                <sn-icon .icon=${icon}></sn-icon>
              </button>`
            )}
          </div>
        </div>`,
        c.allows("person_pages") && Object.keys(c.hass.states).some((id) => id.startsWith("person."))
          ? html`<label class="field"
              >${t("page_person")}
              <select @change=${(e: any) => edit(c, (d, i) => (e.target.value ? (d.pages[i].person = e.target.value) : delete d.pages[i].person))}>
                <option value="" ?selected=${!page.person}>${t("page_person_all")}</option>
                ${Object.keys(c.hass.states)
                  .filter((id) => id.startsWith("person."))
                  .map((id) => html`<option value=${id} ?selected=${page.person === id}>${entityName(c.hass, c.config, id)}</option>`)}
              </select>
              <span class="hint">${t("page_person_hint")}</span>
            </label>`
          : nothing,
        row(
          html`<button class="btn pressable" ?disabled=${idx === 0} @click=${() => swap(-1)}>${t("move_earlier")}</button>`,
          html`<button class="btn pressable" ?disabled=${idx === c.config.pages.length - 1} @click=${() => swap(1)}>${t("move_later")}</button>`,
          html`<span style="flex:1"></span>`,
          html`<button
            class="btn danger pressable"
            ?disabled=${c.config.pages.length <= 1}
            @click=${() => {
              if (!confirm(t("delete_confirm"))) return;
              edit(c, (d, i) => {
                d.pages.splice(i, 1);
                if (d.settings.default_page === pageId) d.settings.default_page = d.pages[0]?.id ?? "";
              });
              c.closeSheet();
              onDeleted();
            }}
          >
            <sn-icon icon="delete" style="--icon-size:20px"></sn-icon>${t("delete")}
          </button>`
        )
      );
    },
  });
}

function toggle(ctx: Ctx, value: boolean, onSet: (v: boolean) => void) {
  return html`<div class="seg">
    ${[true, false].map((v) => html`<button aria-pressed=${value === v} @click=${() => onSet(v)}>${ctx.t(v ? "on" : "off")}</button>`)}
  </div>`;
}

function numberField(label: string, value: number, min: number, max: number, onSet: (v: number) => void) {
  return html`<label class="field"
    >${label}
    <input type="number" min=${min} max=${max} .value=${String(value)} @change=${(e: any) => onSet(Math.min(max, Math.max(min, Number(e.target.value) || 0)))} />
  </label>`;
}

const ACCENTS = [DEFAULT_ACCENT, "#18BCF2", "#2FB57A", "#F26B68", "#A78BFA", "#F5BE6A"];
const THEMES: { id: ThemeMode; label: I18nKey }[] = [
  { id: "schedule", label: "theme_schedule" },
  { id: "auto", label: "theme_auto" },
  { id: "light", label: "theme_light" },
  { id: "dark", label: "theme_dark" },
  { id: "midnight", label: "theme_midnight" },
];

export function settingsSheet(
  ctx: Ctx,
  opts: { version: string; license?: { licensee: string; plan: string; expires?: number; trial: boolean; reseller: string }; testDoorbell: () => void; checkLicense?: () => Promise<string> }
) {
  ctx.showSheet({
    still: true,
    title: ctx.t("settings"),
    render: (c) => {
      const s = c.config.settings;
      const t = c.t;
      const set = (fn: (d: DashboardConfig) => void) => c.update(fn);
      return col(
        c.allows("autobuild")
          ? html`<button class="btn primary pressable" style="min-height:56px;font-size:16px" @click=${() => autobuildSheet(c)}>
              <sn-icon icon="auto-fix" style="--icon-size:22px"></sn-icon>${t("ab_title")}
            </button>`
          : nothing,
        html`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <button class="btn pressable" @click=${() => healthSheet(c)}><sn-icon icon="gauge" style="--icon-size:20px"></sn-icon>${t("health")}</button>
          ${c.allows("automations")
            ? html`<button class="btn pressable" @click=${() => automationsSheet(c)}><sn-icon icon="automation" style="--icon-size:20px"></sn-icon>${t("automations")}</button>`
            : nothing}
          <button class="btn pressable" @click=${() => licensesSheet(c)}><sn-icon icon="key" style="--icon-size:20px"></sn-icon>التراخيص</button>
          ${c.allows("history") ? html`<button class="btn pressable" @click=${() => historySheet(c)}><sn-icon icon="history" style="--icon-size:20px"></sn-icon>${t("history")}</button>` : nothing}
          ${c.allows("report")
            ? html`<button class="btn pressable" @click=${() => printReport(c, c.assetBase).catch(() => c.toast(t("error")))}><sn-icon icon="file-chart" style="--icon-size:20px"></sn-icon>${t("report")}</button>`
            : nothing}
        </div>`,
        html`<label class="field"
          >${t("home_name")}
          <input
            type="text"
            .value=${s.home_name}
            placeholder=${(c.hass as any).config?.location_name ?? ""}
            @change=${(e: any) => set((d) => (d.settings.home_name = e.target.value.trim()))}
          />
        </label>`,
        html`<div class="field">
          ${t("language")}
          <div class="seg">
            ${LANGS.map(
              (l) => html`<button aria-pressed=${s.language === l.id} @click=${() => set((d) => (d.settings.language = l.id as Lang))}>${l.label}</button>`
            )}
          </div>
        </div>`,
        html`<div class="field">
          ${t("theme")}
          <div class="seg">
            ${THEMES.map((m) => html`<button aria-pressed=${s.theme === m.id} @click=${() => set((d) => (d.settings.theme = m.id))}>${t(m.label)}</button>`)}
          </div>
          ${s.theme === "schedule"
            ? row(
                html`<span>${t("dark_from")}</span>`,
                html`<input type="time" style="width:auto" .value=${s.dark_from} @change=${(e: any) => set((d) => (d.settings.dark_from = e.target.value))} />`,
                html`<span>${t("dark_to")}</span>`,
                html`<input type="time" style="width:auto" .value=${s.dark_to} @change=${(e: any) => set((d) => (d.settings.dark_to = e.target.value))} />`
              )
            : nothing}
        </div>`,
        c.allows("presets") ? presetPicker(c, set) : nothing,
        c.allows("style_pro")
          ? html`<div class="field">
              ${t("style")}
              <div class="seg">
                ${(["classic", "pro"] as const).map((v) => html`<button aria-pressed=${s.style === v} @click=${() => set((d) => (d.settings.style = v))}>${t(v === "pro" ? "style_pro" : "style_classic")}</button>`)}
              </div>
              ${s.style === "pro"
                ? html`<div class="seg" style="margin-top:8px">
                      ${(["none", "marble", "wood", "sand", "olive"] as const).map(
                        (m) => html`<button aria-pressed=${s.material === m} @click=${() => set((d) => (d.settings.material = m))}>${t(`material_${m}` as I18nKey)}</button>`
                      )}
                    </div>
                    <div class="field" style="margin-top:8px">${t("night_midnight")} ${toggle(c, s.night_midnight, (v) => set((d) => (d.settings.night_midnight = v)))}</div>
                    ${c.allows("wallpaper")
                      ? html`<div class="field" style="margin-top:8px">
                          ${t("wallpaper")}
                          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                            ${s.wallpaper ? html`<img src=${s.wallpaper} alt="" style="width:64px;height:40px;object-fit:cover;border-radius:8px" />` : nothing}
                            <input
                              type="file"
                              accept="image/*"
                              style="flex:1"
                              @change=${async (e: any) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                try {
                                  const url = await uploadImage(c.hass, file);
                                  set((d) => (d.settings.wallpaper = url));
                                } catch {
                                  c.toast(t("error"));
                                }
                              }}
                            />
                            ${s.wallpaper ? html`<button class="btn pressable" @click=${() => set((d) => delete d.settings.wallpaper)}>${t("delete")}</button>` : nothing}
                          </div>
                          ${s.wallpaper
                            ? html`<label style="display:flex;gap:8px;align-items:center;font-size:14px"
                                  >${t("wallpaper_dim")}
                                  <input type="range" min="0" max="0.8" step="0.05" .value=${String(s.wallpaper_dim)} @change=${(e: any) => set((d) => (d.settings.wallpaper_dim = Number(e.target.value)))} style="flex:1"
                                /></label>
                                <div>${t("accent_from_wallpaper")} ${toggle(c, s.accent_from_wallpaper, (v) => set((d) => (d.settings.accent_from_wallpaper = v)))}</div>`
                            : nothing}
                        </div>`
                      : nothing}
                    ${c.allows("window_camera")
                      ? entityField(c, t("window_camera"), s.window_camera, { domains: ["camera"] }, (id) => set((d) => (d.settings.window_camera = id)), true)
                      : nothing}
                    ${c.allows("music_backdrop") ? html`<div class="field">${t("music_backdrop")} ${toggle(c, s.music_backdrop, (v) => set((d) => (d.settings.music_backdrop = v)))}</div>` : nothing}
                    ${c.allows("welcome") ? html`<div class="field">${t("welcome_moment")} ${toggle(c, s.welcome, (v) => set((d) => (d.settings.welcome = v)))}</div>` : nothing}
                    ${c.allows("page_moods") ? html`<div class="field">${t("page_moods")} ${toggle(c, s.page_moods, (v) => set((d) => (d.settings.page_moods = v)))}</div>` : nothing}
                    ${c.allows("season_skin") ? html`<div class="field">${t("season_skin")} ${toggle(c, s.season_skin, (v) => set((d) => (d.settings.season_skin = v)))}</div>` : nothing}
                    ${c.allows("accent_day") ? html`<div class="field">${t("accent_day")} ${toggle(c, s.accent_day, (v) => set((d) => (d.settings.accent_day = v)))}</div>` : nothing}
                    ${c.allows("active_glow") ? html`<div class="field">${t("active_glow")} ${toggle(c, s.active_glow, (v) => set((d) => (d.settings.active_glow = v)))}</div>` : nothing}
                    ${c.allows("aurora") ? html`<div class="field">${t("aurora")} ${toggle(c, s.aurora, (v) => set((d) => (d.settings.aurora = v)))}</div>` : nothing}
                    ${c.allows("monogram")
                      ? html`<label class="field"
                          >${t("monogram")}
                          <input type="text" maxlength="30" placeholder="آل محمد" .value=${s.monogram ?? ""} @change=${(e: any) => set((d) => (d.settings.monogram = e.target.value.trim() || undefined))} />
                          <span class="hint">${t("monogram_hint")}</span>
                        </label>`
                      : nothing}
                    ${c.allows("dock")
                      ? html`<div class="field" style="margin-top:8px">
                          ${t("nav_style")}
                          <div class="seg">${(["tabs", "dock"] as const).map((v) => html`<button aria-pressed=${s.nav === v} @click=${() => set((d) => (d.settings.nav = v))}>${t(v === "dock" ? "nav_dock" : "nav_tabs")}</button>`)}</div>
                        </div>`
                      : nothing}`
                : nothing}
              <span class="hint">${t("style_hint")}</span>
            </div>`
          : nothing,
        c.allows("fonts")
          ? html`<label class="field"
              >${t("font")}
              <select @change=${(e: any) => set((d) => (d.settings.font = e.target.value))}>
                ${Object.entries(FONTS).map(([id, f]) => html`<option value=${id} ?selected=${(s.font ?? "rubik") === id} style="font-family:'${f.family}'">${f.label}</option>`)}
              </select>
              <span class="hint">${t("font_hint")}</span>
            </label>`
          : nothing,
        c.allows("icon_styles")
          ? html`<div class="field">
              ${t("icons_style")}
              <div class="seg">${(["filled", "line"] as const).map((v) => html`<button aria-pressed=${(s.icons ?? "filled") === v} @click=${() => set((d) => (d.settings.icons = v))}>${t(v === "line" ? "icons_line" : "icons_filled")}</button>`)}</div>
            </div>`
          : nothing,
        c.allows("occasions") ? html`<sn-occasions-settings .ctx=${c} .set=${set}></sn-occasions-settings>` : nothing,
        c.allows("burn_in") ? html`<div class="field">${t("burn_in")} ${toggle(c, s.burn_in, (v) => set((d) => (d.settings.burn_in = v)))}</div>` : nothing,
        html`<div class="field">${t("cameras_live")} ${toggle(c, s.cameras_live ?? true, (v) => set((d) => (d.settings.cameras_live = v)))}</div>`,
        c.allows("quick_scenes")
          ? multiField(c, t("quick_scenes"), s.quick_scenes?.length ? s.quick_scenes : undefined, { domains: ["scene", "script"] }, (ids) => set((d) => (d.settings.quick_scenes = ids ?? [])), "none")
          : nothing,
        c.allows("circadian")
          ? html`${multiField(c, t("circadian"), s.circadian?.length ? s.circadian : undefined, { domains: ["light"] }, (ids) => set((d) => (d.settings.circadian = ids ?? [])), "none")}
              <span class="hint" style="margin-top:-8px">${t("circadian_hint")}</span>`
          : nothing,
        html`<div class="field">
          ${t("accent")}
          ${row(
            ...ACCENTS.map(
              (a) => html`<button
                class="pressable"
                aria-label=${a}
                aria-pressed=${s.accent.toUpperCase() === a}
                style="width:40px;height:40px;border-radius:999px;background:${a};box-shadow:${s.accent.toUpperCase() === a
                  ? "0 0 0 3px var(--surface-solid), 0 0 0 5px " + a
                  : "none"}"
                @click=${() => set((d) => (d.settings.accent = a))}
              ></button>`
            ),
            html`<input
              type="color"
              aria-label=${t("accent")}
              .value=${s.accent}
              style="width:40px;height:40px;border:0;padding:0;background:none;border-radius:999px"
              @change=${(e: any) => set((d) => (d.settings.accent = e.target.value.toUpperCase()))}
            />`
          )}
        </div>`,
        c.allows("liquid_glass")
          ? html`<div class="field">
              ${t("glass_style")}
              <div class="seg">
                ${(["classic", "liquid"] as const).map(
                  (v) => html`<button aria-pressed=${s.glass === v} @click=${() => set((d) => (d.settings.glass = v))}>${t(`glass_${v}` as I18nKey)}</button>`
                )}
              </div>
            </div>`
          : nothing,
        html`<div class="field">${t("night_plan")} ${toggle(c, s.night_plan, (v) => set((d) => (d.settings.night_plan = v)))}</div>`,
        c.allows("seasons")
          ? html`<div class="field">
              ${t("season")}
              <div class="seg">
                ${(["auto", "ramadan", "eid", "off"] as const).map(
                  (v) => html`<button aria-pressed=${s.season === v} @click=${() => set((d) => (d.settings.season = v))}>${t(v === "off" ? "off" : (`season_${v}` as I18nKey))}</button>`
                )}
              </div>
            </div>`
          : nothing,
        c.allows("kids")
          ? html`<label class="field"
              >${t("kids_page")}
              <select @change=${(e: any) => set((d) => (d.settings.kids_page = e.target.value || undefined))}>
                <option value="" ?selected=${!s.kids_page}>${t("none")}</option>
                ${c.config.pages.map((p) => html`<option value=${p.id} ?selected=${s.kids_page === p.id}>${p.title}</option>`)}
              </select>
            </label>`
          : nothing,
        html`<label class="field"
          >${t("default_page")}
          <select @change=${(e: any) => set((d) => (d.settings.default_page = e.target.value))}>
            ${c.config.pages.map((p) => html`<option value=${p.id} ?selected=${s.default_page === p.id}>${p.title}</option>`)}
          </select>
        </label>`,
        section(
          t("screensaver"),
          html`<div class="seg">
            ${[true, false].map(
              (v) => html`<button aria-pressed=${s.screensaver.enabled === v} @click=${() => set((d) => (d.settings.screensaver.enabled = v))}>
                ${t(v ? "on" : "off")}
              </button>`
            )}
          </div>`,
          s.screensaver.enabled && c.allows("clock_styles")
            ? html`<div class="field">
                ${t("ss_style")}
                <div class="seg">
                  ${(["classic", "minimal", "analog"] as const).map(
                    (v) => html`<button aria-pressed=${s.screensaver.style === v} @click=${() => set((d) => (d.settings.screensaver.style = v))}>${t(`ss_${v}` as I18nKey)}</button>`
                  )}
                </div>
              </div>`
            : nothing,
          s.screensaver.enabled
            ? html`<label class="field"
                  >${t("screensaver_after")}
                  <input
                    type="number"
                    min="1"
                    max="120"
                    .value=${String(s.screensaver.timeout_min)}
                    @change=${(e: any) => set((d) => (d.settings.screensaver.timeout_min = Math.max(1, Number(e.target.value) || 5)))}
                  />
                </label>
                ${entityField(c, t("temp_entity"), s.screensaver.temp_entity, { domains: ["sensor", "climate", "weather"] }, (id) =>
                  set((d) => (d.settings.screensaver.temp_entity = id)), true
                )}
                <div class="field">${t("photos")} ${toggle(c, s.screensaver.photos, (v) => set((d) => (d.settings.screensaver.photos = v)))}</div>
                ${s.screensaver.photos
                  ? html`<label class="field"
                        >${t("photo_folder")}
                        <input
                          type="text"
                          class="ltr"
                          .value=${s.screensaver.photo_folder}
                          @change=${(e: any) => set((d) => (d.settings.screensaver.photo_folder = (e.target.value.trim().startsWith("media-source://") ? e.target.value.trim() : e.target.value.trim().replace(/^\/+|\/+$/g, "")) || "smartnest-photos"))}
                        />
                        <span class="hint">${t("photos_hint", { folder: s.screensaver.photo_folder })}</span>
                      </label>
                      ${numberField(t("photo_seconds"), s.screensaver.photo_seconds, 5, 600, (v) => set((d) => (d.settings.screensaver.photo_seconds = v)))}`
                  : nothing}`
            : nothing
        ),
        section(
          t("greet_morning") + " ☀️",
          html`<label class="field"
            >${t("greeting_name")}
            <input
              type="text"
              .value=${s.greeting_name}
              placeholder=${c.hass.user?.name ?? ""}
              @change=${(e: any) => set((d) => (d.settings.greeting_name = e.target.value.trim()))}
            />
            <span class="hint">${t("greeting_name_hint")}</span>
          </label>`,
          html`<div class="field">${t("prayer")} ${toggle(c, s.prayer, (v) => set((d) => (d.settings.prayer = v)))}</div>`,
          html`<div class="field">${t("morning_summary")} ${toggle(c, s.morning, (v) => set((d) => (d.settings.morning = v)))}</div>`
        ),
        section(
          t("hidden_devices"),
          hiddenDevices(c, s.hidden, (ids) => set((d) => (d.settings.hidden = ids)))
        ),
        section(
          t("status_bar"),
          html`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px">
            ${CHIP_TYPES.map((ct) => {
              const on = !s.chips_hidden.includes(ct.id);
              return html`<button
                class="btn pressable ${on ? "primary" : ""}"
                style="justify-content:flex-start;font-weight:500"
                aria-pressed=${on}
                @click=${() =>
                  set((d) => {
                    const h = new Set(d.settings.chips_hidden);
                    on ? h.add(ct.id) : h.delete(ct.id);
                    d.settings.chips_hidden = [...h];
                  })}
              >
                <sn-icon icon=${on ? "check" : "close"} style="--icon-size:18px"></sn-icon>${t(ct.label)}
              </button>`;
            })}
          </div>`,
          entityField(c, t("power_entity"), s.power_entity, { domains: ["sensor"], deviceClasses: ["power"] }, (id) => set((d) => (d.settings.power_entity = id)), true),
          c.allows("tou")
            ? html`<div class="field">
                ${t("tou")} ${toggle(c, s.tou.enabled, (v) => set((d) => (d.settings.tou.enabled = v)))}
                ${s.tou.enabled
                  ? html`${row(
                      html`<span>🌙 ${t("tou_cheap")}</span>`,
                      html`<input type="time" style="width:auto" .value=${s.tou.cheap_from} @change=${(e: any) => set((d) => (d.settings.tou.cheap_from = e.target.value))} />`,
                      html`<span>←</span>`,
                      html`<input type="time" style="width:auto" .value=${s.tou.cheap_to} @change=${(e: any) => set((d) => (d.settings.tou.cheap_to = e.target.value))} />`
                    )}
                    ${row(
                      html`<span>⚡ ${t("tou_peak")}</span>`,
                      html`<input type="time" style="width:auto" .value=${s.tou.peak_from} @change=${(e: any) => set((d) => (d.settings.tou.peak_from = e.target.value))} />`,
                      html`<span>←</span>`,
                      html`<input type="time" style="width:auto" .value=${s.tou.peak_to} @change=${(e: any) => set((d) => (d.settings.tou.peak_to = e.target.value))} />`
                    )}`
                  : nothing}
              </div>`
            : nothing,
          c.allows("overload")
            ? html`<label class="field"
                >${t("power_limit")}
                <input type="number" min="0" step="100" class="ltr" .value=${String(s.power_limit ?? "")} placeholder="6000" @change=${(e: any) => set((d) => (d.settings.power_limit = Number(e.target.value) || undefined))} />
                <span class="hint">${t("power_limit_hint")}</span>
              </label>`
            : nothing
        ),
        c.allows("guests")
          ? section(
              t("guests_mode"),
              html`<label class="field">${t("guests_welcome")}<input type="text" .value=${s.guests.welcome ?? ""} placeholder=${t("welcome_default")} @change=${(e: any) => set((d) => (d.settings.guests.welcome = e.target.value.trim() || undefined))} /></label>`,
              html`<label class="field">${t("wifi_ssid")}<input type="text" class="ltr" .value=${s.guests.ssid ?? ""} @change=${(e: any) => set((d) => (d.settings.guests.ssid = e.target.value.trim() || undefined))} /></label>`,
              html`<label class="field">${t("wifi_password")}<input type="text" class="ltr" autocomplete="off" .value=${s.guests.password ?? ""} @change=${(e: any) => set((d) => (d.settings.guests.password = e.target.value || undefined))} /></label>`
            )
          : nothing,
        section(
          t("sound_motion"),
          c.allows("ui_sounds") ? html`<div class="field">${t("ui_sounds")} ${toggle(c, s.sounds, (v) => set((d) => (d.settings.sounds = v)))}</div>` : nothing,
          html`<div class="field">
            ${t("bell_tone")}
            <div class="seg">
              ${(["chime", "dingdong", "melody"] as const).map(
                (v) => html`<button
                  aria-pressed=${s.doorbell_tone === v}
                  @click=${() => {
                    set((d) => (d.settings.doorbell_tone = v));
                    import("./sounds").then((m) => m.playBell(v));
                  }}
                >
                  ${t(`bell_${v}` as I18nKey)}
                </button>`
              )}
            </div>
          </div>`,
          c.allows("motion_levels")
            ? html`<div class="field">
                ${t("motion")}
                <div class="seg">${(["full", "light", "off"] as const).map((v) => html`<button aria-pressed=${s.motion === v} @click=${() => set((d) => (d.settings.motion = v))}>${t(`motion_${v}` as I18nKey)}</button>`)}</div>
                <span class="hint">${t("motion_hint")}</span>
              </div>`
            : nothing,
          c.allows("high_contrast") ? html`<div class="field">${t("high_contrast")} ${toggle(c, !!s.contrast, (v) => set((d) => (d.settings.contrast = v)))}</div>` : nothing
        ),
        c.allows("travel") ? travelSettings(c, set) : nothing,
        c.allows("home_helpers") ? helpersSettings(c, set) : nothing,
        c.allows("support")
          ? section(
              t("installer"),
              html`<label class="field">${t("installer_name")}<input type="text" .value=${s.installer.name ?? ""} placeholder="SmartNest" @change=${(e: any) => set((d) => (d.settings.installer.name = e.target.value.trim() || undefined))} /></label>`,
              c.allows("white_label")
                ? html`<div class="field">
                    ${t("brand_logo")}
                    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
                      ${s.installer.brand?.logo ? html`<img src=${s.installer.brand.logo} alt="" style="height:40px;max-width:120px;object-fit:contain" />` : nothing}
                      <input
                        type="file"
                        accept="image/png,image/svg+xml,image/webp,image/jpeg"
                        style="flex:1"
                        @change=${async (e: any) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            const logo = await logoDataUrl(file);
                            set((d) => (d.settings.installer.brand = { ...(d.settings.installer.brand ?? {}), name: d.settings.installer.name, logo, v: -Date.now() }));
                          } catch {
                            c.toast(t("error"));
                          }
                        }}
                      />
                      ${s.installer.brand?.logo
                        ? html`<button class="btn pressable" @click=${() => set((d) => (d.settings.installer.brand = { ...d.settings.installer.brand, logo: null }))}>${t("delete")}</button>`
                        : nothing}
                    </div>
                    <span class="hint">${t("brand_hint")}</span>
                  </div>`
                : nothing,
              html`<label class="field"
                >${t("installer_phone")}<input type="tel" class="ltr" .value=${s.installer.phone ?? ""} placeholder="972501234567" @change=${(e: any) => set((d) => (d.settings.installer.phone = e.target.value.trim() || undefined))} />
                <span class="hint">${t("installer_phone_hint")}</span></label
              >`
            )
          : nothing,
        c.allows("alarm_screen")
          ? section(
              t("emergency"),
              html`<label class="field">${t("police_number")}<input type="tel" class="ltr" .value=${s.emergency.police} @change=${(e: any) => set((d) => (d.settings.emergency.police = e.target.value.trim()))} /></label>`,
              html`<label class="field"
                >${t("emergency_contacts")}
                <textarea
                  rows="3"
                  class="ltr"
                  placeholder="أبو محمد, 0501234567"
                  .value=${s.emergency.contacts.map((p) => `${p.name}, ${p.phone}`).join("\n")}
                  @change=${(e: any) =>
                    set(
                      (d) =>
                        (d.settings.emergency.contacts = String(e.target.value)
                          .split("\n")
                          .map((l) => l.split(","))
                          .filter((p) => p.length >= 2 && p[1].trim())
                          .map(([name, phone]) => ({ name: name.trim(), phone: phone.trim() }))
                          .slice(0, 4))
                    )}
                ></textarea>
                <span class="hint">${t("emergency_hint")}</span>
              </label>`
            )
          : nothing,
        section(
          t("weather"),
          entityField(c, t("weather_entity"), s.weather.entity, { domains: ["weather"] }, (id) => set((d) => (d.settings.weather.entity = id)), true),
          html`<div class="field">${t("weather_bg")} ${toggle(c, s.weather.background, (v) => set((d) => (d.settings.weather.background = v)))}</div>`
        ),
        tabletSection(c, set),
        section(
          t("doorbell"),
          entityField(c, t("doorbell_trigger"), s.doorbell.trigger_entity, { domains: ["event", "binary_sensor"] }, (id) =>
            set((d) => (d.settings.doorbell.trigger_entity = id)), true
          ),
          entityField(c, t("doorbell_camera"), s.doorbell.camera_entity, { domains: ["camera"] }, (id) =>
            set((d) => (d.settings.doorbell.camera_entity = id)), true
          ),
          entityField(c, t("doorbell_lock"), s.doorbell.lock_entity, { domains: ["lock"] }, (id) =>
            set((d) => (d.settings.doorbell.lock_entity = id)), true
          ),
          entityField(c, t("doorbell_speaker"), s.doorbell.speaker_entity, { domains: ["media_player"] }, (id) => set((d) => (d.settings.doorbell.speaker_entity = id)), true),
          numberField(t("keep_days"), s.doorbell.keep_days, 1, 30, (v) => set((d) => (d.settings.doorbell.keep_days = v))),
          html`<button class="btn pressable" style="justify-self:start" @click=${opts.testDoorbell}>
            <sn-icon icon="bell-ring" style="--icon-size:20px"></sn-icon>${t("doorbell_test")}
          </button>`
        ),
        section(
          t("kiosk"),
          html`<form
            class="field"
            @submit=${(e: SubmitEvent) => {
              e.preventDefault();
              const input = (e.currentTarget as HTMLFormElement).querySelector("input")!;
              const pin = input.value.trim();
              if (!/^\d{4,8}$/.test(pin)) return c.toast(t("kiosk_pin_invalid"));
              const salt = newSalt();
              set((d) => (d.settings.kiosk = { pin_hash: hashPin(pin, salt), pin_salt: salt, pin_length: pin.length }));
              input.value = "";
              c.toast(t("kiosk_pin_saved"));
            }}
          >
            ${t("kiosk_pin")}
            <div style="display:flex;gap:8px">
              <input type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" autocomplete="off" placeholder="••••" style="flex:1" />
              <button class="btn primary pressable" type="submit">${t(s.kiosk.pin_hash ? "kiosk_pin_change" : "kiosk_pin_set")}</button>
            </div>
            <span class="hint">${t("kiosk_pin_hint")}</span>
            <span class="hint">${t("kiosk_full_lock")}</span>
          </form>`,
          s.kiosk.pin_hash
            ? html`<button class="btn pressable" style="justify-self:start" @click=${() => set((d) => (d.settings.kiosk = {}))}>
                <sn-icon icon="lock-open" style="--icon-size:20px"></sn-icon>${t("kiosk_remove_pin")}
              </button>`
            : nothing
        ),
        c.allows("broadcast")
          ? section(
              t("speakers"),
              html`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">
                ${Object.keys(c.hass.states)
                  .filter((id) => id.startsWith("media_player."))
                  .map((id) => {
                    const on = s.speakers.includes(id);
                    return html`<button
                      class="btn pressable ${on ? "primary" : ""}"
                      style="justify-content:flex-start;font-weight:500"
                      @click=${() => set((d) => (d.settings.speakers = on ? d.settings.speakers.filter((x) => x !== id) : [...d.settings.speakers, id]))}
                    >
                      <sn-icon icon=${on ? "check" : "speaker"} style="--icon-size:18px"></sn-icon>${entityName(c.hass, c.config, id)}
                    </button>`;
                  })}
              </div>`
            )
          : nothing,
        c.allows("maintenance")
          ? section(
              t("maintenance"),
              ...s.maintenance.map(
                (m, i) => html`<div style="display:flex;gap:8px;align-items:center">
                  <span style="flex:1">${m.title}</span>
                  <span class="muted ltr" style="font-size:13px">${m.every_days}d</span>
                  <button class="btn pressable" style="min-height:34px;font-size:13px" @click=${() => set((d) => (d.settings.maintenance[i].last = new Date().toISOString()))}>
                    ${t("m_done")}
                  </button>
                  <button class="icon-btn small pressable" aria-label=${t("delete")} @click=${() => set((d) => d.settings.maintenance.splice(i, 1))}>
                    <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                  </button>
                </div>`
              ),
              html`<form
                style="display:flex;gap:8px;flex-wrap:wrap"
                @submit=${(e: SubmitEvent) => {
                  e.preventDefault();
                  const f = e.currentTarget as HTMLFormElement;
                  const title = (f.elements.namedItem("title") as HTMLInputElement).value.trim();
                  const every = Number((f.elements.namedItem("every") as HTMLInputElement).value) || 90;
                  if (!title) return;
                  set((d) => d.settings.maintenance.push({ id: uid(), title, every_days: every, last: new Date().toISOString() }));
                  f.reset();
                }}
              >
                <input name="title" type="text" placeholder=${t("m_title")} style="flex:2;min-width:160px" />
                <input name="every" type="number" min="1" placeholder=${t("m_every")} style="flex:1;min-width:90px" />
                <button class="btn primary pressable" type="submit">${t("add")}</button>
              </form>`
            )
          : nothing,
        section(
          t("transfer"),
          html`<div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn pressable" @click=${() => exportConfig(c.config)}><sn-icon icon="export" style="--icon-size:18px"></sn-icon>${t("export_config")}</button>
            <label class="btn pressable" style="cursor:pointer">
              <sn-icon icon="import" style="--icon-size:18px"></sn-icon>${t("import_config")}
              <input
                type="file"
                accept="application/json,.json"
                style="display:none"
                @change=${(e: any) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  if (file) importConfig(c, file);
                }}
              />
            </label>
          </div>`
        ),
        section(
          t("about"),
          html`<div style="display:flex;align-items:center;gap:14px">
            <img src="${c.assetBase}logo/smartnest-symbol-${c.dark ? "white" : "color"}.svg" alt="SmartNest" style="width:48px;height:48px" />
            <div style="display:grid;gap:2px">
              <strong>SmartNest</strong>
              <span class="muted" style="font-size:13px">${t("tagline")}</span>
              <span class="muted ltr" style="font-size:12px;font-family:'JetBrains Mono',monospace">${t("version")} ${opts.version}</span>
              ${opts.license?.licensee ? html`<span class="muted" style="font-size:12px">${t("licensed_to")} ${opts.license.licensee}</span>` : nothing}
              <button class="btn pressable" style="justify-self:start;min-height:34px;font-size:13px;margin-top:6px" @click=${() => rateSheet(c)}>
                <sn-icon icon="star" style="--icon-size:16px;color:var(--accent)"></sn-icon>${t("rate_service")}
              </button>
              ${opts.license
                ? html`<span class="muted" style="font-size:12px">
                    ${t("plan_label")}: <strong style="color:var(--accent-text)">${t(`plan_${opts.license.plan}` as I18nKey)}</strong>${opts.license.trial ? ` (${t("trial_label")})` : ""}
                    ${opts.license.expires ? html` · ${t("expires_on")} ${new Date(opts.license.expires * 1000).toLocaleDateString()}` : nothing}
                    ${opts.license.reseller ? html` · ${t("via")} ${opts.license.reseller}` : nothing}
                  </span>
                  ${opts.checkLicense
                    ? html`<button
                        class="btn pressable"
                        style="justify-self:start;min-height:34px;font-size:13px"
                        @click=${async (e: Event) => {
                          const btn = e.currentTarget as HTMLButtonElement;
                          btn.disabled = true;
                          const note = await opts.checkLicense!().catch(() => t("error"));
                          btn.disabled = false;
                          c.toast(note);
                          c.closeSheet();
                        }}
                      >
                        <sn-icon icon="refresh" style="--icon-size:16px"></sn-icon>${t("lic_check")}
                      </button>`
                    : nothing}`
                : nothing}
            </div>
          </div>`
        )
      );
    },
  });
}

function tabletSection(c: Ctx, set: (fn: (d: DashboardConfig) => void) => void) {
  const t = c.t;
  const f = c.config.settings.fully;
  const tablets = findTablets(c.hass);
  if (!tablets.length) return section(t("tablet"), html`<p class="muted" style="margin:0;font-size:14px">${t("tablet_none")}</p>`);
  const here = thisTablet(c.hass);
  return section(
    t("tablet"),
    html`<p class="muted" style="margin:0;font-size:14px">
      ${t("tablet_found", { names: tablets.map((x) => x.name).join(c.lang === "ar" ? "، " : ", ") })} ·
      ${here ? html`<strong style="color:var(--success)">✓ ${t("tablet_this")}</strong>` : t("tablet_not_this")}
    </p>`,
    !window.fully ? html`<p class="muted" style="margin:0;font-size:13px">${t("tablet_js_hint")}</p>` : nothing,
    html`<div class="field">${t("night_dim")} ${toggle(c, f.night_dim, (v) => set((d) => (d.settings.fully.night_dim = v)))}</div>`,
    f.night_dim
      ? html`${numberField(t("night_brightness"), f.night_brightness, 1, 100, (v) => set((d) => (d.settings.fully.night_brightness = v)))}
        ${numberField(t("night_off"), f.night_off_min, 0, 240, (v) => set((d) => (d.settings.fully.night_off_min = v)))}`
      : nothing,
    html`<div class="field">
      ${t("motion_wake")} ${toggle(c, f.motion_wake, (v) => set((d) => (d.settings.fully.motion_wake = v)))}
      <span class="hint">${t("motion_wake_hint")}</span>
    </div>`
  );
}

/** Travel mode: what it shuts, which lights it plays with, and where the evening report goes. */
function travelSettings(c: Ctx, set: (fn: (d: DashboardConfig) => void) => void) {
  const { t, hass, config } = c;
  const s = config.settings.travel;
  const ids = dashboardEntities(config).filter((id) => hass.states[id]);
  const offCands = ids.filter((id) => ["switch", "valve", "water_heater", "climate", "media_player", "fan", "humidifier"].includes(domainOf(id)));
  const lightCands = ids.filter((id) => domainOf(id) === "light");
  const notify = Object.keys((hass as any).services?.notify ?? {})
    .filter((n) => n !== "send_message" && n !== "persistent_notification")
    .map((n) => `notify.${n}`);
  const pickList = (list: string[], chosen: string[], key: "off" | "lights") => html`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px">
    ${list.map((id) => {
      const on = chosen.includes(id);
      return html`<button
        class="btn pressable ${on ? "primary" : ""}"
        style="justify-content:flex-start;font-weight:500"
        aria-pressed=${on}
        @click=${() => set((d) => (d.settings.travel[key] = on ? d.settings.travel[key].filter((x) => x !== id) : [...d.settings.travel[key], id]))}
      >
        <sn-icon icon=${on ? "check" : "close"} style="--icon-size:18px"></sn-icon>${entityName(hass, config, id)}
      </button>`;
    })}
  </div>`;
  return section(
    t("travel"),
    html`<span class="field">${t("travel_off_pick")}</span>`,
    pickList(offCands, s.off, "off"),
    html`<div class="field">${t("travel_sim")} ${toggle(c, s.simulate, (v) => set((d) => (d.settings.travel.simulate = v)))}</div>`,
    s.simulate ? pickList(lightCands, s.lights, "lights") : nothing,
    html`<div class="field">${t("travel_arm")} ${toggle(c, s.arm, (v) => set((d) => (d.settings.travel.arm = v)))}</div>`,
    html`<label class="field"
      >${t("travel_report")}
      <select @change=${(e: any) => set((d) => (d.settings.travel.notify = e.target.value || undefined))}>
        <option value="" ?selected=${!s.notify}>–</option>
        ${notify.map((n) => html`<option value=${n} ?selected=${s.notify === n}>${n}</option>`)}
      </select>
    </label>`
  );
}

/** Pick several devices: a grid of toggles. */
function pickMany(c: Ctx, list: string[], chosen: string[], onToggle: (id: string, on: boolean) => void) {
  if (!list.length) return html`<span class="muted" style="font-size:13px">${c.t("no_entities")}</span>`;
  return html`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px">
    ${list.map((id) => {
      const on = chosen.includes(id);
      return html`<button class="btn pressable ${on ? "primary" : ""}" style="justify-content:flex-start;font-weight:500" aria-pressed=${on} @click=${() => onToggle(id, !on)}>
        <sn-icon icon=${on ? "check" : "close"} style="--icon-size:18px"></sn-icon>${entityName(c.hass, c.config, id)}
      </button>`;
    })}
  </div>`;
}

const toggled = (list: string[], id: string, on: boolean) => (on ? [...new Set([...list, id])] : list.filter((x) => x !== id));

/** The ready-made helpers that run on the hub: appliance finished, night path, arrival, power cut. */
function helpersSettings(c: Ctx, set: (fn: (d: DashboardConfig) => void) => void) {
  const { t, hass, config } = c;
  const s = config.settings;
  const all = Object.values(hass.states);
  const ids = (domain: string, cls?: string[]) =>
    all.filter((e) => e.entity_id.startsWith(`${domain}.`) && (!cls || cls.includes(e.attributes.device_class))).map((e) => e.entity_id);
  const power = ids("sensor", ["power"]).sort((a, b) => Number(/wash|dry|dish|غسال|نشاف|جلاي/i.test(entityName(hass, config, b) + b)) - Number(/wash|dry|dish|غسال|نشاف|جلاي/i.test(entityName(hass, config, a) + a)));
  const proximity = all.filter((e) => e.entity_id.endsWith("_direction_of_travel")).length;
  const sub = (title: string, hint: I18nKey, ...items: unknown[]) => html`<div style="display:grid;gap:8px;padding:12px;border-radius:var(--r-md);background:var(--surface-2)">
    <b>${title}</b><span class="muted" style="font-size:13px">${t(hint)}</span>${items}
  </div>`;
  return section(
    t("helpers"),
    sub(
      t("h_appliances"),
      "h_appliances_hint",
      pickMany(
        c,
        power.slice(0, 24),
        s.appliances.map((a) => a.power),
        (id, on) =>
          set((d) => {
            d.settings.appliances = on
              ? [...d.settings.appliances, { power: id, name: entityName(hass, config, id).replace(/\s*(power|استهلاك|consumption)\s*/gi, " ").trim() }]
              : d.settings.appliances.filter((a) => a.power !== id);
          })
      )
    ),
    sub(
      t("h_night_path"),
      "h_night_path_hint",
      pickMany(c, ids("binary_sensor", ["motion", "occupancy", "presence"]), s.night_path.motion, (id, on) => set((d) => (d.settings.night_path.motion = toggled(d.settings.night_path.motion, id, on)))),
      pickMany(c, ids("light"), s.night_path.lights, (id, on) => set((d) => (d.settings.night_path.lights = toggled(d.settings.night_path.lights, id, on)))),
      row(
        html`<span>${t("from")}</span>`,
        html`<input type="time" style="width:auto" .value=${s.night_path.from} @change=${(e: any) => set((d) => (d.settings.night_path.from = e.target.value))} />`,
        html`<span>${t("to")}</span>`,
        html`<input type="time" style="width:auto" .value=${s.night_path.to} @change=${(e: any) => set((d) => (d.settings.night_path.to = e.target.value))} />`,
        html`<span>${t("brightness")}</span>`,
        html`<input type="number" min="1" max="100" style="width:80px" .value=${String(s.night_path.brightness)} @change=${(e: any) => set((d) => (d.settings.night_path.brightness = Number(e.target.value) || 10))} />`
      )
    ),
    sub(
      t("h_arrival"),
      proximity ? "h_arrival_hint" : "h_arrival_missing",
      pickMany(c, ids("climate"), s.arrival.climate, (id, on) => set((d) => (d.settings.arrival.climate = toggled(d.settings.arrival.climate, id, on)))),
      pickMany(c, ids("light"), s.arrival.lights, (id, on) => set((d) => (d.settings.arrival.lights = toggled(d.settings.arrival.lights, id, on)))),
      row(
        html`<span>${t("h_arrival_km")}</span>`,
        html`<input type="number" min="1" max="50" style="width:80px" .value=${String(s.arrival.km)} @change=${(e: any) => set((d) => (d.settings.arrival.km = Number(e.target.value) || 5))} />`
      )
    ),
    sub(
      t("h_outage"),
      "h_outage_hint",
      entityField(c, t("h_outage_sensor"), s.outage.sensor, { domains: ["binary_sensor", "sensor"] }, (id) => set((d) => (d.settings.outage.sensor = id)), true),
      pickMany(
        c,
        [...ids("switch"), ...ids("climate"), ...ids("water_heater")].filter((id) => !hass.entities?.[id]?.entity_category),
        s.outage.shed,
        (id, on) => set((d) => (d.settings.outage.shed = toggled(d.settings.outage.shed, id, on)))
      )
    )
  );
}

/** Who sees a page: every Home Assistant user as a chip; none chosen means everyone. */
@customElement("sn-page-users")
export class SnPageUsers extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) page!: Page;
  @property({ attribute: false }) onChange!: (ids: string[]) => void;
  @state() private users?: { id: string; name: string; system_generated: boolean; is_active: boolean }[];

  static styles = [shared];

  async connectedCallback() {
    super.connectedCallback();
    this.users = await this.ctx.hass
      .callWS<{ id: string; name: string; system_generated: boolean; is_active: boolean }[]>({ type: "config/auth/list" })
      .then((u) => u.filter((x) => !x.system_generated && x.is_active), () => []);
  }

  render() {
    const { t } = this.ctx;
    const chosen = this.page.users ?? [];
    if (!this.users?.length) return nothing;
    return html`<div class="field">
      ${t("page_users")}
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${this.users.map((u) => {
          const on = chosen.includes(u.id);
          return html`<button
            class="btn pressable ${on ? "primary" : ""}"
            style="min-height:36px;font-size:14px"
            @click=${() => this.onChange(on ? chosen.filter((x) => x !== u.id) : [...chosen, u.id])}
          >
            ${u.name}
          </button>`;
        })}
      </div>
      <span class="hint">${t(chosen.length ? "page_users_some" : "page_users_all")}</span>
    </div>`;
  }
}
