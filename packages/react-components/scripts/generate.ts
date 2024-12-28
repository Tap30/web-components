/* eslint-disable no-console */
import type { Package } from "custom-elements-manifest";
import Mustache from "mustache";
import { exec } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { Transform } from "node:stream";
import { promisify } from "node:util";
import { chain } from "stream-chain";
import Parser from "stream-json/Parser";
import StreamValues from "stream-json/streamers/StreamValues";
import { fileExists, getFileMeta } from "../../../scripts/utils";

const asyncExec = promisify(exec);

const { dirname } = getFileMeta(import.meta.url);

const packageDir = path.resolve(dirname, "..");
const workspaceDir = path.resolve(packageDir, "../../");
const srcDir = path.join(packageDir, "src");
const templatesDir = path.join(packageDir, "templates");
const webComponentsSrcDir = path.join(
  workspaceDir,
  "packages/web-components/src",
);

const barrelFilePath = path.join(srcDir, "index.ts");
const cemGeneratorPath = path.join(workspaceDir, "scripts/generate-cem.ts");
const componentTemplatePath = path.join(templatesDir, "component.txt");
const cemPath = path.join(workspaceDir, "dist/custom-elements.json");

const START_COMMENT = "/* START: AUTO-GENERATED [DO_NOT_REMOVE] */";
const END_COMMENT = "/* END: AUTO-GENERATED [DO_NOT_REMOVE] */";

const generateImports = (
  elementClass: string,
  moduleResolutionRegistryPath: string,
) => {
  return [
    `import { createComponent } from "@lit/react";`,
    `import * as React from "react";`,
    `import { ${elementClass} } from "${moduleResolutionRegistryPath}";`,
  ].join("\n");
};

const generateExports = (componentName: string) => {
  return [
    `const ${componentName} = __${componentName};\n`,
    `export default ${componentName};`,
  ].join("\n");
};

type ComponentData = Array<{
  webComponentResolutionPath: string;
  elementTag: string;
  elementClassName: string;
  componentName: string;
  componentCode: string;
}>;

const transformToCEM = new Transform({
  objectMode: true,
  transform(
    chunk: {
      key: PropertyKey;
      value: Package;
    },
    _,
    callback,
  ) {
    callback(null, chunk.value);
  },
});

const transformToComponentData = new Transform({
  objectMode: true,
  async transform(chunk: Package, _, callback) {
    const streamData: ComponentData = [];

    for (const module of chunk.modules) {
      if (module.kind !== "javascript-module") continue;

      const moduleSrc = module.path;
      const moduleDir = path.dirname(moduleSrc);
      const relativePath = path.relative(webComponentsSrcDir, moduleDir);

      const ceDefinitions = (module.exports ?? []).filter(
        ex => ex.kind === "custom-element-definition",
      );

      if (ceDefinitions.length === 0) {
        console.error(`No "custom-element-definition" found for ${moduleSrc}.`);

        continue;
      }

      const webComponentResolutionPath = `@tapsioss/web-components/${relativePath}`;

      for (const ceDefinition of ceDefinitions) {
        const elementTag = ceDefinition.name;
        const elementClassName = ceDefinition.declaration.name;
        const componentName = elementClassName.replace("Tapsi", "");

        const componentTemplateStr = await fs.promises.readFile(
          componentTemplatePath,
          { encoding: "utf-8" },
        );

        const componentCode = Mustache.render(
          componentTemplateStr,
          {
            componentName,
            elementTag,
            elementClass: elementClassName,
            events: JSON.stringify({}, null, 2),
          },
          {},
          { escape: v => v as string },
        );

        streamData.push({
          webComponentResolutionPath,
          elementTag,
          elementClassName,
          componentName,
          componentCode,
        });
      }
    }

    callback(null, streamData);
  },
});

const transformToComponentModule = new Transform({
  objectMode: true,
  async transform(chunk: ComponentData, _, callback) {
    for (const component of chunk) {
      const {
        componentCode,
        componentName,
        elementClassName,
        webComponentResolutionPath,
      } = component;

      const modulePath = path.join(srcDir, `${componentName}.ts`);
      const moduleExists = fileExists(modulePath);

      if (moduleExists) {
        const tempModulePath = path.join(srcDir, `${componentName}.temp.ts`);

        const injectComponentCode = new Transform({
          transform(chunk: Buffer, _, callback) {
            const lines = chunk.toString("utf-8").split("\n");

            let isInsideBlock = false;

            const transformedLines = lines
              .map(line => {
                if (line.trim() === START_COMMENT) {
                  isInsideBlock = true;

                  return `${line}\n${componentCode}`;
                } else if (line.trim() === END_COMMENT) {
                  isInsideBlock = false;

                  return line;
                } else if (isInsideBlock) {
                  // Skip lines within block
                  return null;
                }

                return line;
              })
              .filter(lines => lines !== null);

            callback(null, transformedLines.join("\n"));
          },
        });

        const readModule = fs.createReadStream(modulePath, {
          encoding: "utf-8",
          autoClose: true,
        });

        const writeToTemp = fs.createWriteStream(tempModulePath, {
          encoding: "utf-8",
          flags: "w",
          autoClose: true,
        });

        readModule
          .pipe(injectComponentCode)
          .pipe(writeToTemp)
          .on("finish", () => {
            fs.renameSync(tempModulePath, modulePath);
          });
      } else {
        const moduleContent = [
          generateImports(elementClassName, webComponentResolutionPath),
          "\n",
          START_COMMENT,
          componentCode,
          END_COMMENT,
          "\n",
          generateExports(componentName),
        ].join("\n");

        await fs.promises.writeFile(modulePath, moduleContent, {
          encoding: "utf-8",
          flag: "w",
        });
      }

      await fs.promises.appendFile(
        barrelFilePath,
        `export { default as ${componentName} } from "./${componentName}";\n`,
        {
          encoding: "utf-8",
        },
      );
    }

    callback();
  },
  async final(callback) {
    await asyncExec(`prettier ${srcDir}/**/* --write --fix`);

    callback();
  },
});

void (async () => {
  console.time("generate");
  const { stdout, stderr } = await asyncExec(
    ["tsx", cemGeneratorPath].join(" "),
  );

  if (stderr) console.error(stderr);
  if (stdout) console.log(stdout);

  console.log("🧩 generating react components...");

  if (fileExists(barrelFilePath)) await fs.promises.rm(barrelFilePath);

  fs.createReadStream(cemPath, {
    autoClose: true,
    encoding: "utf-8",
  })
    .pipe(
      chain([
        Parser.make(),
        StreamValues.make(),
        transformToCEM,
        transformToComponentData,
        transformToComponentModule,
      ] as const),
    )
    .on("finish", () => {
      console.log("✅ react components generated.");
      console.timeEnd("generate");
    });
})();
/* eslint-enable no-console */
