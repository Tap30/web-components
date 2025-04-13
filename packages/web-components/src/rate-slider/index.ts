import { RateSlider } from "./rate-slider.ts";

export { RateSlider };

export const register = () => {
  customElements.define("tapsi-rate-slider", RateSlider);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-rate-slider": RateSlider;
  }
}
