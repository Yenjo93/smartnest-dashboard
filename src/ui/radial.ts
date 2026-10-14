import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import { domainOf, entityName } from "../entities";
import { haptic } from "./haptic";
import { refreshTimers } from "../live-timers";
import "./icon";

interface Item {
  icon: string;
  label: string;
  run: () => void;
}

/**
 * Long-press on a device: its quick actions fan out around the finger (brightness, warm or cool, a timer, open
 * blinds halfway…), plus the full detail sheet. One more tap and it's done, without leaving the page.
 */
@customElement("sn-radial")
export class SnRadial extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property() entityId = "";
  @property({ attribute: false }) at = { x: 0, y: 0 };
  @property({ attribute: false }) onDone!: () => void;

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      z-index: 70;
      background: color-mix(in srgb, var(--scrim) 70%, transparent);
      -webkit-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);
      animation: fade 180ms ease-out;
    }
    .hub {
      position: absolute;
      width: 0;
      height: 0;
    }
    .name {
      position: absolute;
      transform: translate(-50%, -50%);
      white-space: nowrap;
      font: 700 15px var(--font);
      color: var(--text);
      background: var(--surface-solid);
      padding: 8px 14px;
      border-radius: 999px;
      box-shadow: var(--shadow-lift);
      animation: pop 260ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    button {
      position: absolute;
      transform: translate(-50%, -50%);
      width: 58px;
      height: 58px;
      border-radius: 50%;
      border: 0;
      background: var(--surface-solid);
      color: var(--text);
      box-shadow: var(--shadow-lift);
      display: grid;
      place-items: center;
      align-content: center;
      gap: 1px;
      cursor: pointer;
      font: 600 11px var(--font);
      --icon-size: 22px;
      animation: fly 320ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }
    button:active {
      transform: translate(-50%, -50%) scale(0.92);
    }
    button span {
      max-width: 54px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    @keyframes fade {
      from {
        opacity: 0;
      }
    }
    @keyframes pop {
      from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.6);
      }
    }
    @keyframes fly {
      from {
        opacity: 0;
        left: 0;
        top: 0;
        transform: translate(-50%, -50%) scale(0.3);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host,
      .name,
      button {
        animation: none;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", (e) => e.target === this && this.onDone());
    window.addEventListener("keydown", this.onKey);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this.onKey);
  }

  private onKey = (e: KeyboardEvent) => e.key === "Escape" && this.onDone();

  private items(): Item[] {
    const { ctx, entityId: id } = this;
    const { hass, t } = ctx;
    const e = hass.states[id];
    const d = domainOf(id);
    const call = (domain: string, service: string, data: Record<string, unknown> = {}) => () =>
      hass.callService(domain, service, { entity_id: id, ...data }).catch(() => ctx.toast(t("error")));
    const timer = (m: number) => () =>
      hass
        .callWS({ type: "smartnest/timer/set", entity_id: id, minutes: m })
        .then(() => (ctx.toast(t("radial_timer_set", { n: m })), refreshTimers(hass, true)), () => ctx.toast(t("error")));
    const out: Item[] = [];
    if (d === "light") {
      const modes: string[] = e?.attributes.supported_color_modes ?? [];
      const dims = modes.some((m) => m !== "onoff");
      if (dims) for (const p of [25, 50, 100]) out.push({ icon: p === 25 ? "brightness-5" : p === 50 ? "brightness-6" : "brightness-7", label: `${p}%`, run: call("light", "turn_on", { brightness_pct: p }) });
      if (modes.some((m) => ["color_temp", "hs", "rgb", "rgbw", "rgbww", "xy"].includes(m))) {
        out.push({ icon: "fire", label: t("radial_warm"), run: call("light", "turn_on", { color_temp_kelvin: 2700 }) });
        out.push({ icon: "snowflake", label: t("radial_cool"), run: call("light", "turn_on", { color_temp_kelvin: 5000 }) });
      }
      out.push({ icon: "timer-outline", label: t("radial_off_in", { n: 30 }), run: timer(30) });
    } else if (d === "cover") {
      out.push({ icon: "arrow-up", label: t("open"), run: call("cover", "open_cover") });
      out.push({ icon: "blinds", label: "50%", run: call("cover", "set_cover_position", { position: 50 }) });
      out.push({ icon: "arrow-down", label: t("closed"), run: call("cover", "close_cover") });
    } else if (["switch", "fan", "input_boolean", "climate", "media_player"].includes(d)) {
      for (const m of [15, 30, 60]) out.push({ icon: "timer-outline", label: t("radial_off_in", { n: m }), run: timer(m) });
    }
    out.push({ icon: "dots-horizontal", label: t("radial_more"), run: () => ctx.openEntity(id) });
    return out;
  }

  render() {
    const items = this.items();
    // Keep the whole fan on screen near the edges.
    const R = 92;
    const x = Math.min(window.innerWidth - R - 36, Math.max(R + 36, this.at.x));
    const y = Math.min(window.innerHeight - R - 36, Math.max(R + 56, this.at.y));
    return html`<div class="hub" style="left:${x}px;top:${y}px">
      <span class="name" style="left:0;top:0">${entityName(this.ctx.hass, this.ctx.config, this.entityId)}</span>
      ${items.map((it, i) => {
        // Spread over a full circle, starting at the top.
        const a = -Math.PI / 2 + (i / items.length) * Math.PI * 2;
        return html`<button
          style="left:${Math.cos(a) * R}px;top:${Math.sin(a) * R + 0}px;animation-delay:${i * 28}ms"
          aria-label=${it.label}
          @click=${() => {
            haptic("tap");
            it.run();
            this.onDone();
          }}
        >
          <sn-icon .icon=${it.icon}></sn-icon><span>${it.label}</span>
        </button>`;
      })}
    </div>`;
  }
}

/** Opens the quick actions over the dashboard, centred on the element that was pressed. */
export function openRadial(ctx: Ctx, entityId: string, from: Element) {
  // Inside the dashboard's own shadow root, so it gets the theme.
  let node: Node = from;
  let panel: Element | undefined;
  while (node) {
    const root = node.getRootNode() as ShadowRoot | Document;
    if (!(root instanceof ShadowRoot)) break;
    if (root.host.tagName === "SMARTNEST-PANEL") {
      panel = root.host;
      break;
    }
    node = root.host;
  }
  const host = panel?.shadowRoot?.querySelector(".app") ?? document.body;
  const r = from.getBoundingClientRect();
  const el = document.createElement("sn-radial") as SnRadial;
  el.ctx = ctx;
  el.entityId = entityId;
  el.at = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  el.onDone = () => el.remove();
  haptic("press");
  host.appendChild(el);
}
