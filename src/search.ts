import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import { domainOf, entityIcon, entityName, isActive, shortValue, tapKind } from "./entities";
import { MODES, modeScript } from "./widgets/modes";
import { shared } from "./theme";
import "./ui/icon";

/** Arabic is written many ways: ignore diacritics, hamza forms, taa marbuta and alif maqsura when matching. */
const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[ً-ْـ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .trim();

const CONTROLLABLE = ["light", "switch", "fan", "cover", "climate", "lock", "media_player", "vacuum", "scene", "script", "camera", "sensor", "binary_sensor", "water_heater", "valve"];

interface Hit {
  kind: "page" | "entity" | "mode";
  id: string;
  label: string;
  sub: string;
  icon: string;
  score: number;
}

/** Spotlight for the house: type two letters, get the device, page or mode, act on it right there. */
@customElement("sn-search")
export class SnSearch extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) onClose!: () => void;
  @property({ attribute: false }) onPage!: (id: string) => void;
  @state() private q = "";
  @state() private sel = 0;

  static styles = [
    shared,
    css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 65;
        display: grid;
        justify-items: center;
        align-items: start;
        padding: 12vh 16px 16px;
        background: var(--scrim);
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
        animation: fade 200ms ease;
      }
      .box {
        width: min(620px, 100%);
        border-radius: 22px;
        background: var(--surface-solid);
        box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.5);
        overflow: hidden;
        animation: pop 320ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      .field {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 18px;
        border-bottom: 1px solid var(--border);
        --icon-size: 24px;
        color: var(--text-2);
      }
      input {
        flex: 1;
        border: 0;
        outline: none;
        background: none;
        font: 500 20px var(--font);
        color: var(--text);
        min-width: 0;
      }
      .list {
        max-height: 56vh;
        overflow: auto;
        padding: 6px;
      }
      .hit {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        border-radius: 14px;
        cursor: pointer;
      }
      .hit.sel {
        background: color-mix(in srgb, var(--accent) 14%, transparent);
      }
      .hit .ic {
        width: 38px;
        height: 38px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        background: var(--surface-2);
        --icon-size: 20px;
        flex: none;
      }
      .hit .ic.on {
        background: var(--accent);
        color: var(--on-accent);
      }
      .hit .txt {
        flex: 1;
        min-width: 0;
        display: grid;
      }
      .hit .txt b {
        font-weight: 600;
      }
      .hit .txt span {
        font-size: 13px;
        color: var(--text-2);
        unicode-bidi: plaintext;
      }
      .kind {
        font-size: 11px;
        color: var(--text-2);
        padding: 2px 8px;
        border-radius: 999px;
        background: var(--surface-2);
      }
      .empty {
        padding: 22px;
        text-align: center;
        color: var(--text-2);
      }
      kbd {
        font: 600 11px var(--font);
        padding: 2px 6px;
        border-radius: 6px;
        background: var(--surface-2);
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @keyframes pop {
        from {
          opacity: 0;
          transform: translateY(-12px) scale(0.97);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host,
        .box {
          animation: none;
        }
      }
    `,
  ];

  constructor() {
    super();
    // A tap outside the box closes it.
    this.addEventListener("click", () => this.onClose());
  }

  firstUpdated() {
    this.renderRoot.querySelector("input")?.focus();
  }

  private hits(): Hit[] {
    const { hass, config, t } = this.ctx;
    const q = norm(this.q);
    const score = (label: string, extra = "") => {
      if (!q) return 1;
      const l = norm(label);
      if (l.startsWith(q)) return 100 - l.length / 10;
      if (l.split(/\s+/).some((w) => w.startsWith(q))) return 80;
      if (l.includes(q)) return 60;
      if (norm(extra).includes(q)) return 30;
      return 0;
    };
    const out: Hit[] = [];
    for (const p of config.pages) out.push({ kind: "page", id: p.id, label: p.title, sub: t("search_page"), icon: p.icon, score: score(p.title) + 5 });
    for (const m of MODES)
      if (hass.states[modeScript(m.id)]) out.push({ kind: "mode", id: m.id, label: t(m.label), sub: t("widget_modes"), icon: m.icon, score: score(t(m.label)) + 4 });
    for (const e of Object.values(hass.states)) {
      const id = e.entity_id;
      if (!CONTROLLABLE.includes(domainOf(id)) || hass.entities?.[id]?.entity_category || hass.entities?.[id]?.hidden) continue;
      const name = entityName(hass, config, id);
      const sc = score(name, id);
      if (sc > 0) out.push({ kind: "entity", id, label: name, sub: shortValue(t, e, this.ctx.lang), icon: entityIcon(e, id), score: sc });
    }
    return out.filter((h) => h.score > 0).sort((a, b) => b.score - a.score).slice(0, q ? 30 : 12);
  }

  private act(h: Hit, toggle = false) {
    const { hass } = this.ctx;
    if (h.kind === "page") {
      this.onPage(h.id);
      return this.onClose();
    }
    if (h.kind === "mode") {
      hass.callService("script", "turn_on", { entity_id: modeScript(h.id) }).catch(() => undefined);
      this.ctx.cinematic(h.id);
      return this.onClose();
    }
    if (toggle && tapKind(h.id) === "toggle") {
      hass.callService("homeassistant", "toggle", { entity_id: h.id }).catch(() => undefined);
      return;
    }
    this.onClose();
    this.ctx.openEntity(h.id);
  }

  render() {
    const { t, hass } = this.ctx;
    const hits = this.hits();
    const sel = Math.min(this.sel, hits.length - 1);
    return html`<div class="box" role="dialog" aria-label=${t("search")} @click=${(e: Event) => e.stopPropagation()}>
      <label class="field">
        <sn-icon icon="magnify"></sn-icon>
        <input
          type="search"
          .value=${this.q}
          placeholder=${t("search_placeholder")}
          aria-label=${t("search")}
          @input=${(e: any) => ((this.q = e.target.value), (this.sel = 0))}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === "ArrowDown") (this.sel = Math.min(hits.length - 1, sel + 1)), e.preventDefault();
            else if (e.key === "ArrowUp") (this.sel = Math.max(0, sel - 1)), e.preventDefault();
            else if (e.key === "Enter" && hits[sel]) this.act(hits[sel], e.shiftKey);
            else if (e.key === "Escape") this.onClose();
          }}
        />
        <kbd>esc</kbd>
      </label>
      <div class="list" role="listbox">
        ${hits.length
          ? hits.map((h, i) => {
              const e = h.kind === "entity" ? hass.states[h.id] : undefined;
              const on = e ? isActive(e) : false;
              return html`<div class="hit ${i === sel ? "sel" : ""}" role="option" aria-selected=${i === sel} @pointerenter=${() => (this.sel = i)} @click=${() => this.act(h)}>
                <span class="ic ${on ? "on" : ""}"><sn-icon .icon=${h.icon}></sn-icon></span>
                <span class="txt"><b>${h.label}</b><span>${h.sub}</span></span>
                ${e && tapKind(h.id) === "toggle"
                  ? html`<button
                      class="btn pressable"
                      style="min-height:34px;font-size:13px"
                      @click=${(ev: Event) => {
                        ev.stopPropagation();
                        this.act(h, true);
                      }}
                    >
                      ${t(on ? "turn_off" : "turn_on")}
                    </button>`
                  : html`<span class="kind">${t(h.kind === "page" ? "search_page" : h.kind === "mode" ? "widget_modes" : "search_open")}</span>`}
              </div>`;
            })
          : html`<div class="empty">${t("search_none")}</div>`}
      </div>
    </div>`;
  }
}
