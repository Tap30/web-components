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
import {
  ensureDirExists,
  fileExists,
  getFileMeta,
} from "../../../scripts/utils.ts";
import {
  type ComponentMetadata,
  type EventMetadata,
  type Metadata,
  type PackageMetadata,
} from "../../../types/docs.ts";

type ReactEventMetadata = {
  key: `on${string}`;
  name: string;
  class: string;
};

type ParentInfo = Pick<ComponentMetadata, "tagName" | "elementClassName">;

type ReactMetadata = {
  componentName: string;
  elementTag: string;
  elementClass: string;
  parentInfo: ParentInfo | null;
  events: ReactEventMetadata[];
  registerFunction?: string;
  slotVariableNames: string[];
  importPath: string;
};

const asyncExec = promisify(exec);

const LIT_REACT_NAMESPACE = "LitReact";

const { dirname } = getFileMeta(import.meta.url);

const packageDir = path.resolve(dirname, "..");
const srcDir = path.join(packageDir, "src");
const templatesDir = path.join(packageDir, "templates");

const barrelFilePath = path.join(srcDir, "index.ts");

const componentTemplatePath = path.join(templatesDir, "component.txt");
const metadataPath = path.resolve(
  packageDir,
  "../web-components/metadata.json",
);

const createReactMetadata = (
  componentMetadata: ComponentMetadata,
  packageMetadata: PackageMetadata,
  compoundParentsMap: Record<string, ParentInfo>,
): ReactMetadata => {
  const {
    tagName: elementTag,
    events: elementEvents,
    endpointExports,
    relativePath,
    elementClassName,
  } = componentMetadata;

  const importPath = packageMetadata.name;
  const componentName = elementClassName;

  if (!importPath) {
    throw new Error(`No import path was found for ${componentName}`);
  }

  const events: ReactEventMetadata[] = Object.values(elementEvents)
    .filter(e => e.eventClassName !== "Event")
    .map((e: EventMetadata): ReactEventMetadata => {
      const eventClass = endpointExports[""]?.find(ex =>
        ex.endsWith(e.eventClassName),
      );

      if (!eventClass) {
        throw new Error(
          `No export was found in barrel file for ${e.eventClassName}`,
        );
      }

      return {
        name: e.name,
        key: `on${e.eventClassName.replace(elementClassName, "").replace("Event", "")}`,
        class: eventClass,
      };
    });

  const registerFunction = endpointExports[""]?.find(e =>
    e.startsWith("register"),
  );

  let parentInfo = null;

  if (!registerFunction) {
    const parent = compoundParentsMap[relativePath];

    if (parent) {
      parentInfo = parent;
    } else
      throw new Error(`No register function was found for ${elementClassName}`);
  }

  const slotVariableNames = (endpointExports[""] ?? []).filter(e =>
    e.endsWith("Slots"),
  );

  return {
    elementClass: elementClassName,
    componentName,
    elementTag,
    events,
    importPath,
    registerFunction,
    slotVariableNames,
    parentInfo,
  };
};

const getReactComponentImports = () => {
  return [
    `import * as ${LIT_REACT_NAMESPACE} from "@lit/react";`,
    `import * as React from "react";`,
    'import { type ReactWebComponent } from "@lit/react";',
  ].join("\n");
};

