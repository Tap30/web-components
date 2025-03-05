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
import type { Component, ImportPaths, Metadata } from "../../../types/docs.ts";

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

const generateMetadataFromCem = async (cem: Package): Promise<Metadata> => {
  const sidebarItemsMap: Record<string, DefaultTheme.SidebarItem> = {};
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

    const exportedSlots = exports
      .filter(m => m.name.includes("Slots"))
      .map(s => s.name);

    declarations.forEach(component => {
      const kebabCaseName = getKebabCaseComponentName(component);

      if (!kebabCaseName) return;

      const compoundPartialName = kebabCaseName.replace(
        relativePath.concat("-"),
        "",
      );

      const isCompoundPartialComponent = compoundPartialName !== kebabCaseName;

      const importPaths: ImportPaths = {};
      let slotsEnumName;

      if (exportedSlots.length === 1) {
        slotsEnumName = exportedSlots[0];
      } else if (exportedSlots.length > 1) {
        if (isCompoundPartialComponent) {
          slotsEnumName = exportedSlots.find(slotName =>
            slotName.toLowerCase().includes(compoundPartialName),
          );
        } else {
          slotsEnumName = exportedSlots.find(
            slotName =>
              slotName.toLowerCase().replace("slots", "").length === 0,
          );
        }
      }

      importPaths.webComponents = `@tapsioss/web-components/${relativePath}`;

      components.push({
        ...(component as CustomElement),
        kebabCaseName,
        importPaths,
        slotsEnumName,
      });
      const sidebarItem: DefaultTheme.SidebarItem = {};
      const childPath = relativePath.split("/")[1];

      sidebarItem.text = childPath ?? relativePath;

      if (declarations.length === 1) {
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
        const [parentPath] = relativePath.split("/");

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
    });
  });

  const componentSidebarItems: DefaultTheme.SidebarItem = {
    text: "Components",
    items: Object.values(sidebarItemsMap).sort((a, b) =>
      a.text!.localeCompare(b.text!),
    ),
  };

  const iconsSidebarItem: DefaultTheme.SidebarItem = {
    text: "Icons",
    link: "/icons",
  };

  const sidebarItems = [iconsSidebarItem, componentSidebarItems];

  return {
    sidebarItems,
    components,
  };
};

const getKebabCaseComponentName = (component: Declaration) => {
  if (!("tagName" in component) || !component.tagName) return null;

  const tagName = component.tagName;

  return tagName.replace("tapsi-", "");
};

void (async () => {
  console.log("🧩 generating metadata...");

  const cem = await generateCem();
  const metadata = await generateMetadataFromCem(cem);

  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));

  console.log("✅ docs metadata generated.");
})();
/* eslint-enable no-console */
