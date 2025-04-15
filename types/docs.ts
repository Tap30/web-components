export type SlotMetadata = { name: string; description: string };
export type EventMetadata = {
  name: string;
  eventClassName: string;
  bubbles: boolean;
  cancelable: boolean;
};

export type ComponentMetadata = {
  summary: string;
  relativePath: string;
  tagName: string;
  name: string;
  slots: Record<string, SlotMetadata>;
  events: Record<string, EventMetadata>;
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
