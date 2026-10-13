// package.json is the single source of the version; copy it into the integration manifest on every build.
import { readFileSync, writeFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const path = "custom_components/smartnest/manifest.json";
const manifest = JSON.parse(readFileSync(path, "utf8"));
if (manifest.version !== pkg.version) {
  manifest.version = pkg.version;
  writeFileSync(path, JSON.stringify(manifest, null, 2) + "\n");
}
