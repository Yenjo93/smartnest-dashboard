import type { Ctx } from "./ctx";
import type { Hass } from "./types";

/** The house's AI Task entity (OpenAI, Gemini, Claude, Ollama…), if it has one. */
export const aiEntity = (hass: Hass) => Object.keys(hass.states).find((id) => id.startsWith("ai_task."));

export type AiTask = "doorbell" | "summary" | "explain" | "scene" | "automation" | "cameras" | "bill";

/** One of the integration's fixed AI jobs. Undefined when there's no AI or it failed: callers just skip the extra. */
export async function askAI(ctx: Ctx, task: AiTask, extra: { camera?: string; facts?: string[]; ask?: string } = {}): Promise<string | undefined> {
  const entity_id = aiEntity(ctx.hass);
  if (!entity_id) return undefined;
  try {
    const res = await ctx.hass.callWS<{ text: string }>({ type: "smartnest/ai/ask", task, entity_id, lang: ctx.lang, ...extra });
    return res.text || undefined;
  } catch {
    return undefined;
  }
}

/** The first JSON array or object in what the model said (models like to wrap it in prose or code fences). */
export function pickJson<T>(text: string | undefined, open: "[" | "{"): T | undefined {
  if (!text) return undefined;
  const close = open === "[" ? "]" : "}";
  const a = text.indexOf(open);
  const b = text.lastIndexOf(close);
  if (a < 0 || b < a) return undefined;
  try {
    return JSON.parse(text.slice(a, b + 1)) as T;
  } catch {
    return undefined;
  }
}
