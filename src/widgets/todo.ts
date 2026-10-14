import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { entityName } from "../entities";
import { shared } from "../theme";
import "../ui/icon";
import { haptic } from "../ui/haptic";

interface Item {
  uid: string;
  summary: string;
  status: "needs_action" | "completed";
}

/** A shared family list (shopping, chores) from any HA to-do list, live-updated from every phone. */
@customElement("sn-w-todo")
export class SnTodo extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private items: Item[] = [];
  private unsub?: Promise<() => void>;

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
        grid-template-rows: auto auto 1fr;
        gap: 10px;
        overflow: hidden;
      }
      h3 {
        margin: 0;
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 16px;
        --icon-size: 20px;
      }
      h3 sn-icon {
        color: var(--accent-text);
      }
      form {
        display: flex;
        gap: 6px;
      }
      form input {
        min-height: 40px;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        overflow: auto;
        display: grid;
        align-content: start;
        gap: 2px;
      }
      li button {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 6px;
        border-radius: 10px;
        text-align: start;
        font-size: 15px;
        --icon-size: 22px;
      }
      li sn-icon {
        color: var(--text-2);
      }
      li.done span {
        text-decoration: line-through;
        color: var(--text-2);
      }
      li.done sn-icon {
        color: var(--success);
      }
      li {
        animation: in 260ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(4px);
        }
      }
      .empty {
        color: var(--text-2);
        font-size: 14px;
      }
    `,
  ];

  private get entity(): string | undefined {
    return this.widget.config.entity ?? Object.keys(this.ctx.hass.states).find((id) => id.startsWith("todo."));
  }

  connectedCallback() {
    super.connectedCallback();
    const id = this.entity;
    if (!id) return;
    this.unsub = this.ctx.hass.connection.subscribeMessage<{ items: Item[] }>((m) => (this.items = m.items ?? []), { type: "todo/item/subscribe", entity_id: id });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsub?.then((u) => u()).catch(() => undefined);
  }

  private add(e: SubmitEvent) {
    e.preventDefault();
    const input = (e.currentTarget as HTMLFormElement).querySelector("input")!;
    const item = input.value.trim();
    if (!item || !this.entity) return;
    input.value = "";
    this.ctx.hass.callService("todo", "add_item", { entity_id: this.entity, item }).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  private toggle(it: Item) {
    haptic("tap");
    this.ctx.hass
      .callService("todo", "update_item", { entity_id: this.entity, item: it.uid, status: it.status === "completed" ? "needs_action" : "completed" })
      .catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  render() {
    const { ctx } = this;
    const id = this.entity;
    const open = this.items.filter((i) => i.status !== "completed");
    const done = this.items.filter((i) => i.status === "completed").slice(0, 5);
    return html`<div class="card glass">
      <h3><sn-icon icon="todo"></sn-icon>${id ? entityName(ctx.hass, ctx.config, id) : ctx.t("widget_todo")}</h3>
      ${id
        ? html`<form @submit=${this.add}>
            <input type="text" placeholder=${ctx.t("add_placeholder")} />
            <button class="icon-btn primary pressable" type="submit" aria-label=${ctx.t("add")}><sn-icon icon="plus" style="--icon-size:20px"></sn-icon></button>
          </form>`
        : nothing}
      <ul>
        ${repeat(
          [...open, ...done],
          (i) => i.uid,
          (i) => html`<li class=${i.status === "completed" ? "done" : ""}>
            <button class="pressable" @click=${() => this.toggle(i)}>
              <sn-icon icon=${i.status === "completed" ? "circle-check" : "circle-outline"}></sn-icon><span>${i.summary}</span>
            </button>
          </li>`
        )}
        ${!this.items.length ? html`<li class="empty">${ctx.t("todo_empty")}</li>` : nothing}
      </ul>
    </div>`;
  }
}
