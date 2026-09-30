// `tsc` has no concept of a CSS module, so the import needs an ambient
// declaration or the build fails with TS2307. Declaration files are exempt from
// `moduleDetection: "force"`, so this stays global rather than becoming local.
//
// One declaration covers every stylesheet in the package. There is deliberately
// no per-file generation: that would mean a `.d.css.ts` beside each stylesheet,
// which a fresh checkout would not have until it had been built.
//
// There is also deliberately NO `declare module "*.css"` alongside it. That form
// is a shorthand ambient declaration, which types the import as `any` — and when
// both patterns are declared it is the one that matches `./button.module.css`,
// so every class-name lookup silently goes unchecked.

type CSSModuleClasses = { readonly [key: string]: string };

declare module "*.module.css" {
  const classes: CSSModuleClasses;

  export default classes;
}
