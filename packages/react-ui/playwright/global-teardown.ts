import { CoverageReport } from "monocart-coverage-reports";
import { coverageOptions } from "./coverage.ts";

/**
 * Turns the coverage every test collected into one report, and fails the run
 * when it is under the thresholds in `coverage.ts`.
 */
export default async function globalTeardown() {
  await new CoverageReport(coverageOptions).generate();
}
