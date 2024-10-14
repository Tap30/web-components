import { customElement } from "lit/decorators.js";
import { BottomSheet } from "./bottom-sheet";
import styles from "./bottom-sheet.style";

@customElement("bottom-sheet")
export class TapBottomSheet extends BottomSheet {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "bottom-sheet": TapBottomSheet;
  }
}
