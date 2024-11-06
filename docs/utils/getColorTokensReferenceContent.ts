import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workspaceDir = path.resolve(__dirname, "../..");

const colorsFile = fs.readFileSync(
  path.resolve(workspaceDir, "packages/theme/src/tokens/colors.css"),
);

const paletteFile = fs.readFileSync(
  path.resolve(workspaceDir, "packages/theme/src/tokens/palette.css"),
);

const getColorTokensReferenceContent = () => {
  let content = "";

  content += "# Color Tokens\n\n";
  content += `## Palette\n`;
  content += `| Token | Value | Example |\n`;
  content += `| ----- | ----- | ----- |\n`;

  paletteFile
    .toString()
    .split("\n")
    .forEach(line => {
      if (line.trim().startsWith("--tap-")) {
        const x = line.replace(":", ";").trim().split(";");

        content += `| \`${x[0]}\` | \`${x[1]}\` | <div style="background: ${x[1]}; width: 24px; height: 24px"></div>\n`;
      }
    });

  colorsFile
    .toString()
    .split("\n")
    .forEach(line => {
      if (line.trim().startsWith("/*") && !line.includes("TODO")) {
        const subtitle = line.replace("/*", "").replace("*/", "").trim();

        content += `## ${subtitle}\n`;
        content += `| Token | Value | Preview |\n`;
        content += `| ----- | ----- | ----- |\n`;
      } else if (line.trim().startsWith("--tap-")) {
        const x = line.replace(":", ";").trim().split(";");

        content += `| \`${x[0]}\` | \`${x[1]}\` | <div style="background: ${x[1]}; width: 24px; height: 24px"></div>\n`;
      }
    });
  return content;
};

export default getColorTokensReferenceContent;
