import { CoverageReport } from "monocart-coverage-reports";
import { coverageOptions } from "./coverage.ts";

/** Starts every run from an empty cache, so no earlier run's data is merged in. */
export default function globalSetup() {
  new CoverageReport(coverageOptions).cleanCache();
}
