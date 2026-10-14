import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { uid } from "../config";
import { loadKv, saveKv, watchKv } from "../kv";
import { shared } from "../theme";
import "../ui/icon";

interface Kid {
  id: string;
  name: string;
  emoji: string;
}
interface Task {
  id: string;
  title: string;
  emoji: string;
}
export interface Chores {
  kids: Kid[];
  tasks: Task[];
  /** day (YYYY-MM-DD) → task id → kids who did it */
  done: Record<string, Record<string, string[]>>;
  goal: number;
  reward: string;
}

const day = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Stars since Saturday, the start of the week here. */
function weekStars(c: Chores, kid: string): number {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - ((now.getDay() + 1) % 7));
  start.setHours(0, 0, 0, 0);
  return Object.entries(c.done)
    .filter(([d]) => new Date(`${d}T12:00`) >= start)
    .reduce((n, [, tasks]) => n + Object.values(tasks).filter((kids) => kids.includes(kid)).length, 0);
}

const EMPTY: Chores = { kids: [], tasks: [], done: {}, goal: 20, reward: "" };

/** The kids' chores: tap your face under a task when it's done, collect stars for the week's reward. */
@customElement("sn-w-chores")
export class SnChores extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private c: Chores = EMPTY;
  @state() private setup = false;
  @state() private burst?: string;
  private unwatch?: Promise<() => void>;

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
        gap: 12px;
        align-content: start;
        overflow: auto;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .head h3 {
        flex: 1;
        margin: 0;
        font-size: 16px;
      }
      .kids {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
        gap: 8px;
      }
      .kid {
        display: grid;
        gap: 6px;
        justify-items: center;
        padding: 10px;
        border-radius: var(--r-md);
        background: var(--surface-2);
        text-align: center;
      }
      .kid .face {
        font-size: 30px;
        line-height: 1;
      }
      .kid b {
        font-size: 14px;
      }
      .stars {
        font-size: 13px;
        font-weight: 700;
        color: #e9971d;
      }
      .bar {
        width: 100%;
        height: 6px;
        border-radius: 999px;
        background: color-mix(in srgb, var(--text) 10%, transparent);
        overflow: hidden;
      }
      .bar span {
        display: block;
        height: 100%;
        background: linear-gradient(90deg, #f5b301, #e9971d);
        border-radius: inherit;
        transition: width 600ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .won {
        font-size: 12px;
        font-weight: 700;
        color: var(--success);
      }
      .task {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      .task .tt {
        flex: 1;
        font-weight: 500;
      }
      .who {
        display: flex;
        gap: 6px;
      }
      .who button {
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 999px;
        border: 2px solid transparent;
        background: var(--surface);
        font-size: 20px;
        cursor: pointer;
        filter: grayscale(0.9);
        opacity: 0.6;
        transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .who button[aria-pressed="true"] {
        filter: none;
        opacity: 1;
        border-color: #f5b301;
      }
      .who button:active {
        transform: scale(0.9);
      }
      .pop {
        position: absolute;
        inset: -14px 0 auto;
        font-size: 16px;
        animation: pop 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        pointer-events: none;
      }
      @keyframes pop {
        from {
          transform: translateY(10px) scale(0.6);
          opacity: 1;
        }
        to {
          transform: translateY(-14px) scale(1.4);
          opacity: 0;
        }
      }
      .setup {
        display: grid;
        gap: 8px;
      }
      .setup .row {
        display: flex;
        gap: 6px;
        align-items: center;
      }
      .setup input {
        flex: 1;
      }
      .setup .emoji {
        max-width: 64px;
        text-align: center;
      }
      @media (prefers-reduced-motion: reduce) {
        .pop {
          animation: none;
          opacity: 0;
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    loadKv<Chores>(this.ctx.hass, "chores").then((v) => (this.c = { ...EMPTY, ...(v ?? {}) }));
    this.unwatch = watchKv<Chores>(this.ctx.hass, "chores", (v) => (this.c = { ...EMPTY, ...(v ?? {}) }));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unwatch?.then((u) => u()).catch(() => undefined);
  }

  private save(c: Chores) {
    // Keep the last five weeks only.
    const cutoff = day(new Date(Date.now() - 35 * 86_400_000));
    c = { ...c, done: Object.fromEntries(Object.entries(c.done).filter(([d]) => d >= cutoff)) };
    this.c = c;
    saveKv(this.ctx.hass, "chores", c).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  private toggle(task: string, kid: string) {
    const today = day();
    const d = { ...(this.c.done[today] ?? {}) };
    const who = d[task] ?? [];
    const did = who.includes(kid);
    d[task] = did ? who.filter((k) => k !== kid) : [...who, kid];
    if (!did) {
      this.burst = `${task}|${kid}`;
      navigator.vibrate?.(20);
      window.setTimeout(() => (this.burst = undefined), 700);
    }
    this.save({ ...this.c, done: { ...this.c.done, [today]: d } });
  }

  private renderSetup() {
    const { t } = this.ctx;
    const c = this.c;
    const list = <T extends Kid | Task>(items: T[], key: "kids" | "tasks", label: string) => html`<b style="font-size:14px">${label}</b>
      ${items.map(
        (x) => html`<div class="row">
          <span style="font-size:22px">${x.emoji}</span><span style="flex:1">${"name" in x ? x.name : (x as Task).title}</span>
          <button class="icon-btn small pressable" aria-label=${t("delete")} @click=${() => this.save({ ...c, [key]: (c[key] as T[]).filter((y) => y.id !== x.id) })}>
            <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
          </button>
        </div>`
      )}
      <form
        class="row"
        @submit=${(e: SubmitEvent) => {
          e.preventDefault();
          const f = e.currentTarget as HTMLFormElement;
          const name = (f.elements.namedItem("n") as HTMLInputElement).value.trim();
          const emoji = (f.elements.namedItem("e") as HTMLInputElement).value.trim() || (key === "kids" ? "🙂" : "⭐");
          if (!name) return;
          const item = key === "kids" ? { id: uid(), name, emoji } : { id: uid(), title: name, emoji };
          this.save({ ...c, [key]: [...c[key], item] });
          f.reset();
        }}
      >
        <input class="emoji" name="e" placeholder=${key === "kids" ? "🙂" : "🛏️"} />
        <input name="n" placeholder=${t(key === "kids" ? "chores_kid_name" : "chores_task_name")} />
        <button class="icon-btn primary pressable" type="submit" aria-label=${t("add")}><sn-icon icon="plus" style="--icon-size:18px"></sn-icon></button>
      </form>`;
    return html`<div class="setup">
      ${list(c.kids, "kids", t("chores_kids"))} ${list(c.tasks, "tasks", t("chores_tasks"))}
      <label class="field"
        >${t("chores_goal")}
        <input type="number" min="1" .value=${String(c.goal)} @change=${(e: any) => this.save({ ...c, goal: Number(e.target.value) || 20 })} />
      </label>
      <label class="field"
        >${t("chores_reward")}
        <input type="text" .value=${c.reward} placeholder=${t("chores_reward_hint")} @change=${(e: any) => this.save({ ...c, reward: e.target.value.trim() })} />
      </label>
    </div>`;
  }

  render() {
    const { t } = this.ctx;
    const c = this.c;
    const today = c.done[day()] ?? {};
    return html`<div class="card glass">
      <div class="head">
        <sn-icon icon="star" style="--icon-size:20px;color:#f5b301"></sn-icon>
        <h3>${t("widget_chores")}</h3>
        <button class="icon-btn small pressable" aria-pressed=${this.setup} aria-label=${t("settings")} @click=${() => (this.setup = !this.setup)}>
          <sn-icon icon=${this.setup ? "check" : "cog"} style="--icon-size:18px"></sn-icon>
        </button>
      </div>
      ${this.setup || !c.kids.length || !c.tasks.length
        ? this.renderSetup()
        : html`<div class="kids">
              ${c.kids.map((k) => {
                const n = weekStars(c, k.id);
                return html`<div class="kid">
                  <span class="face">${k.emoji}</span><b>${k.name}</b>
                  <span class="stars">⭐ ${n} / ${c.goal}</span>
                  <div class="bar"><span style="width:${Math.min(100, (n / c.goal) * 100)}%"></span></div>
                  ${n >= c.goal ? html`<span class="won">🎉 ${c.reward || t("chores_won")}</span>` : nothing}
                </div>`;
              })}
            </div>
            ${c.tasks.map(
              (task) => html`<div class="task">
                <span style="font-size:22px">${task.emoji}</span>
                <span class="tt">${task.title}</span>
                <span class="who">
                  ${c.kids.map(
                    (k) => html`<button aria-pressed=${(today[task.id] ?? []).includes(k.id)} aria-label=${k.name} title=${k.name} @click=${() => this.toggle(task.id, k.id)}>
                      ${k.emoji}${this.burst === `${task.id}|${k.id}` ? html`<span class="pop">⭐</span>` : nothing}
                    </button>`
                  )}
                </span>
              </div>`
            )}`}
    </div>`;
  }
}
