import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import type { I18nKey } from "./i18n";
import { shared } from "./theme";
import "./ui/icon";

interface Line {
  me: boolean;
  text: string;
}

const SPEECH_LANG = { ar: "ar-JO", en: "en-US", he: "he-IL" } as const;
const SUGGEST: I18nKey[] = ["as_s1", "as_s2", "as_s3", "as_s4"];

/** Chat with Home Assistant's Assist (or the LLM agent set as its preferred pipeline), typed or spoken. */
@customElement("sn-assistant")
export class SnAssistant extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @state() private lines: Line[] = [];
  @state() private busy = false;
  @state() private listening = false;
  private conversationId?: string;
  private agent?: { agent_id?: string; language?: string };

  static styles = [
    shared,
    css`
      :host {
        display: grid;
        gap: 12px;
        min-height: 320px;
        grid-template-rows: 1fr auto;
      }
      .log {
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow-y: auto;
        max-height: 50vh;
        padding: 4px 0;
      }
      .b {
        max-width: 82%;
        padding: 10px 14px;
        border-radius: 20px;
        font-size: 16px;
        line-height: 1.4;
        unicode-bidi: plaintext;
        animation: pop 260ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
      }
      .b.me {
        align-self: flex-end;
        background: var(--accent);
        color: var(--on-accent);
        border-end-end-radius: 6px;
      }
      .b.it {
        align-self: flex-start;
        background: var(--surface-2);
        border-end-start-radius: 6px;
      }
      .dots span {
        display: inline-block;
        width: 7px;
        height: 7px;
        margin: 0 2px;
        border-radius: 50%;
        background: var(--text-2);
        animation: blink 1s infinite;
      }
      .dots span:nth-child(2) {
        animation-delay: 0.15s;
      }
      .dots span:nth-child(3) {
        animation-delay: 0.3s;
      }
      .hello {
        text-align: center;
        color: var(--text-2);
        display: grid;
        gap: 12px;
        justify-items: center;
        padding: 12px;
        --icon-size: 40px;
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
      }
      form {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      form input {
        flex: 1;
        min-height: 48px;
        border-radius: 999px;
        padding-inline: 18px;
      }
      .mic.on {
        background: var(--alert);
        color: #fff;
        animation: pulse 1.2s infinite;
      }
      @keyframes pop {
        from {
          opacity: 0;
          transform: translateY(8px) scale(0.97);
        }
      }
      @keyframes blink {
        50% {
          opacity: 0.25;
        }
      }
      @keyframes pulse {
        50% {
          transform: scale(1.08);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .b,
        .mic.on,
        .dots span {
          animation: none;
        }
      }
    `,
  ];

  async connectedCallback() {
    super.connectedCallback();
    try {
      const res = await this.ctx.hass.callWS<{ pipelines: any[]; preferred_pipeline?: string }>({ type: "assist_pipeline/pipeline/list" });
      const p = res.pipelines.find((x) => x.id === res.preferred_pipeline) ?? res.pipelines[0];
      if (p) this.agent = { agent_id: p.conversation_engine, language: p.conversation_language };
    } catch {
      // Older HA: the default agent answers.
    }
  }

  private async send(text: string) {
    text = text.trim();
    if (!text || this.busy) return;
    this.lines = [...this.lines, { me: true, text }];
    this.busy = true;
    this.toBottom();
    try {
      const res = await this.ctx.hass.callWS<any>({
        type: "conversation/process",
        text,
        language: this.agent?.language && this.agent.language !== "*" ? this.agent.language : this.ctx.lang,
        conversation_id: this.conversationId,
        ...(this.agent?.agent_id ? { agent_id: this.agent.agent_id } : {}),
      });
      this.conversationId = res.conversation_id;
      const said = res.response?.speech?.plain?.speech || this.ctx.t("as_done");
      this.lines = [...this.lines, { me: false, text: said }];
    } catch {
      this.lines = [...this.lines, { me: false, text: this.ctx.t("as_error") }];
    } finally {
      this.busy = false;
      this.toBottom();
    }
  }

  private toBottom() {
    this.updateComplete.then(() => {
      const log = this.renderRoot.querySelector(".log");
      log?.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
    });
  }

  private listen() {
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = SPEECH_LANG[this.ctx.lang];
    rec.interimResults = false;
    rec.onresult = (e: any) => this.send(e.results[0][0].transcript);
    rec.onend = () => (this.listening = false);
    rec.onerror = () => (this.listening = false);
    this.listening = true;
    rec.start();
  }

  render() {
    const { t } = this.ctx;
    const canSpeak = !!((window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition);
    return html`<div class="log" aria-live="polite">
        ${this.lines.length
          ? this.lines.map((l) => html`<div class="b ${l.me ? "me" : "it"}">${l.text}</div>`)
          : html`<div class="hello">
              <sn-icon icon="assistant" style="color:var(--accent-text)"></sn-icon>
              <span>${t("as_hello")}</span>
              <div class="chips">${SUGGEST.map((k) => html`<button class="btn pressable" @click=${() => this.send(t(k))}>${t(k)}</button>`)}</div>
            </div>`}
        ${this.busy ? html`<div class="b it dots" aria-label=${t("loading")}><span></span><span></span><span></span></div>` : nothing}
      </div>
      <form
        @submit=${(e: SubmitEvent) => {
          e.preventDefault();
          const input = (e.currentTarget as HTMLFormElement).querySelector("input")!;
          this.send(input.value);
          input.value = "";
        }}
      >
        ${canSpeak
          ? html`<button type="button" class="icon-btn pressable mic ${this.listening ? "on" : ""}" aria-label=${t("as_speak")} @click=${() => this.listen()}>
              <sn-icon icon="microphone" style="--icon-size:22px"></sn-icon>
            </button>`
          : nothing}
        <input type="text" placeholder=${t("as_placeholder")} aria-label=${t("as_placeholder")} />
        <button type="submit" class="icon-btn primary pressable" aria-label=${t("as_send")} ?disabled=${this.busy}>
          <sn-icon icon="send" style="--icon-size:20px;transform:${this.ctx.rtl ? "scaleX(-1)" : "none"}"></sn-icon>
        </button>
      </form>`;
  }
}
