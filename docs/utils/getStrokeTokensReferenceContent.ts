import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workspaceDir = path.resolve(__dirname, "../..");

const strokeFile = fs.readFileSync(
  path.resolve(workspaceDir, "packages/theme/src/tokens/strokes.css"),
);

const getStrokeTokensReferenceContent = () => {
  let content = "";

  content += "# Stroke Tokens\n\n";

  content += `| Token | Value | Example |\n`;
  content += `| ----- | ----- | ----- |\n`;

  strokeFile
    .toString()
    .split("\n")
    .forEach(line => {
      if (line.trim().startsWith("--tap-")) {
        const x = line.replace(":", ";").trim().split(";");

        content += `| \`${x[0]}\` | \`${x[1]}\` | <div style="border: ${x[1]} solid var(--vp-c-text-2); width: 64px; height: 64px"></div>\n`;
      }
    });

  return content;
};

export default getStrokeTokensReferenceContent;
