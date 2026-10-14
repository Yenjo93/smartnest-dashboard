import type { Door, Floor, Room, RoomKind } from "./types";
import { furnitureSvg } from "./furniture";

/** A room's floor from its name when nobody chose one: tiles in wet rooms, wood where people live, open air outside. */
export function guessKind(name: string): RoomKind {
  const n = name.toLowerCase();
  if (/حمام|مطبخ|غسيل|bath|wc|toilet|shower|kitchen|laundry|מקלחת|מטבח|שירותים|כביסה/.test(n)) return "tile";
  if (/حديق|جنين|بلكون|شرف|ساح|حوش|garden|yard|balcony|terrace|patio|גינה|מרפסת|חצר/.test(n)) return "outdoor";
  if (/ممر|مدخل|كوريدور|hall|corridor|entry|מסדרון|כניסה/.test(n)) return "plain";
  return "wood";
}

const nearestEdge = (rooms: Room[], x: number, y: number) => {
  let best: { a: [number, number]; b: [number, number]; d: number } | undefined;
  for (const r of rooms)
    for (let i = 0; i < r.points.length; i++) {
      const a = r.points[i];
      const b = r.points[(i + 1) % r.points.length];
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy || 1)));
      const d = Math.hypot(a[0] + t * dx - x, a[1] + t * dy - y);
      if (!best || d < best.d) best = { a, b, d };
    }
  return best;
};

/**
 * A clean plan picture from room outlines, in the demo's style: grey walls, a faint wood or tile floor, door gaps
 * with their swing. Neutral greys so it reads on light and dark themes. Coordinates are the same percentages as
 * markers, so devices already placed stay where they are.
 */
export function planSvg(rooms: Room[], doors: Door[] = [], w = 1200, h = 800, extra: Pick<Floor, "openings" | "furniture"> = {}): string {
  const X = (p: number) => ((p / 100) * w).toFixed(1);
  const Y = (p: number) => ((p / 100) * h).toFixed(1);
  const wall = Math.max(8, Math.round(w / 100));
  const pts = (r: Room) => r.points.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ");
  const fill: Record<RoomKind, string> = { wood: "url(#wood)", tile: "url(#tile)", plain: "none", outdoor: "url(#grass)" };
  const floors = rooms
    .map((r) => {
      const k = r.kind ?? guessKind(r.name);
      return `<polygon points="${pts(r)}" fill="#9AA4AD" fill-opacity="${k === "outdoor" ? 0.06 : 0.13}"/>${fill[k] !== "none" ? `<polygon points="${pts(r)}" fill="${fill[k]}"/>` : ""}`;
    })
    .join("");
  // Door openings: cut out of the walls (mask), then a thin leaf and its quarter-circle swing.
  const open = (w * 3.4) / 100; // about 85 cm on a 12 m plan
  const holes: string[] = [];
  const leaves: string[] = [];
  for (const d of doors) {
    const e = nearestEdge(rooms, d.x, d.y);
    if (!e) continue;
    const ang = Math.atan2(((e.b[1] - e.a[1]) / 100) * h, ((e.b[0] - e.a[0]) / 100) * w);
    const cx = (d.x / 100) * w;
    const cy = (d.y / 100) * h;
    const deg = (ang * 180) / Math.PI;
    holes.push(`<rect x="${(cx - open / 2).toFixed(1)}" y="${(cy - wall).toFixed(1)}" width="${open.toFixed(1)}" height="${wall * 2}" transform="rotate(${deg.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)})" fill="#000"/>`);
    // Hinge at one end of the opening, the leaf standing open into the room, its swing back to the wall.
    const hx = cx - (Math.cos(ang) * open) / 2;
    const hy = cy - (Math.sin(ang) * open) / 2;
    const lx = hx + Math.cos(ang + Math.PI / 2) * open;
    const ly = hy + Math.sin(ang + Math.PI / 2) * open;
    const ex = hx + Math.cos(ang) * open;
    const ey = hy + Math.sin(ang) * open;
    leaves.push(
      `<path d="M${hx.toFixed(1)} ${hy.toFixed(1)} L${lx.toFixed(1)} ${ly.toFixed(1)} A${open.toFixed(1)} ${open.toFixed(1)} 0 0 0 ${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke="#9AA4AD" stroke-opacity=".55" stroke-width="2"/>`
    );
  }
  // Open walls: the wall between two rooms taken out (kept at the corners), a faint dashed line where the floor changes.
  const seams: string[] = [];
  for (const o of extra.openings ?? []) {
    const [x1, y1, x2, y2] = [(o.a[0] / 100) * w, (o.a[1] / 100) * h, (o.b[0] / 100) * w, (o.b[1] / 100) * h];
    const len = Math.hypot(x2 - x1, y2 - y1) || 1;
    const ux = (x2 - x1) / len;
    const uy = (y2 - y1) / len;
    const k = wall * 0.5;
    holes.push(`<line x1="${(x1 + ux * k).toFixed(1)}" y1="${(y1 + uy * k).toFixed(1)}" x2="${(x2 - ux * k).toFixed(1)}" y2="${(y2 - uy * k).toFixed(1)}" stroke="#000" stroke-width="${(wall * 1.6).toFixed(1)}"/>`);
    seams.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#9AA4AD" stroke-opacity=".35" stroke-width="2" stroke-dasharray="8 8"/>`);
  }
  const furniture = (extra.furniture ?? []).map((f) => furnitureSvg(f, w, h)).join("");
  const inside = rooms.filter((r) => (r.kind ?? guessKind(r.name)) !== "outdoor");
  const walls = inside.map((r) => `<polygon points="${pts(r)}" fill="none"/>`).join("");
  // Balconies and gardens: a light dashed edge instead of a wall.
  const edges = rooms
    .filter((r) => (r.kind ?? guessKind(r.name)) === "outdoor")
    .map((r) => `<polygon points="${pts(r)}" fill="none" stroke="#9AA4AD" stroke-opacity=".6" stroke-width="${Math.max(2, wall / 3)}" stroke-dasharray="${wall * 1.5} ${wall}"/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<defs>
<pattern id="tile" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#9AA4AD" stroke-opacity=".2" stroke-width="1"/></pattern>
<pattern id="wood" width="60" height="14" patternUnits="userSpaceOnUse"><path d="M0 14H60M30 0V14" fill="none" stroke="#9AA4AD" stroke-opacity=".14" stroke-width="1"/></pattern>
<pattern id="grass" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="4" cy="5" r="1.2" fill="#7fae8a" fill-opacity=".35"/><circle cx="13" cy="13" r="1" fill="#7fae8a" fill-opacity=".3"/></pattern>
<mask id="doors"><rect width="${w}" height="${h}" fill="#fff"/>${holes.join("")}</mask>
</defs>
<g>${floors}</g>
<g mask="url(#doors)" stroke="#9AA4AD" stroke-width="${wall}" stroke-linejoin="miter" stroke-linecap="square">${walls}</g>
<g>${edges}</g>
<g>${seams.join("")}</g>
<g fill="none" stroke="#9AA4AD" stroke-opacity=".75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${furniture}</g>
<g>${leaves.join("")}</g>
</svg>`;
}

export const svgDataUrl = (svg: string) => `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
