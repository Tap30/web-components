/* eslint-disable no-console */
import {
  type ClassField,
  type ClassLike,
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

const arraysEqual = (a: Array<unknown>, b: Array<unknown>) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
};

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
    package: { name: "", endpoints: [] },
    components: {},
  };

  const constantFileExportsMap: Record<
    string,
    Record<string, PropertyLike>
  > = {};

  const eventFileExportsMap: Record<string, { name: string; class: string }[]> =
    {};

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
  metadata.package.endpoints = Object.keys(packageJsonContents.exports).map(e =>
    e.replace("./", "").replace(".", ""),
  );

  const componentEndpointExports = metadata.package.endpoints.filter(
    e => !["custom-elements-manifest"].includes(e),
  );

  /**
   * step 2: creating components metadata
   */
  const modules = cem.modules.sort((a, b) => {
    const getPriority = (module: Module) => {
      const isConstant = module.path.endsWith("constants.ts");

      if (isConstant) return 0;

      const isEvent = module.path.endsWith("events.ts");

      if (isEvent) return 1;

      const moduleSrc = module.path;
      const moduleDir = path.dirname(moduleSrc);
      const relativePath = path.relative(packageSrcDir, moduleDir);

      if (
        module.declarations?.length === 0 &&
        relativePath.includes("/") &&
        module.path.endsWith("/index.ts")
      )
        return 2; // compound components

      if (
        module.declarations?.length === 0 &&
        !relativePath.includes("/") &&
        module.path.endsWith("/index.ts")
      )
        return 3; // non-compound components

      const isComponentsBarrel = module.path.endsWith(
        `${relativePath}/index.ts`,
      );

      if (
        !isComponentsBarrel &&
        !isConstant &&
        !module.path.includes("/base") &&
        module.declarations &&
        module.declarations.length > 0
      ) {
        return 4;
      }

      if (!module.path.includes("/base") && isComponentsBarrel) {
        return 5;
      }

      return 6;
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
      // if (module.path.endsWith("src/index.ts")) {
      //   metadata.package.barrelExports = (module.exports || []).map(
      //     e => e.name,
      //   );
      // }

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
    const isConstant = module.path.endsWith("/constants.ts");

    if (isConstant) {
      module.declarations?.forEach(d => {
        if (!constantFileExportsMap[relativePath])
          constantFileExportsMap[relativePath] = {};
        if (d.name) {
          constantFileExportsMap[relativePath][d.name] = d;
        }
      });

      continue;
    }

    if (module.path.endsWith("events.ts")) {
      eventFileExportsMap[relativePath] = (module.declarations ?? []).map(
        (e: ClassLike) => {
          const eventName = e.members?.filter(x => x.kind === "field")?.[0]
            ?.default;

          if (!eventName)
            throw new Error(
              `No name was found for ${e.name} event in ${module.path}!`,
            );

          return {
            name: eventName.replace(/"/g, ""),
            class: e.name,
          };
        },
      );

      continue;
    }

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
    if (
      !isConstant &&
      (isCompound
        ? compoundComponentsMap[relativePath] &&
          !metadata.components[compoundComponentsMap[relativePath]]
            ?.compoundParts[relativePath]
        : !metadata.components[relativePath])
    ) {
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
        endpointExports: {
          "": [],
          "*": [],
        },
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

    const isComponentsBarrel = module.path.endsWith(`${relativePath}/index.ts`);

    if (!module.path.includes("/base") && isComponentsBarrel) {
      const endpointExports: ComponentMetadata["endpointExports"] =
        componentEndpointExports.reduce((a, b) => ({ ...a, [b]: [] }), {});

      module.exports?.forEach(e => {
        if (e.declaration.package?.includes("events.ts")) {
          if (componentEndpointExports.includes("*")) {
            if (isCompound) {
              if (
                compoundComponentsMap[relativePath] &&
                metadata.components?.[compoundComponentsMap[relativePath]]
              ) {
                Object.values(
                  metadata.components?.[compoundComponentsMap[relativePath]]
                    ?.compoundParts?.[relativePath]?.events || {},
                ).forEach(e => {
                  endpointExports["*"]?.push(e.eventClassName);
                });
              }
            } else {
              Object.values(
                metadata.components?.[relativePath]?.events || {},
              ).forEach(e => {
                endpointExports["*"]?.push(e.eventClassName);
              });
            }
          }

          if (componentEndpointExports.includes("")) {
            if (isCompound) {
              if (
                compoundComponentsMap[relativePath] &&
                metadata.components?.[compoundComponentsMap[relativePath]]
              ) {
                Object.values(
                  metadata.components?.[compoundComponentsMap[relativePath]]
                    ?.compoundParts?.[relativePath]?.events || {},
                ).forEach(e => {
                  endpointExports[""]?.push(
                    `${metadata.components[relativePath]?.elementClassName}${e.eventClassName}`,
                  );
                });
              }
            } else {
              Object.values(
                metadata.components?.[relativePath]?.events || {},
              ).forEach(e => {
                endpointExports[""]?.push(
                  `${metadata.components[relativePath]?.elementClassName}${e.eventClassName}`,
                );
              });
            }
          }
        }

        if (e.name === "register") {
          if (componentEndpointExports.includes("*")) {
            endpointExports["*"]?.push(e.name);
          }

          if (componentEndpointExports.includes("")) {
            endpointExports[""]?.push(
              `${e.name}${metadata.components[relativePath]?.elementClassName}Element`,
            );
          }
        }

        if (e.name.endsWith("Slots")) {
          if (componentEndpointExports.includes("*")) {
            endpointExports["*"]?.push(e.name);
          }

          if (componentEndpointExports.includes("")) {
            endpointExports[""]?.push(
              `${metadata.components[relativePath]?.elementClassName}${e.name}`,
            );
          }
        }
      });

      if (isCompound) {
        if (
          compoundComponentsMap[relativePath] &&
          metadata.components?.[compoundComponentsMap[relativePath]]
            ?.compoundParts?.[relativePath]
        )
          metadata.components[
            compoundComponentsMap[relativePath]
          ]!.compoundParts[relativePath]!.endpointExports = endpointExports;
      } else {
        metadata.components[relativePath]!.endpointExports = endpointExports;
      }
    }

    if (
      !isComponentsBarrel &&
      !isConstant &&
      !module.path.includes("/base") &&
      module.declarations &&
      module.declarations.length > 0
    ) {
      const declaration = module.declarations[0] as CustomElementDeclaration;

      if (!declaration) continue;

      const componentMetadata:
        | ComponentMetadata
        | Omit<ComponentMetadata, "compoundParts"> = {
        relativePath,
        name: "",
        tagName: "",
        elementClassName: "",
        summary: "",
        events: {},
        props: {},
        methods: {},
        slots: {},
        ...(!isCompound && { compoundParts: {} }),
        endpointExports: {},
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

        const slotMetadata: SlotMetadata[] = declaration.slots?.map(s => {
          const key = componentsSlots[s.name];

          if (key === undefined) {
            throw new Error(`No Slot key was found for ${relativePath}`);
          }

          return {
            value: s.name,
            description: s.description || "",
            key,
          };
        });

        componentMetadata.slots = slotMetadata.reduce(
          (a, b) => ({ ...a, [b.key]: b }),
          {},
        );
      }

      if (declaration.events) {
        const eventsMap: Record<string, EventMetadata> = {};

        const eventNamesInJsdoc = declaration.events
          .filter(e => e.name && e.type?.text !== "Event")
          .map(e => e.name)
          .sort();

        const eventNamesInEventsFile = (eventFileExportsMap[relativePath] ?? [])
          .map(e => e.name)
          .sort();

        if (!arraysEqual(eventNamesInJsdoc, eventNamesInEventsFile)) {
          throw new Error(
            `Events are not sync for ${relativePath} in jsdoc (${eventNamesInJsdoc.join(", ") || "nothing!"}) and events.ts (${eventNamesInEventsFile.join(", ") || "nothing!"}).`,
          );
        }

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
          compoundParts: existingCompoundParts ?? {},
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
