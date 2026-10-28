import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://maximize1031.com',
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'never',
  build: { format: 'directory' },
  markdown: { syntaxHighlight: false },
});
