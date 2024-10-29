/* eslint-disable no-console */
import { exec } from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { argv, exit } from "node:process";
import { fileURLToPath } from "node:url";
import { parseArgs, promisify } from "node:util";
import { prerelease, valid } from "semver";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workspaceDir = path.resolve(__dirname, "..");

const PACKAGES_MAP = {
  // For icons we will have seperate distributions:
  // 1. [@tapsioss/rasti-react-icons][icons/dist/react]
  // 2. [@tapsioss/rasti-web-icons][icons/dist/web]
  "@tapsioss/rasti-icons": {
    "@tapsioss/rasti-react-icons": path.resolve(
      workspaceDir,
      "packages/icons/dist/react",
    ),
    "@tapsioss/rasti-web-icons": path.resolve(
      workspaceDir,
      "packages/icons/dist/web",
    ),
  },
  "@tapsioss/rasti-react-components": path.resolve(
    workspaceDir,
    "packages/react-components",
  ),
  "@tapsioss/rasti-web-components": path.resolve(
    workspaceDir,
    "packages/web-components",
  ),
  "@tapsioss/rasti-theme": path.resolve(workspaceDir, "packages/theme"),
} as const;

type PackageNames = keyof typeof PACKAGES_MAP;

const args = argv.slice(2);

const { values } = parseArgs({
  args,
  options: {
    ["package-name"]: {
      type: "string",
      short: "p",
    },
  },
});

const { "package-name": packageName } = values;

if (!packageName || !(packageName in PACKAGES_MAP)) {
  const names = Object.keys(PACKAGES_MAP).map(key => `- ${key}`);

  console.error(
    [
      "ERR: No valid `package-name` arg provided. expected one of:",
      ...names,
    ].join("\n"),
  );

  exit(1);
}

const execCmd = promisify(exec);

const packageDirPath = PACKAGES_MAP[packageName as PackageNames];

const publishPackage = async (packageDistPath: string) => {
  const distPackageJSONPath = path.join(packageDistPath, "package.json");
  let distPackageJSON: Record<string, unknown>;

  try {
    distPackageJSON = JSON.parse(
      await fs.readFile(distPackageJSONPath, "utf-8"),
    ) as Record<string, unknown>;
  } catch {
    console.error(
      `ERR: No such file or directory. Expected '${distPackageJSONPath}'.`,
    );

    exit(1);
  }

  if (!distPackageJSON.version) {
    console.error(
      `ERR: Invalid ${distPackageJSONPath}. Expected a valid \`version\` property.`,
    );

    exit(1);
  }

  const version = valid(distPackageJSON.version as string);

  if (!version) {
    console.error(
      `ERR: Invalid ${distPackageJSONPath}. Expected a valid \`version\` property.`,
    );

    exit(1);
  }

  const prereleaseComponents = prerelease(version);
  const tag = (prereleaseComponents?.[0] ?? "latest") as string;

  const { stderr, stdout } = await execCmd(
    `pnpm publish ${packageDistPath} --tag ${tag} --access public`,
  );

  console.log({ stdout });
  console.error({ stderr });
};

void (async () => {
  const packageDistPaths: string[] = [];

  if (typeof packageDirPath === "string") {
    packageDistPaths.push(path.join(packageDirPath, "./dist"));
  } else {
    packageDistPaths.push(
      ...Object.values(packageDirPath).map(packageDirPath =>
        path.join(packageDirPath, "./dist"),
      ),
    );
  }

  await Promise.all(packageDistPaths.map(publishPackage));
})();
/* eslint-enable no-console */
