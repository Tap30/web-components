/* eslint-disable no-console */
import glob from "fast-glob";
import { exec } from "node:child_process";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { dirExists, ensureDirExists } from "./utils";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workspaceDir = path.resolve(__dirname, "..");
const packagesDists = glob
  .sync(path.join(workspaceDir, "packages/*/package.json"))
  .map(p => path.join(path.dirname(p), "dist"));

void (async () => {
  const execCmd = promisify(exec);
  const distPath = path.join(workspaceDir, "dist");

  await ensureDirExists(distPath);

  for (const packageDist of packagesDists) {
    if (!dirExists(packageDist)) continue;

    const packageDir = path.dirname(packageDist);
    const packageName = path.basename(packageDir);
    const distPackageName = path.join(distPath, packageName);

    const { stderr, stdout } = await execCmd(
      ["shx", "cp", "-r", packageDist, distPackageName].join(" "),
    );

    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  }
})();
/* eslint-enable no-console */
