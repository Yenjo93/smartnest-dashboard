// A fake Home Assistant for local development: devices, services, the SmartNest WebSocket API and uploads.
// Nothing here ships to clients; the build only bundles src/.
import type { Hass, HassDevice, HassEntity } from "../src/types";
import { hsToRgb } from "../src/color";

const now = () => new Date().toISOString();
const ent = (entity_id: string, state: string, attributes: Record<string, any>): HassEntity => ({
  entity_id,
  state,
  attributes,
  last_changed: new Date(Date.now() - Math.random() * 3_600_000).toISOString(),
  last_updated: now(),
});

const params = new URLSearchParams(location.search);
const states: Record<string, HassEntity> = {};
const add = (e: HassEntity) => (states[e.entity_id] = e);
const dim = { supported_color_modes: ["brightness"] };

add(ent("light.living_room", "on", {
  friendly_name: "ضو الصالة", brightness: 200, supported_color_modes: ["hs", "color_temp"], color_mode: "hs",
  hs_color: [38, 88], rgb_color: [255, 177, 31], min_color_temp_kelvin: 2200, max_color_temp_kelvin: 6500,
}));
add(ent("light.kitchen", "off", { friendly_name: "ضو المطبخ", ...dim }));
add(ent("light.bedroom", "off", {
  friendly_name: "ضو غرفة النوم", supported_color_modes: ["color_temp"], color_mode: "color_temp",
  color_temp_kelvin: 3000, min_color_temp_kelvin: 2700, max_color_temp_kelvin: 6500,
}));
add(ent("light.entrance", "on", { friendly_name: "ضو المدخل", supported_color_modes: ["onoff"] }));
add(ent("switch.coffee_machine", "off", { friendly_name: "ماكينة القهوة", device_class: "outlet" }));
add(ent("switch.water_heater", "on", { friendly_name: "السخان" }));
add(ent("climate.living_ac", "cool", {
  friendly_name: "مكيف الصالة", temperature: 22, current_temperature: 25.5, hvac_action: "cooling",
  hvac_modes: ["off", "cool", "heat", "auto", "dry", "fan_only"], min_temp: 16, max_temp: 30, target_temp_step: 1,
}));
add(ent("climate.bedroom_ac", "off", {
  friendly_name: "مكيف غرفة النوم", temperature: 24, current_temperature: 27,
  hvac_modes: ["off", "cool", "heat", "auto"], min_temp: 16, max_temp: 30, target_temp_step: 0.5,
}));
add(ent("vacuum.robot", "docked", { friendly_name: "روبوت التنظيف", battery_level: 92 }));
add(ent("camera.front_door", "idle", { friendly_name: "كاميرا الباب", entity_picture: "/dev/cam-front.svg", access_token: "dev" }));
add(ent("camera.garden", "idle", { friendly_name: "كاميرا الحديقة", entity_picture: "/dev/cam-garden.svg", access_token: "dev" }));
add(ent("lock.front_door", "locked", { friendly_name: "قفل الباب" }));
add(ent("binary_sensor.hallway_motion", "off", { friendly_name: "حركة الممر", device_class: "motion" }));
add(ent("binary_sensor.front_door_contact", "off", { friendly_name: "باب المدخل", device_class: "door" }));
add(ent("binary_sensor.kitchen_window", "on", { friendly_name: "شباك المطبخ", device_class: "window" }));
add(ent("binary_sensor.bathroom_leak", "off", { friendly_name: "تسريب الحمام", device_class: "moisture" }));
add(ent("sensor.living_temperature", "25.5", { friendly_name: "حرارة الصالة", unit_of_measurement: "°C", device_class: "temperature" }));
add(ent("sensor.living_humidity", "48", { friendly_name: "رطوبة الصالة", unit_of_measurement: "%", device_class: "humidity" }));
add(ent("sensor.home_power", "1840", { friendly_name: "استهلاك البيت", unit_of_measurement: "W", device_class: "power" }));
add(ent("sensor.solar_power", "2310", { friendly_name: "الطاقة الشمسية", unit_of_measurement: "W", device_class: "power" }));
add(ent("sensor.ac_power", "1220", { friendly_name: "استهلاك المكيفات", unit_of_measurement: "W", device_class: "power" }));
add(ent("sensor.energy_today", "12.4", { friendly_name: "استهلاك اليوم", unit_of_measurement: "kWh", device_class: "energy" }));
add(ent("event.doorbell", new Date(Date.now() - 7_200_000).toISOString(), { friendly_name: "جرس الباب", device_class: "doorbell", event_types: ["ring"] }));
add(ent("cover.living_blinds", "open", { friendly_name: "برادي الصالة", current_position: 100, current_tilt_position: 50, supported_features: 255 }));
add(ent("scene.movie_night", "scening", { friendly_name: "سهرة فيلم" }));
add(ent("weather.forecast_home", params.get("weather") ?? "sunny", { friendly_name: "الطقس", temperature: 27, humidity: 40 }));
add(ent("sun.sun", "above_horizon", { friendly_name: "Sun" }));
add(ent("input_select.house_mode", "home", { friendly_name: "House mode", options: ["home", "away", "sleep", "evening"] }));
for (const m of ["away", "home", "sleep", "evening"]) add(ent(`script.smartnest_mode_${m}`, "off", { friendly_name: `SmartNest · ${m}` }));

