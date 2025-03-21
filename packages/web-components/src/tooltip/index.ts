import { customElement } from "lit/decorators.js";
import { type HideEvent, type ShowEvent } from "./events.ts";
import styles from "./tooltip.style.ts";
import { Tooltip } from "./tooltip.ts";

export * from "./events.ts";

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
 * @prop {string} [anchor=""] - The id of the anchor element.
 *
 * @fires {ShowEvent} show - Fires when the tooltip should be visible. (cancelable)
 * @fires {HideEvent} hide - Fires when the tooltip should be hidden. (cancelable)
 */
@customElement("tapsi-tooltip")
export class TapsiTooltip extends Tooltip {
  public static override readonly styles = [styles];

  /**
   * @internal
   */
  declare addEventListener: <K extends keyof TapsiTooltipEventMap>(
    type: K,
    listener: (this: TapsiTooltip, ev: TapsiTooltipEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  /**
   * @internal
   */
  declare removeEventListener: <K extends keyof TapsiTooltipEventMap>(
    type: K,
    listener: (this: TapsiTooltip, ev: TapsiTooltipEventMap[K]) => void,
    options?: boolean | EventListenerOptions,
  ) => void;
}

interface TapsiTooltipEventMap extends HTMLElementEventMap {
  [HideEvent.type]: HideEvent;
  [ShowEvent.type]: ShowEvent;
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-tooltip": TapsiTooltip;
  }
}
