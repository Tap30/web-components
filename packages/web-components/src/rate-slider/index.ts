import { isSsr } from "../utils/index.ts";
import { RateSlider } from "./rate-slider.ts";

export { RateSlider };

export const register = (): void => {
  if (isSsr()) return;
  if (customElements.get("tapsi-rate-slider")) return;

  customElements.define("tapsi-rate-slider", RateSlider);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-rate-slider": RateSlider;
  }
}
