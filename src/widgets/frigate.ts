import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "../ctx";
import type { Widget } from "../types";
import { LOCALE, type I18nKey } from "../i18n";
import { relativeTime } from "../entities";
import { shared } from "../theme";
import "../ui/icon";
import { watchVisible } from "../ui/visible";
import { cameraDigest } from "../ai-features";

interface FEvent {
  id: string;
  camera: string;
  label: string;
  sub_label?: string | [string, number] | null;
  start_time: number;
  has_snapshot?: boolean;
  has_clip?: boolean;
}

const LABELS: Record<string, [I18nKey, string]> = {
  person: ["person_l", "person"],
  car: ["car_l", "car"],
  dog: ["dog_l", "dog"],
  cat: ["cat_l", "cat"],
  package: ["package_l", "package"],
};

/**
 * Who and what the cameras saw, from Frigate: people, cars, pets, parcels. When Frigate recognises a face
 * or reads a plate, the name or number is shown on the card. Recognition itself is Frigate's job.
 */
@customElement("sn-w-frigate")
export class SnFrigate extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) widget!: Widget;
  @state() private events?: FEvent[];
  @state() private missing = false;
  private timer?: number;
  private seen = true;
  private stopVis?: () => void;

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
        grid-template-rows: auto 1fr;
        gap: 10px;
        overflow: hidden;
      }
      h3 {
        margin: 0;
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 16px;
        --icon-size: 20px;
      }
      h3 sn-icon {
        color: var(--accent-text);
      }
      .strip {
        display: flex;
        gap: 10px;
        overflow-x: auto;
        scrollbar-width: none;
        min-height: 0;
      }
      .ev {
        position: relative;
        flex: none;
        height: 100%;
        aspect-ratio: 1;
        border-radius: 14px;
        overflow: hidden;
        background: #0d1114 center / cover no-repeat;
        color: #fff;
        animation: in 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .ev .tag {
        position: absolute;
        top: 8px;
        inset-inline-start: 8px;
        display: inline-flex;
        gap: 4px;
        align-items: center;
        padding: 3px 9px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.6);
        font-size: 12px;
        font-weight: 700;
        --icon-size: 14px;
      }
      .ev .who {
        background: var(--accent);
        color: var(--on-accent);
      }
      .ev .when {
        position: absolute;
        bottom: 8px;
        inset-inline-start: 8px;
        padding: 3px 9px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.6);
        font-size: 12px;
      }
      .muted {
        font-size: 14px;
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: scale(0.94);
        }
      }
    `,
  ];

  private get instance(): string {
    return this.widget.config.instance || "frigate";
  }

  connectedCallback() {
    super.connectedCallback();
    this.load();
    this.timer = window.setInterval(() => this.seen && this.load(), 30_000);
    this.stopVis = watchVisible(this, (on) => (this.seen = on));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopVis?.();
    window.clearInterval(this.timer);
  }

  private async load() {
    try {
      const raw = await this.ctx.hass.callWS<string | FEvent[]>({
        type: "frigate/events/get",
        instance_id: this.instance,
        cameras: this.widget.config.cameras?.length ? this.widget.config.cameras : undefined,
        limit: 20,
        has_snapshot: true,
      });
      // The integration passes Frigate's JSON through as text.
      this.events = typeof raw === "string" ? JSON.parse(raw) : raw;
      this.missing = false;
    } catch {
      this.missing = true;
    }
  }

  private img(id: string, kind: "thumbnail.jpg" | "snapshot.jpg" | "clip.mp4") {
    // Frigate's notification proxy: works in <img>/<video> without an auth header.
    return this.ctx.hass.hassUrl(`/api/frigate/${this.instance}/notifications/${id}/${kind}`);
  }

  private who(e: FEvent): string | undefined {
    const s = e.sub_label;
    if (!s) return undefined;
    return Array.isArray(s) ? s[0] : s;
  }

  private open(e: FEvent) {
    const loc = LOCALE[this.ctx.lang];
    this.ctx.showSheet({
      title: `${this.who(e) ?? this.ctx.t(LABELS[e.label]?.[0] ?? "person_l")} · ${new Date(e.start_time * 1000).toLocaleString(loc, { weekday: "short", hour: "2-digit", minute: "2-digit" })}`,
      render: () =>
        e.has_clip
          ? html`<video src=${this.img(e.id, "clip.mp4")} controls autoplay muted playsinline style="width:100%;border-radius:var(--r-md)"></video>`
          : html`<img src=${this.img(e.id, "snapshot.jpg")} alt="" style="width:100%;border-radius:var(--r-md)" />`,
    });
  }

  render() {
    const { ctx } = this;
    const { t } = ctx;
    return html`<div class="card glass">
      <h3><sn-icon icon="cctv"></sn-icon>${t("widget_frigate")}</h3>
      ${ctx.allows("ai_cameras") && !this.missing
        ? html`<sn-ai-ask-button .ctx=${ctx} label=${t("ai_cam_btn")} .run=${() => cameraDigest(ctx, this.instance)}></sn-ai-ask-button>`
        : ""}
      ${this.missing
        ? html`<span class="muted">${t("frigate_missing")}</span>`
        : html`<div class="strip" data-no-swipe>
            ${(this.events ?? []).map((e, i) => {
              const [label, icon] = LABELS[e.label] ?? ["person_l", "eye"];
              const who = this.who(e);
              return html`<button class="ev pressable" style="background-image:url('${this.img(e.id, "thumbnail.jpg")}');animation-delay:${Math.min(i, 8) * 40}ms" @click=${() => this.open(e)}>
                <span class="tag ${who ? "who" : ""}"><sn-icon .icon=${icon}></sn-icon>${who ?? t(label)}</span>
                <span class="when">${relativeTime(t, new Date(e.start_time * 1000).toISOString())}</span>
              </button>`;
            })}
            ${this.events && !this.events.length ? html`<span class="muted">${t("no_visitors")}</span>` : nothing}
          </div>`}
    </div>`;
  }
}
