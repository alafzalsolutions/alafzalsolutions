// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://alafzalsolutions.com', trailingSlash: 'always',
  integrations: [mdx(), sitemap({
    filter: (page) => !page.includes('/admin/') && !page.includes('/404/')
  })],
});