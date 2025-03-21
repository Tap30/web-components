/* eslint-disable no-console */
import icons from "@tapsioss/icons";
import Mustache from "mustache";
import { exec } from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { promisify } from "node:util";
import { ensureDirExists, getFileMeta } from "../../../scripts/utils.ts";

const execCmd = promisify(exec);

const { dirname } = getFileMeta(import.meta.url);

const packageDir = path.resolve(dirname, "..");
const distDir = path.join(packageDir, "dist");
const templatesDir = path.join(packageDir, "templates");

const iconTemplate = path.join(templatesDir, "web-icon.txt");
const tsconfigFile = path.join(packageDir, "tsconfig.build.json");
const baseIconFile = path.join(packageDir, "src/base-icon.ts");

const generateComponents = async () => {
  console.log("🧩 generating web icons...");

  await execCmd(["shx", "rm", "-rf", distDir].join(" "));
  await ensureDirExists(distDir);

  const iconTemplateStr = await fs.readFile(iconTemplate, {
    encoding: "utf-8",
  });

  const webComponentPromises = Object.keys(icons).map(async key => {
    const iconInfo = icons[key]!;

    const paths = iconInfo.paths.map(({ d, clipRule, fillRule, xlinkHref }) => {
      const props = [
        `d="${d}"`,
        clipRule ? `clip-rule="${clipRule}"` : null,
        fillRule ? `fill-rule="${fillRule}"` : null,
        xlinkHref ? `xlink:href="${xlinkHref}"` : null,
      ];

      return `<path ${props.filter(Boolean).join(" ")} />`;
    });

    const webIconCode = Mustache.render(
      iconTemplateStr,
      {
        name: iconInfo.pascalName,
        paths: paths.join(""),
        elementTag: iconInfo.kebabName,
      },
      {},
      { escape: v => v as string },
    );

    return Promise.all([
      fs.writeFile(
        path.join(distDir, `${iconInfo.pascalName}.ts`),
        webIconCode,
        {
          encoding: "utf-8",
          flag: "w",
        },
      ),
      fs.appendFile(
        path.join(distDir, "index.ts"),
        `export { default as ${iconInfo.pascalName} } from "./${iconInfo.pascalName}";\n`,
        {
          encoding: "utf-8",
        },
      ),
    ]);
  });

  await Promise.all(webComponentPromises);

  await Promise.all([
    await execCmd(["shx", "cp", baseIconFile, distDir].join(" ")),
    await execCmd(["tsc", "--project", tsconfigFile].join(" ")),
  ]);

  await execCmd(`shx ls ${distDir}/*.ts | grep -v '\\.d\\.ts$' | xargs rm`);

  console.log("✅ web icons generated.");
};

void (async () => {
  console.time("build");
  await generateComponents();
  console.timeEnd("build");
})();
/* eslint-enable no-console */
