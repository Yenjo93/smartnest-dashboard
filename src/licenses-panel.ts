import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Hass, PanelInfo } from "./types";
import { fontFaceCss, shared, themeVars } from "./theme";
import "./ui/icon";

interface House {
  id: string;
  key: string;
  install: string;
  name: string;
  plan: "basic" | "pro" | "premium";
  trial: boolean;
  reseller: string;
  issued: number;
  expires: number | null;
  phone: string;
  note: string;
}

const DAY = 86_400_000;
const fmt = (t: number) => new Date(t * 1000).toLocaleDateString("ar-u-nu-latn", { day: "numeric", month: "short", year: "numeric" });

/** The message a client gets with their key. */
const message = (h: House) =>
  [`مرحبا ${h.name} 👋`, "هاد مفتاح تفعيل SmartNest لبيتك:", "", h.key, "", "افتح SmartNest بـ Home Assistant، الصق المفتاح، واضغط تفعيل."].join("\n");
const waLink = (h: House) => `https://wa.me/${h.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message(h))}`;

function status(h: House): ["ok" | "soon" | "bad", string] {
  if (!h.expires) return ["ok", "بدون انتهاء"];
  const d = Math.ceil((h.expires * 1000 - Date.now()) / DAY);
  if (d < 0) return ["bad", `خلص من ${-d} يوم`];
  if (d <= 30) return ["soon", `باقي ${d} يوم`];
  return ["ok", `لحد ${fmt(h.expires)}`];
}

/**
 * The installer's license desk, as its own page in the sidebar. Home Assistant only shows it on the installer's
 * house: the integration registers it there because that's where the signing key was put. Admins only.
 */
@customElement("smartnest-licenses")
export class SmartNestLicenses extends LitElement {
  @property({ attribute: false }) hass!: Hass;
  @property({ type: Boolean, reflect: true }) narrow = false;
  @property({ attribute: false }) panel?: PanelInfo;
  @state() private ready?: boolean;
  @state() private houses: House[] = [];
  @state() private plan: House["plan"] = "premium";
  @state() private days = "";
  @state() private q = "";
  @state() private filter: "all" | "soon" | "bad" = "all";
  @state() private last?: House;
  @state() private error = "";
  @state() private toastMsg = "";
  private toastTimer?: number;

