import { customElement } from "lit/decorators.js";
import { Button } from "./button";
import styles from "./button.style";

@customElement("tap-button")
export class TapButton extends Button {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-button": Button;
  }
}
