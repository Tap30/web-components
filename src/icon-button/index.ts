import { customElement } from "lit/decorators.js";
import { IconButton } from "./icon-button";
import styles from "./icon-button.style";

@customElement("tap-icon-button")
export class TapIconButton extends IconButton {
  static readonly styles = [...super.styles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-icon-button": TapIconButton;
  }
}
