import { customElement } from "lit/decorators.js";
import { ProgressIndicator } from "./progress-indicator.js";
import styles from "./progress-indicator.style.js";

/**
 * ### Example
 * @summary A progress indicator component displaying multiple steps.
 *
 * @prop {number} [max=2] - The total number of steps.
 * @prop {number} [current=0] - The current step index.
 *
 * @csspart [progressbar] - The container for the progress bar.
 * @csspart [step] - Each individual step in the progress bar.
 *
 * @cssprop [--tap-progress-indicator-progressbar-color=--tap-sys-spacing-3] - The gap between steps.
 * @cssprop [--tap-progress-indicator-step-height=--tap-sys-spacing-3] - The height of each step.
 * @cssprop [--tap-progress-indicator-step-background-color=--tap-sys-color-surface-tertiary] - The background color of each step.
 * @cssprop [--tap-progress-indicator-active-step-background-color=--tap-sys-color-border-inverse-primary] - The background color of active steps.
 */
@customElement("tap-progress-indicator")
export class TapProgressIndicator extends ProgressIndicator {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-progress-indicator": TapProgressIndicator;
  }
}
