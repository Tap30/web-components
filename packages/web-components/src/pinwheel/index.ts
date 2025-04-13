import { Pinwheel } from "./pinwheel.ts";

export { Slots } from "./constants.ts";
export { Pinwheel };

export const register = () => {
  customElements.define("tapsi-pinwheel", Pinwheel);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-pinwheel": Pinwheel;
  }
}
