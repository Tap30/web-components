import { isSsr } from "../utils/index.ts";
import { EmptyState } from "./empty-state.ts";

export { Slots } from "./constants.ts";
export { EmptyState };

export const register = () => {
  if (isSsr()) return;

  customElements.define("tapsi-empty-state", EmptyState);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-empty-state": EmptyState;
  }
}
