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
import { getFileMeta, toPascalCase } from "../../../scripts/utils.ts";
import {
  type ComponentMetadata,
  type ImportPaths,
  type Metadata,
} from "../../../types/docs.ts";

const asyncExec = promisify(exec);

const { dirname } = getFileMeta(import.meta.url);
const packageDir = path.join(dirname, "..");
const packageSrcDir = path.join(packageDir, "src");

const metadataFile = path.join(packageDir, "components-metadata.json");

const generateCem = async (): Promise<Package> => {
  const globs: string[] = [
    `${packageSrcDir}/**/*.ts`,
    `${packageSrcDir}/**/*/*.ts`,
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
  const components: ComponentMetadata[] = [];

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

      const setComponentsMetadata = (): void => {
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

        const componentName = toPascalCase(kebabCaseName, "-");

        importPaths.react = `@tapsioss/react-components/${componentName}`;

        const component = {
          ...(declaration as CustomElement),
          kebabCaseName,
          importPaths,
          slotsEnumName,
          exportedSlots,
        };

        components.push(component);
      };

      const setComponentsSidebarItems = () => {
        const sidebarItem: DefaultTheme.SidebarItem = {};
        const [parentPath, childPath] = relativePath.split("/");

        sidebarItem.text = childPath ?? relativePath;

        const isCompound = declarations.length > 1;

        if (!isCompound) {
          sidebarItem.link = `/components/${kebabCaseName}`;
        } else {
          sidebarItem.items = sidebarItemsMap[sidebarItem.text]?.items || [];

          sidebarItem.items.push({
            text: kebabCaseName,
            link: `/components/${kebabCaseName}`,
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

      setComponentsMetadata();
      setComponentsSidebarItems();
    });
  });

  const componentSidebarItems: DefaultTheme.SidebarItem = {
    text: "Components",
    link: "/components",

    items: Object.values(sidebarItemsMap).sort((a, b) =>
      a.text!.localeCompare(b.text!),
    ),
  };

  const themeSidebarItem: DefaultTheme.SidebarItem = {
    text: "Theme",
    link: "/theme",
    items: [
      { text: "Palette", link: "/theme/palette" },
      { text: "Color", link: "/theme/color" },
      { text: "Radius", link: "/theme/radius" },
      { text: "Spacing", link: "/theme/spacing" },
      { text: "Stroke", link: "/theme/stroke" },
      { text: "Typography", link: "/theme/typography" },
    ],
  };

  const iconsSidebarItem: DefaultTheme.SidebarItem = {
    text: "Icons",
    link: "/icons",
  };

  const sidebarItems = [
    componentSidebarItems,
    iconsSidebarItem,
    themeSidebarItem,
  ];

  return {
    sidebarItems,
    components,
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