// A Fully Kiosk tablet, as the HA integration exposes it.
add(ent("switch.wall_tablet_screen", "on", { friendly_name: "تابلت الحيط Screen" }));
add(ent("number.wall_tablet_screen_brightness", "255", { friendly_name: "تابلت الحيط Screen brightness", min: 0, max: 255 }));
add(ent("switch.wall_tablet_motion_detection", "off", { friendly_name: "تابلت الحيط Motion detection" }));
add(ent("media_player.wall_tablet", "idle", { friendly_name: "تابلت الحيط" }));
add(ent("sensor.wall_tablet_battery", "100", { friendly_name: "تابلت الحيط Battery", unit_of_measurement: "%", device_class: "battery" }));
const FULLY_DEVICE = "dev-fully-device";
const entityRegistry: Record<string, any> = Object.fromEntries(
  ["switch.wall_tablet_screen", "number.wall_tablet_screen_brightness", "switch.wall_tablet_motion_detection", "media_player.wall_tablet", "sensor.wall_tablet_battery"].map(
    (entity_id) => [entity_id, { entity_id, device_id: FULLY_DEVICE, platform: "fully_kiosk" }]
  )
);
const deviceRegistry: Record<string, HassDevice> = { [FULLY_DEVICE]: { id: FULLY_DEVICE, name: "تابلت الحيط", identifiers: [["fully_kiosk", "dev-tablet-1"]] } };
// ?fully=1 pretends this browser is the tablet (Fully's JavaScript Interface).
if (params.get("fully") === "1") (window as any).fully = { getDeviceId: () => "dev-tablet-1" };

// Where the demo devices sit on dev/floorplan.svg (percent of 1200×800).
const DEMO_MARKERS: [string, number, number, "icon" | "value"][] = [
  ["light.living_room", 27.5, 30, "icon"],
  ["climate.living_ac", 27.5, 9, "value"],
  ["sensor.living_temperature", 11, 15, "value"],
  ["cover.living_blinds", 6, 28, "icon"],
  ["light.kitchen", 63, 22, "icon"],
  ["binary_sensor.kitchen_window", 65, 7.5, "icon"],
  ["switch.coffee_machine", 71.5, 37, "icon"],
  ["binary_sensor.bathroom_leak", 85.8, 25, "icon"],
  ["switch.water_heater", 93, 33, "icon"],
  ["binary_sensor.hallway_motion", 74, 48.5, "icon"],
  ["light.entrance", 14, 72, "icon"],
  ["lock.front_door", 15.5, 91, "icon"],
  ["binary_sensor.front_door_contact", 25, 91, "icon"],
  ["camera.front_door", 7, 84, "icon"],
  ["vacuum.robot", 43, 90, "icon"],
  ["sensor.home_power", 44, 70, "value"],
  ["light.bedroom", 80, 66, "icon"],
  ["climate.bedroom_ac", 80, 59, "value"],
];

// Room outlines on dev/floorplan.svg, so rooms glow when their lights are on.
export const DEMO_ROOMS = [
  { id: "r-living", name: "الصالة", points: [[3.3, 5], [51.7, 5], [51.7, 55], [3.3, 55]] },
  { id: "r-kitchen", name: "المطبخ", points: [[51.7, 5], [75, 5], [75, 42.5], [51.7, 42.5]] },
  { id: "r-bath", name: "الحمام", points: [[75, 5], [96.7, 5], [96.7, 42.5], [75, 42.5]] },
  { id: "r-hall", name: "الممر", points: [[51.7, 42.5], [96.7, 42.5], [96.7, 55], [51.7, 55]] },
  { id: "r-entry", name: "المدخل", points: [[3.3, 55], [25, 55], [25, 95], [3.3, 95]] },
  { id: "r-dining", name: "السفرة", points: [[25, 55], [63.3, 55], [63.3, 95], [25, 95]] },
  { id: "r-bed", name: "غرفة النوم", points: [[63.3, 55], [96.7, 55], [96.7, 95], [63.3, 95]] },
];

type Listener = (msg: any) => void;
const configListeners = new Set<Listener>();
const KEY = "smartnest-dev-config";
const isAdmin = params.get("role") !== "client";

let onChange: (hass: Hass) => void = () => undefined;
let lang = params.get("lang") ?? "ar";

