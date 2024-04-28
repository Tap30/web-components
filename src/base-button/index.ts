import { customElement } from "lit/decorators.js";
import { BaseButton } from "./base-button";
import styles from "./base-button.style";

@customElement("tap-base-button")
export class TapBaseButton extends BaseButton {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-base-button": TapBaseButton;
  }
}
