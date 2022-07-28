import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
