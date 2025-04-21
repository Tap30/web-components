import { isSsr } from "../utils/index.ts";
import { RateSlider } from "./rate-slider.ts";

export { RateSlider };

export const register = () => {
  if (isSsr()) return;

  customElements.define("tapsi-rate-slider", RateSlider);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-rate-slider": RateSlider;
  }
}
