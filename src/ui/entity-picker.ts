import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import { entityIcon, listEntities, stateLabel, type EntityFilter } from "../entities";
import { shared } from "../theme";
import "./icon";

@customElement("sn-entity-picker")
export class SnEntityPicker extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) filter: EntityFilter = {};
  @property({ attribute: false }) onPick!: (entityId: string) => void;
  @state() private q = "";

  static styles = [
    shared,
    css`
      :host {
        display: grid;
        gap: 12px;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 2px;
      }
      li button {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 8px;
        border-radius: var(--r-sm);
        text-align: start;
      }
      li button:hover {
        background: var(--surface-2);
      }
      .ic {
        display: grid;
        place-items: center;
        width: 36px;
        height: 36px;
        border-radius: 999px;
        background: var(--surface-2);
      }
      .name {
        font-weight: 500;
      }
      .id {
        font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
        font-size: 12px;
        color: var(--text-2);
      }
      .grow {
        flex: 1;
        min-width: 0;
        display: grid;
      }
      .grow > * {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .state {
        unicode-bidi: plaintext;
        font-size: 13px;
        color: var(--text-2);
      }
      .empty {
        padding: 24px;
        text-align: center;
        color: var(--text-2);
      }
    `,
  ];

  firstUpdated() {
    this.renderRoot.querySelector("input")?.focus();
  }

  render() {
    const { ctx } = this;
    const q = this.q.trim().toLowerCase();
    const items = listEntities(ctx.hass, ctx.config, this.filter)
      .filter((e) => !q || e.name.toLowerCase().includes(q) || e.id.includes(q))
      .slice(0, 200);
    return html`
      <input type="search" placeholder=${ctx.t("search")} .value=${this.q} @input=${(e: any) => (this.q = e.target.value)} />
      ${items.length
        ? html`<ul>
            ${items.map(
              (e) => html`<li>
                <button class="pressable" @click=${() => this.onPick(e.id)}>
                  <span class="ic"><sn-icon .icon=${entityIcon(e.entity, e.id)} style="--icon-size:20px"></sn-icon></span>
                  <span class="grow"><span class="name">${e.name}</span><span class="id ltr">${e.id}</span></span>
                  <span class="state">${stateLabel(ctx.t, e.entity, ctx.lang)}</span>
                </button>
              </li>`
            )}
          </ul>`
        : html`<div class="empty">${ctx.t("no_entities")}</div>`}
    `;
  }
}
