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
        rewrite: (path) => path.replace(/^\/element/, "")
      }
    }
  }
});
