// Premium look options that aren't a whole component: typefaces, an accent that follows the day, and the calendar's
// big occasions.

export type FontId = "rubik" | "plex" | "readex" | "tajawal" | "almarai" | "kufi" | "inter";

/** Arabic-first typefaces (Hebrew and Latin covered by each or by Rubik behind it). */
export const FONTS: Record<FontId, { label: string; family: string; css?: string }> = {
  rubik: { label: "Rubik", family: "Rubik" },
  plex: { label: "IBM Plex Arabic", family: "IBM Plex Sans Arabic", css: "IBM+Plex+Sans+Arabic:wght@400;500;600;700" },
  readex: { label: "Readex Pro", family: "Readex Pro", css: "Readex+Pro:wght@400;500;600;700" },
  tajawal: { label: "Tajawal", family: "Tajawal", css: "Tajawal:wght@400;500;700;800" },
  almarai: { label: "Almarai", family: "Almarai", css: "Almarai:wght@400;700;800" },
  kufi: { label: "Noto Kufi Arabic", family: "Noto Kufi Arabic", css: "Noto+Kufi+Arabic:wght@400;500;600;700" },
  // Inter has no Arabic letters: Latin text and numbers in Inter, Arabic falls through to Rubik.
  inter: { label: "Inter (+ Rubik)", family: "Inter", css: "Inter:wght@400;500;600;700;800" },
};

/**
 * The font stack for the dashboard. Rubik ships with SmartNest; the others come from Google Fonts the first time
 * (the tablet needs internet once, then the browser keeps them). Until they arrive, Rubik shows.
 */
export function fontStack(id: string | undefined): string {
  const f = FONTS[(id as FontId) ?? "rubik"] ?? FONTS.rubik;
  if (f.css && !document.getElementById(`sn-font-${id}`)) {
    const link = document.createElement("link");
    link.id = `sn-font-${id}`;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${f.css}&display=swap`;
    document.head.appendChild(link);
  }
  return `${f.family === "Rubik" ? "" : `"${f.family}", `}"Rubik", system-ui, -apple-system, "Segoe UI", Tahoma, sans-serif`;
}

/**
 * An accent that moves with the day: gold at sunrise, a fresh teal through the day, coral at sunset and a soft
 * violet at night. Uses the sun's elevation when Home Assistant has it, the clock otherwise.
 */
export function dayAccent(now: Date, elevation?: number, rising?: boolean): string {
  if (elevation !== undefined) {
    if (elevation < -4) return "#8b7cf6"; // night
    if (elevation < 8) return rising ? "#f2b43c" : "#f07a5a"; // dawn / dusk
    if (elevation < 20) return rising ? "#e9971d" : "#ee8a3c";
    return "#1fa99b"; // day
  }
  const h = now.getHours() + now.getMinutes() / 60;
  return h < 5.5 || h >= 20.5 ? "#8b7cf6" : h < 8 ? "#f2b43c" : h < 17 ? "#1fa99b" : "#f07a5a";
}

export type Occasion = "ramadan" | "eid_fitr" | "eid_adha" | "christmas" | "new_year";

/** Today's occasion, if any: Ramadan and the two Eids from the Hijri calendar, Christmas and New Year from the Gregorian. */
export function occasionToday(d = new Date()): Occasion | undefined {
  try {
    const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { day: "numeric", month: "numeric" }).formatToParts(d);
    const month = Number(parts.find((p) => p.type === "month")?.value);
    const day = Number(parts.find((p) => p.type === "day")?.value);
    if (month === 9) return "ramadan";
    if (month === 10 && day <= 3) return "eid_fitr";
    if (month === 12 && day >= 10 && day <= 13) return "eid_adha";
  } catch {
    /* no Islamic calendar in this browser */
  }
  const m = d.getMonth();
  const day = d.getDate();
  if (m === 11 && day >= 20 && day <= 26) return "christmas";
  if ((m === 11 && day === 31) || (m === 0 && day === 1)) return "new_year";
  return undefined;
}
