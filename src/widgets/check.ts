import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { HassEntity, Widget } from "../types";
import type { I18nKey } from "../i18n";
import { domainOf, entityName } from "../entities";
import { dashboardEntities } from "../chips";
import { shared } from "../theme";
import "../ui/icon";

interface Check {
  key: I18nKey;
  icon: string;
  bad: string[];
  fix?: () => Promise<unknown>;
}

// Plugs that shouldn't be left on overnight, recognised by name.
const RISKY = /stove|oven|iron|heater|kettle|hob|غاز|فرن|مكوى|مكواة|سخان|غلاية|תנור|מגהץ|קומקום/i;

/** "Is the house ready for the night?" Locks, doors and windows, lights, alarm, risky appliances, each with a fix. */
@customElement("sn-w-check")
export class SnCheck extends LitElement {
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
        padding: 18px;
        display: grid;
        align-content: start;
        gap: 10px;
        overflow: auto;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
        font-size: 17px;
        --icon-size: 26px;
      }
      .head .ok {
        color: var(--success);
      }
      .head .bad {
        color: var(--accent-text);
      }
      .row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: 12px;
        background: var(--surface-2);
        font-size: 14px;
        --icon-size: 20px;
        animation: in 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .row .txt {
        flex: 1;
        min-width: 0;
        display: grid;
      }
      .row .who {
        font-size: 12px;
        color: var(--text-2);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .row .good {
        color: var(--success);
      }
      .row .warn {
        color: var(--alert-text);
      }
      .row .btn {
        min-height: 34px;
        padding: 0 12px;
        font-size: 13px;
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
    `,
  ];

  private checks(): Check[] {
    const { hass, config } = this.ctx;
    const on = dashboardEntities(config).filter((id) => hass.states[id]);
    const scope = on.length ? on : Object.keys(hass.states);
    const st = (id: string) => hass.states[id] as HassEntity;
    const pick = (fn: (e: HassEntity) => boolean) => scope.filter((id) => fn(st(id)));
    const call = (domain: string, service: string, ids: string[], data = {}) => hass.callService(domain, service, { entity_id: ids, ...data });
    const list: Check[] = [];

    const unlocked = pick((e) => domainOf(e.entity_id) === "lock" && e.state !== "locked");
    list.push({ key: "check_locks", icon: "lock", bad: unlocked, fix: unlocked.length ? () => call("lock", "lock", unlocked) : undefined });

    const open = pick(
      (e) =>
        (domainOf(e.entity_id) === "binary_sensor" && e.state === "on" && ["door", "window", "opening", "garage_door"].includes(e.attributes.device_class)) ||
        (domainOf(e.entity_id) === "cover" && e.state === "open" && ["garage", "gate", "door"].includes(e.attributes.device_class))
    );
    const closable = open.filter((id) => domainOf(id) === "cover");
    // Windows can't close themselves; covers (garage, gate) can.
    list.push({ key: "check_open", icon: "door-closed", bad: open, fix: closable.length ? () => call("cover", "close_cover", closable) : undefined });

    const lights = pick((e) => domainOf(e.entity_id) === "light" && e.state === "on");
    list.push({ key: "check_lights", icon: "lightbulb-outline", bad: lights, fix: lights.length ? () => call("light", "turn_off", lights) : undefined });

    const alarms = Object.keys(hass.states).filter((id) => domainOf(id) === "alarm_control_panel");
    if (alarms.length) {
      const disarmed = alarms.filter((id) => st(id).state === "disarmed");
      // Arming without a code works only when the panel allows it; otherwise the fix button opens the panel.
      list.push({
        key: "check_alarm",
        icon: "shield-home",
        bad: disarmed,
        fix: disarmed.length ? () => (st(disarmed[0]).attributes.code_arm_required ? Promise.resolve(this.ctx.openEntity(disarmed[0])) : call("alarm_control_panel", "alarm_arm_night", disarmed)) : undefined,
      });
    }

    const risky = Object.keys(hass.states).filter((id) => domainOf(id) === "switch" && st(id).state === "on" && RISKY.test(`${id} ${st(id).attributes.friendly_name ?? ""}`));
    if (risky.length || Object.keys(hass.states).some((id) => domainOf(id) === "switch" && RISKY.test(`${id} ${st(id).attributes.friendly_name ?? ""}`)))
      list.push({ key: "check_appliances", icon: "power-plug-off", bad: risky, fix: risky.length ? () => call("switch", "turn_off", risky) : undefined });

    return list;
  }

  private fixAll(checks: Check[]) {
    navigator.vibrate?.(10);
    Promise.all(checks.filter((c) => c.bad.length && c.fix).map((c) => c.fix!())).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  render() {
    const { ctx } = this;
    const { t, hass, config } = ctx;
    const checks = this.checks();
    const issues = checks.filter((c) => c.bad.length);
    const fixable = issues.filter((c) => c.fix);
    return html`<div class="card glass">
      <div class="head">
        <sn-icon class=${issues.length ? "bad" : "ok"} icon=${issues.length ? "alert-circle-outline" : "check-circle"}></sn-icon>
        ${issues.length ? t("check_n", { n: issues.length }) : t("check_ok")}
      </div>
      ${checks.map(
        (c, i) => html`<div class="row" style="animation-delay:${i * 40}ms">
          <sn-icon class=${c.bad.length ? "warn" : "good"} icon=${c.bad.length ? c.icon : "check-circle"}></sn-icon>
          <span class="txt">
            <span>${t(c.key)}</span>
            ${c.bad.length ? html`<span class="who">${c.bad.map((id) => entityName(hass, config, id)).join(ctx.lang === "ar" ? "، " : ", ")}</span>` : nothing}
          </span>
          ${c.bad.length && c.fix ? html`<button class="btn pressable" @click=${() => c.fix!().catch(() => ctx.toast(t("error")))}>${t("check_fix")}</button>` : nothing}
        </div>`
      )}
      ${fixable.length > 1 ? html`<button class="btn primary pressable" @click=${() => this.fixAll(checks)}>${t("check_fix_all")}</button>` : nothing}
    </div>`;
  }
}
