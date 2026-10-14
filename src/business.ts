import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import type { DashboardConfig, Settings } from "./types";
import { LOCALE, isRtl, type I18nKey } from "./i18n";
import { domainOf, entityName, formatNumber, relativeTime } from "./entities";
import { dashboardEntities } from "./chips";
import { guessBill } from "./widgets/energy-stats";
import { maintenanceDue, weeklyFaults } from "./installer";
import { qrSvg } from "./guests";
import "./ui/icon";

// ---- support: "something's wrong" straight to the installer's WhatsApp ----

/** What the installer needs to know before calling back, in plain lines. */
function snapshotLines(ctx: Ctx, version: string): string[] {
  const { hass, config, t } = ctx;
  const all = Object.values(hass.states);
  const onBoard = new Set(dashboardEntities(config));
  const offline = all.filter((e) => e.state === "unavailable" && onBoard.has(e.entity_id)).map((e) => entityName(hass, config, e.entity_id));
  const low = all
    .filter((e) => e.attributes.device_class === "battery" && domainOf(e.entity_id) === "sensor" && Number(e.state) < 20)
    .map((e) => `${entityName(hass, config, e.entity_id)} ${e.state}%`);
  return [
    `🏠 ${config.settings.home_name || (hass as any).config?.location_name || "SmartNest"} · v${version}`,
    offline.length ? `${t("h_offline")}: ${offline.slice(0, 6).join("، ")}` : `${t("h_offline")}: ✓`,
    ...(low.length ? [`${t("h_battery")}: ${low.slice(0, 4).join("، ")}`] : []),
  ];
}

export function supportSheet(ctx: Ctx, version: string) {
  const phone = (ctx.config.settings.installer.phone ?? "").replace(/[^\d]/g, "");
  ctx.showSheet({
    title: ctx.t("support_title"),
    render: (c) => html`<form
      style="display:grid;gap:12px"
      @submit=${(e: SubmitEvent) => {
        e.preventDefault();
        const text = ((e.currentTarget as HTMLFormElement).elements.namedItem("msg") as HTMLTextAreaElement).value.trim();
        const body = [text || c.t("support_default"), "", ...snapshotLines(c, version)].join("\n");
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
        c.closeSheet();
      }}
    >
      <span class="muted" style="font-size:14px">${c.t("support_hint", { name: c.config.settings.installer.name || "SmartNest" })}</span>
      <textarea name="msg" rows="4" placeholder=${c.t("support_placeholder")}></textarea>
      <div style="font-size:13px;color:var(--text-2);white-space:pre-line;unicode-bidi:plaintext">${snapshotLines(c, version).join("\n")}</div>
      <button class="btn primary pressable" type="submit" style="min-height:52px"><sn-icon icon="whatsapp" style="--icon-size:22px"></sn-icon>${c.t("support_send")}</button>
    </form>`,
  });
}

// ---- monthly report for the client ----

const esc = (s: string) => s.replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]!);

