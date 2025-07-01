type SVGPathInfo = {
  clipRule?: string;
  fillRule?: string;
  xlinkHref?: string;
  d: string;
};

// NOTE: In case of any changes, update this file too: `packages/icons/scripts/build.ts`
type SVGIconInfo = {
  kebabName: string;
  pascalName: string;
  dataUrl: string;
  paths: SVGPathInfo[];
};

declare const _default: Record<string, SVGIconInfo>;
export default _default;
