import { Modal } from "./modal.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { Modal };

export const register = () => {
  customElements.define("tapsi-modal", Modal);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-modal": Modal;
  }
}
