import { TextField } from "./text-field.ts";

export { BaseTextInputSlots as Slots } from "../base-text-input/index.ts";
export { TextField };

export const register = () => {
  customElements.define("tapsi-text-field", TextField);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-text-field": TextField;
  }
}
