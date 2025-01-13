/* eslint-disable no-console */
import { type Package } from "custom-elements-manifest";
import * as fs from "node:fs";
import * as path from "node:path";
import { type DefaultTheme } from "vitepress";
import {
  type Component,
  type ImportPaths,
} from "../internals/doc-helpers/types";
import { getFileMeta } from "./utils";

const { dirname } = getFileMeta(import.meta.url);
// TODO: rename to docs Metadata
const workspaceDir = path.resolve(dirname, "..");
const webComponentsSrcDir = path.join(
  workspaceDir,
  "packages/web-components/src",
);

const distDir = path.join(workspaceDir, "dist");
const metadataFile = path.join(distDir, "components-metadata.json");
const cemFile = path.join(distDir, "custom-elements.json");

const cem = JSON.parse(fs.readFileSync(cemFile, "utf8")) as Package;

void (() => {
  console.log("🧩 generating components metadata...");

  const sidebarItems: DefaultTheme.SidebarItem[] = [];
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
    const relativePath = path.relative(webComponentsSrcDir, moduleDir);

    if (!relativePath) return;

    const declarations = module.declarations;
    const exports = module.exports;

    if (!declarations || !exports) return;

    const exportedSlots = exports
      .filter(m => m.name.includes("Slots"))
      .map(s => s.name);

    declarations.forEach(component => {
      if (!("tagName" in component) || !component.tagName) return;

      const tagName = component.tagName;

      const kebabCaseName = tagName.replace("tapsi-", "");

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

      if (kebabCaseName) {
        components.push({
          ...component,
          kebabCaseName,
          importPaths,
          slotsEnumName,
        });
      }

      const sidebarItem: DefaultTheme.SidebarItem = {};
      const childPath = relativePath.split("/")[1];

      sidebarItem.text = childPath ?? relativePath;

      if (declarations.length === 1) {
        sidebarItem.link = `components/${kebabCaseName}`;
      } else {
        if (!Array.isArray(sidebarItem.items)) {
          sidebarItem.items = [];
        }

        sidebarItem.items.push({
          text: kebabCaseName,
          link: `components/${kebabCaseName}`,
        });
      }

      if (!childPath) {
        sidebarItems.push(sidebarItem);
      } else {
        const [parentPath] = relativePath.split("/");

        const parentItem = sidebarItems.find(item => item.text === parentPath);

        if (parentItem) {
          if (!Array.isArray(parentItem.items)) {
            parentItem.items = [];
          }

          parentItem.items.push(sidebarItem);
        } else {
          sidebarItems.push({
            text: parentPath,
            items: [sidebarItem],
          });
        }
      }
    });
  });

  fs.writeFileSync(
    metadataFile,
    JSON.stringify(
      {
        components,
        sidebarItems: sidebarItems.sort((a, b) =>
          a.text!.localeCompare(b.text!),
        ),
      },
      null,
      2,
    ),
  );

  console.log("✅ components metadata generated.");
})();
/* eslint-enable no-console */
