/**
 * A real spring, as keyframes for the Web Animations API: things settle with a little life, and a flick carries its
 * speed into the motion instead of starting from rest.
 *
 * @param from start value, @param to end value, @param velocity in units per ms (a finger's speed when let go)
 */
export function spring(
  from: number,
  to: number,
  velocity = 0,
  make: (v: number) => Keyframe,
  { stiffness = 420, damping = 34, mass = 1 } = {}
): { frames: Keyframe[]; duration: number } {
  const dt = 1 / 120;
  let x = from - to;
  let v = velocity * 1000; // per second
  const out: number[] = [from];
  for (let i = 0; i < 240; i++) {
    const a = (-stiffness * x - damping * v) / mass;
    v += a * dt;
    x += v * dt;
    out.push(to + x);
    if (Math.abs(x) < 0.3 && Math.abs(v) < 4) break;
  }
  out.push(to);
  return { frames: out.map(make), duration: Math.round((out.length - 1) * dt * 1000) };
}
