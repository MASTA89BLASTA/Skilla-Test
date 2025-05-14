import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Checker from "vite-plugin-checker";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  plugins: [react(), Checker({ typescript: true })],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
    },
  },
});
