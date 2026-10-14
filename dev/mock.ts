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
add(ent("vacuum.robot", "docked", { friendly_name: "روبوت التنظيف", battery_level: 92, fan_speed: "balanced", fan_speed_list: ["quiet", "balanced", "turbo", "max"] }));
// Roborock's sibling entities, found by the dashboard through the device registry.
add(ent("image.robot_map", "2026-10-13T08:00:00Z", { friendly_name: "Robot map", entity_picture: "/dev/robot-map.svg" }));
add(ent("select.robot_mop_intensity", "moderate", { friendly_name: "Mop intensity", options: ["off", "mild", "moderate", "intense"] }));
add(ent("sensor.robot_cleaning_area", "42", { friendly_name: "Cleaning area", unit_of_measurement: "m²" }));
add(ent("sensor.robot_cleaning_time", "38", { friendly_name: "Cleaning time", unit_of_measurement: "min", device_class: "duration" }));
add(ent("sensor.robot_main_brush_time_left", "792000", { friendly_name: "Main brush time left", unit_of_measurement: "s", device_class: "duration" }));
add(ent("sensor.robot_side_brush_time_left", "540000", { friendly_name: "Side brush time left", unit_of_measurement: "s", device_class: "duration" }));
add(ent("sensor.robot_filter_time_left", "54000", { friendly_name: "Filter time left", unit_of_measurement: "s", device_class: "duration" }));
add(ent("sensor.robot_sensor_time_left", "3600", { friendly_name: "Sensor time left", unit_of_measurement: "s", device_class: "duration" }));
add(ent("button.robot_empty_dustbin", "unknown", { friendly_name: "Empty dustbin" }));
add(ent("camera.front_door", "idle", { friendly_name: "كاميرا الباب", entity_picture: "/dev/cam-front.svg", access_token: "dev" }));
add(ent("camera.garden", "idle", { friendly_name: "كاميرا الحديقة", entity_picture: "/dev/cam-garden.svg", access_token: "dev" }));
add(ent("lock.front_door", "locked", { friendly_name: "قفل الباب" }));
add(ent("alarm_control_panel.house", "disarmed", { friendly_name: "إنذار البيت", code_format: "number", code_arm_required: false, supported_features: 7 }));
add(ent("fan.bedroom", "on", { friendly_name: "مروحة غرفة النوم" }));
add(ent("switch.iron", "on", { friendly_name: "المكواة" }));
add(ent("script.smartnest_panic", "off", { friendly_name: "SmartNest · طوارئ" }));
add(ent("sensor.home_energy_total", "8421", { friendly_name: "عداد الكهرباء", unit_of_measurement: "kWh", device_class: "energy", state_class: "total_increasing" }));
add(ent("sensor.solar_energy_total", "3104", { friendly_name: "إنتاج الشمسي", unit_of_measurement: "kWh", device_class: "energy", state_class: "total_increasing" }));
add(ent("sensor.ac_energy", "910", { friendly_name: "المكيفات", unit_of_measurement: "kWh", device_class: "energy" }));
add(ent("sensor.heater_energy", "520", { friendly_name: "السخان", unit_of_measurement: "kWh", device_class: "energy" }));
add(ent("binary_sensor.hallway_motion", "off", { friendly_name: "حركة الممر", device_class: "motion" }));
add(ent("binary_sensor.front_door_contact", "off", { friendly_name: "باب المدخل", device_class: "door" }));
add(ent("binary_sensor.kitchen_window", "on", { friendly_name: "شباك المطبخ", device_class: "window" }));
add(ent("binary_sensor.bathroom_leak", "off", { friendly_name: "تسريب الحمام", device_class: "moisture" }));
add(ent("sensor.living_temperature", "25.5", { friendly_name: "حرارة الصالة", unit_of_measurement: "°C", device_class: "temperature" }));
add(ent("sensor.living_humidity", "48", { friendly_name: "رطوبة الصالة", unit_of_measurement: "%", device_class: "humidity" }));
add(ent("sensor.home_power", "1840", { friendly_name: "استهلاك البيت", unit_of_measurement: "W", device_class: "power" }));
add(ent("sensor.solar_power", "2310", { friendly_name: "الطاقة الشمسية", unit_of_measurement: "W", device_class: "power" }));
add(ent("sensor.ac_power", "1220", { friendly_name: "استهلاك المكيفات", unit_of_measurement: "W", device_class: "power" }));
add(ent("sensor.grid_power", "-170", { friendly_name: "الشبكة", unit_of_measurement: "W", device_class: "power" }));
add(ent("sensor.water_heater_power", "1950", { friendly_name: "السخان", unit_of_measurement: "W", device_class: "power" }));
add(ent("sensor.coffee_machine_power", "4.6", { friendly_name: "ماكينة القهوة", unit_of_measurement: "W", device_class: "power" }));
add(ent("sensor.tv_power", "96", { friendly_name: "التلفزيون", unit_of_measurement: "W", device_class: "power" }));
add(ent("sensor.fridge_power", "140", { friendly_name: "الثلاجة", unit_of_measurement: "W", device_class: "power" }));
add(ent("switch.smartnest_travel_mode", "off", { friendly_name: "SmartNest travel mode", icon: "mdi:airplane", simulating: [] }));
add(ent("sensor.front_door_package_count", "1", { friendly_name: "طرود عالباب" }));
add(ent("sensor.robot_current_room", "الصالة", { friendly_name: "الروبوت · الغرفة" }));
add(ent("sensor.water_today", "312", { friendly_name: "المي اليوم", unit_of_measurement: "L", device_class: "water", state_class: "total_increasing" }));
add(ent("sensor.water_tank_level", "64", { friendly_name: "خزان المي", unit_of_measurement: "%" }));
add(ent("valve.main_water", "open", { friendly_name: "محبس المي" }));
add(ent("sensor.home_battery_power", "300", { friendly_name: "شحن البطارية", unit_of_measurement: "W", device_class: "power" }));
add(ent("sensor.home_battery", "76", { friendly_name: "بطارية البيت", unit_of_measurement: "%", device_class: "battery" }));
add(ent("sensor.backup_last_successful_automatic_backup", new Date(Date.now() - 2 * 86_400_000).toISOString(), { friendly_name: "Last backup", device_class: "timestamp" }));
add(ent("sensor.disk_use_percent", "41", { friendly_name: "Disk use", unit_of_measurement: "%" }));
add(ent("sensor.processor_temperature", "52", { friendly_name: "CPU temp", unit_of_measurement: "°C", device_class: "temperature" }));
add(ent("sensor.front_door_lock_battery", "12", { friendly_name: "بطارية قفل الباب", unit_of_measurement: "%", device_class: "battery" }));
add(ent("update.home_assistant_core_update", "on", { friendly_name: "Home Assistant Core", title: "Home Assistant Core", latest_version: "2026.10.2" }));
add(ent("binary_sensor.wall_tablet_plugged_in", "on", { friendly_name: "Plugged in", device_class: "plug" }));
add(ent("button.wall_tablet_load_start_url", "unknown", { friendly_name: "Load start URL" }));
add(ent("sensor.energy_today", "12.4", { friendly_name: "استهلاك اليوم", unit_of_measurement: "kWh", device_class: "energy" }));
add(ent("event.doorbell", new Date(Date.now() - 7_200_000).toISOString(), { friendly_name: "جرس الباب", device_class: "doorbell", event_types: ["ring"] }));
add(ent("cover.living_blinds", "open", { friendly_name: "برادي الصالة", current_position: 100, current_tilt_position: 50, supported_features: 255 }));
add(ent("scene.movie_night", "scening", { friendly_name: "سهرة فيلم" }));
add(ent("ai_task.openai", "unknown", { friendly_name: "OpenAI AI Task" }));
add(ent("weather.forecast_home", params.get("weather") ?? "sunny", { friendly_name: "الطقس", temperature: 27, humidity: 40 }));
add(ent("sun.sun", "above_horizon", { friendly_name: "Sun", elevation: Number(params.get("elev") ?? 4), rising: false, next_rising: new Date(Date.now() + 9 * 3600_000).toISOString(), next_setting: new Date(Date.now() + 1 * 3600_000).toISOString() }));
add(ent("sensor.bedroom_humidity", "68", { friendly_name: "رطوبة غرفة النوم", unit_of_measurement: "%", device_class: "humidity" }));
add(ent("sensor.living_co2", "1180", { friendly_name: "هوا الصالة", unit_of_measurement: "ppm", device_class: "carbon_dioxide" }));
add(ent("sensor.abu_mohammad_area", "الصالة", { friendly_name: "أبو محمد · الغرفة" }));
// Islamic Prayer Times sensors: timestamps for today.
{
  const at = (h: number, m: number) => {
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d.toISOString();
  };
  for (const [p, h, m] of [["fajr", 4, 52], ["dhuhr", 11, 41], ["asr", 15, 2], ["maghrib", 17, 33], ["isha", 18, 51]] as const)
    add(ent(`sensor.${p}_prayer`, at(h, m), { friendly_name: p, device_class: "timestamp" }));
}
add(ent("person.abu_mohammad", "home", { friendly_name: "أبو محمد" }));
add(ent("person.um_mohammad", "not_home", { friendly_name: "أم محمد" }));
add(ent("person.mohammad", "School", { friendly_name: "محمد" }));
add(ent("sensor.water_tank", "18", { friendly_name: "خزان المي", unit_of_measurement: "%" }));
add(ent("sensor.gas_level", "64", { friendly_name: "جرة الغاز", unit_of_measurement: "%" }));
add(ent("cover.main_gate", "closed", { friendly_name: "البوابة الرئيسية", device_class: "gate" }));
add(ent("media_player.living_speaker", "playing", {
  friendly_name: "سماعة الصالة", media_title: "فيروز · صباح ومسا", media_artist: "فيروز", volume_level: 0.35, is_volume_muted: false,
  supported_features: 1 | 4 | 8 | 16 | 32 | 16384 | 524288, entity_picture: "/dev/photo-1.svg",
}));
add(ent("media_player.kitchen_speaker", "idle", { friendly_name: "سماعة المطبخ", supported_features: 524288 | 4 }));
add(ent("remote.living_tv", "on", { friendly_name: "تلفزيون الصالة" }));
add(ent("tts.google_translate_ar", "unknown", { friendly_name: "Google Translate" }));
add(ent("todo.shopping", "2", { friendly_name: "قائمة المشتريات" }));
add(ent("calendar.family", "off", { friendly_name: "تقويم العيلة" }));
add(ent("calendar.school", "off", { friendly_name: "المدرسة" }));
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
  ["switch.wall_tablet_screen", "number.wall_tablet_screen_brightness", "switch.wall_tablet_motion_detection", "media_player.wall_tablet", "sensor.wall_tablet_battery", "binary_sensor.wall_tablet_plugged_in", "button.wall_tablet_load_start_url"].map(
    (entity_id) => [entity_id, { entity_id, device_id: FULLY_DEVICE, platform: "fully_kiosk" }]
  )
);
entityRegistry["remote.living_tv"] = { entity_id: "remote.living_tv", platform: "androidtv_remote" };
for (const id of ["vacuum.robot", "sensor.robot_current_room", "image.robot_map", "select.robot_mop_intensity", "sensor.robot_cleaning_area", "sensor.robot_cleaning_time", "sensor.robot_main_brush_time_left", "sensor.robot_side_brush_time_left", "sensor.robot_filter_time_left", "sensor.robot_sensor_time_left", "button.robot_empty_dustbin"])
  entityRegistry[id] = { entity_id: id, device_id: "dev-robot", platform: "roborock" };
