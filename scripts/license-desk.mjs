#!/usr/bin/env node
// Your private license desk: issue, renew and track activation keys from a page in your browser.
//
//   npm run licenses
//
// Runs on this computer only (127.0.0.1), behind a one-time token in the address, and uses the private key in
// ~/.smartnest. Nothing here is published: the list of clients lives in ~/.smartnest/issued.json.
import { createServer } from "node:http";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { existsSync, readFileSync, writeFileSync, mkdirSync, renameSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { DIR, hasKey, issue, decode } from "./license-lib.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const STATIC = join(ROOT, "custom_components/smartnest/frontend/static");
const DB = join(DIR, "issued.json");
const PORT = Number(process.env.PORT) || 5199;
const TOKEN = randomBytes(18).toString("base64url");

const load = () => (existsSync(DB) ? JSON.parse(readFileSync(DB, "utf8")) : { houses: [] });
function save(db) {
  mkdirSync(DIR, { recursive: true, mode: 0o700 });
  writeFileSync(`${DB}.tmp`, JSON.stringify(db, null, 2), { mode: 0o600 });
  renameSync(`${DB}.tmp`, DB);
}

const HEX32 = /^[0-9a-f]{32}$/;

/** One record per key: who, which house, what plan, until when. */
function record(key, payload, extra = {}) {
  return {
    id: randomBytes(6).toString("hex"),
    key,
    install: payload.i,
    name: payload.n,
    plan: payload.p,
    trial: !!payload.tr,
    reseller: payload.r ?? "",
    issued: payload.t,
    expires: payload.x ?? null,
    phone: extra.phone ?? "",
    note: extra.note ?? "",
  };
}

const api = {
  "GET /api/state": () => ({ ready: hasKey(), houses: load().houses }),

  "POST /api/issue": (b) => {
    if (!HEX32.test(String(b.install ?? "").trim().toLowerCase())) throw new Error("رقم التركيب لازم يكون 32 حرف (من شاشة التفعيل عند الزبون)");
    if (!String(b.name ?? "").trim()) throw new Error("اكتب اسم البيت");
    const { key, payload } = issue({
      id: String(b.install).trim().toLowerCase(),
      name: String(b.name).trim(),
      plan: b.plan,
      days: b.days ? Number(b.days) : undefined,
      trial: !!b.trial,
      reseller: String(b.reseller ?? "").trim() || undefined,
    });
    const db = load();
    const rec = record(key, payload, { phone: String(b.phone ?? "").trim(), note: String(b.note ?? "").trim() });
    db.houses.unshift(rec);
    save(db);
    return rec;
  },

  // Same house and plan, a fresh period from today. The old key keeps working until its own expiry.
  "POST /api/renew": (b) => {
    const db = load();
    const old = db.houses.find((h) => h.id === b.id);
    if (!old) throw new Error("ما لقيت هالبيت");
    const { key, payload } = issue({ id: old.install, name: old.name, plan: b.plan ?? old.plan, days: b.days ? Number(b.days) : undefined, reseller: old.reseller || undefined });
    const rec = record(key, payload, { phone: old.phone, note: old.note });
    db.houses.unshift(rec);
    save(db);
    return rec;
  },

  "POST /api/import": (b) => {
    let payload;
    try {
      payload = decode(b.key);
    } catch {
      throw new Error("هاد مش مفتاح SmartNest من توقيعك");
    }
    const db = load();
    if (db.houses.some((h) => h.key === String(b.key).trim())) throw new Error("هالمفتاح موجود بالقائمة");
    const rec = record(String(b.key).trim(), payload, { phone: String(b.phone ?? "").trim() });
    db.houses.push(rec);
    save(db);
    return rec;
  },

  "POST /api/update": (b) => {
    const db = load();
    const h = db.houses.find((x) => x.id === b.id);
    if (!h) throw new Error("ما لقيت هالبيت");
    if (typeof b.phone === "string") h.phone = b.phone.trim();
    if (typeof b.note === "string") h.note = b.note.trim();
    save(db);
    return h;
  },

  "POST /api/remove": (b) => {
    const db = load();
    db.houses = db.houses.filter((x) => x.id !== b.id);
    save(db);
    return { ok: true };
  },
};

const okToken = (t) => {
  const a = Buffer.from(String(t ?? ""));
  const b = Buffer.from(TOKEN);
  return a.length === b.length && timingSafeEqual(a, b);
};

const TYPES = { ".svg": "image/svg+xml", ".ttf": "font/ttf" };

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  // Only this machine, and only pages that came from this server (no other site can call the API).
  if (!["127.0.0.1", "::1", "::ffff:127.0.0.1"].includes(req.socket.remoteAddress) || !/^(127\.0\.0\.1|localhost):\d+$/.test(req.headers.host ?? "")) {
    res.writeHead(403).end();
    return;
  }
  const send = (code, body, type = "application/json; charset=utf-8") => {
    res.writeHead(code, { "content-type": type, "cache-control": "no-store", "x-frame-options": "DENY", "referrer-policy": "no-referrer" });
    res.end(typeof body === "string" || Buffer.isBuffer(body) ? body : JSON.stringify(body));
  };
  if (url.pathname === "/" ) {
    if (!okToken(url.searchParams.get("t"))) return send(403, "افتح الرابط اللي طلع بالـ Terminal.", "text/plain; charset=utf-8");
    return send(200, PAGE.replace("__TOKEN__", TOKEN), "text/html; charset=utf-8");
  }
  if (url.pathname.startsWith("/static/")) {
    const rel = url.pathname.slice("/static/".length);
    if (!/^(logo\/[\w-]+\.svg|fonts\/Rubik-[\w-]+\.ttf)$/.test(rel)) return send(404, "");
    const ext = rel.slice(rel.lastIndexOf("."));
    return send(200, readFileSync(join(STATIC, rel)), TYPES[ext]);
  }
  const handler = api[`${req.method} ${url.pathname}`];
  if (!handler) return send(404, { error: "not found" });
  if (!okToken(req.headers["x-desk-token"])) return send(403, { error: "forbidden" });
  try {
    let body = {};
    if (req.method === "POST") {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
    }
    send(200, handler(body));
  } catch (err) {
    send(400, { error: err.message });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  const link = `http://127.0.0.1:${PORT}/?t=${TOKEN}`;
  console.log(`\n  SmartNest license desk\n  ${link}\n\n  Only on this computer. Ctrl+C to close.\n`);
  if (!hasKey()) console.log("  ⚠️  No signing key yet: run `node scripts/license.mjs init` first.\n");
  if (process.platform === "darwin" && !process.env.NO_OPEN) execFile("open", [link]);
});

