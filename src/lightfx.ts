import { html } from "lit";
import type { Ctx } from "./ctx";
import type { I18nKey } from "./i18n";

const EFFECTS: { id: string; emoji: string; label: I18nKey }[] = [
  { id: "candle", emoji: "🕯️", label: "fx_candle" },
  { id: "sunset", emoji: "🌅", label: "fx_sunset" },
  { id: "party", emoji: "🎉", label: "fx_party" },
  { id: "ramadan", emoji: "🌙", label: "fx_ramadan" },
  { id: "aurora", emoji: "🌌", label: "fx_aurora" },
];

/** Moving light scenes for colour lights. They run on the hub, so they keep going with the screen off. */
export function fxRow(ctx: Ctx, lights: string[]) {
  const { t, hass } = ctx;
  const start = (effect: string) =>
    hass.callWS({ type: "smartnest/fx/start", effect, lights }).then(
      () => ctx.toast(t("fx_started")),
      () => ctx.toast(t("error"))
    );
  return html`<div style="display:grid;gap:8px;width:100%">
    <span class="muted" style="font-size:13px">${t("fx_title")}</span>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      ${EFFECTS.map((f) => html`<button class="btn pressable" style="min-height:40px" @click=${() => start(f.id)}>${f.emoji} ${t(f.label)}</button>`)}
      <button class="btn pressable" style="min-height:40px" @click=${() => hass.callWS({ type: "smartnest/fx/stop", lights }).catch(() => undefined)}>⏹ ${t("fx_stop")}</button>
    </div>
  </div>`;
}
