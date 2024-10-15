import { customElement } from "lit/decorators.js";
import { RatingSlider } from "./rating-slider";
import styles from "./rating-slider.style";

/**
 * @summary A slider component for rating
 *
 * @prop {number} [min=0] - The minimum value for the slider.
 * @prop {number} [max=10] - The maximum value for the slider.
 * @prop {number} value - The current value of the slider.
 *
 * @fires rating-sliderchange - Fired when the rating slider value changes.
 *
 * @csspart [rating-slider-container] - The container that wraps the component.
 * @csspart [rating-slider-dot] - The dot that represents the selected value on the slider.
 * @csspart [rating-slider-label] - The label displaying the description or value of the slider.
 * @csspart [rating-slider-rate] - The element that shows the selected rate.
 */
@customElement("tap-rating-slider")
export class TapRatingSlider extends RatingSlider {
  static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-rating-slider": RatingSlider;
  }
}
