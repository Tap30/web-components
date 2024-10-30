/* eslint-disable no-console */
import { exec } from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { promisify } from "node:util";
import postcss from "postcss";
import dedupSelectors from "postcss-combine-duplicated-selectors";
import atImport from "postcss-import";
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
const outputPath = path.join(distPath, "index.css");

const compile = async () => {
  console.log("> compiling...");

  await execCmd(["shx", "rm", "-rf", distPath].join(" "));
  await ensureDirExists(distPath);
  await execCmd(["shx", "cp", "-r", entryPoint, outputPath].join(" "));

  const entryContent = await fs.readFile(entryPoint, { encoding: "utf-8" });

  // TODO: apparently `postcss-merge-rules` can't resolve `:root` selectors
  // Requires further investigation
  const { css } = await postcss([atImport(), dedupSelectors()])
    .process(entryContent, {
      from: entryPoint,
    })
    .async();

  await fs.writeFile(outputPath, css, { encoding: "utf-8", flag: "w" });
};

void (async () => {
  console.time("build");
  await compile();
  await createMainPackage(packageDir, distPath, {
    main: "index.css",
  });
  await createNPMRC(distPath);
  console.timeEnd("build");
})();
/* eslint-enable no-console */
