import { customElement } from "lit/decorators.js";
import { Pinwheel } from "./pinwheel";
import styles from "./pinwheel.style";

@customElement("tap-pinwheel")
export class TapPinwheel extends Pinwheel {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-pinwheel": TapPinwheel;
  }
}
