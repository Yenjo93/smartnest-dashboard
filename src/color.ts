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

const vivid = new Map<string, Promise<string | undefined>>();

/**
 * The most vivid colour of a picture (album cover, wallpaper), as a hex. Small and cached per picture. Undefined when
 * the picture can't be read (another site without permission).
 */
export function vividColor(src: string): Promise<string | undefined> {
  let p = vivid.get(src);
  if (p) return p;
  p = new Promise((done) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const c = document.createElement("canvas");
        c.width = c.height = 32;
        const g = c.getContext("2d", { willReadFrequently: true })!;
        g.drawImage(img, 0, 0, 32, 32);
        const px = g.getImageData(0, 0, 32, 32).data;
        let best = { score: -1, rgb: [233, 151, 29] };
        for (let i = 0; i < px.length; i += 4) {
          const [r, gg, b] = [px[i], px[i + 1], px[i + 2]];
          const max = Math.max(r, gg, b);
          const min = Math.min(r, gg, b);
          const l = (max + min) / 510;
          const sat = max === min ? 0 : (max - min) / (255 - Math.abs(max + min - 255));
          const score = sat * (1 - Math.abs(l - 0.52) * 1.6);
          if (score > best.score) best = { score, rgb: [r, gg, b] };
        }
        done(`#${best.rgb.map((v) => v.toString(16).padStart(2, "0")).join("")}`);
      } catch {
        done(undefined);
      }
    };
    img.onerror = () => done(undefined);
    img.src = src;
  });
  if (vivid.size > 40) vivid.clear();
  vivid.set(src, p);
  return p;
}
