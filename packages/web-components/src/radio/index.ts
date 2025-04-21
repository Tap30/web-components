import { isSsr } from "../utils/index.ts";
import { Radio } from "./radio.ts";

export { Radio };

export const register = () => {
  if (isSsr()) return;

  customElements.define("tapsi-radio", Radio);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-radio": Radio;
  }
}
