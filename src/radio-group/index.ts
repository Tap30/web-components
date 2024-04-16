import { customElement } from "lit/decorators.js";
import { RadioGroup } from "./radio-group";
import styles from "./radio-group.style";

@customElement("tap-radio-group")
export class TapSegmentedButtonGroup extends RadioGroup {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-radio-group": TapSegmentedButtonGroup;
  }
}
