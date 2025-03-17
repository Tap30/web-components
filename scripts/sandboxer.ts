/* eslint-disable no-console */
import globAsync from "fast-glob";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { getFileMeta } from "./utils.ts";

const { dirname } = getFileMeta(import.meta.url);

const workspaceDir = path.join(dirname, "..");
const examplesDir = path.join(workspaceDir, "examples");

const examplesGlobPath = path.join(examplesDir, "**");

const extractExamples = async () => {
  const examplesDirs = (await fs.readdir(examplesDir, { withFileTypes: true }))
    .filter(content => content.isDirectory())
    .map(dir => path.join(examplesDir, dir.name));

  return examplesDirs.reduce<
    Promise<Record<"projects" | "standalones", string[]>>
  >(
    async (result, dir) => {
      const content = await fs.readdir(dir);

      if (content.includes("package.json")) (await result).projects.push(dir);
      else (await result).standalones.push(dir);

      return result;
    },
    Promise.resolve({
      projects: [],
      standalones: [],
    }),
  );
};

const deployStandalones = async (files: string[]) => {
  const promises = files.map(async file => {
    const examples = await globAsync(path.join(file, "**/*.example.*"));

    return examples.map(async example => {
      const examplePath = path.relative(workspaceDir, example);

      const fetchedInfo = await fetchFiles({
        examplePath,
        gitInfo: {
          host: "github",
          account: "tap30",
          repository: "web-components",
          branch: "chore/examples",
        },
      });

      return null;
    });
  });

  return Promise.all(promises);
};

const deploy = async () => {
  const { standalones } = await extractExamples();

  return Promise.all([deployStandalones(standalones)]);
};

void (async () => {
  console.time("generate");
  await deploy();
  console.timeEnd("generate");
})();
/* eslint-enable no-console */
