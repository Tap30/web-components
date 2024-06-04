import fs from 'node:fs';
import { defineConfig } from 'vitepress';
import type { Package } from 'custom-elements-manifest';

const file = fs.readFileSync('dist/custom-elements.json');
const manifest = JSON.parse(file.toString()) as Package;

const components = manifest.modules
  .filter((module) => !(module.path.startsWith('src/icon/') || module.path.startsWith('src/icons/')) && !!module.declarations?.length)
  .map((module) => {
    if (!module.exports)
      throw new Error(`Module has no export: ${module.path}`);

    const components = module.exports.filter(
      (exp) => exp.kind === 'custom-element-definition',
    );

    // For now we asume we have only one custom element per moduel
    const component = components[0];

    return {
      link: '/components/' + component.name,
      text: component.name,
    };
  });

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Tapsi components',
  description: 'A set of components based on Tapsi design system.',
  base: "/web-components/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    sidebar: [
      { text: 'Getting Started', link: '/getting-started' },
      {
        text: 'Components',
        collapsed: false,
        items: components,
      },
      { text: 'Packages', items: [
          {text: 'Lit', link: '/package/web-component'},
          {text: 'React', link: '/package/react'}
        ] },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Tap30/web-components' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/tapsi' },
    ],
    nav: [
      {
        text: 'Components',
        link: '/components/tap-avatar',
      },
      {
        text: 'Packages',
        items: [
          {text: 'Lit', link: '/package/web-component'},
          {text: 'React', link: '/package/react'}
        ],
      }
    ]
  },
});
