import { isSsr } from "../utils/index.ts";
import { Radio } from "./radio.ts";

export { Radio };

export const register = (): void => {
  if (isSsr()) return;
  if (customElements.get("tapsi-radio")) return;

  customElements.define("tapsi-radio", Radio);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-radio": Radio;
  }
}