/** A one-page report with the installer's logo: energy, faults, maintenance. Printed (or saved as PDF) from the browser. */
export async function printReport(ctx: Ctx, assetBase: string) {
  const { hass, config, t, lang } = ctx;
  const loc = LOCALE[lang];
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const bill = config.pages.flatMap((p) => p.widgets).find((w) => w.type === "energy_stats")?.config ?? {};
  const total = bill.total ?? guessBill(hass).total;
  const tariff = Number(bill.tariff ?? 0.6);
  const currency = bill.currency ?? "₪";
  let kwh: number | undefined;
  if (total)
    try {
      const res = await hass.callWS<Record<string, { change?: number }[]>>({
        type: "recorder/statistics_during_period",
        start_time: start.toISOString(),
        end_time: now.toISOString(),
        statistic_ids: [total],
        period: "day",
        types: ["change"],
      });
      kwh = (res[total] ?? []).reduce((a, p) => a + (p.change ?? 0), 0);
    } catch {
      /* no energy section */
    }
  const faults = await weeklyFaults(ctx, 30);
  const due = maintenanceDue(config).sort((a, b) => a.days - b.days);
  const onBoard = dashboardEntities(config).filter((id) => hass.states[id]);
  const offline = onBoard.filter((id) => hass.states[id].state === "unavailable");
  const autos = Object.values(hass.states).filter((e) => e.entity_id.startsWith("automation.") && String(e.attributes.friendly_name ?? "").startsWith("SmartNest"));
  const name = config.settings.home_name || (hass as any).config?.location_name || "SmartNest";
  const installer = config.settings.installer;
  const logo = new URL(`${assetBase}logo/smartnest-symbol-color.svg`, location.href).href;
  const li = (s: string) => `<li>${esc(s)}</li>`;
  const card = (title: string, body: string) => `<section><h2>${esc(title)}</h2>${body}</section>`;
  const doc = `<!doctype html><html lang="${lang}" dir="${isRtl(lang) ? "rtl" : "ltr"}"><head><meta charset="utf-8"><title>${esc(name)}</title>
<style>
body{font-family:Rubik,system-ui,-apple-system,"Segoe UI",Tahoma,sans-serif;color:#1d1d1f;margin:32px;}
header{display:flex;align-items:center;gap:16px;border-bottom:3px solid #E9971D;padding-bottom:16px;margin-bottom:20px}
header img{width:56px;height:56px} h1{margin:0;font-size:26px} .sub{color:#6e6e73;font-size:14px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px} section{border:1px solid #e5e5ea;border-radius:16px;padding:16px;break-inside:avoid}
h2{margin:0 0 8px;font-size:16px;color:#E9971D} .big{font-size:30px;font-weight:700;unicode-bidi:plaintext} .sub{unicode-bidi:plaintext} ul{margin:0;padding-inline-start:18px;line-height:1.7}
footer{margin-top:24px;color:#6e6e73;font-size:12px;display:flex;justify-content:space-between}
@page{margin:14mm}
</style></head><body>
<header><img src="${logo}" alt=""><div><h1>${esc(t("report_title", { name }))}</h1><div class="sub">${esc(now.toLocaleDateString(loc, { month: "long", year: "numeric" }))}</div></div></header>
<div class="grid">
${kwh !== undefined ? card(t("bill_title"), `<div class="big">${esc(`${formatNumber(kwh, lang, 0)} kWh`)}</div><div class="sub">≈ ${esc(`${currency} ${formatNumber(kwh * tariff, lang, 0)}`)}</div>`) : ""}
${card(t("report_devices"), `<div class="big">${onBoard.length}</div><div class="sub">${esc(t("report_offline", { n: offline.length }))}</div>`)}
${card(t("report_faults"), faults.length ? `<ul>${faults.map((f) => li(`${f.name} · ${t("times", { n: f.n })}`)).join("")}</ul>` : `<div class="sub">${esc(t("h_all_good"))}</div>`)}
${card(t("maintenance"), due.length ? `<ul>${due.map((m) => li(`${m.title} · ${m.days < 0 ? t("m_overdue", { n: -m.days }) : t("m_in", { n: m.days })}`)).join("")}</ul>` : `<div class="sub">–</div>`)}
${card(t("automations"), `<div class="big">${autos.length}</div><div class="sub">${esc(t("report_autos", { n: autos.filter((a) => a.state === "on").length }))}</div>`)}
</div>
<footer><span>${esc(installer.name || "SmartNest")}${installer.phone ? ` · ${esc(installer.phone)}` : ""}</span><span>SmartNest</span></footer>
</body></html>`;
  // Print through a hidden frame: popups are blocked in the HA app and on kiosk tablets.
  const frame = document.createElement("iframe");
  frame.style.cssText = "position:fixed;width:0;height:0;border:0;opacity:0";
  document.body.appendChild(frame);
  frame.srcdoc = doc;
  frame.onload = () => {
    frame.contentWindow?.focus();
    frame.contentWindow?.print();
    window.setTimeout(() => frame.remove(), 60_000);
  };
}

// ---- ready-made looks ----

export const THEME_PRESETS: { id: string; label: I18nKey; accent: string; glass: Settings["glass"]; theme: Settings["theme"] }[] = [
  { id: "gold", label: "preset_gold", accent: "#E9971D", glass: "classic", theme: "schedule" },
  { id: "sea", label: "preset_sea", accent: "#1E88E5", glass: "liquid", theme: "schedule" },
  { id: "desert", label: "preset_desert", accent: "#C68B59", glass: "classic", theme: "light" },
  { id: "night", label: "preset_night", accent: "#8E6CEF", glass: "liquid", theme: "dark" },
  { id: "rose", label: "preset_rose", accent: "#E85D9E", glass: "classic", theme: "light" },
  { id: "olive", label: "preset_olive", accent: "#6E9B3A", glass: "classic", theme: "schedule" },
];

export function presetPicker(c: Ctx, set: (fn: (d: DashboardConfig) => void) => void) {
  const s = c.config.settings;
  return html`<div class="field">
    ${c.t("presets")}
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px">
      ${THEME_PRESETS.map((p) => {
        const on = s.accent.toUpperCase() === p.accent && s.theme === p.theme && s.glass === p.glass;
        const dark = p.theme === "dark";
        return html`<button
          class="pressable"
          aria-pressed=${on}
          style="display:grid;gap:8px;justify-items:center;padding:12px;border-radius:var(--r-md);border:2px solid ${on ? p.accent : "transparent"};
            background:${dark ? "#1c1c22" : "#f6f1ea"};color:${dark ? "#fff" : "#1d1d1f"};font:600 13px var(--font);cursor:pointer"
          @click=${() =>
            set((d) => {
              d.settings.accent = p.accent;
              d.settings.glass = c.allows("liquid_glass") ? p.glass : "classic";
              d.settings.theme = p.theme;
            })}
        >
          <span style="display:flex;gap:4px">
            <i style="width:22px;height:22px;border-radius:999px;background:${p.accent}"></i>
            <i style="width:22px;height:22px;border-radius:999px;background:${dark ? "#2c2c34" : "#fff"};box-shadow:inset 0 0 0 1px rgba(0,0,0,.1)"></i>
          </span>
          ${c.t(p.label)}
        </button>`;
      })}
    </div>
  </div>`;
}

