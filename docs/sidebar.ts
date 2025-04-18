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

const getSidebarItems = (): DefaultTheme.Sidebar => {
  const metadata = JSON.parse(
    fs.readFileSync(metadataFile).toString("utf-8"),
  ) as Metadata;

  const components = Object.values(metadata.components).map(c => ({
    text: c.name,
    link: `/components/${c.relativePath}`,
  }));

  return {
    "/components/": [
      {
        text: "Components",
        items: [{ text: "Components", link: "/components" }, ...components],
      },
    ],
    "/theme/": [
      {
        text: "Theme",
        link: "/theme",
        items: [
          { text: "Palette", link: "/theme/palette" },
          { text: "Color", link: "/theme/color" },
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
