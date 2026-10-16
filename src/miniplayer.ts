import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import type { HassEntity } from "./types";
import { entityName } from "./entities";
import { haptic } from "./ui/haptic";
import "./ui/icon";

/** What's playing in the house (a speaker or a TV with a title), ignoring the wall tablet's own browser player. */
export function nowPlaying(ctx: Ctx): HassEntity | undefined {
  const { hass } = ctx;
  return Object.values(hass.states).find(
    (e) =>
      e.entity_id.startsWith("media_player.") &&
      e.state === "playing" &&
      !!e.attributes.media_title &&
      hass.entities?.[e.entity_id]?.platform !== "fully_kiosk" &&
      !hass.entities?.[e.entity_id]?.hidden
  );
}

/** A small player that floats at the bottom while music plays: cover, title, play/pause and next, from any page. */
@customElement("sn-miniplayer")
export class SnMiniPlayer extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) player!: HassEntity;

  static styles = css`
    :host {
      position: fixed;
      z-index: 24;
      bottom: calc(84px + env(safe-area-inset-bottom));
      inset-inline-start: 16px;
      max-width: min(360px, calc(100vw - 32px));
      animation: in 420ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .p {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px;
      padding-inline-end: 8px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--surface-solid) 88%, transparent);
      -webkit-backdrop-filter: var(--glass-filter, blur(var(--glass-blur, 24px)) saturate(160%));
      backdrop-filter: var(--glass-filter, blur(var(--glass-blur, 24px)) saturate(160%));
      box-shadow: var(--shadow-lift);
      color: var(--text);
      cursor: pointer;
    }
    .art {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--surface-2) center / cover;
      flex: none;
      animation: spin 14s linear infinite;
      animation-play-state: var(--loops, running);
    }
    .t {
      min-width: 0;
      display: grid;
      line-height: 1.25;
    }
    .t b,
    .t span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .t b {
      font-size: 14px;
    }
    .t span {
      font-size: 12px;
      color: var(--text-2);
    }
    button {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 0;
      background: var(--surface-2);
      color: var(--text);
      display: grid;
      place-items: center;
      cursor: pointer;
      flex: none;
      --icon-size: 20px;
    }
    button.main {
      background: var(--accent);
      color: var(--on-accent);
    }
    @keyframes in {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.9);
      }
    }
    @keyframes spin {
      to {
        rotate: 360deg;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host,
      .art {
        animation: none;
      }
    }
  `;

  private call(service: string) {
    haptic("tap");
    this.ctx.hass.callService("media_player", service, { entity_id: this.player.entity_id }).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  render() {
    const { ctx, player: p } = this;
    const a = p.attributes;
    const art = a.entity_picture ? ctx.hass.hassUrl(a.entity_picture) : undefined;
    return html`<div class="p" role="group" aria-label=${a.media_title} @click=${() => ctx.openEntity(p.entity_id)}>
      <span class="art" style=${art ? `background-image:url('${art}')` : ""}></span>
      <span class="t"><b>${a.media_title}</b><span>${a.media_artist || entityName(ctx.hass, ctx.config, p.entity_id)}</span></span>
      <button class="main" aria-label="pause" @click=${(e: Event) => (e.stopPropagation(), this.call("media_play_pause"))}><sn-icon icon="pause"></sn-icon></button>
      ${(a.supported_features ?? 0) & 32 ? html`<button aria-label="next" @click=${(e: Event) => (e.stopPropagation(), this.call("media_next_track"))}><sn-icon icon="skip-next"></sn-icon></button>` : nothing}
    </div>`;
  }
}
