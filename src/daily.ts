// Day-level helpers shared by the greeting card and the morning summary: greeting, prayer times, forecast.
import type { Hass } from "./types";
import type { I18nKey, Translate } from "./i18n";
import { ICONS } from "./icons";

export function greetingKey(now = new Date()): I18nKey {
  const h = now.getHours();
  if (h >= 4 && h < 12) return "greet_morning";
  if (h >= 12 && h < 17) return "greet_afternoon";
  return "greet_evening";
}

export function greetingName(hass: Hass, configured: string): string {
  return configured.trim() || hass.user?.name || "";
}

export function weatherIcon(condition: string | undefined, night = false): string {
  if (!condition) return "w-cloudy";
  if (condition === "partlycloudy" && night) return "w-partlycloudy-night";
  const key = `w-${condition === "windy-variant" ? "windy" : condition === "snowy-rainy" || condition === "hail" ? "snowy" : condition}`;
  return ICONS[key] ? key : "w-cloudy";
}

export const PRAYERS = ["fajr", "dhuhr", "asr", "maghrib", "isha"] as const;
export type Prayer = (typeof PRAYERS)[number];

export interface PrayerTime {
  id: Prayer;
  at: Date;
}

/** Today's (and tomorrow's Fajr) times from the Islamic Prayer Times sensors, e.g. sensor.fajr_prayer. */
export function prayerTimes(hass: Hass): PrayerTime[] {
  const out: PrayerTime[] = [];
  for (const id of PRAYERS) {
    const e = Object.values(hass.states).find((s) => s.entity_id.startsWith("sensor.") && s.entity_id.endsWith(`${id}_prayer`));
    const at = e ? new Date(e.state) : undefined;
    if (at && !Number.isNaN(at.getTime())) out.push({ id, at });
  }
  return out.sort((a, b) => a.at.getTime() - b.at.getTime());
}

export function nextPrayer(hass: Hass, now = new Date()): PrayerTime | undefined {
  const times = prayerTimes(hass);
  const next = times.find((p) => p.at.getTime() > now.getTime());
  if (next) return next;
  // After Isha the sensors still show today's times; tomorrow's Fajr is close enough (a minute or two off).
  const fajr = times.find((p) => p.id === "fajr");
  return fajr ? { id: "fajr", at: new Date(fajr.at.getTime() + 86_400_000) } : undefined;
}

export function countdown(t: Translate, to: Date, now = new Date()): string {
  const min = Math.max(0, Math.round((to.getTime() - now.getTime()) / 60000));
  if (min < 60) return t("in_min", { n: min });
  const h = Math.floor(min / 60);
  const m = min % 60;
  return t("in_hours", { n: `${h}:${String(m).padStart(2, "0")}` });
}

export interface DayForecast {
  high?: number;
  low?: number;
  condition?: string;
}

/** Today's high/low through weather.get_forecasts (a service with a response; allowed for every user). */
export async function todayForecast(hass: Hass, entity: string): Promise<DayForecast> {
  try {
    const res = await hass.callWS<{ response: Record<string, { forecast: { temperature?: number; templow?: number; condition?: string }[] }> }>({
      type: "call_service",
      domain: "weather",
      service: "get_forecasts",
      target: { entity_id: entity },
      service_data: { type: "daily" },
      return_response: true,
    });
    const f = res.response?.[entity]?.forecast?.[0];
    return f ? { high: f.temperature, low: f.templow, condition: f.condition } : {};
  } catch {
    return {};
  }
}
