// Minimal slice of the Home Assistant frontend `hass` object that the panel relies on.
export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

/** Entity registry entry as the frontend exposes it (hass.entities). */
export interface HassEntityReg {
  entity_id: string;
  device_id?: string;
  area_id?: string;
  platform?: string;
  translation_key?: string;
  /** "config" / "diagnostic": technical entities, not for the family. */
  entity_category?: string | null;
  hidden?: boolean;
}

export interface HassDevice {
  id: string;
  name?: string;
  area_id?: string | null;
  identifiers?: [string, string][];
}

export interface HassArea {
  area_id: string;
  name: string;
  icon?: string;
}

export interface Hass {
  states: Record<string, HassEntity>;
  areas?: Record<string, HassArea>;
  entities?: Record<string, HassEntityReg>;
  devices?: Record<string, HassDevice>;
  user?: { id: string; name: string; is_admin: boolean };
  config?: { location_name?: string; time_zone?: string; latitude?: number; longitude?: number };
  language: string;
  callService(domain: string, service: string, data?: Record<string, any>): Promise<any>;
  callWS<T = any>(msg: Record<string, any>): Promise<T>;
  fetchWithAuth(path: string, init?: RequestInit): Promise<Response>;
  hassUrl(path?: string): string;
  connection: {
    subscribeMessage<T = any>(cb: (msg: T) => void, msg: Record<string, any>): Promise<() => void>;
  };
}

export interface PanelInfo {
  config?: { asset_base?: string; version?: string };
}

export type Lang = "ar" | "en" | "he";
export type ThemeMode = "auto" | "schedule" | "light" | "dark" | "midnight";

export interface Settings {
  home_name: string;
  language: Lang;
  accent: string;
  theme: ThemeMode;
  dark_from: string; // "HH:MM", used when theme === "schedule"
  dark_to: string;
  default_page: string;
  screensaver: {
    enabled: boolean;
    timeout_min: number;
    temp_entity?: string;
    photos: boolean;
    photo_folder: string;
    photo_seconds: number;
    style: "classic" | "minimal" | "analog";
  };
  /** Card material: classic frosted glass, or "liquid" with a lit edge and deeper refraction. */
  glass: "classic" | "liquid";
  /** Guest mode: welcome screen with a Wi-Fi QR code. */
  guests: { ssid?: string; password?: string; welcome?: string };
  weather: { entity?: string; background: boolean };
  fully: { night_dim: boolean; night_brightness: number; night_off_min: number; motion_wake: boolean };
  doorbell: { trigger_entity?: string; camera_entity?: string; lock_entity?: string; keep_days: number };
  /** Name in the greeting; empty = the signed-in user's name. */
  greeting_name: string;
  /** Status chip types the installer switched off. */
  chips_hidden: string[];
  /** Prayer times from the Islamic Prayer Times integration, when installed. */
  prayer: boolean;
  /** Morning card the first time the screen is used after the night window. */
  morning: boolean;
  /** At night the plan dims devices that are off, so what's on stands out. */
  night_plan: boolean;
  /** Ramadan and Eid decorations: auto (Hijri calendar), always, or off. */
  season: "auto" | "off" | "ramadan" | "eid";
  /** Page shown in kids mode (big buttons, everything else hidden until the PIN). */
  kids_page?: string;
  /** Speakers for spoken announcements. */
  speakers: string[];
  /** Service reminders: filters, AC service, smoke detector test… */
  maintenance: { id: string; title: string; every_days: number; last: string }[];
  /** False until the installer finishes the first-run wizard. */
  setup_done: boolean;
  /** Whole-home power sensor for the status chip. */
  power_entity?: string;
  /** Watts the house shouldn't go over (the main breaker or the solar inverter's limit). */
  power_limit?: number;
  kiosk: { pin_hash?: string; pin_salt?: string; pin_length?: number };
  /** What travel mode turns off, which lights it plays with, where the evening report goes. */
  travel: { off: string[]; lights: string[]; notify?: string; arm: boolean; simulate: boolean };
  /** Who installed this house: the client's "something's wrong" button messages them. */
  installer: { name?: string; phone?: string; heartbeat_url?: string };
  /** Washer, dryer, dishwasher: announced when their power meter says the cycle ended. */
  appliances: { power: string; name: string; start_w?: number; quiet_min?: number }[];
  /** At night, motion lights a dim path. */
  night_path: { motion: string[]; lights: string[]; brightness: number; minutes: number; from: string; to: string };
  /** Someone heading home: cool the house, and light it after dark. */
  arrival: { climate: string[]; lights: string[]; km: number };
  /** Grid lost (battery or generator takes over): turn off the heavy loads. */
  outage: { sensor?: string; shed: string[]; below?: number };
  /** Time-of-use tariff: cheap night hours and the peak to avoid. */
  tou: { enabled: boolean; cheap_from: string; cheap_to: string; peak_from: string; peak_to: string };
  /** SmartNest 2.0: deeper materials, moving light, grain, duotone icons. */
  style: "classic" | "pro";
  /** A surface behind everything (2.0 only). */
  material: "none" | "marble" | "wood" | "sand" | "olive";
  /** A photo behind everything (2.0), how much it's darkened (0-0.8), and whether the accent comes from it. */
  wallpaper?: string;
  wallpaper_dim: number;
  accent_from_wallpaper: boolean;
  /** Pages as tabs in the bar, or a floating dock at the bottom (2.0, big screens). */
  nav: "tabs" | "dock";
  /** At night, the dark look becomes Midnight (pure black, only what's on glows). */
  night_midnight: boolean;
  /** Numbers on the alarm screen. */
  emergency: { police: string; contacts: { name: string; phone: string }[] };
}

export type WidgetType = "floorplan" | "tile" | "camera" | "heading" | "clock" | "modes" | "vacuum" | "visitors" | "energy" | "energy_stats" | "panic" | "check"
  | "family" | "todo" | "calendar" | "forecast" | "countdown"
  | "gauge" | "gate" | "frigate" | "schedule"
  | "media" | "remote"
  | "consumers"
  | "water"
  | "wake"
  | "chores"
  | "air"
  | "boiler"
  | "irrigation"
  | "timeline"
  | "internet"
  | "board"
  | "verse"
  | "radar"
  | "commute"
  | "parcels"
  | "hero"
  | "stack"
  | "room";

export interface Widget {
  id: string;
  type: WidgetType;
  x: number;
  y: number;
  w: number;
  h: number;
  config: Record<string, any>;
}

export interface Page {
  id: string;
  title: string;
  icon: string;
  widgets: Widget[];
  /** A family member's own page: reached from their photo in the bar instead of a tab. */
  person?: string;
}

export type MarkerDisplay = "icon" | "value";

export interface Marker {
  id: string;
  entity: string;
  x: number; // percent of image width, 0..100
  y: number; // percent of image height, 0..100
  display: MarkerDisplay;
}

export interface Room {
  id: string;
  name: string;
  /** Outline as [x, y] percentages of the plan image, like markers. */
  points: [number, number][];
  /** The robot's room (Roborock segment or HA area) this outline is; empty = matched by name. */
  robot_room?: string;
}

export interface Floor {
  id: string;
  name: string;
  image?: string;
  markers: Marker[];
  rooms?: Room[];
}

export interface DashboardConfig {
  version: 1;
  settings: Settings;
  names: Record<string, string>;
  pages: Page[];
}
