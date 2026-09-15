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
    // Two projects, and the order matters. `vite-tsconfig-paths` matches each
    // importing file against a project's include/exclude, so:
    //
    //   - files under storybook/react/src  -> this package's tsconfig, whose
    //     `paths` point `@tapsioss/react-ui` at `src` (the override)
    //   - everything else                  -> the root tsconfig
    //
    // That is what lets Storybook hot-reload react-ui from source while the
    // root config keeps `dist` first for the playground and real consumers.
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
