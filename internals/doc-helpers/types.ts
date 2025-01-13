import { type CustomElement } from "custom-elements-manifest";

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

export type ComponentSlot = {
  name: string;
  description: string;
};

export type ComponentMember = {
  type: {
    text: string;
  };
  description?: string;
  name: string;
  default?: string;
  kind: string;
};

export type ComponentEvent = {
  type?: {
    text: string;
  };
  description?: string;
  name: string;
};

export type componentSuperclass = {
  name: string;
  module: string;
};

export type ImportPaths = {
  webComponents?: string;
};

export type Component = CustomElement & {
  kebabCaseName: string;
  interactiveDemo?: InteractiveDemo;
  importPaths: ImportPaths;
  slotsEnumName?: string;
};

export type Metadata = {
  components: Component[];
  sidebarItems: DefaultTheme.SidebarItem[];
};
