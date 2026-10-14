// Builds the dashboard from what Home Assistant already knows: areas, devices, and which entities matter.
import type { Floor, Hass, HassEntity, Marker, Widget } from "./types";
import { domainOf } from "./entities";
import { inside, type Pt } from "./geometry";
import { uid } from "./config";

const SENSOR_CLASSES = ["temperature", "humidity", "power", "carbon_dioxide"];
const BINARY_CLASSES = ["door", "window", "opening", "garage_door", "motion", "occupancy", "moisture", "smoke", "gas"];
const DOMAINS = ["light", "switch", "fan", "climate", "cover", "lock", "media_player", "vacuum", "camera", "alarm_control_panel", "sensor", "binary_sensor", "humidifier", "siren"];

// Order inside a room: what people touch most comes first.
const RANK: Record<string, number> = {
  light: 0, climate: 1, cover: 2, fan: 3, switch: 4, media_player: 5, lock: 6, vacuum: 7, alarm_control_panel: 8, binary_sensor: 9, sensor: 10, camera: 11,
};

/** The area an entity sits in: its own, or its device's. */
export function areaOf(hass: Hass, id: string): string | undefined {
  const reg = hass.entities?.[id];
  if (reg?.area_id) return reg.area_id;
  const dev = reg?.device_id ? hass.devices?.[reg.device_id] : undefined;
  return dev?.area_id ?? undefined;
}

/** Entities a family would want on a dashboard: no diagnostics, no config switches, no hidden ones, no noisy sensors. */
export function usefulEntities(hass: Hass): HassEntity[] {
  return Object.values(hass.states).filter((e) => {
    const id = e.entity_id;
    const d = domainOf(id);
    if (!DOMAINS.includes(d)) return false;
    const reg = hass.entities?.[id];
    if (reg?.entity_category || reg?.hidden) return false;
    if (reg?.platform === "fully_kiosk" || reg?.platform === "smartnest") return false;
    if (e.state === "unavailable" && !reg) return false;
    if (d === "sensor") return SENSOR_CLASSES.includes(e.attributes.device_class);
    if (d === "binary_sensor") return BINARY_CLASSES.includes(e.attributes.device_class);
    return true;
  });
}

const byRank = (a: HassEntity, b: HassEntity) =>
  (RANK[domainOf(a.entity_id)] ?? 20) - (RANK[domainOf(b.entity_id)] ?? 20) || a.entity_id.localeCompare(b.entity_id);

/** Devices grouped by HA area (sorted by area name), plus the ones with no area. */
export function devicesByArea(hass: Hass): { areaId?: string; name?: string; ids: string[] }[] {
  const groups = new Map<string | undefined, HassEntity[]>();
  for (const e of usefulEntities(hass)) {
    const a = areaOf(hass, e.entity_id);
    groups.set(a, [...(groups.get(a) ?? []), e]);
  }
  return [...groups.entries()]
    .map(([areaId, list]) => ({ areaId, name: areaId ? hass.areas?.[areaId]?.name ?? areaId : undefined, ids: list.sort(byRank).map((e) => e.entity_id) }))
    .sort((a, b) => (a.areaId ? 0 : 1) - (b.areaId ? 0 : 1) || (a.name ?? "").localeCompare(b.name ?? ""));
}

/**
 * One "Rooms" page: a heading per area, then its devices as tiles (cameras as camera cards).
 * Rows are laid left to right in a 12-column grid.
 */
export function roomsWidgets(hass: Hass, otherLabel: string): Widget[] {
  const out: Widget[] = [];
  let y = 0;
  for (const g of devicesByArea(hass)) {
    if (!g.ids.length) continue;
    out.push({ id: uid(), type: "heading", x: 0, y, w: 12, h: 1, config: { text: g.name ?? otherLabel } });
    y += 1;
    const cams = g.ids.filter((id) => domainOf(id) === "camera");
    const tiles = g.ids.filter((id) => domainOf(id) !== "camera");
    let x = 0;
    for (const entity of tiles) {
      if (x + 3 > 12) {
        x = 0;
        y += 2;
      }
      out.push({ id: uid(), type: "tile", x, y, w: 3, h: 2, config: { entity } });
      x += 3;
    }
    if (tiles.length) y += 2;
    x = 0;
    for (const entity of cams) {
      if (x + 6 > 12) {
        x = 0;
        y += 5;
      }
      out.push({ id: uid(), type: "camera", x, y, w: 6, h: 5, config: { entity } });
      x += 6;
    }
    if (cams.length) y += 5;
  }
  return out;
}

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

/** Evenly spread points inside a room outline (a grid over its bounding box, keeping the ones inside). */
function spots(points: Pt[], n: number): Pt[] {
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  for (let k = Math.ceil(Math.sqrt(n)); k < 12; k++) {
    const found: Pt[] = [];
    for (let r = 0; r < k; r++)
      for (let c = 0; c < k; c++) {
        const p: Pt = [x0 + ((c + 0.5) / k) * (x1 - x0), y0 + ((r + 0.5) / k) * (y1 - y0)];
        if (inside(p, points)) found.push([Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10]);
      }
    if (found.length >= n) return found.slice(0, n);
  }
  return [];
}

/**
 * Puts each area's devices inside the drawn room with the same name (as HA). Devices already on the plan are
 * left where they are. Returns the new markers.
 */
export function autoPlace(hass: Hass, floor: Floor): Marker[] {
  const already = new Set(floor.markers.map((m) => m.entity));
  const added: Marker[] = [];
  for (const g of devicesByArea(hass)) {
    if (!g.name) continue;
    const room = floor.rooms?.find((r) => norm(r.name) === norm(g.name!));
    if (!room) continue;
    // Cameras live on the camera pages; the plan gets what you tap or read.
    const ids = g.ids.filter((id) => !already.has(id) && domainOf(id) !== "camera").slice(0, 9);
    const places = spots(room.points, ids.length);
    ids.forEach((entity, i) => {
      if (!places[i]) return;
      const d = domainOf(entity);
      added.push({ id: uid(), entity, x: places[i][0], y: places[i][1], display: d === "sensor" || d === "climate" ? "value" : "icon" });
    });
  }
  return added;
}
