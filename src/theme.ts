import { css, unsafeCSS } from "lit";
import { DEFAULT_ACCENT } from "./config";
import { onColor } from "./color";

export { onColor };

// Values come from the SmartNest design system (Smartnest SD/tokens/tokens.json).
export const BRAND = {
  charcoal950: "#151A1E",
  charcoal900: "#1E252B",
  charcoal800: "#2A333B",
  charcoal700: "#3A454F",
  charcoal600: "#55616C",
  charcoal400: "#9AA4AD",
  charcoal200: "#DFE3E6",
  cream: "#FAF7F2",
  cream200: "#F2ECE2",
  gold: "#E9971D",
  goldText: "#965A00",
  info: "#18BCF2",
  infoText: "#0A6E96",
  success: "#2FB57A",
  error: "#F26B68",
  errorText: "#C62828",
};

export function themeVars(dark: boolean, accent: string): Record<string, string> {
  const a = accent || DEFAULT_ACCENT;
  const isBrandGold = a.toUpperCase() === DEFAULT_ACCENT;
  const common = {
    "--accent": a,
    "--on-accent": onColor(a),
    "--cool": BRAND.info,
    "--on-cool": BRAND.charcoal900,
    "--alert": BRAND.error,
    "--on-alert": BRAND.charcoal900,
    "--success": BRAND.success,
  };
  if (dark)
    return {
      ...common,
      "--bg": BRAND.charcoal950,
      "--bg-glow": "rgba(233,151,29,.10)",
      "--surface": "rgba(42,51,59,.66)",
      "--surface-solid": BRAND.charcoal800,
      "--surface-2": BRAND.charcoal700,
      "--surface-hover": "rgba(58,69,79,.8)",
      "--text": "#FFFFFF",
      "--text-2": BRAND.charcoal400,
      "--border": "rgba(255,255,255,.08)",
      "--accent-text": a,
      "--alert-text": BRAND.error,
      "--scrim": "rgba(8,10,12,.55)",
      "--shadow": "0 1px 0 rgba(255,255,255,.04) inset, 0 10px 30px rgba(0,0,0,.35)",
      "--shadow-lift": "0 24px 60px rgba(0,0,0,.55)",
      "color-scheme": "dark",
    };
  return {
    ...common,
    "--bg": "#F3EFE8",
    "--bg-glow": "rgba(233,151,29,.12)",
    "--surface": "rgba(255,255,255,.72)",
    "--surface-solid": "#FFFFFF",
    "--surface-2": BRAND.cream200,
    "--surface-hover": "rgba(255,255,255,.92)",
    "--text": BRAND.charcoal900,
    "--text-2": BRAND.charcoal600,
    "--border": "rgba(30,37,43,.08)",
    // Gold #E9971D fails contrast as text on light; the brand's darker gold is used instead.
    "--accent-text": isBrandGold ? BRAND.goldText : `color-mix(in srgb, ${a} 62%, black)`,
    "--alert-text": BRAND.errorText,
    "--scrim": "rgba(30,37,43,.28)",
    "--shadow": "0 1px 2px rgba(30,37,43,.05), 0 8px 24px rgba(30,37,43,.07)",
    "--shadow-lift": "0 24px 60px rgba(30,37,43,.22)",
    "color-scheme": "light",
  };
}

export function fontFaceCss(base: string): string {
  const face = (w: number, file: string) =>
    `@font-face{font-family:"Rubik";font-weight:${w};font-display:swap;src:url("${base}fonts/${file}") format("truetype");}`;
  return [face(400, "Rubik-Regular.ttf"), face(500, "Rubik-Medium.ttf"), face(700, "Rubik-Bold.ttf"), face(800, "Rubik-ExtraBold.ttf")].join("");
}

export const ROW_H = 44;
export const GAP = 12;

export const shared = css`
  :host {
    --font: "Rubik", system-ui, -apple-system, "Segoe UI", Tahoma, sans-serif;
    --r-sm: 10px;
    --r-md: 16px;
    --r-lg: 24px;
    --r-xl: 32px;
    --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    --ease-in: cubic-bezier(0.64, 0, 0.78, 0);
    --spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
    --dur-fast: 200ms;
    --dur: 400ms;
    --row-h: ${unsafeCSS(ROW_H)}px;
    --gap: ${unsafeCSS(GAP)}px;
    font-family: var(--font);
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }
  * {
    box-sizing: border-box;
  }
  button {
    font: inherit;
    color: inherit;
    border: 0;
    background: none;
    padding: 0;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .glass {
    background: var(--surface);
    -webkit-backdrop-filter: blur(var(--glass-blur, 24px)) saturate(var(--glass-sat, 170%));
    backdrop-filter: blur(var(--glass-blur, 24px)) saturate(var(--glass-sat, 170%));
    border: 1px solid var(--border);
    box-shadow: var(--shadow), var(--glass-edge, 0 0 #0000);
  }
  .pressable {
    transition: transform var(--dur-fast) var(--ease-out), background-color var(--dur-fast) var(--ease-out),
      color var(--dur-fast) var(--ease-out);
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
  }
  .pressable:active {
    transform: scale(0.96);
  }
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 44px;
    padding: 0 18px;
    border-radius: 999px;
    font-weight: 500;
    font-size: 15px;
    background: var(--surface-2);
    color: var(--text);
    white-space: nowrap;
  }
  .btn.primary {
    background: var(--accent);
    color: var(--on-accent);
    font-weight: 700;
  }
  .btn.danger {
    background: var(--alert);
    color: var(--on-alert);
    font-weight: 700;
  }
  .btn.ghost {
    background: transparent;
  }
  .btn[disabled] {
    opacity: 0.45;
    pointer-events: none;
  }
  .icon-btn {
    display: inline-grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border-radius: 999px;
    background: var(--surface-2);
    color: var(--text);
    flex: none;
  }
  .icon-btn.small {
    width: 32px;
    height: 32px;
  }
  .icon-btn.primary {
    background: var(--accent);
    color: var(--on-accent);
  }
  .field {
    display: grid;
    gap: 6px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-2);
  }
  .field .hint {
    font-weight: 400;
    font-size: 12px;
  }
  input[type="text"],
  input[type="number"],
  input[type="time"],
  input[type="date"],
  input[type="search"],
  input[type="tel"],
  textarea,
  select {
    font: inherit;
    font-size: 16px; /* 16px stops iOS from zooming into the field */
    color: var(--text);
    background: var(--surface-2);
    border: 1px solid transparent;
    border-radius: var(--r-sm);
    min-height: 44px;
    padding: 0 12px;
    width: 100%;
    outline: none;
    transition: border-color var(--dur-fast) var(--ease-out);
  }
  textarea {
    padding: 10px 12px;
    resize: vertical;
  }
  input:focus,
  textarea:focus,
  select:focus {
    border-color: var(--accent);
  }
  .seg {
    display: inline-flex;
    padding: 3px;
    gap: 2px;
    border-radius: 999px;
    background: var(--surface-2);
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .seg::-webkit-scrollbar {
    display: none;
  }
  .seg > button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 36px;
    padding: 0 14px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-2);
    white-space: nowrap;
    transition: background-color var(--dur) var(--ease-out), color var(--dur) var(--ease-out),
      box-shadow var(--dur) var(--ease-out);
  }
  .seg > button[aria-pressed="true"] {
    background: var(--surface-solid);
    color: var(--text);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  }
  .muted {
    color: var(--text-2);
  }
  .ltr {
    direction: ltr;
    unicode-bidi: isolate;
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 1ms !important;
      transition-duration: 1ms !important;
    }
  }
`;
