/* eslint-disable no-console */
import {
  type CustomElement,
  type Declaration,
  type Package,
} from "custom-elements-manifest";
import globAsync from "fast-glob";
import { exec } from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { promisify } from "node:util";
import { type DefaultTheme } from "vitepress";
import {
  dirExists,
  getFileMeta,
  toPascalCase,
} from "../../../scripts/utils.ts";
import {
  type ComponentMetadata,
  type Example,
  type ImportPaths,
  type Metadata,
  type MetaJson,
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

  return JSON.parse(
    await fs.readFile(cemFile, { encoding: "utf8" }),
  ) as Package;
};

const getKebabCaseComponentName = (component: Declaration) => {
  if (!("tagName" in component) || !component.tagName) return null;

  const tagName = component.tagName;

  return tagName.replace("tapsi-", "");
};

const generateMetadataFromCem = async (cem: Package): Promise<Metadata> => {
  const sidebarItemsMap: Record<string, DefaultTheme.SidebarItem> = {};
  const components: ComponentMetadata[] = [];

  const filteredModules = cem.modules.filter(module => {
    const hasDeclarations = (module.declarations ?? []).length > 0;
    const hasCEExports = (module.exports ?? []).some(
      ex => ex.kind === "custom-element-definition",
    );

    return hasDeclarations && hasCEExports;
  });

  for (const module of filteredModules) {
    const moduleSrc = module.path;
    const moduleDir = path.dirname(moduleSrc);
    const relativePath = path.relative(packageSrcDir, moduleDir);
    const examplesDir = path.join(moduleDir, "examples");

    const hasExamples = dirExists(examplesDir);

    if (!relativePath) continue;

    const declarations = module.declarations;
    const exports = module.exports;

    if (!declarations || !exports) continue;

    const exportedSlots = exports.filter(m => m.name.includes("Slots"));

    const exportedSlotNames = exportedSlots.map(s => s.name);

    const examples: Example[] = [];

    if (hasExamples) {
      const [examplePaths, metaJson] = await Promise.all([
        globAsync(path.join(examplesDir, "**/*.example.{ts,tsx,js,jsx}")),
        fs.readFile(path.join(examplesDir, "meta.json"), { encoding: "utf-8" }),
      ]);

      const examplesMetadata = JSON.parse(metaJson) as MetaJson;

      const examplePromises = examplePaths.map(async examplePath => {
        const pathInfo = path.parse(examplePath);
        const name = path.basename(examplePath, `.example${pathInfo.ext}`);

        const metadata = examplesMetadata[name];

        if (!metadata) {
          console.warn(
            [
              `Expected a valid \`meta.json\` for \`${relativePath}\`.`,
              "Skipping example parsing for this component.",
            ].join(" "),
          );

          return Promise.resolve();
        }

        return fs.readFile(examplePath, { encoding: "utf-8" }).then(code => {
          examples.push({ metadata, path: examplePath, code });
        });
      });

      await Promise.all(examplePromises);
    }

    for (const declaration of declarations) {
      const kebabCaseName = getKebabCaseComponentName(declaration);

      if (!kebabCaseName) continue;

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

        const component: ComponentMetadata = {
          ...(declaration as CustomElement),
          kebabCaseName,
          importPaths,
          slotsEnumName,
          exportedSlots,
          examples,
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
          if (!Array.isArray(sidebarItem.items)) {
            sidebarItem.items = [];
          }

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
    }
  }

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
  const metadata = await generateMetadataFromCem(cem);

  await fs.writeFile(metadataFile, JSON.stringify(metadata, null, 2));

  console.log("✅ docs metadata generated.");
})();
/* eslint-enable no-console */
