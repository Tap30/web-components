import {
  type ClassField,
  type ClassMethod,
  type CustomElementDeclaration,
  type CustomElementExport,
  type CustomElementField,
  type Declaration,
  type Module,
  type Package,
  type PropertyLike,
} from "custom-elements-manifest";
import { exec } from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { promisify } from "node:util";
import { getFileMeta } from "../../../scripts/utils.ts";
import { type ComponentMetadata, type Metadata } from "../../../types/docs.ts";

const asyncExec = promisify(exec);

const { dirname } = getFileMeta(import.meta.url);
const packageDir = path.join(dirname, "..");
const packageSrcDir = path.join(packageDir, "src");
const metadataFile = path.join(packageDir, "metadata.json");
const packageJsonFile = path.join(packageDir, "package.json");
const cemFile = path.join(packageDir, "custom-elements.json");

const kebabToTitleCase = (input: string): string => {
  return input
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Parses a string representation of a JavaScript object.
 * Specifically, it removes trailing commas and adds quotes around unquoted keys.
 *
 * @param str The string to parse.
 * @returns  The parsed object, or an empty object on parsing failure.
 */
const parseJavascriptObject = (str: string): Record<string, string> => {
  str = str.replace(/,(\s*})/, "$1"); // Remove trailing commas.
  str = str.replace(/([{,]\s*)([A-Z_]+)(\s*:)/g, '$1"$2"$3'); // Quote unquoted keys.

  try {
    return JSON.parse(str) as Record<string, string>;
  } catch (error) {
    console.error("Error parsing JavaScript object:", str, error);
    return {}; // Return empty object on error, to prevent script termination.
  }
};

/**
 * Generates the Custom Elements Manifest (CEM) file using the CEM CLI.
 *
 * @returns Promise resolving to the parsed CEM Package object.
 */
const generateCem = async (): Promise<Package> => {
  // Define glob patterns to include component source files.
  const globs: string[] = [
    `${packageSrcDir}/index.ts`,
    `${packageSrcDir}/**/*.ts`,
    `${packageSrcDir}/**/*/*.ts`,
    // Exclude style files.
    `!${packageSrcDir}/**/*.style.ts`,
    `!${packageSrcDir}/**/*/*.style.ts`,
    // Exclude utility-like files.
    `!${packageSrcDir}/**/{Controller,Validator,icons,utils}.ts`,
    `!${packageSrcDir}/**/*/{Controller,Validator,icons,utils}.ts`,
    `!${packageSrcDir}/utils/**`,
    `!${packageSrcDir}/internals/**`,
  ];

  // Construct the CEM CLI command.
  const cemCommand = [
    "cem",
    "analyze",
    globs.map(g => `--globs ${g}`).join(" "),
  ].join(" ");

  console.log("🛠️  Generating Custom Elements Manifest (CEM)...");
  try {
    const { stderr, stdout } = await asyncExec(cemCommand);

    if (stdout) console.log("CEM Output:", stdout);
    if (stderr) console.error("CEM Error:", stderr);

    // Read and parse the generated CEM file.
    const cemContent = await fs.readFile(cemFile, "utf8");

    return JSON.parse(cemContent) as Package;
  } catch (error) {
    console.error("❌ Error generating or reading CEM:", error);

    throw error; // Re-throw to stop the metadata generation.
  }
};

/**
 * Generates the component metadata JSON from the parsed Custom Elements Manifest.
 * This is the core logic.
 *
 * @param cem The parsed Custom Elements Manifest Package object.
 * @returns Promise resolving to the generated Metadata object.
 */
const generateMetadataFromCem = async (cem: Package): Promise<Metadata> => {
  const metadata: Metadata = {
    package: { name: "", endpoints: [] },
    components: {},
  };

  // { [relativePath]: { [constantName]: constantDeclaration } }
  const constantFileExportsMap: Record<
    string,
    Record<string, PropertyLike>
  > = {};

  // { [relativePath]: [{ name, class }] }
  const eventFileExportsMap: Record<
    string,
    {
      name: string;
      class: string;
    }[]
  > = {};

  try {
    const { exports, name } = JSON.parse(
      await fs.readFile(packageJsonFile, "utf8"),
    ) as {
      name: string;
      exports: Record<string, string>;
    };

    metadata.package.name = name;
    metadata.package.endpoints = Object.keys(exports).map(e =>
      e.replace("./", "").replace(".", ""),
    );

    console.log("📦 Package metadata:", metadata.package);
  } catch (error) {
    console.error("❌ Error reading package.json:", error);

    throw error;
  }

  const getCustomElementDefinitions = (
    module: Module,
  ): CustomElementExport[] => {
    return (module.exports ?? []).filter(
      ex => ex.kind === "custom-element-definition",
    );
  };

  const isConstantModule = (moduleName: string): boolean =>
    moduleName === "constants";

  const isEventsModule = (moduleName: string): boolean =>
    moduleName === "events";

  const isIndexModule = (moduleName: string): boolean => moduleName === "index";

  const getModulePriority = (module: Module): number => {
    const pathInfo = path.parse(module.path);

    if (isConstantModule(pathInfo.name)) return 0; // Constants first
    if (isEventsModule(pathInfo.name)) return 1; // Events second
    if (!isIndexModule(pathInfo.name)) return 2; // Modules third

    return 3; // Indices last
  };

  // Iterate through modules in a specific order to ensure correct data processing.
  const modules = cem.modules
    .filter(module => module.declarations && module.declarations.length > 0)
    .sort((a, b) => {
      return getModulePriority(a) - getModulePriority(b);
    });

  console.log("📂 Processing CEM modules...");
  // Modules with declarations and in order of: constants-events-index-else
  for (const module of modules) {
    const pathInfo = path.parse(module.path);

    const moduleDir = pathInfo.dir;
    const moduleDirPath = path.relative(packageSrcDir, moduleDir);

    // Handle Constants
    if (isConstantModule(pathInfo.name)) {
      constantFileExportsMap[moduleDirPath] = {};

      module.declarations!.forEach(d => {
        constantFileExportsMap[moduleDirPath]![d.name] = d;
      });

      continue; // Processed, go to next module.
    }

    // Handle Events
    if (isEventsModule(pathInfo.name)) {
      if (!eventFileExportsMap[moduleDirPath])
        eventFileExportsMap[moduleDirPath] = [];

      module.declarations!.forEach((d: Declaration) => {
        if (d.kind !== "class") return;

        const staticType = d.members?.find(
          member =>
            member.kind === "field" &&
            member.static === true &&
            member.name === "type",
        );

        if (!staticType) return;

        const eventName = (staticType as ClassField).default;

        if (!eventName) {
          console.warn(
            `⚠️ No name found for event class ${d.name} in ${module.path}! Skipping.`,
          );

          return;
        }

        eventFileExportsMap[moduleDirPath]!.push({
          name: eventName.replace(/"/g, ""),
          class: d.name,
        });
      });
      continue;
    }

    // Handle modules
    if (!isIndexModule(pathInfo.name)) {
      const component = module.declarations!.find(
        d => d.kind === "class" && "tagName" in d,
      ) as CustomElementDeclaration | undefined;

      if (!component) continue;

      const {
        name: elementClassName,
        tagName = "",
        summary = "",
        members = [],
        events = [],
        slots = [],
      } = component;

      const methods = members.filter(
        m => m.privacy === "public" && m.kind === "method",
      ) as ClassMethod[];

      const methodsMap: ComponentMetadata["methods"] = methods.reduce(
        (result, method) => {
          result[method.name] = {
            name: method.name,
            description: method.description ?? "",
            parameters: (method.parameters ?? []).map(p => ({
              name: p.name,
              description: p.description ?? "",
              type: p.type?.text ?? "",
            })),
          };

          return result;
        },
        {} as ComponentMetadata["methods"],
      );

      const eventsMap: ComponentMetadata["events"] = events.reduce(
        (result, event) => {
          const match = eventFileExportsMap[moduleDirPath]?.some(
            e => e.name === event.name,
          );

          console.log({
            match,
            array: eventFileExportsMap[moduleDirPath],
            evesnt: event.name,
          });

          if (!match) {
            console.warn(`Events mismatch: ${moduleDirPath}`, {
              name: event.name,
            });

            if (!event.name) {
              return result;
            }
          }

          let description = event.description ?? "";

          const eventDescriptionKeywords = ["cancelable", "bubbles"] as const;
          const eventFlags = {
            bubbles: false,
            cancelable: false,
          };

          eventDescriptionKeywords.forEach(keyword => {
            if (description.includes(`(${keyword})`)) {
              description = description.replace(`(${keyword})`, "");
              eventFlags[keyword] = true;
            }
          });

          const eventClassName = event.type?.text ?? "";

          result[event.name] = {
            name: event.name,
            eventClassName,
            description,
            ...eventFlags,
          };

          return result;
        },
        {} as ComponentMetadata["events"],
      );

      const slotsMap = slots.reduce(
        (result, slot) => {
          let exportsMapKey = "";

          if ("inheritedFrom" in slot) {
            const originPath = (
              (slot as ClassField).inheritedFrom!.module ||
              (slot as ClassField).inheritedFrom!.package ||
              ""
            ).replace(/"/g, "");

            const originDirPath = path.relative(
              packageSrcDir,
              path.dirname(originPath),
            );

            exportsMapKey = originDirPath;
          } else {
            exportsMapKey = moduleDirPath;
          }

          const jsStringifiedValue =
            constantFileExportsMap[exportsMapKey]?.["Slots"]?.default ?? "";

          const parsedObj = parseJavascriptObject(jsStringifiedValue);

          Object.entries(parsedObj).forEach(([k, v]) => {
            result[k] = {
              key: k,
              value: v,
              description: slot.description ?? "",
            };
          });

          return result;
        },
        {} as ComponentMetadata["slots"],
      );

      const props = members.filter(
        m => m.privacy === "public" && m.kind === "field",
      ) as (ClassField | CustomElementField)[];

      const propsMap: ComponentMetadata["props"] = props.reduce(
        (result, prop) => {
          result[prop.name] = {
            name: prop.name,
            description: prop.description ?? "",
            attribute: "attribute" in prop ? (prop.attribute ?? "") : "",
            default: prop.default ?? "",
            type: prop.type?.text ?? "",
          };

          return result;
        },
        {} as ComponentMetadata["props"],
      );

      const name = tagName.replace("tapsi-", "");

      metadata.components[moduleDirPath] = {
        tagName,
        elementClassName,
        summary,
        name,
        titleCaseName: kebabToTitleCase(name),
        events: eventsMap,
        methods: methodsMap,
        props: propsMap,
        relativePath: moduleDirPath,
        slots: slotsMap,
        endpointExports: {},
        compoundParts: {},
      };

      continue;
    }

    // Handle Indices.

    // Skip base modules.
    if (moduleDirPath.split("-").includes("base")) continue;
    // Skip main barrel index.
    if (moduleDirPath === "") continue;

    const ceds = getCustomElementDefinitions(module);

    if (ceds.length === 0) continue;

    // Handle components.
    const { endpoints } = metadata.package;
    const endpointExports: ComponentMetadata["endpointExports"] = {};

    const barrelIndexEndpoint = endpoints.find(e => e === "");
    const relativeIndexEndpoint = endpoints.find(e => e === "*");

    if (typeof barrelIndexEndpoint === "string") {
      endpointExports[barrelIndexEndpoint] = [];
    }

    if (typeof relativeIndexEndpoint === "string") {
      endpointExports[relativeIndexEndpoint] = [];
    }

    const component = metadata.components[moduleDirPath];

    if (!component) continue;

    const eventsMap = component.events;

    (module.exports ?? []).forEach(exp => {
      const exportPath = (
        exp.declaration.module ||
        exp.declaration.package ||
        ""
      ).replace(/"/g, "");

      const exportPathInfo = path.parse(exportPath);

      const titleCasedName =
        exp.name.charAt(0).toUpperCase() + exp.name.substring(1);

      if (exportPathInfo.name === "events") {
        if (exp.name === "*") {
          Object.values(eventsMap).forEach(event => {
            if (typeof barrelIndexEndpoint === "string") {
              endpointExports[barrelIndexEndpoint]!.push(
                `${component.elementClassName ?? ""}${event.eventClassName}`,
              );
            }

            if (typeof relativeIndexEndpoint === "string") {
              endpointExports[relativeIndexEndpoint]!.push(
                event.eventClassName,
              );
            }
          });
        } else {
          if (typeof barrelIndexEndpoint === "string") {
            endpointExports[barrelIndexEndpoint]!.push(
              `${component.elementClassName ?? ""}${titleCasedName}`,
            );
          }

          if (typeof relativeIndexEndpoint === "string") {
            endpointExports[relativeIndexEndpoint]!.push(exp.name);
          }
        }
      } else {
        if (exp.kind === "custom-element-definition") return;

        let barrelName = `${component.elementClassName ?? ""}${titleCasedName !== component.elementClassName ? titleCasedName : ""}`;

        if (exp.name === "register") {
          barrelName = `${exp.name}${component.elementClassName ?? ""}`;
        }

        if (typeof barrelIndexEndpoint === "string") {
          endpointExports[barrelIndexEndpoint]!.push(barrelName);
        }

        if (typeof relativeIndexEndpoint === "string") {
          endpointExports[relativeIndexEndpoint]!.push(exp.name);
        }
      }
    });

    component.endpointExports = endpointExports;

    if (ceds.length <= 1) continue;

    // Compound barrel
    let parentPath = "";
    const partPaths: string[] = [];

    ceds.forEach(ced => {
      const cedPathInfo = path.parse(ced.declaration.module ?? "");

      if (moduleDirPath === cedPathInfo.name) {
        parentPath = moduleDirPath;
      } else {
        const partPath = path.relative(packageSrcDir, cedPathInfo.dir);

        partPaths.push(partPath);
      }
    });

    partPaths.forEach(partPath => {
      const parent = metadata.components[parentPath];

      if (!parent) return;

      const part = metadata.components[partPath];

      if (!part) return;

      parent.compoundParts[partPath] = part;
      const compoundPartName =
        parent.compoundParts[partPath].relativePath.split("/")[1];

      if (compoundPartName) {
        parent.compoundParts[partPath].titleCaseName =
          kebabToTitleCase(compoundPartName);
      }

      delete metadata.components[partPath];
    });
  }

  return metadata;
};

void (async () => {
  console.log("🧩 generating metadata...");

  const cem = await generateCem();

  const metadata = await generateMetadataFromCem(cem);

  await fs.writeFile(metadataFile, JSON.stringify(metadata, null, 2));

  console.log("✅ docs metadata generated.");
})();
