/* eslint-disable no-console */
import { exec } from "node:child_process";
import * as path from "node:path";
import { promisify } from "node:util";
import { ensureDirExists, getFileMeta } from "../../../scripts/utils.ts";

const execCmd = promisify(exec);

const { dirname } = getFileMeta(import.meta.url);

const packageDir = path.resolve(dirname, "..");
const srcDir = path.join(packageDir, "src");
const vars = path.join(srcDir, "default-theme.css");

const generate = async () => {
  console.log("🧩 generating variables...");

  await execCmd(["shx", "rm", "-rf", vars].join(" "));
  await ensureDirExists(vars);

  // TODO: generate css

  console.log("✅ generation completed.");
};

void (async () => {
  console.time("generate");
  await generate();
  console.timeEnd("generate");
})();
/* eslint-enable no-console */
