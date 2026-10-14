import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import { entityName } from "./entities";
import { uid, uploadImage } from "./config";
import { LOCALE } from "./i18n";
import { loadKv, saveKv } from "./kv";
import "./ui/icon";

const card = (title: string, body: unknown) => html`<section style="display:grid;gap:8px;padding:14px 16px;border-radius:var(--r-md);background:var(--surface-2)">
  <div style="font-weight:700">${title}</div>
  ${body}
</section>`;

// ---- batteries: when each one runs out ----

/**
 * For every battery sensor, the last month's daily levels give a straight-line drain; where it crosses 10% is
 * when to come with a new battery. Only batteries that are really going down are listed.
 */
@customElement("sn-battery-plan")
export class SnBatteryPlan extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @state() private rows?: { id: string; level: number; days: number }[];

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    const { hass } = this.ctx;
    const ids = Object.values(hass.states)
      .filter((e) => e.entity_id.startsWith("sensor.") && e.attributes.device_class === "battery" && !Number.isNaN(Number(e.state)))
      .map((e) => e.entity_id)
      .slice(0, 60);
    if (!ids.length) return void (this.rows = []);
    let stats: Record<string, { start: number | string; mean?: number | null }[]> = {};
    try {
      stats = await hass.callWS({
        type: "recorder/statistics_during_period",
        start_time: new Date(Date.now() - 30 * 86_400_000).toISOString(),
        statistic_ids: ids,
        period: "day",
        types: ["mean"],
      });
    } catch {
      return void (this.rows = []);
    }
    const out: { id: string; level: number; days: number }[] = [];
    for (const id of ids) {
      const pts = (stats[id] ?? [])
        .map((p) => [typeof p.start === "number" ? (p.start > 1e12 ? p.start : p.start * 1000) : Date.parse(p.start), p.mean ?? NaN] as const)
        .filter(([, v]) => !Number.isNaN(v));
      if (pts.length < 7) continue;
      // Least squares: level = a + b·day.
      const n = pts.length;
      const xs = pts.map(([t]) => t / 86_400_000);
      const ys = pts.map(([, v]) => v);
      const mx = xs.reduce((a, b) => a + b, 0) / n;
      const my = ys.reduce((a, b) => a + b, 0) / n;
      const b = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0) / (xs.reduce((s, x) => s + (x - mx) ** 2, 0) || 1);
      const level = Number(hass.states[id].state);
      if (b >= -0.05 || level <= 10) continue; // not draining (or already flagged as low elsewhere)
      out.push({ id, level, days: Math.round((level - 10) / -b) });
    }
    this.rows = out.sort((a, b) => a.days - b.days).slice(0, 10);
  }

  render() {
    const { t, hass, config } = this.ctx;
    if (!this.rows) return card(t("bat_title"), html`<span class="muted" style="font-size:14px">${t("loading")}</span>`);
    return card(
      t("bat_title"),
      this.rows.length
        ? html`<div style="display:grid;gap:4px;font-size:14px">
            ${this.rows.map(
              (r) => html`<div style="display:flex;justify-content:space-between;gap:12px">
                <span>${entityName(hass, config, r.id)} <span class="muted ltr">${Math.round(r.level)}%</span></span>
                <span style="color:${r.days < 21 ? "var(--alert-text)" : "var(--text-2)"}">${r.days > 365 ? t("bat_year") : t("bat_days", { n: r.days })}</span>
              </div>`
            )}
          </div>`
        : html`<span class="muted" style="font-size:14px">${t("bat_none")}</span>`
    );
  }
}

// ---- warranties ----

interface Warranty {
  id: string;
  name: string;
  bought: string; // YYYY-MM-DD
  months: number;
  invoice?: string;
}

/** What's still under warranty, until when, with the invoice photo one tap away. */
@customElement("sn-warranty")
export class SnWarranty extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @state() private items?: Warranty[];
  @state() private busy = false;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    loadKv<{ items: Warranty[] }>(this.ctx.hass, "warranty").then((v) => (this.items = v?.items ?? []));
  }

  private save(items: Warranty[]) {
    this.items = items;
    saveKv(this.ctx.hass, "warranty", { items }).catch(() => this.ctx.toast(this.ctx.t("error")));
  }

  render() {
    const { t, lang } = this.ctx;
    if (!this.items) return nothing;
    const ends = (w: Warranty) => {
      const d = new Date(`${w.bought}T12:00`);
      d.setMonth(d.getMonth() + w.months);
      return d;
    };
    return card(
      t("war_title"),
      html`${this.items
          .slice()
          .sort((a, b) => ends(a).getTime() - ends(b).getTime())
          .map((w) => {
            const end = ends(w);
            const days = Math.round((end.getTime() - Date.now()) / 86_400_000);
            return html`<div style="display:flex;align-items:center;gap:10px;font-size:14px">
              <span style="flex:1">${w.name}</span>
              <span style="color:${days < 0 ? "var(--text-2)" : days < 60 ? "var(--alert-text)" : "var(--success)"}"
                >${days < 0 ? t("war_over") : t("war_until", { date: end.toLocaleDateString(LOCALE[lang], { day: "numeric", month: "short", year: "numeric" }) })}</span
              >
              ${w.invoice ? html`<a href=${w.invoice} target="_blank" rel="noopener" title=${t("war_invoice")}>🧾</a>` : nothing}
              <button class="icon-btn small pressable" aria-label=${t("delete")} @click=${() => this.save(this.items!.filter((x) => x.id !== w.id))}>
                <sn-icon icon="close" style="--icon-size:14px"></sn-icon>
              </button>
            </div>`;
          })}
        <form
          style="display:grid;gap:8px;margin-top:6px"
          @submit=${async (e: SubmitEvent) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const f = new FormData(form);
            const file = f.get("invoice") as File | null;
            this.busy = true;
            let invoice: string | undefined;
            if (file && file.size) invoice = await uploadImage(this.ctx.hass, file).catch(() => undefined);
            this.save([
              ...this.items!,
              { id: uid(), name: String(f.get("name")).trim(), bought: String(f.get("bought")), months: Number(f.get("months")) || 12, invoice },
            ]);
            this.busy = false;
            form.reset();
          }}
        >
          <input name="name" type="text" required placeholder=${t("war_what")} style="background:var(--surface-solid)" />
          <div style="display:flex;gap:8px">
            <input name="bought" type="date" required .value=${new Date().toISOString().slice(0, 10)} style="flex:1;background:var(--surface-solid)" />
            <select name="months" style="width:auto;background:var(--surface-solid)">
              ${[6, 12, 24, 36, 60].map((m) => html`<option value=${m} ?selected=${m === 12}>${t("war_months", { n: m })}</option>`)}
            </select>
          </div>
          <label class="field">🧾 ${t("war_invoice")}<input name="invoice" type="file" accept="image/*" /></label>
          <button class="btn pressable" type="submit" ?disabled=${this.busy} style="justify-self:start">${t("add")}</button>
        </form>`
    );
  }
}
