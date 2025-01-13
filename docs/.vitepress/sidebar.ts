import fs from "fs";
import { DefaultTheme } from "vitepress";
import { getFileMeta } from "../../scripts/utils";
import path from "node:path";
import { Metadata } from "../../internals/doc-helpers/types";

const { dirname } = getFileMeta(import.meta.url);

const docsDir = path.join(dirname, "..");
const docsVitepressDir = path.join(docsDir, ".vitepress");
const docsDistDir = path.join(docsVitepressDir, "dist");
const metadataFile = path.join(docsDistDir, "components-metadata.json");


const getComponentsSidebarItems = (): DefaultTheme.SidebarItem[] =>
  (JSON.parse(fs.readFileSync(metadataFile).toString()) as Metadata).sidebarItems;


const getComponentsSidebar = (): DefaultTheme.Sidebar => {
  return [
    {
      text: "Components",
      collapsed: false,
      items: getComponentsSidebarItems(),
    },
  ];
};

export default getComponentsSidebar() as DefaultTheme.Sidebar;
