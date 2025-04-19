import { Stepper } from "./stepper.ts";

export { Stepper };

export const register = () => {
  customElements.define("tapsi-stepper", Stepper);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-stepper": Stepper;
  }
}
