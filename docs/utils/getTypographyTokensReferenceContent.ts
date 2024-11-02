import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workspaceDir = path.resolve(__dirname, "../..");

const typographyFile = fs.readFileSync(
  path.resolve(workspaceDir, "packages/theme/src/tokens/colors.css"),
);

const getTypographyTokensReferenceContent = () => {
  let content = "";

  content += "# Typography Tokens <Badge>Not Complete</Badge>\n\n";

  typographyFile
    .toString()
    .split("\n")
    .forEach((line, index) => {
      if (line.trim().startsWith("/*") && !line.includes("TODO") && index > 0) {
        const subtitle = line.replace("/*", "").replace("*/", "").trim();

        content += `## ${subtitle}\n`;
        content += `| Token | Value | Preview (English) | Preview (Persian) |\n`;
        content += `| ----- | ----- | ----- | ----- |\n`;
      } else if (line.trim().startsWith("--tap-") && index > 0) {
        const x = line.replace(":", ";").trim().split(";");

        content += `| \`${x[0]}\` | \`${x[1]}\` | - | - |\n`;
      }
    });
  return content;
};

export default getTypographyTokensReferenceContent;
