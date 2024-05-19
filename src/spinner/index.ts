import { customElement } from "lit/decorators.js";
import { Spinner } from "./spinner";
import styles from "./spinner.style";

@customElement("tap-spinner")
export class TapSpinner extends Spinner {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-spinner": TapSpinner;
  }
}
