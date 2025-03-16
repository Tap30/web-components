/* eslint-disable no-console */
import type { CustomElement, Export } from "custom-elements-manifest";
import Mustache from "mustache";
import { exec } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { Transform } from "node:stream";
import { promisify } from "node:util";
import { chain } from "stream-chain";
import Parser from "stream-json/Parser";
import StreamValues from "stream-json/streamers/StreamValues";
import {
  ensureDirExists,
  fileExists,
  getFileMeta,
} from "../../../scripts/utils.ts";
import { type ComponentMetadata, type Metadata } from "../../../types/docs.ts";

type ReactMetadata = {
  componentName: string;
  elementClass: string;
  elementTag: string;
  events: CustomElement["events"];
  webComponentImportPath: string;
  slotImportPath?: string;
  slots?: Export[];
};

const asyncExec = promisify(exec);

const COMPONENT_NAMESPACE = "ComponentNamespace";
const LIT_REACT_NAMESPACE = "LitReact";

const { dirname } = getFileMeta(import.meta.url);

const packageDir = path.resolve(dirname, "..");
const srcDir = path.join(packageDir, "src");
const templatesDir = path.join(packageDir, "templates");

const barrelFilePath = path.join(srcDir, "index.ts");

const componentTemplatePath = path.join(templatesDir, "component.txt");
const metadataPath = path.resolve(
  packageDir,
  "../web-components/components-metadata.json",
);

const START_COMMENT = "/* START: AUTO-GENERATED [DO_NOT_REMOVE] */";
const END_COMMENT = "/* END: AUTO-GENERATED [DO_NOT_REMOVE] */";

const createReactMetadata = (
  componentMetadata: ComponentMetadata,
): ReactMetadata => {
  const {
    name: elementClass,
    tagName: elementTag,
    events,
    importPaths,
    exportedSlots: slots,
  } = componentMetadata;

  const componentName = elementClass.replace("Tapsi", "");

  if (!elementTag) {
    throw new Error(`No tag was found for ${componentName}`);
  }

  const webComponentImportPath = importPaths.webComponents;

  if (!webComponentImportPath) {
    throw new Error(`No import path was found for ${componentName}`);
  }

  let slotImportPath = webComponentImportPath;

  if (elementTag.endsWith("-item")) {
    slotImportPath += "/item";
  }

  return {
    elementClass,
    componentName,
    elementTag,
    events,
    webComponentImportPath,
    slotImportPath,
    slots,
  };
};

const getEventsExportsList = ({ events }: ReactMetadata): string[] =>
  events?.filter(e => e.type.text !== "Event").map(e => e.type.text) || [];

const getSlotsExportsList = ({ slots }: ReactMetadata): string[] => {
  return slots?.filter(s => s.name === "Slots").map(s => s.name) || [];
};

const getExportsList = (reactMetadata: ReactMetadata) => {
  return [
    ...getEventsExportsList(reactMetadata),
    ...getSlotsExportsList(reactMetadata),
  ];
};

const getModuleBarrelFileComponentImport = (reactMetadata: ReactMetadata) => {
  const renamedExportsList = getExportsList(reactMetadata).map(
    e => `${e} as ${reactMetadata.componentName}${e}`,
  );

  const exportsList = [reactMetadata.componentName, ...renamedExportsList];

  return `export { ${exportsList.join(", ")} } from "./${reactMetadata.componentName}.ts";\n`;
};

const getReactComponentImports = (reactMetadata: ReactMetadata) => {
  return [
    `import * as ${LIT_REACT_NAMESPACE} from "@lit/react";`,
    `import * as React from "react";`,
    `import * as ${COMPONENT_NAMESPACE} from "${reactMetadata.webComponentImportPath}";`,
    'import { type ReactWebComponent } from "@lit/react";',
  ].join("\n");
};

const getReactComponentCode = async (
  reactMetadata: ReactMetadata,
): Promise<string> => {
  const {
    componentName,
    elementTag,
    elementClass,
    events: _events,
    webComponentImportPath,
    slots,
    slotImportPath,
  } = reactMetadata;

  const componentTemplateStr = await fs.promises.readFile(
    componentTemplatePath,
    { encoding: "utf-8" },
  );

  const events = `{ ${
    _events
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

  let exports = "";

  const eventExportsList = getEventsExportsList(reactMetadata);

  if (eventExportsList.length > 0) {
    exports = `export { ${eventExportsList.join(",")} } from '${webComponentImportPath}'\n`;
  }

  if ((slots?.length ?? 0) > 0 && !!slotImportPath) {
    exports += `export { Slots } from "${slotImportPath}"\n`;
  }

  return Mustache.render(
    componentTemplateStr,
    {
      componentName,
      elementTag,
      elementClass: `${COMPONENT_NAMESPACE}.${elementClass}`,
      events,
      exports,
    },
    {},
    { escape: v => v as string },
  );
};

const getReactComponentExports = (componentName: string) => {
  return [
    `const ${componentName} = __${componentName};\n`,
    `export { ${componentName} };`,
  ].join("\n");
};

const transformToComponentModule = new Transform({
  objectMode: true,
  async transform(
    chunk: {
      key: PropertyKey;
      value: Metadata;
    },
    _,
    callback,
  ) {
    const metadata = chunk.value.components;

    for (const componentMetadata of metadata) {
      const reactMetadata = createReactMetadata(componentMetadata);
      const { componentName } = reactMetadata;

      const moduleDir = path.join(srcDir, `${componentName}`);

      await ensureDirExists(moduleDir);
      const moduleBarrelFilePath = path.join(moduleDir, "index.ts");

      if (fileExists(moduleBarrelFilePath)) {
        await fs.promises.rm(moduleBarrelFilePath);
      }

      const modulePath = path.join(moduleDir, `${componentName}.ts`);

      const moduleExists = fileExists(modulePath);
      const componentCode = await getReactComponentCode(reactMetadata);

      await fs.promises.appendFile(
        moduleBarrelFilePath,
        getModuleBarrelFileComponentImport(reactMetadata),
        {
          encoding: "utf-8",
        },
      );

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
          getReactComponentImports(reactMetadata),
          "\n",
          START_COMMENT,
          componentCode,
          END_COMMENT,
          "\n",
          getReactComponentExports(componentName),
        ].join("\n");

        await fs.promises.writeFile(modulePath, moduleContent, {
          encoding: "utf-8",
          flag: "w",
        });
      }

      await fs.promises.appendFile(
        barrelFilePath,
        `export * from "./${componentName}/index.ts";\n`,
        {
          encoding: "utf-8",
        },
      );
    }

    callback();
  },
  async final(callback) {
    await asyncExec(`prettier ${srcDir}/** --write --fix`);

    callback();
  },
});

void (async () => {
  console.time("generate");
  const { stdout, stderr } = await asyncExec(
    "pnpm --filter @tapsioss/web-components run gen:metadata",
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
        transformToComponentModule,
      ] as const),
    )
    .on("finish", () => {
      console.log("✅ react components generated.");
      console.timeEnd("generate");
    });
})();
/* eslint-enable no-console */
