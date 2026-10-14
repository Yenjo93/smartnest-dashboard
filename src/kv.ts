import type { Hass } from "./types";

export type KvKey = "chores" | "wake";

/** Family data on the hub (chores, wake-up lights): anyone can change it from the wall, every screen sees it live. */
export async function loadKv<T>(hass: Hass, key: KvKey): Promise<T | undefined> {
  try {
    return (await hass.callWS<{ value: T | null }>({ type: "smartnest/kv/get", key })).value ?? undefined;
  } catch {
    return undefined;
  }
}

export const saveKv = (hass: Hass, key: KvKey, value: object) => hass.callWS({ type: "smartnest/kv/set", key, value });

export function watchKv<T>(hass: Hass, key: KvKey, cb: (v: T) => void): Promise<() => void> {
  return hass.connection.subscribeMessage<{ value: T }>((m) => cb(m.value), { type: "smartnest/kv/subscribe", key });
}
