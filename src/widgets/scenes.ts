import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { domainOf, entityIcon, entityName } from "../entities";
import { shared } from "../theme";
import "../ui/icon";

/** Scenes and scripts as big buttons: "movie night", "guests", "all off". */
export function sceneList(ctx: Ctx, chosen?: string[]): string[] {
  if (chosen?.length) return chosen.filter((id) => ctx.hass.states[id]);
  return Object.keys(ctx.hass.states)
    .filter((id) => (id.startsWith("scene.") || id.startsWith("script.")) && !ctx.hass.entities?.[id]?.hidden && !ctx.hass.entities?.[id]?.entity_category)
    .slice(0, 8);
}

@customElement("sn-w-scenes")
export class SnScenes extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private done = "";
  private timer?: number;

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
        gap: 10px;
        align-content: start;
        overflow: auto;
      }
      h3 {
        margin: 0;
        font-size: 16px;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(118px, 1fr));
        gap: 8px;
      }
      button.s {
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 58px;
        padding: 10px 12px;
        border-radius: var(--r-md);
        border: 0;
        background: var(--surface-2);
        color: var(--text);
        font: 600 14px var(--font);
        text-align: start;
        cursor: pointer;
        transition: background 250ms, transform 150ms;
      }
      button.s:active {
        transform: scale(0.96);
      }
      button.s.done {
        background: var(--accent);
        color: var(--on-accent);
      }
      button.s sn-icon {
        --icon-size: 22px;
        flex: none;
      }
    `,
  ];

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this.timer);
  }

  private run(id: string) {
    navigator.vibrate?.(8);
    this.ctx.hass.callService(domainOf(id), "turn_on", { entity_id: id }).catch(() => this.ctx.toast(this.ctx.t("error")));
    this.done = id;
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => (this.done = ""), 1600);
  }

  render() {
    const { ctx } = this;
    const { t, hass, config } = ctx;
    const ids = sceneList(ctx, this.widget.config.entities);
    return html`<div class="card glass">
      <h3><sn-icon icon="palette" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${this.widget.config.title || t("widget_scenes")}</h3>
      ${ids.length
        ? html`<div class="grid">
            ${ids.map(
              (id) => html`<button class="s ${this.done === id ? "done" : ""}" @click=${() => this.run(id)}>
                <sn-icon icon=${this.done === id ? "check" : entityIcon(hass.states[id], id)}></sn-icon>${entityName(hass, config, id)}
              </button>`
            )}
          </div>`
        : html`<sn-empty text=${t("no_entities")}></sn-empty>`}
      ${nothing}
    </div>`;
  }
}
