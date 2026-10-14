#!/usr/bin/env node
// SmartNest activation keys. The private key lives ONLY on your computer (~/.smartnest), never in the repo.
//
//   node scripts/license.mjs init
//       once: creates your signing key and prints the public key
//
//   node scripts/license.mjs <installation-id> "Name" [--plan basic|pro|premium] [--days N] [--reseller "Company"]
//       a key for that house. No --days = never expires. Default plan: premium.
//
//   node scripts/license.mjs <installation-id> "Name" --trial
//       14-day Premium trial
//
// Back up ~/.smartnest/license-private.pem (password manager): without it you can't issue new keys,
// and anyone who has it can.
import { createPrivateKey, createPublicKey, generateKeyPairSync, sign } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const dir = join(homedir(), ".smartnest");
const keyFile = join(dir, "license-private.pem");
const b64u = (buf) => Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  if (i < 0) return undefined;
  const v = args[i + 1];
  args.splice(i, v && !v.startsWith("--") ? 2 : 1);
  return v && !v.startsWith("--") ? v : true;
};
const trial = flag("trial") !== undefined;
const plan = String(flag("plan") ?? "premium");
const days = flag("days");
const reseller = flag("reseller");
const [cmd, name = ""] = args;

if (!cmd) {
  console.error('usage: license.mjs init | license.mjs <installation-id> "Name" [--plan basic|pro|premium] [--days N] [--reseller "X"] [--trial]');
  process.exit(1);
}

if (cmd === "init") {
  if (existsSync(keyFile)) {
    console.error(`Already set up: ${keyFile}`);
  } else {
    mkdirSync(dir, { recursive: true, mode: 0o700 });
    const { privateKey } = generateKeyPairSync("ed25519");
    writeFileSync(keyFile, privateKey.export({ type: "pkcs8", format: "pem" }), { mode: 0o600 });
    console.error(`Created ${keyFile}. Back it up somewhere safe.`);
  }
  const pub = createPublicKey(createPrivateKey(readFileSync(keyFile)));
  console.log(pub.export({ format: "jwk" }).x); // goes into custom_components/smartnest/const.py
  process.exit(0);
}

if (!["basic", "pro", "premium"].includes(plan)) {
  console.error("--plan must be basic, pro or premium");
  process.exit(1);
}
if (!existsSync(keyFile)) {
  console.error("Run `node scripts/license.mjs init` first.");
  process.exit(1);
}

const now = Math.floor(Date.now() / 1000);
const validDays = trial ? 14 : days ? Number(days) : undefined;
const payload = { v: 1, i: cmd.trim(), n: name, t: now, p: trial ? "premium" : plan };
if (validDays) payload.x = now + validDays * 86400;
if (trial) payload.tr = 1;
if (typeof reseller === "string") payload.r = reseller;

const body = Buffer.from(JSON.stringify(payload));
const signature = sign(null, body, createPrivateKey(readFileSync(keyFile)));
console.log(`SN1.${b64u(body)}.${b64u(signature)}`);
console.error(
  `${payload.p}${payload.tr ? " trial" : ""} · ${name || "(no name)"}${payload.x ? ` · until ${new Date(payload.x * 1000).toISOString().slice(0, 10)}` : " · no expiry"}${payload.r ? ` · via ${payload.r}` : ""}`
);
