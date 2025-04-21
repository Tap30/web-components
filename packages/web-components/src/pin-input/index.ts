import { isSsr } from "../utils/index.ts";
import { PinInput } from "./pin-input.ts";

export * from "./events.ts";
export { PinInput };

export const register = () => {
  if (isSsr()) return;

  customElements.define("tapsi-pin-input", PinInput);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-pin-input": PinInput;
  }
}
