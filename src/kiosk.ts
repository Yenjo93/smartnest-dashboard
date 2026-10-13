// Kiosk lock for wall tablets: hides Home Assistant's sidebar and keeps the browser on this panel until the PIN is entered.
// It's a household lock (kids, guests), not a security boundary: anyone who can quit the browser gets out.
// For a full lock, pair it with Fully Kiosk Browser (Android) or Guided Access (iPad).

const KEY = "smartnest-kiosk";

/** Per device, so locking the wall tablet doesn't lock everyone's phone. */
export function readKiosk(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function writeKiosk(on: boolean) {
  try {
    if (on) localStorage.setItem(KEY, "1");
    else localStorage.removeItem(KEY);
  } catch {
    /* storage blocked: the lock lasts until reload */
  }
}

/** Salted, iterated FNV-1a. A 4-digit PIN can't be made strong; this just keeps it out of plain sight in the config. */
export function hashPin(pin: string, salt: string): string {
  let h = 0x811c9dc5;
  const input = `${salt}:${pin}`;
  for (let round = 0; round < 2000; round++) {
    for (let i = 0; i < input.length; i++) {
      h ^= input.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    h ^= round;
  }
  return h.toString(16).padStart(8, "0");
}

export const newSalt = () => Math.random().toString(36).slice(2, 10);

/** Home Assistant's own sidebar lives in <home-assistant-main>'s shadow root. */
function haMainRoot(): ShadowRoot | null {
  const main = document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main");
  return (main as HTMLElement | null)?.shadowRoot ?? null;
}

export function applyChrome(on: boolean) {
  const root = haMainRoot();
  if (!root) return; // dev harness, or HA changed its layout: the panel still works, the sidebar just stays
  let style = root.getElementById("smartnest-kiosk");
  if (on && !style) {
    style = document.createElement("style");
    style.id = "smartnest-kiosk";
    style.textContent = `:host { --mdc-drawer-width: 0px !important; } ha-sidebar { display: none !important; }`;
    root.appendChild(style);
  } else if (!on) {
    style?.remove();
  }
}

let unguard: (() => void) | undefined;

/** Bounces any navigation (back button, swipe, link) back to the dashboard while locked. */
export function guardNavigation(on: boolean, panelPath: string) {
  if (!on) {
    unguard?.();
    unguard = undefined;
    return;
  }
  if (unguard) return;
  const bounce = () => {
    if (!readKiosk() || location.pathname.startsWith(panelPath)) return;
    history.replaceState(null, "", panelPath);
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: true } }));
  };
  window.addEventListener("popstate", bounce);
  window.addEventListener("location-changed", bounce);
  unguard = () => {
    window.removeEventListener("popstate", bounce);
    window.removeEventListener("location-changed", bounce);
  };
}
