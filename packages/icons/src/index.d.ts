type SVGPathInfo = {
    clipRule?: string;
    fillRule?: string;
    xlinkHref?: string;
    d: string;
};
type SVGIconInfo = {
    kebabName: string;
    pascalName: string;
    paths: SVGPathInfo[];
};
declare const _default: Record<string, SVGIconInfo>;
export default _default;
