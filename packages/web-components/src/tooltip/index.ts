import { customElement } from "lit/decorators.js";
import { Tooltip } from "./tooltip";
import styles from "./tooltip.style";

export { Slots } from "./constants";
export * from "./events";

/**
 * @summary The tooltip component.
 *
 * @tag tapsi-tooltip
 *
 * @prop {'top'| 'top-start'| 'top-end'| 'right'| 'right-start'| 'right-end'| 'bottom'| 'bottom-start'| 'bottom-end'| 'left'| 'left-start'| 'left-end'} [placement='top'] -
 * The position of the tooltip based on the anchor.
 * @prop {boolean} [dismissible=true] - Whether tooltip is dismissable or not.
 * @prop {string} [text=""] - The text content of the tooltip.
 * @prop {boolean} [visible=false] - Whether the tooltip is visible or not.
 * @prop {boolean} [no-hover-activation=false] - Whether to prevent showing tooltip on hover or not.
 * @prop {boolean} [no-focus-activation=false] - Whether to prevent showing tooltip on focus or not.
 * @prop {boolean} [no-escape-deactivation=false] - Whether to hide tooltip on escape or not.
 *
 * @slot - The default slot used for anchor element.
 *
 * @fires {ShowEvent} show - Fires when the tooltip should be visible.
 * @fires {HideEvent} hide - Fires when the tooltip should be hidden.
 */
@customElement("tapsi-tooltip")
export class TapsiTooltip extends Tooltip {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-tooltip": TapsiTooltip;
  }
}