// Plug meters on the same device as what they power, so "turn off" and "standby" find the switch.
for (const [sensor, control, dev] of [["sensor.water_heater_power", "switch.water_heater", "dev-heater"], ["sensor.coffee_machine_power", "switch.coffee_machine", "dev-coffee"], ["sensor.tv_power", "media_player.living_tv", "dev-tv"]])
  for (const id of [sensor, control]) entityRegistry[id] = { ...(entityRegistry[id] ?? { entity_id: id }), device_id: dev };
// HA areas, named like the rooms drawn on the demo plan, so "Fill rooms" has something to match.
const areas: Record<string, { area_id: string; name: string }> = Object.fromEntries(
  [["living", "الصالة"], ["kitchen", "المطبخ"], ["bath", "الحمام"], ["hall", "الممر"], ["entry", "المدخل"], ["bedroom", "غرفة النوم"]].map(([area_id, name]) => [area_id, { area_id, name }])
);
const AREA_OF: Record<string, string> = {
  "light.living_room": "living", "climate.living_ac": "living", "sensor.living_temperature": "living", "sensor.living_humidity": "living", "cover.living_blinds": "living",
  "media_player.living_speaker": "living", "light.kitchen": "kitchen", "switch.coffee_machine": "kitchen", "binary_sensor.kitchen_window": "kitchen",
  "binary_sensor.bathroom_leak": "bath", "switch.water_heater": "bath", "binary_sensor.hallway_motion": "hall", "light.entrance": "entry",
  "lock.front_door": "entry", "binary_sensor.front_door_contact": "entry", "camera.front_door": "entry", "light.bedroom": "bedroom",
  "climate.bedroom_ac": "bedroom", "fan.bedroom": "bedroom", "sensor.bedroom_humidity": "bedroom",
};
for (const [id, area_id] of Object.entries(AREA_OF)) entityRegistry[id] = { ...(entityRegistry[id] ?? { entity_id: id }), area_id };
// A diagnostic sensor that must never reach the dashboard.
add(ent("sensor.coffee_machine_signal", "-61", { friendly_name: "Coffee machine signal", device_class: "signal_strength", unit_of_measurement: "dBm" }));
entityRegistry["sensor.coffee_machine_signal"] = { entity_id: "sensor.coffee_machine_signal", area_id: "kitchen", entity_category: "diagnostic" };
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
const timers: Record<string, string> = {};
let autoSummaries: any[] = [];
let todoItems = [
  { uid: "1", summary: "خبز", status: "needs_action" },
  { uid: "2", summary: "حليب", status: "needs_action" },
  { uid: "3", summary: "بندورة", status: "completed" },
];
const todoListeners = new Set<Listener>();
const msgListeners = new Set<Listener>();
let currentMessage: any = null;
const pushTodo = () => todoListeners.forEach((cb) => cb({ items: todoItems }));
const pushMessage = () => msgListeners.forEach((cb) => cb({ message: currentMessage }));
const configListeners = new Set<Listener>();
const KEY = "smartnest-dev-config";
const isAdmin = params.get("role") !== "client";

