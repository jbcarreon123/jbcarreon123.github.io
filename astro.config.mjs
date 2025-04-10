// @ts-check
import { defineConfig, envField, passthroughImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from "vite";
import nekoweb from '@indiefellas/astro-adapter-nekoweb';
import svelte from '@astrojs/svelte';
import { getEnv } from 'astro/env/runtime';

// @ts-ignore
const { NEKOWEB_APIKEY, NEKOWEB_COOKIE } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  adapter: nekoweb({
    apiKey: NEKOWEB_APIKEY,
    cookie: NEKOWEB_COOKIE,
    folder: 'jbsite4_test'
  }),

  prefetch: {
    prefetchAll: true
  },

  image: {
    service: passthroughImageService()
  },

  integrations: [svelte()],

  trailingSlash: 'always'
});