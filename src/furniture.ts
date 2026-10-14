// Furniture for drawn plans, as quiet line drawings like the demo plan: grey strokes, no fills, readable on light and
// dark. Each piece draws itself in a w × h box (plan units: a 1200-wide plan, so roughly 1 unit = 1 cm on a 12 m
// house). Sizes are typical; every piece can be resized and turned.

export type FurnitureKind =
  | "sofa" | "sofa_l" | "armchair" | "coffee" | "tv" | "dining" | "round_table" | "bed2" | "bed1" | "wardrobe" | "desk"
  | "toilet" | "basin" | "bath" | "shower" | "counter" | "stove" | "fridge" | "ksink" | "washer" | "plant" | "stairs" | "car" | "rug"
  | "nightstand" | "dresser" | "bookshelf" | "chair" | "crib" | "bunk" | "island" | "dishwasher" | "oven" | "bidet" | "basin2"
  | "jacuzzi" | "dryer" | "ac" | "boiler" | "fireplace" | "piano" | "tree" | "pool" | "bbq" | "outdoor" | "shoes" | "mirror";

export interface FurnitureDef {
  w: number;
  h: number;
  group: "living" | "sleep" | "bath" | "kitchen" | "other";
  draw: (w: number, h: number) => string;
}

const r = (x: number, y: number, w: number, h: number, rx = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
const c = (x: number, y: number, rad: number) => `<circle cx="${x}" cy="${y}" r="${rad}"/>`;
const l = (x1: number, y1: number, x2: number, y2: number) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
const e = (x: number, y: number, rx: number, ry: number) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/>`;

/** Chairs along a table's sides, as small rounded squares. */
const chairs = (w: number, h: number, tx: number, ty: number, tw: number, th: number) => {
  const s = Math.min(38, tw / 4);
  const n = Math.max(1, Math.round(tw / 70));
  let out = "";
  for (let i = 0; i < n; i++) {
    const x = tx + ((i + 0.5) * tw) / n - s / 2;
    out += r(x, ty - s - 4, s, s, 6) + r(x, ty + th + 4, s, s, 6);
  }
  return out + r(tx - s - 4, ty + th / 2 - s / 2, s, s, 6) + r(tx + tw + 4, ty + th / 2 - s / 2, s, s, 6);
};

export const FURNITURE: Record<FurnitureKind, FurnitureDef> = {
  sofa: {
    w: 210, h: 90, group: "living",
    draw: (w, h) => r(0, 0, w, h, 10) + r(0, 0, w, h * 0.28, 8) + r(0, 0, w * 0.1, h, 8) + r(w * 0.9, 0, w * 0.1, h, 8) + l(w / 2, h * 0.28, w / 2, h),
  },
  sofa_l: {
    w: 260, h: 180, group: "living",
    draw: (w, h) => `<path d="M0 0 H${w} V${h * 0.5} H${w * 0.38} V${h} H0 Z" stroke-linejoin="round"/>` + `<path d="M0 ${h * 0.16} H${w}" />` + l(w * 0.16, h * 0.16, w * 0.16, h) + l(w * 0.38, h * 0.16, w * 0.38, h * 0.5) + l(w * 0.69, h * 0.16, w * 0.69, h * 0.5),
  },
  armchair: { w: 85, h: 85, group: "living", draw: (w, h) => r(0, 0, w, h, 12) + r(w * 0.15, h * 0.28, w * 0.7, h * 0.72, 8) },
  coffee: { w: 110, h: 60, group: "living", draw: (w, h) => r(0, 0, w, h, 10) + r(8, 8, w - 16, h - 16, 6) },
  tv: { w: 150, h: 14, group: "living", draw: (w, h) => r(0, 0, w, h, 3) + l(w * 0.3, h + 6, w * 0.7, h + 6) },
  rug: { w: 240, h: 170, group: "living", draw: (w, h) => `<rect x="0" y="0" width="${w}" height="${h}" rx="6" stroke-dasharray="6 6" fill-opacity=".06" stroke-opacity=".6"/>` },
  dining: { w: 170, h: 95, group: "living", draw: (w, h) => r(0, 0, w, h, 8) + chairs(w, h, 0, 0, w, h) },
  round_table: { w: 110, h: 110, group: "living", draw: (w, h) => e(w / 2, h / 2, w / 2, h / 2) + [0, 1, 2, 3].map((i) => c(w / 2 + Math.cos(i * 1.5708) * (w / 2 + 22), h / 2 + Math.sin(i * 1.5708) * (h / 2 + 22), 16)).join("") },
  bed2: {
    w: 165, h: 205, group: "sleep",
    draw: (w, h) => r(0, 0, w, h, 6) + r(w * 0.07, h * 0.05, w * 0.38, h * 0.14, 8) + r(w * 0.55, h * 0.05, w * 0.38, h * 0.14, 8) + l(0, h * 0.3, w, h * 0.3) + `<path d="M0 ${h * 0.3} L${w * 0.25} ${h * 0.42}"/>`,
  },
  bed1: { w: 95, h: 200, group: "sleep", draw: (w, h) => r(0, 0, w, h, 6) + r(w * 0.12, h * 0.05, w * 0.76, h * 0.14, 8) + l(0, h * 0.3, w, h * 0.3) },
  wardrobe: { w: 200, h: 62, group: "sleep", draw: (w, h) => r(0, 0, w, h, 2) + l(w / 2, 0, w / 2, h) + l(0, h, w / 2, 0) + l(w / 2, h, w, 0) },
  desk: { w: 140, h: 70, group: "other", draw: (w, h) => r(0, 0, w, h, 4) + c(w / 2, h + 26, 20) },
  toilet: { w: 42, h: 68, group: "bath", draw: (w, h) => r(0, 0, w, h * 0.28, 4) + e(w / 2, h * 0.63, w * 0.44, h * 0.35) },
  basin: { w: 60, h: 46, group: "bath", draw: (w, h) => r(0, 0, w, h, 6) + e(w / 2, h * 0.55, w * 0.32, h * 0.3) + c(w / 2, h * 0.16, 2.5) },
  bath: { w: 170, h: 75, group: "bath", draw: (w, h) => r(0, 0, w, h, 10) + r(8, 8, w - 16, h - 16, 26) + c(w - 26, h / 2, 4) },
  shower: { w: 90, h: 90, group: "bath", draw: (w, h) => r(0, 0, w, h, 4) + l(0, 0, w, h) + l(w, 0, 0, h) + c(w / 2, h / 2, 6) },
  counter: { w: 240, h: 60, group: "kitchen", draw: (w, h) => r(0, 0, w, h, 2) + l(0, h * 0.85, w, h * 0.85) },
  stove: { w: 60, h: 60, group: "kitchen", draw: (w, h) => r(0, 0, w, h, 4) + c(w * 0.3, h * 0.3, w * 0.13) + c(w * 0.7, h * 0.3, w * 0.13) + c(w * 0.3, h * 0.7, w * 0.13) + c(w * 0.7, h * 0.7, w * 0.13) },
  ksink: { w: 90, h: 55, group: "kitchen", draw: (w, h) => r(0, 0, w, h, 4) + r(6, 8, w * 0.42, h - 16, 6) + r(w * 0.52, 8, w * 0.42, h - 16, 6) + c(w / 2, 6, 3) },
  fridge: { w: 72, h: 70, group: "kitchen", draw: (w, h) => r(0, 0, w, h, 4) + l(0, h * 0.82, w, h * 0.82) + l(w * 0.5, h * 0.82, w * 0.5, h) },
  washer: { w: 60, h: 60, group: "other", draw: (w, h) => r(0, 0, w, h, 4) + c(w / 2, h * 0.55, w * 0.3) + l(6, h * 0.16, w * 0.4, h * 0.16) },
  plant: { w: 44, h: 44, group: "other", draw: (w, h) => c(w / 2, h / 2, w / 2) + [0, 1, 2, 3, 4].map((i) => l(w / 2, h / 2, w / 2 + Math.cos(i * 1.2566) * w * 0.42, h / 2 + Math.sin(i * 1.2566) * h * 0.42)).join("") },
  stairs: {
    w: 100, h: 260, group: "other",
    draw: (w, h) => r(0, 0, w, h, 2) + Array.from({ length: 9 }, (_, i) => l(0, ((i + 1) * h) / 10, w, ((i + 1) * h) / 10)).join("") + `<path d="M${w / 2} ${h * 0.9} V${h * 0.12} M${w / 2 - 10} ${h * 0.2} L${w / 2} ${h * 0.12} L${w / 2 + 10} ${h * 0.2}"/>`,
  },
  nightstand: { w: 45, h: 40, group: "sleep", draw: (w, h) => r(0, 0, w, h, 3) + c(w / 2, h / 2, Math.min(w, h) * 0.25) },
  dresser: { w: 120, h: 50, group: "sleep", draw: (w, h) => r(0, 0, w, h, 3) + l(w / 3, 0, w / 3, h) + l((2 * w) / 3, 0, (2 * w) / 3, h) },
  bookshelf: { w: 100, h: 35, group: "living", draw: (w, h) => r(0, 0, w, h, 2) + Array.from({ length: 5 }, (_, i) => l(((i + 1) * w) / 6, 4, ((i + 1) * w) / 6, h - 4)).join("") },
  chair: { w: 48, h: 48, group: "living", draw: (w, h) => r(0, h * 0.2, w, h * 0.8, 8) + r(0, 0, w, h * 0.22, 6) },
  crib: { w: 70, h: 130, group: "sleep", draw: (w, h) => r(0, 0, w, h, 6) + Array.from({ length: 6 }, (_, i) => l(4, ((i + 1) * h) / 7, w - 4, ((i + 1) * h) / 7)).join("") },
  bunk: { w: 95, h: 200, group: "sleep", draw: (w, h) => r(0, 0, w, h, 6) + r(w * 0.12, h * 0.05, w * 0.76, h * 0.12, 6) + l(0, 0, w, h) + l(w, 0, 0, h) },
  island: { w: 180, h: 90, group: "kitchen", draw: (w, h) => r(0, 0, w, h, 6) + [0.2, 0.5, 0.8].map((k) => c(w * k, h + 22, 16)).join("") },
  dishwasher: { w: 60, h: 60, group: "kitchen", draw: (w, h) => r(0, 0, w, h, 4) + l(6, h * 0.2, w - 6, h * 0.2) + r(w * 0.2, h * 0.35, w * 0.6, h * 0.5, 4) },
  oven: { w: 60, h: 60, group: "kitchen", draw: (w, h) => r(0, 0, w, h, 4) + r(w * 0.12, h * 0.3, w * 0.76, h * 0.58, 4) + l(w * 0.2, h * 0.18, w * 0.8, h * 0.18) },
  bidet: { w: 38, h: 58, group: "bath", draw: (w, h) => e(w / 2, h * 0.55, w * 0.46, h * 0.42) + c(w / 2, h * 0.3, 3) },
  basin2: { w: 130, h: 50, group: "bath", draw: (w, h) => r(0, 0, w, h, 6) + e(w * 0.27, h * 0.55, w * 0.15, h * 0.3) + e(w * 0.73, h * 0.55, w * 0.15, h * 0.3) },
  jacuzzi: { w: 180, h: 180, group: "bath", draw: (w, h) => r(0, 0, w, h, 20) + e(w / 2, h / 2, w * 0.38, h * 0.38) + [0, 1, 2, 3].map((i) => c(w / 2 + Math.cos(i * 1.5708 + 0.785) * w * 0.3, h / 2 + Math.sin(i * 1.5708 + 0.785) * h * 0.3, 3)).join("") },
  dryer: { w: 60, h: 60, group: "other", draw: (w, h) => r(0, 0, w, h, 4) + c(w / 2, h * 0.55, w * 0.3) + c(w / 2, h * 0.55, w * 0.12) },
  ac: { w: 90, h: 22, group: "other", draw: (w, h) => r(0, 0, w, h, 6) + l(w * 0.1, h * 0.7, w * 0.9, h * 0.7) + `<path d="M${w * 0.3} ${h + 8} q8 6 0 12 M${w / 2} ${h + 8} q8 6 0 12 M${w * 0.7} ${h + 8} q8 6 0 12"/>` },
  boiler: { w: 55, h: 55, group: "other", draw: (w, h) => c(w / 2, h / 2, w / 2) + c(w / 2, h / 2, w * 0.15) },
  fireplace: { w: 140, h: 45, group: "living", draw: (w, h) => r(0, 0, w, h, 2) + r(w * 0.2, h * 0.25, w * 0.6, h * 0.75, 2) + `<path d="M${w / 2} ${h * 0.9} q-12 -14 0 -30 q12 16 0 30"/>` },
  piano: { w: 150, h: 60, group: "living", draw: (w, h) => r(0, 0, w, h, 4) + l(0, h * 0.62, w, h * 0.62) + Array.from({ length: 11 }, (_, i) => l(((i + 1) * w) / 12, h * 0.62, ((i + 1) * w) / 12, h)).join("") + r(w * 0.35, h + 10, w * 0.3, 18, 4) },
  tree: { w: 120, h: 120, group: "other", draw: (w, h) => `<path d="M${w / 2} 0 C${w * 0.9} ${h * 0.05} ${w} ${h * 0.45} ${w * 0.9} ${h * 0.7} C${w * 0.8} ${h} ${w * 0.2} ${h} ${w * 0.1} ${h * 0.7} C0 ${h * 0.45} ${w * 0.1} ${h * 0.05} ${w / 2} 0 Z"/>` + c(w / 2, h / 2, 6) },
  pool: { w: 400, h: 220, group: "other", draw: (w, h) => r(0, 0, w, h, 16) + r(14, 14, w - 28, h - 28, 10) + `<path d="M${w * 0.2} ${h / 2} q${w * 0.05} -12 ${w * 0.1} 0 t${w * 0.1} 0 t${w * 0.1} 0 t${w * 0.1} 0"/>` },
  bbq: { w: 80, h: 55, group: "other", draw: (w, h) => r(0, 0, w, h, 6) + Array.from({ length: 5 }, (_, i) => l(((i + 1) * w) / 6, 6, ((i + 1) * w) / 6, h - 6)).join("") },
  outdoor: { w: 120, h: 120, group: "other", draw: (w, h) => c(w / 2, h / 2, w * 0.28) + [0, 1, 2, 3].map((i) => r(w / 2 + Math.cos(i * 1.5708) * w * 0.42 - 13, h / 2 + Math.sin(i * 1.5708) * h * 0.42 - 13, 26, 26, 6)).join("") },
  shoes: { w: 90, h: 35, group: "other", draw: (w, h) => r(0, 0, w, h, 2) + l(w / 2, 0, w / 2, h) },
  mirror: { w: 80, h: 8, group: "bath", draw: (w, h) => r(0, 0, w, h, 4) + l(w * 0.1, h + 5, w * 0.9, h + 5) },
  car: {
    w: 190, h: 450, group: "other",
    draw: (w, h) => r(0, 0, w, h, 40) + `<path d="M${w * 0.12} ${h * 0.3} Q${w / 2} ${h * 0.24} ${w * 0.88} ${h * 0.3}"/>` + `<path d="M${w * 0.14} ${h * 0.78} Q${w / 2} ${h * 0.83} ${w * 0.86} ${h * 0.78}"/>` + r(w * 0.16, h * 0.34, w * 0.68, h * 0.4, 14),
  },
};

export const FURNITURE_ORDER: FurnitureKind[] = [
  "sofa", "sofa_l", "armchair", "chair", "coffee", "tv", "rug", "bookshelf", "fireplace", "piano", "dining", "round_table",
  "bed2", "bed1", "bunk", "crib", "nightstand", "dresser", "wardrobe", "desk",
  "toilet", "bidet", "basin", "basin2", "mirror", "bath", "jacuzzi", "shower",
  "counter", "island", "ksink", "stove", "oven", "dishwasher", "fridge", "washer", "dryer",
  "ac", "boiler", "shoes", "plant", "stairs", "car", "tree", "pool", "bbq", "outdoor",
];

/** One piece placed on a plan: centre in percent (like markers), size in plan units, turned in steps of 90°. */
export interface Furniture {
  id: string;
  kind: FurnitureKind;
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
}

/** The piece as SVG, centred at its spot in a W × H plan. */
export function furnitureSvg(f: Furniture, W: number, H: number): string {
  const def = FURNITURE[f.kind];
  if (!def) return "";
  const cx = (f.x / 100) * W;
  const cy = (f.y / 100) * H;
  return `<g transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${f.rot}) translate(${(-f.w / 2).toFixed(1)} ${(-f.h / 2).toFixed(1)})">${def.draw(f.w, f.h)}</g>`;
}

/** A small preview for the palette. */
export function furniturePreview(kind: FurnitureKind): string {
  const d = FURNITURE[kind];
  const pad = Math.max(d.w, d.h) * 0.18;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${d.w + pad * 2} ${d.h + pad * 2}"><g fill="none" stroke="currentColor" stroke-width="${Math.max(d.w, d.h) / 28}" stroke-linecap="round">${d.draw(d.w, d.h)}</g></svg>`;
}
