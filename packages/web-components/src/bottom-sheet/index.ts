import { BottomSheet } from "./bottom-sheet.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { BottomSheet };

export const register = () => {
  customElements.define("tapsi-bottom-sheet", BottomSheet);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-bottom-sheet": BottomSheet;
  }
}
