import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Ctx } from "./ctx";
import type { DashboardConfig } from "./types";
import type { I18nKey } from "./i18n";
import { CALENDAR_KINDS, OFF_BY_DEFAULT, THEMES, type ActiveOccasion, type FamilyDate, type OccasionKind } from "./occasions";
import { entityName } from "./entities";
import { uid } from "./config";
import { shared } from "./theme";
import "./ui/icon";

/** Shows an occasion's theme on this screen for two minutes, whatever the date. */
export function previewOccasion(ctx: Ctx, occ: ActiveOccasion) {
  try {
    localStorage.setItem("smartnest-occ-preview", JSON.stringify({ occ, until: Date.now() + 120_000 }));
  } catch {
    /* private window */
  }
  ctx.toast(ctx.t("occ_preview_on"));
  ctx.closeSheet();
}

const KIND_EMOJI: Record<FamilyDate["kind"], string> = { birthday: "🎂", anniversary: "💍", custom: "🎈" };

/**
 * Settings → Occasions: the family's own days (birthdays with name and date, anniversaries, any day with its colour),
 * which calendar occasions dress the dashboard, where the morning announcement goes, and a preview of each look.
 */
@customElement("sn-occasions-settings")
export class SnOccasionsSettings extends LitElement {
  @property({ attribute: false }) ctx!: Ctx;
  @property({ attribute: false }) set!: (fn: (d: DashboardConfig) => void) => void;
  @state() private kind: FamilyDate["kind"] = "birthday";

  static styles = [
    shared,
    css`
      :host {
        display: grid;
        gap: 14px;
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 6px 6px 12px;
        border-radius: 999px;
        background: var(--surface-2);
        font-size: 14px;
      }
      .chip.on {
        background: color-mix(in srgb, var(--accent) 22%, var(--surface-2));
        font-weight: 600;
      }
      .chip button {
        border: 0;
        background: var(--surface-solid);
        color: var(--text);
        border-radius: 999px;
        padding: 4px 10px;
        font: 600 12px var(--font);
        cursor: pointer;
      }
      .chip .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      .day {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-radius: var(--r-md);
        background: var(--surface-2);
      }
      .day .pic {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: var(--surface-solid) center / cover;
        display: grid;
        place-items: center;
        flex: none;
        font-size: 18px;
      }
      .day .t {
        flex: 1;
        display: grid;
        min-width: 0;
      }
      .day .t small {
        color: var(--text-2);
      }
      form {
        display: grid;
        gap: 8px;
        padding: 12px;
        border-radius: var(--r-md);
        border: 1px dashed var(--border);
      }
      .row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
      }
      .row > input[type="text"] {
        flex: 1;
        min-width: 140px;
      }
      h4 {
        margin: 6px 0 0;
        font-size: 14px;
        color: var(--text-2);
      }
    `,
  ];

  /** "12 Oct · in 3 days · turns 9". */
  private describe(f: FamilyDate) {
    const { t, lang } = this.ctx;
    const [y, m, d] = f.date.split("-").map(Number);
    const now = new Date();
    let next = new Date(now.getFullYear(), m - 1, d);
    if (next < new Date(now.getFullYear(), now.getMonth(), now.getDate())) next = new Date(now.getFullYear() + 1, m - 1, d);
    const days = Math.round((next.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()) / 86_400_000);
    const when = days === 0 ? t("occ_today") : t("occ_in_days", { n: days });
    const years = f.year_known !== false && y > 1900 ? next.getFullYear() - y : undefined;
    const date = next.toLocaleDateString(lang === "ar" ? "ar-u-nu-latn" : lang, { day: "numeric", month: "long" });
    return `${date} · ${when}${years !== undefined ? ` · ${t(f.kind === "birthday" ? "occ_turns" : "occ_years_n", { n: years })}` : ""}`;
  }

