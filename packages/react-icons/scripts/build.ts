/* eslint-disable no-console */
import icons from "@tapsioss/rasti-icons";
import globAsync from "fast-glob";
import Mustache from "mustache";
import { exec } from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { ensureDirExists } from "../../../scripts/utils";

const execCmd = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDir = path.resolve(__dirname, "..");
const distDir = path.join(packageDir, "dist");
const templatesDir = path.join(packageDir, "templates");

const iconTemplate = path.join(templatesDir, "react-icon.txt");
const tsconfigFile = path.join(packageDir, "tsconfig.build.json");
const baseIconFile = path.join(packageDir, "src/base-icon.tsx");

const doesFileExist = async (filePath: string) => {
  try {
    await fs.stat(filePath);

    return true;
  } catch {
    return false;
  }
};

const generateComponents = async () => {
  console.log("> generating web components...");

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
};

const createModulePackages = async () => {
  console.log("> creating module packages...");

  const moduleDirectories = globAsync
    .sync(path.join(distDir, "**/index.js"))
    .map(p => path.dirname(p));

  for (const moduleDirectory of moduleDirectories) {
    const typesPath = path.join(moduleDirectory, "index.d.ts");
    const typesExist = await doesFileExist(typesPath);

    const packageJsonPath = path.join(moduleDirectory, "package.json");

    await fs.writeFile(
      packageJsonPath,
      JSON.stringify(
        {
          sideEffects: false,
          types: typesExist ? "./index.d.ts" : undefined,
          main: "./index.js",
          type: "module",
        },
        null,
        2,
      ),
    );
  }
};

void (async () => {
  console.time("build");
  await execCmd(["shx", "rm", "-rf", distDir].join(" "));
  await generateComponents();
  await createModulePackages();
  console.timeEnd("build");
})();
/* eslint-enable no-console */
