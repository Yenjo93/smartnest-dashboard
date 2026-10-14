import { css } from "lit";
import type { HassEntity } from "./types";
import { domainOf, isActive } from "./entities";

/**
 * Living device icons.
 * - Continuous loops say "this is running right now" (state indication): fan spins, AC snowflake drifts,
 *   robot wobbles while cleaning. CSS animations, so they stay smooth on a busy wall tablet.
 * - One-shots confirm a change landed (feedback): a light blooms on, a lock clicks, a door swings.
 *   WAAPI on the icon, transform only, under 300ms.
 * Reduced motion: no loops; one-shots become a short fade.
 */
export const livingStyles = css`
  .living-spin {
    animation: sn-spin 1.6s linear infinite;
  }
  .living-drift {
    animation: sn-spin 9s linear infinite;
  }
  .living-glow {
    animation: sn-breathe 2.4s cubic-bezier(0.77, 0, 0.175, 1) infinite alternate;
  }
  .living-wobble {
    animation: sn-wobble 0.9s cubic-bezier(0.77, 0, 0.175, 1) infinite alternate;
  }
  @keyframes sn-spin {
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes sn-breathe {
    to {
      transform: scale(1.1);
    }
  }
  @keyframes sn-wobble {
    from {
      transform: translateX(-2px) rotate(-6deg);
    }
    to {
      transform: translateX(2px) rotate(6deg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .living-spin,
    .living-drift,
    .living-glow,
    .living-wobble {
      animation: none;
    }
  }
`;

/** The loop class for an icon, if the device is doing something worth showing. */
export function livingClass(e: HassEntity | undefined): string {
  if (!e || !isActive(e)) return "";
  const d = domainOf(e.entity_id);
  if (d === "fan") return "living-spin";
  if (d === "climate") return e.state === "heat" || e.attributes.hvac_action === "heating" ? "living-glow" : "living-drift";
  if (d === "vacuum" && e.state === "cleaning") return "living-wobble";
  return "";
}

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

/** One-shot feedback when a device's state flips. Call from updated() with the previous state. */
export function playStateChange(icon: Element | null | undefined, e: HassEntity | undefined, prev: string | undefined) {
  if (!icon || !e || prev === undefined || prev === e.state) return;
  if (prev === "unavailable" || e.state === "unavailable") return;
  if (reduced()) {
    icon.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: 200, easing: EASE_OUT });
    return;
  }
  const d = domainOf(e.entity_id);
  const cls = e.attributes.device_class;
  if (d === "light" && e.state === "on")
    icon.animate([{ transform: "scale(0.82)" }, { transform: "scale(1.14)", offset: 0.55 }, { transform: "scale(1)" }], { duration: 280, easing: EASE_OUT });
  else if (d === "lock" && (e.state === "locked" || e.state === "unlocked"))
    // The lock turns over in 3D as it clicks, like a key turning.
    icon.animate([{ transform: "perspective(120px) rotateY(-180deg) scale(0.9)" }, { transform: "perspective(120px) rotateY(0) scale(1)" }], { duration: 380, easing: EASE_OUT });
  else if ((d === "binary_sensor" && ["door", "window", "opening", "garage_door"].includes(cls)) || d === "cover")
    icon.animate([{ transform: "rotate(-14deg)" }, { transform: "rotate(0)" }], { duration: 260, easing: EASE_OUT });
  else if (e.state === "on" || e.state === "off")
    icon.animate([{ transform: "scale(0.9)" }, { transform: "scale(1)" }], { duration: 160, easing: EASE_OUT });
}