// ---- earlier versions ----

interface Version {
  id: string;
  time: number;
  user: string;
  pages: number;
  widgets: number;
}

@customElement("sn-history")
export class SnHistory extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @state() private items?: Version[];

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.ctx.hass
      .callWS<{ items: Version[] }>({ type: "smartnest/history/list" })
      .then((r) => (this.items = r.items))
      .catch(() => (this.items = []));
  }

  render() {
    const { t, hass, lang } = this.ctx;
    if (!this.items) return html`<sn-skeleton></sn-skeleton>`;
    if (!this.items.length) return html`<p class="muted" style="margin:0">${t("history_empty")}</p>`;
    return html`<div style="display:grid;gap:8px">
      <span class="muted" style="font-size:14px">${t("history_hint")}</span>
      ${this.items.map(
        (v) => html`<div style="display:flex;align-items:center;gap:10px;padding:12px;border-radius:var(--r-md);background:var(--surface-2)">
          <span style="flex:1;display:grid;gap:2px">
            <b>${new Date(v.time * 1000).toLocaleString(LOCALE[lang], { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</b>
            <span class="muted" style="font-size:13px">${relativeTime(t, new Date(v.time * 1000).toISOString())} · ${v.user || "–"} · ${t("history_size", { p: v.pages, w: v.widgets })}</span>
          </span>
          <button
            class="btn pressable"
            @click=${async () => {
              if (!confirm(t("history_confirm"))) return;
              try {
                await hass.callWS({ type: "smartnest/history/restore", version: v.id });
                this.ctx.toast(t("history_done"));
                this.ctx.closeSheet();
              } catch {
                this.ctx.toast(t("error"));
              }
            }}
          >
            ${t("history_restore")}
          </button>
        </div>`
      )}
    </div>`;
  }
}

export const historySheet = (ctx: Ctx) => ctx.showSheet({ title: ctx.t("history"), render: (c) => html`<sn-history .ctx=${c}></sn-history>` });

export const installerSupport = (ctx: Ctx) => !!ctx.config.settings.installer.phone && ctx.allows("support");


// ---- the installer's licenses page ----

/**
 * Settings → Licenses. Where the signing key is already set up, it opens the Licenses page; otherwise it takes the
 * key file. Clients never get the file, so on their houses this goes nowhere.
 */
export async function licensesSheet(ctx: Ctx) {
  let ready = false;
  try {
    ready = (await ctx.hass.callWS<{ ready: boolean }>({ type: "smartnest/issuer/status" })).ready;
  } catch {
    /* older integration: show the upload */
  }
  const open = () => {
    history.pushState(null, "", "/smartnest-licenses");
    window.dispatchEvent(new CustomEvent("location-changed"));
  };
  if (ready) return open();
  ctx.showSheet({
    title: "🔑 التراخيص",
    render: (c) => html`<div style="display:grid;gap:12px">
      <span class="muted">ارفع ملف <bdi><b>license-private.pem</b></bdi> من فولدر <bdi><b>.smartnest</b></bdi> على الكمبيوتر. بعدها بتطلع صفحة <b>التراخيص</b> بالقائمة الجانبية، بهالبيت بس وللأدمن بس.</span>
      <label class="btn primary pressable" style="min-height:52px;cursor:pointer">
        <sn-icon icon="upload" style="--icon-size:20px"></sn-icon>اختار الملف
        <input
          type="file"
          style="display:none"
          @change=${async (e: any) => {
            const file: File | undefined = e.target.files?.[0];
            if (!file) return;
            try {
              await c.hass.callWS({ type: "smartnest/issuer/setup", pem: await file.text() });
              c.toast("تمام ✓");
              c.closeSheet();
              window.setTimeout(open, 600);
            } catch {
              c.toast("هاد مش مفتاح SmartNest الصح");
            }
          }}
        />
      </label>
    </div>`,
  });
}

// ---- photos from a phone ----

/** A QR code the family scans to send photos to the frame. The link works for 15 minutes. */
export async function photoDropSheet(ctx: Ctx) {
  let link: { path: string; minutes: number };
  try {
    link = await ctx.hass.callWS({ type: "smartnest/photos/link" });
  } catch {
    return ctx.toast(ctx.t("error"));
  }
  const url = `${location.origin}${link.path}`;
  ctx.showSheet({
    title: ctx.t("photos_from_phone"),
    render: (c) => html`<div style="display:grid;gap:14px;justify-items:center;text-align:center">
      ${qrSvg(url, 220)}
      <span style="font-size:16px">${c.t("photos_scan", { n: link.minutes })}</span>
      <span class="muted" style="font-size:13px">${c.t("photos_wifi")}</span>
    </div>`,
  });
}
