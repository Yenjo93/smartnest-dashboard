// Minimal slice of the Home Assistant frontend `hass` object that the panel relies on.
export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

export interface Hass {
  states: Record<string, HassEntity>;
  user?: { id: string; name: string; is_admin: boolean };
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
  screensaver: { enabled: boolean; timeout_min: number; temp_entity?: string };
  doorbell: { trigger_entity?: string; camera_entity?: string; lock_entity?: string };
  kiosk: { pin_hash?: string; pin_salt?: string; pin_length?: number };
}

export type WidgetType = "floorplan" | "tile" | "camera" | "heading" | "clock";

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

export interface Floor {
  id: string;
  name: string;
  image?: string;
  markers: Marker[];
}

export interface DashboardConfig {
  version: 1;
  settings: Settings;
  names: Record<string, string>;
  pages: Page[];
}
