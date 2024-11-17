/* eslint-disable no-console */
import { exec } from "node:child_process";
import * as path from "node:path";
import { promisify } from "node:util";
import { createModulePackages, getFileMeta } from "../../../scripts/utils";

const { dirname } = getFileMeta(import.meta.url);

const packageDir = path.resolve(dirname, "..");
const distDir = path.join(packageDir, "dist");

const tsconfigPath = path.resolve(packageDir, "tsconfig.build.json");

const transpile = async () => {
  const execCmd = promisify(exec);

  console.log(`👾 transpiling...`);

  await execCmd(["shx", "rm", "-rf", distDir].join(" "));

  const { stderr, stdout } = await execCmd(
    ["tsc", "--project", tsconfigPath].join(" "),
  );

  if (stdout) console.log(stdout);
  if (stderr) console.error(stderr);

  console.log(`✅ transpilation completed.`);
};

void (async () => {
  console.time("build");
  await transpile();
  await createModulePackages(distDir);
  console.timeEnd("build");
})();
/* eslint-enable no-console */
