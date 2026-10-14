import { html, nothing, type TemplateResult } from "lit";
import type { Ctx } from "./ctx";
import type { HassEntity } from "./types";
import { domainOf, entityName, formatNumber, ltr, relativeTime } from "./entities";
import { dashboardEntities } from "./chips";
import { findTablets } from "./fully";
import { PARTS, hoursLeft, robotParts } from "./widgets/vacuum";
import { maintenanceDue, weeklyFaults } from "./installer";
import { LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

/** Devices that dropped off the network this week, from the logbook (loads on its own). */
@customElement("sn-faults")
export class SnFaults extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @state() private rows?: { id: string; name: string; n: number }[];

  connectedCallback() {
    super.connectedCallback();
    weeklyFaults(this.ctx).then((r) => (this.rows = r));
  }

  createRenderRoot() {
    return this; // inherit the sheet's styles
  }

  render() {
    const { t } = this.ctx;
    if (!this.rows) return html`<span class="muted" style="font-size:14px">${t("loading")}</span>`;
    return box(t("faults_week"), !this.rows.length, list(this.rows.map((r) => row(r.name, t("times", { n: r.n })))), t("h_all_good"));
  }
}
import "./ui/icon";

const box = (title: string, ok: boolean, body: unknown, okText: string, always = false): TemplateResult => html`<section
  style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)"
>
  <div style="display:flex;align-items:center;gap:8px;font-weight:700">
    <sn-icon icon=${ok ? "check-circle" : "alert-circle-outline"} style="--icon-size:20px;color:${ok ? "var(--success)" : "var(--alert-text)"}"></sn-icon>
    ${title}
  </div>
  ${ok && !always ? html`<span class="muted" style="font-size:14px">${okText}</span>` : body}
</section>`;

const list = (rows: TemplateResult[]) => html`<div style="display:grid;gap:4px;font-size:14px">${rows}</div>`;
const row = (a: unknown, b: unknown) => html`<div style="display:flex;justify-content:space-between;gap:12px"><span>${a}</span><span class="muted" style="unicode-bidi:plaintext">${b}</span></div>`;

const findSensor = (states: HassEntity[], re: RegExp) => states.find((e) => e.entity_id.startsWith("sensor.") && re.test(e.entity_id));

/**
 * Installer-only overview of this house: what's offline, what needs a battery, whether backups run,
 * the hub's own vitals, the wall tablets (with a remote reload), and robot parts to replace.
 */
