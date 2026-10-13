import { html, nothing, type TemplateResult } from "lit";
import type { Ctx } from "./ctx";
import type { DashboardConfig, Lang, ThemeMode, Widget, WidgetType } from "./types";
import { entityIcon, entityName, type EntityFilter } from "./entities";
import { DEFAULT_ACCENT, TEMPLATES, WIDGET_SIZES, findWidget, newFloor, newWidget, nextRow, pageFromTemplate, resolveLayout } from "./config";
import { LANGS, type I18nKey } from "./i18n";
import { PAGE_ICONS } from "./icons";
import { hashPin, newSalt } from "./kiosk";
import "./ui/entity-picker";
import "./ui/icon";

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
};

function editWidget(ctx: Ctx, widgetId: string, fn: (w: Widget, d: DashboardConfig) => void) {
  ctx.update((d) => {
    const w = findWidget(d, widgetId);
    if (w) fn(w, d);
  });
}

export function widgetSettingsSheet(ctx: Ctx, _pageId: string, widgetId: string) {
  ctx.showSheet({
    title: ctx.t("widget_settings"),
    render: (c) => {
      const w = findWidget(c.config, widgetId);
      if (!w) return html``;
      const t = c.t;
      switch (w.type) {
        case "tile":
        case "camera":
          return col(
            entityField(c, t("entity"), w.config.entity, ENTITY_FILTERS[w.type] ?? {}, (id) =>
              editWidget(c, widgetId, (x) => (x.config.entity = id))
            ),
            w.config.entity ? nameField(c, w.config.entity) : nothing
          );
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
            html`<p class="muted" style="margin:0;font-size:14px">${t("drag_hint")}</p>`
          );
        default:
          return html`<p class="muted">${t(`widget_${w.type}` as I18nKey)}</p>`;
      }
    },
  });
}

const WIDGET_CHOICES: { type: WidgetType; icon: string }[] = [
  { type: "tile", icon: "lightbulb" },
  { type: "floorplan", icon: "layers" },
  { type: "camera", icon: "cctv" },
  { type: "clock", icon: "clock-outline" },
  { type: "heading", icon: "title" },
];

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
    title: ctx.t("add_widget"),
    render: (c) => html`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px">
      ${WIDGET_CHOICES.map(
        (choice) => html`<button
          class="glass pressable"
          style="display:grid;gap:10px;justify-items:center;padding:20px 12px;border-radius:var(--r-md);font-weight:500"
          @click=${() => {
            if (choice.type === "tile" || choice.type === "camera") {
              c.showSheet({
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
          <span style="display:grid;place-items:center;width:52px;height:52px;border-radius:999px;background:var(--accent);color:var(--on-accent)">
            <sn-icon .icon=${choice.icon}></sn-icon>
          </span>
          ${c.t(`widget_${choice.type}` as I18nKey)}
          <span class="muted ltr" style="font-size:12px">${WIDGET_SIZES[choice.type].w}×${WIDGET_SIZES[choice.type].h}</span>
        </button>`
      )}
    </div>`,
  });
}

export function addPageSheet(ctx: Ctx, onCreated: (pageId: string) => void) {
  ctx.showSheet({
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

const ACCENTS = [DEFAULT_ACCENT, "#18BCF2", "#2FB57A", "#F26B68", "#A78BFA", "#F5BE6A"];
const THEMES: { id: ThemeMode; label: I18nKey }[] = [
  { id: "schedule", label: "theme_schedule" },
  { id: "auto", label: "theme_auto" },
  { id: "light", label: "theme_light" },
  { id: "dark", label: "theme_dark" },
];

export function settingsSheet(ctx: Ctx, opts: { version: string; testDoorbell: () => void }) {
  ctx.showSheet({
    title: ctx.t("settings"),
    render: (c) => {
      const s = c.config.settings;
      const t = c.t;
      const set = (fn: (d: DashboardConfig) => void) => c.update(fn);
      return col(
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
                )}`
            : nothing
        ),
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
        section(
          t("about"),
          html`<div style="display:flex;align-items:center;gap:14px">
            <img src="${c.assetBase}logo/smartnest-symbol-${c.dark ? "white" : "color"}.svg" alt="SmartNest" style="width:48px;height:48px" />
            <div style="display:grid;gap:2px">
              <strong>SmartNest</strong>
              <span class="muted" style="font-size:13px">${t("tagline")}</span>
              <span class="muted ltr" style="font-size:12px;font-family:'JetBrains Mono',monospace">${t("version")} ${opts.version}</span>
            </div>
          </div>`
        )
      );
    },
  });
}
