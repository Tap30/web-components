import * as path from "node:path";
import { getFileMeta } from "../../../scripts/utils";
import transpile from "./transpile";

const { dirname } = getFileMeta(import.meta.url);

const packageDir = path.resolve(dirname, "..");
const distDir = path.join(packageDir, "dist");

const tsconfigPath = path.resolve(packageDir, "tsconfig.dev.json");

void transpile({
  tsconfigPath,
  distDir,
  watch: true,
});
