/**
 * One feel per kind of touch, so the house "answers" consistently: a soft tick for a detent, a firmer tap for a
 * switch, a double pulse for success, a longer buzz for something that needs care. Android tablets and phones;
 * iOS browsers don't allow vibration, so there it's silent.
 */
export type Haptic = "tick" | "tap" | "on" | "off" | "press" | "success" | "warn";

const PATTERNS: Record<Haptic, number | number[]> = {
  tick: 3,
  tap: 6,
  on: [8, 30, 4],
  off: 5,
  press: 10,
  success: [6, 50, 10],
  warn: [20, 60, 20],
};

let enabled = true;
export const setHaptics = (on: boolean) => (enabled = on);

export function haptic(kind: Haptic) {
  if (enabled) navigator.vibrate?.(PATTERNS[kind]);
}
