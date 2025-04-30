import { globby } from "globby";
import { exec } from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { promisify } from "node:util";
import { getFileMeta } from "../../../scripts/utils.ts";
import type { Tokens } from "../src/types.ts";

type ModuleWithDefaultExport<T> = {
  default: T;
};

const execCmd = promisify(exec);

const { dirname } = getFileMeta(import.meta.url);

const packageDir = path.resolve(dirname, "..");
const srcDir = path.join(packageDir, "src");
const tokensGlobPath = path.join(srcDir, "**/tokens.ts");

const generateVar = (
  entries: Array<[PropertyKey, unknown]>,
  result: string[] = [],
  varPath: PropertyKey[] = [],
): string[] => {
  for (const entry of entries) {
    const [key, val] = entry;

    const hasPrimitiveVal = typeof val === "number" || typeof val === "string";

    varPath.push(key);

    if (hasPrimitiveVal) {
      result.push(`--tapsi-${varPath.join("-")}: ${val};`);
    } else if (val !== null && typeof val === "object") {
      generateVar(Object.entries(val), result, varPath);
    }

    varPath.pop();
  }

  return result;
};

const generateVars = async (tokensPath: string, varsPath: string) => {
  await execCmd(["shx", "rm", "-rf", varsPath].join(" "));

  let tokensModule: ModuleWithDefaultExport<Tokens> | null = null;

  try {
    tokensModule = (await import(
      tokensPath
    )) as ModuleWithDefaultExport<Tokens>;
  } catch (err) {
    console.error(`Couldn't resolve module at ${tokensPath}.`, { err });

    return Promise.resolve();
  }

  const { default: tokens } = tokensModule;

  const vars = [
    ":root {",
    generateVar(Object.entries(tokens)).join("\n"),
    "}",
  ].join("\n");

  await fs.writeFile(varsPath, vars, { encoding: "utf-8" });
  await execCmd(`prettier ${varsPath} --write`);
};

const generate = async () => {
  const tokensFiles = await globby(tokensGlobPath);
  const promises: Promise<void>[] = [];

  for (const tokensFile of tokensFiles) {
    const tokensPath = path.normalize(tokensFile);
    const themeDir = path.dirname(tokensPath);
    const theme = path.basename(themeDir);
    const varsPath = path.join(themeDir, "tokens.css");

    console.log(`🧩 generating variables for ${theme}...`);

    promises.push(generateVars(tokensPath, varsPath));
  }

  await Promise.all(promises);

  console.log("✅ generation completed.");
};

void (async () => {
  console.time("generate");
  await generate();
  console.timeEnd("generate");
})();
