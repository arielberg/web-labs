// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://w3b-labs.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'he',
    locales: ['he', 'en'],
  },
  devToolbar: {
    enabled: false,
  },
});
