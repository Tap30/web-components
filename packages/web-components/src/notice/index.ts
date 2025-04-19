import { Notice } from "./notice.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { Notice };

export const register = () => {
  customElements.define("tapsi-notice", Notice);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-notice": Notice;
  }
}
