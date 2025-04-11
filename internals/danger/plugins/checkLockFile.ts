import { type PluginRuntime } from "../DangerClient.ts";

export const checkLockFile: PluginRuntime = async client => {
  const packageJsonDiff = await client.git.JSONDiffForFile("package.json");
  const dependenciesChanged = !!(
    packageJsonDiff?.devDependencies || packageJsonDiff?.dependencies
  );

  const modifiedFiles = [
    ...client.git.created_files,
    ...client.git.modified_files,
  ];

  const lockfileChanged = modifiedFiles.includes("pnpm-lock.yaml");

  if (dependenciesChanged !== lockfileChanged) {
    client.failWithFootnote(
      "🔒 The lock file looks outdated!",
      [
        "The dependencies in package.json have been modified, but the lock file (pnpm-lock.yaml) is not updated.",
        "Ensure both files are synchronized to prevent potential dependency mismatches using `pnpm install` command",
      ].join("/n"),
    );
  }
};
