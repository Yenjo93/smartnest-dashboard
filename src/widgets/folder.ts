import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { entityIcon, entityName, isActive, runTap, seen, stateLabel, tapKind, toneStyle } from "../entities";
import { shared } from "../theme";
import { haptic } from "../ui/haptic";
import "../ui/icon";

/** A folder of devices, like on a phone: four little icons on the card, everything inside one tap away. */
@customElement("sn-w-folder")
export class SnFolder extends LitElement {
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
        padding: 14px;
        display: grid;
        grid-template-rows: 1fr auto;
        gap: 8px;
        cursor: pointer;
        overflow: hidden;
      }
      .minis {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 6px;
        align-content: center;
        justify-items: center;
      }
      .mini {
        width: 40px;
        height: 40px;
        border-radius: 13px;
        display: grid;
        place-items: center;
        background: var(--surface-2);
        color: var(--text-2);
        --icon-size: 22px;
        transition: background 300ms, color 300ms;
      }
      .mini.on {
        background: var(--tone, var(--accent));
        color: var(--on-tone, #fff);
      }
      .foot {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
      }
      .foot b {
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .foot span {
        font-size: 13px;
        color: var(--text-2);
        flex: none;
      }
    `,
  ];

  private open() {
    const { ctx } = this;
    if (ctx.editing) return;
    haptic("tap");
    const ids: string[] = this.widget.config.entities ?? [];
    ctx.showSheet({
      title: this.widget.config.title || ctx.t("widget_folder"),
      render: (c) => html`<sn-folder-sheet .ctx=${c} .ids=${ids}></sn-folder-sheet>`,
    });
  }

  render() {
    const { ctx } = this;
    const { t, hass } = ctx;
    const ids: string[] = (this.widget.config.entities ?? []).filter((id: string) => hass.states[id]);
    const on = ids.filter((id) => isActive(hass.states[id])).length;
    return html`<div class="card glass pressable" role="button" tabindex="0" @click=${() => this.open()} @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this.open()}>
      <div class="minis">
        ${ids.slice(0, 4).map((id) => {
          const e = seen(hass.states[id]);
          return html`<span class="mini ${isActive(e) ? "on" : ""}" style=${toneStyle(e)}><sn-icon .icon=${entityIcon(e, id)}></sn-icon></span>`;
        })}
        ${!ids.length ? html`<sn-icon icon="folder" style="--icon-size:34px;color:var(--text-2);grid-column:1/-1"></sn-icon>` : nothing}
      </div>
      <div class="foot">
        <b>${this.widget.config.title || t("widget_folder")}</b>
        <span>${ids.length ? t("folder_on", { n: on, of: ids.length }) : t("folder_empty")}</span>
      </div>
    </div>`;
  }
}

/** Inside the folder: each device as a big toggle, long-press for its full controls. */
@customElement("sn-folder-sheet")
export class SnFolderSheet extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) ids: string[] = [];

  static styles = [
    shared,
    css`
      :host {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 10px;
      }
      button.d {
        display: grid;
        justify-items: start;
        gap: 10px;
        padding: 14px;
        min-height: 110px;
        border: 0;
        border-radius: var(--r-lg);
        background: var(--surface-2);
        color: var(--text);
        font: 600 15px var(--font);
        text-align: start;
        cursor: pointer;
        transition: background 250ms, transform 150ms;
      }
      button.d:active {
        transform: scale(0.96);
      }
      button.d.on {
        background: var(--surface-solid);
        box-shadow: inset 0 0 0 2px var(--tone, var(--accent));
      }
      .ic {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--surface-solid);
        --icon-size: 22px;
      }
      .on .ic {
        background: var(--tone, var(--accent));
        color: var(--on-tone, #fff);
      }
      small {
        color: var(--text-2);
        font-weight: 500;
      }
    `,
  ];

  render() {
    const { ctx } = this;
    const { hass, config, t, lang } = ctx;
    return this.ids
      .filter((id) => hass.states[id])
      .map((id) => {
        const e = seen(hass.states[id]);
        const on = isActive(e);
        return html`<button
          class="d ${on ? "on" : ""}"
          style=${toneStyle(e)}
          @click=${() => {
            if (tapKind(id) === "sheet") return ctx.openEntity(id);
            haptic(on ? "off" : "on");
            runTap(hass, hass.states[id]).catch(() => ctx.toast(t("error")));
            this.requestUpdate();
          }}
          @contextmenu=${(ev: Event) => (ev.preventDefault(), ctx.openEntity(id))}
        >
          <span class="ic"><sn-icon .icon=${entityIcon(e, id)}></sn-icon></span>
          <span>${entityName(hass, config, id)}<br /><small>${stateLabel(t, e, lang)}</small></span>
        </button>`;
      });
  }
}
