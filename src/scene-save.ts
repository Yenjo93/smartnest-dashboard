import type { Ctx } from "./ctx";
import { domainOf } from "./entities";

/** The parts of a device's state a scene needs to bring it back exactly (brightness, colour, position, temperature). */
function snapshot(e: { state: string; attributes: Record<string, any> }, d: string): Record<string, unknown> {
  const a = e.attributes;
  const out: Record<string, unknown> = { state: e.state };
  if (d === "light" && e.state === "on") {
    if (a.brightness != null) out.brightness = a.brightness;
    if (a.color_mode === "color_temp" && a.color_temp_kelvin) out.color_temp_kelvin = a.color_temp_kelvin;
    else if (["hs", "rgb", "rgbw", "rgbww", "xy"].includes(a.color_mode) && a.rgb_color) out.rgb_color = a.rgb_color;
  }
  if (d === "cover" && a.current_position != null) out.current_position = a.current_position;
  if (d === "climate" && a.temperature != null) out.temperature = a.temperature;
  if (d === "fan" && a.percentage != null) out.percentage = a.percentage;
  return out;
}

/**
 * "Keep it like this": saves how these devices are right now as a real Home Assistant scene (in scenes.yaml, like the
 * scene editor does), so it shows everywhere: the scenes widget, voice, automations. Admins only.
 */
export async function saveAsScene(ctx: Ctx, ids: string[], suggested: string): Promise<boolean> {
  const name = prompt(ctx.t("scene_name"), suggested)?.trim();
  if (!name) return false;
  const entities: Record<string, unknown> = {};
  for (const id of ids) {
    const e = ctx.hass.states[id];
    const d = domainOf(id);
    if (e && e.state !== "unavailable" && ["light", "switch", "cover", "climate", "fan", "input_boolean", "media_player"].includes(d)) entities[id] = snapshot(e, d);
  }
  if (!Object.keys(entities).length) return false;
  const id = `smartnest_${Date.now().toString(36)}`;
  const res = await ctx.hass.fetchWithAuth(`/api/config/scene/config/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name, entities }),
  });
  if (!res.ok) throw new Error(`scene ${res.status}`);
  ctx.toast(ctx.t("scene_saved", { name }));
  return true;
}
