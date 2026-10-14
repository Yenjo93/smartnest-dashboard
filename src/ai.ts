import type { Ctx } from "./ctx";
import type { Hass } from "./types";

/** The house's AI Task entity (OpenAI, Gemini, Claude, Ollama…), if it has one. */
export const aiEntity = (hass: Hass) => Object.keys(hass.states).find((id) => id.startsWith("ai_task."));

export type AiTask = "doorbell" | "summary" | "explain";

/** One of the integration's fixed AI jobs. Undefined when there's no AI or it failed: callers just skip the extra. */
export async function askAI(ctx: Ctx, task: AiTask, extra: { camera?: string; facts?: string[] } = {}): Promise<string | undefined> {
  const entity_id = aiEntity(ctx.hass);
  if (!entity_id) return undefined;
  try {
    const res = await ctx.hass.callWS<{ text: string }>({ type: "smartnest/ai/ask", task, entity_id, lang: ctx.lang, ...extra });
    return res.text || undefined;
  } catch {
    return undefined;
  }
}
