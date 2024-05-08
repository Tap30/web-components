import fs from 'node:fs';
import { defineConfig } from 'vitepress';
import type { Package } from 'custom-elements-manifest';

const file = fs.readFileSync('custom-elements.json');
const manifest = JSON.parse(file.toString()) as Package;

const components = manifest.modules
  .filter((module) => !module.path.startsWith('src/icon'))
  .map((module) => {
    if (!module.exports)
      throw new Error(`Module has no export: ${module.path}`);

    const components = module.exports.filter(
      (exp) => exp.kind === 'custom-element-definition',
    );
    // For now we asume we have only one custom element per moduel
    const component = components[0];

    if (!component) {
      throw new Error(`No comopnent found in the module: ${module.path}`);
    }

    return {
      link: '/components/' + component.name,
      text: component.declaration.name,
    };
  });

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
