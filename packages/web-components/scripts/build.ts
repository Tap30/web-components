/* eslint-disable no-console */
import { exec } from "node:child_process";
import * as path from "node:path";
import { promisify } from "node:util";
import { createModulePackages, getFileMeta } from "../../../scripts/utils";

const execCmd = promisify(exec);

const { dirname } = getFileMeta(import.meta.url);

const packageDir = path.resolve(dirname, "..");
const distPath = path.join(packageDir, "dist");

const transpile = async () => {
  console.log("> transpiling...");

  const tsconfigPath = path.resolve(packageDir, "tsconfig.build.json");

  await execCmd(["shx", "rm", "-rf", distPath].join(" "));

  const { stderr, stdout } = await execCmd(
    ["tsc", "--project", tsconfigPath].join(" "),
  );

  if (stdout) console.log(stdout);
  if (stderr) console.error(stderr);
};

void (async () => {
  console.time("build");
  await transpile();
  await createModulePackages(distPath);
  console.timeEnd("build");
})();
/* eslint-enable no-console */
