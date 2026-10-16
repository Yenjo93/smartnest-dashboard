import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { stateLabel, entityName, relativeTime } from "../entities";
import { shared } from "../theme";
import { composeMessage } from "../message";
import "../ui/icon";

/** Who's home: each person's photo, a green ring when they're in, and where they are when not. */
@customElement("sn-w-family")
export class SnFamily extends LitElement {
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
        padding: 14px 16px;
        display: flex;
        gap: 18px;
        align-items: center;
        overflow-x: auto;
        scrollbar-width: none;
      }
      .p {
        display: grid;
        justify-items: center;
        gap: 4px;
        min-width: 72px;
        text-align: center;
        animation: in 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .av {
        width: 56px;
        height: 56px;
        border-radius: 999px;
        background: var(--surface-2) center / cover no-repeat;
        display: grid;
        place-items: center;
        font-weight: 700;
        font-size: 20px;
        color: var(--text-2);
        box-shadow: 0 0 0 3px var(--surface-solid), 0 0 0 5px var(--border);
        transition: box-shadow 400ms cubic-bezier(0.22, 1, 0.36, 1), filter 400ms;
      }
      .home .av {
        box-shadow: 0 0 0 3px var(--surface-solid), 0 0 0 5px var(--success);
      }
      .away .av {
        filter: grayscale(0.7);
        opacity: 0.75;
      }
      .name {
        font-weight: 700;
        font-size: 14px;
        white-space: nowrap;
      }
      .where {
        font-size: 12px;
        color: var(--text-2);
        white-space: nowrap;
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
    `,
  ];

  /** People and phones open their map with the day's route; anything else its usual details. */
  private open(id: string, origin: Element) {
    const { ctx } = this;
    if (!/^(person|device_tracker)\./.test(id) || this.widget.config.map === false) return ctx.openEntity(id, origin);
    import("../person-map").then(
      () =>
        ctx.showSheet({
          title: entityName(ctx.hass, ctx.config, id),
          origin,
          render: (c) => html`<sn-person-map .ctx=${c} entity=${id}></sn-person-map>`,
        }),
      () => ctx.openEntity(id, origin)
    );
  }

  render() {
    const { ctx } = this;
    const { hass, t } = ctx;
    // Chosen in the card's settings (people, phones, presence sensors), in that order; else everyone in HA's People.
    const chosen: string[] = this.widget.config.entities ?? [];
    const people = chosen.length
      ? chosen.map((id) => hass.states[id]).filter((e): e is NonNullable<typeof e> => !!e)
      : Object.values(hass.states).filter((e) => e.entity_id.startsWith("person."));
    return html`<div class="card glass" data-no-swipe>
      ${people.map((e, i) => {
        // A presence sensor is "home" when on; a person or phone when HA says home.
        const home = e.entity_id.startsWith("binary_sensor.") ? e.state === "on" : e.state === "home";
        const name = entityName(hass, ctx.config, e.entity_id);
        const pic = e.attributes.entity_picture as string | undefined;
        const presence = /^(person|device_tracker|binary_sensor)\./.test(e.entity_id);
        const where = !presence ? stateLabel(t, e, ctx.lang) : home ? t("at_home") : e.state === "not_home" || e.state === "off" ? t("away_l") : e.state;
        return html`<div class="p pressable ${home ? "home" : "away"}" style="animation-delay:${i * 50}ms" @click=${(ev: Event) => this.open(e.entity_id, ev.currentTarget as Element)}>
          <div class="av" style=${pic ? `background-image:url('${hass.hassUrl(pic)}')` : ""}>${pic ? "" : name.slice(0, 1)}</div>
          <span class="name">${name}</span>
          <span class="where">${where} · ${relativeTime(t, e.last_changed)}</span>
        </div>`;
      })}
      ${ctx.allows("messages")
        ? html`<button class="p pressable" style="align-self:center" aria-label=${t("send_message")} @click=${() => composeMessage(ctx)}>
            <span class="av" style="background:var(--accent);color:var(--on-accent);--icon-size:24px"><sn-icon icon="message"></sn-icon></span>
            <span class="name">${t("send")}</span>
          </button>`
        : ""}
    </div>`;
  }
}
