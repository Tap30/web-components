/* eslint-disable no-console */
import * as fs from "node:fs";
import * as path from "node:path";

export const dirExists = (dirPath: string) => {
  return fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();
};

export const ensureDirExists = (dirPath: string) => {
  if (dirExists(dirPath)) return;

  return fs.promises.mkdir(dirPath, { recursive: true });
};

export const createNPMRC = async (dirPath: string) => {
  console.log("> making package publishable...");
  const npmrcPath = path.join(dirPath, ".npmrc");
  const npmignorePath = path.join(dirPath, ".npmignore");

  await fs.promises.writeFile(
    npmrcPath,
    [
      "//registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN}",
      "registry=https://registry.npmjs.org/",
      "always-auth=true",
    ].join("\n"),
  );

  await fs.promises.writeFile(npmignorePath, ".npmrc");
};

export const createMainPackage = async (
  packageDir: string,
  distDir: string,
  packageJSONOptions: Record<string, unknown> = {},
) => {
  console.log("> creating main package...");
  const originalPackageJSONPath = path.join(packageDir, "package.json");
  const distPackageJSONPath = path.join(distDir, "package.json");

  type PackageJSON = Record<string, unknown>;

  const packageJSON = JSON.parse(
    await fs.promises.readFile(originalPackageJSONPath, "utf-8"),
  ) as PackageJSON;

  await fs.promises.writeFile(
    distPackageJSONPath,
    JSON.stringify(
      {
        ...packageJSONOptions,
        sideEffects: false,
        engines: packageJSON.engines,
        name: packageJSON.name,
        type: packageJSON.type,
        version: packageJSON.version,
        license: packageJSON.license,
        homepage: packageJSON.homepage,
        description: packageJSON.description,
        keywords: packageJSON.keywords,
        repository: packageJSON.repository,
        dependencies: packageJSON.dependencies,
        peerDependencies: packageJSON.peerDependencies,
        peerDependenciesMeta: packageJSON.peerDependenciesMeta,
      },
      null,
      2,
    ),
  );
};
/* eslint-enable no-console */
