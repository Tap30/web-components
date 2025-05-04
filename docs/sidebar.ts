import fs from "fs";
import path from "node:path";
import { type DefaultTheme } from "vitepress";
import { getFileMeta } from "../scripts/utils.ts";
import { type Metadata } from "../types/docs.ts";

const { dirname } = getFileMeta(import.meta.url);

const workspaceDir = path.join(dirname, "..");
const metadataFile = path.join(
  workspaceDir,
  "packages/web-components/metadata.json",
);

const metadata = JSON.parse(
  fs.readFileSync(metadataFile).toString("utf-8"),
) as Metadata;

const components = Object.values(metadata.components)
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(c => ({
    text: c.titleCaseName,
    link: `/components/${c.relativePath}`,
  }));

const componentsSidebar = [
  {
    text: "Introduction",
    link: "/components",
    items: components,
  },
];

const themeSidebar = [
  {
    text: "Introduction",
    link: "/theme",
    items: [
      { text: "Color", link: "/theme/color" },
      { text: "Palette", link: "/theme/palette" },
      { text: "Radius", link: "/theme/radius" },
      { text: "Spacing", link: "/theme/spacing" },
      { text: "Stroke", link: "/theme/stroke" },
      { text: "Typography", link: "/theme/typography" },
    ],
  },
];

const iconsSidebar = [
  {
    text: "Introduction",
    link: "/icons",
    items: [{ text: "Explore Icons", link: "/icons/explore" }],
  },
];

const items: DefaultTheme.Sidebar = {
  "/components": componentsSidebar,
  "/theme": themeSidebar,
  "/icons": iconsSidebar,
};

export default items;
