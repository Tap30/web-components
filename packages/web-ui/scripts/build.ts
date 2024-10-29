/* eslint-disable no-console */
import glob from "fast-glob";
import { exec } from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { rimraf } from "rimraf";
import { minify as minifyModule } from "terser";
import { createMainPackage, createNPMRC } from "../../../scripts/utils";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDir = path.resolve(__dirname, "..");
const distPath = path.join(packageDir, "dist");

const moduleDirectories = glob
  .sync(path.join(distPath, "**/index.js"))
  .map(p => path.dirname(p));

const doesFileExist = async (filePath: string) => {
  try {
    await fs.stat(filePath);

    return true;
  } catch {
    return false;
  }
};

const transpile = async () => {
  console.log("> transpiling...");
  const execCmd = promisify(exec);

  const configPath = path.resolve(packageDir, "tsconfig.build.json");

  const { stderr, stdout } = await execCmd(
    ["tsc", "--project", configPath].join(" "),
  );

  if (stdout) console.log(stdout);
  if (stderr) console.error(stderr);
};

const createModulePackages = async () => {
  console.log("> creating module packages...");
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
        },
        null,
        2,
      ),
    );
  }
};

const minify = async () => {
  console.log("> minifying...");
  const files = await glob(path.join(distPath, "**/*.js"));

  for (const file of files) {
    const source = await fs.readFile(file, { encoding: "utf8" });

    const result = await minifyModule(source, {
      module: true,
      compress: { module: true },
      mangle: { module: true },
    });

    if (result.code) await fs.writeFile(file, result.code);
  }
};

void (async () => {
  console.time("build");
  await rimraf(distPath);
  await transpile();
  await createModulePackages();
  await createMainPackage(packageDir, distPath);
  await createNPMRC(distPath);
  await minify();
  console.timeEnd("build");
})();
/* eslint-enable no-console */
