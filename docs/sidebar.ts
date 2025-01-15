import fs from "fs";
import path from "node:path";
import { type DefaultTheme } from "vitepress";
import { type Metadata } from "../internals/doc-helpers/types";
import { getFileMeta } from "../scripts/utils";

const { dirname } = getFileMeta(import.meta.url);

const workspaceDir = path.join(dirname, "..");
const distDir = path.join(workspaceDir, "dist");
const metadataFile = path.join(distDir, "components-metadata.json");

const getComponentsSidebar = (): DefaultTheme.Sidebar => {
  return (
    JSON.parse(fs.readFileSync(metadataFile).toString("utf-8")) as Metadata
  ).sidebarItems;
};

export default getComponentsSidebar();
