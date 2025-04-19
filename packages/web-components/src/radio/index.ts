import { Radio } from "./radio.ts";

export { Radio };

export const register = () => {
  customElements.define("tapsi-radio", Radio);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-radio": Radio;
  }
}
