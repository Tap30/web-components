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
  reactComponents?: string;
};

export type Component = {
  id: string;
  type?: {
    text: string;
  };
  kind?: string;
  description?: string;
  name: string;
  slots?: ComponentSlot[];
  members?: ComponentMember[];
  events?: ComponentEvent[];
  superclass?: componentSuperclass;
  tagName: string;
  summary?: string;
  customElement?: boolean;
  default?: string;
  interactiveDemo?: InteractiveDemo;
  importPaths: ImportPaths;
  slotName?: string;
};

export type Metadata = {
  components: Component[];
  sidebarItems: DefaultTheme.SidebarItem[];
};
