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

  // All stories live in this package, one folder per documented workspace
  // package (`src/react-ui/`, `src/theme/`). They import their subjects by
  // package name, so component packages stay free of Storybook tooling.
  // Sidebar grouping comes from each story's `title`, not from file location.
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],

  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],

  viteFinal: config => {
    // Two projects: files under storybook/react/src use this package's
    // tsconfig (bundler resolution for Storybook's own types); everything else
    // uses the root's. Both carry the root `paths`, which resolve every
    // hand-written package to source — so Storybook hot-reloads from source
    // and `storybook build` needs no package build first.
    config.plugins ??= [];
    config.plugins.push(
      tsconfigPaths({
        projects: [
          resolve(configDir, "../tsconfig.json"),
          resolve(repoRoot, "tsconfig.json"),
        ],
      }),
    );

    return config;
  },
};

export default config;
