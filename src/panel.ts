import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { keyed } from "lit/directives/keyed.js";
import type { Ctx, SheetSpec } from "./ctx";
import type { DashboardConfig, Hass, Lang, PanelInfo } from "./types";
import { defaultConfig, loadConfig, normalizeConfig, saveConfig, subscribeConfig } from "./config";
import { isRtl, translator } from "./i18n";
import { fontFaceCss, shared, themeVars } from "./theme";
import { addPageSheet, addWidgetSheet, pageSettingsSheet, settingsSheet } from "./editors";
import "./ui/icon";
import "./ui/sheet-host";
import "./grid";
import "./detail";
import "./doorbell";
import "./screensaver";
import "./weather-bg";
import "./cinematic";
import "./morning";
import { markMorningShown, morningDue } from "./morning";
import "./ui/pinpad";
import { applyChrome, guardNavigation, hashPin, readKiosk, writeKiosk } from "./kiosk";
import { playSound, setBrightness, setMotionWake, setScreen, thisTablet } from "./fully";
import { buildChips, chipSheet } from "./chips";

declare const __SN_VERSION__: string;
export const VERSION = typeof __SN_VERSION__ === "string" ? __SN_VERSION__ : "dev";

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};

function inWindow(now: Date, from: string, to: string) {
  const n = now.getHours() * 60 + now.getMinutes();
  const a = toMinutes(from);
  const b = toMinutes(to);
  return a <= b ? n >= a && n < b : n >= a || n < b; // overnight windows wrap past midnight
}

const pickLang = (hassLang: string | undefined): Lang => {
  const l = (hassLang ?? "").slice(0, 2);
  return l === "en" || l === "he" ? l : "ar";
};

@customElement("smartnest-panel")
export class SmartNestPanel extends LitElement {
  @property({ attribute: false }) hass!: Hass;
  @property({ type: Boolean, reflect: true }) narrow = false;
  @property({ attribute: false }) panel?: PanelInfo;
  @property({ attribute: false }) route?: unknown;

  @state() private config?: DashboardConfig;
  @state() private draft?: DashboardConfig;
  @state() private pageId = "";
  @state() private sheets: SheetSpec[] = [];
  @state() private toastMsg = "";
  @state() private ringingAt?: Date;
  @state() private sleeping = false;
  @state() private saving = false;
  @state() private loadError = "";
  @state() private now = new Date();
  @state() private systemDark = matchMedia("(prefers-color-scheme: dark)").matches;
  @state() private wide = window.innerWidth >= 768;
  @state() private kiosk = readKiosk();

  private initStarted = false;
  private unsub?: Promise<() => void>;
  private lastActive = Date.now();
  private ticker?: number;
  private toastTimer?: number;
  private bellSeen?: string;
  @state() private silentBell = false;
  @state() private scene?: string;
  @state() private morning = false;
  // Fully Kiosk: what we last told the tablet, so we act on changes instead of fighting manual tweaks.
  private nightApplied?: boolean;
  private screenOffSent = false;
  private screenSeen?: string;
  private mql = matchMedia("(prefers-color-scheme: dark)");

