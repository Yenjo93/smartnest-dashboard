/**
 * Finds the rooms in a floor plan image, so the installer doesn't have to trace them by hand.
 *
 * Works on the plans phone apps export (Magicplan, RoomPlan, Floor Plan Creator…): thick dark walls, each room
 * filled with a light tint. Pixels that are tinted are floor; dark lines, white gaps and furniture strokes are not.
 * Neighbouring floor of the same tint is one room, so open-plan spaces still split where the colour changes.
 */
import { inside, type Pt } from "./geometry";

export interface FoundRoom {
  /** Outline as percentages of the image, like markers. */
  points: Pt[];
  /** A point surely inside the room, in percent. */
  center: Pt;
  /** Share of the image, 0..1. */
  size: number;
}

const WORK = 800; // working width in px: walls stay a few pixels thick, the fill stays fast
const GRID = 100; // outline grid across the width

export async function detectRooms(src: string): Promise<FoundRoom[]> {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = src;
  await img.decode();
  const W = WORK;
  const H = Math.round((img.naturalHeight / img.naturalWidth) * W);
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const g = canvas.getContext("2d", { willReadFrequently: true })!;
  g.fillStyle = "#fff";
  g.fillRect(0, 0, W, H);
  g.drawImage(img, 0, 0, W, H);
  return findRooms(g.getImageData(0, 0, W, H));
}

