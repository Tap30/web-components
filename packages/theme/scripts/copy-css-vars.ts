import { globby } from "globby";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { getFileMeta } from "../../../scripts/utils.ts";

const { dirname } = getFileMeta(import.meta.url);

const packageDir = path.resolve(dirname, "..");
const srcDir = path.join(packageDir, "src");
const distDir = path.join(packageDir, "dist");
const varsGlobPath = path.join(srcDir, "**/tokens.css");

const copyCssVars = async () => {
  const varsFiles = await globby(varsGlobPath);
  const promises: Promise<void[]>[] = [];

  for (const varsFile of varsFiles) {
    const varsPath = path.normalize(varsFile);
    const themeDir = path.dirname(varsPath);
    const theme = path.basename(themeDir);

    promises.push(
      Promise.all([
        fs.copyFile(varsPath, path.join(distDir, "cjs", theme, "tokens.css")),
        fs.copyFile(varsPath, path.join(distDir, "esm", theme, "tokens.css")),
      ]),
    );
  }

  await Promise.all(promises);
};

void (async () => {
  console.time("copy-css-vars");
  await copyCssVars();
  console.timeEnd("copy-css-vars");
})();
