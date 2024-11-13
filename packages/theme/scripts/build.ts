/* eslint-disable no-console */
import { exec } from "node:child_process";
import * as path from "node:path";
import { promisify } from "node:util";
import { ensureDirExists, getFileMeta } from "../../../scripts/utils";

const execCmd = promisify(exec);

const { dirname } = getFileMeta(import.meta.url);

const packageDir = path.resolve(dirname, "..");
const distPath = path.join(packageDir, "dist");
const entryPoint = path.join(packageDir, "src/index.css");
const outputPath = path.join(distPath, "index.css");

const compile = async () => {
  console.log("👾 compiling...");

  await execCmd(["shx", "rm", "-rf", distPath].join(" "));
  await ensureDirExists(distPath);

  const { stderr, stdout } = await execCmd(
    [
      "postcss",
      entryPoint,
      "-o",
      outputPath,
      "--use",
      "postcss-import",
      "--use",
      "postcss-combine-duplicated-selectors",
      "--no-map",
    ].join(" "),
  );

  if (stdout) console.log(stdout);
  if (stderr) console.error(stderr);

  console.log("✅ compilation completed.");
};

void (async () => {
  console.time("build");
  await compile();
  console.timeEnd("build");
})();
/* eslint-enable no-console */
