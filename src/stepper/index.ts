import { customElement } from "lit/decorators.js";
import { Stepper } from "./stepper.js";
import styles from "./stepper.style.js";

@customElement("tap-stepper")
export class TapStepper extends Stepper {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-stepper": Stepper;
  }
}
