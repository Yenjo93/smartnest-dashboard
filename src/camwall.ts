import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import { domainOf, entityName } from "./entities";
import { dashboardEntities } from "./chips";
import { liveUrl, snapshotUrl } from "./widgets/camera";
import { shared } from "./theme";
import "./ui/icon";
import { saveConfig } from "./config";

/** The cameras chosen for the wall, in their order; else the dashboard's cameras; else every camera in the house. */
export function wallCameras(ctx: Ctx): string[] {
  const chosen = (ctx.config.settings.wall_cameras ?? []).filter((id) => ctx.hass.states[id]);
  if (chosen.length) return chosen;
  const placed = dashboardEntities(ctx.config).filter((id) => domainOf(id) === "camera" && ctx.hass.states[id]);
  return placed.length ? placed : Object.keys(ctx.hass.states).filter((id) => domainOf(id) === "camera");
}

/**
 * Whether something is moving in front of a camera right now: a motion, person or occupancy sensor on the same
 * device (most cameras expose one), or one whose name follows the camera's.
 */
export function cameraMotion(hass: Ctx["hass"], cam: string): boolean {
  const dev = hass.entities?.[cam]?.device_id;
  const slug = cam.split(".")[1].replace(/_(camera|cam|stream|main|sub|high|low)$/g, "");
  return Object.values(hass.states).some(
    (e) =>
      e.entity_id.startsWith("binary_sensor.") &&
      e.state === "on" &&
      ["motion", "occupancy", "presence", "moving"].includes(e.attributes.device_class) &&
      ((dev && hass.entities?.[e.entity_id]?.device_id === dev) || e.entity_id.split(".")[1].startsWith(slug))
  );
}

/**
 * Every camera at once, full-screen. Stills refresh every 2s (live streams for ten cameras would choke a
 * wall tablet); tap one and it fills the screen with the live stream.
 */
