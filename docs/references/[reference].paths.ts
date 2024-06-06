import fs from 'node:fs';
import type { Package, CustomElement, PropertyLike } from 'custom-elements-manifest';

const file = fs.readFileSync('dist/custom-elements.json');
const manifest = JSON.parse(file.toString()) as Package;

// TODO: refactor
const getCssPartsReferenceContent = () => {
  let content = '# CSS Parts API Reference\n'

  manifest.modules
    .filter(
      (module) =>
        !(module.path.startsWith('src/icon/') || module.path.startsWith('src/icons/')) && !!module.declarations?.length
    )
    .forEach((module) => {
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


      if (!!component.cssParts?.length) {
        content += `\n## \`${component.tagName}\`\n\n`;
        content += '| Name | Description |\n';
        content += '| ---- | ---- |\n';

        component.cssParts.forEach((cssPart) => {
          content += `| ${cssPart.name} | ${cssPart.description} |\n`;
        });
      }

    });
    return content;
}

const getCssTokensReferenceContent = () => {
  let content = '# CSS Tokens API Reference\n'

  manifest.modules
    .filter(
      (module) =>
        !(module.path.startsWith('src/icon/') || module.path.startsWith('src/icons/')) && !!module.declarations?.length
    )
    .forEach((module) => {
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


      if (!!component.cssProperties?.length) {
        content += `\n## \`${component.tagName}\`\n\n`;
        content += '| Name | Default Value | Description |\n';
        content += '| ---- | ---- | ---- |\n';

        component.cssProperties.forEach((cssPart) => {
          content += `| ${cssPart.name} | ${cssPart.default}| ${cssPart.description} |\n`;
        });
      }

    });
  return content;
}


export default {
  paths() {
    return [
      { params: { 'reference': 'css-parts' }, content: getCssPartsReferenceContent() },
      { params: { 'reference': 'components-tokens' }, content: getCssTokensReferenceContent() },
    ]
  },
};