  static styles = [
    shared,
    css`
      :host {
        display: block;
      }
      .page {
        min-height: 100vh;
        background: var(--bg);
        color: var(--text);
        font-family: var(--font);
      }
      .wrap {
        max-width: 1100px;
        margin: 0 auto;
        padding: 20px 16px 60px;
        display: grid;
        gap: 18px;
      }
      header {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      header img {
        width: 46px;
        height: 46px;
      }
      header h1 {
        margin: 0;
        font-size: 24px;
      }
      header .sub {
        color: var(--text-2);
        font-size: 14px;
      }
      .menu {
        margin-inline-end: 4px;
      }
      .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 12px;
      }
      .stat,
      .card,
      .house {
        background: var(--surface-solid);
        border-radius: var(--r-lg);
        box-shadow: 0 1px 0 var(--border);
      }
      .stat {
        padding: 16px;
      }
      .stat b {
        font-size: 28px;
        display: block;
      }
      .stat span {
        color: var(--text-2);
        font-size: 14px;
      }
      .cols {
        display: grid;
        grid-template-columns: minmax(300px, 380px) 1fr;
        gap: 18px;
        align-items: start;
      }
      :host([narrow]) .cols {
        grid-template-columns: 1fr;
      }
      @media (max-width: 860px) {
        .cols {
          grid-template-columns: 1fr;
        }
      }
      .card {
        padding: 18px;
        display: grid;
        gap: 12px;
      }
      .card h2 {
        margin: 0;
        font-size: 17px;
      }
      .mono {
        direction: ltr;
        text-align: left;
        font-family: ui-monospace, Menlo, monospace;
        font-size: 14px;
      }
      .check {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .check input {
        width: 20px;
        min-height: 20px;
      }
      .result {
        border: 1px solid var(--accent);
        background: color-mix(in srgb, var(--accent) 10%, transparent);
        border-radius: var(--r-md);
        padding: 12px;
        display: grid;
        gap: 8px;
        animation: in 400ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .result code {
        word-break: break-all;
        font-size: 12px;
        direction: ltr;
        text-align: left;
      }
      .err {
        color: var(--alert-text);
        font-size: 14px;
      }
      .tools {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .tools input {
        flex: 1;
        min-width: 180px;
      }
      .list {
        display: grid;
        gap: 10px;
      }
      .house {
        padding: 14px 16px;
        display: grid;
        gap: 8px;
        animation: in 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .top {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }
      .nm {
        font-weight: 700;
        font-size: 17px;
        flex: 1;
        min-width: 140px;
      }
      .badge {
        font-size: 12px;
        font-weight: 700;
        padding: 3px 10px;
        border-radius: 999px;
      }
      .p-premium {
        background: #2a2118;
        color: #f5c46b;
      }
      .p-pro {
        background: #e3efff;
        color: #1e5fbf;
      }
      .p-basic {
        background: var(--surface-2);
        color: var(--text-2);
      }
      .s-ok {
        background: color-mix(in srgb, var(--success) 16%, transparent);
        color: var(--success);
      }
      .s-soon {
        background: color-mix(in srgb, #e9971d 18%, transparent);
        color: #b36b00;
      }
      .s-bad {
        background: color-mix(in srgb, var(--alert) 16%, transparent);
        color: var(--alert-text);
      }
      .meta {
        color: var(--text-2);
        font-size: 13px;
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
      }
      .row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
      }
      a.btn {
        text-decoration: none;
      }
      .row .btn,
      .row select {
        min-height: 36px;
        font-size: 13px;
        width: auto;
      }
      .empty {
        color: var(--text-2);
        text-align: center;
        padding: 30px;
      }
      .toast {
        position: fixed;
        inset-inline: 0;
        bottom: 24px;
        margin: auto;
        width: max-content;
        background: var(--text);
        color: var(--surface-solid);
        padding: 10px 18px;
        border-radius: 999px;
        font-weight: 500;
        animation: in 300ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      details summary {
        cursor: pointer;
        color: var(--text-2);
        font-size: 14px;
      }
      @keyframes in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .house,
        .result,
        .toast {
          animation: none;
        }
      }
    `,
  ];

  private get assetBase() {
    return (this.panel?.config as any)?.asset_base ?? "/smartnest_static/static/";
  }

  connectedCallback() {
    super.connectedCallback();
    if (!document.getElementById("smartnest-fonts")) {
      const style = document.createElement("style");
      style.id = "smartnest-fonts";
      style.textContent = fontFaceCss(this.assetBase);
      document.head.appendChild(style);
    }
    this.refresh();
  }

  private get dark() {
    return !!(this.hass as any)?.themes?.darkMode;
  }

  private async refresh() {
    try {
      const s = await this.hass.callWS<{ ready: boolean; houses: House[] }>({ type: "smartnest/issuer/status" });
      this.ready = s.ready;
      this.houses = s.houses;
    } catch {
      this.ready = false;
    }
  }

