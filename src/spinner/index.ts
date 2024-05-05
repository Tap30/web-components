import { customElement } from "lit/decorators.js";
import { spinner } from "./spinner";
import styles from "./spinner.style";

@customElement("tap-spinner")
export class TapSpinner extends spinner {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-spinner": TapSpinner;
  }
}
