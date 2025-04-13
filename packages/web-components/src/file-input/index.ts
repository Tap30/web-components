import { FileInput } from "./file-input.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { FileInput };

export const register = () => {
  customElements.define("tapsi-file-input", FileInput);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-file-input": FileInput;
  }
}
