import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gianlucapasin.github.io',
  integrations: [sitemap()],
});