let onChange: (hass: Hass) => void = () => undefined;
// ?license=0 shows the activation screen until a key starting with SN1. is entered.
const licensed = () => params.get("license") !== "0" || localStorage.getItem("smartnest-dev-license") === "1";
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

function callServiceTodo(service: string, data: Record<string, any>) {
  if (service === "add_item") todoItems = [{ uid: String(Date.now()), summary: data.item, status: "needs_action" }, ...todoItems];
  if (service === "update_item") todoItems = todoItems.map((i) => (i.uid === data.item ? { ...i, status: data.status } : i));
  pushTodo();
}

async function callService(domain: string, service: string, data: Record<string, any> = {}): Promise<any> {
  // Real HA accepts a list of entities in one call.
  if (domain === "todo") return callServiceTodo(service, data);
  if (Array.isArray(data.entity_id)) return Promise.all(data.entity_id.map((entity_id: string) => callService(domain, service, { ...data, entity_id })));
  await new Promise((r) => later(120, () => r(null)));
  const id: string = data.entity_id;
  const e = states[id];
  if (!e) throw new Error(`unknown entity ${id}`);
  const d = id.split(".")[0];
  const key = `${domain}.${service}`;
  switch (key) {
    case "homeassistant.turn_off":
      return set(id, d === "climate" ? "off" : "off");
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
    case "vacuum.start": {
      // The robot works through the rooms, one every few seconds.
      const route = ["الصالة", "المطبخ", "الممر", "غرفة النوم"];
      route.forEach((room, i) => later(i * 5000, () => set("sensor.robot_current_room", room)));
      return set(id, "cleaning");
    }
    case "vacuum.pause":
      return set(id, "paused");
    case "vacuum.return_to_base":
      set(id, "returning");
      return later(4000, () => set(id, "docked"));
    case "vacuum.locate":
      return;
    case "vacuum.set_fan_speed":
      return set(id, e.state, { fan_speed: data.fan_speed });
    case "vacuum.send_command":
      console.info("[mock] robot command", data.command, JSON.stringify(data.params));
      return set(id, "cleaning");
    case "vacuum.clean_area":
      console.info("[mock] clean areas", data.cleaning_area_id);
      return set(id, "cleaning");
    case "select.select_option":
      return set(id, data.option);
    case "button.press":
      return console.info("[mock] pressed", id);
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
    case "alarm_control_panel.alarm_arm_home":
    case "alarm_control_panel.alarm_arm_away":
    case "alarm_control_panel.alarm_arm_night":
      return set(id, service.replace("alarm_", "").replace("arm_", "armed_"));
    case "alarm_control_panel.alarm_disarm":
      if (data.code !== "1234") throw new Error("wrong code");
      return set(id, "disarmed");
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
    case "todo.add_item":
      todoItems = [{ uid: String(Date.now()), summary: data.item, status: "needs_action" }, ...todoItems];
      return pushTodo();
    case "todo.update_item":
      todoItems = todoItems.map((i) => (i.uid === data.item ? { ...i, status: data.status } : i));
      return pushTodo();
    case "media_player.media_play_pause":
      return set(id, e.state === "playing" ? "paused" : "playing");
    case "media_player.volume_set":
      return set(id, e.state, { volume_level: data.volume_level });
    case "media_player.join":
      return console.info("[mock] join", data.group_members);
    case "remote.send_command":
      return console.info("[mock] remote", data.command);
    case "tts.speak":
      return console.info("[mock] speak", data.message, data.media_player_entity_id);
    case "switch.turn_on":
      return set(id, "on");
    case "switch.turn_off":
      return set(id, "off");
    case "valve.open_valve":
      return set(id, "open");
    case "valve.close_valve":
      return set(id, "closed");
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
      if (!licensed()) throw { code: "not_licensed", message: "SmartNest needs an activation key" };
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
    case "smartnest/feedback":
      console.info("[mock] feedback", msg.stars, msg.comment);
      return null;
    case "smartnest/automations/get":
      return { items: autoSummaries };
    case "smartnest/automations/set":
      autoSummaries = msg.items;
      return null;
    case "frigate/events/get":
      throw { code: "not_found", message: "Frigate instance not found" };
    case "smartnest/message/send":
      currentMessage = { id: String(Date.now()), message: msg.message, title: isAdmin ? "Installer" : "Client" };
      pushMessage();
      return { id: currentMessage.id };
    case "smartnest/message/ack":
      if (currentMessage?.id === msg.id) currentMessage = null;
      pushMessage();
      return null;
    case "smartnest/timer/list":
      return { ...timers };
    case "smartnest/timer/set": {
      const due = new Date(Date.now() + msg.minutes * 60_000).toISOString();
      timers[msg.entity_id] = due;
      return { due };
    }
    case "smartnest/timer/cancel":
      delete timers[msg.entity_id];
      return null;
    case "smartnest/license/status":
      return {
        licensed: licensed(),
        instance_id: "dev-installation-0f3a9c",
        licensee: licensed() ? "بيت أبو محمد" : "",
        plan: params.get("plan") ?? "premium",
        expires: params.get("expires") ? Math.floor(Date.now() / 1000) + Number(params.get("expires")) * 86400 : null,
        trial: params.get("trial") === "1",
        reseller: params.get("reseller") ?? "",
      };
    case "smartnest/license/activate":
      // The mock can't check signatures; the real integration does (Ed25519, per installation).
      if (!isAdmin || !String(msg.key).startsWith("SN1.")) throw { code: "invalid_key", message: "invalid" };
      localStorage.setItem("smartnest-dev-license", "1");
      return { licensed: true, licensee: "بيت أبو محمد" };
    case "smartnest/plan/read_rooms":
      // What a vision model answered for a typical exported plan (labels in English, matched to the HA areas).
      // Drop such a plan at dev/plan-photo.jpg (git-ignored) to try "Find rooms" end to end.
      await new Promise((r) => setTimeout(r, 1200));
      if (!String(msg.image).endsWith("plan-photo.jpg")) return { rooms: [] };
      return {
        rooms: [
          { label: "Bedroom", area: "غرفة النوم", x: 55, y: 22 }, { label: "Bathroom 1", area: "الحمام", x: 88, y: 16 },
          { label: "Bathroom 2", area: "", x: 91, y: 33 }, { label: "Laundry", area: "", x: 91, y: 46 },
          { label: "Hallway", area: "الممر", x: 61, y: 47 }, { label: "Office", area: "", x: 25, y: 53 },
          { label: "Kitchen", area: "المطبخ", x: 49, y: 76 }, { label: "Living Room", area: "الصالة", x: 78, y: 74 },
        ],
      };
    case "smartnest/visitors/list": {
      const ago = (h: number) => new Date(Date.now() - h * 3_600_000).toISOString();
      return { visitors: [0.5, 3, 26, 30].map((h, i) => ({ url: i % 2 ? "/dev/cam-garden.svg" : "/dev/cam-front.svg", time: ago(h) })) };
    }
    case "call_service":
      if (msg.domain === "weather" && msg.service === "get_forecasts")
        return {
          response: {
            [msg.target.entity_id]: {
              forecast: ["sunny", "partlycloudy", "cloudy", "rainy", "pouring", "partlycloudy", "sunny"].map((condition, i) => ({
                datetime: new Date(Date.now() + i * 86_400_000).toISOString(),
                temperature: [31, 29, 26, 22, 19, 24, 28][i],
                templow: [19, 18, 16, 14, 12, 15, 17][i],
                condition,
              })),
            },
          },
        };
      if (msg.domain === "roborock" && msg.service === "get_maps")
        return { response: { [msg.target.entity_id]: { maps: [{ flag: 0, name: "Home", rooms: { "16": "الصالة", "17": "المطبخ", "18": "غرفة النوم", "19": "السفرة", "20": "الممر", "21": "المدخل" } }] } } };
      return { response: null };
    case "logbook/get_events": {
      const t0 = Date.parse(msg.start_time) / 1000;
      const ev = (entity_id: string, state: string, hoursIn: number) => ({ entity_id, state, when: t0 + hoursIn * 3600 });
      return [
        ev("event.doorbell", new Date().toISOString(), 2),
        ev("binary_sensor.front_door_contact", "on", 1),
        ev("binary_sensor.front_door_contact", "off", 1.1),
        ev("binary_sensor.front_door_contact", "on", 11),
        ev("vacuum.robot", "cleaning", 9),
      ].filter((e) => msg.entity_ids.includes(e.entity_id));
    }
    case "recorder/statistics_during_period": {
      // Daily kWh for each meter from the start of last month.
      const per: Record<string, number> = { "sensor.home_energy_total": 21, "sensor.solar_energy_total": 9, "sensor.ac_energy": 8, "sensor.heater_energy": 4.5, "sensor.energy_today": 0 };
      const out: Record<string, { start: number; change: number }[]> = {};
      const t0 = Date.parse(msg.start_time);
      for (const id of msg.statistic_ids) {
        out[id] = [];
        for (let t = t0; t < Date.now(); t += 86_400_000) out[id].push({ start: t, change: (per[id] ?? 1) * (0.8 + Math.random() * 0.4) * (t > Date.now() - 20 * 86_400_000 ? 1.1 : 1) });
      }
      return out;
    }
    case "history/history_during_period": {
      // Sensors get a day of readings; switchable devices get two weeks of a family's routine (for habit suggestions).
      const out: Record<string, any[]> = {};
      for (const id of msg.entity_ids) {
        const d = id.split(".")[0];
        if (!["light", "switch", "fan", "cover", "climate", "media_player"].includes(d)) {
          Object.assign(out, history(id));
          continue;
        }
        const seed = [...id].reduce((a, c) => a + c.charCodeAt(0), 0);
        const on = d === "cover" ? "open" : d === "climate" ? "cool" : "on";
        const off = d === "cover" ? "closed" : "off";
        const pts: any[] = [];
        const t0 = Date.parse(msg.start_time);
        for (let day = 0; day < 14; day++) {
          const midnight = new Date(t0 + day * 86_400_000);
          midnight.setHours(0, 0, 0, 0);
          const jitter = () => ((seed * (day + 3)) % 17) - 8;
          const at = (h: number, m: number) => (midnight.getTime() + (h * 60 + m + jitter()) * 60_000) / 1000;
          if ((seed + day) % 7 === 0) continue; // a day off the routine
          pts.push({ s: on, lu: at(17 + (seed % 3), 30) }, { s: off, lu: at(22 + (seed % 2), 10) });
        }
        out[id] = pts;
      }
      return out;
    }
    case "assist_pipeline/pipeline/list":
      return { pipelines: [{ id: "p1", conversation_engine: "conversation.home_assistant", conversation_language: "ar" }], preferred_pipeline: "p1" };
    case "conversation/process": {
      await new Promise((r) => setTimeout(r, 700));
      const text = String(msg.text);
      const speech = /طف|off/i.test(text) ? "طفّيت 4 أضواء." : /حرار|temp/i.test(text) ? "الحرارة بالصالة 23.5 درجة." : /باب|door/i.test(text) ? "الباب مقفول." : "تمام، عملتها.";
      return { conversation_id: "c1", response: { response_type: "action_done", speech: { plain: { speech } } } };
    }
    case "smartnest/ai/ask": {
      await new Promise((r) => setTimeout(r, 1500));
      const text: Record<string, string> = {
        doorbell: "رجل بزي توصيل ومعه طرد صغير.",
        summary: "صباح هادي: الباب الأمامي انفتح مرة بالليل والروبوت نضّف الساعة 4. اليوم مشمس وبتوصل 31، فخلي المكيف جاهز للظهر.",
        explain: "حساس الحمام: Zigbee، البطارية غالباً خلصت (CR2032).\nمكيف الصالة: انقطع عن الواي فاي، افصله ورجعه.",
      };
      return { text: text[msg.task] };
    }
    default:
      throw new Error(`[mock] unknown ws ${msg.type}`);
  }
}

