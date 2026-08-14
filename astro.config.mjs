import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.tikpal.ai',
  output: 'static',
  build: {
    format: 'directory',
  },
});
