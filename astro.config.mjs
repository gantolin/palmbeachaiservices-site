// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://palmbeachaiservices.com',
  output: 'static',
  // Astro 7's HTML compression drops the space where a line of text meets an inline tag on the next line
  // ("hours.One simple plan"). Keep whitespace as written; GitHub Pages gzips the output anyway.
  compressHTML: false,
  trailingSlash: 'ignore',
  build: {
    // /pricing/index.html style output: GitHub Pages serves /pricing/ from it directly
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
