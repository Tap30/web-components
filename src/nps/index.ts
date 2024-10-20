import { customElement } from "lit/decorators.js";
import { Nps } from "./nps";
import styles from "./nps.style";

/**
 * @summary A slider component for rating
 *
 * @prop {number} [min=0] - The minimum value for the slider.
 * @prop {number} [max=10] - The maximum value for the slider.
 * @prop {number} value - The current value of the slider.
 *
 * @fires npschange - Fired when the rating slider value changes.
 *
 * @csspart [container] - The container that wraps the component.
 * @csspart [dot] - The dot that represents the selected value on the slider.
 * @csspart [label] - The label displaying the description or value of the slider.
 * @csspart [rate] - The element that shows the selected rate.
 */
@customElement("tap-nps")
export class TapNps extends Nps {
  static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-nps": TapNps;
  }
}
