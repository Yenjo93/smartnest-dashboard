import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import { entityName } from "./entities";
import { LOCALE } from "./i18n";
import "./ui/icon";

interface GuestCode {
  id: string;
  lock: string;
  name: string;
  slot: number;
  code: string;
  from: number;
  until: number;
  live: boolean;
}

const DURATIONS: [number, string][] = [
  [4, "codes_4h"],
  [24, "codes_day"],
  [72, "codes_3days"],
  [168, "codes_week"],
];

/** Temporary door codes for guests and helpers. They switch on and wipe themselves on the hub. */
@customElement("sn-guest-codes")
export class SnGuestCodes extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property() lock = "";
  @state() private codes?: GuestCode[];
  @state() private zwave = true;
  @state() private hours = 24;
  @state() private busy = false;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.load();
  }

  private async load() {
    try {
      const r = await this.ctx.hass.callWS<{ codes: GuestCode[]; zwave: boolean }>({ type: "smartnest/codes/list" });
      this.codes = r.codes.filter((c) => !this.lock || c.lock === this.lock);
      this.zwave = r.zwave;
    } catch {
      this.codes = [];
    }
  }

  private when(t: number) {
    return new Date(t * 1000).toLocaleString(LOCALE[this.ctx.lang], { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  }

  private share(c: GuestCode) {
    const { t, hass, config } = this.ctx;
    const text = t("codes_message", { name: c.name, lock: entityName(hass, config, c.lock), code: c.code, from: this.when(c.from), until: this.when(c.until) });
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  }

  render() {
    const { t, hass, config } = this.ctx;
    const locks = this.lock ? [this.lock] : Object.keys(hass.states).filter((id) => id.startsWith("lock."));
    if (!this.codes) return html`<sn-skeleton></sn-skeleton>`;
    return html`<div style="display:grid;gap:12px">
      ${!this.zwave ? html`<p class="muted" style="margin:0;font-size:14px">${t("codes_need_zwave")}</p>` : nothing}
      ${this.codes.map(
        (c) => html`<div style="display:grid;gap:6px;padding:12px;border-radius:var(--r-md);background:var(--surface-2)">
          <div style="display:flex;align-items:center;gap:10px">
            <b style="flex:1">${c.name}</b>
            <span style="font:700 22px var(--font);letter-spacing:.12em;direction:ltr">${c.code}</span>
            <span class="muted" style="font-size:12px">${c.live ? "🟢 " + t("codes_live") : "⏳ " + t("codes_later")}</span>
          </div>
          <span class="muted" style="font-size:13px">${this.when(c.from)} ← ${this.when(c.until)} · ${entityName(hass, config, c.lock)}</span>
          <div style="display:flex;gap:8px">
            <button class="btn pressable" style="min-height:36px" @click=${() => this.share(c)}><sn-icon icon="whatsapp" style="--icon-size:18px"></sn-icon>${t("codes_share")}</button>
            <button
              class="btn pressable"
              style="min-height:36px;color:var(--alert-text)"
              @click=${async () => {
                await hass.callWS({ type: "smartnest/codes/remove", id: c.id }).catch(() => undefined);
                this.load();
              }}
            >
              ${t("delete")}
            </button>
          </div>
        </div>`
      )}
      <form
        style="display:grid;gap:10px"
        @submit=${async (e: SubmitEvent) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const f = new FormData(form);
          const start = f.get("from") ? Date.parse(String(f.get("from"))) / 1000 : Date.now() / 1000;
          this.busy = true;
          try {
            const c = await hass.callWS<GuestCode>({
              type: "smartnest/codes/add",
              lock: String(f.get("lock")),
              name: String(f.get("name")).trim(),
              from: start,
              until: start + this.hours * 3600,
              ...(String(f.get("code") ?? "").trim() ? { code: String(f.get("code")).trim() } : {}),
            });
            form.reset();
            await this.load();
            this.share(c);
          } catch (err: any) {
            console.error("[smartnest] guest code", err);
            this.ctx.toast(err?.code === "no_slot" ? t("codes_full") : t("error"));
          }
          this.busy = false;
        }}
      >
        <b>${t("codes_new")}</b>
        <input name="name" type="text" required placeholder=${t("codes_who")} />
        ${locks.length > 1
          ? html`<select name="lock">${locks.map((id) => html`<option value=${id}>${entityName(hass, config, id)}</option>`)}</select>`
          : html`<input type="hidden" name="lock" .value=${locks[0] ?? ""} />`}
        <label class="field">${t("codes_from")}<input name="from" type="datetime-local" /></label>
        <div class="seg">${DURATIONS.map(([h, label]) => html`<button type="button" aria-pressed=${this.hours === h} @click=${() => (this.hours = h)}>${t(label as any)}</button>`)}</div>
        <input name="code" type="text" inputmode="numeric" pattern="[0-9]{4,8}" class="ltr" placeholder=${t("codes_auto")} />
        <button class="btn primary pressable" type="submit" ?disabled=${this.busy || !locks.length}>${t("codes_make")}</button>
      </form>
    </div>`;
  }
}

export const guestCodesSheet = (ctx: Ctx, lock: string) =>
  ctx.showSheet({ title: ctx.t("codes_title"), render: (c) => html`<sn-guest-codes .ctx=${c} .lock=${lock}></sn-guest-codes>` });