const getReactComponentCode = async (
  reactMetadata: ReactMetadata,
): Promise<string> => {
  const {
    componentName,
    elementTag,
    elementClass: rawElementClass,
    events: _events,
    registerFunction,
    slotVariableNames,
    parentInfo,
  } = reactMetadata;

  const componentTemplateStr = await fs.promises.readFile(
    componentTemplatePath,
    { encoding: "utf-8" },
  );

  const events = `{ ${
    _events
      ?.map(event => {
        const eventName = event.name;
        const eventClass = event.class;
        const eventNameInReact = event.key;

        if (eventClass === "Event") {
          return null;
        }

        return `${eventNameInReact}: '${eventName}' as ${LIT_REACT_NAMESPACE}.EventName<${eventClass}>`;
      })
      .filter(event => event !== null)
      .join(",") || ""
  } }`;

  const exportsList = [
    ...reactMetadata.events.map(e => e.class),
    ...reactMetadata.slotVariableNames,
  ];

  const exports =
    exportsList.length > 0 ? `export { ${exportsList.join(", ")} };` : "";

  const elementClass = `${componentName}ElementClass`;
  const importsList = [
    `${rawElementClass} as ${elementClass}`,
    registerFunction,
    ..._events.map(e => e.class),
    ...slotVariableNames,
  ];

  const imports = `import { ${importsList.join(", ")} } from "${reactMetadata.importPath}";`;

  const registerSection = registerFunction
    ? `${registerFunction}();`
    : `if (typeof window !== "undefined" && !customElements.get("${parentInfo?.tagName}")){\n/* eslint-disable no-console */\nconsole.warn("[TAPSI][${componentName}]: The \`${parentInfo?.tagName}\` tag is not registered. Since \`${componentName}\` is a compound component, it should be wrapped inside \`${parentInfo?.elementClassName}\` component.");\n/* eslint-enable no-console */}`;

  return Mustache.render(
    componentTemplateStr,
    {
      imports,
      register: registerSection,
      componentName,
      elementTag,
      elementClass,
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
    const metadata = chunk.value;
    const componentsMetadata = metadata.components;
    const packageMetadata = metadata.package;

    const flattenComponents = (
      components: Record<string, ComponentMetadata>,
    ): {
      flatComponents: Record<string, ComponentMetadata>;
      compoundParentsMap: Record<string, ParentInfo>;
    } => {
      const flatComponents: Record<string, ComponentMetadata> = {};
      const compoundParentsMap: Record<
        string,
        { tagName: string; elementClassName: string }
      > = {};

      function traverse(
        key: string,
        metadata: ComponentMetadata | Omit<ComponentMetadata, "compoundParts">,
        parent?: { tagName: string; elementClassName: string },
      ) {
        const fullMetadata: ComponentMetadata = {
          ...metadata,
          compoundParts:
            "compoundParts" in metadata ? metadata.compoundParts : {},
        };

        flatComponents[key] = fullMetadata;

        if (parent) {
          compoundParentsMap[key] = parent;
        }

        for (const [compoundTag, compoundPart] of Object.entries(
          fullMetadata.compoundParts,
        )) {
          traverse(compoundTag, compoundPart, {
            tagName: fullMetadata.tagName,
            elementClassName: fullMetadata.elementClassName,
          });
        }
      }

      for (const [tagName, componentMetadata] of Object.entries(components)) {
        traverse(tagName, componentMetadata);
      }

      return { flatComponents, compoundParentsMap };
    };

    const { flatComponents, compoundParentsMap } =
      flattenComponents(componentsMetadata);

    for (const [_, componentMetadata] of Object.entries(flatComponents)) {
      if (componentMetadata.tagName) {
        const reactMetadata = createReactMetadata(
          componentMetadata,
          packageMetadata,
          compoundParentsMap,
        );

        const { componentName } = reactMetadata;

        const moduleDir = path.join(srcDir, `${componentName}`);

        await ensureDirExists(moduleDir);
        const moduleBarrelFilePath = path.join(moduleDir, "index.ts");

        if (fileExists(moduleBarrelFilePath)) {
          await fs.promises.rm(moduleBarrelFilePath);
        }

        const modulePath = path.join(moduleDir, `${componentName}.ts`);

        const componentCode = await getReactComponentCode(reactMetadata);

        await fs.promises.appendFile(
          moduleBarrelFilePath,
          `export * from "./${reactMetadata.componentName}.ts";\n`,
          {
            encoding: "utf-8",
          },
        );

        const moduleContent = [
          getReactComponentImports(),
          "\n",
          componentCode,
          "\n",
          getReactComponentExports(componentName),
        ].join("\n");

        await fs.promises.writeFile(modulePath, moduleContent, {
          encoding: "utf-8",
          flag: "w",
        });

        await fs.promises.appendFile(
          barrelFilePath,
          `export * from "./${componentName}/index.ts";\n`,
          {
            encoding: "utf-8",
          },
        );
      }
    }

    callback();
  },
  async final(callback) {
    await asyncExec(`prettier ${srcDir}/** --write`);

    callback();
  },
});

void (async () => {
  console.time("generate");
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
