import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue(), vuetify()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        stream: "stream-browserify",
      },
    },
    // shared options
    base: mode === "production" ? "/textviewer/" : "",
    // build options
    build: {
      outDir: "docs",
      commonjsOptions: {
        ignoreTryCatch: (id) => id !== "stream",
      },
    },
  };
});