export function healthSheet(ctx: Ctx) {
  ctx.showSheet({
    title: ctx.t("health"),
    render: (c) => {
      const { hass, t, config } = c;
      const all = Object.values(hass.states);
      const good = t("h_all_good");

      const onBoard = new Set(dashboardEntities(config));
      const offline = all
        .filter((e) => e.state === "unavailable" && onBoard.has(e.entity_id))
        .sort((a, b) => a.last_changed.localeCompare(b.last_changed));

      const low = all
        .filter((e) => {
          if (e.attributes.device_class !== "battery") return false;
          if (domainOf(e.entity_id) === "binary_sensor") return e.state === "on";
          const v = Number(e.state);
          return domainOf(e.entity_id) === "sensor" && !Number.isNaN(v) && v < 20;
        })
        .sort((a, b) => Number(a.state) - Number(b.state));

      const backup = all.find((e) => /backup_last_successful_automatic_backup$/.test(e.entity_id));
      const backupAt = backup ? Date.parse(backup.state) : NaN;
      const backupDays = Number.isNaN(backupAt) ? undefined : Math.floor((Date.now() - backupAt) / 86_400_000);

      const updates = all.filter((e) => domainOf(e.entity_id) === "update" && e.state === "on");

      const disk = findSensor(all, /disk_use_percent|disk_usage/);
      const cpuTemp = findSensor(all, /processor_temperature|cpu_temperature/);
      const mem = findSensor(all, /memory_use_percent|memory_usage/);
      const sys = [disk && row(t("h_disk"), ltr(`${formatNumber(Number(disk.state), c.lang, 0)}%`)), cpuTemp && row(t("h_cpu_temp"), ltr(`${formatNumber(Number(cpuTemp.state), c.lang, 0)}°`)), mem && row(t("h_memory"), ltr(`${formatNumber(Number(mem.state), c.lang, 0)}%`))].filter(Boolean) as TemplateResult[];
      const sysBad = (disk && Number(disk.state) > 85) || (cpuTemp && Number(cpuTemp.state) > 75);

      const robots = [...onBoard].filter((id) => domainOf(id) === "vacuum" && hass.states[id]);
      const worn = robots.flatMap((id) => {
        const parts = robotParts(hass, id);
        return PARTS.filter((p) => parts.parts[p.key]).flatMap((p) => {
          const h = hoursLeft(hass.states[parts.parts[p.key]]);
          return h !== undefined && h / p.life < 0.15 ? [{ robot: entityName(hass, config, id), part: t(p.label), h }] : [];
        });
      });

      const tablets = findTablets(hass).map((tab) => {
        const siblings = Object.values(hass.entities ?? {}).filter((r) => r.device_id === tab.deviceId);
        const key = (r: { translation_key?: string; entity_id: string }) => r.translation_key ?? r.entity_id.split(".")[1];
        const battery = siblings.find((r) => r.entity_id.startsWith("sensor.") && /battery/.test(key(r)));
        const plugged = siblings.find((r) => r.entity_id.startsWith("binary_sensor.") && /plugged/.test(key(r)));
        const reload = siblings.find((r) => r.entity_id.startsWith("button.") && /load_start_url|restart_browser/.test(key(r)));
        return { tab, battery: battery && hass.states[battery.entity_id], plugged: plugged && hass.states[plugged.entity_id], reload: reload?.entity_id };
      });

      return html`<div style="display:grid;gap:12px">
        ${box(
          t("h_offline"),
          !offline.length,
          list(offline.map((e) => row(entityName(hass, config, e.entity_id), relativeTime(t, e.last_changed)))),
          good
        )}
        ${box(t("h_battery"), !low.length, list(low.map((e) => row(entityName(hass, config, e.entity_id), domainOf(e.entity_id) === "sensor" ? ltr(`${e.state}%`) : "!"))), good)}
        ${backup
          ? box(t("h_backup"), backupDays !== undefined && backupDays <= 7, list([row(t("h_backup"), backupDays === undefined ? "–" : t("h_days_ago", { n: backupDays }))]), backupDays === 0 ? t("today") : t("h_days_ago", { n: backupDays ?? 0 }))
          : box(t("h_backup"), false, html`<span class="muted" style="font-size:14px">${t("h_backup_missing")}</span>`, "")}
        ${box(t("h_updates"), !updates.length, list(updates.map((e) => row(e.attributes.title ?? e.attributes.friendly_name ?? e.entity_id, e.attributes.latest_version ?? ""))), good)}
        ${sys.length ? box(t("h_system"), !sysBad, list(sys), "", true) : nothing}
        ${robots.length ? box(t("h_robot_parts"), !worn.length, list(worn.map((w) => row(`${w.robot} · ${w.part}`, t("hours_left", { n: ltr(formatNumber(w.h, c.lang, 0)) })))), good) : nothing}
        ${tablets.length
          ? html`<section style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)">
              <div style="font-weight:700">${t("h_tablets")}</div>
              ${tablets.map(
                (x) => html`<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                  <strong style="flex:1">${x.tab.name}</strong>
                  ${x.battery ? html`<span class="muted ltr">${x.battery.state}%</span>` : nothing}
                  ${x.plugged ? html`<span class="muted">${t(x.plugged.state === "on" ? "h_charging" : "h_not_charging")}</span>` : nothing}
                  ${x.reload
                    ? html`<button class="btn pressable" @click=${() => hass.callService("button", "press", { entity_id: x.reload }).then(() => c.toast(t("done"))).catch(() => c.toast(t("error")))}>
                        ${t("h_reload")}
                      </button>`
                    : nothing}
                </div>`
              )}
            </section>`
          : nothing}
        ${c.config.settings.maintenance.length
          ? (() => {
              const due = maintenanceDue(c.config);
              const late = due.filter((m) => m.days <= 7);
              return box(
                t("maintenance"),
                !late.length,
                list(due.sort((a, b) => a.days - b.days).map((m) => row(m.title, m.days < 0 ? t("m_overdue", { n: -m.days }) : t("m_in", { n: m.days })))),
                good
              );
            })()
          : nothing}
        <sn-faults .ctx=${c}></sn-faults>
        <p class="muted" style="margin:4px 0 0;font-size:13px">${t("h_telegram")}</p>
      </div>`;
    },
  });
}
