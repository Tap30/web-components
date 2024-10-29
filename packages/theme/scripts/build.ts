/* eslint-disable no-console */
import { exec } from "node:child_process";
import * as path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "url";
import {
  createMainPackage,
  createNPMRC,
  ensureDirExists,
} from "../../../scripts/utils";

const execCmd = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDir = path.resolve(__dirname, "..");
const distPath = path.join(packageDir, "dist");
const entryPoint = path.join(packageDir, "src/index.css");
const output = path.join(distPath, "index.css");

void (async () => {
  console.time("build");
  await execCmd(["shx", "rm", "-rf", distPath].join(" "));
  await ensureDirExists(distPath);
  await execCmd(["shx", "cp", "-r", entryPoint, output].join(" "));
  await createMainPackage(packageDir, distPath, {
    main: "index.css",
  });
  await createNPMRC(distPath);
  console.timeEnd("build");
})();
/* eslint-enable no-console */
