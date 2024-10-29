import * as fs from "node:fs/promises";
import * as path from "node:path";
import { rimraf } from "rimraf";
import * as sass from "sass";
import { fileURLToPath } from "url";
import {
  createMainPackage,
  createNPMRC,
  ensureDirExists,
} from "../../../scripts/utils";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDir = path.resolve(__dirname, "..");
const distPath = path.join(packageDir, "dist");

/* eslint-disable no-console */
const compile = async () => {
  console.log("> compiling...");
  await ensureDirExists(distPath);

  const entryPoint = path.join(packageDir, "src/index.scss");
  const output = path.join(distPath, "index.css");

  const { css } = sass.compile(entryPoint);

  await fs.writeFile(output, css, { encoding: "utf-8", flag: "w" });
};

void (async () => {
  console.time("build");
  await rimraf(distPath);
  await compile();
  await createMainPackage(packageDir, distPath, {
    main: "index.css",
  });
  await createNPMRC(distPath);
  console.timeEnd("build");
})();
/* eslint-enable no-console */
