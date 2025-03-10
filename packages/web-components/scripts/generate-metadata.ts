/* eslint-disable no-console */
import {
  type CustomElement,
  type Declaration,
  type Package,
} from "custom-elements-manifest";
import { exec } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { promisify } from "node:util";
import { type DefaultTheme } from "vitepress";
import { getFileMeta } from "../../../scripts/utils.ts";
import {
  type Component,
  type ImportPaths,
  type Metadata,
  type ReactGeneratedComponent,
} from "../../../types/docs.ts";

const asyncExec = promisify(exec);

const { dirname } = getFileMeta(import.meta.url);
const packageDir = path.join(dirname, "..");
const packageSrcDir = path.join(packageDir, "src");

const metadataFile = path.join(packageDir, "components-metadata.json");

const generateCem = async (): Promise<Package> => {
  const globs: string[] = [
    `${packageSrcDir}/**/index.ts`,
    `${packageSrcDir}/**/*/index.ts`,
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

  return JSON.parse(fs.readFileSync(cemFile, "utf8")) as Package;
};

const getKebabCaseComponentName = (component: Declaration) => {
  if (!("tagName" in component) || !component.tagName) return null;

  const tagName = component.tagName;

  return tagName.replace("tapsi-", "");
};

const generateMetadataFromCem = (cem: Package): Metadata => {
  const sidebarItemsMap: Record<string, DefaultTheme.SidebarItem> = {};
  const componentsMap: Record<string, Component> = {};
  const reactGeneratedComponentsMap: Record<string, ReactGeneratedComponent[]> =
    {};

  const components: Component[] = [];

  const filteredModules = cem.modules.filter(module => {
    const hasDeclarations = (module.declarations ?? []).length > 0;
    const hasCEExports = (module.exports ?? []).some(
      ex => ex.kind === "custom-element-definition",
    );

    return hasDeclarations && hasCEExports;
  });

  filteredModules.forEach(module => {
    const moduleSrc = module.path;
    const moduleDir = path.dirname(moduleSrc);
    const relativePath = path.relative(packageSrcDir, moduleDir);

    if (!relativePath) return;

    const declarations = module.declarations;
    const exports = module.exports;

    if (!declarations || !exports) return;

    const exportedSlots = exports.filter(m => m.name.includes("Slots"));

    const exportedSlotNames = exportedSlots.map(s => s.name);

    declarations.forEach(declaration => {
      const kebabCaseName = getKebabCaseComponentName(declaration);

      if (!kebabCaseName) return;

      const convertDeclarationToComponentMetadata = (
        declaration: Declaration,
      ): Component => {
        const compoundPartialName = kebabCaseName.replace(
          relativePath.concat("-"),
          "",
        );

        const isCompoundPartialComponent =
          compoundPartialName !== kebabCaseName;

        const importPaths: ImportPaths = {};
        let slotsEnumName;

        if (exportedSlotNames.length === 1) {
          slotsEnumName = exportedSlotNames[0];
        } else if (exportedSlotNames.length > 1) {
          if (isCompoundPartialComponent) {
            slotsEnumName = exportedSlotNames.find(slotName =>
              slotName.toLowerCase().includes(compoundPartialName),
            );
          } else {
            slotsEnumName = exportedSlotNames.find(
              slotName =>
                slotName.toLowerCase().replace("slots", "").length === 0,
            );
          }
        }

        importPaths.webComponents = `@tapsioss/web-components/${relativePath}`;
        return {
          ...(declaration as CustomElement),
          kebabCaseName,
          importPaths,
          slotsEnumName,
          exportedSlots,
        };
      };

      const convertComponentToReactMetadata = (
        component: Component,
      ): ReactGeneratedComponent => {
        const elementClass = component.name;
        const componentName = component.name.replace("Tapsi", "");
        const elementTag = component.tagName;
        const slots = component.slotsEnumName;

        if (!elementTag) {
          throw new Error(`No tag was found for ${component}`);
        }

        const events = component.events;

        let webComponentImportPath = component.importPaths.webComponents;

        if (!webComponentImportPath) {
          throw new Error(`No import path was found for ${component}`);
        }

        let slotImportPath = webComponentImportPath;

        if (elementTag.endsWith('-item')) {
          slotImportPath += '/item'
        }

        return {
          elementClass,
          componentName,
          elementTag,
          events,
          webComponentImportPath,
          slotImportPath,
          slots: exportedSlots,
        };
      };

      const getComponentsSidebarItems = () => {
        const sidebarItem: DefaultTheme.SidebarItem = {};
        const [parentPath, childPath] = relativePath.split("/");

        sidebarItem.text = childPath ?? relativePath;

        const isCompound = declarations.length > 1;

        if (!isCompound) {
          sidebarItem.link = `/components/${kebabCaseName}`;
        } else {
          if (!Array.isArray(sidebarItem.items)) {
            sidebarItem.items = [];
          }

          sidebarItem.items = declarations.map(component => {
            const name = getKebabCaseComponentName(component) || "";

            return {
              text: name,
              link: `/components/${name}`,
            };
          });
        }

        if (!childPath) {
          sidebarItemsMap[sidebarItem.text] = sidebarItem;
        } else {
          const parentItem = sidebarItemsMap[parentPath!];

          if (parentItem) {
            if (!Array.isArray(parentItem.items)) {
              parentItem.items = [];
            }

            parentItem.items.push(sidebarItem);
          } else {
            sidebarItemsMap[parentPath!] = {
              text: parentPath,
              items: [sidebarItem],
            };
          }
        }
      };

      const getReactGeneratedComponentsMetadata = () => {
        const key = declarations
          .reduce((a, b) => (a.name.length <= b.name.length ? a : b))
          .name.replace("Tapsi", "");

        reactGeneratedComponentsMap[key] = declarations.map(declaration =>
          convertComponentToReactMetadata(
            convertDeclarationToComponentMetadata(declaration),
          ),
        );
      };

      const component = convertDeclarationToComponentMetadata(declaration);

      componentsMap[component.name] = component;
      components.push(component);

      getComponentsSidebarItems();
      getReactGeneratedComponentsMetadata();
    });
  });

  const componentSidebarItems: DefaultTheme.SidebarItem = {
    text: "Components",
    items: Object.values(sidebarItemsMap).sort((a, b) =>
      a.text!.localeCompare(b.text!),
    ),
  };

  const reactGeneratedComponents = Object.entries(
    reactGeneratedComponentsMap,
  ).reduce((a, [compoundRootKey, components]) => {
    const compoundRoot = components.find(
      c => c.componentName === compoundRootKey,
    );

    const compoundComponents = components
      .filter(c => c.componentName !== compoundRootKey)
      .reduce((a, b) => {
        const compoundKey = b.componentName.replace(compoundRootKey, "");

        return {
          ...a,
          [compoundKey]: b,
        };
      }, {});

    return {
      ...a,
      [compoundRootKey]: {
        Root: compoundRoot,
        ...compoundComponents,
      },
    };
  }, {});

  const iconsSidebarItem: DefaultTheme.SidebarItem = {
    text: "Icons",
    link: "/icons",
  };

  const sidebarItems = [iconsSidebarItem, componentSidebarItems];

  return {
    sidebarItems,
    components,
    reactGeneratedComponents,
  };
};

void (async () => {
  console.log("🧩 generating metadata...");

  const cem = await generateCem();
  const metadata = generateMetadataFromCem(cem);

  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));

  console.log("✅ docs metadata generated.");
})();
/* eslint-enable no-console */
