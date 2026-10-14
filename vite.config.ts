import { defineConfig } from "vite";
import pkg from "./package.json";

// Dev: `npm run dev` serves dev/index.html with a mock Home Assistant.
// Build: a tiny entry (smartnest-panel.js) plus hashed chunks in frontend/chunks, copied to clients with the integration.
export default defineConfig({
  root: ".",
  define: { __SN_VERSION__: JSON.stringify(pkg.version) },
  publicDir: "custom_components/smartnest/frontend",
  server: { port: 5174 },
  build: {
    outDir: "custom_components/smartnest/frontend",
    emptyOutDir: false,
    copyPublicDir: false,
    modulePreload: false,
    target: "es2021",
    // App mode rather than library mode: library ES builds skip minification.
    minify: "terser",
    terserOptions: { format: { comments: false } },
    rollupOptions: {
      input: "src/main.ts",
      output: {
        format: "es",
        entryFileNames: "smartnest-panel.js",
        chunkFileNames: "chunks/[name]-[hash].js",
        // Vite's small loader helper in a chunk of its own: if it stayed in the entry, chunks would import the entry
        // (without its ?v= cache-buster) and the browser would load it a second time.
        manualChunks: (id) => (id.includes("preload-helper") ? "loader" : undefined),
      },
    },
  },
});
