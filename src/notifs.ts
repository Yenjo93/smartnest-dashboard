import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import type { Hass } from "./types";
import { domainOf, entityIcon, entityName, relativeTime, stateLabel } from "./entities";
import { shared } from "./theme";
import "./ui/icon";
import "./ui/skeleton";

export interface HaNote {
  notification_id: string;
  title?: string;
  message: string;
  created_at: string;
}

/** Home Assistant's own notifications (updates, repairs, integrations asking for attention), kept live. */
export function watchNotes(hass: Hass, cb: (notes: HaNote[]) => void): Promise<() => void> {
  const map = new Map<string, HaNote>();
  return hass.connection.subscribeMessage<{ type: string; notifications: Record<string, HaNote> }>(
    (m) => {
      if (m.type === "current") map.clear();
      for (const [id, n] of Object.entries(m.notifications ?? {})) m.type === "removed" ? map.delete(id) : map.set(id, n);
      cb([...map.values()].sort((a, b) => b.created_at.localeCompare(a.created_at)));
    },
    { type: "persistent_notification/subscribe" }
  );
}

const SAFETY = ["door", "window", "garage_door", "opening", "moisture", "smoke", "gas", "carbon_monoxide", "safety", "tamper"];

/** The things worth a history: locks, alarms, doors and windows, leaks, smoke. */
function watchedIds(hass: Hass): string[] {
  return Object.values(hass.states)
    .filter((e) => {
      const d = domainOf(e.entity_id);
      if (hass.entities?.[e.entity_id]?.entity_category || hass.entities?.[e.entity_id]?.hidden) return false;
      return d === "lock" || d === "alarm_control_panel" || d === "event" || (d === "binary_sensor" && SAFETY.includes(e.attributes.device_class));
    })
    .map((e) => e.entity_id);
}

interface Row {
  id: string;
  state: string;
  when: number;
}

/** One place for everything that happened: Home Assistant's notifications, then the last day of doors, locks and alarms. */
@customElement("sn-notifs")
export class SnNotifs extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) notes: HaNote[] = [];
  @state() private rows?: Row[];

  static styles = [
    shared,
    css`
      :host {
        display: grid;
        gap: 16px;
      }
      h3 {
        margin: 0;
        font-size: 14px;
        color: var(--text-2);
        font-weight: 600;
      }
      .note {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 4px 10px;
        padding: 12px 14px;
        border-radius: var(--r-md);
        background: color-mix(in srgb, var(--accent) 12%, var(--surface-2));
      }
      .note b {
        font-size: 15px;
      }
      .note p {
        grid-column: 1 / -1;
        margin: 0;
        font-size: 14px;
        color: var(--text-2);
        white-space: pre-line;
        max-height: 7.5em;
        overflow: hidden;
      }
      .ev {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 4px;
        border-bottom: 1px solid var(--border);
        cursor: pointer;
      }
      .ev:last-child {
        border-bottom: 0;
      }
      .ev .ic {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--surface-2);
        --icon-size: 18px;
        flex: none;
      }
      .ev.alert .ic {
        background: color-mix(in srgb, var(--alert) 22%, transparent);
        color: var(--alert-text);
      }
      .ev span {
        flex: 1;
        min-width: 0;
      }
      .ev small {
        color: var(--text-2);
        flex: none;
      }
    `,
  ];

  async connectedCallback() {
    super.connectedCallback();
    const { hass } = this.ctx;
    const ids = watchedIds(hass);
    if (!ids.length) return void (this.rows = []);
    try {
      const start = new Date(Date.now() - 24 * 3600_000).toISOString();
      const res = await hass.callWS<{ entity_id: string; state: string; when: number }[]>({ type: "logbook/get_events", start_time: start, entity_ids: ids });
      this.rows = res
        .filter((r) => r.entity_id && r.state !== undefined && r.state !== "unavailable" && r.state !== "unknown")
        .map((r) => ({ id: r.entity_id, state: r.state, when: r.when * 1000 }))
        .sort((a, b) => b.when - a.when)
        .slice(0, 60);
    } catch {
      this.rows = [];
    }
  }

  render() {
    const { ctx } = this;
    const { t, hass, config, lang } = ctx;
    return html`${this.notes.length
        ? html`<h3>${t("notif_ha")}</h3>
            ${this.notes.map(
              (n) => html`<div class="note">
                <b>${n.title || "Home Assistant"}</b>
                ${ctx.isAdmin
                  ? html`<button
                      class="icon-btn small pressable"
                      aria-label=${t("close")}
                      @click=${() => hass.callService("persistent_notification", "dismiss", { notification_id: n.notification_id }).catch(() => ctx.toast(t("error")))}
                    >
                      <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                    </button>`
                  : html`<span></span>`}
                <p>${n.message.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")}</p>
              </div>`
            )}`
        : nothing}
      <h3>${t("notif_day")}</h3>
      ${!this.rows
        ? html`<sn-skeleton></sn-skeleton>`
        : this.rows.length
        ? html`<div>
            ${this.rows.map((r) => {
              const e = hass.states[r.id];
              const shown = e ? { ...e, state: r.state } : undefined;
              const alert = ["unlocked", "open", "triggered"].includes(r.state) || (r.state === "on" && ["moisture", "smoke", "gas", "carbon_monoxide", "safety", "tamper"].includes(e?.attributes.device_class));
              return html`<div class="ev ${alert ? "alert" : ""}" @click=${() => ctx.openEntity(r.id)}>
                <span class="ic"><sn-icon .icon=${entityIcon(shown, r.id)}></sn-icon></span>
                <span>${entityName(hass, config, r.id)} · ${stateLabel(t, shown, lang)}</span>
                <small>${relativeTime(t, new Date(r.when).toISOString())}</small>
              </div>`;
            })}
          </div>`
        : html`<sn-empty text=${t("notif_quiet")}></sn-empty>`}`;
  }
}
