// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import remarkDirective from 'remark-directive';
import remarkCallouts from './src/plugins/remark-callouts.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com', trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkDirective, remarkCallouts],
  },
  integrations: [mdx(), sitemap({
    filter: (page) => !page.includes('/admin/') && !page.includes('/404/') && !page.includes('/subscribed/')
  })],
});