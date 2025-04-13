import type { RegisteredCustomElement } from "../internals/types.ts";
import { Slots } from "./constants.ts";
import { Snackbar } from "./snackbar.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-snackbar": Snackbar;
  }
}

export const registerSnackbarElement = () => {
  customElements.define("tapsi-snackbar", Snackbar);

  return {
    Slots,
    tagName: "tapsi-snackbar",
    elementClass: Snackbar,
  } as const satisfies RegisteredCustomElement;
};
