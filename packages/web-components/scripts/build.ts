/* eslint-disable no-console */
import * as path from "node:path";
import { createModulePackages, getFileMeta } from "../../../scripts/utils";
import transpile from "./transpile";

const { dirname } = getFileMeta(import.meta.url);

const packageDir = path.resolve(dirname, "..");
const distDir = path.join(packageDir, "dist");

const tsconfigPath = path.resolve(packageDir, "tsconfig.build.json");

void (async () => {
  console.time("build");
  await transpile({
    tsconfigPath,
    distDir,
    watch: false,
  });

  await createModulePackages(distDir);
  console.timeEnd("build");
})();
/* eslint-enable no-console */
