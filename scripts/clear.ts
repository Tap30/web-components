import { deleteAsync } from "del";
import { argv } from "node:process";

/**
 * Deletes everything matching the given globs. With `--dry-run`, only lists
 * what would be deleted.
 */
const clear = async (globs: string[], dryRun: boolean) => {
  // `dot`, so a glob like `**/dist` also reaches output under dot-directories
  // (`docs/.vitepress/dist`).
  const deletedDirs = await deleteAsync(globs, { dryRun, dot: true });

  console.log(
    `🔥 ${dryRun ? "would delete" : "deleted"}: ${deletedDirs.join(",")}`,
  );
};

void (async () => {
  console.time("clear");

  const args = argv.slice(2);
  const dryRun = args.includes("--dry-run");

  await clear(
    args.filter(arg => arg !== "--dry-run"),
    dryRun,
  );

  console.timeEnd("clear");
})();