export function findRooms(data: ImageData): FoundRoom[] {
  const { width: W, height: H } = data;
  const px = data.data;
  const N = W * H;

  // 1. Floor = tinted pixels. White (outside, door gaps) and anything dark (walls, lines, text) is not.
  let floor = new Uint8Array(N);
  const wall = new Uint8Array(N);
  for (let i = 0; i < N; i++) {
    const r = px[i * 4], gg = px[i * 4 + 1], b = px[i * 4 + 2];
    const lo = Math.min(r, gg, b);
    const hi = Math.max(r, gg, b);
    if (lo < 150) wall[i] = 1;
    else if (lo >= 200 && lo < 251 && hi - lo >= 3) floor[i] = 1;
  }
  // Close thin strokes (dimension lines, furniture outlines) so a room isn't cut into strips. Walls stay walls.
  floor = erode(dilate(floor, W, H, 2), W, H, 2);
  for (let i = 0; i < N; i++) if (wall[i]) floor[i] = 0;

  // 2. Grow regions of the same tint.
  const label = new Int32Array(N).fill(-1);
  const regions: { n: number; sx: number; sy: number; minX: number; minY: number; maxX: number; maxY: number }[] = [];
  const stack = new Int32Array(N);
  for (let seed = 0; seed < N; seed++) {
    if (!floor[seed] || label[seed] >= 0) continue;
    const id = regions.length;
    let mr = px[seed * 4], mg = px[seed * 4 + 1], mb = px[seed * 4 + 2];
    const reg = { n: 0, sx: 0, sy: 0, minX: W, minY: H, maxX: 0, maxY: 0 };
    let sp = 0;
    stack[sp++] = seed;
    label[seed] = id;
    while (sp) {
      const i = stack[--sp];
      const x = i % W, y = (i / W) | 0;
      reg.n++;
      reg.sx += x;
      reg.sy += y;
      if (x < reg.minX) reg.minX = x;
      if (x > reg.maxX) reg.maxX = x;
      if (y < reg.minY) reg.minY = y;
      if (y > reg.maxY) reg.maxY = y;
      // Running mean colour: compare to the room's tint, not the neighbour's, so the fill can't drift.
      const k = 1 / reg.n;
      mr += (px[i * 4] - mr) * k;
      mg += (px[i * 4 + 1] - mg) * k;
      mb += (px[i * 4 + 2] - mb) * k;
      const nb = [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, y > 0 ? i - W : -1, y < H - 1 ? i + W : -1];
      for (const j of nb) {
        if (j < 0 || !floor[j] || label[j] >= 0) continue;
        if (tintDistance(px, j, mr, mg, mb) > 9) continue;
        label[j] = id;
        stack[sp++] = j;
      }
    }
    regions.push(reg);
  }

  // 3. Rooms stop short of white cabinets, wardrobes and sofas. Let every room grow over those (but never through
  //    a wall, and not out of the front door) until it meets a wall or a neighbour.
  const minPx = N * 0.0025;
  const keep = regions.map((r) => r.n >= minPx);
  const outside = new Uint8Array(N);
  {
    const st: number[] = [];
    for (let x = 0; x < W; x++) st.push(x, (H - 1) * W + x);
    for (let y = 0; y < H; y++) st.push(y * W, y * W + W - 1);
    while (st.length) {
      const i = st.pop()!;
      if (outside[i]) continue;
      const lo = Math.min(px[i * 4], px[i * 4 + 1], px[i * 4 + 2]);
      if (lo < 250 && label[i] < 0) continue; // only bare white paper is outside
      if (label[i] >= 0 && keep[label[i]]) continue;
      outside[i] = 1;
      const x = i % W, y = (i / W) | 0;
      if (x > 0) st.push(i - 1);
      if (x < W - 1) st.push(i + 1);
      if (y > 0) st.push(i - W);
      if (y < H - 1) st.push(i + W);
    }
  }
  const reach = Math.round(W * 0.06);
  const grow = () => {
    const dist = new Uint8Array(N);
    let queue: number[] = [];
    for (let i = 0; i < N; i++)
      if (label[i] >= 0 && keep[label[i]]) {
        dist[i] = 1;
        queue.push(i);
      } else label[i] = -1;
    for (let d = 1; d <= reach && queue.length; d++) {
      const nextQ: number[] = [];
      for (const i of queue) {
        const x = i % W;
        const l = label[i];
        if (x > 0) step(i - 1, l, nextQ, dist);
        if (x < W - 1) step(i + 1, l, nextQ, dist);
        if (i >= W) step(i - W, l, nextQ, dist);
        if (i + W < N) step(i + W, l, nextQ, dist);
      }
      queue = nextQ;
    }
  };
  const step = (j: number, l: number, q: number[], dist: Uint8Array) => {
    if (dist[j] || wall[j] || outside[j]) return;
    dist[j] = 1;
    label[j] = l;
    q.push(j);
  };
  grow();

  // 4. A coloured bed, rug or table is mostly surrounded by one room; a room is mostly surrounded by walls.
  //    Fold each piece of furniture into the room around it.
  const R = regions.length;
  const counts = new Int32Array(R);
  const perim = new Int32Array(R);
  const contact = new Map<number, number>();
  for (let i = 0; i < N; i++) {
    const a = label[i];
    if (a < 0) continue;
    counts[a]++;
    const x = i % W;
    const right = x < W - 1 ? label[i + 1] : -1;
    const down = i + W < N ? label[i + W] : -1;
    const left = x > 0 ? label[i - 1] : -1;
    const up = i >= W ? label[i - W] : -1;
    if (right !== a || down !== a || left !== a || up !== a) perim[a]++;
    for (const b of [right, down]) if (b >= 0 && b !== a) {
      contact.set(a * R + b, (contact.get(a * R + b) ?? 0) + 1);
      contact.set(b * R + a, (contact.get(b * R + a) ?? 0) + 1);
    }
  }
  const parent = Array.from({ length: R }, (_, i) => i);
  const root = (i: number): number => (parent[i] === i ? i : (parent[i] = root(parent[i])));
  const order = Array.from({ length: R }, (_, i) => i).filter((i) => keep[i]).sort((a, b) => counts[a] - counts[b]);
  for (const a of order) {
    let best = -1, most = 0, any = 0;
    for (const b of order) {
      if (b === a) continue;
      const c = contact.get(a * R + b) ?? 0;
      any += c;
      if (counts[b] > counts[a] && c > most) (most = c), (best = b);
    }
    if (best >= 0 && most / Math.max(1, perim[a]) > 0.25) parent[a] = best;
    // Too small for a room, or boxed in with no doorway to anywhere: a counter or a sofa, not a room.
    else if (counts[a] < N * 0.005 || (!any && counts[a] < N * 0.02)) keep[a] = false;
  }
  for (let i = 0; i < N; i++) if (label[i] >= 0) label[i] = root(label[i]);
  for (const a of order) if (root(a) !== a) {
    const r = root(a);
    counts[r] += counts[a];
    counts[a] = 0;
    keep[a] = false;
    for (const k of ["minX", "minY"] as const) regions[r][k] = Math.min(regions[r][k], regions[a][k]);
    for (const k of ["maxX", "maxY"] as const) regions[r][k] = Math.max(regions[r][k], regions[a][k]);
  }
  // Rooms take over the counters and sofas that were dropped.
  grow();
  counts.fill(0);
  for (let i = 0; i < N; i++) if (label[i] >= 0) counts[label[i]]++;

  // 4. Outline each room; a coloured rug or bed inside a bigger room is furniture, not a room.
  const out: FoundRoom[] = [];
  regions
    .map((reg, id) => ({ reg, id }))
    .filter(({ id }) => keep[id])
    .sort((a, b) => counts[b.id] - counts[a.id])
    .forEach(({ reg, id }) => {
      if (reg.minX <= 1 || reg.minY <= 1 || reg.maxX >= W - 2 || reg.maxY >= H - 2) return;
      const room = outline(label, id, W, H);
      if (!room) return;
      if (out.some((o) => inside(room.center, o.points))) return;
      out.push({ ...room, size: counts[id] / N });
    });
  return out;
}

