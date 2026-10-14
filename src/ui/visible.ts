/**
 * Tells an element whether anyone can see it: on screen, on the page shown (not a parked one), and the tab in front.
 * Cameras and other refreshing widgets use it to rest while unseen, which is most of the time on a big page.
 */
export function watchVisible(el: Element, cb: (on: boolean) => void): () => void {
  let inView = true;
  let last: boolean | undefined;
  const emit = () => {
    const on = inView && !document.hidden;
    if (on !== last) cb((last = on));
  };
  const io = new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    emit();
  });
  io.observe(el);
  document.addEventListener("visibilitychange", emit);
  return () => {
    io.disconnect();
    document.removeEventListener("visibilitychange", emit);
  };
}

/** Loads an image before showing it, so a refreshed snapshot swaps in whole instead of painting top-down. */
export function preload(url: string): Promise<string> {
  return new Promise((ok, fail) => {
    const img = new Image();
    img.onload = () => (img.decode ? img.decode().catch(() => undefined) : Promise.resolve()).then(() => ok(url));
    img.onerror = fail;
    img.src = url;
  });
}
