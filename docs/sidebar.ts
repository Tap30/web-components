import fs from "fs";
import path from "node:path";
import { type DefaultTheme } from "vitepress";
import { type Metadata } from "../internals/doc-helpers/types";
import { getFileMeta } from "../scripts/utils";

const { dirname } = getFileMeta(import.meta.url);

const docsVitepressDir = path.join(dirname, ".vitepress");
const docsDistDir = path.join(docsVitepressDir, "dist");
const metadataFile = path.join(docsDistDir, "components-metadata.json");

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
