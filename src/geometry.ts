// Plan geometry in percent coordinates (0..100 on both axes), the same space markers live in.
export type Pt = [number, number];

/** Ray casting: is the point inside the polygon? */
export function inside([x, y]: Pt, poly: Pt[]): boolean {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

/** Area-weighted centre, for placing a room's label. Falls back to the vertex average for degenerate shapes. */
export function centroid(poly: Pt[]): Pt {
  let a = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const f = poly[j][0] * poly[i][1] - poly[i][0] * poly[j][1];
    a += f;
    cx += (poly[j][0] + poly[i][0]) * f;
    cy += (poly[j][1] + poly[i][1]) * f;
  }
  if (Math.abs(a) < 1e-6) return [poly.reduce((s, p) => s + p[0], 0) / poly.length, poly.reduce((s, p) => s + p[1], 0) / poly.length];
  return [cx / (3 * a), cy / (3 * a)];
}

/** Snaps to a nearby corner of another room so neighbouring rooms share walls cleanly. */
export function snap(p: Pt, corners: Pt[], within = 1.6): Pt {
  let best: Pt | undefined;
  let bestD = within;
  for (const c of corners) {
    const d = Math.hypot(c[0] - p[0], c[1] - p[1]);
    if (d < bestD) {
      bestD = d;
      best = c;
    }
  }
  return best ? [best[0], best[1]] : [Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10];
}

export const clipPath = (poly: Pt[]) => `polygon(${poly.map(([x, y]) => `${x}% ${y}%`).join(",")})`;
