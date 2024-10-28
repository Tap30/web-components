import { customElement } from "lit/decorators.js";
import { Tooltip } from "./tooltip";
import styles from "./tooltip.style";

// TODO: update JSDoc
/**
 * @summary A tooltip component for showing more info
 *
 * @prop {'top'| 'top-start'| 'top-end'| 'right'| 'right-start'| 'right-end'| 'bottom'| 'bottom-start'| 'bottom-end'| 'left'| 'left-start'| 'left-end'} [placement='top'] - the position of the tooltip
 * @prop {boolean} [dismissible=true] - is the tooltip dismissible?
 * @prop {string} [width='0'] - tooltip's width
 * @prop {string} [arrow-offset=''] - tooltip's arrow offset
 *
 * @slot {label} - the label of the tooltip
 * @slot {target-element} - the tooltip's target element
 *
 * @fires dismiss - Fires when the toast dismiss button is clicked
 */
@customElement("tap-tooltip")
export class TapTooltip extends Tooltip {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-tooltip": TapTooltip;
  }
}