  private toast(m: string) {
    this.toastMsg = m;
    window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => (this.toastMsg = ""), 2200);
  }

  private async copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      this.toast("انسخ ✓");
    } catch {
      window.prompt("انسخ:", text);
    }
  }

  /** One card per house: its newest key. Older keys of the same house are history. */
  private get latest(): House[] {
    const by = new Map<string, House>();
    for (const h of this.houses) if (!by.has(h.install) || by.get(h.install)!.issued < h.issued) by.set(h.install, h);
    return [...by.values()].sort((a, b) => b.issued - a.issued);
  }

  private async issue(e: SubmitEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const f = new FormData(form);
    const install = String(f.get("install") ?? "").trim().toLowerCase();
    this.error = "";
    if (!/^[0-9a-f]{32}$/.test(install)) return void (this.error = "رقم التركيب لازم يكون 32 حرف (من شاشة التفعيل عند الزبون)");
    const days = this.days === "custom" ? Number(f.get("customDays")) || undefined : this.days ? Number(this.days) : undefined;
    try {
      const rec = await this.hass.callWS<House>({
        type: "smartnest/issuer/issue",
        install,
        name: String(f.get("name") ?? "").trim(),
        plan: this.plan,
        days,
        trial: !!f.get("trial"),
        reseller: String(f.get("reseller") ?? ""),
        phone: String(f.get("phone") ?? ""),
        note: String(f.get("note") ?? ""),
      });
      this.last = rec;
      this.copy(rec.key);
      form.reset();
      this.plan = "premium";
      this.days = "";
      this.refresh();
    } catch (err: any) {
      this.error = err?.message ?? "خطأ";
    }
  }

  private async renew(h: House, opts: { plan?: House["plan"]; days?: number }, question: string) {
    if (!confirm(question)) return;
    try {
      const rec = await this.hass.callWS<House>({ type: "smartnest/issuer/renew", id: h.id, ...opts });
      this.copy(rec.key);
      this.refresh();
    } catch {
      this.toast("ما زبطت");
    }
  }

  private renderSetup() {
    return html`<div class="card">
      <h2>🔑 ركّب مفتاح التوقيع</h2>
      <span class="muted">ارفع ملف <span class="mono">license-private.pem</span> من فولدر <span class="mono">~/.smartnest</span> على الكمبيوتر. بعدها هاي الصفحة بتصير تعمل مفاتيح للزباين.</span>
      <input
        type="file"
        accept=".pem"
        @change=${async (e: any) => {
          const file: File | undefined = e.target.files?.[0];
          if (!file) return;
          try {
            await this.hass.callWS({ type: "smartnest/issuer/setup", pem: await file.text() });
            this.toast("تمام ✓");
            this.refresh();
          } catch {
            this.toast("هاد مش مفتاح SmartNest الصح");
          }
        }}
      />
    </div>`;
  }

  private renderForm() {
    const seg = <T extends string>(value: T, options: [T, string][], set: (v: T) => void) => html`<div class="seg">
      ${options.map(([v, label]) => html`<button type="button" aria-pressed=${value === v} @click=${() => set(v)}>${label}</button>`)}
    </div>`;
    return html`<form class="card" autocomplete="off" @submit=${(e: SubmitEvent) => this.issue(e)}>
      <h2>✨ مفتاح جديد</h2>
      <label class="field">رقم التركيب (من شاشة التفعيل عند الزبون)<input name="install" type="text" class="mono" placeholder="2a9291b812404fda9dabc988300cf5ce" required maxlength="40" /></label>
      <label class="field">اسم البيت أو الزبون<input name="name" type="text" placeholder="بيت أبو محمد" required /></label>
      <label class="field">واتساب الزبون (اختياري)<input name="phone" type="tel" class="mono" placeholder="972501234567" /></label>
      <div class="field">الباقة ${seg(this.plan, [["basic", "Basic"], ["pro", "Pro"], ["premium", "Premium"]], (v) => (this.plan = v))}</div>
      <div class="field">
        المدة ${seg(this.days, [["", "بدون انتهاء"], ["30", "شهر"], ["365", "سنة"], ["custom", "…"]], (v) => (this.days = v))}
        ${this.days === "custom" ? html`<input name="customDays" type="number" min="1" placeholder="كم يوم" />` : nothing}
      </div>
      <label class="check"><input type="checkbox" name="trial" /> تجربة 14 يوم (Premium)</label>
      <details>
        <summary>أكثر</summary>
        <div style="display:grid;gap:10px;margin-top:10px">
          <label class="field">عن طريق (موزّع)<input name="reseller" type="text" /></label>
          <label class="field">ملاحظة<textarea name="note" rows="2" placeholder="مثلاً: فيلا، 3 طوابق"></textarea></label>
        </div>
      </details>
      <button class="btn primary pressable" type="submit" style="min-height:50px">اعمل المفتاح</button>
      ${this.error ? html`<div class="err">${this.error}</div>` : nothing}
      ${this.last
        ? html`<div class="result">
            <b>✓ ${this.last.name} · ${this.last.plan}</b>
            <code>${this.last.key}</code>
            <div class="row">
              <button class="btn primary pressable" type="button" @click=${() => this.copy(this.last!.key)}>نسخ</button>
              ${this.last.phone ? html`<a class="btn pressable" target="_blank" rel="noopener" href=${waLink(this.last)}>ابعت عالواتساب</a>` : nothing}
            </div>
          </div>`
        : nothing}
    </form>`;
  }

  private renderHouse(h: House) {
    const [cls, txt] = status(h);
    const older = this.houses.filter((x) => x.install === h.install && x.id !== h.id).length;
    return html`<div class="house">
      <div class="top">
        <span class="nm">${h.name}</span>
        <span class="badge p-${h.plan}">${h.plan}${h.trial ? " · تجربة" : ""}</span>
        <span class="badge s-${cls}">${txt}</span>
      </div>
      <div class="meta">
        <span class="mono" style="font-size:12px">${h.install}</span><span>انعمل ${fmt(h.issued)}</span>
        ${h.reseller ? html`<span>عن طريق ${h.reseller}</span>` : nothing} ${older ? html`<span>${older} مفاتيح قبل</span>` : nothing}
      </div>
      ${h.note ? html`<div class="meta">📝 ${h.note}</div>` : nothing}
      <div class="row">
        <button class="btn pressable" @click=${() => this.copy(h.key)}>نسخ المفتاح</button>
        ${h.phone
          ? html`<a class="btn pressable" target="_blank" rel="noopener" href=${waLink(h)}>واتساب</a>`
          : html`<button
              class="btn pressable"
              @click=${async () => {
                const phone = prompt("رقم واتساب الزبون (مع مفتاح الدولة)", "");
                if (!phone) return;
                await this.hass.callWS({ type: "smartnest/issuer/update", id: h.id, phone });
                this.refresh();
              }}
            >
              + واتساب
            </button>`}
        <button class="btn pressable" @click=${() => this.renew(h, { days: 365 }, `مفتاح جديد لـ ${h.name} لمدة سنة من اليوم؟`)}>جدّد سنة</button>
        <select
          @change=${(e: any) => {
            const plan = e.target.value as House["plan"];
            e.target.value = "";
            if (!plan) return;
            const left = h.expires ? Math.max(1, Math.ceil((h.expires * 1000 - Date.now()) / DAY)) : undefined;
            this.renew(h, { plan, days: left }, `مفتاح جديد لـ ${h.name} بباقة ${plan}؟ (نفس المدة الباقية)`);
          }}
        >
          <option value="">غيّر الباقة…</option>
          ${(["basic", "pro", "premium"] as const).filter((p) => p !== h.plan).map((p) => html`<option value=${p}>${p}</option>`)}
        </select>
        <button
          class="btn pressable"
          style="color:var(--alert-text)"
          @click=${async () => {
            if (!confirm(`تشيل ${h.name} من القائمة؟ (المفتاح نفسه بيضل شغّال)`)) return;
            await this.hass.callWS({ type: "smartnest/issuer/remove", install: h.install });
            this.refresh();
          }}
        >
          شيل
        </button>
      </div>
    </div>`;
  }

  render() {
    const vars = themeVars(this.dark, "");
    const style = Object.entries(vars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";");
    const all = this.latest;
    const q = this.q.trim().toLowerCase();
    const list = all.filter((h) => {
      if (q && ![h.name, h.install, h.note, h.phone, h.reseller].join(" ").toLowerCase().includes(q)) return false;
      const left = h.expires ? h.expires * 1000 - Date.now() : Infinity;
      return this.filter === "soon" ? left > 0 && left < 30 * DAY : this.filter === "bad" ? left < 0 : true;
    });
    const soon = all.filter((h) => h.expires && h.expires * 1000 > Date.now() && h.expires * 1000 - Date.now() < 30 * DAY).length;
    const by = (p: string) => all.filter((h) => h.plan === p && !h.trial).length;
    return html`<div class="page" style=${style} dir="rtl">
      <div class="wrap">
        <header>
          ${this.narrow
            ? html`<button class="icon-btn pressable menu" aria-label="menu" @click=${() => this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true }))}>
                <sn-icon icon="menu"></sn-icon>
              </button>`
            : nothing}
          <img src="${this.assetBase}logo/smartnest-symbol-${this.dark ? "white" : "color"}.svg" alt="" />
          <div><h1>التراخيص</h1><div class="sub">مفاتيح SmartNest لزباينك. بس إلك.</div></div>
        </header>
        ${this.ready === undefined
          ? html`<span class="muted">…</span>`
          : !this.ready
          ? this.renderSetup()
          : html`<div class="stats">
                ${[
                  ["🏠", all.length, "بيت"],
                  ["⭐", by("premium"), "Premium"],
                  ["💎", by("pro"), "Pro"],
                  ["🔹", by("basic"), "Basic"],
                  ["⏳", soon, "قرّبوا يخلصوا"],
                ].map(([i, n, label]) => html`<div class="stat"><b>${i} ${n}</b><span>${label}</span></div>`)}
              </div>
              <div class="cols">
                ${this.renderForm()}
                <div style="display:grid;gap:12px">
                  <div class="tools">
                    <input type="search" placeholder="🔍 دوّر باسم أو رقم أو ملاحظة" .value=${this.q} @input=${(e: any) => (this.q = e.target.value)} />
                    <div class="seg" style="flex:none">
                      ${(
                        [
                          ["all", "الكل"],
                          ["soon", "قرّبت"],
                          ["bad", "خلصت"],
                        ] as const
                      ).map(([v, label]) => html`<button aria-pressed=${this.filter === v} @click=${() => (this.filter = v)}>${label}</button>`)}
                    </div>
                  </div>
                  <div class="list">
                    ${list.length
                      ? list.map((h) => this.renderHouse(h))
                      : html`<div class="empty">${all.length ? "ما في نتايج" : "لسا ما عملت مفاتيح. أول مفتاح من الفورم."}</div>`}
                  </div>
                  <details class="card">
                    <summary>أضف مفتاح قديم للقائمة</summary>
                    <form
                      style="display:grid;gap:10px;margin-top:10px"
                      @submit=${async (e: SubmitEvent) => {
                        e.preventDefault();
                        const form = e.currentTarget as HTMLFormElement;
                        try {
                          await this.hass.callWS({ type: "smartnest/issuer/import", key: String(new FormData(form).get("key") ?? "") });
                          form.reset();
                          this.toast("انضاف ✓");
                          this.refresh();
                        } catch (err: any) {
                          this.toast(err?.code === "exists" ? "موجود بالقائمة" : "هاد مش مفتاح من توقيعك");
                        }
                      }}
                    >
                      <textarea name="key" class="mono" rows="3" placeholder="SN1...." required></textarea>
                      <button class="btn pressable" type="submit">أضف</button>
                    </form>
                  </details>
                  <details class="card">
                    <summary>شيل مفتاح التوقيع من هالبيت</summary>
                    <span class="muted" style="font-size:14px">الصفحة بتختفي، والمفاتيح اللي عملتها بتضل شغّالة. بترجّعها برفع الملف كمان مرة من SmartNest.</span>
                    <button
                      class="btn pressable"
                      style="color:var(--alert-text);justify-self:start"
                      @click=${async () => {
                        if (!confirm("أكيد؟")) return;
                        await this.hass.callWS({ type: "smartnest/issuer/forget" });
                        this.refresh();
                      }}
                    >
                      شيله
                    </button>
                  </details>
                </div>
              </div>`}
      </div>
      ${this.toastMsg ? html`<div class="toast" role="status">${this.toastMsg}</div>` : nothing}
    </div>`;
  }
}
