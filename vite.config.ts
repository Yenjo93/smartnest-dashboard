import { defineConfig } from "vite";
import pkg from "./package.json";

// Dev: `npm run dev` serves dev/index.html with a mock Home Assistant.
// Build: emits one minified ES module into the integration folder, which is what gets copied to clients.
export default defineConfig({
  root: ".",
  define: { __SN_VERSION__: JSON.stringify(pkg.version) },
  publicDir: "custom_components/smartnest/frontend",
  server: { port: 5174 },
  build: {
    outDir: "custom_components/smartnest/frontend",
    emptyOutDir: false,
    copyPublicDir: false,
    target: "es2021",
    // App mode rather than library mode: library ES builds skip minification.
    minify: "terser",
    terserOptions: { format: { comments: false } },
    rollupOptions: {
      input: "src/main.ts",
      output: { format: "es", entryFileNames: "smartnest-panel.js", inlineDynamicImports: true },
    },
  },
});