const later = (ms: number, fn: () => void) => window.setTimeout(fn, ms);

function set(id: string, state: string, attrs: Record<string, any> = {}) {
  const prev = states[id];
  states[id] = {
    ...prev,
    state,
    attributes: { ...prev.attributes, ...attrs },
    last_changed: prev.state !== state ? now() : prev.last_changed,
    last_updated: now(),
  };
  onChange(snapshot());
}

function seedDemo(config: any) {
  const plan = config.pages?.flatMap((p: any) => p.widgets).find((w: any) => w.type === "floorplan");
  if (!plan) return config;
  const floor = plan.config.floors[0];
  floor.image = "/dev/floorplan.svg";
  floor.rooms = DEMO_ROOMS;
  floor.markers = DEMO_MARKERS.map(([entity, x, y, display], i) => ({ id: `m${i}`, entity, x, y, display }));
  const home = config.pages[0];
  plan.w = 9;
  home.widgets.push(
    { id: "clock", type: "clock", x: 9, y: 0, w: 3, h: 3, config: {} },
    { id: "t1", type: "tile", x: 9, y: 3, w: 3, h: 2, config: { entity: "scene.movie_night" } },
    { id: "t2", type: "tile", x: 9, y: 5, w: 3, h: 2, config: { entity: "climate.living_ac" } },
    { id: "t3", type: "tile", x: 9, y: 7, w: 3, h: 2, config: { entity: "vacuum.robot" } }
  );
  config.settings.home_name = "بيت أبو محمد";
  config.settings.doorbell = { trigger_entity: "event.doorbell", camera_entity: "camera.front_door", lock_entity: "lock.front_door" };
  config.settings.screensaver.temp_entity = "sensor.living_temperature";
  return config;
}

async function callService(domain: string, service: string, data: Record<string, any> = {}) {
  await new Promise((r) => later(120, () => r(null)));
  const id: string = data.entity_id;
  const e = states[id];
  if (!e) throw new Error(`unknown entity ${id}`);
  const d = id.split(".")[0];
  const key = `${domain}.${service}`;
  switch (key) {
    case "homeassistant.toggle":
      if (d === "light") return set(id, e.state === "on" ? "off" : "on", e.state === "on" ? {} : { brightness: e.attributes.brightness ?? 255 });
      return set(id, e.state === "on" ? "off" : "on");
    case "light.turn_on": {
      const attrs: Record<string, any> = {};
      if (data.brightness_pct) attrs.brightness = Math.round((data.brightness_pct / 100) * 255);
      if (data.hs_color) Object.assign(attrs, { hs_color: data.hs_color, rgb_color: hsToRgb(data.hs_color[0], data.hs_color[1]), color_mode: "hs" });
      if (data.color_temp_kelvin) {
        // Rough warm-to-cool tint so the brightness fill shows the white you picked.
        const f = (data.color_temp_kelvin - 2000) / 4500;
        Object.assign(attrs, { color_temp_kelvin: data.color_temp_kelvin, color_mode: "color_temp", rgb_color: [255, Math.round(170 + 80 * f), Math.round(90 + 165 * f)] });
      }
      return set(id, "on", attrs);
    }
    case "light.turn_off":
      return set(id, "off");
    case "climate.turn_on":
      return set(id, "cool", { hvac_action: "cooling" });
    case "climate.turn_off":
      return set(id, "off", { hvac_action: "off" });
    case "climate.set_temperature":
      return set(id, e.state, { temperature: data.temperature });
    case "climate.set_hvac_mode":
      return set(id, data.hvac_mode, { hvac_action: data.hvac_mode === "cool" ? "cooling" : data.hvac_mode });
    case "vacuum.start":
      return set(id, "cleaning");
    case "vacuum.pause":
      return set(id, "paused");
    case "vacuum.return_to_base":
      set(id, "returning");
      return later(4000, () => set(id, "docked"));
    case "vacuum.locate":
      return;
    case "cover.toggle":
      return set(id, e.state === "open" ? "closed" : "open", { current_position: e.state === "open" ? 0 : 100 });
    case "cover.open_cover":
      return set(id, "open", { current_position: 100 });
    case "cover.close_cover":
      return set(id, "closed", { current_position: 0 });
    case "cover.stop_cover":
      return;
    case "cover.set_cover_position":
      return set(id, data.position > 0 ? "open" : "closed", { current_position: data.position });
    case "cover.set_cover_tilt_position":
      return set(id, e.state, { current_tilt_position: data.tilt_position });
    case "lock.unlock":
      set(id, "unlocking");
      return later(900, () => set(id, "unlocked"));
    case "lock.lock":
      set(id, "locking");
      return later(900, () => set(id, "locked"));
    case "script.turn_on": {
      const mode = id.replace("script.smartnest_mode_", "");
      if (mode === "away" || mode === "sleep") {
        for (const l of Object.keys(states).filter((k) => k.startsWith("light."))) set(l, "off");
        set("lock.front_door", "locked");
      }
      if (mode === "home") set("light.entrance", "on");
      if (mode === "evening") set("light.living_room", "on", { brightness: 77, color_mode: "color_temp", color_temp_kelvin: 2700, rgb_color: [255, 180, 107] });
      return set("input_select.house_mode", mode);
    }
    case "switch.turn_on":
      return set(id, "on");
    case "switch.turn_off":
      return set(id, "off");
    case "number.set_value":
      return set(id, String(data.value));
    case "media_player.play_media":
      console.info("[mock] tablet plays", data.media_content_id);
      return new Audio(data.media_content_id).play().catch(() => undefined);
    case "scene.turn_on":
      set("light.living_room", "on", { brightness: 60 });
      return set("cover.living_blinds", "closed", { current_position: 0 });
    default:
      console.warn("[mock] unhandled service", key, data);
  }
}

