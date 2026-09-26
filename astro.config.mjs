// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://palmbeachaiservices.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // /pricing/index.html style output works cleanly with S3 + a CloudFront Function rewrite
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thanks') && !page.includes('/404'),
    }),
  ],
  vite: {
    // Cast: @tailwindcss/vite ships newer Vite types than Astro 5 bundles (runtime is compatible).
    plugins: [/** @type {any} */ (tailwindcss())],
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
