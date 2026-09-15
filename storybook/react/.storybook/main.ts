import { type StorybookConfig } from "@storybook/react-vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import tsconfigPaths from "vite-tsconfig-paths";

// `storybook/react/.storybook` -> repo root. Derived rather than hard-coded so
// this survives the package being moved again.
const configDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(configDir, "../../..");

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  // Stories are collected from this package and from every React-rendered
  // workspace package. Sidebar grouping comes from each story's `title`
  // (e.g. "Theme/Colors", "React UI/Button"), not from file location.
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(ts|tsx)",
    "../../../packages/react-ui/src/**/*.mdx",
    "../../../packages/react-ui/src/**/*.stories.@(ts|tsx)",
  ],

  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],

  viteFinal: config => {
    // Resolve `@tapsioss/*` through the root tsconfig `paths`, which point at
    // package sources rather than `dist`. This is what makes edits anywhere in
    // the workspace hot-reload without a build or a publish.
    config.plugins ??= [];
    config.plugins.push(
      tsconfigPaths({
        projects: [resolve(repoRoot, "tsconfig.json")],
      }),
    );

    return config;
  },
};

export default config;
