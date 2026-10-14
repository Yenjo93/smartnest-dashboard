import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { entityName } from "../entities";
import { uid } from "../config";
import { loadKv, saveKv, watchKv } from "../kv";
import { shared } from "../theme";
import "../ui/icon";

interface Kid {
  id: string;
  name: string;
  emoji: string;
  /** Router switches for this kid's devices: on = internet allowed. */
  switches: string[];
  schedule: boolean;
  bedtime: string;
  wake: string;
  paused_until?: number | null;
}
interface Internet {
  kids: Kid[];
}

const EMPTY: Internet = { kids: [] };

/** Router switches that block a device: UniFi, FRITZ!Box, Omada, Deco, Mikrotik… expose one per device. */
const routerSwitches = (ids: string[], hass: Ctx["hass"]) =>
  ids.filter((id) => {
    if (!id.startsWith("switch.")) return false;
    const platform = hass.entities?.[id]?.platform ?? "";
    return ["unifi", "fritz", "tplink_omada", "tplink_deco", "mikrotik", "asuswrt", "netgear", "keenetic_ndms2", "ubus"].includes(platform) || /internet|access|block|wifi|parental/i.test(id);
  });

/** The kids' internet: pause now, an hour off, and a bedtime that switches it back on in the morning. */
@customElement("sn-w-internet")
export class SnInternet extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private data: Internet = EMPTY;
  @state() private setup = false;
  @state() private loaded = false;
  private unwatch?: Promise<() => void>;

  static styles = [
    shared,
    css`
      :host {
        display: block;
        height: 100%;
      }
      .card {
        height: 100%;
        border-radius: var(--r-lg);
        padding: 16px;
        display: grid;
        gap: 10px;
        align-content: start;
        overflow: auto;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .head h3 {
        flex: 1;
        margin: 0;
        font-size: 16px;
      }
      .kid {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 8px 12px;
        align-items: center;
        padding: 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      .face {
        font-size: 32px;
        line-height: 1;
        position: relative;
      }
      .face.off::after {
        content: "⛔";
        position: absolute;
        font-size: 16px;
        inset: auto -6px -4px auto;
      }
      .name b {
        display: block;
        font-size: 16px;
      }
      .name span {
        font-size: 13px;
        color: var(--text-2);
      }
      .row {
        grid-column: 1 / -1;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
      }
      .row .btn {
        min-height: 38px;
        font-size: 14px;
      }
      .row input[type="time"] {
        width: auto;
        min-height: 38px;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    loadKv<Internet>(this.ctx.hass, "internet").then((v) => {
      this.data = { ...EMPTY, ...(v ?? {}) };
      this.loaded = true;
    });
    this.unwatch = watchKv<Internet>(this.ctx.hass, "internet", (v) => (this.data = { ...EMPTY, ...(v ?? {}) }));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unwatch?.then((u) => u()).catch(() => undefined);
  }

  private save(kids: Kid[]) {
    this.data = { kids };
    saveKv(this.ctx.hass, "internet", this.data).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  private patch(id: string, p: Partial<Kid>) {
    this.save(this.data.kids.map((k) => (k.id === id ? { ...k, ...p } : k)));
  }

  private power(k: Kid, on: boolean, minutes?: number) {
    this.ctx.hass.callService("homeassistant", on ? "turn_on" : "turn_off", { entity_id: k.switches }).catch(() => this.ctx.toast(this.ctx.t("error")));
    this.patch(k.id, { paused_until: !on && minutes ? Date.now() / 1000 + minutes * 60 : null });
  }

  private renderSetup() {
    const { t, hass, config } = this.ctx;
    const switches = routerSwitches(Object.keys(hass.states), hass);
    return html`${this.data.kids.map(
        (k) => html`<div class="kid">
          <span class="face">${k.emoji}</span>
          <span class="name"><b>${k.name}</b></span>
          <button class="icon-btn small pressable" aria-label=${t("delete")} @click=${() => this.save(this.data.kids.filter((x) => x.id !== k.id))}>
            <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
          </button>
          <div class="row">
            ${switches.length
              ? switches.map((id) => {
                  const on = k.switches.includes(id);
                  return html`<button
                    class="btn pressable ${on ? "primary" : ""}"
                    @click=${() => this.patch(k.id, { switches: on ? k.switches.filter((x) => x !== id) : [...k.switches, id] })}
                  >
                    ${entityName(hass, config, id)}
                  </button>`;
                })
              : html`<span class="muted" style="font-size:13px">${t("net_no_router")}</span>`}
          </div>
        </div>`
      )}
      <form
        style="display:flex;gap:6px"
        @submit=${(e: SubmitEvent) => {
          e.preventDefault();
          const f = e.currentTarget as HTMLFormElement;
          const name = (f.elements.namedItem("n") as HTMLInputElement).value.trim();
          const emoji = (f.elements.namedItem("e") as HTMLInputElement).value.trim() || "🧒";
          if (!name) return;
          this.save([...this.data.kids, { id: uid(), name, emoji, switches: [], schedule: false, bedtime: "22:00", wake: "07:00" }]);
          f.reset();
        }}
      >
        <input name="e" placeholder="🧒" style="max-width:64px;text-align:center" />
        <input name="n" type="text" placeholder=${t("chores_kid_name")} style="flex:1" />
        <button class="icon-btn primary pressable" type="submit" aria-label=${t("add")}><sn-icon icon="plus" style="--icon-size:18px"></sn-icon></button>
      </form>`;
  }

  render() {
    const { t, hass } = this.ctx;
    const kids = this.data.kids;
    return html`<div class="card glass">
      <div class="head">
        <sn-icon icon="wifi" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>
        <h3>${t("widget_internet")}</h3>
        ${this.ctx.isAdmin
          ? html`<button class="icon-btn small pressable" aria-pressed=${this.setup} aria-label=${t("settings")} @click=${() => (this.setup = !this.setup)}>
              <sn-icon icon=${this.setup ? "check" : "cog"} style="--icon-size:18px"></sn-icon>
            </button>`
          : nothing}
      </div>
      ${!this.loaded
        ? html`<span class="muted">${t("loading")}</span>`
        : this.setup || !kids.length
        ? this.ctx.isAdmin
          ? this.renderSetup()
          : html`<span class="muted">${t("net_ask_installer")}</span>`
        : kids.map((k) => {
            const on = k.switches.some((id) => hass.states[id]?.state === "on");
            const left = k.paused_until ? Math.max(1, Math.round((k.paused_until * 1000 - Date.now()) / 60_000)) : 0;
            return html`<div class="kid">
              <span class="face ${on ? "" : "off"}">${k.emoji}</span>
              <span class="name"><b>${k.name}</b><span>${on ? t("net_on") : left ? t("net_paused_for", { n: left }) : t("net_off")}</span></span>
              ${on
                ? html`<button class="btn danger pressable" @click=${() => this.power(k, false)}>${t("net_stop")}</button>`
                : html`<button class="btn primary pressable" @click=${() => this.power(k, true)}>${t("net_allow")}</button>`}
              <div class="row">
                ${on ? html`<button class="btn pressable" @click=${() => this.power(k, false, 60)}>⏸ ${t("net_hour")}</button>` : nothing}
                <label style="display:flex;gap:6px;align-items:center;font-size:14px">
                  <input type="checkbox" .checked=${k.schedule} @change=${(e: any) => this.patch(k.id, { schedule: e.target.checked })} />🌙
                </label>
                <input type="time" .value=${k.bedtime} @change=${(e: any) => this.patch(k.id, { bedtime: e.target.value })} aria-label=${t("net_bedtime")} />
                <span>←</span>
                <input type="time" .value=${k.wake} @change=${(e: any) => this.patch(k.id, { wake: e.target.value })} aria-label=${t("net_wake")} />
              </div>
            </div>`;
          })}
    </div>`;
  }
}
