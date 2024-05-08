import fs from 'node:fs';
import type { Package, CustomElement } from 'custom-elements-manifest';

export default {
  paths() {
    const file = fs.readFileSync('custom-elements.json');
    const manifest = JSON.parse(file.toString()) as Package;

    return manifest.modules
      .filter((module) => !module.path.startsWith('src/icon') && !!module.declarations?.length)
      .map((module) => {
        if (!module.exports)
          throw new Error(`Module has no export: ${module.path}`);

        const component = module.declarations?.[0] as CustomElement;

        if (!component || !component.tagName || !component.tagName.startsWith('tap')) {
          return
        }

        let content = '';

        content += `# ${component.name} \n`;

        if (component.summary) {
          content += `${component.summary}\n`;
        }

        if (!!component.slots?.length) {
          content += "### Slots\n"
          content += "| Name | Description |\n"
          content += "| ------------- | :----: |\n"

          component.slots.forEach(slot => {
            const name = !!slot.name ? slot.name : "default" ;
            content += `| ${name} | ${slot.description} |\n`
          })
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
