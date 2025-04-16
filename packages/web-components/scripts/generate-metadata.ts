/* eslint-disable no-console */
import {
  type ClassField,
  type ClassMember,
  type CustomElementDeclaration,
  type CustomElementField,
  type Module,
  type Package,
  type PropertyLike,
} from "custom-elements-manifest";
import { exec } from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { promisify } from "node:util";
import { getFileMeta } from "../../../scripts/utils.ts";
import {
  type ComponentMetadata,
  type EventMetadata,
  type Metadata,
  type SlotMetadata,
} from "../../../types/docs.ts";

const asyncExec = promisify(exec);

const { dirname } = getFileMeta(import.meta.url);
const packageDir = path.join(dirname, "..");
const packageSrcDir = path.join(packageDir, "src");
const metadataFile = path.join(packageDir, "metadata.json");
const packageJsonFile = path.join(packageDir, "package.json");

const isConstantCase = (str: string) => /^[A-Z][A-Z0-9_]*$/.test(str);
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
        "--packagejson",
        globs.map(g => `--globs ${g}`).join(" "),
      ].join(" "),
    );

  if (cemAnalyzeStdout) console.log(cemAnalyzeStdout);
  if (cemAnalyzeStderr) console.error(cemAnalyzeStderr);

  const cemFile = path.join(packageDir, "custom-elements.json");

  return JSON.parse(await fs.readFile(cemFile, "utf8")) as Package;
};

