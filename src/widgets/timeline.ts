import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { LOCALE } from "../i18n";
import { shared } from "../theme";
import "../ui/icon";

interface FEvent {
  id: string;
  camera: string;
  label: string;
  sub_label?: string | [string, number] | null;
  start_time: number;
  has_clip?: boolean;
}

const LABEL_COLOR: Record<string, string> = { person: "#e9971d", car: "#3a86ff", dog: "#2bb673", cat: "#2bb673", package: "#8e6cef" };
const DAY = 86_400_000;

/** A whole day of one camera on a bar: every detection is a dot, tap one to watch the clip. From Frigate. */
@customElement("sn-w-timeline")
export class SnTimeline extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private day = 0; // 0 = today, 1 = yesterday…
  @state() private camera = "";
  @state() private cameras: string[] = [];
  @state() private events?: FEvent[];
  @state() private playing?: FEvent;
  @state() private missing = false;

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
        padding: 14px;
        display: grid;
        gap: 10px;
        grid-template-rows: auto minmax(0, 1fr) auto;
        overflow: hidden;
      }
      .top {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;
      }
      .top b {
        flex: 1;
        font-size: 16px;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .top select {
        width: auto;
        min-height: 36px;
      }
      .view {
        position: relative;
        border-radius: var(--r-md);
        background: #000;
        overflow: hidden;
        min-height: 120px;
        display: grid;
        place-items: center;
        color: #fff;
      }
      .view video {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .view .hint {
        opacity: 0.7;
        font-size: 14px;
        padding: 12px;
        text-align: center;
      }
      .bar {
        position: relative;
        height: 44px;
        border-radius: 12px;
        background: var(--surface-2);
        direction: ltr;
      }
      .tick {
        position: absolute;
        bottom: 2px;
        font-size: 10px;
        color: var(--text-2);
        transform: translateX(-50%);
      }
      .dot {
        position: absolute;
        top: 8px;
        width: 12px;
        height: 12px;
        margin-left: -6px;
        border-radius: 50%;
        border: 2px solid var(--surface-solid);
        cursor: pointer;
        padding: 0;
        transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .dot:hover,
      .dot.on {
        transform: scale(1.5);
      }
      .now {
        position: absolute;
        top: 4px;
        bottom: 4px;
        width: 2px;
        background: var(--alert);
      }
      .legend {
        display: flex;
        gap: 12px;
        font-size: 12px;
        color: var(--text-2);
      }
      .legend i {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-inline-end: 4px;
      }
    `,
  ];

  private get instance() {
    return this.widget.config.instance ?? "frigate";
  }

  connectedCallback() {
    super.connectedCallback();
    this.load();
  }

  private async load() {
    const start = new Date(Date.now() - this.day * DAY);
    start.setHours(0, 0, 0, 0);
    try {
      const raw = await this.ctx.hass.callWS<any>({
        type: "frigate/events/get",
        instance_id: this.instance,
        after: Math.floor(start.getTime() / 1000),
        before: Math.floor(start.getTime() / 1000) + 86400,
        limit: 300,
      });
      const all: FEvent[] = typeof raw === "string" ? JSON.parse(raw) : raw;
      this.cameras = [...new Set(all.map((e) => e.camera))].sort();
      if (!this.camera || !this.cameras.includes(this.camera)) this.camera = this.widget.config.camera ?? this.cameras[0] ?? "";
      this.events = all;
      this.missing = false;
    } catch {
      this.missing = true;
    }
  }

  private clip(e: FEvent) {
    return this.ctx.hass.hassUrl(`/api/frigate/${this.instance}/notifications/${e.id}/clip.mp4`);
  }

  render() {
    const { t, lang } = this.ctx;
    const start = new Date(Date.now() - this.day * DAY);
    start.setHours(0, 0, 0, 0);
    const pos = (ts: number) => Math.min(100, Math.max(0, ((ts * 1000 - start.getTime()) / DAY) * 100));
    const list = (this.events ?? []).filter((e) => e.camera === this.camera);
    const who = (e: FEvent) => (Array.isArray(e.sub_label) ? e.sub_label[0] : e.sub_label) || t(`fr_${e.label}` as any) || e.label;
    return html`<div class="card glass">
      <div class="top">
        <b><sn-icon icon="cctv" style="--icon-size:20px"></sn-icon>${t("widget_timeline")}</b>
        ${this.cameras.length > 1
          ? html`<select @change=${(e: any) => ((this.camera = e.target.value), (this.playing = undefined))}>
              ${this.cameras.map((c) => html`<option value=${c} ?selected=${c === this.camera}>${c.replace(/_/g, " ")}</option>`)}
            </select>`
          : nothing}
        <div class="seg">
          ${[1, 0].map(
            (d) => html`<button
              aria-pressed=${this.day === d}
              @click=${() => {
                this.day = d;
                this.playing = undefined;
                this.load();
              }}
            >
              ${t(d ? "yesterday" : "today")}
            </button>`
          )}
        </div>
      </div>
      <div class="view">
        ${this.missing
          ? html`<span class="hint">${t("frigate_missing")}</span>`
          : this.playing
          ? html`<video src=${this.clip(this.playing)} autoplay controls playsinline></video>`
          : html`<span class="hint">${list.length ? t("tl_pick", { n: list.length }) : t("tl_none")}</span>`}
      </div>
      <div>
        <div class="bar">
          ${[0, 6, 12, 18].map((h) => html`<span class="tick" style="left:${(h / 24) * 100 + (h ? 0 : 2)}%">${String(h).padStart(2, "0")}</span>`)}
          ${this.day === 0 ? html`<span class="now" style="left:${pos(Date.now() / 1000)}%"></span>` : nothing}
          ${list.map(
            (e) => html`<button
              class="dot ${this.playing?.id === e.id ? "on" : ""}"
              style="left:${pos(e.start_time)}%;background:${LABEL_COLOR[e.label] ?? "#9aa0a6"}"
              title="${new Date(e.start_time * 1000).toLocaleTimeString(LOCALE[lang], { hour: "2-digit", minute: "2-digit" })} · ${who(e)}"
              aria-label=${who(e)}
              @click=${() => (this.playing = e)}
            ></button>`
          )}
        </div>
        <div class="legend">
          ${Object.entries(LABEL_COLOR)
            .filter(([l]) => list.some((e) => e.label === l))
            .map(([l, c]) => html`<span><i style="background:${c}"></i>${t(`fr_${l}` as any) || l}</span>`)}
        </div>
      </div>
    </div>`;
  }
}
