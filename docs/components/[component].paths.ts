import fs from 'node:fs';
import type { Package, CustomElement } from 'custom-elements-manifest';

export default {
  paths() {
    const file = fs.readFileSync('custom-elements.json');
    const manifest = JSON.parse(file.toString()) as Package;

    return manifest.modules
      .filter((module) => !module.path.startsWith('src/icon'))
      .map((module) => {
        if (!module.exports)
          throw new Error(`Module has no export: ${module.path}`);

        const component = module.declarations?.[0] as CustomElement;

        if (!component.tagName || !component.tagName.startsWith('tap')) {
          throw new Error(`Module has no custom element: ${module.path}`);
        }

        let content = '';

        content += `# ${component.name} \n`;

        if (component.summary) {
          content += `${component.summary}`;
        }

        return {
          params: {
            component: component.tagName,
          },
          content,
        };
      });
  },
};
