import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { domainOf, entityName, formatNumber, ltr } from "../entities";
import { buildChips, dashboardEntities } from "../chips";
import { greetingKey, greetingName } from "../daily";
import { shared } from "../theme";
import "../ui/icon";
import "../ui/num";

/**
 * The top of a Bento home: a greeting and one plain sentence about the house ("All good: 3 lights on, front door
 * locked"), with the few numbers people look for: inside temperature, power, who's home.
 */
@customElement("sn-w-hero")
export class SnHero extends LitElement {
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
        border-radius: var(--r-xl);
        padding: clamp(18px, 3cqi, 32px);
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: end;
        gap: 18px;
        overflow: hidden;
        position: relative;
        container-type: inline-size;
      }
      .card::before {
        content: "";
        position: absolute;
        inset: -40% -10% auto auto;
        width: 70%;
        aspect-ratio: 1;
        border-radius: 50%;
        background: radial-gradient(circle, color-mix(in srgb, var(--leak, var(--accent)) 30%, transparent), transparent 65%);
        pointer-events: none;
      }
      .hi {
        font-size: clamp(15px, 2.2cqi, 19px);
        color: var(--text-2);
        margin: 0 0 6px;
      }
      h2 {
        margin: 0;
        font-size: clamp(24px, 4.6cqi, 44px);
        line-height: 1.15;
        font-weight: var(--display-weight, 700);
        letter-spacing: var(--display-track, 0);
        text-wrap: balance;
      }
      h2 .ok {
        color: var(--success);
      }
      h2 .warn {
        color: var(--alert-text);
      }
      .stats {
        display: flex;
        gap: clamp(14px, 3cqi, 30px);
      }
      .stat {
        display: grid;
        gap: 2px;
        justify-items: center;
        text-align: center;
      }
      .stat b {
        font-size: clamp(22px, 3.6cqi, 34px);
        font-weight: var(--display-weight, 700);
        letter-spacing: var(--display-track, 0);
      }
      .stat span {
        font-size: 12px;
        color: var(--text-2);
        display: flex;
        gap: 4px;
        align-items: center;
      }
      @container (max-width: 520px) {
        .card {
          grid-template-columns: 1fr;
        }
      }
    `,
  ];

  /** One sentence: what needs attention first, else what's going on. */
  private sentence(): { text: string; tone: "ok" | "warn" } {
    const { ctx } = this;
    const { t } = ctx;
    const chips = buildChips(ctx);
    const alert = chips.find((c) => c.tone === "alert");
    if (alert) return { text: alert.label, tone: "warn" };
    const bits = chips.filter((c) => ["lights", "climate", "appliance", "arrival", "open"].includes(c.type)).map((c) => c.label);
    return { text: bits.length ? `${t("hero_ok")} · ${bits.slice(0, 2).join(" · ")}` : t("hero_all_quiet"), tone: "ok" };
  }

  render() {
    const { ctx } = this;
    const { t, hass, config, lang } = ctx;
    const ids = dashboardEntities(config);
    const temp = ids.map((id) => hass.states[id]).find((e) => e && e.attributes.device_class === "temperature" && domainOf(e.entity_id) === "sensor" && !/out|خارج/.test(e.entity_id));
    const powerId = config.settings.power_entity;
    const power = powerId ? hass.states[powerId] : undefined;
    const home = Object.values(hass.states).filter((e) => e.entity_id.startsWith("person.") && e.state === "home");
    const s = this.sentence();
    const name = greetingName(hass, config.settings.greeting_name);
    return html`<div class="card glass">
      <div>
        <p class="hi">${t(greetingKey(new Date()))}${name ? (lang === "ar" ? "، " : ", ") + name : ""}</p>
        <h2><span class=${s.tone}>${s.tone === "ok" ? "●" : "▲"}</span> ${s.text}</h2>
      </div>
      <div class="stats">
        ${temp
          ? html`<div class="stat"><b><sn-num .value=${ltr(`${formatNumber(Number(temp.state), lang, 1)}°`)}></sn-num></b><span><sn-icon icon="thermometer" style="--icon-size:14px"></sn-icon>${t("hero_inside")}</span></div>`
          : nothing}
        ${power
          ? html`<div class="stat"><b><sn-num .value=${ltr(Number(power.state) >= 1000 ? `${formatNumber(Number(power.state) / 1000, lang, 1)} kW` : `${formatNumber(Number(power.state), lang, 0)} W`)}></sn-num></b><span><sn-icon icon="lightning-bolt" style="--icon-size:14px"></sn-icon>${t("now")}</span></div>`
          : nothing}
        ${home.length
          ? html`<div class="stat" title=${home.map((p) => entityName(hass, config, p.entity_id)).join("، ")}><b>${home.length}</b><span><sn-icon icon="family" style="--icon-size:14px"></sn-icon>${t("hero_home")}</span></div>`
          : nothing}
      </div>
    </div>`;
  }
}
