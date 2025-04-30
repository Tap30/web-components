import { deleteAsync } from "del";
import { argv } from "node:process";

const clear = async (globs: string[]) => {
  const deletedDirs = await deleteAsync(globs);

  console.log(`🔥 deleted: ${deletedDirs.join(",")}`);
};

void (async () => {
  console.time("clear");

  await clear(argv.slice(2));

  console.timeEnd("clear");
})();
