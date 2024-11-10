/* eslint-disable no-console */
import glob from "fast-glob";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

export const fileExists = (filePath: string) => {
  try {
    fs.lstatSync(filePath);

    return true;
  } catch {
    return false;
  }
};

export const dirExists = (dirPath: string) => {
  return fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();
};

export const ensureDirExists = (dirPath: string) => {
  if (dirExists(dirPath)) return;

  return fs.promises.mkdir(dirPath, { recursive: true });
};

export const getFileMeta = (fileURL: string | URL) => {
  const __filename = fileURLToPath(fileURL);
  const __dirname = path.dirname(__filename);

  return { filename: __filename, dirname: __dirname };
};

export const createModulePackages = (distDir: string) => {
  console.log("> creating module packages...");

  const moduleDirs = glob
    .sync(path.join(distDir, "**/index.js"))
    .map(p => path.dirname(p));

  const promises = moduleDirs.map(async moduleDir => {
    const typesPath = path.join(moduleDir, "index.d.ts");
    const packageJSONPath = path.join(moduleDir, "package.json");

    return fs.promises.writeFile(
      packageJSONPath,
      JSON.stringify(
        {
          sideEffects: false,
          types: fileExists(typesPath) ? "./index.d.ts" : undefined,
          main: "./index.js",
        },
        null,
        2,
      ),
    );
  });

  return Promise.all(promises);
};
/* eslint-enable no-console */