function history(entityId: string) {
  const e = states[entityId];
  const base = Number(e?.state) || 0;
  const start = Date.now() / 1000 - 86400;
  const pts = [];
  for (let i = 0; i <= 96; i++) {
    const t = start + i * 900;
    const wave = Math.sin((i / 96) * Math.PI * 2 - 1.2) * 0.25 + (Math.random() - 0.5) * 0.08;
    pts.push(i === 0 ? { s: String((base * (1 + wave)).toFixed(1)), lu: t } : { s: String((base * (1 + wave)).toFixed(1)), lu: t });
  }
  return { [entityId]: pts };
}

async function callWS(msg: Record<string, any>): Promise<any> {
  await new Promise((r) => later(60, () => r(null)));
  switch (msg.type) {
    case "smartnest/config/get": {
      const raw = localStorage.getItem(KEY);
      return { config: raw ? JSON.parse(raw) : null };
    }
    case "smartnest/config/save": {
      if (!isAdmin) throw { code: "unauthorized", message: "Unauthorized" };
      let config = msg.config;
      if (!localStorage.getItem(KEY)) config = seedDemo(structuredClone(config));
      localStorage.setItem(KEY, JSON.stringify(config));
      configListeners.forEach((cb) => cb({ config }));
      return null;
    }
    case "media_source/browse_media": {
      const photos = ["photo-1.svg", "photo-2.svg", "photo-3.svg"];
      return {
        title: "smartnest-photos",
        media_content_id: msg.media_content_id,
        children: photos.map((f) => ({ title: f, media_class: "image", media_content_type: "image/svg+xml", media_content_id: `${msg.media_content_id}/${f}` })),
      };
    }
    case "media_source/resolve_media":
      return { url: `/dev/${msg.media_content_id.split("/").pop()}`, mime_type: "image/svg+xml" };
    case "history/history_during_period":
      return history(msg.entity_ids[0]);
    default:
      throw new Error(`[mock] unknown ws ${msg.type}`);
  }
}

function snapshot(): Hass {
  return {
    states: { ...states },
    entities: entityRegistry,
    devices: deviceRegistry,
    user: { id: "dev", name: isAdmin ? "Installer" : "Client", is_admin: isAdmin },
    language: lang,
    config: { location_name: "Home" },
    callService,
    callWS,
    hassUrl: (p = "") => p,
    fetchWithAuth: async (path: string, init?: RequestInit) => {
      if (path !== "/api/smartnest/upload") return new Response(null, { status: 404 });
      if (!isAdmin) return new Response(null, { status: 403 });
      const file = (init?.body as FormData).get("file") as File;
      const url = await new Promise<string>((res) => {
        const r = new FileReader();
        r.onload = () => res(String(r.result));
        r.readAsDataURL(file);
      });
      return new Response(JSON.stringify({ url }), { status: 200, headers: { "content-type": "application/json" } });
    },
    connection: {
      subscribeMessage: async (cb: Listener, msg: Record<string, any>) => {
        if (msg.type === "smartnest/config/subscribe") configListeners.add(cb);
        return () => configListeners.delete(cb);
      },
    },
  } as Hass;
}

export function startMock(cb: (hass: Hass) => void) {
  onChange = cb;
  cb(snapshot());
  // Live-ish numbers so the dashboard doesn't look frozen.
  window.setInterval(() => {
    const p = Number(states["sensor.home_power"].state);
    set("sensor.home_power", String(Math.max(300, Math.round(p + (Math.random() - 0.5) * 180))));
  }, 5000);
}

export const devActions = {
  ring: () => set("event.doorbell", now(), { event_type: "ring" }),
  motion: () => {
    set("binary_sensor.hallway_motion", "on");
    later(6000, () => set("binary_sensor.hallway_motion", "off"));
  },
  reset: () => {
    localStorage.removeItem(KEY);
    location.reload();
  },
};
