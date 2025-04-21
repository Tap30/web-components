import { isSsr } from "../utils/index.ts";
import { Spinner } from "./spinner.ts";

export { Spinner };

export const register = () => {
  if (isSsr()) return;

  customElements.define("tapsi-spinner", Spinner);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-spinner": Spinner;
  }
}
