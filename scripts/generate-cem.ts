/* eslint-disable no-console */
import { exec } from "node:child_process";
import * as path from "node:path";
import { cwd } from "node:process";
import { promisify } from "node:util";
import { getFileMeta } from "./utils.ts";

const { dirname } = getFileMeta(import.meta.url);

const workspaceDir = path.resolve(dirname, "..");
const distDir = path.relative(cwd(), path.join(workspaceDir, "dist"));

const entrypoint = path.resolve(workspaceDir, "./packages/web-components/src");

const globs: string[] = [
  `${entrypoint}/**/index.ts`,
  `${entrypoint}/**/*/index.ts`,
  `!${entrypoint}/utils/**`,
  `!${entrypoint}/internals/**`,
];

void (async () => {
  console.log("🧩 generating custom elements manifest...");

  const asyncExec = promisify(exec);

  await asyncExec(`shx rm -rf ${distDir}`);
  await asyncExec(
    [
      "cem",
      "analyze",
      "--litelement",
      "--outdir",
      distDir,
      globs.map(g => `--globs ${g}`).join(" "),
    ].join(" "),
  );

  console.log("✅ custom elements manifest generated.");
})();
/* eslint-enable no-console */
