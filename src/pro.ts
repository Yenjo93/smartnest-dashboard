// SmartNest 2.0: a deeper, warmer look on top of the same dashboard. Everything here is CSS custom properties the
// panel sets on itself, so every card in every shadow root picks it up without knowing about it.
import type { DashboardConfig, Hass } from "./types";
import { dashboardEntities } from "./chips";

export type Material = "none" | "marble" | "wood" | "sand" | "olive";

/** A faint film grain, like printed paper: tiles seamlessly. */
const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
)}")`;

const svgUrl = (body: string) => `url("data:image/svg+xml,${encodeURIComponent(body)}")`;

/** Surfaces drawn with SVG noise: no image files to ship. */
function materialImage(m: Material, dark: boolean): string {
  switch (m) {
    case "marble":
      return svgUrl(
        `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='900'><filter id='m'><feTurbulence type='turbulence' baseFrequency='.004 .012' numOctaves='5' seed='7'/><feColorMatrix values='${
          dark ? "0 0 0 0 .55 0 0 0 0 .55 0 0 0 0 .58 0 0 0 -1.6 1.15" : "0 0 0 0 .62 0 0 0 0 .6 0 0 0 0 .56 0 0 0 -1.8 1.1"
        }'/></filter><rect width='100%' height='100%' filter='url(#m)'/></svg>`
      );
    case "wood":
      return svgUrl(
        `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='400'><filter id='w'><feTurbulence type='fractalNoise' baseFrequency='.002 .06' numOctaves='4' seed='3'/><feColorMatrix values='${
          dark ? "0 0 0 0 .32 0 0 0 0 .2 0 0 0 0 .11 0 0 0 .9 0" : "0 0 0 0 .55 0 0 0 0 .36 0 0 0 0 .2 0 0 0 .38 0"
        }'/></filter><rect width='100%' height='100%' filter='url(#w)'/></svg>`
      );
    case "sand":
      return svgUrl(
        `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><filter id='s'><feTurbulence type='fractalNoise' baseFrequency='.012 .03' numOctaves='3' seed='11'/><feColorMatrix values='${
          dark ? "0 0 0 0 .45 0 0 0 0 .33 0 0 0 0 .2 0 0 0 .5 0" : "0 0 0 0 .85 0 0 0 0 .68 0 0 0 0 .45 0 0 0 .35 0"
        }'/></filter><rect width='100%' height='100%' filter='url(#s)'/></svg>`
      );
    case "olive":
      return svgUrl(
        `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'><filter id='o'><feTurbulence type='fractalNoise' baseFrequency='.006' numOctaves='4' seed='5'/><feColorMatrix values='${
          dark ? "0 0 0 0 .2 0 0 0 0 .27 0 0 0 0 .14 0 0 0 .8 0" : "0 0 0 0 .42 0 0 0 0 .5 0 0 0 0 .3 0 0 0 .3 0"
        }'/></filter><rect width='100%' height='100%' filter='url(#o)'/></svg>`
      );
    default:
      return "none";
  }
}

/**
 * The colour the house is lit in right now: the lights on the dashboard that are on, mixed by brightness.
 * Undefined when everything's off, so the background falls back to the accent.
 */
export function ambientColor(hass: Hass, config: DashboardConfig): string | undefined {
  let r = 0, g = 0, b = 0, w = 0;
  for (const id of dashboardEntities(config)) {
    const e = hass.states[id];
    if (!e || !id.startsWith("light.") || e.state !== "on") continue;
    const weight = typeof e.attributes.brightness === "number" ? e.attributes.brightness / 255 : 0.8;
    const [lr, lg, lb] = Array.isArray(e.attributes.rgb_color) ? e.attributes.rgb_color : [255, 190, 120];
    r += lr * weight;
    g += lg * weight;
    b += lb * weight;
    w += weight;
  }
  if (!w) return undefined;
  return `rgb(${Math.round(r / w)}, ${Math.round(g / w)}, ${Math.round(b / w)})`;
}

