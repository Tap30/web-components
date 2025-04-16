export type SlotMetadata = {
  value: string;
  description: string;
  key: string;
};
export type EventMetadata = {
  name: string;
  eventClassName: string;
  description: string;
  bubbles: boolean;
  cancelable: boolean;
};
export type PropMetadata = {
  name: string;
  description: string;
  type: string;
  default: string;
  attribute: string;
};
export type MethodParameterMetadata = {
  name: string;
  description: string;
  type: string;
};
export type MethodMetadata = {
  name: string;
  description: string;
  parameters: MethodParameterMetadata[];
};

export type ComponentMetadata = {
  summary: string;
  relativePath: string;
  tagName: string;
  name: string;
  slots: Record<string, SlotMetadata>;
  events: Record<string, EventMetadata>;
  props: Record<string, PropMetadata>;
  methods: Record<string, MethodMetadata>;
  elementClassName: string;
  compoundParts: Record<string, Omit<ComponentMetadata, "compoundParts">>;
};

export type PackageMetadata = {
  endpoints: string[];
  name: string;
  barrelExports: string[];
};

export type Metadata = {
  package: PackageMetadata;
  components: Record<string, ComponentMetadata>;
};
