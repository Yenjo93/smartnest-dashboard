/**
 * Tap vs long-press on one element. Long-press fires after 450ms (Apple Home timing feels close to this)
 * and swallows the click that follows. Moving more than 10px cancels both, so scrolling stays scrolling.
 */
export function bindPress(el: HTMLElement, onTap: () => void, onLong: () => void): () => void {
  let timer: number | undefined;
  let start: { x: number; y: number } | null = null;
  let longFired = false;

  const clear = () => {
    window.clearTimeout(timer);
    timer = undefined;
  };
  const down = (e: PointerEvent) => {
    if (e.button !== 0) return;
    longFired = false;
    start = { x: e.clientX, y: e.clientY };
    clear();
    timer = window.setTimeout(() => {
      longFired = true;
      navigator.vibrate?.(8);
      onLong();
    }, 450);
  };
  const move = (e: PointerEvent) => {
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 10) {
      clear();
      start = null;
    }
  };
  const up = () => {
    const wasPress = start !== null && timer !== undefined;
    clear();
    start = null;
    if (wasPress && !longFired) onTap();
  };
  const cancel = () => {
    clear();
    start = null;
  };
  const key = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onTap();
    }
  };
  const ctxmenu = (e: Event) => e.preventDefault();

  el.addEventListener("pointerdown", down);
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerup", up);
  el.addEventListener("pointercancel", cancel);
  el.addEventListener("pointerleave", cancel);
  el.addEventListener("keydown", key);
  el.addEventListener("contextmenu", ctxmenu);
  return () => {
    clear();
    el.removeEventListener("pointerdown", down);
    el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerup", up);
    el.removeEventListener("pointercancel", cancel);
    el.removeEventListener("pointerleave", cancel);
    el.removeEventListener("keydown", key);
    el.removeEventListener("contextmenu", ctxmenu);
  };
}
