import type { DashboardConfig, Floor, Hass, Lang, Widget } from "./types";
import { normalizeConfig } from "./config";

/** The look a design brings along; everything else (devices, people, security, the installer's phone…) stays this house's. */
const STYLE_KEYS = ["style", "material", "accent", "nav", "font", "icons", "active_glow", "aurora", "accent_day", "page_moods", "season_skin", "motion", "glass", "theme"] as const;

/**
 * Puts a design the installer sent onto this house. Pages and layout come from the design; devices are matched by
 * their id here (a living_room light is light.living_room in most houses), and cards for devices this house doesn't
 * have are left out. The plan already drawn here stays. Returns the new config and how many cards were left out.
 */
export function applyDesign(current: DashboardConfig, incoming: unknown, hass: Hass, lang: Lang): { config: DashboardConfig; dropped: number } {
  const d = normalizeConfig(incoming, lang);
  const has = (id?: string) => !!id && !!hass.states[id];
  let dropped = 0;
  const myFloors: Floor[] | undefined = current.pages
    .flatMap((p) => p.widgets)
    .find((w) => w.type === "floorplan" && w.config.floors?.some((f: Floor) => f.image))?.config.floors;
  const keep = (w: Widget): boolean => {
    const c = w.config;
    if (w.type === "floorplan") {
      // Another house's plan picture doesn't exist here: this house's own plan takes its place.
      c.floors = myFloors ?? [];
      return true;
    }
    if (c.entity && !has(c.entity)) {
      dropped++;
      return false;
    }
    if (Array.isArray(c.entities)) c.entities = c.entities.filter(has);
    if (c.camera && !has(c.camera)) delete c.camera;
    return true;
  };
  const pages = d.pages.map((p) => ({ ...p, widgets: p.widgets.filter(keep), person: p.person && has(p.person) ? p.person : undefined }));
  const settings = { ...current.settings };
  for (const k of STYLE_KEYS) if ((d.settings as any)[k] !== undefined) (settings as any)[k] = (d.settings as any)[k];
  return { config: { ...current, pages, settings, names: { ...d.names, ...current.names } }, dropped };
}