const generateMetadataFromCem = async (cem: Package): Promise<Metadata> => {
  const metadata: Metadata = {
    package: { name: "", barrelExports: [], endpoints: [] },
    components: {},
  };

  const constantFileExportsMap: Record<
    string,
    Record<string, PropertyLike>
  > = {};

  const compoundComponentsMap: Record<string, string> = {};

  /**
   * step 1: creating package metadata
   */
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

  /**
   * step 2: creating components metadata
   */
  const modules = cem.modules.sort((a, b) => {
    const getPriority = (module: Module) => {
      if (module.path.endsWith("constants.ts")) return 0;

      const moduleSrc = module.path;
      const moduleDir = path.dirname(moduleSrc);
      const relativePath = path.relative(packageSrcDir, moduleDir);

      if (
        module.declarations?.length === 0 &&
        relativePath.includes("/") &&
        module.path.endsWith("/index.ts")
      )
        return 1; // compound components

      if (
        module.declarations?.length === 0 &&
        !relativePath.includes("/") &&
        module.path.endsWith("/index.ts")
      )
        return 2; // compound components
      if (module.path.endsWith("events.ts")) return 5;

      if (relativePath.includes("/"))
        return 3; // everything else
      else return 4; // everything else
    };

    return getPriority(a) - getPriority(b);
  });

  for (const module of modules) {
    const moduleSrc = module.path;
    const moduleDir = path.dirname(moduleSrc);
    const relativePath = path.relative(packageSrcDir, moduleDir);

    /**
     * Check barrel file exports
     */
    if (!relativePath) {
      if (module.path.endsWith("src/index.ts")) {
        metadata.package.barrelExports = (module.exports || []).map(
          e => e.name,
        );
      }

      continue;
    }

    /**
     * creating constants maps with this structure:
     * {
     *   [relativePathName]: {
     *     [constant1]: constant1Declaration,
     *     [constant2]: constant1Declaration,
     *   },
     * }
     */
    if (module.path.endsWith("/constants.ts")) {
      module.declarations?.forEach(d => {
        if (!constantFileExportsMap[relativePath])
          constantFileExportsMap[relativePath] = {};
        if (d.name) {
          constantFileExportsMap[relativePath][d.name] = d;
        }
      });
    }

    if (module.path.includes("/base")) continue;
    if (module.path.endsWith("events.ts")) continue;

    /**
     * creating constants maps with this structure:
     * {
     *   [childRelativePath]: parentRelativePath
     * }
     */
    if (
      module.declarations?.length === 0 &&
      relativePath.includes("/") &&
      module.path.endsWith("/index.ts")
    ) {
      const parentRelativePath = relativePath.split("/")[0];

      if (parentRelativePath)
        compoundComponentsMap[relativePath] = parentRelativePath;
    }

    const isCompound = relativePath in compoundComponentsMap;

    /**
     * initiating metadata objects
     */
    if (!metadata.components[relativePath]) {
      const initialData = {
        relativePath,
        name: "",
        tagName: "",
        elementClassName: "",
        summary: "",
        events: {},
        props: {},
        methods: {},
        slots: {},
        compoundParts: {},
      };

      if (!isCompound) {
        metadata.components[relativePath] = initialData;
      } else {
        const compoundParent = compoundComponentsMap[relativePath];

        if (compoundParent && metadata.components[compoundParent]) {
          metadata.components[compoundParent].compoundParts[relativePath] =
            initialData;
        }
      }
    }

    if (module.declarations && module.declarations.length > 0) {
      const declaration = module.declarations[0] as CustomElementDeclaration;

      if (!declaration) continue;

      const componentMetadata: ComponentMetadata = {
        relativePath,
        name: "",
        tagName: "",
        elementClassName: "",
        summary: "",
        events: {},
        props: {},
        methods: {},
        slots: {},
        compoundParts: {},
      };

      if (!declaration.tagName) continue;

      componentMetadata.tagName = declaration.tagName;

      componentMetadata.name = componentMetadata.tagName.replace("tapsi-", "");
      componentMetadata.elementClassName = declaration.name;
      if (declaration.summary) {
        componentMetadata.summary = declaration.summary;
      }

      if (declaration.slots) {
        let componentsSlots: Record<string, string> = {};
        const slots = declaration.slots as ClassField[];

        const inheritedSlotsList = slots.filter(s => s.inheritedFrom);

        if (inheritedSlotsList.length > 0) {
          inheritedSlotsList.forEach(inheritedSlot => {
            if (!inheritedSlot.inheritedFrom?.module) return;

            const inheritedDir = path.dirname(
              inheritedSlot.inheritedFrom.module,
            );

            const inheritedRelativePath = path.relative(
              packageSrcDir,
              inheritedDir,
            );

            if (!constantFileExportsMap[inheritedRelativePath]?.Slots?.default)
              return;

            const inheritedSlots =
              constantFileExportsMap[inheritedRelativePath].Slots.default;

            const inheritedSlotsMap = Object.fromEntries(
              Object.entries(
                parseJavascriptObject(inheritedSlots) as Record<string, string>,
              ).map(([key, value]) => [value, key]),
            );

            componentsSlots = { ...componentsSlots, ...inheritedSlotsMap };
          });
        }

        const slotConstant = constantFileExportsMap[relativePath]?.Slots;

        if (slotConstant?.default) {
          const componentsSlotMap = Object.fromEntries(
            Object.entries(
              parseJavascriptObject(slotConstant.default) as Record<
                string,
                string
              >,
            ).map(([key, value]) => [value, key]),
          );

          componentsSlots = { ...componentsSlots, ...componentsSlotMap };
        }

        const slotMetadata: SlotMetadata[] = declaration.slots?.map(s => ({
          value: s.name,
          description: s.description || "",
          key: componentsSlots[s.name] || "",
        }));

        componentMetadata.slots = slotMetadata.reduce(
          (a, b) => ({ ...a, [b.key]: b }),
          {},
        );
      }

      if (declaration.events) {
        const eventsMap: Record<string, EventMetadata> = {};

        declaration.events?.forEach(e => {
          const eventMetadata: EventMetadata = {
            name: "",
            eventClassName: "",
            description: "",
            bubbles: false,
            cancelable: false,
          };

          const eventMapKey = e.name;

          eventMetadata.name = eventMapKey;

          eventMetadata.eventClassName = e.type.text;
          eventMetadata.description = e.description || "";

          const eventDescriptionKeywords = ["cancelable", "bubbles"] as const;

          eventDescriptionKeywords.forEach(keyword => {
            if (e.description?.includes(`(${keyword})`)) {
              eventMetadata.description = eventMetadata.description.replace(
                `(${keyword})`,
                "",
              );
              eventMetadata[keyword] = true;
            }
          });

          if (eventMapKey) {
            eventsMap[eventMapKey] = eventMetadata;
          }
        });

        componentMetadata.events = eventsMap;
      }

      const members = declaration.members as ClassMember[];
      const publicMembers = members.filter(m => m.privacy === "public");

      publicMembers.forEach((member: ClassMember) => {
        if (member.kind === "field") {
          const field = member as CustomElementField;
          const propKey = field.name;

          componentMetadata.props[propKey] = {
            name: "",
            description: "",
            type: "",
            default: "",
            attribute: "",
          };
          componentMetadata.props[propKey].name = propKey;
          componentMetadata.props[propKey].type = field.type?.text || "";

          if (field.default) {
            if (!isConstantCase(field.default)) {
              componentMetadata.props[propKey].default = field.default;
            } else {
              const resolvedValue =
                constantFileExportsMap[relativePath]?.[field.default]?.default;

              if (resolvedValue) {
                componentMetadata.props[propKey].default = resolvedValue;
              }
            }
          }

          componentMetadata.props[propKey].description =
            field.description || "";
          componentMetadata.props[propKey].attribute = field.attribute || "";
        }

        if (member.kind === "method") {
          const propKey = member.name;

          componentMetadata.methods[propKey] = {
            name: "",
            description: "",
            parameters: [],
          };

          componentMetadata.methods[propKey].name = propKey;
          componentMetadata.methods[propKey].description =
            member.description || "";

          componentMetadata.methods[propKey].parameters = (
            member.parameters || []
          ).map(p => ({
            name: p.name,
            description: p.description || "",
            type: p.type?.text || "",
          }));
        }
      });

      if (isCompound) {
        const parentRelativePath = compoundComponentsMap[relativePath];

        if (parentRelativePath && metadata.components[parentRelativePath]) {
          metadata.components[parentRelativePath].compoundParts[relativePath] =
            componentMetadata;
        }
      } else {
        const existingCompoundParts =
          metadata.components[relativePath]?.compoundParts;

        metadata.components[relativePath] = {
          ...componentMetadata,
          ...(existingCompoundParts && {
            compoundParts: existingCompoundParts,
          }),
        };
      }
    }
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
/* eslint-enable no-console */
