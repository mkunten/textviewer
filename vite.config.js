/* eslint import/no-extraneous-dependencies: "off" */
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [vue(), vuetify(), eslintPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      stream: 'stream-browserify',
    },
  },
  // shared options
  base: mode === 'production' ? '/textviewer/' : '',
  // build options
  build: {
    commonjsOptions: {
      ignoreTryCatch: (id) => id !== 'stream',
    },
  },
}));
