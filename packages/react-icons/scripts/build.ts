/* eslint-disable no-console */
import icons from "@tapsioss/icons";
import Mustache from "mustache";
import { exec } from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { promisify } from "node:util";
import {
  createModulePackages,
  ensureDirExists,
  getFileMeta,
} from "../../../scripts/utils";

const execCmd = promisify(exec);

const { dirname } = getFileMeta(import.meta.url);

const packageDir = path.resolve(dirname, "..");
const distDir = path.join(packageDir, "dist");
const templatesDir = path.join(packageDir, "templates");

const iconTemplate = path.join(templatesDir, "react-icon.txt");
const tsconfigFile = path.join(packageDir, "tsconfig.build.json");
const baseIconFile = path.join(packageDir, "src/base-icon.tsx");

const generateComponents = async () => {
  console.log("🧩 generating react icons...");

  await ensureDirExists(distDir);

  const iconTemplateStr = await fs.readFile(iconTemplate, {
    encoding: "utf-8",
  });

  const reactComponentPromises = Object.keys(icons).map(async key => {
    const iconInfo = icons[key]!;

    const paths = iconInfo.paths.map(({ d, clipRule, fillRule, xlinkHref }) => {
      const props = [
        `d="${d}"`,
        clipRule ? `clipRule="${clipRule}"` : null,
        fillRule ? `fillRule="${fillRule}"` : null,
        xlinkHref ? `xlinkHref="${xlinkHref}"` : null,
      ];

      return `<path ${props.filter(Boolean).join(" ")} />`;
    });

    const reactIconCode = Mustache.render(
      iconTemplateStr,
      {
        name: iconInfo.pascalName,
        paths: paths.join(),
      },
      {},
      { escape: v => v as string },
    );

    return Promise.all([
      fs.writeFile(
        path.join(distDir, `${iconInfo.pascalName}.tsx`),
        reactIconCode,
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

  await Promise.all(reactComponentPromises);

  await Promise.all([
    await execCmd(["shx", "cp", baseIconFile, distDir].join(" ")),
    await execCmd(["tsc", "--project", tsconfigFile].join(" ")),
  ]);

  await execCmd(`shx ls ${distDir}/*.tsx | xargs rm`);

  console.log("✅ react icons generated.");
};

void (async () => {
  console.time("build");
  await execCmd(["shx", "rm", "-rf", distDir].join(" "));
  await generateComponents();
  await createModulePackages(distDir);
  console.timeEnd("build");
})();
/* eslint-enable no-console */