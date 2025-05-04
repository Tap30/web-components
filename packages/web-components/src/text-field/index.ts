import { isSsr } from "../utils/index.ts";
import { TextField } from "./text-field.ts";

export { BaseTextInputSlots as Slots } from "../base-text-input/index.ts";
export { TextField };

export const register = (): void => {
  if (isSsr()) return;
  if (customElements.get("tapsi-text-field")) return;

  customElements.define("tapsi-text-field", TextField);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-text-field": TextField;
  }
}