function snapshot(): Hass {
  return {
    states: { ...states },
    entities: entityRegistry,
    devices: deviceRegistry,
    areas,
    user: { id: "dev", name: isAdmin ? "Installer" : "Client", is_admin: isAdmin },
    language: lang,
    config: { location_name: "Home" },
    services: { notify: { mobile_app_omar: {}, family_group: {} } },
    callService,
    callWS,
    hassUrl: (p = "") => p,
    fetchWithAuth: async (path: string, init?: RequestInit) => {
      if (path.startsWith("/api/config/automation/config/")) {
        const id = path.split("/").pop()!;
        const entityId = `automation.${id}`;
        if (init?.method === "DELETE") {
          delete states[entityId];
        } else {
          const cfg = JSON.parse(String(init?.body));
          console.info("[mock] automation saved", JSON.stringify(cfg));
          states[entityId] = { entity_id: entityId, state: "on", attributes: { id, friendly_name: cfg.alias }, last_changed: now(), last_updated: now() };
        }
        onChange(snapshot());
        return new Response(JSON.stringify({ result: "ok" }), { status: 200 });
      }
      if (path.startsWith("/api/calendars/")) {
        const at = (days: number, h: number, m = 0) => {
          const d = new Date();
          d.setDate(d.getDate() + days);
          d.setHours(h, m, 0, 0);
          return d.toISOString();
        };
        const day = (days: number) => new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);
        const events = path.includes("school")
          ? [{ summary: "اجتماع أولياء الأمور", start: { dateTime: at(1, 17) } }, { summary: "رحلة مدرسية", start: { date: day(3) } }]
          : [{ summary: "عشا عند الأهل", start: { dateTime: at(0, 20, 30) } }, { summary: "موعد طبيب الأسنان", start: { dateTime: at(2, 10) } }];
        return new Response(JSON.stringify(events), { status: 200 });
      }
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
        if (msg.type === "todo/item/subscribe") {
          todoListeners.add(cb);
          cb({ items: todoItems });
        }
        if (msg.type === "smartnest/message/subscribe") msgListeners.add(cb);
        return () => {
          configListeners.delete(cb);
          todoListeners.delete(cb);
          msgListeners.delete(cb);
        };
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
  message: () => {
    currentMessage = { id: String(Date.now()), title: "💊", message: "وقت دوا الستّ", ack: "أخذته ✓", icon: "pill" };
    pushMessage();
  },
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
