import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { domainOf, entityIcon, entityName, stateLabel } from "../entities";
import { LOCALE } from "../i18n";
import { shared } from "../theme";
import { watchVisible } from "../ui/visible";
import "../ui/icon";
import "../ui/skeleton";

interface Line {
  id: string;
  state: string;
  when: number;
}

/** What makes the day's story: people coming and going, doors and locks, the alarm, the robot, the gate, the TV. */
function storyIds(ctx: Ctx): string[] {
  const { hass } = ctx;
  return Object.values(hass.states)
    .filter((e) => {
      const d = domainOf(e.entity_id);
      if (hass.entities?.[e.entity_id]?.entity_category || hass.entities?.[e.entity_id]?.hidden) return false;
      if (["person", "lock", "alarm_control_panel", "vacuum"].includes(d)) return true;
      if (d === "cover") return ["garage", "gate", "door"].includes(e.attributes.device_class);
      if (d === "binary_sensor") return ["door", "garage_door"].includes(e.attributes.device_class);
      if (d === "media_player") return e.attributes.device_class === "tv";
      return false;
    })
    .map((e) => e.entity_id);
}

/** The house's day as a story, newest first: "7:02 Ahmad left · 9:15 the robot finished · 13:40 the gate opened". */
@customElement("sn-w-story")
export class SnStory extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private lines?: Line[];
  private timer?: number;
  private seen = true;
  private stopVis?: () => void;

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
        grid-template-rows: auto 1fr;
        gap: 10px;
        overflow: hidden;
      }
      h3 {
        margin: 0;
        font-size: 16px;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      ol {
        list-style: none;
        margin: 0;
        padding: 0;
        overflow: auto;
        position: relative;
      }
      li {
        display: grid;
        grid-template-columns: 52px 30px 1fr;
        gap: 8px;
        align-items: center;
        padding: 6px 0;
        position: relative;
        cursor: pointer;
      }
      /* The thread running down through the day. */
      li::before {
        content: "";
        position: absolute;
        inset-inline-start: 66px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: var(--border);
      }
      li:first-child::before {
        top: 50%;
      }
      li:last-child::before {
        bottom: 50%;
      }
      time {
        font-size: 13px;
        color: var(--text-2);
        font-variant-numeric: tabular-nums;
      }
      .ic {
        position: relative;
        z-index: 1;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--surface-solid);
        box-shadow: 0 0 0 3px var(--surface-2);
        --icon-size: 16px;
      }
      span.txt {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.load();
    this.timer = window.setInterval(() => this.seen && this.load(), 120_000);
    this.stopVis = watchVisible(this, (on) => (this.seen = on));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
    this.stopVis?.();
  }

  private async load() {
    const { hass } = this.ctx;
    const ids = storyIds(this.ctx);
    if (!ids.length) return void (this.lines = []);
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    try {
      const res = await hass.callWS<{ entity_id: string; state: string; when: number }[]>({ type: "logbook/get_events", start_time: start.toISOString(), entity_ids: ids });
      this.lines = res
        .filter((r) => r.entity_id && r.state && !["unavailable", "unknown"].includes(r.state))
        .map((r) => ({ id: r.entity_id, state: r.state, when: r.when * 1000 }))
        .sort((a, b) => b.when - a.when)
        .slice(0, 40);
    } catch {
      this.lines = [];
    }
  }

  render() {
    const { ctx } = this;
    const { t, hass, config, lang } = ctx;
    return html`<div class="card glass">
      <h3><sn-icon icon="book-open-variant" style="--icon-size:20px;color:var(--accent-text)"></sn-icon>${t("widget_story")}</h3>
      ${!this.lines
        ? html`<sn-skeleton></sn-skeleton>`
        : !this.lines.length
        ? html`<sn-empty text=${t("story_quiet")}></sn-empty>`
        : html`<ol>
            ${this.lines.map((l) => {
              const e = hass.states[l.id];
              const shown = e ? { ...e, state: l.state } : undefined;
              const who = entityName(hass, config, l.id);
              const what = domainOf(l.id) === "person" ? (l.state === "home" ? t("story_arrived") : l.state === "not_home" ? t("story_left") : l.state) : stateLabel(t, shown, lang);
              return html`<li @click=${() => ctx.openEntity(l.id)}>
                <time>${new Date(l.when).toLocaleTimeString(LOCALE[lang], { hour: "2-digit", minute: "2-digit" })}</time>
                <span class="ic"><sn-icon .icon=${entityIcon(shown, l.id)}></sn-icon></span>
                <span class="txt"><b>${who}</b> ${what}</span>
              </li>`;
            })}
          </ol>`}
      ${nothing}
    </div>`;
  }
}
