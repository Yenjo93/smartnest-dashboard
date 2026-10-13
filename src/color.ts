// Colour helpers with no imports, so any module can use them without import cycles.

/** Text on a fill must stay readable: charcoal on light fills (brand rule: never white on gold). */
export function onColor(hex: string): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.22 ? "#1E252B" : "#FFFFFF";
}

export const rgbHex = (rgb: number[]) => "#" + rgb.map((v) => v.toString(16).padStart(2, "0")).join("");

export function hsToRgb(h: number, s: number): [number, number, number] {
  // HSV with full value: what HA means by hs_color.
  const sat = s / 100;
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return Math.round(255 * (1 - sat * Math.max(0, Math.min(k, 4 - k, 1))));
  };
  return [f(5), f(3), f(1)];
}

export const rgbCss = ([r, g, b]: number[]) => `rgb(${r}, ${g}, ${b})`;
