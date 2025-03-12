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
import { type Component, type Metadata } from "../../../types/docs.ts";

export type ReactGeneratedComponent = {
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

const convertComponentToReactMetadata = (
  component: Component,
): ReactGeneratedComponent => {
  const elementClass = component.name;
  const componentName = component.name.replace("Tapsi", "");
  const elementTag = component.tagName;
  const slots = component.exportedSlots;

  if (!elementTag) {
    throw new Error(`No tag was found for ${componentName}`);
  }

  const events = component.events;

  const webComponentImportPath = component.importPaths.webComponents;

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

const getEventsExportsList = ({ events }: ReactGeneratedComponent): string[] =>
  events?.filter(e => e.type.text !== "Event").map(e => e.type.text) || [];

const getSlotsExportsList = ({ slots }: ReactGeneratedComponent): string[] => {
  return slots?.filter(s => s.name === "Slots").map(s => s.name) || [];
};

const getExportsList = (component: ReactGeneratedComponent) => {
  return [
    ...getEventsExportsList(component),
    ...getSlotsExportsList(component),
  ];
};

const getModuleBarrelFileComponentImport = (
  component: ReactGeneratedComponent,
) => {
  const exportsList = [
    component.componentName,
    ...getExportsList(component).map(
      e => `${e} as ${component.componentName}${e}`,
    ),
  ];

  return `export { ${exportsList.join(", ")} } from "./${component.componentName}.ts";\n`;
};

const getComponentCode = async (
  component: ReactGeneratedComponent,
): Promise<string> => {
  const {
    componentName,
    elementTag,
    elementClass,
    events: _events,
    webComponentImportPath,
    slots,
    slotImportPath,
  } = component;

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

  const eventExportsList = getEventsExportsList(component);

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

const generateExports = (componentName: string) => {
  return [
    `const ${componentName} = __${componentName};\n`,
    `export { ${componentName} };`,
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
    for (const componentMetadata of chunk) {
      const component = convertComponentToReactMetadata(componentMetadata);
      const key = component.componentName;

      const moduleDir = path.join(srcDir, `${key}`);

      await ensureDirExists(moduleDir);
      const moduleBarrelFilePath = path.join(moduleDir, "index.ts");

      if (fileExists(moduleBarrelFilePath))
        await fs.promises.rm(moduleBarrelFilePath);

      const { componentName } = component;

      const modulePath = path.join(moduleDir, `${componentName}.ts`);

      const moduleExists = fileExists(modulePath);
      const componentCode = await getComponentCode(component);

      await fs.promises.appendFile(
        moduleBarrelFilePath,
        getModuleBarrelFileComponentImport(component),
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
        const getComponentImports = (component: ReactGeneratedComponent) => {
          return [
            `import * as ${LIT_REACT_NAMESPACE} from "@lit/react";`,
            `import * as React from "react";`,
            `import * as ${COMPONENT_NAMESPACE} from "${component.webComponentImportPath}";`,
            'import { type ReactWebComponent } from "@lit/react";',
          ].join("\n");
        };

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
        `export * from "./${key}/index.ts";\n`,
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