@customElement("sn-camwall")
export class SnCamwall extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) onClose!: () => void;
  @state() private big?: string;
  /** Choosing the wall's cameras (admins). */
  @state() private choosing = false;
  @state() private bust = Date.now();
  private timer?: number;

  static styles = [
    shared,
    css`
      .wall {
        position: fixed;
        inset: 0;
        z-index: 72;
        background: #0b0e11;
        color: #fff;
        display: grid;
        grid-template-rows: auto 1fr;
        animation: fade 260ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .choose {
        display: grid;
        gap: 14px;
        padding: 0 18px 18px;
        overflow: auto;
        color: #fff;
      }
      .choose .hint {
        color: rgba(255, 255, 255, 0.7);
        font-size: 14px;
      }
      .pick {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 10px;
      }
      .pc {
        position: relative;
        aspect-ratio: 16 / 9;
        border: 0;
        border-radius: 14px;
        overflow: hidden;
        background: #151a1e;
        cursor: pointer;
        opacity: 0.45;
        transition: opacity 200ms, box-shadow 200ms;
      }
      .pc.on {
        opacity: 1;
        box-shadow: 0 0 0 3px var(--accent);
      }
      .pc img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .pc .n {
        position: absolute;
        top: 8px;
        inset-inline-start: 8px;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--accent);
        color: var(--on-accent);
        font: 700 14px var(--font);
      }
      .pc:not(.on) .n {
        background: rgba(0, 0, 0, 0.55);
        color: #fff;
      }
      .pc .l {
        position: absolute;
        inset: auto 0 0 0;
        padding: 6px 10px;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
        color: #fff;
        font: 600 13px var(--font);
        text-align: start;
      }
      .top {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 18px;
        padding-top: max(14px, env(safe-area-inset-top));
      }
      .top strong {
        flex: 1;
        font-size: 18px;
      }
      .top .icon-btn {
        background: rgba(255, 255, 255, 0.12);
        color: #fff;
      }
      .grid {
        display: grid;
        gap: 8px;
        padding: 0 8px 8px;
        min-height: 0;
      }
      /* Something moving: that camera takes a bigger place, outlined, until it's quiet again. */
      .cam.moving {
        grid-column: span 2;
        grid-row: span 2;
        box-shadow: 0 0 0 3px var(--alert);
      }
      .cam .mv {
        position: absolute;
        top: 10px;
        inset-inline-start: 10px;
        padding: 4px 10px;
        border-radius: 999px;
        background: var(--alert);
        color: #fff;
        font-size: 12px;
        font-weight: 700;
      }
      .cam {
        position: relative;
        border-radius: 14px;
        overflow: hidden;
        background: #151a1e;
        min-height: 0;
        animation: in 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .cam img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .cam span {
        position: absolute;
        bottom: 10px;
        inset-inline-start: 10px;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.55);
        font-size: 13px;
        font-weight: 500;
      }
      .big {
        position: absolute;
        inset: 64px 8px 8px;
        border-radius: 14px;
        overflow: hidden;
        background: #000;
        animation: grow 320ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      .big img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .live {
        position: absolute;
        top: 12px;
        inset-inline-start: 12px;
        display: inline-flex;
        gap: 6px;
        align-items: center;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.55);
        font-size: 12px;
        font-weight: 700;
      }
      .live::before {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: #f26b68;
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: scale(0.96);
        }
      }
      @keyframes grow {
        from {
          opacity: 0;
          transform: scale(0.94);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .cam,
        .big {
          animation: fade 200ms ease;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.timer = window.setInterval(() => (this.bust = Date.now()), 2000);
    window.addEventListener("keydown", this.onKey);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
    window.removeEventListener("keydown", this.onKey);
  }

  private onKey = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    if (this.big) this.big = undefined;
    else this.onClose();
  };

  /** Saves the wall's cameras straight away (outside edit mode too: it's the installer's own screen setting). */
  private saveWall(ids: string[]) {
    const { ctx } = this;
    if (ctx.editing) return ctx.update((d) => (d.settings.wall_cameras = ids));
    const next = { ...ctx.config, settings: { ...ctx.config.settings, wall_cameras: ids } };
    saveConfig(ctx.hass, next).catch(() => ctx.toast(ctx.t("error")));
  }

  /** Every camera in the house: tap to put it on the wall or take it off; the wall shows them in the order picked. */
  private renderChooser(shown: string[]) {
    const { ctx } = this;
    const { hass, config, t } = ctx;
    const chosen = config.settings.wall_cameras?.length ? config.settings.wall_cameras.filter((id) => hass.states[id]) : shown;
    const all = Object.keys(hass.states).filter((id) => domainOf(id) === "camera");
    return html`<div class="choose">
      <span class="hint">${t("wall_choose_hint")}</span>
      <div class="pick">
        ${all.map((id) => {
          const i = chosen.indexOf(id);
          const url = snapshotUrl(hass, id, this.bust);
          return html`<button class="pc pressable ${i >= 0 ? "on" : ""}" @click=${() => this.saveWall(i >= 0 ? chosen.filter((x) => x !== id) : [...chosen, id])}>
            ${url ? html`<img src=${url} alt="" />` : nothing}
            <span class="n">${i >= 0 ? i + 1 : "+"}</span>
            <span class="l">${entityName(hass, config, id)}</span>
          </button>`;
        })}
      </div>
      ${config.settings.wall_cameras?.length
        ? html`<button class="btn pressable" style="justify-self:start" @click=${() => this.saveWall([])}>${t("wall_auto")}</button>`
        : nothing}
    </div>`;
  }

  render() {
    const { ctx } = this;
    // Cameras that see movement come first and bigger.
    const all = wallCameras(ctx);
    const moving = new Set(all.length > 1 ? all.filter((id) => cameraMotion(ctx.hass, id)) : []);
    const cams = [...all.filter((id) => moving.has(id)), ...all.filter((id) => !moving.has(id))];
    // Squarest grid that fits them all.
    const cols = Math.ceil(Math.sqrt(cams.length));
    const rows = Math.ceil(cams.length / cols);
    return html`<div class="wall" role="dialog" aria-label=${ctx.t("widget_camera")}>
      <div class="top">
        <sn-icon icon="cctv"></sn-icon>
        <strong>${ctx.t(this.choosing ? "wall_choose" : "camera_wall")}</strong>
        ${ctx.isAdmin && !this.big
          ? html`<button class="icon-btn pressable" aria-label=${ctx.t("wall_choose")} title=${ctx.t("wall_choose")} @click=${() => (this.choosing = !this.choosing)}>
              <sn-icon icon=${this.choosing ? "check" : "pencil"}></sn-icon>
            </button>`
          : nothing}
        <button class="icon-btn pressable" aria-label=${ctx.t("close")} @click=${() => (this.big ? (this.big = undefined) : this.onClose())}>
          <sn-icon icon=${this.big ? "arrow-left" : "close"}></sn-icon>
        </button>
      </div>
      ${this.choosing ? this.renderChooser(all) : nothing}
      <div class="grid" style="${this.choosing ? "display:none;" : ""}grid-template-columns:repeat(${cols},1fr);grid-template-rows:repeat(${rows + (moving.size && cols > 1 ? moving.size : 0)},1fr);grid-auto-flow:dense">
        ${cams.map(
          (id, i) => html`<button class="cam pressable ${moving.has(id) && cols > 1 ? "moving" : ""}" style="animation-delay:${Math.min(i, 8) * 40}ms" @click=${() => (this.big = id)}>
            ${moving.has(id) ? html`<b class="mv">${ctx.t("cam_motion")}</b>` : nothing}
            ${snapshotUrl(ctx.hass, id, this.bust) ? html`<img src=${snapshotUrl(ctx.hass, id, this.bust)!} alt="" />` : nothing}
            <span>${entityName(ctx.hass, ctx.config, id)}</span>
          </button>`
        )}
      </div>
      ${this.big
        ? html`<div class="big" @click=${() => (this.big = undefined)}>
            <img src=${liveUrl(ctx.hass, this.big) ?? snapshotUrl(ctx.hass, this.big, this.bust) ?? ""} alt="" />
            <span class="live">${ctx.t("streaming")} · ${entityName(ctx.hass, ctx.config, this.big)}</span>
          </div>`
        : nothing}
    </div>`;
  }
}
