import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workspaceDir = path.resolve(__dirname, "../..");

const radiusFile = fs.readFileSync(
  path.resolve(workspaceDir, "packages/theme/src/tokens/radius.css"),
);

const getRadiusTokensReferenceContent = () => {
  let content = "";

  content += "# Radius Tokens\n\n";

  content += `| Token | Value | Example |\n`;
  content += `| ----- | ----- | ----- |\n`;

  radiusFile
    .toString()
    .split("\n")
    .forEach(line => {
      if (line.trim().startsWith("--tap-")) {
        const x = line.replace(":", ";").trim().split(";");

        content += `| \`${x[0]}\` | \`${x[1]}\` | <div style="background: var(--vp-c-text-2); border-radius: ${x[1]}; width: 64px; height: 64px"></div>\n`;
      }
    });

  return content;
};

export default getRadiusTokensReferenceContent;
