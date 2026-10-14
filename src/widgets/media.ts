import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { entityName } from "../entities";
import { shared } from "../theme";
import "../ui/icon";
import { haptic } from "../ui/haptic";

// MediaPlayerEntityFeature bits
const PAUSE = 1;
const VOLUME_SET = 4;
const VOLUME_MUTE = 8;
const PREVIOUS = 16;
const NEXT = 32;
const PLAY = 16384;
const GROUPING = 524288;

export const CINEMA_SCRIPT = "script.smartnest_cinema";

/** Now playing, with cover art, controls, volume, "play everywhere" for speaker groups, and Cinema mode. */
@customElement("sn-w-media")
export class SnMedia extends LitElement {
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
        position: relative;
        height: 100%;
        border-radius: var(--r-lg);
        overflow: hidden;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 16px;
        align-items: center;
        padding: 16px;
      }
      .bg {
        position: absolute;
        inset: -20px;
        background: center / cover no-repeat;
        filter: blur(30px) saturate(140%);
        opacity: 0.35;
        transition: background-image 600ms;
      }
      .art {
        position: relative;
        width: min(140px, 30cqi);
        aspect-ratio: 1;
        border-radius: 14px;
        background: var(--surface-2) center / cover no-repeat;
        box-shadow: var(--shadow-lift);
        display: grid;
        place-items: center;
        color: var(--text-2);
        --icon-size: 40px;
      }
      .info {
        position: relative;
        display: grid;
        gap: 8px;
        min-width: 0;
      }
      .title {
        font-weight: 700;
        font-size: 17px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .artist {
        color: var(--text-2);
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .ctl {
        display: flex;
        align-items: center;
        gap: 6px;
        direction: ltr;
      }
      .ctl .big {
        width: 52px;
        height: 52px;
        --icon-size: 28px;
      }
      input[type="range"] {
        width: 100%;
        accent-color: var(--accent);
        min-height: 28px;
        padding: 0;
        background: none;
      }
      .row {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }
      .row .btn {
        min-height: 36px;
        font-size: 13px;
        padding: 0 12px;
      }
      .wrap {
        container-type: inline-size;
        height: 100%;
      }
    `,
  ];

  private get entity(): string | undefined {
    const states = this.ctx.hass.states;
    return this.widget.config.entity ?? Object.keys(states).find((id) => id.startsWith("media_player.") && states[id].state === "playing") ?? Object.keys(states).find((id) => id.startsWith("media_player."));
  }

  private call(service: string, data: Record<string, unknown> = {}) {
    haptic("tap");
    this.ctx.hass.callService("media_player", service, { entity_id: this.entity, ...data }).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  private cinema() {
    const { ctx } = this;
    if (ctx.hass.states[CINEMA_SCRIPT]) ctx.hass.callService("script", "turn_on", { entity_id: CINEMA_SCRIPT }).catch(() => undefined);
    ctx.cinematic("cinema");
  }

  render() {
    const { ctx } = this;
    const { t, hass } = ctx;
    const id = this.entity;
    const e = id ? hass.states[id] : undefined;
    if (!e) return html`<div class="card glass"><span class="muted">${t("nothing_playing")}</span></div>`;
    const a = e.attributes;
    const f: number = a.supported_features ?? 0;
    const playing = e.state === "playing";
    const art = a.entity_picture ? hass.hassUrl(a.entity_picture) : undefined;
    const speakers = Object.values(hass.states).filter(
      (s) => s.entity_id !== id && s.entity_id.startsWith("media_player.") && ((s.attributes.supported_features ?? 0) & GROUPING) !== 0
    );
    return html`<div class="wrap"><div class="card glass">
      ${art ? html`<div class="bg" style="background-image:url('${art}')"></div>` : nothing}
      <div class="art" style=${art ? `background-image:url('${art}')` : ""}>${art ? "" : html`<sn-icon icon="speaker"></sn-icon>`}</div>
      <div class="info">
        <span class="title">${a.media_title ?? (playing ? entityName(hass, ctx.config, id!) : t("nothing_playing"))}</span>
        <span class="artist">${a.media_artist ?? entityName(hass, ctx.config, id!)}</span>
        <div class="ctl">
          ${f & PREVIOUS ? html`<button class="icon-btn pressable" aria-label="previous" @click=${() => this.call("media_previous_track")}><sn-icon icon="prev"></sn-icon></button>` : nothing}
          ${f & (PAUSE | PLAY)
            ? html`<button class="icon-btn primary pressable big" aria-label=${playing ? t("pause") : t("start")} @click=${() => this.call("media_play_pause")}>
                <sn-icon icon=${playing ? "pause" : "play"}></sn-icon>
              </button>`
            : nothing}
          ${f & NEXT ? html`<button class="icon-btn pressable" aria-label="next" @click=${() => this.call("media_next_track")}><sn-icon icon="next"></sn-icon></button>` : nothing}
          ${f & VOLUME_MUTE
            ? html`<button class="icon-btn pressable" aria-label="mute" @click=${() => this.call("volume_mute", { is_volume_muted: !a.is_volume_muted })}>
                <sn-icon icon=${a.is_volume_muted ? "vol-mute" : "volume"}></sn-icon>
              </button>`
            : nothing}
        </div>
        ${f & VOLUME_SET
          ? html`<input
              type="range"
              min="0"
              max="100"
              aria-label="volume"
              .value=${String(Math.round((a.volume_level ?? 0) * 100))}
              @change=${(ev: any) => this.call("volume_set", { volume_level: Number(ev.target.value) / 100 })}
            />`
          : nothing}
        <div class="row">
          ${f & GROUPING && speakers.length
            ? html`<button class="btn pressable" @click=${() => this.call("join", { group_members: speakers.map((s) => s.entity_id) })}>
                <sn-icon icon="speaker-multi" style="--icon-size:18px"></sn-icon>${t("group_speakers")}
              </button>`
            : nothing}
          ${ctx.allows("cinema")
            ? html`<button class="btn pressable" @click=${() => this.cinema()}><sn-icon icon="movie" style="--icon-size:18px"></sn-icon>${t("cinema_mode")}</button>`
            : nothing}
        </div>
      </div>
    </div></div>`;
  }
}
