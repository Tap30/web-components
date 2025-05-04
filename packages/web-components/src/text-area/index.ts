import { isSsr } from "../utils/index.ts";
import { TextArea } from "./text-area.ts";

export { BaseTextInputSlots as Slots } from "../base-text-input/index.ts";
export { TextArea };

export const register = (): void => {
  if (isSsr()) return;
  if (customElements.get("tapsi-text-area")) return;

  customElements.define("tapsi-text-area", TextArea);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-text-area": TextArea;
  }
}
