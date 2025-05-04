import { isSsr } from "../utils/index.ts";
import { Stepper } from "./stepper.ts";

export { Stepper };

export const register = (): void => {
  if (isSsr()) return;
  if (customElements.get("tapsi-stepper")) return;

  customElements.define("tapsi-stepper", Stepper);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-stepper": Stepper;
  }
}