  static styles = [
    shared,
    css`
      :host {
        display: block;
        height: 100%;
        min-height: 100vh;
        background: var(--bg);
        color: var(--text);
        transition: background-color 600ms var(--ease-out), color 600ms var(--ease-out);
      }
      .app {
        position: relative;
        min-height: 100vh;
        background: radial-gradient(900px 600px at 0% 0%, var(--bg-glow), transparent 70%),
          radial-gradient(700px 500px at 100% 100%, var(--bg-glow), transparent 70%);
      }
      header {
        position: sticky;
        top: 0;
        z-index: 20;
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 12px 20px;
        padding-top: max(12px, env(safe-area-inset-top));
        border-width: 0 0 1px 0;
        border-radius: 0;
        flex-wrap: wrap;
      }
      .home {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 20px;
        font-weight: 700;
        white-space: nowrap;
        min-width: 0;
      }
      .home span {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .home img {
        width: 28px;
        height: 28px;
        flex: none;
      }
      .chips {
        order: 5;
        flex-basis: 100%;
        display: flex;
        gap: 8px;
        overflow-x: auto;
        scrollbar-width: none;
        margin: 2px -4px -2px;
        padding: 2px 4px;
      }
      .chips::-webkit-scrollbar {
        display: none;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        min-height: 34px;
        padding: 0 14px 0 10px;
        border-radius: 999px;
        background: var(--surface-2);
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        unicode-bidi: plaintext;
        --icon-size: 18px;
        animation: chip-in 420ms var(--spring) both;
      }
      .chip sn-icon {
        color: var(--accent-text);
      }
      .chip.cool sn-icon {
        color: var(--cool);
      }
      .chip.alert {
        background: color-mix(in srgb, var(--alert) 18%, transparent);
        color: var(--alert-text);
      }
      .chip.alert sn-icon {
        color: var(--alert-text);
      }
      .chip.neutral sn-icon {
        color: var(--text-2);
      }
      @keyframes chip-in {
        from {
          opacity: 0;
          transform: scale(0.85);
        }
      }
      nav {
        flex: 1;
        display: flex;
        justify-content: center;
        min-width: 0;
      }
      nav .seg > button {
        min-height: 40px;
        padding: 0 16px;
        font-size: 15px;
      }
      nav .seg > button[aria-pressed="true"] {
        color: var(--text);
      }
      nav .seg > button[aria-pressed="true"] sn-icon {
        color: var(--accent-text);
      }
      .actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      :host([narrow]) header,
      .compact header {
        padding-inline: 14px;
        gap: 10px;
      }
      .compact .home {
        flex: 1;
        font-size: 18px;
      }
      .compact nav {
        order: 3;
        flex-basis: 100%;
        justify-content: flex-start;
      }
      .compact nav .seg {
        width: 100%;
      }
      main {
        position: relative;
        z-index: 1; /* above the weather layer */
        padding: 20px;
        padding-bottom: 120px;
        max-width: 1600px;
        margin: 0 auto;
        animation: page-in 420ms var(--ease-out);
      }
      .compact main {
        padding: 14px;
        padding-bottom: 120px;
      }
      @keyframes page-in {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
      }
      .dock {
        position: fixed;
        bottom: max(20px, env(safe-area-inset-bottom));
        left: 50%;
        transform: translateX(-50%);
        z-index: 30;
        display: flex;
        gap: 6px;
        padding: 6px;
        border-radius: 999px;
        animation: dock-in 520ms var(--spring);
        max-width: calc(100vw - 24px);
        overflow-x: auto;
        scrollbar-width: none;
      }
      @keyframes dock-in {
        from {
          transform: translate(-50%, 40px);
          opacity: 0;
        }
      }
      .toast {
        position: fixed;
        bottom: 96px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 90;
        padding: 12px 18px;
        border-radius: 999px;
        background: var(--text);
        color: var(--bg);
        font-weight: 500;
        box-shadow: var(--shadow-lift);
        animation: dock-in 420ms var(--spring);
        max-width: calc(100vw - 32px);
        text-align: center;
      }
      .center {
        min-height: 70vh;
        display: grid;
        place-items: center;
        text-align: center;
        color: var(--text-2);
        gap: 12px;
      }
      .center img {
        width: 64px;
        height: 64px;
        animation: breathe 1.6s var(--ease-out) infinite alternate;
      }
      @keyframes breathe {
        to {
          transform: scale(1.06);
          opacity: 0.7;
        }
      }
    `,
  ];

  // ---- lifecycle ----

