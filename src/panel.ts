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
import "./message";
import "./assistant";
import "./licenses-panel";
import { setVoice, voiceOn } from "./voice";
import "./overload";
import { TRAVEL, travelSheet, weatherRisk } from "./security";
import "./security";
import { installerSupport, supportSheet } from "./business";
import { readGuests, writeGuests } from "./guests";
import { rateSheet } from "./installer";
import "./installer";
import type { ScreenMessage } from "./message";
import { wallCameras } from "./camwall";
import { markMorningShown, morningDue } from "./morning";
import "./ui/pinpad";
import { applyChrome, guardNavigation, hashPin, readKiosk, writeKiosk } from "./kiosk";
import { playSound, setBrightness, setMotionWake, setScreen, thisTablet } from "./fully";
import { buildChips, chipSheet } from "./chips";
import { rolling } from "./ui/num";
import { allows, type Plan } from "./plans";

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
  /** Set when the integration refuses to work without an activation key. */
  @state() private license?: { instance_id: string; error?: string; busy?: boolean; expired?: boolean };
  @state() private lic: { licensee: string; plan: Plan; expires?: number; trial: boolean; reseller: string } = {
    licensee: "",
    plan: "premium",
    trial: false,
    reseller: "",
  };
  @state() private now = new Date();
  @state() private systemDark = matchMedia("(prefers-color-scheme: dark)").matches;
  @state() private wide = window.innerWidth >= 768;
  @state() private kiosk = readKiosk();
  @state() private kids = (() => {
    try {
      return localStorage.getItem("smartnest-kids") === "1";
    } catch {
      return false;
    }
  })();

  private initStarted = false;
  private unsub?: Promise<() => void>;
  private lastActive = Date.now();
  private ticker?: number;
  private toastTimer?: number;
  private bellSeen?: string;
  @state() private silentBell = false;
  @state() private scene?: string;
  @state() private morning = false;
  @state() private camwall = false;
  /** Watts while the house is over its power limit. */
  @state() private overload?: number;
  private overSince = 0;
  /** Alarm screen hidden for this trigger (it comes back on the next one). */
  private alarmHiddenAt?: string;
  /** Weather alert dismissed: condition + day. */
  @state() private wxDismissed = "";
  /** Hands-free voice on this screen. */
  @state() private voice = voiceOn();
  private overSnooze = 0;
  @state() private guests = readGuests();
  @state() private tvMode = (() => {
    try {
      return localStorage.getItem("smartnest-tv") === "1";
    } catch {
      return false;
    }
  })();
  @state() private message?: ScreenMessage;
  private unsubMsg?: Promise<() => void>;
  // Page changes slide in from the side they came from (+1 = the next page).
  private enterDir = 0;
  private swipe?: { x: number; y: number; t: number; id: number; active: boolean; dx: number };
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
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 999px;
        border: 2px solid transparent;
        background: var(--surface-2) center / cover;
        color: var(--text);
        font: 700 16px var(--font);
        cursor: pointer;
        transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms;
      }
      .avatar.on {
        border-color: var(--accent);
        transform: scale(1.08);
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
        touch-action: pan-y; /* vertical scroll stays native; horizontal drags become page swipes */
      }
      .compact main {
        padding: 14px;
        padding-bottom: 120px;
      }
      /* TV mode: read from the sofa. */
      .tv {
        zoom: 1.35;
      }
      /* Kids mode: bigger targets everywhere on the one page they get. */
      .kids main {
        font-size: 1.15em;
      }
      .kids .home span::after {
        content: " 🧸";
      }
      .tabbar {
        position: fixed;
        z-index: 25;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        gap: 2px;
        padding: 6px 8px max(8px, env(safe-area-inset-bottom));
        border-radius: 0;
        border-width: 1px 0 0 0;
        overflow-x: auto;
        scrollbar-width: none;
      }
      .tabbar::-webkit-scrollbar {
        display: none;
      }
      .tabbar button {
        flex: 1 0 64px;
        display: grid;
        justify-items: center;
        gap: 2px;
        padding: 6px 4px;
        border-radius: 12px;
        color: var(--text-2);
        font-size: 11px;
        font-weight: 500;
        --icon-size: 24px;
        transition: color var(--dur-fast) var(--ease-out);
      }
      .tabbar button span {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tabbar button.on {
        color: var(--accent-text);
      }
      .tabbar button:active sn-icon {
        transform: scale(0.88);
      }
      .tabbar sn-icon {
        transition: transform 120ms var(--ease-out);
      }
      .compact main {
        padding-bottom: calc(110px + env(safe-area-inset-bottom));
      }
      .compact .dock {
        bottom: calc(76px + env(safe-area-inset-bottom));
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
    this.unsubMsg?.then((u) => u()).catch(() => undefined);
    this.unsubMsg = undefined;
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
    this.checkOverload();
  }

  /** Over the limit for 20 seconds straight (a kettle blip doesn't count); then quiet for 10 minutes after "dismiss". */
  private checkOverload() {
    const s = this.config?.settings;
    const e = s?.power_limit && s.power_entity ? this.hass.states[s.power_entity] : undefined;
    const v = Number(e?.state);
    const w = e?.attributes.unit_of_measurement === "kW" ? v * 1000 : v;
    if (!e || Number.isNaN(w) || w <= s!.power_limit!) {
      this.overSince = 0;
      this.overload = undefined;
      return;
    }
    if (!this.overSince) this.overSince = Date.now();
    if (Date.now() - this.overSince >= 20_000 && Date.now() > this.overSnooze && this.makeCtx().allows("overload")) {
      this.overload = w;
      this.sleeping = false;
    }
  }

  /** The morning card shows on the first touch of the day, never on an empty room. */
  private checkMorning() {
    if (this.morning || this.sleeping || this.ringingAt || !this.config || !this.hass) return;
    if (Date.now() - this.lastActive > 15_000) return;
    const c = this.makeCtx();
    if (!c.allows("morning") || !morningDue(c, new Date())) return;
    markMorningShown();
    this.morning = true;
  }

  /** Night dimming, screen off after idle, and camera wake, on the wall tablet only. */
  private fullyTick() {
    const cfg = this.config?.settings;
    const tab = this.hass && cfg && allows(this.lic.plan, "fully") ? thisTablet(this.hass) : undefined;
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
        this.config.settings.setup_done = false; // first run: the wizard asks a few questions
        if (this.hass.user?.is_admin) saveConfig(this.hass, this.config).catch(() => undefined);
      }
      // A room tablet can open on its own page (set on that screen, in About).
      let here = "";
      try {
        here = localStorage.getItem("smartnest-home-page") ?? "";
      } catch {
        /* per-device */
      }
      this.pageId = (here && this.config.pages.some((p) => p.id === here) ? here : "") || this.config.settings.default_page || this.config.pages[0]?.id || "";
      if (!this.config.settings.setup_done && this.hass.user?.is_admin) window.setTimeout(() => this.openWizard(), 300);
      this.unsubMsg = this.hass.connection.subscribeMessage<{ message: ScreenMessage | null }>(
        (m) => {
          this.message = m.message ?? undefined;
          if (m.message) {
            // A message wakes the house: off the screensaver, and the wall tablet's screen back on.
            this.sleeping = false;
            this.onActivity();
            const tab = allows(this.lic.plan, "fully") ? thisTablet(this.hass) : undefined;
            if (tab) setScreen(this.hass, tab, true).catch(() => undefined);
          }
        },
        { type: "smartnest/message/subscribe" }
      );
      this.unsub = subscribeConfig(this.hass, (cfg) => {
        // Another screen saved. Take it, unless we're mid-edit here.
        if (!this.draft && cfg) this.config = normalizeConfig(cfg, lang);
      });
      this.hass
        .callWS<{ licensee: string; plan?: Plan; expires?: number; trial?: boolean; reseller?: string }>({ type: "smartnest/license/status" })
        .then(
          (r) => (this.lic = { licensee: r.licensee, plan: r.plan ?? "premium", expires: r.expires ?? undefined, trial: !!r.trial, reseller: r.reseller ?? "" }),
          () => undefined
        );
    } catch (err) {
      if ((err as any)?.code === "not_licensed") {
        const st = await this.hass.callWS<{ instance_id: string; expired?: boolean }>({ type: "smartnest/license/status" });
        this.license = { instance_id: st.instance_id, expired: st.expired };
        return;
      }
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

  private setKids(on: boolean) {
    this.kids = on;
    try {
      on ? localStorage.setItem("smartnest-kids", "1") : localStorage.removeItem("smartnest-kids");
    } catch {
      /* per-device only */
    }
    if (on && this.config?.settings.kids_page) this.pageId = this.config.settings.kids_page;
  }

  /** Asks for the screen PIN, then runs onOk. No PIN set: runs straight away. */
  private pinThen(onOk: () => void) {
    const t = translator(this.uiLang);
    const k = this.config?.settings.kiosk;
    if (!k?.pin_hash || !k.pin_salt) return onOk();
    this.pushSheet({
      title: t("kiosk_unlock"),
      render: (c) => html`<sn-pinpad
        .length=${k.pin_length ?? 4}
        prompt=${c.t("enter_pin")}
        error=${c.t("wrong_pin")}
        .onSubmit=${(pin: string) => {
          if (hashPin(pin, k.pin_salt!) !== k.pin_hash) return false;
          c.closeSheet();
          onOk();
          return true;
        }}
      ></sn-pinpad>`,
    });
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
      plan: this.lic.plan,
      allows: (f) => allows(this.lic.plan, f),
      update: (fn) => {
        if (!this.draft) return;
        const next = structuredClone(this.draft);
        fn(next);
        this.draft = next;
      },
      openEntity: (entityId, origin) =>
        this.pushSheet({
          origin,
          title: this.current!.names[entityId] || this.hass.states[entityId]?.attributes.friendly_name || entityId,
          render: (c) => html`<sn-entity-detail .ctx=${c} .entityId=${entityId}></sn-entity-detail>`,
        }),
      showSheet: (spec) => this.pushSheet(spec),
      closeSheet: () => (this.sheets = this.sheets.slice(0, -1)),
      toast: (m) => this.toast(m),
      cinematic: (mode) => {
        this.sleeping = false;
        if (allows(this.lic.plan, "cinematic")) this.scene = mode;
        if (mode === "cinema") {
          // The wall tablet dims too, so it doesn't glow during the film.
          const tab = allows(this.lic.plan, "fully") ? thisTablet(this.hass) : undefined;
          if (tab) setBrightness(this.hass, tab, 8).catch(() => undefined);
          this.nightApplied = undefined;
        }
      },
    };
  }

  private goToPage(id: string) {
    if (this.kids) return;
    const pages = this.current?.pages ?? [];
    const from = pages.findIndex((p) => p.id === this.pageId);
    const to = pages.findIndex((p) => p.id === id);
    if (to < 0 || id === this.pageId) return;
    this.enterDir = Math.sign(to - from);
    this.pageId = id;
  }

  /** The page a horizontal drag leads to. Forward is a drag toward the reading end: left in LTR, right in RTL. */
  private neighbour(dx: number): string | undefined {
    if (this.kids) return undefined;
    const pages = this.current?.pages ?? [];
    const i = pages.findIndex((p) => p.id === this.pageId);
    const forward = isRtl(this.uiLang) ? dx > 0 : dx < 0;
    return pages[i + (forward ? 1 : -1)]?.id;
  }

  private onSwipeDown = (e: PointerEvent) => {
    if (e.pointerType === "mouse" || this.draft || this.sheets.length) return;
    // Anything that drags sideways itself keeps the gesture: sliders, segmented controls, the colour wheel, scrollers.
    const owns = (e.composedPath() as Element[]).some(
      (el) => el instanceof HTMLElement && (el.dataset.noSwipe !== undefined || el.classList.contains("seg") || /^(SN-VSLIDER|SN-COLOR-WHEEL|INPUT)$/.test(el.tagName))
    );
    if (!owns) this.swipe = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId, active: false, dx: 0 };
  };

  private onSwipeMove = (e: PointerEvent) => {
    const s = this.swipe;
    if (!s || e.pointerId !== s.id) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    const main = e.currentTarget as HTMLElement;
    if (!s.active) {
      if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) {
        this.swipe = undefined; // it's a scroll
        return;
      }
      if (Math.abs(dx) < 14 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
      s.active = true;
      main.setPointerCapture(e.pointerId);
    }
    s.dx = dx;
    // Rubber-band at the first and last page.
    const pull = this.neighbour(dx) ? dx : dx * 0.3;
    main.style.transform = `translateX(${pull}px)`;
    main.style.opacity = String(1 - Math.min(Math.abs(pull) / 900, 0.3));
  };

  private onSwipeUp = (e: PointerEvent) => {
    const s = this.swipe;
    this.swipe = undefined;
    if (!s?.active) return;
    const main = e.currentTarget as HTMLElement;
    const target = this.neighbour(s.dx);
    const pull = target ? s.dx : s.dx * 0.3;
    const velocity = s.dx / Math.max(1, performance.now() - s.t);
    const reset = () => {
      main.style.transform = "";
      main.style.opacity = "";
    };
    if (target && (Math.abs(s.dx) > 90 || Math.abs(velocity) > 0.45)) {
      navigator.vibrate?.(6);
      main
        .animate([{ transform: `translateX(${pull}px)`, opacity: main.style.opacity || "1" }, { transform: `translateX(${Math.sign(s.dx) * main.offsetWidth * 0.35}px)`, opacity: 0 }], {
          duration: 160,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        })
        .finished.then(() => {
          reset();
          this.goToPage(target);
        });
    } else {
      reset();
      main.animate([{ transform: `translateX(${pull}px)` }, { transform: "none" }], { duration: 220, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
    }
  };

  private pushSheet(spec: SheetSpec) {
    this.sheets = [...this.sheets, spec];
  }

  private lastDark?: boolean;

  /** When night falls (or day breaks) on schedule, the change sweeps across instead of snapping. */
  private playThemeFlip(toDark: boolean) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const veil = document.createElement("div");
    veil.style.cssText = `position:fixed;inset:0;z-index:95;pointer-events:none;background:${
      toDark ? "radial-gradient(120% 90% at 50% 0%, rgba(150,90,170,.55), rgba(21,26,30,.85))" : "radial-gradient(120% 90% at 50% 100%, rgba(255,190,110,.6), rgba(250,247,242,.85))"
    }`;
    this.renderRoot.appendChild(veil);
    veil
      .animate([{ opacity: 0 }, { opacity: 1, offset: 0.35 }, { opacity: 0 }], { duration: 1600, easing: "cubic-bezier(0.77, 0, 0.175, 1)" })
      .finished.finally(() => veil.remove());
  }

  protected updated() {
    const dark = this.dark;
    if (this.lastDark !== undefined && dark !== this.lastDark && this.current) this.playThemeFlip(dark);
    this.lastDark = dark;
    if (this.enterDir) {
      // New page slides in from the side it lives on; 260ms ease-out, opacity + transform only.
      const main = this.renderRoot.querySelector("main");
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const from = (isRtl(this.uiLang) ? -1 : 1) * this.enterDir * 48;
      main?.animate([{ transform: reduce ? "none" : `translateX(${from}px)`, opacity: 0 }, { transform: "none", opacity: 1 }], {
        duration: reduce ? 160 : 260,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      });
      this.enterDir = 0;
    }
    if (this.kiosk) applyChrome(true); // HA may not have drawn its sidebar yet when we first connected
    const vars = themeVars(this.dark, this.current?.settings.accent ?? "");
    // Liquid glass: thinner, more refractive cards with a lit edge.
    const liquid = this.current?.settings.glass === "liquid" && allows(this.lic.plan, "liquid_glass");
    Object.assign(vars, {
      "--glass-blur": liquid ? "40px" : "24px",
      "--glass-sat": liquid ? "230%" : "170%",
      "--glass-edge": liquid
        ? this.dark
          ? "inset 0 1px 0 rgba(255,255,255,.18), inset 0 0 0 1px rgba(255,255,255,.07)"
          : "inset 0 1px 0 rgba(255,255,255,.9), inset 0 -1px 0 rgba(255,255,255,.35), inset 0 0 0 1px rgba(255,255,255,.45)"
        : "0 0 #0000",
      ...(liquid ? { "--surface": this.dark ? "rgba(42,51,59,.46)" : "rgba(255,255,255,.48)" } : {}),
    });
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
        <img
          src="${this.assetBase}logo/smartnest-symbol-${ctx.dark ? "white" : "color"}.svg"
          alt="SmartNest"
          role="button"
          tabindex="0"
          style="cursor:pointer"
          @click=${() => this.aboutSheet()}
        />
        <span>${name}</span>
      </div>
      ${ctx.narrow || this.kids
        ? nothing
        : html`<nav>
            <div class="seg" role="tablist">
              ${cfg.pages.filter((p) => !p.person || !ctx.allows("person_pages") || ctx.editing || p.id === this.pageId).map(
                (p) => html`<button role="tab" aria-pressed=${p.id === this.pageId} aria-selected=${p.id === this.pageId} @click=${() => this.tabClick(ctx, p.id)}>
                  <sn-icon .icon=${p.icon} style="--icon-size:18px"></sn-icon>${p.title}
                </button>`
              )}
            </div>
          </nav>`}
      <div class="actions">
        ${!this.kids && !ctx.editing && ctx.allows("person_pages")
          ? cfg.pages
              .filter((p) => p.person && this.hass.states[p.person])
              .map((p) => {
                const person = this.hass.states[p.person!];
                const pic = person.attributes.entity_picture as string | undefined;
                return html`<button
                  class="avatar pressable ${p.id === this.pageId ? "on" : ""}"
                  aria-label=${p.title}
                  title=${p.title}
                  style=${pic ? `background-image:url('${this.hass.hassUrl(pic)}')` : ""}
                  @click=${() => this.tabClick(ctx, p.id)}
                >
                  ${pic ? "" : (person.attributes.friendly_name ?? "?").slice(0, 1)}
                </button>`;
              })
          : nothing}
        ${this.kids
          ? html`<button class="icon-btn primary pressable" aria-label=${t("kids_mode")} title=${t("kids_mode")} @click=${() => this.pinThen(() => this.setKids(false))}>
              <sn-icon icon="child" style="--icon-size:22px"></sn-icon>
            </button>`
          : ctx.allows("kids") && !ctx.editing && ctx.config.settings.kids_page && ctx.config.pages.some((p) => p.id === ctx.config.settings.kids_page)
          ? html`<button class="icon-btn pressable" aria-label=${t("kids_mode")} title=${t("kids_mode")} @click=${() => this.setKids(true)}>
              <sn-icon icon="child" style="--icon-size:22px"></sn-icon>
            </button>`
          : nothing}
        ${!this.kids && ctx.allows("guests") && !ctx.editing && ctx.config.settings.guests.ssid
          ? html`<button
              class="icon-btn pressable ${this.guests ? "primary" : ""}"
              aria-label=${t("guests_mode")}
              title=${t("guests_mode")}
              @click=${() => {
                this.guests = !this.guests;
                writeGuests(this.guests);
              }}
            >
              <sn-icon icon="guests" style="--icon-size:20px"></sn-icon>
            </button>`
          : nothing}
        ${!this.kids && ctx.allows("travel") && !ctx.editing && this.hass.states[TRAVEL]
          ? html`<button
              class="icon-btn pressable ${this.hass.states[TRAVEL].state === "on" ? "primary" : ""}"
              aria-label=${t("travel")}
              title=${t("travel")}
              @click=${() => travelSheet(ctx)}
            >
              <sn-icon icon="airplane" style="--icon-size:20px"></sn-icon>
            </button>`
          : nothing}
        ${!this.kids && ctx.allows("assistant") && !ctx.editing
          ? html`<button
              class="icon-btn pressable"
              aria-label=${t("assistant")}
              title=${t("assistant")}
              @click=${() => this.pushSheet({ title: t("assistant"), render: (c) => html`<sn-assistant .ctx=${c}></sn-assistant>` })}
            >
              <sn-icon icon="assistant" style="--icon-size:20px"></sn-icon>
            </button>`
          : nothing}
        ${!this.kids && ctx.allows("camera_wall") && !ctx.editing && wallCameras(ctx).length
          ? html`<button class="icon-btn pressable" aria-label=${t("camera_wall")} title=${t("camera_wall")} @click=${() => (this.camwall = true)}>
              <sn-icon icon="cctv" style="--icon-size:20px"></sn-icon>
            </button>`
          : nothing}
        ${this.kids
          ? nothing
          : this.kiosk
          ? html`<button class="icon-btn primary pressable" aria-label=${t("kiosk_unlock")} title=${t("kiosk_unlock")} @click=${() => this.unlockSheet()}>
              <sn-icon icon="lock" style="--icon-size:20px"></sn-icon>
            </button>`
          : !ctx.editing && ctx.config.settings.kiosk.pin_hash
          ? html`<button class="icon-btn pressable" aria-label=${t("kiosk_lock")} title=${t("kiosk_lock")} @click=${() => this.setKiosk(true)}>
              <sn-icon icon="lock-open" style="--icon-size:20px"></sn-icon>
            </button>`
          : nothing}
        ${this.kiosk || this.kids
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
      ${ctx.editing || this.kids ? nothing : this.renderChips(ctx)}
      ${this.renderExpiry(ctx)}
    </header>`;
  }

  /** Two weeks before the key expires, admins see a quiet reminder. */
  private renderExpiry(ctx: Ctx) {
    const exp = this.lic.expires;
    if (!exp || !ctx.isAdmin) return nothing;
    const days = Math.ceil((exp * 1000 - Date.now()) / 86_400_000);
    if (days > 14 || days < 0) return nothing;
    return html`<div style="order:6;flex-basis:100%;font-size:13px;padding:8px 12px;border-radius:12px;background:color-mix(in srgb,var(--accent) 16%,transparent);color:var(--accent-text)">
      ${ctx.t("expires_soon", { n: days })}
    </div>`;
  }

  private openWizard() {
    const t = translator(this.uiLang);
    this.pushSheet({
      title: t("wizard_title"),
      render: (c) => html`<sn-wizard
        .ctx=${c}
        .onDone=${(cfg: DashboardConfig) => {
          this.config = cfg;
          this.pageId = cfg.settings.default_page;
          saveConfig(this.hass, cfg).catch(() => this.toast(t("save_failed")));
          c.closeSheet();
        }}
      ></sn-wizard>`,
    });
  }

  /** For everyone: who installed it, the version, rate the installer, and this screen's own preferences. */
  private aboutSheet() {
    const t = translator(this.uiLang);
    this.pushSheet({
      title: t("about"),
      render: (c) => {
        let here = "";
        try {
          here = localStorage.getItem("smartnest-home-page") ?? "";
        } catch {
          /* fine */
        }
        return html`<div style="display:grid;gap:18px">
          <div style="display:flex;align-items:center;gap:14px">
            <img src="${c.assetBase}logo/smartnest-symbol-${c.dark ? "white" : "color"}.svg" alt="SmartNest" style="width:52px;height:52px" />
            <div style="display:grid;gap:2px">
              <strong>SmartNest</strong>
              <span class="muted" style="font-size:13px">${c.t("tagline")}</span>
              <span class="muted ltr" style="font-size:12px">${c.t("version")} ${VERSION}${this.lic.licensee ? ` · ${this.lic.licensee}` : ""}</span>
            </div>
          </div>
          ${installerSupport(c)
            ? html`<button class="btn primary pressable" @click=${() => supportSheet(c, VERSION)}><sn-icon icon="whatsapp" style="--icon-size:20px"></sn-icon>${c.t("support_title")}</button>`
            : nothing}
          ${c.allows("rating")
            ? html`<button class="btn primary pressable" @click=${() => rateSheet(c)}><sn-icon icon="star" style="--icon-size:20px"></sn-icon>${c.t("rate_service")}</button>`
            : nothing}
          <section style="display:grid;gap:12px">
            <h3 style="margin:0;font-size:13px;font-weight:700;color:var(--text-2)">${c.t("this_screen")}</h3>
            <label class="field"
              >${c.t("opens_on")}
              <select
                @change=${(e: any) => {
                  try {
                    e.target.value ? localStorage.setItem("smartnest-home-page", e.target.value) : localStorage.removeItem("smartnest-home-page");
                  } catch {
                    /* fine */
                  }
                }}
              >
                <option value="" ?selected=${!here}>${c.t("default_page")}</option>
                ${c.config.pages.map((p) => html`<option value=${p.id} ?selected=${here === p.id}>${p.title}</option>`)}
              </select>
            </label>
            <div class="field">
              ${c.t("tv_mode")}
              <div class="seg">
                ${[true, false].map(
                  (v) => html`<button
                    aria-pressed=${this.tvMode === v}
                    @click=${() => {
                      this.tvMode = v;
                      try {
                        v ? localStorage.setItem("smartnest-tv", "1") : localStorage.removeItem("smartnest-tv");
                      } catch {
                        /* fine */
                      }
                    }}
                  >
                    ${c.t(v ? "on" : "off")}
                  </button>`
                )}
              </div>
            </div>
            ${c.allows("voice")
              ? html`<div class="field">
                  ${c.t("voice_hands_free")}
                  <div class="seg">
                    ${[true, false].map(
                      (v) => html`<button
                        aria-pressed=${this.voice === v}
                        @click=${() => {
                          this.voice = v;
                          setVoice(v);
                        }}
                      >
                        ${c.t(v ? "on" : "off")}
                      </button>`
                    )}
                  </div>
                  <span class="hint">${c.t("voice_hint")}</span>
                </div>`
              : nothing}
          </section>
        </div>`;
      },
    });
  }

  private tabClick(ctx: Ctx, id: string) {
    if (id === this.pageId && ctx.editing) return pageSettingsSheet(ctx, id, () => (this.pageId = this.current!.pages[0]?.id ?? ""));
    this.goToPage(id);
  }

  /** Phone: pages live in a bottom tab bar, within thumb reach, like any iPhone app. */
  private renderTabbar(ctx: Ctx) {
    return html`<nav class="tabbar glass" role="tablist">
      ${ctx.config.pages.map(
        (p) => html`<button role="tab" aria-selected=${p.id === this.pageId} class=${p.id === this.pageId ? "on" : ""} @click=${() => this.tabClick(ctx, p.id)}>
          <sn-icon .icon=${p.icon}></sn-icon><span>${p.title}</span>
        </button>`
      )}
    </nav>`;
  }

  private renderChips(ctx: Ctx) {
    const chips = buildChips(ctx);
    if (!chips.length) return nothing;
    return html`<div class="chips" role="list">
      ${chips.map(
        (c) => html`<button class="chip pressable ${c.tone}" role="listitem" @click=${() => (c.type === "travel" ? travelSheet(ctx) : c.entities.length ? chipSheet(ctx, c.type) : undefined)}>
          <sn-icon .icon=${c.icon}></sn-icon>${rolling(c.label)}
        </button>`
      )}
    </div>`;
  }

  private async activate(key: string) {
    const t = translator(this.uiLang);
    if (!this.license || !key.trim()) return;
    this.license = { ...this.license, busy: true, error: undefined };
    try {
      await this.hass.callWS({ type: "smartnest/license/activate", key: key.trim() });
      this.license = undefined;
      this.initStarted = false;
      this.init();
    } catch {
      this.license = { ...this.license!, busy: false, error: t("activate_bad") };
    }
  }

  /** Locked screen until the installer's key for this exact installation is entered. */
  private renderActivation() {
    const t = translator(this.uiLang);
    const lic = this.license!;
    const admin = !!this.hass.user?.is_admin;
    return html`<div class="center">
      <div class="glass" style="width:min(520px,calc(100vw - 32px));padding:32px;border-radius:var(--r-xl);display:grid;gap:18px;text-align:start;color:var(--text)">
        <img src="${this.assetBase}logo/smartnest-symbol-${this.dark ? "white" : "color"}.svg" alt="SmartNest" style="width:56px;height:56px;animation:none" />
        <div style="display:grid;gap:6px">
          <strong style="font-size:24px">${lic.expired ? t("expired_title") : t("activate_title")}</strong>
          <span class="muted">${lic.expired ? t("expired_text") : t("activate_text")}</span>
        </div>
        <div class="field">
          ${admin ? t("activate_id") : t("activate_send")}
          <div style="display:flex;gap:8px">
            <input type="text" class="ltr" readonly .value=${lic.instance_id} style="flex:1;font-family:'JetBrains Mono',monospace;font-size:13px" @focus=${(e: any) => e.target.select()} />
            <button
              class="btn pressable"
              @click=${(e: Event) => {
                const btn = e.currentTarget as HTMLElement;
                const done = () => (btn.textContent = t("copied"));
                navigator.clipboard?.writeText(lic.instance_id).then(done, () => undefined) ?? undefined;
                if (!navigator.clipboard) done();
              }}
            >
              ${t("copy")}
            </button>
          </div>
        </div>
        ${admin
          ? html`<form
              class="field"
              @submit=${(e: SubmitEvent) => {
                e.preventDefault();
                this.activate((e.currentTarget as HTMLFormElement).querySelector("input")!.value);
              }}
            >
              ${t("activate_key")}
              <input type="text" class="ltr" placeholder="SN1.…" autocomplete="off" spellcheck="false" style="font-family:'JetBrains Mono',monospace;font-size:13px" />
              ${lic.error ? html`<span style="color:var(--alert-text);font-size:14px">${lic.error}</span>` : nothing}
              <button class="btn primary pressable" type="submit" ?disabled=${lic.busy} style="justify-self:start;margin-top:6px">${t("activate_btn")}</button>
            </form>`
          : html`<p class="muted" style="margin:0">${t("activate_ask")}</p>`}
      </div>
    </div>`;
  }

  private renderWeather(ctx: Ctx) {
    const w = ctx.config.settings.weather;
    const e = w.background && w.entity && ctx.allows("weather_bg") ? this.hass.states[w.entity] : undefined;
    if (!e) return nothing;
    const sun = this.hass.states["sun.sun"]?.state;
    const night = e.state === "clear-night" || (sun ? sun === "below_horizon" : inWindow(this.now, ctx.config.settings.dark_from, ctx.config.settings.dark_to));
    const sunAttrs = this.hass.states["sun.sun"]?.attributes;
    const elevation = ctx.allows("sky") && typeof sunAttrs?.elevation === "number" ? sunAttrs.elevation : undefined;
    return html`<sn-weather-bg .condition=${e.state} ?night=${night} ?dark=${ctx.dark} .elevation=${elevation} ?rising=${!!sunAttrs?.rising}></sn-weather-bg>`;
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
      <button class="icon-btn pressable" aria-label=${t("settings")} @click=${() => settingsSheet(ctx, { version: VERSION, license: this.lic, testDoorbell: () => this.ring() })}>
        <sn-icon icon="cog" style="--icon-size:20px"></sn-icon>
      </button>
    </div>`;
  }

  render() {
    if (!this.hass) return nothing;
    if (this.license) return this.renderActivation();
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
    const pageId = this.kids && ctx.config.settings.kids_page ? ctx.config.settings.kids_page : this.pageId;
    const page = ctx.config.pages.find((p) => p.id === pageId) ?? ctx.config.pages[0];
    return html`<div class="app ${ctx.narrow ? "compact" : ""} ${this.kids ? "kids" : ""} ${this.tvMode ? "tv" : ""}">
      ${this.renderWeather(ctx)}
      ${this.renderBar(ctx)}
      ${page
        ? keyed(
            page.id,
            html`<main
              @sn-cancel-swipe=${(e: Event) => {
                this.swipe = undefined;
                const m = e.currentTarget as HTMLElement;
                m.style.transform = "";
                m.style.opacity = "";
              }}
              @pointerdown=${this.onSwipeDown} @pointermove=${this.onSwipeMove} @pointerup=${this.onSwipeUp} @pointercancel=${this.onSwipeUp}>
              ${this.guests && ctx.allows("guests") && !ctx.editing ? html`<sn-guests .ctx=${ctx}></sn-guests>` : nothing}
              <sn-page-grid .ctx=${ctx} .page=${page}></sn-page-grid>
            </main>`
          )
        : nothing}
      ${ctx.editing ? this.renderDock(ctx) : nothing}
      ${ctx.narrow && ctx.config.pages.length > 1 && !this.kids ? this.renderTabbar(ctx) : nothing}
      <sn-sheet-host .ctx=${ctx} .sheets=${this.sheets}></sn-sheet-host>
      ${this.ringingAt
        ? html`<sn-doorbell .ctx=${ctx} .at=${this.ringingAt} .silent=${this.silentBell} .onDismiss=${() => (this.ringingAt = undefined)}></sn-doorbell>`
        : nothing}
      ${this.message && ctx.allows("messages") ? html`<sn-message .ctx=${ctx} .msg=${this.message}></sn-message>` : nothing}
      ${(() => {
        const alarm = ctx.allows("alarm_screen") ? Object.values(this.hass.states).find((e) => e.entity_id.startsWith("alarm_control_panel.") && e.state === "triggered") : undefined;
        return alarm && this.alarmHiddenAt !== alarm.last_changed
          ? html`<sn-alarm .ctx=${ctx} .alarm=${alarm} .onHide=${() => ((this.alarmHiddenAt = alarm.last_changed), this.requestUpdate())}></sn-alarm>`
          : nothing;
      })()}
      ${(() => {
        const risk = ctx.allows("weather_alert") && !ctx.editing ? weatherRisk(ctx) : undefined;
        const key = risk ? `${risk.condition}|${new Date().toDateString()}` : "";
        return risk && this.wxDismissed !== key && !this.overload
          ? html`<sn-weather-alert .ctx=${ctx} .risk=${risk} .onDismiss=${() => (this.wxDismissed = key)}></sn-weather-alert>`
          : nothing;
      })()}
      ${this.overload
        ? html`<sn-overload
            .ctx=${ctx}
            .watts=${this.overload}
            .onDismiss=${() => {
              this.overload = undefined;
              this.overSnooze = Date.now() + 10 * 60_000;
            }}
          ></sn-overload>`
        : nothing}
      ${this.voice && ctx.allows("voice") && !ctx.editing && !this.sleeping ? html`<sn-voice .ctx=${ctx}></sn-voice>` : nothing}
      ${this.camwall ? html`<sn-camwall .ctx=${ctx} .onClose=${() => (this.camwall = false)}></sn-camwall>` : nothing}
      ${this.morning ? html`<sn-morning .ctx=${ctx} .onDone=${() => (this.morning = false)}></sn-morning>` : nothing}
      ${this.scene ? html`<sn-cinematic .ctx=${ctx} .mode=${this.scene} .onDone=${() => (this.scene = undefined)}></sn-cinematic>` : nothing}
      ${this.sleeping ? html`<sn-screensaver .ctx=${ctx} ?guests=${this.guests && ctx.allows("guests")} .onWake=${() => {
              this.sleeping = false;
              this.onActivity();
              this.checkMorning();
            }}></sn-screensaver>` : nothing}
      ${this.toastMsg ? html`<div class="toast" role="status">${this.toastMsg}</div>` : nothing}
    </div>`;
  }
}
