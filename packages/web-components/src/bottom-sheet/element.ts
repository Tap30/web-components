import { BottomSheet } from "./bottom-sheet.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-bottom-sheet": BottomSheet;
  }
}

export const registerBottomSheetElement = () => {
  customElements.define("tapsi-bottom-sheet", BottomSheet);
};
