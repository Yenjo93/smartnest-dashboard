#!/usr/bin/env node
// SmartNest activation keys. The private key lives ONLY on your computer (~/.smartnest), never in the repo.
//
//   node scripts/license.mjs init                       # once: creates your signing key, prints the public key
//   node scripts/license.mjs <installation-id> "Name"   # prints an activation key for that house
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

const [cmd, name = ""] = process.argv.slice(2);
if (!cmd) {
  console.error('usage: license.mjs init | license.mjs <installation-id> "Client name"');
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

if (!existsSync(keyFile)) {
  console.error("Run `node scripts/license.mjs init` first.");
  process.exit(1);
}
const payload = Buffer.from(JSON.stringify({ v: 1, i: cmd.trim(), n: name, t: Math.floor(Date.now() / 1000) }));
const signature = sign(null, payload, createPrivateKey(readFileSync(keyFile)));
console.log(`SN1.${b64u(payload)}.${b64u(signature)}`);
