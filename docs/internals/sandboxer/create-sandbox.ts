/* eslint-disable no-console */
import { getParameters } from "codesandbox/lib/api/define.js";
import globAsync from "fast-glob";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { getFileMeta } from "../../../scripts/utils.ts";

const { dirname } = getFileMeta(import.meta.url);

const workspaceDir = path.join(dirname, "../..");
const examplesDir = path.join(workspaceDir, "examples");
const templatesDir = path.join(dirname, "templates");
const sandboxesJsonPath = path.join(examplesDir, "sandboxes.json");

const extractExamples = () => {
  const standalones = globAsync(
    path.join(examplesDir, "**/*.example.{ts,tsx}"),
  );

  const projects = globAsync(path.join(examplesDir, "**/package.json"));

  return { standalones, projects };
};

const createStandaloneSandboxes = async (examples: string[]) => {
  const readOptions = {
    encoding: "utf-8",
  } as const satisfies {
    encoding: BufferEncoding;
  };

  const [indexTsxTemplate, indexHtmlTemplate, packageJsonTemplate] =
    await Promise.all([
      fs.readFile(path.join(templatesDir, "index.tsx.template"), readOptions),
      fs.readFile(path.join(templatesDir, "index.html.template"), readOptions),
      fs.readFile(
        path.join(templatesDir, "package.json.template"),
        readOptions,
      ),
    ]);

  type SandboxFiles = Parameters<typeof getParameters>[0]["files"];

  const files = {
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
      content: "",
      isBinary: false,
    },
  } satisfies SandboxFiles;

  const promises = examples.map(async example => {
    const pathInfo = path.parse(example);
    const exampleName = path.basename(example, `.example${pathInfo.ext}`);

    const code = await fs.readFile(example, {
      encoding: "utf-8",
    });

    files["Example.tsx"].content = code;

    const response = await fetch(
      `https://codesandbox.io/api/v1/sandboxes/define?json=1`,
      {
        method: "POST",
        body: JSON.stringify({
          parameters: getParameters({
            files,
          }),
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    const body = (await response.json()) as { sandbox_id: string };
    const sandboxUrl = `https://codesandbox.io/embed/${body.sandbox_id}`;

    return { exampleName, sandboxUrl };
  });

  return Promise.all(promises);
};

const generateSandboxes = async () => {
  const examples = extractExamples();

  const [standalones] = await Promise.all([
    examples.standalones,
    examples.projects,
  ]);

  const [standaloneSandboxes] = await Promise.all([
    createStandaloneSandboxes(standalones),
  ]);

  return fs.writeFile(
    sandboxesJsonPath,
    JSON.stringify(
      {
        standalones: standaloneSandboxes,
      },
      null,
      2,
    ),
  );
};

void (async () => {
  console.time("sandbox");
  await generateSandboxes();
  console.timeEnd("sandbox");
})();
/* eslint-enable no-console */
