import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import { areaOf, entityIcon, listEntities, stateLabel, type EntityFilter } from "../entities";

type Row = ReturnType<typeof listEntities>[number] & { area: string; areaName: string; extra: boolean; hay: string };
const PAGE = 40;
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
      .rooms {
        display: flex;
        gap: 6px;
        overflow-x: auto;
        scrollbar-width: none;
        padding-bottom: 2px;
      }
      .rooms button {
        flex: none;
        border: 0;
        border-radius: 999px;
        padding: 7px 14px;
        background: var(--surface-2);
        color: var(--text);
        font: 500 14px var(--font);
        cursor: pointer;
      }
      .rooms button[aria-pressed="true"] {
        background: var(--accent);
        color: var(--on-accent);
      }
      ul {
        content-visibility: auto;
      }
      .link {
        border: 0;
        background: none;
        color: var(--text-2);
        font: 13px var(--font);
        text-decoration: underline;
        cursor: pointer;
        justify-self: center;
      }
      .empty {
        padding: 24px;
        text-align: center;
        color: var(--text-2);
      }
    `,
  ];

  @state() private area = "";
  @state() private more = 0;
  @state() private showAll = false;
  private all?: Row[];
  private searchTimer?: number;

  firstUpdated() {
    this.renderRoot.querySelector("input")?.focus();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this.searchTimer);
  }

  /**
   * The list is read once when the picker opens (not on every state change in the house), without the
   * diagnostic and hidden entities a device brings along (its firmware, its signal…) unless asked for.
   */
  private rows(): Row[] {
    if (this.all) return this.all;
    const { hass, config } = this.ctx;
    const areas = hass.areas ?? {};
    this.all = listEntities(hass, config, this.filter).map((e) => {
      const reg = hass.entities?.[e.id];
      const area = areaOf(hass, e.id) ?? "";
      return {
        ...e,
        area,
        areaName: areas[area]?.name ?? "",
        extra: !!(reg?.hidden || reg?.entity_category),
        hay: `${e.name} ${e.id} ${areas[area]?.name ?? ""}`.toLowerCase(),
      };
    });
    return this.all;
  }

  render() {
    const { ctx } = this;
    const t = ctx.t;
    const q = this.q.trim().toLowerCase();
    const all = this.rows();
    // When only technical ones match (a tablet's screen switch, say), show them rather than nothing.
    const main = this.showAll || all.every((r) => r.extra) ? all : all.filter((r) => !r.extra);
    const hidden = all.length - main.length;
    // Rooms that have something to pick, biggest first.
    const counts = new Map<string, number>();
    for (const r of main) if (r.area) counts.set(r.area, (counts.get(r.area) ?? 0) + 1);
    const rooms = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    const found = main.filter((r) => (!this.area || r.area === this.area) && (!q || q.split(/\s+/).every((w) => r.hay.includes(w))));
    const shown = found.slice(0, PAGE + this.more);
    return html`
      <input
        type="search"
        placeholder=${t("search")}
        .value=${this.q}
        @input=${(e: any) => {
          const v = e.target.value;
          window.clearTimeout(this.searchTimer);
          // Wait for the typing to pause: a big house has thousands of names to look through.
          this.searchTimer = window.setTimeout(() => ((this.q = v), (this.more = 0)), 160);
        }}
      />
      ${rooms.length > 1
        ? html`<div class="rooms">
            <button aria-pressed=${!this.area} @click=${() => ((this.area = ""), (this.more = 0))}>${t("area_all")}</button>
            ${rooms.map(
              ([id]) => html`<button aria-pressed=${this.area === id} @click=${() => ((this.area = this.area === id ? "" : id), (this.more = 0))}>
                ${ctx.hass.areas?.[id]?.name ?? id}
              </button>`
            )}
          </div>`
        : nothing}
      ${shown.length
        ? html`<ul>
            ${shown.map(
              (e) => html`<li>
                <button class="pressable" @click=${() => this.onPick(e.id)}>
                  <span class="ic"><sn-icon .icon=${entityIcon(e.entity, e.id)} style="--icon-size:20px"></sn-icon></span>
                  <span class="grow"
                    ><span class="name">${e.name}</span><span class="id"
                      >${e.areaName ? html`${e.areaName} · ` : nothing}<span class="ltr">${e.id}</span></span
                    ></span
                  >
                  <span class="state">${stateLabel(ctx.t, e.entity, ctx.lang)}</span>
                </button>
              </li>`
            )}
          </ul>`
        : html`<div class="empty">${ctx.t("no_entities")}</div>`}
      ${found.length > shown.length
        ? html`<button class="btn pressable" @click=${() => (this.more += PAGE)}>${t("picker_more", { n: found.length - shown.length })}</button>`
        : nothing}
      ${hidden && !this.showAll
        ? html`<button class="link" @click=${() => (this.showAll = true)}>${t("picker_show_extra", { n: hidden })}</button>`
        : nothing}
    `;
  }
}
