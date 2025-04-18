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

  return Object.values(metadata.components).map(c => ({
    text: c.name,
    link: `/components/${c.relativePath}`,
  }));
};

export default getSidebarItems();
