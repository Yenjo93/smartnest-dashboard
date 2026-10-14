// What each plan unlocks. The key carries the plan; the installer decides when issuing it.
export type Plan = "basic" | "pro" | "premium";
const RANK: Record<Plan, number> = { basic: 0, pro: 1, premium: 2 };

export type Feature =
  | "w_floorplan" | "w_tile" | "w_camera" | "w_heading" | "w_clock" | "w_modes"
  | "w_vacuum" | "w_visitors" | "w_energy" | "w_energy_stats" | "w_panic" | "w_check"
  | "weather_bg" | "photo_frame" | "cinematic" | "morning" | "heat_map" | "room_glow" | "timers" | "fully"
  | "camera_wall" | "seasons" | "alarm"
  | "w_family" | "w_todo" | "w_calendar" | "w_forecast" | "w_countdown" | "messages" | "kids"
  | "w_gauge" | "w_gate" | "w_frigate" | "w_schedule" | "automations" | "lock_history"
  | "sky" | "plan_3d" | "people_on_plan" | "air_maps" | "clock_styles" | "liquid_glass" | "guests"
  | "w_media" | "w_remote" | "broadcast" | "cinema" | "transfer" | "wizard" | "maintenance" | "rating"
  | "assistant" | "ai_doorbell" | "ai_summary" | "habits" | "ai_explain" | "w_consumers" | "w_water" | "overload" | "solar_tip" | "bill_budget" | "plan_fx" | "plan_replay" | "floor_stack" | "fly_to_room" | "robot_on_plan" | "travel" | "alarm_screen" | "package" | "weather_alert" | "w_wake" | "w_chores" | "w_air" | "light_fx" | "person_pages";

const NEEDS: Record<Feature, Plan> = {
  w_floorplan: "basic", w_tile: "basic", w_camera: "basic", w_heading: "basic", w_clock: "basic", w_modes: "basic",
  alarm: "basic",
  w_vacuum: "pro", w_visitors: "pro", w_energy: "pro", w_check: "pro",
  weather_bg: "pro", photo_frame: "pro", cinematic: "pro", morning: "pro", heat_map: "pro", room_glow: "pro", timers: "pro", fully: "pro",
  w_forecast: "basic",
  w_family: "pro", w_todo: "pro", w_calendar: "pro", w_countdown: "pro", messages: "pro",
  kids: "premium",
  w_gauge: "basic", lock_history: "pro", w_gate: "pro",
  sky: "pro", clock_styles: "pro", air_maps: "pro",
  plan_3d: "premium", people_on_plan: "premium", liquid_glass: "premium", guests: "premium",
  w_media: "basic", wizard: "basic", transfer: "basic", rating: "basic",
  w_remote: "pro", maintenance: "pro",
  broadcast: "premium", cinema: "premium",
  w_frigate: "premium", w_schedule: "premium", automations: "premium",
  w_energy_stats: "premium", w_panic: "premium", camera_wall: "premium", seasons: "premium",
  assistant: "premium",
  ai_doorbell: "premium",
  ai_summary: "premium",
  habits: "premium",
  ai_explain: "pro",
  w_consumers: "pro",
  w_water: "pro",
  overload: "pro",
  solar_tip: "pro",
  bill_budget: "pro",
  plan_fx: "premium",
  plan_replay: "premium",
  floor_stack: "premium",
  fly_to_room: "pro",
  robot_on_plan: "pro",
  travel: "premium",
  alarm_screen: "pro",
  package: "pro",
  weather_alert: "pro",
  w_wake: "premium",
  w_chores: "pro",
  w_air: "pro",
  light_fx: "premium",
  person_pages: "pro",
};

export const planFor = (f: Feature): Plan => NEEDS[f];
export const allows = (plan: Plan, f: Feature) => RANK[plan] >= RANK[NEEDS[f]];
export const widgetFeature = (type: string) => `w_${type}` as Feature;
