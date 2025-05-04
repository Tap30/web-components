import { isSsr } from "../utils/index.ts";
import { Snackbar } from "./snackbar.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { Snackbar };

export const register = (): void => {
  if (isSsr()) return;
  if (customElements.get("tapsi-snackbar")) return;

  customElements.define("tapsi-snackbar", Snackbar);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-snackbar": Snackbar;
  }
}
