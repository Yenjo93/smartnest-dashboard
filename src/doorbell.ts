import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import { entityName } from "./entities";
import { LOCALE } from "./i18n";
import { liveUrl, snapshotUrl } from "./widgets/camera";
import { shared } from "./theme";
import "./ui/icon";
import { haptic } from "./ui/haptic";
import "./ui/slide-confirm";
import { aiEntity, askAI } from "./ai";
import { playBell } from "./sounds";

/** Two-note chime made on the fly, so there's no audio file to ship. Browsers allow it after any earlier tap. */
function chime() {
  try {
    const ac = new AudioContext();
    const note = (freq: number, at: number) => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = "sine";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, ac.currentTime + at);
      g.gain.exponentialRampToValueAtTime(0.35, ac.currentTime + at + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + at + 1.2);
      o.connect(g).connect(ac.destination);
      o.start(ac.currentTime + at);
      o.stop(ac.currentTime + at + 1.3);
    };
    note(659.25, 0); // E5
    note(523.25, 0.45); // C5
    window.setTimeout(() => ac.close(), 2500);
  } catch {
    /* no audio available */
  }
}

@customElement("sn-doorbell")
export class SnDoorbell extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) at = new Date();
  @property({ attribute: false }) onDismiss!: () => void;
  /** The wall tablet already rang through its own speaker. */
  @property({ type: Boolean }) silent = false;
  @state() private confirm = false;
  /** Shrunk to a small floating window in the corner: watch the door and keep using the dashboard. */
  @state() private mini = false;
  private timer?: number;

  static styles = [
    shared,
    css`
      .scrim {
        position: fixed;
        inset: 0;
        z-index: 80;
        display: grid;
        place-items: center;
        padding: 24px;
        background: rgba(8, 10, 12, 0.6);
        -webkit-backdrop-filter: var(--glass-filter, blur(14px));
        backdrop-filter: var(--glass-filter, blur(14px));
        animation: fade 300ms var(--ease-out);
      }
      .replies {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        padding: 0 20px 14px;
      }
      .replies .btn {
        min-height: 40px;
        font-size: 14px;
      }
      .pip {
        position: fixed;
        z-index: 80;
        bottom: 96px;
        inset-inline-end: 16px;
        width: min(320px, calc(100vw - 32px));
        border-radius: var(--r-lg);
        overflow: hidden;
        background: #0d1114;
        box-shadow: var(--shadow-lift), 0 0 0 2px var(--accent);
        animation: pop 420ms var(--spring);
        cursor: pointer;
      }
      .pip img {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        display: block;
      }
      .pip .bar {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px;
        background: var(--surface-solid);
      }
      .pip .bar span {
        flex: 1;
        font-size: 13px;
        font-weight: 600;
        padding-inline-start: 6px;
      }
      .shrink {
        position: absolute;
        top: 12px;
        inset-inline-end: 12px;
        background: rgba(21, 26, 30, 0.6);
        color: #fff;
      }
      .card {
        width: min(760px, 100%);
        border-radius: var(--r-xl);
        overflow: hidden;
        background: var(--surface-solid);
        color: var(--text);
        box-shadow: var(--shadow-lift);
        animation: pop 560ms var(--spring);
      }
      .video {
        position: relative;
        aspect-ratio: 16 / 9;
        background: #0d1114;
      }
      .video img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .live {
        position: absolute;
        top: 14px;
        inset-inline-start: 14px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 10px;
        border-radius: 999px;
        background: rgba(21, 26, 30, 0.6);
        color: #fff;
        font-size: 12px;
        font-weight: 700;
      }
      .live::before {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: var(--alert);
        animation: blink 1.2s infinite;
      }
      .foot {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 18px 20px;
        flex-wrap: wrap;
      }
      .bell {
        display: grid;
        place-items: center;
        width: 52px;
        height: 52px;
        border-radius: 999px;
        background: var(--accent);
        color: var(--on-accent);
        animation: ring 1s var(--ease-out) 3;
      }
      .title {
        flex: 1;
        min-width: 160px;
        display: grid;
      }
      .title strong {
        font-size: 20px;
      }
      .btn {
        min-height: 52px;
        padding: 0 22px;
      }
      .seen {
        font-size: 15px;
        font-weight: 500;
        color: var(--accent-text);
        unicode-bidi: plaintext;
        animation: seen-in 360ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .shimmer {
        opacity: 0.7;
        animation: breathe 1.4s ease-in-out infinite;
      }
      @keyframes seen-in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
      @keyframes breathe {
        50% {
          opacity: 0.35;
        }
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @keyframes pop {
        from {
          transform: scale(0.9) translateY(30px);
          opacity: 0;
        }
      }
      @keyframes blink {
        50% {
          opacity: 0.3;
        }
      }
      @keyframes ring {
        0%,
        100% {
          transform: rotate(0);
        }
        20% {
          transform: rotate(14deg);
        }
        40% {
          transform: rotate(-12deg);
        }
        60% {
          transform: rotate(8deg);
        }
        80% {
          transform: rotate(-4deg);
        }
      }
    `,
  ];

  /** What the AI sees at the door: "a man with a parcel". */
  @state() private seen?: string;
  @state() private looking = false;
  /** Someone Frigate recognised at the door. */
  @state() private known?: string;

  connectedCallback() {
    super.connectedCallback();
    const cam = this.ctx.config.settings.doorbell.camera_entity;
    if (cam && this.ctx.allows("ai_doorbell") && aiEntity(this.ctx.hass)) {
      this.looking = true;
      // Give the camera a moment to catch whoever pressed the bell.
      window.setTimeout(
        () =>
          askAI(this.ctx, "doorbell", { camera: cam }).then((text) => {
            this.seen = text;
            this.looking = false;
          }),
        1200
      );
    }
    if (cam && this.ctx.allows("faces")) window.setTimeout(() => this.recognise(cam), 2500);
    if (!this.silent) {
      const tone = this.ctx.config.settings.doorbell_tone;
      tone && tone !== "chime" ? playBell(tone) : chime();
    }
    navigator.vibrate?.([120, 80, 120]);
  }

  /** Frigate's face recognition names people on its events (sub label): greet them. */
  private async recognise(cam: string) {
    try {
      const raw = await this.ctx.hass.callWS<any>({
        type: "frigate/events/get",
        instance_id: "frigate",
        cameras: [cam.split(".")[1]],
        after: Math.floor(Date.now() / 1000) - 180,
        limit: 5,
      });
      const events: { sub_label?: string | [string, number] | null }[] = typeof raw === "string" ? JSON.parse(raw) : raw;
      const hit = events.map((e) => (Array.isArray(e.sub_label) ? e.sub_label[0] : e.sub_label)).find(Boolean);
      if (hit) this.known = hit;
    } catch {
      /* no Frigate */
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this.timer);
  }

  /** Quick spoken answers to whoever is at the door, through the speaker by the door. */
  private renderReplies() {
    const { ctx } = this;
    const { t, hass } = ctx;
    const speaker = ctx.config.settings.doorbell.speaker_entity;
    const tts = Object.keys(hass.states).filter((id) => id.startsWith("tts."));
    const engine = tts.find((id) => id.includes("google")) ?? tts[0];
    if (!speaker || !engine) return nothing;
    const say = (message: string) => {
      haptic("tap");
      hass
        .callService("tts", "speak", { entity_id: engine, media_player_entity_id: speaker, message, language: ctx.lang })
        .then(() => ctx.toast(t("reply_sent")), () => ctx.toast(t("error")));
    };
    return html`<div class="replies">
      ${(["reply_coming", "reply_leave", "reply_wait", "reply_who"] as const).map((k) => html`<button class="btn pressable" @click=${() => say(t(k))}>🗣️ ${t(k)}</button>`)}
    </div>`;
  }

  render() {
    const { ctx } = this;
    const { t } = ctx;
    const d = ctx.config.settings.doorbell;
    const cam = d.camera_entity;
    const url = cam ? liveUrl(ctx.hass, cam) ?? snapshotUrl(ctx.hass, cam, Date.now()) : undefined;
    const lock = d.lock_entity ? ctx.hass.states[d.lock_entity] : undefined;
    if (this.mini)
      return html`<div class="pip" role="alertdialog" aria-label=${t("someone_at_door")} @click=${() => (this.mini = false)}>
        ${url ? html`<img src=${url} alt="" />` : nothing}
        <div class="bar">
          <sn-icon icon="bell-ring" style="--icon-size:18px;color:var(--accent-text)"></sn-icon>
          <span>${t("someone_at_door")}</span>
          <button class="icon-btn small pressable" aria-label=${t("dismiss")} @click=${(e: Event) => (e.stopPropagation(), this.onDismiss())}>
            <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
          </button>
        </div>
      </div>`;
    return html`<div class="scrim" @click=${(e: Event) => e.target === e.currentTarget && this.onDismiss()}>
      <div class="card" role="alertdialog" aria-label=${t("someone_at_door")}>
        ${url
          ? html`<div class="video">
              <img src=${url} alt="" /><span class="live">${t("streaming")}</span>
              <button class="icon-btn small pressable shrink" aria-label=${t("door_mini")} title=${t("door_mini")} @click=${() => (this.mini = true)}>
                <sn-icon icon="picture-in-picture" style="--icon-size:18px"></sn-icon>
              </button>
            </div>`
          : nothing}
        <div class="foot">
          <span class="bell"><sn-icon icon="bell-ring"></sn-icon></span>
          <span class="title">
            <strong>${t("someone_at_door")}</strong>
            <span class="muted">${cam ? entityName(ctx.hass, ctx.config, cam) + " · " : ""}${this.at.toLocaleTimeString(LOCALE[ctx.lang], {
              hour: "2-digit",
              minute: "2-digit",
            })}</span>
            ${this.known ? html`<span class="seen">👋 ${this.ctx.t("face_hello", { name: this.known })}</span>` : nothing}
            ${this.looking
              ? html`<span class="seen shimmer">✨ ${t("ai_looking")}</span>`
              : this.seen
              ? html`<span class="seen">✨ ${this.seen}</span>`
              : nothing}
          </span>
          <button class="btn pressable" @click=${() => this.onDismiss()}>${t("dismiss")}</button>
        </div>
        ${this.renderReplies()}
        ${lock && lock.state !== "unlocked"
          ? html`<div style="padding:0 20px 20px">
              <sn-slide-confirm
                .label=${t("slide_open_door")}
                icon="lock-open"
                .onConfirm=${() => {
                  ctx.hass.callService("lock", "unlock", { entity_id: lock.entity_id }).catch(() => ctx.toast(t("error")));
                  this.onDismiss();
                }}
              ></sn-slide-confirm>
            </div>`
          : nothing}
      </div>
    </div>`;
  }
}
