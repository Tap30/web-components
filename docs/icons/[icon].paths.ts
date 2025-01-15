import fs from "node:fs";
import path from "node:path";
import { type Icon, type Metadata } from "../../internals/doc-helpers/types";
import { getFileMeta } from "../../scripts/utils";
import {
  codify,
  getUsageSectionMarkdown,
  tabulateData,
} from "../internals/utils/formatters";

export default {
  paths() {
    const { dirname } = getFileMeta(import.meta.url);

    const docsDir = path.resolve(dirname, "..");
    const workspaceDir = path.join(docsDir, "..");
    const distDir = path.join(workspaceDir, "dist");
    const metadataFile = path.join(distDir, "components-metadata.json");

    const metadata = JSON.parse(
      fs.readFileSync(metadataFile).toString(),
    ) as Metadata;

    return metadata.icons.map(icon => {
      let content = "";

      content += `# ${icon.pascalName} Icon\n`;

      content += getUsageSectionMarkdown({
        importPath: `@tapsioss/web-icons/${icon.kebabName}`,
        tagName: `tapsi-icon-${icon.kebabName}`,
      });

      content += getIconPreview(icon);

      content += getPropertyTable();

      return {
        params: {
          icon: icon.kebabName,
        },
        content,
      };
    });
  },
};

const getIconPreview = (icon: Icon): string => {
  let res = "";

  res += "\n## Preview\n";

  res += `<div class="tapsi-icon-wrapper">${icon.svgTag}</div>\n`;

  return res;
};

const getPropertyTable = (): string => {
  let res = "";

  res += "\n## Properties\n";

  res += `${tabulateData(
    ["Name", "Description", "Default Value"],
    [
      [
        codify("viewbox"),
        "The viewBox of the SVG.<br>Allows you to redefine what the coordinates without units mean inside an SVG element.",
        codify('"0 0 24 24"'),
      ],
      [
        codify("title"),
        "Provides a human-readable title for the element that contains it.<br>https://www.w3.org/TR/SVG-access/#Equivalent",
        "-",
      ],
      [
        codify("size"),
        'The size of the icon.<br>If set to `"auto"`, the icon will get the parent\'s width and height.',
        codify('"auto"'),
      ],
    ],
  )}/n`;

  return res;
};
