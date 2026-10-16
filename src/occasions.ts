// Occasions that dress the whole dashboard: the Islamic year (from the Hijri calendar), the Gregorian holidays, and
// the family's own days (birthdays, anniversaries) from the calendar in Settings.

export type OccasionKind =
  | "ramadan"
  | "laylat_qadr"
  | "eid_fitr"
  | "arafah"
  | "eid_adha"
  | "hijri_new_year"
  | "mawlid"
  | "christmas"
  | "new_year"
  | "mothers_day"
  | "birthday"
  | "anniversary"
  | "custom";

/** A family date: someone's birthday, a wedding anniversary, or any day the family wants marked. */
export interface FamilyDate {
  id: string;
  name: string;
  /** YYYY-MM-DD; the year gives the age (leave the real year, or any year when it isn't known). */
  date: string;
  kind: "birthday" | "anniversary" | "custom";
  /** HA person, for their photo on the day. */
  person?: string;
  /** Custom days: their colour. */
  color?: string;
  /** The year is real (to show the age / how many years). */
  year_known?: boolean;
}

export interface ActiveOccasion {
  kind: OccasionKind;
  /** The family member it's for. */
  name?: string;
  person?: string;
  /** Age on a birthday, years on an anniversary. */
  years?: number;
  color?: string;
}

/** The calendar's occasions; Mawlid is off unless chosen (not every family marks it). */
export const CALENDAR_KINDS: OccasionKind[] = ["ramadan", "laylat_qadr", "eid_fitr", "arafah", "eid_adha", "hijri_new_year", "mawlid", "christmas", "new_year", "mothers_day"];
export const OFF_BY_DEFAULT: OccasionKind[] = ["mawlid"];

function hijri(d: Date): { month: number; day: number } | undefined {
  try {
    const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { day: "numeric", month: "numeric" }).formatToParts(d);
    return { month: Number(parts.find((p) => p.type === "month")?.value), day: Number(parts.find((p) => p.type === "day")?.value) };
  } catch {
    return undefined;
  }
}

const mmdd = (d: Date) => `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Today's calendar occasion, if any (before the family's own days are looked at). */
export function calendarOccasion(d: Date): OccasionKind | undefined {
  const h = hijri(d);
  if (h) {
    if (h.month === 9 && h.day === 27) return "laylat_qadr";
    if (h.month === 9) return "ramadan";
    if (h.month === 10 && h.day <= 3) return "eid_fitr";
    if (h.month === 12 && h.day === 9) return "arafah";
    if (h.month === 12 && h.day >= 10 && h.day <= 13) return "eid_adha";
    if (h.month === 1 && h.day === 1) return "hijri_new_year";
    if (h.month === 3 && h.day === 12) return "mawlid";
  }
  const m = d.getMonth();
  const day = d.getDate();
  if (m === 2 && day === 21) return "mothers_day";
  if (m === 11 && day >= 20 && day <= 26) return "christmas";
  if ((m === 11 && day === 31) || (m === 0 && day === 1)) return "new_year";
  return undefined;
}

/**
 * What the dashboard dresses for today. A family member's birthday comes first (it's the house's own day), then an
 * anniversary or custom day, then the calendar's occasions that are switched on.
 */
export function occasionNow(settings: { occasions?: boolean; occasions_off?: string[]; family_dates?: FamilyDate[] }, d = new Date()): ActiveOccasion | undefined {
  if (settings.occasions === false) return undefined;
  const today = mmdd(d);
  const family = (settings.family_dates ?? []).filter((f) => f.date?.slice(5) === today);
  const pick = family.find((f) => f.kind === "birthday") ?? family.find((f) => f.kind === "anniversary") ?? family[0];
  if (pick) {
    const y = Number(pick.date.slice(0, 4));
    return {
      kind: pick.kind,
      name: pick.name,
      person: pick.person,
      color: pick.color,
      years: pick.year_known !== false && y > 1900 && y <= d.getFullYear() ? d.getFullYear() - y : undefined,
    };
  }
  const kind = calendarOccasion(d);
  const off = settings.occasions_off ?? OFF_BY_DEFAULT;
  return kind && !off.includes(kind) ? { kind } : undefined;
}

export type Particles = "stars" | "lanterns" | "confetti" | "balloons" | "hearts" | "petals" | "snow" | "fireworks" | "sparkles";

export interface OccasionTheme {
  accent: string;
  /** The page behind the cards. */
  bg: string;
  /** A soft tint on the glass. */
  tint: string;
  particles: Particles[];
  /** Hanging decoration in the header. */
  header?: "lanterns" | "lights" | "bunting";
  /** A night sky: the dashboard goes dark for the day so the sky shows (light themes would wash it out). */
  night?: boolean;
  emoji: string;
}

/** Islamic geometric star tile, gold lines on transparent: Ramadan and the Eids. */
const STAR_TILE = (stroke: string, op: number) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><g fill='none' stroke='${stroke}' stroke-opacity='${op}' stroke-width='1.2'><path d='M60 8 L72 48 L112 60 L72 72 L60 112 L48 72 L8 60 L48 48 Z'/><path d='M60 30 L90 60 L60 90 L30 60 Z'/><circle cx='60' cy='60' r='12'/><path d='M0 0 L20 20 M120 0 L100 20 M0 120 L20 100 M120 120 L100 100'/></g></svg>`
  )}")`;

