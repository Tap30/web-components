import type { CoverageReportOptions } from "monocart-coverage-reports";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const playgroundAssets = path.resolve(
  packageDir,
  "../../playground/react/dist/assets",
);

/**
 * `@tapsioss/react-ui` must be covered 100% by its tests. `pnpm test` fails
 * otherwise — see `global-teardown.ts`.
 *
 * Coverage is V8's, collected per test by `@internals/test-helpers` while the
 * suite runs against the playground's build. That build bundles react-ui's
 * `dist`; source maps chain it back to `src` (see `playground/react/vite.config.ts`),
 * so the numbers below are about the source you wrote.
 */
export const THRESHOLDS = {
  statements: 100,
  branches: 100,
  functions: 100,
  lines: 100,
} as const;

export const COVERAGE_DIR = "./coverage";

export const coverageOptions: CoverageReportOptions = {
  name: "@tapsioss/react-ui coverage",
  outputDir: COVERAGE_DIR,
  // Only the playground's bundled scripts; the page itself is not ours.
  entryFilter: entry => /\/assets\/[^/]+\.js$/.test(entry.url),
  // The bundles' maps are read from the playground's build on disk. The report
  // is generated in the global teardown, after the preview server that served
  // them has stopped, so fetching them by URL would find nothing. A bundle
  // without a map on disk stays unmapped — react-ui's files then never show up
  // as covered, and `all` below reports them at 0%, so it fails loudly.
  sourceMapResolver: url => {
    const file = path.join(
      playgroundAssets,
      path.basename(new URL(url).pathname),
    );

    return Promise.resolve(
      existsSync(file)
        ? (JSON.parse(readFileSync(file, "utf8")) as object)
        : undefined,
    );
  },
  // Of everything the bundles map back to, only react-ui's source. Paths come
  // in two shapes: `packages/react-ui/src/…` from the source maps, and `src/…`
  // (relative to this package) from `all` below. The playground's own
  // `src/test-setup.tsx` has the second shape too, hence the existence check.
  sourceFilter: sourcePath =>
    sourcePath.startsWith("packages/react-ui/src/") ||
    (sourcePath.startsWith("src/") &&
      existsSync(path.join(packageDir, sourcePath))),
  // Both shapes reported as `src/…`, so a covered file and its `all` entry are
  // recognised as the same file.
  sourcePath: sourcePath => sourcePath.replace(/^packages\/react-ui\//, ""),
  // A source file no test reaches is reported at 0% instead of being left out,
  // so a new component without tests fails the threshold. `index.ts` files
  // only re-export and have nothing to execute.
  all: {
    dir: ["./src"],
    filter: {
      "**/*.test.{ts,tsx}": false,
      "**/*.d.ts": false,
      "**/index.ts": false,
      "**/*.css": false,
      "**/*.{ts,tsx}": true,
    },
  },
  reports: ["v8", "console-details"],
  onEnd: results => {
    if (!results) {
      throw new Error(
        "No coverage was collected for @tapsioss/react-ui. Is `use.coverageDir` " +
          "still set in playwright.config.ts?",
      );
    }

    const failures = Object.entries(THRESHOLDS).flatMap(([metric, min]) => {
      const pct = results.summary[metric as keyof typeof THRESHOLDS].pct;

      return typeof pct === "number" && pct >= min
        ? []
        : [`${metric}: ${String(pct)}% (required: ${String(min)}%)`];
    });

    if (failures.length > 0) {
      throw new Error(
        `@tapsioss/react-ui coverage is below the threshold:\n  ` +
          `${failures.join("\n  ")}\n` +
          `See ${COVERAGE_DIR}/index.html for the uncovered lines.`,
      );
    }
  },
};
