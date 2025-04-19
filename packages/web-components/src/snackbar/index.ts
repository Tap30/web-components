import { Snackbar } from "./snackbar.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { Snackbar };

export const register = () => {
  customElements.define("tapsi-snackbar", Snackbar);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-snackbar": Snackbar;
  }
}
