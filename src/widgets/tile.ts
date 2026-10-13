import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { toneStyle, entityIcon, entityName, isActive, runTap, stateLabel, tapKind } from "../entities";
import { bindPress } from "../ui/press";
import { shared } from "../theme";
import "../ui/icon";

/** One device, Apple Home style: tap toggles, long-press opens the detail sheet. */
@customElement("sn-w-tile")
export class SnTile extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  private unbind?: () => void;

  static styles = [
    shared,
    css`
      :host {
        display: block;
        height: 100%;
      }
      .tile {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        border-radius: var(--r-lg);
        cursor: pointer;
        text-align: start;
        overflow: hidden;
      }
      .tile.vertical {
        padding: 12px 14px;
        gap: 6px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
      }
      .ic {
        display: grid;
        place-items: center;
        width: 44px;
        height: 44px;
        border-radius: 999px;
        background: var(--surface-2);
        color: var(--text-2);
        flex: none;
        transition: background-color var(--dur) var(--ease-out), color var(--dur) var(--ease-out);
      }
      .text {
        min-width: 0;
        display: grid;
        gap: 2px;
      }
      .name {
        font-weight: 700;
        font-size: 15px;
        line-height: 1.25;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .state {
        unicode-bidi: plaintext; /* "1,840 W" stays LTR inside Arabic text */
        font-size: 13px;
        color: var(--text-2);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tile.on {
        background: var(--surface-solid);
        border-color: transparent;
      }
      .tile.on .ic {
        background: var(--tone);
        color: var(--on-tone);
      }
      .tile.on .state {
        color: var(--text);
      }
      .tile.off-line {
        opacity: 0.55;
      }
    `,
  ];

  private bind() {
    const el = this.renderRoot.querySelector<HTMLElement>(".tile");
    if (el && !this.unbind) this.unbind = bindPress(el, () => this.tap(), () => this.ctx.openEntity(this.widget.config.entity));
  }

  protected firstUpdated() {
    this.bind();
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.hasUpdated) this.bind(); // re-attached after a drag reorder
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unbind?.();
    this.unbind = undefined;
  }

  private tap() {
    if (this.ctx.editing) return;
    const id = this.widget.config.entity as string;
    const e = this.ctx.hass.states[id];
    if (!e || e.state === "unavailable" || tapKind(id) === "sheet") return this.ctx.openEntity(id);
    navigator.vibrate?.(5);
    runTap(this.ctx.hass, e).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  render() {
    const { ctx } = this;
    const id = (this.widget.config.entity as string) ?? "";
    const e = ctx.hass.states[id];
    const on = isActive(e);
    const vertical = ctx.narrow || this.widget.h >= 3 || this.widget.w <= 2;
    return html`
      <div
        class="tile glass pressable ${vertical ? "vertical" : ""} ${on ? "on" : ""} ${!e || e.state === "unavailable" ? "off-line" : ""}"
        style=${toneStyle(e)}
        role="button"
        tabindex="0"
        aria-pressed=${on}
      >
        <span class="ic"><sn-icon .icon=${entityIcon(e, id)}></sn-icon></span>
        <span class="text">
          <span class="name">${entityName(ctx.hass, ctx.config, id)}</span>
          <span class="state">${stateLabel(ctx.t, e, ctx.lang)}</span>
        </span>
      </div>
    `;
  }
}
