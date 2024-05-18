import { customElement } from "lit/decorators.js";
import { Tooltip } from "./tooltip";
import styles from "./tooltip.style";

/**
 * Tooltip component to display contextual information for a target element.
 * 
 * ### Example
 * 
 * ```html
 * <tooltip-element placement="top">
 *   <div slot="target-element">Hover me</div>
 *   <span slot="label">Tooltip content</span>
 * </tooltip-element>
 * ```
 * 
 * @summary Displays a tooltip for a target element with various customization options.
 * 
 * @slot target-element - The element that triggers the tooltip.
 * @slot label - The content of the tooltip.
 * 
 * @prop {'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end'} [placement='top'] - The preferred placement of the tooltip.
 * @prop {boolean} [dismissible=true] - If true, shows a dismiss button on the tooltip.
 * @prop {string} [width='0'] - [width='0'] - The width of the tooltip. Can be specified in px or %.
 * @prop {string} [arrowOffset=''] - The arrow's offset from its default position, in pixels. For top or bottom placements, the offset is from the left. For left or right placements, the offset is from the top.
 * 
 * @csspart tooltip - The main tooltip container.
 * @csspart tooltip-icon - The container for the tooltip arrow.
 * @csspart tooltip-label - The container for the tooltip content.
 */
@customElement("tap-tooltip")
export class TapTooltip extends Tooltip {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-tooltip": TapTooltip;
  }
}
