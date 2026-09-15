// `tsc` has no concept of a CSS module. Components side-effect-import their own
// stylesheet (`import "./button.css"`), so without this ambient declaration the
// build fails with TS2307. Declaration files are exempt from
// `moduleDetection: "force"`, so this stays global rather than becoming local.
declare module "*.css";
