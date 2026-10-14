import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { entityName } from "../entities";
import { shared } from "../theme";
import "../ui/icon";
import { haptic } from "../ui/haptic";

type Key = "up" | "down" | "left" | "right" | "ok" | "back" | "home" | "vol_up" | "vol_down" | "mute";

// Each TV integration names its buttons differently.
const KEYMAPS: Record<string, Record<Key, string>> = {
  androidtv_remote: { up: "DPAD_UP", down: "DPAD_DOWN", left: "DPAD_LEFT", right: "DPAD_RIGHT", ok: "DPAD_CENTER", back: "BACK", home: "HOME", vol_up: "VOLUME_UP", vol_down: "VOLUME_DOWN", mute: "MUTE" },
  samsungtv: { up: "KEY_UP", down: "KEY_DOWN", left: "KEY_LEFT", right: "KEY_RIGHT", ok: "KEY_ENTER", back: "KEY_RETURN", home: "KEY_HOME", vol_up: "KEY_VOLUP", vol_down: "KEY_VOLDOWN", mute: "KEY_MUTE" },
  webostv: { up: "UP", down: "DOWN", left: "LEFT", right: "RIGHT", ok: "ENTER", back: "BACK", home: "HOME", vol_up: "VOLUMEUP", vol_down: "VOLUMEDOWN", mute: "MUTE" },
  apple_tv: { up: "up", down: "down", left: "left", right: "right", ok: "select", back: "menu", home: "home", vol_up: "volume_up", vol_down: "volume_down", mute: "volume_down" },
  roku: { up: "up", down: "down", left: "left", right: "right", ok: "select", back: "back", home: "home", vol_up: "volume_up", vol_down: "volume_down", mute: "volume_mute" },
};

/** A real remote on the wall: D-pad, OK, back, home, volume and power, for Android TV, Samsung, LG, Apple TV and Roku. */
@customElement("sn-w-remote")
export class SnRemote extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;

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
        grid-template-rows: auto 1fr auto auto;
        justify-items: center;
        gap: 14px;
        direction: ltr;
      }
      .top {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 700;
      }
      .pad {
        position: relative;
        width: min(220px, 100%);
        aspect-ratio: 1;
        border-radius: 50%;
        background: var(--surface-2);
        box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.08);
        align-self: center;
      }
      .pad button {
        position: absolute;
        display: grid;
        place-items: center;
        color: var(--text-2);
        --icon-size: 30px;
        width: 33%;
        height: 33%;
        border-radius: 50%;
        transition: background-color 120ms, transform 120ms;
      }
      .pad button:active {
        background: color-mix(in srgb, var(--accent) 18%, transparent);
        transform: scale(0.94);
      }
      .pad .u {
        top: 2%;
        left: 33.5%;
      }
      .pad .d {
        bottom: 2%;
        left: 33.5%;
      }
      .pad .l {
        left: 2%;
        top: 33.5%;
      }
      .pad .r {
        right: 2%;
        top: 33.5%;
      }
      .pad .ok {
        left: 31%;
        top: 31%;
        width: 38%;
        height: 38%;
        background: var(--surface-solid);
        box-shadow: var(--shadow);
        color: var(--text);
        font-weight: 700;
        font-size: 15px;
      }
      .row {
        display: flex;
        gap: 10px;
      }
    `,
  ];

  private send(key: Key) {
    const { hass } = this.ctx;
    const id = this.widget.config.entity as string;
    const platform = hass.entities?.[id]?.platform ?? "androidtv_remote";
    const map = KEYMAPS[platform] ?? KEYMAPS.androidtv_remote;
    haptic("tick");
    const call =
      platform === "webostv"
        ? hass.callService("webostv", "button", { entity_id: id, button: map[key] })
        : hass.callService("remote", "send_command", { entity_id: id, command: map[key] });
    call.catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  render() {
    const { ctx } = this;
    const id = this.widget.config.entity as string | undefined;
    const e = id ? ctx.hass.states[id] : undefined;
    if (!e) return html`<div class="card glass"><span class="muted">${ctx.t("choose_entity")}</span></div>`;
    const btn = (key: Key, cls: string, icon: string) =>
      html`<button class=${`pressable ${cls}`} aria-label=${key} @click=${() => this.send(key)}><sn-icon .icon=${icon}></sn-icon></button>`;
    return html`<div class="card glass">
      <div class="top">
        <span>${entityName(ctx.hass, ctx.config, e.entity_id)}</span>
        <button
          class="icon-btn pressable ${e.state === "on" || e.state === "playing" ? "primary" : ""}"
          aria-label=${ctx.t("turn_on")}
          @click=${() => ctx.hass.callService(e.entity_id.split(".")[0], "toggle", { entity_id: e.entity_id }).catch(() => ctx.toast(ctx.t("error")))}
        >
          <sn-icon icon="power" style="--icon-size:20px"></sn-icon>
        </button>
      </div>
      <div class="pad">
        ${btn("up", "u", "chevron-up")} ${btn("down", "d", "chevron-down")} ${btn("left", "l", "chevron-left")} ${btn("right", "r", "chevron-right")}
        <button class="pressable ok" aria-label="ok" @click=${() => this.send("ok")}>OK</button>
      </div>
      <div class="row">
        <button class="icon-btn pressable" aria-label="back" @click=${() => this.send("back")}><sn-icon icon="return"></sn-icon></button>
        <button class="icon-btn pressable" aria-label="home" @click=${() => this.send("home")}><sn-icon icon="home"></sn-icon></button>
      </div>
      <div class="row">
        <button class="icon-btn pressable" aria-label="volume down" @click=${() => this.send("vol_down")}><sn-icon icon="vol-down"></sn-icon></button>
        <button class="icon-btn pressable" aria-label="mute" @click=${() => this.send("mute")}><sn-icon icon="vol-mute"></sn-icon></button>
        <button class="icon-btn pressable" aria-label="volume up" @click=${() => this.send("vol_up")}><sn-icon icon="vol-up"></sn-icon></button>
      </div>
    </div>`;
  }
}