/** Colour difference that weighs the tint (hue) more than brightness: pastel rooms differ mostly in hue. */
function tintDistance(px: Uint8ClampedArray, i: number, mr: number, mg: number, mb: number) {
  const r = px[i * 4], g = px[i * 4 + 1], b = px[i * 4 + 2];
  const l = (r + g + b) / 3;
  const ml = (mr + mg + mb) / 3;
  const dr = r - l - (mr - ml), dg = g - l - (mg - ml), db = b - l - (mb - ml);
  return Math.hypot(dr * 2, dg * 2, db * 2, (l - ml) * 0.5);
}

function dilate(m: Uint8Array, W: number, H: number, r: number) {
  return morph(m, W, H, r, 1);
}
function erode(m: Uint8Array, W: number, H: number, r: number) {
  return morph(m, W, H, r, 0);
}
/** Square structuring element, done as two 1-D passes. `hit` 1 = dilate, 0 = erode. */
function morph(m: Uint8Array, W: number, H: number, r: number, hit: 0 | 1) {
  const tmp = new Uint8Array(m.length);
  const out = new Uint8Array(m.length);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      let v = 1 - hit;
      for (let d = -r; d <= r && v !== hit; d++) {
        const xx = x + d;
        const s = xx < 0 || xx >= W ? 1 - hit : m[y * W + xx];
        if (s === hit) v = hit;
      }
      tmp[y * W + x] = v;
    }
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      let v = 1 - hit;
      for (let d = -r; d <= r && v !== hit; d++) {
        const yy = y + d;
        const s = yy < 0 || yy >= H ? 1 - hit : tmp[yy * W + x];
        if (s === hit) v = hit;
      }
      out[y * W + x] = v;
    }
  return out;
}

/** Traces a region on a coarse grid and simplifies it to a few corners. */
function outline(label: Int32Array, id: number, W: number, H: number): { points: Pt[]; center: Pt } | null {
  const cell = W / GRID;
  const gw = GRID;
  const gh = Math.max(1, Math.round(H / cell));
  const grid = new Uint8Array(gw * gh);
  for (let gy = 0; gy < gh; gy++)
    for (let gx = 0; gx < gw; gx++) {
      let hit = 0, tot = 0;
      const x0 = Math.floor(gx * cell), x1 = Math.min(W, Math.floor((gx + 1) * cell));
      const y0 = Math.floor(gy * cell), y1 = Math.min(H, Math.floor((gy + 1) * cell));
      for (let y = y0; y < y1; y++)
        for (let x = x0; x < x1; x++) {
          tot++;
          if (label[y * W + x] === id) hit++;
        }
      // Generous: the room's floor stops short of the wall, and furniture punches holes in it.
      grid[gy * gw + gx] = tot && hit / tot > 0.25 ? 1 : 0;
    }
  // Grow by one cell so the outline reaches the middle of the wall, then fill holes (furniture, labels).
  const grown = morph(grid, gw, gh, 1, 1);
  const filled = fillHoles(morph(grown, gw, gh, 1, 0).map((v, i) => v | grid[i]) as Uint8Array, gw, gh);
  const loop = trace(filled, gw, gh);
  if (!loop || loop.length < 4) return null;
  const simple = squareUp(rdp(loop, 1.2));
  if (simple.length < 3) return null;
  const sx = 100 / gw, sy = 100 / gh;
  const points = simple.map(([x, y]) => [round(x * sx), round(y * sy)] as Pt);
  return { points, center: insidePoint(filled, gw, gh, sx, sy) };
}

const round = (v: number) => Math.round(v * 10) / 10;

function fillHoles(m: Uint8Array, W: number, H: number) {
  const outside = new Uint8Array(m.length);
  const stack: number[] = [];
  for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
  for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
  while (stack.length) {
    const i = stack.pop()!;
    if (outside[i] || m[i]) continue;
    outside[i] = 1;
    const x = i % W, y = (i / W) | 0;
    if (x > 0) stack.push(i - 1);
    if (x < W - 1) stack.push(i + 1);
    if (y > 0) stack.push(i - W);
    if (y < H - 1) stack.push(i + W);
  }
  return outside.map((o) => (o ? 0 : 1)) as Uint8Array;
}

