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

const workspaceDir = path.resolve(dirname, "..");
const webComponentsSrcDir = path.join(
  workspaceDir,
  "packages/web-components/src",
);

const distDir = path.join(workspaceDir, "dist");
const metadataFile = path.join(distDir, "components-metadata.json");
const cemFile = path.join(distDir, "custom-elements.json");

const getComponentKeyFromPath = (
  path: string,
  trailing = "/index.ts",
): string | undefined => {
  return path.split("src/")[1]?.split(trailing)[0];
};

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
    const componentKey = getComponentKeyFromPath(module.path);

    const moduleSrc = module.path;
    const moduleDir = path.dirname(moduleSrc);
    const relativePath = path.relative(webComponentsSrcDir, moduleDir);

    if (!componentKey) return;

    const declarations: Component[] = module.declarations!;
    const exports = module.exports!;
    const moduleSlotNames = exports
      ?.filter(m => m.name?.includes("Slots"))
      .map(s => s.name);

    declarations?.forEach(component => {
      const id = component.tagName.split("tapsi-")[1]!;
      const importPaths: ImportPaths = {};
      let slotName;

      if (moduleSlotNames?.length === 1) {
        slotName = moduleSlotNames[0];
      } else if (moduleSlotNames?.length === 2) {
        if (id.endsWith("-item")) {
          slotName = moduleSlotNames.find(s =>
            s.toLowerCase().includes("item"),
          );
        } else {
          slotName = moduleSlotNames.find(
            s => !s.toLowerCase().includes("item"),
          );
        }
      }

      importPaths.webComponents = `@tapsioss/web-components/${relativePath}`;
      importPaths.reactComponents = `@tapsioss/react-components/${relativePath}`;

      if (id) components.push({ ...component, id, importPaths, slotName });
    });

    const sidebarItem: DefaultTheme.SidebarItem = {};

    sidebarItem.text = componentKey.includes("/")
      ? componentKey.split("/")[1]
      : componentKey;

    if ((module.declarations?.length ?? 0) > 1) {
      sidebarItem.items = declarations.map(component => {
        const id = component.tagName.split("tapsi-")[1];

        return {
          text: id,
          link: `components/${id}`,
        };
      });
    } else {
      sidebarItem.link = `components/${declarations?.[0]?.tagName.split("tapsi-")[1]}`;
    }

    if (!componentKey.includes("/")) {
      sidebarItems.push(sidebarItem);
    } else {
      const [category] = componentKey.split("/");

      const existingSidebarItem = sidebarItems.find(
        item => item.text === category,
      );

      if (existingSidebarItem) {
        existingSidebarItem.items?.push(sidebarItem);
      } else {
        sidebarItems.push({
          text: category,
          items: [sidebarItem],
        });
      }
    }
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
