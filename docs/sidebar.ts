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

const getSidebarItems = (): DefaultTheme.Sidebar => {
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
      link: "/",
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

  return {
    "/components": componentsSidebar,
    "/theme": themeSidebar,
  };
};

export default getSidebarItems();