  connectedCallback() {
    super.connectedCallback();
    this.setKiosk(this.kiosk);
    window.addEventListener("pointerdown", this.onActivity, { capture: true, passive: true });
    window.addEventListener("keydown", this.onActivity, { capture: true });
    window.addEventListener("resize", this.onResize);
    this.mql.addEventListener("change", this.onScheme);
    this.ticker = window.setInterval(() => this.tick(), 10_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("pointerdown", this.onActivity, { capture: true });
    window.removeEventListener("keydown", this.onActivity, { capture: true });
    window.removeEventListener("resize", this.onResize);
    this.mql.removeEventListener("change", this.onScheme);
    window.clearInterval(this.ticker);
    this.unsub?.then((u) => u()).catch(() => undefined);
    this.unsub = undefined;
    this.initStarted = false;
  }

  private onActivity = () => {
    this.lastActive = Date.now();
    this.screenOffSent = false;
  };
  private onResize = () => {
    this.wide = window.innerWidth >= 768;
  };
  private onScheme = (e: MediaQueryListEvent) => {
    this.systemDark = e.matches;
  };

  private tick() {
    this.now = new Date();
    const s = this.config?.settings.screensaver;
    if (s?.enabled && this.wide && !this.draft && !this.sheets.length && !this.ringingAt && !this.sleeping)
      if (Date.now() - this.lastActive > s.timeout_min * 60_000) this.sleeping = true;
    this.fullyTick();
    this.checkMorning();
  }

  /** The morning card shows on the first touch of the day, never on an empty room. */
  private checkMorning() {
    if (this.morning || this.sleeping || this.ringingAt || !this.config || !this.hass) return;
    if (Date.now() - this.lastActive > 15_000) return;
    if (!morningDue(this.makeCtx(), new Date())) return;
    markMorningShown();
    this.morning = true;
  }

  /** Night dimming, screen off after idle, and camera wake, on the wall tablet only. */
  private fullyTick() {
    const cfg = this.config?.settings;
    const tab = this.hass && cfg ? thisTablet(this.hass) : undefined;
    if (!tab || !cfg) return;
    const f = cfg.fully;
    const fail = () => undefined;
    setMotionWake(this.hass, tab, f.motion_wake).catch(fail);
    const night = f.night_dim && inWindow(this.now, cfg.dark_from, cfg.dark_to);
    if (night !== this.nightApplied && !this.ringingAt) {
      this.nightApplied = night;
      setBrightness(this.hass, tab, night ? f.night_brightness : 100).catch(fail);
    }
    if (night && f.night_off_min > 0 && !this.screenOffSent && !this.ringingAt && Date.now() - this.lastActive > f.night_off_min * 60_000) {
      this.screenOffSent = true;
      setScreen(this.hass, tab, false).catch(fail);
    }
  }

  /** The screen came back on (camera motion, power button): treat it as activity so it isn't switched straight off. */
  private watchScreen() {
    const tab = thisTablet(this.hass);
    const state = tab?.screen ? this.hass.states[tab.screen]?.state : undefined;
    if (state === "on" && this.screenSeen === "off") this.onActivity();
    this.screenSeen = state;
  }

  private get assetBase() {
    return this.panel?.config?.asset_base ?? "/smartnest_static/static/";
  }

  private async init() {
    this.initStarted = true;
    if (!document.getElementById("smartnest-fonts")) {
      const style = document.createElement("style");
      style.id = "smartnest-fonts";
      style.textContent = fontFaceCss(this.assetBase);
      document.head.appendChild(style);
    }
    const lang = pickLang(this.hass.language);
    try {
      const raw = await loadConfig(this.hass);
      if (raw) this.config = normalizeConfig(raw, lang);
      else {
        this.config = defaultConfig(this.hass, translator(lang), lang);
        if (this.hass.user?.is_admin) saveConfig(this.hass, this.config).catch(() => undefined);
      }
      this.pageId = this.config.settings.default_page || this.config.pages[0]?.id || "";
      this.unsub = subscribeConfig(this.hass, (cfg) => {
        // Another screen saved. Take it, unless we're mid-edit here.
        if (!this.draft && cfg) this.config = normalizeConfig(cfg, lang);
      });
    } catch (err) {
      this.loadError = String((err as any)?.message ?? err);
    }
  }

  protected willUpdate(changed: Map<string, unknown>) {
    if (changed.has("hass") && this.hass && !this.initStarted) this.init();
    if (changed.has("hass")) {
      this.watchDoorbell();
      this.watchScreen();
    }
    // PIN removed from another screen: a lock nobody can open must not stay on.
    if (changed.has("config") && this.kiosk && this.config && !this.config.settings.kiosk.pin_hash) this.setKiosk(false);
  }

  // ---- kiosk ----

  private get panelPath() {
    return ((this.route as any)?.prefix as string | undefined) ?? location.pathname;
  }

  private setKiosk(on: boolean) {
    this.kiosk = on;
    writeKiosk(on);
    applyChrome(on);
    guardNavigation(on, this.panelPath);
  }

  private unlockSheet() {
    const t = translator(this.uiLang);
    const k = this.config?.settings.kiosk;
    if (!k?.pin_hash || !k.pin_salt) return this.setKiosk(false);
    this.pushSheet({
      title: t("kiosk_unlock"),
      render: (c) => html`<sn-pinpad
        .length=${k.pin_length ?? 4}
        prompt=${c.t("enter_pin")}
        error=${c.t("wrong_pin")}
        .onSubmit=${(pin: string) => {
          if (hashPin(pin, k.pin_salt!) !== k.pin_hash) return false;
          this.setKiosk(false);
          c.closeSheet();
          return true;
        }}
      ></sn-pinpad>`,
    });
  }

  /** Rings when the doorbell's event entity gets a new timestamp, or its binary sensor turns on. */
  private watchDoorbell() {
    const id = this.config?.settings.doorbell.trigger_entity;
    const e = id ? this.hass.states[id] : undefined;
    if (!e) {
      this.bellSeen = undefined;
      return;
    }
    const key = id!.startsWith("event.") ? e.state : `${e.state}|${e.last_changed}`;
    const prev = this.bellSeen;
    this.bellSeen = key;
    if (prev === undefined || prev === key) return;
    if (id!.startsWith("event.") ? e.state !== "unavailable" && e.state !== "unknown" : e.state === "on") this.ring();
  }

  private ring() {
    this.sleeping = false;
    this.onActivity();
    this.silentBell = false;
    const tab = thisTablet(this.hass);
    if (tab) {
      // Wake the wall tablet at full brightness and ring through its own speaker.
      const fail = () => undefined;
      setScreen(this.hass, tab, true).catch(fail);
      setBrightness(this.hass, tab, 100).catch(fail);
      this.nightApplied = undefined; // re-apply night dimming once the popup is gone
      if (tab.media) {
        this.silentBell = true;
        playSound(this.hass, tab, this.hass.hassUrl(`${this.assetBase}sounds/chime.wav`)).catch(() => (this.silentBell = false));
      }
    }
    this.ringingAt = new Date();
    const at = this.ringingAt;
    window.setTimeout(() => this.ringingAt === at && (this.ringingAt = undefined), 90_000);
  }

  // ---- editing ----

  private startEdit() {
    this.draft = structuredClone(this.config!);
  }

  private cancelEdit() {
    const t = translator(this.uiLang);
    if (JSON.stringify(this.draft) !== JSON.stringify(this.config) && !confirm(t("discard_changes"))) return;
    this.draft = undefined;
    this.sheets = [];
    if (!this.config!.pages.some((p) => p.id === this.pageId)) this.pageId = this.config!.pages[0]?.id ?? "";
  }

  private async save() {
    const t = translator(this.uiLang);
    this.saving = true;
    try {
      await saveConfig(this.hass, this.draft!);
      this.config = this.draft;
      this.draft = undefined;
      this.sheets = [];
      this.toast(t("saved"));
    } catch {
      this.toast(t("save_failed"));
    } finally {
      this.saving = false;
    }
  }

  private toast(msg: string) {
    this.toastMsg = msg;
    window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => (this.toastMsg = ""), 3200);
  }

