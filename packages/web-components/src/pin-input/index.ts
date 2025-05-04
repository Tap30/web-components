import { isSsr } from "../utils/index.ts";
import { PinInput } from "./pin-input.ts";

export * from "./events.ts";
export { PinInput };

export const register = (): void => {
  if (isSsr()) return;
  if (customElements.get("tapsi-pin-input")) return;

  customElements.define("tapsi-pin-input", PinInput);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-pin-input": PinInput;
  }
}
