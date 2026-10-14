import type { DashboardConfig, Floor, Hass, Lang, Page, Settings, Widget, WidgetType } from "./types";
import { domainOf, listEntities } from "./entities";
import type { I18nKey, Translate } from "./i18n";
import { roomsWidgets } from "./autofill";

export const COLS = 12;
export const DEFAULT_ACCENT = "#E9971D";

// crypto.randomUUID is missing on plain-http origins, which is how most homes reach HA on the LAN.
export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

export const WIDGET_SIZES: Record<WidgetType, { w: number; h: number; minW: number; minH: number }> = {
  floorplan: { w: 12, h: 10, minW: 4, minH: 4 },
  tile: { w: 3, h: 2, minW: 2, minH: 2 },
  camera: { w: 6, h: 5, minW: 3, minH: 3 },
  heading: { w: 12, h: 1, minW: 2, minH: 1 },
  clock: { w: 4, h: 3, minW: 3, minH: 2 },
  modes: { w: 12, h: 2, minW: 4, minH: 2 },
  vacuum: { w: 12, h: 9, minW: 6, minH: 6 },
  visitors: { w: 12, h: 4, minW: 4, minH: 3 },
  energy: { w: 6, h: 7, minW: 4, minH: 5 },
  energy_stats: { w: 6, h: 8, minW: 4, minH: 6 },
  panic: { w: 3, h: 3, minW: 2, minH: 2 },
  check: { w: 6, h: 6, minW: 4, minH: 4 },
  family: { w: 6, h: 3, minW: 3, minH: 2 },
  todo: { w: 4, h: 7, minW: 3, minH: 4 },
  calendar: { w: 4, h: 7, minW: 3, minH: 4 },
  forecast: { w: 6, h: 4, minW: 4, minH: 3 },
  countdown: { w: 4, h: 4, minW: 3, minH: 3 },
  gauge: { w: 3, h: 4, minW: 2, minH: 3 },
  gate: { w: 6, h: 6, minW: 4, minH: 4 },
  frigate: { w: 12, h: 5, minW: 4, minH: 4 },
  schedule: { w: 12, h: 6, minW: 6, minH: 4 },
  media: { w: 6, h: 5, minW: 4, minH: 4 },
  remote: { w: 4, h: 8, minW: 3, minH: 6 },
  water: { w: 6, h: 5, minW: 4, minH: 4 },
  consumers: { w: 6, h: 5, minW: 4, minH: 4 },
};

export function defaultSettings(lang: Lang): Settings {
  return {
    home_name: "",
    language: lang,
    accent: DEFAULT_ACCENT,
    theme: "schedule",
    dark_from: "19:00",
    dark_to: "06:30",
    default_page: "",
    screensaver: { enabled: true, timeout_min: 5, photos: true, photo_folder: "smartnest-photos", photo_seconds: 20, style: "classic" },
    glass: "classic",
    guests: {},
    weather: { entity: "weather.forecast_home", background: true },
    fully: { night_dim: true, night_brightness: 20, night_off_min: 15, motion_wake: false },
    doorbell: { keep_days: 7 },
    kiosk: {},
    greeting_name: "",
    prayer: true,
    morning: true,
    night_plan: true,
    season: "auto",
    speakers: [],
    maintenance: [],
    setup_done: true,
    chips_hidden: [],
  };
}

export function newFloor(name: string): Floor {
  return { id: uid(), name, markers: [] };
}

export function newWidget(type: WidgetType, config: Record<string, any> = {}, pos: Partial<Widget> = {}): Widget {
  const { w, h } = WIDGET_SIZES[type];
  return { id: uid(), type, x: 0, y: 0, w, h, config, ...pos };
}

/** Bottom of the layout, where a newly added widget goes. */
export function nextRow(widgets: Widget[]) {
  return widgets.reduce((m, w) => Math.max(m, w.y + w.h), 0);
}

const overlaps = (a: Widget, b: Widget) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

/**
 * Pushes widgets down until nothing overlaps, then floats everything up to close gaps.
 * `pinnedId` is the widget the user is dragging; it keeps its spot and the others make room.
 */
