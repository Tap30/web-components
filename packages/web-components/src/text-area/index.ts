import { TextArea } from "./text-area.ts";

export { BaseTextInputSlots as Slots } from "../base-text-input/index.ts";
export { TextArea };

export const register = () => {
  customElements.define("tapsi-text-area", TextArea);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-text-area": TextArea;
  }
}
