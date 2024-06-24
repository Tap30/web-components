import fs from 'node:fs';
import type { Package, CustomElement, PropertyLike } from 'custom-elements-manifest';

export default {
  paths() {
    const file = fs.readFileSync('dist/custom-elements.json');
    const manifest = JSON.parse(file.toString()) as Package;

    return manifest.modules
      .filter((module) => !!module.declarations?.length)
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

        content += `# ${getPageTitle(component.tagName)}\n`;

        if (component.summary) {
          content += `${component.summary}\n`;
        }

        // content += getInstallSection(component.tagName)

        if (component.description) {
          content +=`\n${component.description}\n`
        }

        if (!!component.members?.length) {
          content += '### Properties\n';
          content += '| Name | Type | Default | Description |\n';
          content += '| ---- | ---- | ---- | ---- |\n';

          (component.members as PropertyLike[]).forEach((member) => {
            content += `| \`${member.name}\` | ${member.type?.text?.split('|').map((t) => `\`${t.trim()}\``).join(' \\| ')} | \`${member.default}\` | ${member.description} |\n`;
          });
        }

        if (!!component.slots?.length) {
          content += '### Slots\n';
          content += '| Name | Description |\n';
          content += '| ---- | ---- |\n';

          component.slots.forEach((slot) => {
            const name = !!slot.name ? slot.name : 'default';
            content += `| \`${name}\` | ${slot.description} |\n`;
          });
        }

        if (!!component.cssParts?.length) {
          content += '### CSS Parts\n';
          content += '| Name | Description |\n';
          content += '| ---- | ---- |\n';

          component.cssParts.forEach((cssPart) => {
            content += `| \`${cssPart.name}\` | ${cssPart.description} |\n`;
          });
          content += `\n > Check [this link](/references/css-parts.html#${component.tagName}) to learn how to use CSS parts for ${getPageTitle(component.tagName).replace('Tap ', '')}.\n`;
        }




          if (!!component.cssProperties?.length) {
          content += '### CSS Properties\n';
          content += '| Token | Default | Description\n';
          content += '| ---- | ---- | ---- |\n';

          component.cssProperties.forEach((cssProperty) => {
            content += `| \`${cssProperty.name}\` | \`${cssProperty.default || '-'}\` | ${cssProperty.description || '-'} |\n`;
          });
        }

        if (!!component.events?.length) {
          content += '### Events\n';
          content += '| Name  | Description\n';
          content += '| ----- | ------- |\n';
          component.events.forEach((event) => {
            content += `| \`${event.name}\`  | ${event.description || '-'} |\n`;
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


function getInstallSection(name: string) {
return `
### Installation

If you are using node and NPM, you can install this component using npm:

::: code-group

\`\`\`bash [npm]
npm install @tapsioss/web-components
\`\`\`

\`\`\`bash [yarn]
yarn add @tapsioss/web-components
\`\`\`

\`\`\`bash [pnpm]
pnpm install @tapsioss/web-components
\`\`\`

:::

Then import this component into your project by using a bare module specifier:

\`\`\`js
import '@tapsioss/web-components/${name}/${name}.js';
\`\`\`
`
}

const getPageTitle = (componentName: string): string => {
  const result = componentName?.replace(/^-*(.)|-+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase())
  const title = result?.charAt(0)?.toUpperCase() + result?.slice(1);
  return `${title} Component`
};