export function resolveLayout(widgets: Widget[], pinnedId?: string): Widget[] {
  const items = widgets.map((w) => {
    const c = { ...w };
    c.w = Math.min(Math.max(c.w, 1), COLS);
    c.x = Math.min(Math.max(c.x, 0), COLS - c.w);
    c.y = Math.max(c.y, 0);
    return c;
  });
  const pinned = items.find((w) => w.id === pinnedId);
  const placed: Widget[] = pinned ? [pinned] : [];
  for (const w of items.filter((w) => w !== pinned).sort((a, b) => a.y - b.y || a.x - b.x)) {
    while (placed.some((p) => overlaps(p, w))) w.y++;
    placed.push(w);
  }
  const out: Widget[] = [];
  for (const w of placed.sort((a, b) => a.y - b.y || a.x - b.x)) {
    while (w.y > 0 && !out.some((p) => overlaps(p, { ...w, y: w.y - 1 }))) w.y--;
    out.push(w);
  }
  return out;
}

/** Lays widgets left to right in rows, wrapping at COLS. */
function flow(widgets: Widget[], startY = 0): Widget[] {
  let x = 0;
  let y = startY;
  let rowH = 0;
  return widgets.map((w) => {
    if (x + w.w > COLS) {
      x = 0;
      y += rowH;
      rowH = 0;
    }
    const placed = { ...w, x, y };
    x += w.w;
    rowH = Math.max(rowH, w.h);
    return placed;
  });
}

export type TemplateId = "blank" | "home" | "rooms" | "power" | "security" | "doorbell" | "climate" | "robot" | "water";

export const TEMPLATES: { id: TemplateId; icon: string; label: I18nKey }[] = [
  { id: "blank", icon: "dashboard", label: "template_blank" },
  { id: "home", icon: "home", label: "template_home" },
  { id: "rooms", icon: "sofa", label: "template_rooms" },
  { id: "power", icon: "lightning-bolt", label: "template_power" },
  { id: "security", icon: "shield-home", label: "template_security" },
  { id: "doorbell", icon: "doorbell", label: "template_doorbell" },
  { id: "climate", icon: "air-conditioner", label: "template_climate" },
  { id: "robot", icon: "robot-vacuum", label: "template_robot" },
  { id: "water", icon: "water", label: "template_water" },
];

/** Builds a page pre-filled with the client's matching devices, so a new install starts useful. */
export function pageFromTemplate(id: TemplateId, hass: Hass, config: DashboardConfig, t: Translate): Page {
  const tpl = TEMPLATES.find((x) => x.id === id)!;
  // Skip technical entities (diagnostics, config switches, hidden ones): they're not for the family.
  const ents = (domains: string[], classes?: string[], limit = 8) =>
    listEntities(hass, config, { domains, deviceClasses: classes })
      .filter((e) => !hass.entities?.[e.id]?.entity_category && !hass.entities?.[e.id]?.hidden)
      .slice(0, limit)
      .map((e) => e.id);
  const tiles = (ids: string[]) => ids.map((entity) => newWidget("tile", { entity }));
  const cams = (ids: string[], w = 6, h = 5) => ids.map((entity) => newWidget("camera", { entity }, { w, h }));
  let widgets: Widget[] = [];
  switch (id) {
    case "home":
      widgets = [
        ...(hass.states["script.smartnest_mode_away"] ? [newWidget("modes")] : []),
        newWidget("floorplan", { floors: [newFloor(t("floor_default"))] }, { y: 2 }),
      ];
      break;
    case "power":
      widgets = flow([
        ...(Object.keys(hass.states).some((id) => /solar|pv/.test(id)) ? [newWidget("energy")] : []),
        ...(Object.values(hass.states).some((e) => e.attributes.device_class === "power") ? [newWidget("consumers")] : []),
        ...tiles(ents(["sensor"], ["power", "energy"])),
        ...tiles(ents(["switch"], undefined, 8)),
      ]);
      break;
    case "security":
      widgets = flow([
        ...cams(ents(["camera"], undefined, 4)),
        ...tiles(ents(["lock"])),
        ...tiles(ents(["binary_sensor"], ["door", "window", "opening", "motion", "occupancy", "smoke", "moisture"])),
      ]);
      break;
    case "doorbell": {
      const cam = config.settings.doorbell.camera_entity ?? ents(["camera"], undefined, 1)[0];
      const lock = config.settings.doorbell.lock_entity ?? ents(["lock"], undefined, 1)[0];
      const bell = ents(["event"], ["doorbell"], 1);
      widgets = flow([
        ...(cam ? cams([cam], 8, 7) : []),
        ...tiles([lock, ...bell].filter(Boolean)).map((w) => ({ ...w, w: 4 })),
        newWidget("visitors"),
      ]);
      break;
    }
    case "rooms":
      widgets = roomsWidgets(hass, t("other_devices"));
      break;
    case "water":
      widgets = flow([newWidget("water"), ...tiles(ents(["binary_sensor"], ["moisture"])), ...tiles(ents(["valve"]))]);
      break;
    case "robot":
      widgets = ents(["vacuum"], undefined, 2).map((entity, i) => newWidget("vacuum", { entity }, { y: i * 9 }));
      break;
    case "climate":
      widgets = flow([...tiles(ents(["climate"])), ...tiles(ents(["sensor"], ["temperature", "humidity"]))]);
      break;
  }
  return { id: uid(), title: id === "blank" ? t("untitled") : t(tpl.label), icon: tpl.icon, widgets: id === "rooms" ? widgets : resolveLayout(widgets) };
}