export const THEMES: Record<OccasionKind, OccasionTheme> = {
  ramadan: {
    night: true,
    accent: "#E8B04B",
    bg: `radial-gradient(60vmax 40vmax at 85% 8%, rgba(255, 214, 120, .28), transparent 60%), ${STAR_TILE("#E8B04B", 0.16)}, linear-gradient(180deg, #0b1236 0%, #1d1450 55%, #3a1d5c 100%)`,
    tint: "rgba(70, 50, 140, .22)",
    particles: ["stars"],
    header: "lanterns",
    emoji: "🌙",
  },
  laylat_qadr: {
    night: true,
    accent: "#FFD27A",
    bg: `radial-gradient(70vmax 50vmax at 50% -10%, rgba(255, 236, 170, .45), transparent 65%), ${STAR_TILE("#FFD27A", 0.18)}, linear-gradient(180deg, #0a1030 0%, #181a52 60%, #2b2266 100%)`,
    tint: "rgba(90, 80, 170, .22)",
    particles: ["stars", "sparkles"],
    header: "lanterns",
    emoji: "✨",
  },
  eid_fitr: {
    night: true,
    accent: "#F2C14E",
    bg: `radial-gradient(50vmax 40vmax at 15% 10%, rgba(242, 193, 78, .35), transparent 60%), ${STAR_TILE("#F2C14E", 0.2)}, linear-gradient(135deg, #0f5132 0%, #17704a 45%, #6b5a1e 100%)`,
    tint: "rgba(20, 110, 70, .22)",
    particles: ["sparkles", "confetti"],
    header: "lanterns",
    emoji: "🎉",
  },
  arafah: {
    accent: "#D9A441",
    bg: `radial-gradient(80vmax 50vmax at 50% 110%, rgba(255, 200, 120, .45), transparent 60%), linear-gradient(180deg, #2b3a55 0%, #8a6a4a 60%, #d8a865 100%)`,
    tint: "rgba(210, 160, 90, .18)",
    particles: ["stars"],
    emoji: "🤲",
  },
  eid_adha: {
    night: true,
    accent: "#D9A441",
    bg: `radial-gradient(50vmax 40vmax at 85% 12%, rgba(255, 220, 150, .35), transparent 60%), ${STAR_TILE("#D9A441", 0.18)}, linear-gradient(160deg, #3d2a14 0%, #7a5426 50%, #1f4d3a 100%)`,
    tint: "rgba(160, 110, 50, .2)",
    particles: ["sparkles", "confetti"],
    header: "lanterns",
    emoji: "🐑",
  },
  hijri_new_year: {
    night: true,
    accent: "#2EC4B6",
    bg: `radial-gradient(50vmax 40vmax at 80% 10%, rgba(46, 196, 182, .3), transparent 60%), ${STAR_TILE("#2EC4B6", 0.14)}, linear-gradient(180deg, #08262c 0%, #0f3d44 60%, #1c5560 100%)`,
    tint: "rgba(30, 140, 140, .2)",
    particles: ["stars"],
    emoji: "🌙",
  },
  mawlid: {
    night: true,
    accent: "#3FAE6A",
    bg: `radial-gradient(70vmax 50vmax at 50% -10%, rgba(220, 255, 230, .35), transparent 65%), ${STAR_TILE("#3FAE6A", 0.16)}, linear-gradient(180deg, #0d2b1c 0%, #165234 60%, #227148 100%)`,
    tint: "rgba(40, 140, 90, .2)",
    particles: ["sparkles"],
    emoji: "🌿",
  },
  christmas: {
    night: true,
    accent: "#D4AF37",
    bg: `radial-gradient(60vmax 40vmax at 20% 0%, rgba(255, 230, 160, .25), transparent 60%), linear-gradient(160deg, #0b3d2e 0%, #134d38 50%, #5e1220 100%)`,
    tint: "rgba(20, 90, 60, .22)",
    particles: ["snow"],
    header: "lights",
    emoji: "🎄",
  },
  new_year: {
    night: true,
    accent: "#FFD166",
    bg: `radial-gradient(40vmax 30vmax at 75% 20%, rgba(255, 209, 102, .25), transparent 60%), radial-gradient(40vmax 30vmax at 20% 30%, rgba(160, 120, 255, .2), transparent 60%), linear-gradient(180deg, #060818 0%, #0f1640 100%)`,
    tint: "rgba(60, 60, 140, .22)",
    particles: ["fireworks", "sparkles"],
    emoji: "🎆",
  },
  mothers_day: {
    accent: "#E36397",
    bg: `radial-gradient(60vmax 40vmax at 80% 10%, rgba(255, 190, 215, .45), transparent 60%), linear-gradient(135deg, #f7d6e6 0%, #e8c1f0 50%, #c9d8ff 100%)`,
    tint: "rgba(240, 150, 190, .18)",
    particles: ["petals", "hearts"],
    emoji: "💐",
  },
  birthday: {
    accent: "#FF5C8A",
    bg: `radial-gradient(50vmax 40vmax at 15% 15%, rgba(255, 160, 200, .45), transparent 60%), radial-gradient(50vmax 40vmax at 85% 85%, rgba(140, 190, 255, .45), transparent 60%), linear-gradient(135deg, #ffd1dc 0%, #fde2c4 45%, #cfe3ff 100%)`,
    tint: "rgba(255, 120, 170, .14)",
    particles: ["confetti", "balloons"],
    header: "bunting",
    emoji: "🎂",
  },
  anniversary: {
    night: true,
    accent: "#B76E79",
    bg: `radial-gradient(60vmax 40vmax at 50% 0%, rgba(255, 200, 200, .4), transparent 60%), linear-gradient(160deg, #3b1f2b 0%, #6d3a4a 55%, #b76e79 100%)`,
    tint: "rgba(183, 110, 121, .2)",
    particles: ["hearts", "sparkles"],
    emoji: "💍",
  },
  custom: {
    accent: "#E9971D",
    bg: "",
    tint: "rgba(233, 151, 29, .14)",
    particles: ["confetti"],
    header: "bunting",
    emoji: "🎈",
  },
};

/** The theme for an occasion; a custom day gets its own colour. */
export function themeFor(o: ActiveOccasion): OccasionTheme {
  const t = THEMES[o.kind];
  if (o.kind !== "custom") return t;
  const c = o.color || t.accent;
  return { ...t, night: true, accent: c, tint: `color-mix(in srgb, ${c} 16%, transparent)`, bg: `radial-gradient(60vmax 40vmax at 50% 0%, color-mix(in srgb, ${c} 45%, transparent), transparent 65%), linear-gradient(160deg, color-mix(in srgb, ${c} 25%, #10141a), color-mix(in srgb, ${c} 55%, #10141a))` };
}
