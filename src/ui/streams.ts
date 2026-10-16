/**
 * Live camera streams share a small budget. On the house network the browser talks to Home Assistant over HTTP/1.1,
 * which allows about six connections at once: a live stream holds one for as long as it plays. More than four and
 * the dashboard's own requests (pictures, history) would queue behind them. Cameras past the budget show a fresh
 * still every two seconds instead, and go live as soon as a slot frees up.
 */
const MAX = 4;
const holders = new Set<object>();
const waiting = new Map<object, () => void>();

export function takeStream(owner: object, onFree: () => void): boolean {
  if (holders.has(owner)) return true;
  if (holders.size < MAX) {
    holders.add(owner);
    waiting.delete(owner);
    return true;
  }
  waiting.set(owner, onFree);
  return false;
}

export function freeStream(owner: object) {
  waiting.delete(owner);
  if (!holders.delete(owner)) return;
  const [next] = waiting.entries();
  if (next) {
    waiting.delete(next[0]);
    next[1]();
  }
}