export function defaultConfig(hass: Hass, t: Translate, lang: Lang): DashboardConfig {
  const config: DashboardConfig = { version: 1, settings: defaultSettings(lang), names: {}, pages: [] };
  const hasCameras = Object.keys(hass.states).some((id) => domainOf(id) === "camera");
  const ids: TemplateId[] = hasCameras ? ["home", "rooms", "power", "security", "doorbell"] : ["home", "rooms", "power", "climate"];
  config.pages = ids.map((id) => pageFromTemplate(id, hass, config, t));
  config.settings.default_page = config.pages[0].id;
  return config;
}

/** Fills in anything an older saved config is missing. */
export function normalizeConfig(raw: any, fallbackLang: Lang): DashboardConfig {
  const base = defaultSettings(fallbackLang);
  const settings = { ...base, ...(raw?.settings ?? {}) };
  settings.screensaver = { ...base.screensaver, ...(raw?.settings?.screensaver ?? {}) };
  settings.doorbell = { ...base.doorbell, ...(raw?.settings?.doorbell ?? {}) };
  settings.chips_hidden = Array.isArray(raw?.settings?.chips_hidden) ? raw.settings.chips_hidden : [];
  settings.speakers = Array.isArray(raw?.settings?.speakers) ? raw.settings.speakers : [];
  settings.maintenance = Array.isArray(raw?.settings?.maintenance) ? raw.settings.maintenance : [];
  settings.kiosk = { ...(raw?.settings?.kiosk ?? {}) };
  settings.weather = { ...base.weather, ...(raw?.settings?.weather ?? {}) };
  settings.guests = { ...(raw?.settings?.guests ?? {}) };
  settings.fully = { ...base.fully, ...(raw?.settings?.fully ?? {}) };
  return { version: 1, settings, names: { ...(raw?.names ?? {}) }, pages: Array.isArray(raw?.pages) ? raw.pages : [] };
}

// ---- Backend (custom integration) ----

export async function loadConfig(hass: Hass): Promise<any | null> {
  const res = await hass.callWS<{ config: any | null }>({ type: "smartnest/config/get" });
  return res.config;
}

export async function saveConfig(hass: Hass, config: DashboardConfig): Promise<void> {
  await hass.callWS({ type: "smartnest/config/save", config });
}

export function subscribeConfig(hass: Hass, cb: (config: any) => void) {
  return hass.connection.subscribeMessage<{ config: any }>((msg) => cb(msg.config), { type: "smartnest/config/subscribe" });
}

export async function uploadImage(hass: Hass, file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await hass.fetchWithAuth("/api/smartnest/upload", { method: "POST", body });
  if (!res.ok) throw new Error(`upload ${res.status}`);
  const json = await res.json();
  return json.url as string;
}

export function findWidget(config: DashboardConfig, widgetId: string): Widget | undefined {
  for (const p of config.pages) {
    const w = p.widgets.find((x) => x.id === widgetId);
    if (w) return w;
  }
  return undefined;
}
