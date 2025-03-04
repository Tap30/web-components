/* eslint-disable no-console */
import {
  type CustomElement,
  type Declaration,
  type Package,
} from "custom-elements-manifest";
import { exec } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { cwd } from "node:process";
import { promisify } from "node:util";
import { type DefaultTheme } from "vitepress";
import type { Component, ImportPaths } from "../types/docs.ts";
import { getFileMeta } from "./utils.ts";

const asyncExec = promisify(exec);

const { dirname } = getFileMeta(import.meta.url);
const workspaceDir = path.resolve(dirname, "..");
const webComponentsSrcDir = path.join(
  workspaceDir,
  "packages/web-components/src",
);

const workspaceDistDir = path.join(workspaceDir, "dist");
const metadataFile = path.join(workspaceDistDir, "components-metadata.json");

const generateCem = async (): Promise<Package> => {
  const entrypoint = path.resolve(
    workspaceDir,
    "./packages/web-components/src",
  );

  const distDir = path.relative(cwd(), path.join(workspaceDir, "dist"));

  const globs: string[] = [
    `${entrypoint}/**/index.ts`,
    `${entrypoint}/**/*/index.ts`,
    `!${entrypoint}/utils/**`,
    `!${entrypoint}/internals/**`,
  ];

  await asyncExec(`shx rm -rf ${distDir}`);
  const { stderr: cemAnalyzeStderr, stdout: cemAnalyzeStdout } =
    await asyncExec(
      [
        "cem",
        "analyze",
        "--litelement",
        "--outdir",
        distDir,
        globs.map(g => `--globs ${g}`).join(" "),
      ].join(" "),
    );

  if (cemAnalyzeStdout) console.log(cemAnalyzeStdout);
  if (cemAnalyzeStderr) console.error(cemAnalyzeStderr);

  const cemFile = path.join(workspaceDistDir, "custom-elements.json");
  const cem = JSON.parse(fs.readFileSync(cemFile, "utf8")) as Package;

  const { stderr: cemRmStderr, stdout: cemRmStdout } = await asyncExec(
    ["rm", cemFile].join(" "),
  );

  if (cemRmStdout) console.log(cemAnalyzeStdout);
  if (cemRmStderr) console.error(cemAnalyzeStderr);

  return cem;
};

const getKebabCaseComponentName = (component: Declaration) => {
  if (!("tagName" in component) || !component.tagName) return null;

  const tagName = component.tagName;

  return tagName.replace("tapsi-", "");
};

void (async () => {
  console.log("🧩 generating metadata...");

  const cem = await generateCem();

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
    const relativePath = path.relative(webComponentsSrcDir, moduleDir);

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

  fs.writeFileSync(
    metadataFile,
    JSON.stringify(
      {
        components,
        sidebarItems,
      },
      null,
      2,
    ),
  );

  console.log("✅ docs metadata generated.");
})();
/* eslint-enable no-console */
