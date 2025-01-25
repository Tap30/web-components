import fs from "fs";
import path from "node:path";
import { type DefaultTheme } from "vitepress";
import { type Metadata } from "../internals/doc-helpers/types.ts";
import { getFileMeta } from "../scripts/utils.ts";

const { dirname } = getFileMeta(import.meta.url);

const workspaceDir = path.join(dirname, "..");
const distDir = path.join(workspaceDir, "dist");
const metadataFile = path.join(distDir, "components-metadata.json");

const getComponentsSidebarItems = (): DefaultTheme.SidebarItem[] =>
  (JSON.parse(fs.readFileSync(metadataFile).toString("utf-8")) as Metadata)
    .sidebarItems;

const getComponentsSidebar = (): DefaultTheme.Sidebar => {
  return [
    {
      text: "Components",
      collapsed: false,
      items: getComponentsSidebarItems(),
    },
  ];
};

export default getComponentsSidebar();
