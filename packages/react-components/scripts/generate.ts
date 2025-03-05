/* eslint-disable no-console */
import Mustache from "mustache";
import { exec } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { Transform } from "node:stream";
import { promisify } from "node:util";
import { chain } from "stream-chain";
import Parser from "stream-json/Parser";
import StreamValues from "stream-json/streamers/StreamValues";
import { fileExists, getFileMeta } from "../../../scripts/utils.ts";
import { type Component, type Metadata } from "../../../types/docs.ts";

const asyncExec = promisify(exec);

const COMPONENT_NAMESPACE = "ComponentNamespace";
const LIT_REACT_NAMESPACE = "LitReact";

const { dirname } = getFileMeta(import.meta.url);

const packageDir = path.resolve(dirname, "..");
const workspaceDir = path.resolve(packageDir, "../../");
const srcDir = path.join(packageDir, "src");
const templatesDir = path.join(packageDir, "templates");

const barrelFilePath = path.join(srcDir, "index.ts");
const metadataGeneratorPath = path.join(
  workspaceDir,
  "scripts/generate-metadata.ts",
);

const componentTemplatePath = path.join(templatesDir, "component.txt");
const metadataPath = path.join(workspaceDir, "dist/components-metadata.json");

const START_COMMENT = "/* START: AUTO-GENERATED [DO_NOT_REMOVE] */";
const END_COMMENT = "/* END: AUTO-GENERATED [DO_NOT_REMOVE] */";

const getComponentImports = (component: Component) => {
  return [
    `import * as ${LIT_REACT_NAMESPACE} from "@lit/react";`,
    `import * as React from "react";`,
    `import * as ${COMPONENT_NAMESPACE} from "${component.importPaths.webComponents}";`,
  ].join("\n");
};

const getComponentCode = async (component: Component): Promise<string> => {
  const componentTemplateStr = await fs.promises.readFile(
    componentTemplatePath,
    { encoding: "utf-8" },
  );

  const events = `{ ${
    component.events
      ?.map(event => {
        const eventName = event.name;
        const eventClass = event.type.text;

        const eventNameInReact = [
          `on`,
          String(eventName).charAt(0).toUpperCase() +
            String(eventName).slice(1),
        ].join("");

        if (eventClass === "Event") {
          return null;
        }

        return `${eventNameInReact}: '${eventName}' as ${LIT_REACT_NAMESPACE}.EventName<${COMPONENT_NAMESPACE}.${eventClass}>`;
      })
      .filter(event => event !== null)
      .join(",") || ""
  } }`;

  return Mustache.render(
    componentTemplateStr,
    {
      componentName: component.name.replace("Tapsi", ""),
      elementTag: component.tagName,
      elementClass: `${COMPONENT_NAMESPACE}.${component.name}`,
      events,
    },
    {},
    { escape: v => v as string },
  );
};

const generateExports = (componentName: string) => {
  return [
    `const ${componentName} = __${componentName};\n`,
    `export default ${componentName};`,
  ].join("\n");
};

const transformToComponentsMetadata = new Transform({
  objectMode: true,
  transform(
    chunk: {
      key: PropertyKey;
      value: Metadata;
    },
    _,
    callback,
  ) {
    callback(null, chunk.value.components);
  },
});

const transformToComponentModule = new Transform({
  objectMode: true,
  async transform(chunk: Component[], _, callback) {
    for (const component of chunk) {
      const componentName = component.name.replace("Tapsi", "");

      const modulePath = path.join(srcDir, `${componentName}.ts`);
      const moduleExists = fileExists(modulePath);

      const componentCode = await getComponentCode(component);

      if (moduleExists) {
        const tempModulePath = path.join(srcDir, `${componentName}.temp.ts`);

        const readModule = fs.createReadStream(modulePath, {
          encoding: "utf-8",
          autoClose: true,
        });

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
          getComponentImports(component),
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
        `export { default as ${componentName} } from "./${componentName}.ts";\n`,
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
    ["tsx", metadataGeneratorPath].join(" "),
  );

  if (stderr) console.error(stderr);
  if (stdout) console.log(stdout);

  console.log("🧩 generating react components...");

  if (fileExists(barrelFilePath)) await fs.promises.rm(barrelFilePath);

  fs.createReadStream(metadataPath, {
    autoClose: true,
    encoding: "utf-8",
  })
    .pipe(
      chain([
        Parser.make(),
        StreamValues.make(),
        transformToComponentsMetadata,
        transformToComponentModule,
      ] as const),
    )
    .on("finish", () => {
      console.log("✅ react components generated.");
      console.timeEnd("generate");
    });
})();
/* eslint-enable no-console */
