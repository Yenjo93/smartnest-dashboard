import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import { shared } from "./theme";
import "./ui/icon";

const KEY = "smartnest-voice";

export const voiceOn = () => {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};
export const setVoice = (on: boolean) => {
  try {
    on ? localStorage.setItem(KEY, "1") : localStorage.removeItem(KEY);
  } catch {
    /* per-screen setting */
  }
};

// Turns the microphone's float samples into 16 kHz 16-bit PCM, the format Assist's wake word and speech engines take.
const WORKLET = `
class Pcm extends AudioWorkletProcessor {
  process(inputs) {
    const ch = inputs[0][0];
    if (ch) {
      const out = new Int16Array(ch.length);
      for (let i = 0; i < ch.length; i++) out[i] = Math.max(-1, Math.min(1, ch[i])) * 0x7fff;
      this.port.postMessage(out.buffer, [out.buffer]);
    }
    return true;
  }
}
registerProcessor("sn-pcm", Pcm);`;

type Phase = "idle" | "listening" | "thinking" | "speaking" | "error";

/**
 * Hands-free voice on the wall tablet: the microphone streams to Home Assistant's Assist pipeline, which waits for
 * the wake word (from the installed wake word engine, e.g. "Okay Nabu"), listens, acts and answers out loud.
 */
