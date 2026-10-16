import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import { shared } from "./theme";
import "./ui/icon";

export interface ScreenMessage {
  id: string;
  message: string;
  title?: string;
  ack?: string;
  icon?: string;
}

function ding() {
  try {
    const ac = new AudioContext();
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.0001, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.25, ac.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.8);
    o.connect(g).connect(ac.destination);
    o.start();
    o.stop(ac.currentTime + 0.9);
    window.setTimeout(() => ac.close(), 1200);
  } catch {
    /* no audio */
  }
}

/** A message pushed to every home screen. Stays until someone presses the button (it's shared: one tap clears it everywhere). */
@customElement("sn-message")
export class SnMessage extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) msg!: ScreenMessage;

  static styles = [
    shared,
    css`
      .scrim {
        position: fixed;
        inset: 0;
        z-index: 82;
        display: grid;
        place-items: center;
        padding: 24px;
        background: var(--scrim);
        -webkit-backdrop-filter: var(--glass-filter, blur(12px));
        backdrop-filter: var(--glass-filter, blur(12px));
        animation: fade 260ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .card {
        width: min(560px, 100%);
        border-radius: var(--r-xl);
        background: var(--surface-solid);
        color: var(--text);
        box-shadow: var(--shadow-lift);
        padding: 28px;
        display: grid;
        gap: 14px;
        justify-items: center;
        text-align: center;
        animation: up 380ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      .ic {
        width: 64px;
        height: 64px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: var(--accent);
        color: var(--on-accent);
        --icon-size: 32px;
      }
      .from {
        color: var(--text-2);
        font-size: 14px;
      }
      .text {
        font-size: clamp(22px, 3.4vw, 34px);
        font-weight: 700;
        line-height: 1.3;
        white-space: pre-wrap;
      }
      .btn {
        min-width: 180px;
        min-height: 52px;
        font-size: 17px;
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @keyframes up {
        from {
          opacity: 0;
          transform: translateY(24px) scale(0.97);
        }
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    ding();
    navigator.vibrate?.([80, 60, 80]);
  }

  render() {
    const { ctx, msg } = this;
    return html`<div class="scrim">
      <div class="card" role="alertdialog" aria-label=${msg.title ?? ""}>
        <span class="ic"><sn-icon .icon=${msg.icon && ["pill", "bell", "message"].includes(msg.icon) ? msg.icon : "message"}></sn-icon></span>
        ${msg.title ? html`<span class="from">${ctx.t("message_from", { name: msg.title })}</span>` : nothing}
        <div class="text">${msg.message}</div>
        <button class="btn primary pressable" @click=${() => ctx.hass.callWS({ type: "smartnest/message/ack", id: msg.id }).catch(() => undefined)}>
          ${msg.ack || ctx.t("got_it")}
        </button>
      </div>
    </div>`;
  }
}

/** Compose sheet: anyone in the family can put a message on the wall screen. */
export function composeMessage(ctx: Ctx) {
  ctx.showSheet({
    title: ctx.t("send_message"),
    render: (c) => html`<form
      style="display:grid;gap:12px"
      @submit=${(e: SubmitEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const input = form.querySelector<HTMLInputElement>("input[type=text]")!;
        const speak = form.querySelector<HTMLInputElement>("input[name=speak]")?.checked;
        const message = input.value.trim();
        if (!message) return;
        if (speak) {
          // Spoken too, through HA's text-to-speech on the chosen speakers (Google Translate TTS speaks Arabic).
          const tts = Object.keys(c.hass.states).filter((id) => id.startsWith("tts."));
          const engine = tts.find((id) => id.includes("google")) ?? tts[0];
          if (engine)
            c.hass
              .callService("tts", "speak", { entity_id: engine, media_player_entity_id: c.config.settings.speakers, message, language: c.lang })
              .catch(() => c.toast(c.t("error")));
        }
        c.hass
          .callWS({ type: "smartnest/message/send", message })
          .then(() => c.closeSheet())
          .catch(() => c.toast(c.t("error")));
      }}
    >
      <input type="text" maxlength="500" placeholder=${c.t("message_placeholder")} autofocus />
      ${c.allows("broadcast") && c.config.settings.speakers.length
        ? html`<label style="display:flex;gap:8px;align-items:center;font-size:15px">
            <input name="speak" type="checkbox" style="width:auto;min-height:auto" /><sn-icon icon="bullhorn" style="--icon-size:20px"></sn-icon>${c.t("announce")}
          </label>`
        : nothing}
      <button class="btn primary pressable" type="submit"><sn-icon icon="send" style="--icon-size:20px"></sn-icon>${c.t("send")}</button>
    </form>`,
  });
}