const PAGE = /* html */ `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>SmartNest · التراخيص</title>
<link rel="icon" href="/static/logo/smartnest-symbol-color.svg" />
<style>
@font-face { font-family: Rubik; src: url(/static/fonts/Rubik-Regular.ttf); font-weight: 400; }
@font-face { font-family: Rubik; src: url(/static/fonts/Rubik-Medium.ttf); font-weight: 500; }
@font-face { font-family: Rubik; src: url(/static/fonts/Rubik-Bold.ttf); font-weight: 700; }
:root {
  --bg: #f6f1ea; --card: #ffffff; --soft: #f1ebe2; --text: #1d1d1f; --text2: #6e6e73; --line: #e7e0d6;
  --accent: #e9971d; --on-accent: #fff; --ok: #2bb673; --warn: #e9971d; --bad: #e5484d; --r: 18px;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
}
@media (prefers-color-scheme: dark) {
  :root { --bg: #121216; --card: #1c1c22; --soft: #26262e; --text: #f5f5f7; --text2: #a1a1aa; --line: #2e2e36; }
}
* { box-sizing: border-box; }
[hidden] { display: none !important; }
body { margin: 0; background: var(--bg); color: var(--text); font: 16px/1.5 Rubik, system-ui, sans-serif; }
.wrap { max-width: 1100px; margin: 0 auto; padding: 24px 16px 60px; display: grid; gap: 18px; }
header { display: flex; align-items: center; gap: 14px; }
header img { width: 48px; height: 48px; }
header h1 { margin: 0; font-size: 24px; }
header .sub { color: var(--text2); font-size: 14px; }
header .lock { margin-inline-start: auto; font-size: 13px; color: var(--text2); display: flex; gap: 6px; align-items: center; }
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
.stat { background: var(--card); border-radius: var(--r); padding: 16px; box-shadow: 0 1px 0 var(--line); }
.stat b { font-size: 28px; display: block; }
.stat span { color: var(--text2); font-size: 14px; }
.cols { display: grid; grid-template-columns: minmax(300px, 380px) 1fr; gap: 18px; align-items: start; }
@media (max-width: 860px) { .cols { grid-template-columns: 1fr; } }
.card { background: var(--card); border-radius: var(--r); padding: 18px; display: grid; gap: 12px; box-shadow: 0 1px 0 var(--line); }
.card h2 { margin: 0; font-size: 17px; }
label { display: grid; gap: 6px; font-size: 14px; color: var(--text2); }
input, select, textarea { font: inherit; font-size: 16px; color: var(--text); background: var(--soft); border: 1px solid transparent; border-radius: 12px; min-height: 44px; padding: 0 12px; width: 100%; outline: none; }
textarea { padding: 10px 12px; min-height: 70px; resize: vertical; }
input:focus, select:focus, textarea:focus { border-color: var(--accent); }
.ltr { direction: ltr; text-align: left; font-family: ui-monospace, Menlo, monospace; font-size: 14px; }
.seg { display: flex; background: var(--soft); border-radius: 12px; padding: 3px; gap: 3px; }
.seg button { flex: 1; border: 0; background: none; font: inherit; font-weight: 500; color: var(--text); border-radius: 10px; min-height: 38px; cursor: pointer; }
.seg button[aria-pressed="true"] { background: var(--card); box-shadow: 0 1px 3px rgba(0,0,0,.12); }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; border-radius: 999px; min-height: 44px; padding: 0 18px; font: inherit; font-weight: 600; cursor: pointer; background: var(--soft); color: var(--text); transition: transform 120ms var(--ease); text-decoration: none; }
.btn:active { transform: scale(0.96); }
.btn.primary { background: var(--accent); color: var(--on-accent); }
.btn.small { min-height: 34px; padding: 0 12px; font-size: 13px; }
.btn.danger { color: var(--bad); }
.row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.check { display: flex; align-items: center; gap: 8px; color: var(--text); }
.check input { width: 20px; min-height: 20px; }
.result { background: color-mix(in srgb, var(--accent) 12%, var(--card)); border: 1px solid var(--accent); border-radius: 14px; padding: 12px; display: grid; gap: 8px; animation: in 400ms var(--ease); }
.result code { word-break: break-all; font-size: 12px; direction: ltr; text-align: left; display: block; }
.err { color: var(--bad); font-size: 14px; min-height: 1em; }
.tools { display: flex; gap: 8px; flex-wrap: wrap; }
.tools input { flex: 1; min-width: 180px; }
.list { display: grid; gap: 10px; }
.house { background: var(--card); border-radius: var(--r); padding: 14px 16px; display: grid; gap: 8px; box-shadow: 0 1px 0 var(--line); animation: in 300ms var(--ease) both; }
.house .top { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.house .nm { font-weight: 700; font-size: 17px; flex: 1; min-width: 140px; }
.badge { font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 999px; }
.p-premium { background: #2a2118; color: #f5c46b; }
.p-pro { background: #e3efff; color: #1e5fbf; }
.p-basic { background: var(--soft); color: var(--text2); }
.st-ok { background: color-mix(in srgb, var(--ok) 16%, transparent); color: var(--ok); }
.st-soon { background: color-mix(in srgb, var(--warn) 18%, transparent); color: #b36b00; }
.st-bad { background: color-mix(in srgb, var(--bad) 16%, transparent); color: var(--bad); }
.meta { color: var(--text2); font-size: 13px; display: flex; gap: 14px; flex-wrap: wrap; }
.meta .ltr { font-size: 12px; }
.empty { color: var(--text2); text-align: center; padding: 30px; }
.toast { position: fixed; inset-inline: 0; bottom: 24px; margin: auto; width: max-content; background: var(--text); color: var(--bg); padding: 10px 18px; border-radius: 999px; font-weight: 500; opacity: 0; transform: translateY(10px); transition: all 300ms var(--ease); pointer-events: none; }
.toast.on { opacity: 1; transform: none; }
details summary { cursor: pointer; color: var(--text2); font-size: 14px; }
@keyframes in { from { opacity: 0; transform: translateY(6px); } }
@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
</style>
</head>
<body>
<div class="wrap">
  <header>
    <img src="/static/logo/smartnest-symbol-color.svg" alt="" />
    <div><h1>مكتب التراخيص</h1><div class="sub">بس إلك. المفتاح السري ما بيطلع من جهازك.</div></div>
    <span class="lock">🔒 127.0.0.1</span>
  </header>
  <div id="nokey" class="card" hidden><b>ما في مفتاح توقيع.</b><span>شغّل مرة وحدة: <code class="ltr">node scripts/license.mjs init</code></span></div>
  <div class="stats" id="stats"></div>
  <div class="cols">
    <form class="card" id="form" autocomplete="off">
      <h2>✨ مفتاح جديد</h2>
      <label>رقم التركيب (من شاشة التفعيل عند الزبون)
        <input name="install" class="ltr" placeholder="2a9291b812404fda9dabc988300cf5ce" required maxlength="40" />
      </label>
      <label>اسم البيت أو الزبون<input name="name" placeholder="بيت أبو محمد" required /></label>
      <label>واتساب الزبون (اختياري)<input name="phone" class="ltr" placeholder="972501234567" /></label>
      <div><label>الباقة</label>
        <div class="seg" id="plan">
          <button type="button" data-v="basic">Basic</button>
          <button type="button" data-v="pro">Pro</button>
          <button type="button" data-v="premium" aria-pressed="true">Premium</button>
        </div>
      </div>
      <div><label>المدة</label>
        <div class="seg" id="days">
          <button type="button" data-v="" aria-pressed="true">بدون انتهاء</button>
          <button type="button" data-v="30">شهر</button>
          <button type="button" data-v="365">سنة</button>
          <button type="button" data-v="custom">…</button>
        </div>
        <input name="customDays" type="number" min="1" placeholder="كم يوم" hidden style="margin-top:8px" />
      </div>
      <label class="check"><input type="checkbox" name="trial" /> تجربة 14 يوم (Premium)</label>
      <details><summary>أكثر</summary>
        <div style="display:grid;gap:10px;margin-top:10px">
          <label>عن طريق (موزّع)<input name="reseller" /></label>
          <label>ملاحظة<textarea name="note" placeholder="مثلاً: فيلا، 3 طوابق، Fully على تابلت الصالة"></textarea></label>
        </div>
      </details>
      <button class="btn primary" type="submit">اعمل المفتاح</button>
      <div class="err" id="err"></div>
      <div id="result"></div>
    </form>
    <div style="display:grid;gap:12px">
      <div class="tools">
        <input id="q" placeholder="🔍 دوّر باسم أو رقم أو ملاحظة" />
        <div class="seg" id="filter" style="flex:none">
          <button type="button" data-v="all" aria-pressed="true">الكل</button>
          <button type="button" data-v="soon">قرّبت</button>
          <button type="button" data-v="expired">خلصت</button>
        </div>
      </div>
      <div class="list" id="list"></div>
      <details class="card"><summary>أضف مفتاح قديم للقائمة</summary>
        <form id="import" style="display:grid;gap:10px;margin-top:10px">
          <textarea name="key" class="ltr" placeholder="SN1...." required></textarea>
          <button class="btn" type="submit">أضف</button>
        </form>
      </details>
    </div>
  </div>
</div>
<div class="toast" id="toast"></div>
<script>
const TOKEN = "__TOKEN__";
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
let houses = [];
const call = async (path, body) => {
  const r = await fetch(path, { method: body ? "POST" : "GET", headers: { "x-desk-token": TOKEN, "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error || "خطأ");
  return j;
};
const toast = (m) => { const t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("on"), 2200); };
const seg = (id) => { const el = $(id); el.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; el.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b)); el.dispatchEvent(new Event("change")); }); return () => el.querySelector('[aria-pressed="true"]').dataset.v; };
const plan = seg("#plan"), days = seg("#days"), filter = seg("#filter");
$("#days").addEventListener("change", () => { $('[name="customDays"]').hidden = days() !== "custom"; });
$("#filter").addEventListener("change", render);
$("#q").addEventListener("input", render);

const fmt = (t) => new Date(t * 1000).toLocaleDateString("ar-u-nu-latn", { day: "numeric", month: "short", year: "numeric" });
function status(h) {
  if (!h.expires) return ["st-ok", "بدون انتهاء"];
  const d = Math.ceil((h.expires * 1000 - Date.now()) / 86400000);
  if (d < 0) return ["st-bad", "خلص من " + -d + " يوم"];
  if (d <= 30) return ["st-soon", "باقي " + d + " يوم"];
  return ["st-ok", "لحد " + fmt(h.expires)];
}
const msg = (h) => [
  "مرحبا " + h.name + " 👋",
  "هاد مفتاح تفعيل SmartNest لبيتك:",
  "",
  h.key,
  "",
  "افتح SmartNest بـ Home Assistant، الصق المفتاح، واضغط تفعيل.",
].join("\\n");
const wa = (h) => "https://wa.me/" + String(h.phone || "").replace(/\\D/g, "") + "?text=" + encodeURIComponent(msg(h));
async function copy(text) { try { await navigator.clipboard.writeText(text); toast("انسخ ✓"); } catch { prompt("انسخ:", text); } }

function latest() {
  // One card per house: its newest key (older keys of the same house are history).
  const seen = new Map();
  for (const h of houses) { const k = h.install; if (!seen.has(k) || seen.get(k).issued < h.issued) seen.set(k, h); }
  return [...seen.values()].sort((a, b) => b.issued - a.issued);
}

function renderStats() {
  const l = latest();
  const soon = l.filter((h) => h.expires && h.expires * 1000 > Date.now() && h.expires * 1000 - Date.now() < 30 * 86400000).length;
  const by = (p) => l.filter((h) => h.plan === p && !h.trial).length;
  $("#stats").innerHTML = [
    ["🏠", l.length, "بيت"],
    ["⭐", by("premium"), "Premium"],
    ["💎", by("pro"), "Pro"],
    ["🔹", by("basic"), "Basic"],
    ["⏳", soon, "قرّبوا يخلصوا"],
  ].map(([i, n, t]) => '<div class="stat"><b>' + i + " " + n + "</b><span>" + t + "</span></div>").join("");
}

function render() {
  renderStats();
  const q = $("#q").value.trim().toLowerCase();
  const f = filter();
  const l = latest().filter((h) => {
    if (q && ![h.name, h.install, h.note, h.phone, h.reseller].join(" ").toLowerCase().includes(q)) return false;
    const exp = h.expires ? h.expires * 1000 - Date.now() : Infinity;
    if (f === "soon") return exp > 0 && exp < 30 * 86400000;
    if (f === "expired") return exp < 0;
    return true;
  });
  $("#list").innerHTML = l.length ? l.map((h) => {
    const [cls, txt] = status(h);
    const older = houses.filter((x) => x.install === h.install && x.id !== h.id).length;
    return '<div class="house" data-id="' + h.id + '">' +
      '<div class="top"><span class="nm">' + esc(h.name) + '</span>' +
      '<span class="badge p-' + h.plan + '">' + h.plan + (h.trial ? " · تجربة" : "") + '</span>' +
      '<span class="badge ' + cls + '">' + txt + "</span></div>" +
      '<div class="meta"><span class="ltr">' + esc(h.install) + "</span><span>انعمل " + fmt(h.issued) + "</span>" +
      (h.reseller ? "<span>عن طريق " + esc(h.reseller) + "</span>" : "") + (older ? "<span>" + older + " مفاتيح قبل</span>" : "") + "</div>" +
      (h.note ? '<div class="meta">📝 ' + esc(h.note) + "</div>" : "") +
      '<div class="row">' +
      '<button class="btn small" data-a="copy">نسخ المفتاح</button>' +
      (h.phone ? '<a class="btn small" target="_blank" rel="noopener" href="' + wa(h) + '">واتساب</a>' : '<button class="btn small" data-a="phone">+ واتساب</button>') +
      '<button class="btn small" data-a="renew">جدّد سنة</button>' +
      '<select class="btn small" data-a="plan" style="width:auto;min-height:34px"><option value="">غيّر الباقة…</option>' +
      ["basic", "pro", "premium"].filter((p) => p !== h.plan).map((p) => '<option value="' + p + '">' + p + "</option>").join("") + "</select>" +
      '<button class="btn small danger" data-a="remove">شيل</button></div></div>';
  }).join("") : '<div class="empty">' + (houses.length ? "ما في نتايج" : "لسا ما عملت مفاتيح. أول مفتاح من الفورم.") + "</div>";
}

$("#list").addEventListener("click", async (e) => {
  const b = e.target.closest("[data-a]"); if (!b || b.tagName === "SELECT") return;
  const h = houses.find((x) => x.id === b.closest(".house").dataset.id);
  try {
    if (b.dataset.a === "copy") return copy(h.key);
    if (b.dataset.a === "phone") { const p = prompt("رقم واتساب الزبون (مع مفتاح الدولة)", ""); if (!p) return; await call("/api/update", { id: h.id, phone: p }); }
    if (b.dataset.a === "renew") { if (!confirm("مفتاح جديد لـ " + h.name + " لمدة سنة من اليوم؟")) return; const r = await call("/api/renew", { id: h.id, days: 365 }); copy(r.key); }
    if (b.dataset.a === "remove") { if (!confirm("تشيل " + h.name + " من القائمة؟ (المفتاح نفسه بيضل شغّال)")) return; for (const x of houses.filter((x) => x.install === h.install)) await call("/api/remove", { id: x.id }); }
    await refresh();
  } catch (err) { toast(err.message); }
});
$("#list").addEventListener("change", async (e) => {
  const s = e.target.closest('[data-a="plan"]'); if (!s || !s.value) return;
  const h = houses.find((x) => x.id === s.closest(".house").dataset.id);
  if (!confirm("مفتاح جديد لـ " + h.name + " بباقة " + s.value + "؟ (نفس المدة الباقية)")) { s.value = ""; return; }
  try {
    const left = h.expires ? Math.max(1, Math.ceil((h.expires * 1000 - Date.now()) / 86400000)) : undefined;
    const r = await call("/api/renew", { id: h.id, plan: s.value, days: left });
    copy(r.key); await refresh();
  } catch (err) { toast(err.message); }
});

$("#form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const d = days();
  $("#err").textContent = "";
  try {
    const rec = await call("/api/issue", {
      install: f.get("install"), name: f.get("name"), phone: f.get("phone"), plan: plan(), trial: !!f.get("trial"),
      days: d === "custom" ? f.get("customDays") : d, reseller: f.get("reseller"), note: f.get("note"),
    });
    $("#result").innerHTML = '<div class="result"><b>✓ ' + esc(rec.name) + " · " + rec.plan + "</b><code>" + esc(rec.key) + '</code><div class="row">' +
      '<button class="btn small primary" type="button" id="cp">نسخ</button>' +
      (rec.phone ? '<a class="btn small" target="_blank" rel="noopener" href="' + wa(rec) + '">ابعت عالواتساب</a>' : "") + "</div></div>";
    $("#cp").onclick = () => copy(rec.key);
    copy(rec.key);
    e.target.reset(); $('[name="customDays"]').hidden = true;
    $('#plan [data-v="premium"]').click(); $('#days [data-v=""]').click();
    await refresh();
  } catch (err) { $("#err").textContent = err.message; }
});

$("#import").addEventListener("submit", async (e) => {
  e.preventDefault();
  try { await call("/api/import", { key: new FormData(e.target).get("key") }); e.target.reset(); toast("انضاف ✓"); await refresh(); }
  catch (err) { toast(err.message); }
});

async function refresh() { const s = await call("/api/state"); $("#nokey").hidden = s.ready; houses = s.houses; render(); }
refresh();
</script>
</body>
</html>`;
