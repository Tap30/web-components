import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workspaceDir = path.resolve(__dirname, "../..");

const spacingFile = fs.readFileSync(
  path.resolve(workspaceDir, "packages/theme/src/tokens/spacing.css"),
);

const getSpacingTokensReferenceContent = () => {
  let content = "";

  content += "# Spacing Tokens\n\n";

  content += `| Token | Value | Example |\n`;
  content += `| ----- | ----- | ----- |\n`;

  spacingFile
    .toString()
    .split("\n")
    .forEach(line => {
      if (line.trim().startsWith("--tap-")) {
        const x = line.replace(":", ";").trim().split(";");

        content += `| \`${x[0]}\` | \`${x[1]}\` | <div style="background: var(--vp-c-text-2); width: ${x[1]}; height: ${x[1]}"></div>\n`;
      }
    });

  return content;
};

export default getSpacingTokensReferenceContent;
