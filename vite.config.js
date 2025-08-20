import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/element": {
        target: "https://periodic-table-elements-info.herokuapp.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/element/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        // produce stable filenames (no content hash) for simpler repo tracking
        entryFileNames: `assets/index.js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name][extname]`,
      },
    },
  },
});
