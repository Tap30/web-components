import fs from "fs";
import path from "node:path";
import { type DefaultTheme } from "vitepress";
import { getFileMeta } from "../scripts/utils.ts";
import { type Metadata } from "../types/docs";

const { dirname } = getFileMeta(import.meta.url);

const workspaceDir = path.join(dirname, "..");
const metadataFile = path.join(
  workspaceDir,
  "packages/web-components/metadata.json",
);

const kebabToTitleCase = (input: string): string => {
  return input
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getSidebarItems = (): DefaultTheme.Sidebar => {
  const metadata = JSON.parse(
    fs.readFileSync(metadataFile).toString("utf-8"),
  ) as Metadata;

  const components = Object.values(metadata.components)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(c => ({
      text: kebabToTitleCase(c.name),
      link: `/components/${c.relativePath}`,
    }));

  return {
    "/components/": [
      {
        text: "Introduction",
        link: "/components",
        items: components,
      },
    ],
    "/theme/": [
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
    ],
  };
};

export default getSidebarItems();
