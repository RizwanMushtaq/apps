import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  /**
   * Configure the development server to listen on all interfaces and use a specific port for Docker compatibility.
   * This allows the app to be accessible from outside the container when running in a Docker environment.
   */
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
