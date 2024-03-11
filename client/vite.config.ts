/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTest.js",
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
    //alias: [{ find: /^@visx/scale$/, replacement: '@visx/scale/esm/index.js' }],
  },
  resolve: {
    // added mainFields for ERR_REQUIRE_ESM error
    mainFields: ["module"],
    alias: {
      "@": "/src",
    },
  },
});
