import fs from 'node:fs';
import { defineConfig } from 'vitepress';

const components = fs.readdirSync('src').map((name) => ({
  link: '/components/' + name,
  text: name
    .split('-')
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .join(' '),
}));

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Tapsi components',
  description: 'A set of components based on Tapsi design system.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    sidebar: [
      { text: 'Getting Started', link: '/' },
      {
        text: 'Components',
        collapsed: false,
        items: components,
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
});
