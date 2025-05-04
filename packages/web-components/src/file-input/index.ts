import { isSsr } from "../utils/index.ts";
import { FileInput } from "./file-input.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { FileInput };

export const register = (): void => {
  if (isSsr()) return;
  if (customElements.get("tapsi-file-input")) return;

  customElements.define("tapsi-file-input", FileInput);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-file-input": FileInput;
  }
}
