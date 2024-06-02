import fs from 'node:fs';
import type { Package, CustomElement, PropertyLike } from 'custom-elements-manifest';

export default {
  paths() {
    const file = fs.readFileSync('dist/custom-elements.json');
    const manifest = JSON.parse(file.toString()) as Package;

    return manifest.modules
      .filter(
        (module) =>
          !(module.path.startsWith('src/icon/') || module.path.startsWith('src/icons/')) && !!module.declarations?.length
      )
      .map((module) => {
        if (!module.exports)
          throw new Error(`Module has no export: ${module.path}`);

        const component = module.declarations?.[0] as CustomElement;

        if (
          !component ||
          !component.tagName ||
          !component.tagName.startsWith('tap')
        ) {
          return;
        }

        let content = '';

        content += `# ${component.name} \n`;

        if (component.summary) {
          content += `${component.summary}\n`;
        }


        content += getInstallSection(component.tagName)

        if (component.description) {
          content +=`\n${component.description}\n`
        }

        if (!!component.members?.length) {
          content += '### Properties\n';
          content += '| Name | Type | Default | Description |\n';
          content += '| ---- | ---- | ---- | ---- |\n';

          (component.members as PropertyLike[]).forEach((member) => {
            content += `| ${member.name} | ${member.type?.text} | ${member.default} | ${member.description} |\n`;
          });
        }

        if (!!component.slots?.length) {
          content += '### Slots\n';
          content += '| Name | Description |\n';
          content += '| ---- | ---- |\n';

          component.slots.forEach((slot) => {
            const name = !!slot.name ? slot.name : 'default';
            content += `| ${name} | ${slot.description} |\n`;
          });
        }

        if (!!component.cssParts?.length) {
          content += '### CSS Parts\n';
          content += '| Name | Description |\n';
          content += '| ---- | ---- |\n';

          component.cssParts.forEach((cssPart) => {
            content += `| ${cssPart.name} | ${cssPart.description} |\n`;
          });
        }

        if (!!component.cssProperties?.length) {
          content += '### CSS Properties\n';
          content += '| Token | Default |\n';
          content += '| ---- | ---- |\n';

          component.cssProperties.forEach((cssProperty) => {
            content += `| ${cssProperty.name} | ${cssProperty.default} |\n`;
          });
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


function getInstallSection(name: string) {
return `
### Installation

If you are using node and NPM, you can install this component using npm:

::: code-group

\`\`\`bash [npm]
npm install @tapsi/components
\`\`\`

\`\`\`bash [yarn]
yarn add @tapsi/components
\`\`\`

\`\`\`bash [pnpm]
pnpm install @tapsi/components
\`\`\`

:::

Then import this component into your project by using a bare module specifier:

\`\`\`js
import '@tapsi/components/${name}/${name}.js';
\`\`\`
`
}
