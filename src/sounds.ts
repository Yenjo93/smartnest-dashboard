// Soft UI sounds, synthesised on the spot (no audio files): a tick for on, a lower tock for off, a latch for locks,
// and three doorbell tones. Off unless the house turns them on.
let enabled = false;
let ctx: AudioContext | undefined;

export const setSounds = (on: boolean) => (enabled = on);

function audio(): AudioContext | undefined {
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") ctx.resume().catch(() => undefined);
    return ctx;
  } catch {
    return undefined;
  }
}

function tone(freq: number, at: number, dur: number, gain: number, type: OscillatorType = "sine", slideTo?: number) {
  const ac = audio();
  if (!ac) return;
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = type;
  const t0 = ac.currentTime + at;
  o.frequency.setValueAtTime(freq, t0);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(ac.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
}

export type UiSound = "on" | "off" | "lock" | "unlock" | "tap";

export function playUi(kind: UiSound) {
  if (!enabled) return;
  switch (kind) {
    case "on":
      return tone(880, 0, 0.09, 0.05, "sine", 1320);
    case "off":
      return tone(660, 0, 0.09, 0.045, "sine", 440);
    case "tap":
      return tone(1200, 0, 0.03, 0.025, "triangle");
    case "lock":
      tone(300, 0, 0.05, 0.08, "square", 180);
      return tone(1400, 0.06, 0.05, 0.04, "triangle");
    case "unlock":
      tone(1400, 0, 0.05, 0.04, "triangle");
      return tone(220, 0.06, 0.06, 0.07, "square", 320);
  }
}

export type BellTone = "chime" | "dingdong" | "melody";

/** The doorbell: the classic two notes, a deep ding-dong, or a little four-note tune. */
export function playBell(kind: BellTone) {
  switch (kind) {
    case "dingdong":
      tone(784, 0, 1.1, 0.35);
      return tone(587, 0.55, 1.5, 0.35);
    case "melody":
      [659, 784, 988, 1319].forEach((f, i) => tone(f, i * 0.18, 0.7, 0.25));
      return;
    default:
      tone(659.25, 0, 1.2, 0.35);
      return tone(523.25, 0.45, 1.2, 0.35);
  }
}
