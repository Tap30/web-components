import react from "@vitejs/plugin-react";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Hands Rollup the source map that `tsc` wrote next to each `@tapsioss/react-ui`
 * file, so the bundle's own map chains through it back to `src`. That chain is
 * what lets `@tapsioss/react-ui`'s coverage report speak about its source.
 *
 * Rollup does not read input source maps on its own, and react-ui's build
 * strips the `//# sourceMappingURL` comment (the maps are not shipped), so the
 * map is found by its `<file>.map` name.
 */
const reactUiSourceMaps = (): Plugin => ({
  name: "react-ui-source-maps",
  load(id) {
    if (!/[\\/]packages[\\/]react-ui[\\/]dist[\\/].+\.js$/.test(id)) {
      return null;
    }

    const mapFile = `${id}.map`;

    if (!existsSync(mapFile)) return null;

    return {
      code: readFileSync(id, "utf8"),
      map: readFileSync(mapFile, "utf8"),
    };
  },
});

const reactUiSrc = path.resolve(__dirname, "../../packages/react-ui/src");

export default defineConfig(({ command }) => ({
  plugins: [reactUiSourceMaps(), tsconfigPaths(), react()],
  // `pnpm dev` (Vite's `serve`) reads react-ui from SOURCE: Vite compiles the
  // TSX and CSS modules itself, so an edit shows up immediately, with no
  // watcher and nothing to build first. `vite build` — what the test suite and
  // its coverage run against — still resolves the package through its
  // `exports` to the built `dist`, the shape consumers get.
  resolve:
    command === "serve"
      ? {
          alias: [
            {
              find: /^@tapsioss\/react-ui$/,
              replacement: `${reactUiSrc}/index.ts`,
            },
            {
              find: /^@tapsioss\/react-ui\/(.+)$/,
              replacement: `${reactUiSrc}/$1/index.ts`,
            },
          ],
        }
      : {},
  build: {
    // Both for the coverage report: maps to trace the bundle back to source,
    // and no minification, which would leave little for them to map.
    sourcemap: true,
    minify: false,
    rollupOptions: {
      input: {
        test: path.resolve(__dirname, "test.html"),
        dev: path.resolve(__dirname, "index.html"),
      },
    },
  },
}));