  render() {
    const { ctx, set } = this;
    const { t, hass, config } = ctx;
    const s = config.settings;
    const off = s.occasions_off ?? OFF_BY_DEFAULT;
    const dates = [...(s.family_dates ?? [])].sort((a, b) => a.date.slice(5).localeCompare(b.date.slice(5)));
    const people = Object.keys(hass.states).filter((id) => id.startsWith("person."));
    const notify = Object.keys((hass as any).services?.notify ?? {})
      .filter((n) => n !== "send_message" && n !== "persistent_notification")
      .map((n) => `notify.${n}`);
    return html`<div class="field">
        ${t("occasions")}
        <div class="seg">${[true, false].map((v) => html`<button aria-pressed=${(s.occasions ?? true) === v} @click=${() => set((d) => (d.settings.occasions = v))}>${t(v ? "on" : "off")}</button>`)}</div>
      </div>
      ${s.occasions === false
        ? nothing
        : html`<div class="field">
              ${t("occ_colors")}
              <div class="seg">${[true, false].map((v) => html`<button aria-pressed=${(s.occasion_colors ?? true) === v} @click=${() => set((d) => (d.settings.occasion_colors = v))}>${t(v ? "on" : "off")}</button>`)}</div>
            </div>

            <h4>${t("occ_family")}</h4>
            ${dates.length
              ? dates.map((f) => {
                  const pic = f.person ? (hass.states[f.person]?.attributes.entity_picture as string | undefined) : undefined;
                  return html`<div class="day">
                    <span class="pic" style=${pic ? `background-image:url('${hass.hassUrl(pic)}')` : f.color ? `background:${f.color}` : ""}>${pic ? "" : KIND_EMOJI[f.kind]}</span>
                    <span class="t"><b>${f.name}</b><small>${this.describe(f)}</small></span>
                    <button
                      class="btn pressable"
                      style="min-height:34px;font-size:13px"
                      @click=${() => {
                        const y = Number(f.date.slice(0, 4));
                        previewOccasion(ctx, { kind: f.kind, name: f.name, person: f.person, color: f.color, years: f.year_known !== false && y > 1900 ? new Date().getFullYear() - y : undefined });
                      }}
                    >
                      ${t("occ_try")}
                    </button>
                    <button class="icon-btn small pressable" aria-label=${t("delete")} @click=${() => set((d) => (d.settings.family_dates = (d.settings.family_dates ?? []).filter((x) => x.id !== f.id)))}>
                      <sn-icon icon="close" style="--icon-size:16px"></sn-icon>
                    </button>
                  </div>`;
                })
              : html`<span class="hint">${t("occ_family_empty")}</span>`}
            <form
              @submit=${(e: SubmitEvent) => {
                e.preventDefault();
                const f = e.currentTarget as HTMLFormElement;
                const v = (n: string) => (f.elements.namedItem(n) as HTMLInputElement | null)?.value?.trim() ?? "";
                const name = v("name");
                const date = v("date");
                if (!name || !date) return;
                const entry: FamilyDate = {
                  id: uid(),
                  name,
                  date,
                  kind: this.kind,
                  person: v("person") || undefined,
                  color: this.kind === "custom" ? v("color") || undefined : undefined,
                  year_known: (f.elements.namedItem("year") as HTMLInputElement).checked,
                };
                set((d) => (d.settings.family_dates = [...(d.settings.family_dates ?? []), entry]));
                f.reset();
              }}
            >
              <div class="seg">
                ${(["birthday", "anniversary", "custom"] as const).map(
                  (k) => html`<button type="button" aria-pressed=${this.kind === k} @click=${() => (this.kind = k)}>${KIND_EMOJI[k]} ${t(`occ_kind_${k}` as I18nKey)}</button>`
                )}
              </div>
              <div class="row">
                <input name="name" type="text" placeholder=${t(this.kind === "birthday" ? "occ_name_bday" : this.kind === "anniversary" ? "occ_name_anniv" : "occ_name_custom")} required />
                <input name="date" type="date" required />
              </div>
              <div class="row">
                <label style="display:flex;gap:6px;align-items:center;font-size:14px"><input name="year" type="checkbox" checked /> ${t("occ_year_known")}</label>
                ${people.length
                  ? html`<select name="person" style="flex:1;min-width:140px">
                      <option value="">${t("occ_person")}</option>
                      ${people.map((id) => html`<option value=${id}>${entityName(hass, config, id)}</option>`)}
                    </select>`
                  : nothing}
                ${this.kind === "custom" ? html`<input name="color" type="color" value="#E9971D" style="width:48px;height:38px;padding:2px" />` : nothing}
              </div>
              <button class="btn primary pressable" type="submit" style="justify-self:start"><sn-icon icon="plus" style="--icon-size:18px"></sn-icon>${t("add")}</button>
            </form>

            <h4>${t("occ_calendar")}</h4>
            <div class="chips">
              ${CALENDAR_KINDS.map((k) => {
                const on = !off.includes(k);
                return html`<span class="chip ${on ? "on" : ""}">
                  <span class="dot" style="background:${THEMES[k].accent}"></span>${THEMES[k].emoji} ${t(`occ_${k}` as I18nKey)}
                  <button @click=${() => set((d) => (d.settings.occasions_off = on ? [...off, k] : off.filter((x) => x !== k)))}>${t(on ? "on" : "off")}</button>
                  <button @click=${() => previewOccasion(ctx, { kind: k as OccasionKind })}>${t("occ_try")}</button>
                </span>`;
              })}
            </div>

            <label class="field"
              >${t("occ_notify")}
              <select @change=${(e: any) => set((d) => (d.settings.occasion_notify = e.target.value || undefined))}>
                <option value="" ?selected=${!s.occasion_notify}>${t("occ_notify_ha")}</option>
                ${notify.map((n) => html`<option value=${n} ?selected=${s.occasion_notify === n}>${n}</option>`)}
              </select>
              <span class="hint">${t("occ_notify_hint")}</span>
            </label>`}`;
  }
}
