import fs from "fs";
import path from "node:path";
import { type DefaultTheme } from "vitepress";
import { getFileMeta } from "../scripts/utils.ts";
import { type Metadata } from "../types/docs.ts";

const { dirname } = getFileMeta(import.meta.url);

const workspaceDir = path.join(dirname, "..");
const metadataFile = path.join(workspaceDir, "packages/web-components/components-metadata.json");

const getSidebarItems = (): DefaultTheme.Sidebar => {
  return (
    JSON.parse(fs.readFileSync(metadataFile).toString("utf-8")) as Metadata
  ).sidebarItems;
};

export default getSidebarItems();
