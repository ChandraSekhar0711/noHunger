import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import jsonServer from "vite-plugin-simple-json-server";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsonServer()],

  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
