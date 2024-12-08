import { customElement } from "lit/decorators.js";
import { ProgressIndicator } from "./progress-indicator.js";
import styles from "./progress-indicator.style.js";

/**
 * @summary A progress indicator component displaying multiple steps.
 *
 * @prop {number} [max=2] - The total number of steps.
 * @prop {number} [current=0] - The current step index.
 *
 * @csspart [progressbar] - The container for the progress bar.
 * @csspart [step] - Each individual step in the progress bar.
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