/** Custom properties for the 2.0 look. Classic gets values that switch every effect off. */
export function proVars(on: boolean, dark: boolean, midnight: boolean, material: Material, ambient: string | undefined, accent: string): Record<string, string> {
  if (!on)
    return {
      "--sheen": "none",
      "--grain": "none",
      "--material": "none",
      "--leak-opacity": "0",
      "--duo-on": "none",
      "--mono-on": "block",
      "--idle-opacity": "1",
      "--card-radius": "var(--r-lg)",
      "--font-display": "var(--font)",
      "--on-glow": "0%",
      "--display-weight": "700",
      "--display-track": "0",
    };
  const glow = ambient ?? accent;
  return {
    // A soft light that follows the finger (or the tablet's tilt) across every card at once.
    "--sheen": `radial-gradient(520px circle at var(--lx, 30%) var(--ly, 0%), rgba(255,255,255,${dark ? 0.09 : 0.32}), transparent 46%)`,
    "--grain": GRAIN,
    "--grain-opacity": dark ? "0.07" : "0.05",
    "--material": materialImage(material, dark),
    "--leak": glow,
    "--leak-opacity": midnight ? "0.22" : dark ? "0.32" : "0.4",
    "--bg-glow": `color-mix(in srgb, ${glow} ${dark ? 18 : 22}%, transparent)`,
    "--glass-edge": dark
      ? "inset 0 1px 0 rgba(255,255,255,.12), inset 0 -18px 30px -24px rgba(0,0,0,.45)"
      : "inset 0 1px 0 rgba(255,255,255,.95), inset 0 -16px 28px -22px rgba(30,37,43,.10)",
    "--shadow": dark
      ? "0 1px 0 rgba(255,255,255,.04) inset, 0 2px 6px rgba(0,0,0,.35), 0 22px 50px -12px rgba(0,0,0,.6)"
      : "0 1px 2px rgba(30,37,43,.06), 0 4px 10px rgba(30,37,43,.05), 0 24px 48px -16px rgba(30,37,43,.18)",
    "--duo-on": "block",
    "--mono-on": "none",
    // Midnight: what's off steps back, what's on glows.
    "--idle-opacity": midnight ? "0.42" : "1",
    "--card-radius": "28px",
    "--font-display": `"Rubik", var(--font)`,
    // Lit tiles throw their colour onto the wall behind them.
    "--on-glow": midnight ? "75%" : "55%",
    // Big numbers: heavier and tighter, like a watch face.
    "--display-weight": "800",
    "--display-track": "-0.03em",
  };
}

/** Pure black for OLED walls, warm amber text, nothing bright except what's on. */
export function midnightVars(): Record<string, string> {
  return {
    "--bg": "#000000",
    "--surface": "rgba(16,14,12,.78)",
    "--surface-solid": "#0d0c0b",
    "--surface-2": "#171512",
    "--surface-hover": "rgba(30,26,22,.9)",
    "--text": "#f6e7cf",
    "--text-2": "#8f7f69",
    "--border": "rgba(246,231,207,.07)",
    "--accent-text": "#f0b45c",
    "color-scheme": "dark",
  };
}

/** Moves the light: pointer on desktops, tilt on tablets that report it. Returns a stop function. */
export function followLight(host: HTMLElement): () => void {
  let frame = 0;
  const set = (x: number, y: number) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      host.style.setProperty("--lx", `${x}px`);
      host.style.setProperty("--ly", `${y}px`);
    });
  };
  const onMove = (e: PointerEvent) => set(e.clientX, e.clientY);
  const onTilt = (e: DeviceOrientationEvent) => {
    if (e.beta == null || e.gamma == null) return;
    set(innerWidth * (0.5 + Math.max(-30, Math.min(30, e.gamma)) / 60), innerHeight * (0.2 + Math.max(-30, Math.min(30, e.beta - 45)) / 90));
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("deviceorientation", onTilt);
  return () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("deviceorientation", onTilt);
    cancelAnimationFrame(frame);
  };
}

/** Lets --leak fade from colour to colour (registered once per page). */
export function registerAnimatedVars() {
  const css = (window as any).CSS;
  if (!css?.registerProperty) return;
  for (const name of ["--leak"]) {
    try {
      css.registerProperty({ name, syntax: "<color>", inherits: true, initialValue: "transparent" });
    } catch {
      /* already registered */
    }
  }
}