/** Outer boundary of the biggest blob, as grid-corner coordinates walking clockwise. */
function trace(m: Uint8Array, W: number, H: number): Pt[] | null {
  const at = (x: number, y: number) => (x >= 0 && y >= 0 && x < W && y < H ? m[y * W + x] : 0);
  // Directed boundary edges keyed by start corner; the cell is always on the right.
  const next = new Map<string, Pt[]>();
  const add = (a: Pt, b: Pt) => {
    const k = `${a[0]},${a[1]}`;
    (next.get(k) ?? next.set(k, []).get(k)!).push(b);
  };
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      if (!at(x, y)) continue;
      if (!at(x, y - 1)) add([x, y], [x + 1, y]);
      if (!at(x + 1, y)) add([x + 1, y], [x + 1, y + 1]);
      if (!at(x, y + 1)) add([x + 1, y + 1], [x, y + 1]);
      if (!at(x - 1, y)) add([x, y + 1], [x, y]);
    }
  let best: Pt[] | null = null;
  while (next.size) {
    const [k0, list0] = next.entries().next().value!;
    const start = k0.split(",").map(Number) as Pt;
    const loop: Pt[] = [start];
    let cur = list0.pop()!;
    if (!list0.length) next.delete(k0);
    let guard = 0;
    while ((cur[0] !== start[0] || cur[1] !== start[1]) && guard++ < 100000) {
      loop.push(cur);
      const k = `${cur[0]},${cur[1]}`;
      const list = next.get(k);
      if (!list) break;
      const n = list.pop()!;
      if (!list.length) next.delete(k);
      cur = n;
    }
    if (!best || loop.length > best.length) best = loop;
  }
  return best;
}

/** Ramer–Douglas–Peucker on a closed loop. */
function rdp(loop: Pt[], eps: number): Pt[] {
  // Split the loop at its two farthest-apart corners and simplify each half.
  let a = 0, b = 0, far = -1;
  for (let i = 0; i < loop.length; i++) {
    const d = Math.hypot(loop[i][0] - loop[0][0], loop[i][1] - loop[0][1]);
    if (d > far) (far = d), (b = i);
  }
  const half1 = simplify(loop.slice(a, b + 1), eps);
  const half2 = simplify([...loop.slice(b), loop[0]], eps);
  return [...half1.slice(0, -1), ...half2.slice(0, -1)];
}

function simplify(pts: Pt[], eps: number): Pt[] {
  if (pts.length < 3) return pts;
  const [x1, y1] = pts[0];
  const [x2, y2] = pts[pts.length - 1];
  const len = Math.hypot(x2 - x1, y2 - y1) || 1;
  let idx = 0, max = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs((y2 - y1) * pts[i][0] - (x2 - x1) * pts[i][1] + x2 * y1 - y2 * x1) / len;
    if (d > max) (max = d), (idx = i);
  }
  if (max <= eps) return [pts[0], pts[pts.length - 1]];
  return [...simplify(pts.slice(0, idx + 1), eps).slice(0, -1), ...simplify(pts.slice(idx), eps)];
}

/** Plans are drawn square: nudge almost-straight edges to exactly straight, and drop corners that end up in line. */
function squareUp(pts: Pt[]): Pt[] {
  const p = pts.map((q) => [...q] as Pt);
  for (let pass = 0; pass < 2; pass++)
    for (let i = 0; i < p.length; i++) {
      const a = p[i], b = p[(i + 1) % p.length];
      const dx = b[0] - a[0], dy = b[1] - a[1];
      if (Math.abs(dy) <= Math.abs(dx) * 0.2) b[1] = a[1];
      else if (Math.abs(dx) <= Math.abs(dy) * 0.2) b[0] = a[0];
    }
  return p.filter((q, i) => {
    const a = p[(i - 1 + p.length) % p.length], b = p[(i + 1) % p.length];
    if (q[0] === a[0] && q[1] === a[1]) return false;
    return !((a[0] === q[0] && q[0] === b[0]) || (a[1] === q[1] && q[1] === b[1]));
  });
}

/** The cell deepest inside the room, so a label or marker placed there is clear of the walls. */
function insidePoint(m: Uint8Array, W: number, H: number, sx: number, sy: number): Pt {
  const dist = new Int32Array(m.length);
  let best = 0, bi = 0;
  // Two-pass chessboard distance transform.
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      if (!m[i]) continue;
      dist[i] = 1 + Math.min(x ? dist[i - 1] : 0, y ? dist[i - W] : 0, x && y ? dist[i - W - 1] : 0, y && x < W - 1 ? dist[i - W + 1] : 0);
    }
  for (let y = H - 1; y >= 0; y--)
    for (let x = W - 1; x >= 0; x--) {
      const i = y * W + x;
      if (!m[i]) continue;
      dist[i] = Math.min(dist[i], 1 + Math.min(x < W - 1 ? dist[i + 1] : 0, y < H - 1 ? dist[i + W] : 0, x < W - 1 && y < H - 1 ? dist[i + W + 1] : 0, y < H - 1 && x ? dist[i + W - 1] : 0));
      if (dist[i] > best) (best = dist[i]), (bi = i);
    }
  return [round(((bi % W) + 0.5) * sx), round((((bi / W) | 0) + 0.5) * sy)];
}
