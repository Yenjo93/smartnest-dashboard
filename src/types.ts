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
  platform?: string;
  translation_key?: string;
}

export interface HassDevice {
  id: string;
  name?: string;
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
  config?: { location_name?: string; time_zone?: string };
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
export type ThemeMode = "auto" | "schedule" | "light" | "dark";

export interface Settings {
  home_name: string;
  language: Lang;
  accent: string;
  theme: ThemeMode;
  dark_from: string; // "HH:MM", used when theme === "schedule"
  dark_to: string;
  default_page: string;
  screensaver: { enabled: boolean; timeout_min: number; temp_entity?: string; photos: boolean; photo_folder: string; photo_seconds: number };
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
  /** Whole-home power sensor for the status chip. */
  power_entity?: string;
  kiosk: { pin_hash?: string; pin_salt?: string; pin_length?: number };
}

export type WidgetType = "floorplan" | "tile" | "camera" | "heading" | "clock" | "modes" | "vacuum" | "visitors" | "energy";

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
