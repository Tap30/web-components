import { globby } from "globby";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { ensureDirExists, getFileMeta } from "../../../scripts/utils.ts";

/**
 * `tsc` does not emit CSS, so the stylesheets are mirrored into `dist/`
 * separately, preserving their path so `dist/ride/light.css` sits beside the
 * `light.js` compiled from the same directory.
 */

const { dirname } = getFileMeta(import.meta.url);

const packageDir = path.resolve(dirname, "..");
const srcDir = path.join(packageDir, "src");
const distDir = path.join(packageDir, "dist");

void (async () => {
  console.time("copy-css-vars");

  const files = await globby(path.join(srcDir, "**/*.css"));

  if (files.length === 0) {
    throw new Error(
      `No CSS found under ${srcDir}. The token sets are committed source, so an ` +
        `empty result means they were deleted rather than not yet built.`,
    );
  }

  for (const file of files) {
    const target = path.join(distDir, path.relative(srcDir, file));

    await ensureDirExists(path.dirname(target));
    await fs.copyFile(file, target);
  }

  console.log(`✅ copied ${String(files.length)} stylesheet(s) into dist/`);
  console.timeEnd("copy-css-vars");
})();
