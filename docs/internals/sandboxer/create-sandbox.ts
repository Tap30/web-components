/* eslint-disable no-console */
import { getParameters } from "codesandbox/lib/api/define.js";
import globAsync from "fast-glob";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { getFileMeta } from "../../../scripts/utils.ts";

const { dirname } = getFileMeta(import.meta.url);

const workspaceDir = path.join(dirname, "../../..");
const examplesDir = path.join(workspaceDir, "examples");
const templatesDir = path.join(dirname, "templates");

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

const deployStandalones = async (
  files: string[],
  templates: {
    indexTsxTemplate: string;
    packageJsonTemplate: string;
    indexHtmlTemplate: string;
  },
) => {
  const { indexTsxTemplate, packageJsonTemplate, indexHtmlTemplate } =
    templates;

  const promises = files.map(async file => {
    const examples = await globAsync(path.join(file, "**/*.example.*"));

    return examples.map(async example => {
      const examplePath = path.relative(workspaceDir, example);
      const code = await fs.readFile(examplePath, {
        encoding: "utf-8",
      });

      const parameters = getParameters({
        files: {
          "package.json": {
            content: packageJsonTemplate,
            isBinary: false,
          },
          "index.tsx": {
            content: indexTsxTemplate,
            isBinary: false,
          },
          "index.html": {
            content: indexHtmlTemplate,
            isBinary: false,
          },
          "Example.tsx": {
            content: code,
            isBinary: false,
          },
        },
      });

      const response = await fetch(
        `https://codesandbox.io/api/v1/sandboxes/define?json=1`,
        {
          method: "POST",
          body: JSON.stringify({
            parameters,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      const body = (await response.json()) as { sandbox_id: string };
      const sandboxUrl = `https://codesandbox.io/embed/${body.sandbox_id}`;

      console.log(sandboxUrl);

      return sandboxUrl;
    });
  });

  return Promise.all(promises);
};

const createSandbox = async (exampleName: string) => {
  const { standalones } = await extractExamples();

  const indexTsxTemplate = await fs.readFile(
    path.join(templatesDir, "index.tsx.template"),
    {
      encoding: "utf-8",
    },
  );

  const indexHtmlTemplate = await fs.readFile(
    path.join(templatesDir, "index.html.template"),
    {
      encoding: "utf-8",
    },
  );

  const packageJsonTemplate = await fs.readFile(
    path.join(templatesDir, "package.json.template"),
    {
      encoding: "utf-8",
    },
  );

  return Promise.all([
    deployStandalones(standalones, {
      indexTsxTemplate,
      indexHtmlTemplate,
      packageJsonTemplate,
    }),
  ]);
};

void createSandbox();
/* eslint-enable no-console */
