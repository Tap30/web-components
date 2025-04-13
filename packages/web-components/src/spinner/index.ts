import { Spinner } from "./spinner.ts";

export { Spinner };

export const register = () => {
  customElements.define("tapsi-spinner", Spinner);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-spinner": Spinner;
  }
}
