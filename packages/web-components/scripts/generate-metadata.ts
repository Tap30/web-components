/* eslint-disable no-console */
import {
  type Declaration,
  type Module,
  type Package,
} from "custom-elements-manifest";
import { exec } from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { promisify } from "node:util";
import { getFileMeta } from "../../../scripts/utils.ts";
import { type Metadata } from "../../../types/docs.ts";

const asyncExec = promisify(exec);

const { dirname } = getFileMeta(import.meta.url);
const packageDir = path.join(dirname, "..");
const packageSrcDir = path.join(packageDir, "src");
const metadataFile = path.join(packageDir, "components-metadata.json");
const packageJsonFile = path.join(packageDir, "package.json");

const removeDoubleQuotes = (text: string) => text.replace(/"/g, "");

const parseJavascriptObject = (str: string): object => {
  // Remove the trailing comma before the closing brace
  str = str.replace(/,(\s*})/, "$1");

  // Add double quotes around unquoted keys
  str = str.replace(/([{,]\s*)([A-Z_]+)(\s*:)/g, '$1"$2"$3');

  return JSON.parse(str) as object;
};

const generateCem = async (): Promise<Package> => {
  const globs: string[] = [
    `${packageSrcDir}/index.ts`,
    `${packageSrcDir}/**/*.ts`,
    `${packageSrcDir}/**/*/*.ts`,
    `!${packageSrcDir}/**/*.style.ts`,
    `!${packageSrcDir}/**/*/*.style.ts`,
    `!${packageSrcDir}/**/{Controller,Validator,icons,utils}.ts`,
    `!${packageSrcDir}/**/*/{Controller,Validator,icons,utils}.ts`,
    `!${packageSrcDir}/utils/**`,
    `!${packageSrcDir}/internals/**`,
  ];

  const { stderr: cemAnalyzeStderr, stdout: cemAnalyzeStdout } =
    await asyncExec(
      [
        "cem",
        "analyze",
        "--litelement",
        "--packagejson",
        globs.map(g => `--globs ${g}`).join(" "),
      ].join(" "),
    );

  if (cemAnalyzeStdout) console.log(cemAnalyzeStdout);
  if (cemAnalyzeStderr) console.error(cemAnalyzeStderr);

  const cemFile = path.join(packageDir, "custom-elements.json");

  return JSON.parse(await fs.readFile(cemFile, "utf8")) as Package;
};

const getKebabCaseComponentName = (component: Declaration) => {
  if (!("tagName" in component) || !component.tagName) return null;

  const tagName = component.tagName;

  return tagName.replace("tapsi-", "");
};

const generateMetadataFromCem = async (cem: Package): Promise<Metadata> => {
  const metadata: Metadata = {
    package: { name: "", barrelExports: [], endpoints: [] },
    components: {},
  };

  // creating package metadata
  const packageJsonContents = JSON.parse(
    await fs.readFile(packageJsonFile, "utf8"),
  ) as {
    name: string;
    exports: Record<string, never>;
  };

  metadata.package.name = packageJsonContents.name;
  metadata.package.endpoints = Object.keys(packageJsonContents.exports)
    .filter(e => ![".", "./custom-elements-manifest"].includes(e))
    .map(e => e.replace("./", ""));

  // creating components metadata

  // const filteredModules = cem.modules.filter(module => {
  //   const hasDeclarations = (module.declarations ?? []).length > 0;
  //   const hasCEExports = (module.exports ?? []).some(
  //     ex => ex.kind === "custom-element-definition",
  //   );
  //
  //   return hasDeclarations && hasCEExports;
  // });

  const modules = cem.modules.sort((a, b) => {
    const getPriority = (file: Module) => {
      if (file.path.endsWith("constants.ts")) return 0;
      if (file.path.endsWith("events.ts")) return 1;
      return 2; // everything else
    };

    return getPriority(a) - getPriority(b);
  });

  for (const module of modules) {
    const moduleSrc = module.path;
    const moduleDir = path.dirname(moduleSrc);
    const relativePath = path.relative(packageSrcDir, moduleDir);

    if (!relativePath) continue;

    if (module.path.includes("/base")) continue;

    if (!metadata.components[relativePath]) {
      metadata.components[relativePath] = {
        relativePath,
        compoundParts: {},
        name: "",
        tagName: "",
        elementClassName: "",
        events: {},
        slots: {},
      };
    }

    if (module.path.endsWith("/index.ts")) {
      // if (!metadata.components[relativePath]) {
      //   metadata.components[relativePath] = {
      //     relativePath,
      //     compoundParts: {},
      //     name: "",
      //     tagName: "",
      //     elementClassName: "",
      //     events:  {},
      //     slots: {},
      //   };
      // }
    } else if (module.path.endsWith("/constants.ts")) {
      const slotsDeclaration = module.declarations?.find(d =>
        d.name.endsWith("Slots"),
      );

      if (!slotsDeclaration) continue;

      const slotContantString = slotsDeclaration.default;

      metadata.components[relativePath]!.slots = Object.fromEntries(
        Object.entries(parseJavascriptObject(slotContantString)).map(
          ([key, value]) => [key, { name: value, description: "" }],
        ),
      );
    } else if (module.path.endsWith("/events.ts")) {
      module.declarations?.forEach(d => {
        if (!(d.name in metadata.components[relativePath]!.events)) {
          metadata.components[relativePath]!.events[d.name] = {
            name: "",
            bubbles: false,
            cancelable: false,
            eventClassName: "",
          };
        }

        metadata.components[relativePath]!.events[d.name]!.eventClassName =
          d.name;

        const eventType = d.members?.find(m => m.name === "type");

        if (eventType?.default) {
          metadata.components[relativePath]!.events[d.name]!.name =
            removeDoubleQuotes(eventType.default);
        }
      });
    } else {
      if (module.declarations && module.declarations.length > 0) {
        const declaration = module.declarations[0];

        if (!declaration) continue;

        const tagName = declaration.tagName;

        if (!tagName) continue;

        const name = tagName.replace("tapsi-", "");
        const elementClassName = declaration.name;
        const summary = declaration.summary;

        const slots = declaration.slots as []; // TODO: FIX

        if (slots) {
          const metaMap = Object.fromEntries(
            slots.map(({ name, description }) => [name, description]),
          );

          for (const key in metadata?.components?.[relativePath]?.slots) {
            if (metadata?.components?.[relativePath]?.slots[key] === undefined)
              continue;

            const name = metadata?.components?.[relativePath]?.slots[key].name;

            if (name in metaMap) {
              metadata.components[relativePath].slots[key].description =
                metaMap[name];
            }
          }
        }

        metadata.components[relativePath].tagName = tagName;
        metadata.components[relativePath].name = name;
        metadata.components[relativePath].elementClassName = elementClassName;
        metadata.components[relativePath].summary = summary;
      }
    }

    // declarations.forEach(declaration => {
    //   const kebabCaseName = getKebabCaseComponentName(declaration);
    //
    //   if (!kebabCaseName) return;
    //
    //   const setComponentsMetadata = (): void => {
    //     const compoundPartialName = kebabCaseName.replace(
    //       relativePath.concat("-"),
    //       "",
    //     );
    //
    //     const isCompoundPartialComponent =
    //       compoundPartialName !== kebabCaseName;
    //
    //     const importPaths: ImportPaths = {};
    //     let slotsEnumName;
    //
    //     if (exportedSlotNames.length === 1) {
    //       slotsEnumName = exportedSlotNames[0];
    //     } else if (exportedSlotNames.length > 1) {
    //       if (isCompoundPartialComponent) {
    //         slotsEnumName = exportedSlotNames.find(slotName =>
    //           slotName.toLowerCase().includes(compoundPartialName),
    //         );
    //       } else {
    //         slotsEnumName = exportedSlotNames.find(
    //           slotName =>
    //             slotName.toLowerCase().replace("slots", "").length === 0,
    //         );
    //       }
    //     }
    //
    //     importPaths.webComponents = `@tapsioss/web-components/${relativePath}`;
    //
    //     const componentName = toPascalCase(kebabCaseName, "-");
    //
    //     importPaths.react = `@tapsioss/react-components/${componentName}`;
    //
    //     const component = {
    //       ...(declaration as CustomElement),
    //       kebabCaseName,
    //       importPaths,
    //       slotsEnumName,
    //       exportedSlots,
    //     };
    //
    //     components.push(component);
    //   };
    //
    //   const setComponentsSidebarItems = () => {
    //     const sidebarItem: DefaultTheme.SidebarItem = {};
    //     const [parentPath, childPath] = relativePath.split("/");
    //
    //     sidebarItem.text = childPath ?? relativePath;
    //
    //     const isCompound = declarations.length > 1;
    //
    //     if (!isCompound) {
    //       sidebarItem.link = `/components/${kebabCaseName}`;
    //     } else {
    //       sidebarItem.items = sidebarItemsMap[sidebarItem.text]?.items || [];
    //
    //       sidebarItem.items.push({
    //         text: kebabCaseName,
    //         link: `/components/${kebabCaseName}`,
    //       });
    //     }
    //
    //     if (!childPath) {
    //       sidebarItemsMap[sidebarItem.text] = sidebarItem;
    //     } else {
    //       const parentItem = sidebarItemsMap[parentPath!];
    //
    //       if (parentItem) {
    //         if (!Array.isArray(parentItem.items)) {
    //           parentItem.items = [];
    //         }
    //
    //         parentItem.items.push(sidebarItem);
    //       } else {
    //         sidebarItemsMap[parentPath!] = {
    //           text: parentPath,
    //           items: [sidebarItem],
    //         };
    //       }
    //     }
    //   };
    //
    //   setComponentsMetadata();
    //   setComponentsSidebarItems();
    // });
  }

  return metadata;

  // return {
  //   components,
  // };
};

void (async () => {
  console.log("🧩 generating metadata...");

  const cem = await generateCem();

  const metadata = await generateMetadataFromCem(cem);

  await fs.writeFile(metadataFile, JSON.stringify(metadata, null, 2));

  console.log("✅ docs metadata generated.");
})();
/* eslint-enable no-console */
