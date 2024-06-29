import fs from 'fs';
import { DefaultTheme } from "vitepress";
import type { Package } from "custom-elements-manifest";

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

export default [
  { text: 'Getting Started', link: '/getting-started' },
  {
    text: 'Components',
    collapsed: false,
    items: components,
  },
  {
    text: 'API References',
    collapsed: false,
    items: [
      { text: 'CSS Parts', link: '/references/css-parts' },
      {
        text: 'Design Tokens', items: [
          { text: 'Colors', link: '/references/color-tokens' },
          { text: 'Radius', link: '/references/radius-tokens' },
          { text: 'Spacing', link: '/references/spacing-tokens' },
          { text: 'Stroke', link: '/references/stroke-tokens' },
          { text: 'Typography', link: '/references/typography-tokens' },
          { text: 'Components', link: '/references/components-tokens' },
        ]
      },
    ],
  },
] as DefaultTheme.SidebarItem[]