  // ---- derived ----

  private get current(): DashboardConfig | undefined {
    return this.draft ?? this.config;
  }

  private get uiLang(): Lang {
    return this.current?.settings.language ?? pickLang(this.hass?.language);
  }

  private get dark(): boolean {
    const s = this.current?.settings;
    if (!s) return this.systemDark;
    if (s.theme === "dark") return true;
    if (s.theme === "light") return false;
    if (s.theme === "auto") return this.systemDark;
    return inWindow(this.now, s.dark_from, s.dark_to);
  }

  private makeCtx(): Ctx {
    const lang = this.uiLang;
    return {
      hass: this.hass,
      config: this.current!,
      lang,
      rtl: isRtl(lang),
      t: translator(lang),
      dark: this.dark,
      narrow: !this.wide,
      isAdmin: !!this.hass.user?.is_admin,
      editing: !!this.draft,
      assetBase: this.assetBase,
      update: (fn) => {
        if (!this.draft) return;
        const next = structuredClone(this.draft);
        fn(next);
        this.draft = next;
      },
      openEntity: (entityId) =>
        this.pushSheet({
          title: this.current!.names[entityId] || this.hass.states[entityId]?.attributes.friendly_name || entityId,
          render: (c) => html`<sn-entity-detail .ctx=${c} .entityId=${entityId}></sn-entity-detail>`,
        }),
      showSheet: (spec) => this.pushSheet(spec),
      closeSheet: () => (this.sheets = this.sheets.slice(0, -1)),
      toast: (m) => this.toast(m),
      cinematic: (mode) => {
        this.sleeping = false;
        this.scene = mode;
      },
    };
  }

