import { type CustomElement, type Export } from "custom-elements-manifest";
import { type DefaultTheme } from "vitepress";

export type HTMLTemplatePath = `${string}.html`;

export type MutatorRefName = `#${string}` | `props#${string}`;

export type Property = {
  name: string;
  defaultValue?: string | boolean | number;
  mutators?: MutatorRefName[];
};

export type SlotOption = {
  name: string;
  path: HTMLTemplatePath;
  mutates?: Array<{
    target: `props#${string}`;
    value: string | number | boolean | object | null;
  }>;
};

export type DemoSlot = {
  name: string;
  options: SlotOption[];
};

export type InteractiveDemo = {
  requiredElements?: HTMLTemplatePath[];
  properties: Property[];
  slots: DemoSlot[];
};

export type ImportPaths = {
  webComponents?: string;
  react?: string;
};

export type ExampleMetadata = {
  title: string;
  description?: string;
};

export type MetaJson = Record<string, ExampleMetadata>;

export type Example = {
  path: string;
  code: string;
  metadata: ExampleMetadata;
};

export type ComponentMetadata = CustomElement & {
  kebabCaseName: string;
  interactiveDemo?: InteractiveDemo;
  importPaths: ImportPaths;
  slotsEnumName?: string;
  exportedSlots: Export[];
  examples: Example[];
};

export type Metadata = {
  components: ComponentMetadata[];
  sidebarItems: DefaultTheme.SidebarItem[];
};
