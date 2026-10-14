// Signing and reading SmartNest activation keys. The private key stays in ~/.smartnest on your computer only.
import { createPrivateKey, createPublicKey, sign, verify } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

export const DIR = join(homedir(), ".smartnest");
export const KEY_FILE = join(DIR, "license-private.pem");
export const PLANS = ["basic", "pro", "premium"];

const b64u = (buf) => Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const fromB64u = (s) => Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");

export const hasKey = () => existsSync(KEY_FILE);

/** A key for one house. days: undefined = never expires. */
export function issue({ id, name = "", plan = "premium", days, trial = false, reseller }) {
  if (!hasKey()) throw new Error("No signing key: run `node scripts/license.mjs init` first.");
  if (!PLANS.includes(plan)) throw new Error("plan must be basic, pro or premium");
  const now = Math.floor(Date.now() / 1000);
  const valid = trial ? 14 : days ? Number(days) : undefined;
  const payload = { v: 1, i: String(id).trim(), n: name, t: now, p: trial ? "premium" : plan };
  if (valid) payload.x = now + valid * 86400;
  if (trial) payload.tr = 1;
  if (reseller) payload.r = reseller;
  const body = Buffer.from(JSON.stringify(payload));
  const signature = sign(null, body, createPrivateKey(readFileSync(KEY_FILE)));
  return { key: `SN1.${b64u(body)}.${b64u(signature)}`, payload };
}

/** Reads a key back (and checks it was signed by your key), e.g. to add keys issued before the desk existed. */
export function decode(key) {
  const [tag, body, sig] = String(key).trim().split(".");
  if (tag !== "SN1" || !body || !sig) throw new Error("Not a SmartNest key");
  const raw = fromB64u(body);
  if (hasKey()) {
    const pub = createPublicKey(createPrivateKey(readFileSync(KEY_FILE)));
    if (!verify(null, raw, pub, fromB64u(sig))) throw new Error("This key wasn't signed by your key");
  }
  return JSON.parse(raw.toString("utf8"));
}