  private pushSheet(spec: SheetSpec) {
    this.sheets = [...this.sheets, spec];
  }

  protected updated() {
    if (this.kiosk) applyChrome(true); // HA may not have drawn its sidebar yet when we first connected
    const vars = themeVars(this.dark, this.current?.settings.accent ?? "");
    for (const [k, v] of Object.entries(vars)) this.style.setProperty(k, v);
    this.setAttribute("dir", isRtl(this.uiLang) ? "rtl" : "ltr");
    this.setAttribute("lang", this.uiLang);
  }

  // ---- render ----

  private renderBar(ctx: Ctx) {
    const { t } = ctx;
    const cfg = ctx.config;
    const name = cfg.settings.home_name || (this.hass as any).config?.location_name || "SmartNest";
    return html`<header class="glass">
      ${this.narrow && !this.kiosk
        ? html`<button
            class="icon-btn pressable"
            aria-label="menu"
            @click=${() => this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true }))}
          >
            <sn-icon icon="grid"></sn-icon>
          </button>`
        : nothing}
      <div class="home">
        <img src="${this.assetBase}logo/smartnest-symbol-${ctx.dark ? "white" : "color"}.svg" alt="" />
        <span>${name}</span>
      </div>
      <nav>
        <div class="seg" role="tablist">
          ${cfg.pages.map(
            (p) => html`<button
              role="tab"
              aria-pressed=${p.id === this.pageId}
              aria-selected=${p.id === this.pageId}
              @click=${() => {
                if (p.id === this.pageId && ctx.editing) return pageSettingsSheet(ctx, p.id, () => (this.pageId = this.current!.pages[0]?.id ?? ""));
                this.pageId = p.id;
              }}
            >
              <sn-icon .icon=${p.icon} style="--icon-size:18px"></sn-icon>${p.title}
            </button>`
          )}
        </div>
      </nav>
      <div class="actions">
        ${this.kiosk
          ? html`<button class="icon-btn primary pressable" aria-label=${t("kiosk_unlock")} title=${t("kiosk_unlock")} @click=${() => this.unlockSheet()}>
              <sn-icon icon="lock" style="--icon-size:20px"></sn-icon>
            </button>`
          : !ctx.editing && ctx.config.settings.kiosk.pin_hash
          ? html`<button class="icon-btn pressable" aria-label=${t("kiosk_lock")} title=${t("kiosk_lock")} @click=${() => this.setKiosk(true)}>
              <sn-icon icon="lock-open" style="--icon-size:20px"></sn-icon>
            </button>`
          : nothing}
        ${this.kiosk
          ? nothing
          : ctx.editing
          ? html`<button class="btn pressable" @click=${() => this.cancelEdit()}>${t("cancel")}</button>
              <button class="btn primary pressable" ?disabled=${this.saving} @click=${() => this.save()}>
                ${this.saving ? t("saving") : t("save")}
              </button>`
          : ctx.isAdmin
          ? html`<button class="icon-btn pressable" aria-label=${t("edit")} title=${t("edit")} @click=${() => this.startEdit()}>
              <sn-icon icon="pencil" style="--icon-size:20px"></sn-icon>
            </button>`
          : nothing}
      </div>
      ${ctx.editing ? nothing : this.renderChips(ctx)}
    </header>`;
  }

  private renderChips(ctx: Ctx) {
    const chips = buildChips(ctx);
    if (!chips.length) return nothing;
    return html`<div class="chips" role="list">
      ${chips.map(
        (c) => html`<button class="chip pressable ${c.tone}" role="listitem" @click=${() => (c.entities.length ? chipSheet(ctx, c.type) : undefined)}>
          <sn-icon .icon=${c.icon}></sn-icon>${c.label}
        </button>`
      )}
    </div>`;
  }

  private renderWeather(ctx: Ctx) {
    const w = ctx.config.settings.weather;
    const e = w.background && w.entity ? this.hass.states[w.entity] : undefined;
    if (!e) return nothing;
    const sun = this.hass.states["sun.sun"]?.state;
    const night = e.state === "clear-night" || (sun ? sun === "below_horizon" : inWindow(this.now, ctx.config.settings.dark_from, ctx.config.settings.dark_to));
    return html`<sn-weather-bg .condition=${e.state} ?night=${night} ?dark=${ctx.dark}></sn-weather-bg>`;
  }

  private renderDock(ctx: Ctx) {
    const { t } = ctx;
    return html`<div class="dock glass">
      <button class="btn primary pressable" @click=${() => addWidgetSheet(ctx, this.pageId)}>
        <sn-icon icon="plus" style="--icon-size:20px"></sn-icon>${t("add_widget")}
      </button>
      <button class="btn pressable" @click=${() => pageSettingsSheet(ctx, this.pageId, () => (this.pageId = this.current!.pages[0]?.id ?? ""))}>
        <sn-icon icon="pencil" style="--icon-size:20px"></sn-icon>${t("page_settings")}
      </button>
      <button class="btn pressable" @click=${() => addPageSheet(ctx, (id) => (this.pageId = id))}>
        <sn-icon icon="dashboard" style="--icon-size:20px"></sn-icon>${t("add_page")}
      </button>
      <button class="icon-btn pressable" aria-label=${t("settings")} @click=${() => settingsSheet(ctx, { version: VERSION, testDoorbell: () => this.ring() })}>
        <sn-icon icon="cog" style="--icon-size:20px"></sn-icon>
      </button>
    </div>`;
  }

  render() {
    if (!this.hass) return nothing;
    if (!this.current) {
      const t = translator(this.uiLang);
      return html`<div class="center">
        <div style="display:grid;gap:12px;justify-items:center">
          <img src="${this.assetBase}logo/smartnest-symbol-${this.dark ? "white" : "color"}.svg" alt="SmartNest" />
          <span>${this.loadError ? `${t("error")}: ${this.loadError}` : t("loading")}</span>
        </div>
      </div>`;
    }
    const ctx = this.makeCtx();
    const page = ctx.config.pages.find((p) => p.id === this.pageId) ?? ctx.config.pages[0];
    return html`<div class="app ${ctx.narrow ? "compact" : ""}">
      ${this.renderWeather(ctx)} ${this.renderBar(ctx)}
      ${page ? keyed(page.id, html`<main><sn-page-grid .ctx=${ctx} .page=${page}></sn-page-grid></main>`) : nothing}
      ${ctx.editing ? this.renderDock(ctx) : nothing}
      <sn-sheet-host .ctx=${ctx} .sheets=${this.sheets}></sn-sheet-host>
      ${this.ringingAt
        ? html`<sn-doorbell .ctx=${ctx} .at=${this.ringingAt} .silent=${this.silentBell} .onDismiss=${() => (this.ringingAt = undefined)}></sn-doorbell>`
        : nothing}
      ${this.morning ? html`<sn-morning .ctx=${ctx} .onDone=${() => (this.morning = false)}></sn-morning>` : nothing}
      ${this.scene ? html`<sn-cinematic .ctx=${ctx} .mode=${this.scene} .onDone=${() => (this.scene = undefined)}></sn-cinematic>` : nothing}
      ${this.sleeping ? html`<sn-screensaver .ctx=${ctx} .onWake=${() => {
              this.sleeping = false;
              this.onActivity();
              this.checkMorning();
            }}></sn-screensaver>` : nothing}
      ${this.toastMsg ? html`<div class="toast" role="status">${this.toastMsg}</div>` : nothing}
    </div>`;
  }
}
