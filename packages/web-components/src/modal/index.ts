import { isSsr } from "../utils/index.ts";
import { Modal } from "./modal.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { Modal };

export const register = (): void => {
  if (isSsr()) return;
  if (customElements.get("tapsi-modal")) return;

  customElements.define("tapsi-modal", Modal);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-modal": Modal;
  }
}