@customElement("sn-voice")
export class SnVoice extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @state() private phase: Phase = "idle";
  @state() private heard = "";
  @state() private said = "";
  @state() private problem = "";
  private audio?: AudioContext;
  private stream?: MediaStream;
  private handler?: number;
  private unsub?: () => void;
  private stopped = false;
  private conversation?: string;
  private idleTimer?: number;

  static styles = [
    shared,
    css`
      :host {
        position: fixed;
        inset-inline-end: 18px;
        bottom: 18px;
        z-index: 45;
      }
      .dot {
        width: 46px;
        height: 46px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: var(--surface);
        -webkit-backdrop-filter: blur(16px);
        backdrop-filter: blur(16px);
        border: 1px solid var(--border);
        color: var(--text-2);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      }
      .dot.err {
        color: var(--alert-text);
      }
      .overlay {
        position: fixed;
        inset: 0;
        display: grid;
        place-items: center;
        background: color-mix(in srgb, #000 35%, transparent);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        animation: fade 240ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .panel {
        display: grid;
        justify-items: center;
        gap: 22px;
        text-align: center;
        color: #fff;
        padding: 24px;
        max-width: 640px;
      }
      .orb {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 30%, #ffd08a, var(--accent) 55%, #b5650b);
        box-shadow: 0 0 60px color-mix(in srgb, var(--accent) 70%, transparent);
        animation: breathe 1.4s ease-in-out infinite;
      }
      .orb.thinking {
        animation: spin 1.2s linear infinite;
        background: conic-gradient(from 0deg, #ffd08a, var(--accent), #6c5ce7, #ffd08a);
      }
      .orb.speaking {
        animation: talk 0.5s ease-in-out infinite alternate;
      }
      .heard {
        font-size: 22px;
        opacity: 0.85;
        unicode-bidi: plaintext;
      }
      .said {
        font-size: 28px;
        font-weight: 700;
        line-height: 1.35;
        unicode-bidi: plaintext;
      }
      @keyframes breathe {
        50% {
          transform: scale(1.12);
        }
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes talk {
        to {
          transform: scale(1.06, 0.94);
        }
      }
      @keyframes fade {
        from {
          opacity: 0;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .orb,
        .overlay {
          animation: none;
        }
      }
    `,
  ];

  async connectedCallback() {
    super.connectedCallback();
    this.stopped = false;
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      this.phase = "error";
      this.problem = this.ctx.t("voice_https");
      return;
    }
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      this.audio = new AudioContext({ sampleRate: 16000 });
      await this.audio.audioWorklet.addModule(URL.createObjectURL(new Blob([WORKLET], { type: "text/javascript" })));
      const node = new AudioWorkletNode(this.audio, "sn-pcm");
      node.port.onmessage = (e) => this.send(e.data as ArrayBuffer);
      this.audio.createMediaStreamSource(this.stream).connect(node);
      this.run();
    } catch {
      this.phase = "error";
      this.problem = this.ctx.t("voice_mic");
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopped = true;
    this.unsub?.();
    this.stream?.getTracks().forEach((t) => t.stop());
    this.audio?.close().catch(() => undefined);
    window.clearTimeout(this.idleTimer);
  }

  /** Audio goes to the pipeline as binary frames tagged with its handler id. */
  private send(buf: ArrayBuffer) {
    const socket = (this.ctx.hass.connection as any).socket as WebSocket | undefined;
    if (this.handler === undefined || !socket || socket.readyState !== 1) return;
    const out = new Uint8Array(buf.byteLength + 1);
    out[0] = this.handler;
    out.set(new Uint8Array(buf), 1);
    socket.send(out);
  }

  private async run() {
    if (this.stopped) return;
    this.handler = undefined;
    try {
      this.unsub = await this.ctx.hass.connection.subscribeMessage<any>((ev) => this.onEvent(ev), {
        type: "assist_pipeline/run",
        start_stage: "wake_word",
        end_stage: "tts",
        input: { sample_rate: 16000, timeout: 3600 },
        ...(this.conversation ? { conversation_id: this.conversation } : {}),
      });
    } catch {
      this.phase = "error";
      this.problem = this.ctx.t("voice_pipeline");
      window.setTimeout(() => this.run(), 30_000);
    }
  }

  private restart(delay = 300) {
    this.unsub?.();
    this.unsub = undefined;
    this.handler = undefined;
    window.setTimeout(() => this.run(), delay);
  }

  private onEvent(ev: { type: string; data?: any }) {
    switch (ev.type) {
      case "run-start":
        this.handler = ev.data?.runner_data?.stt_binary_handler_id;
        if (this.phase === "error") this.phase = "idle";
        break;
      case "wake_word-end":
        this.phase = "listening";
        this.heard = "";
        this.said = "";
        window.clearTimeout(this.idleTimer);
        navigator.vibrate?.(30);
        break;
      case "stt-end":
        this.heard = ev.data?.stt_output?.text ?? "";
        this.phase = "thinking";
        break;
      case "intent-end": {
        const r = ev.data?.intent_output;
        this.conversation = r?.conversation_id;
        this.said = r?.response?.speech?.plain?.speech ?? "";
        break;
      }
      case "tts-end": {
        const url = ev.data?.tts_output?.url;
        this.phase = "speaking";
        if (url) {
          const a = new Audio(this.ctx.hass.hassUrl(url));
          a.onended = () => this.settle();
          a.play().catch(() => this.settle());
        } else this.settle();
        break;
      }
      case "run-end":
        this.restart();
        break;
      case "error":
        // A wake word timeout just means nobody spoke: start listening again.
        if (this.phase !== "idle") this.settle(1500);
        this.restart(ev.data?.code === "wake-word-timeout" ? 100 : 2000);
        break;
    }
  }

  private settle(after = 2500) {
    window.clearTimeout(this.idleTimer);
    this.idleTimer = window.setTimeout(() => (this.phase = "idle"), after);
  }

  render() {
    if (this.phase === "idle" || this.phase === "error")
      return html`<div class="dot ${this.phase === "error" ? "err" : ""}" title=${this.problem || this.ctx.t("voice_ready")}>
        <sn-icon icon=${this.phase === "error" ? "microphone-off" : "microphone"} style="--icon-size:22px"></sn-icon>
      </div>`;
    return html`<div class="overlay" @click=${() => (this.phase = "idle")}>
      <div class="panel">
        <div class="orb ${this.phase}"></div>
        ${this.heard ? html`<div class="heard">“${this.heard}”</div>` : html`<div class="heard">${this.ctx.t("voice_listening")}</div>`}
        ${this.said ? html`<div class="said">${this.said}</div>` : nothing}
      </div>
    </div>`;
  }
}
