import { globby } from "globby";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { ensureDirExists, getFileMeta } from "../../../scripts/utils.ts";

/**
 * `tsc` does not emit CSS, so it has to be copied into `dist/` separately.
 *
 * Two outputs, both required:
 *
 * 1. Each stylesheet mirrored to the SAME relative path as its JS. `tsc` emits
 *    `import "./button.css"` verbatim into `dist/button/button.js`, so
 *    `dist/button/button.css` must sit beside it or the import 404s at runtime.
 *
 * 2. An aggregate `dist/styles.css`. Consumers whose bundler is configured to
 *    ignore CSS inside `node_modules` import this once instead. Purely
 *    additive — it does not replace (1).
 */

const { dirname } = getFileMeta(import.meta.url);

const packageDir = path.resolve(dirname, "..");
const srcDir = path.join(packageDir, "src");
const distDir = path.join(packageDir, "dist");
const aggregateFile = path.join(distDir, "styles.css");

const copyCss = async () => {
  const cssFiles = (await globby(path.join(srcDir, "**/*.css"))).sort();

  if (cssFiles.length === 0) {
    throw new Error(
      `No CSS found under ${srcDir}. Components side-effect-import their own ` +
        `stylesheets, so an empty result means the build would ship broken imports.`,
    );
  }

  const chunks: string[] = [];

  for (const cssFile of cssFiles) {
    const relativePath = path.relative(srcDir, cssFile);
    const target = path.join(distDir, relativePath);

    await ensureDirExists(path.dirname(target));
    await fs.copyFile(cssFile, target);

    const contents = await fs.readFile(cssFile, "utf8");

    chunks.push(`/* ${relativePath} */\n${contents.trim()}\n`);
  }

  await ensureDirExists(distDir);
  await fs.writeFile(aggregateFile, chunks.join("\n"), "utf8");

  console.log(
    `✅ copied ${String(cssFiles.length)} stylesheet(s) and wrote dist/styles.css`,
  );
};

void (async () => {
  console.time("copy-css");
  await copyCss();
  console.timeEnd("copy-css");
})();
