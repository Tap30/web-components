import { isSsr } from "../utils/index.ts";
import { EmptyState } from "./empty-state.ts";

export { Slots } from "./constants.ts";
export { EmptyState };

export const register = (): void => {
  if (isSsr()) return;
  if (customElements.get("tapsi-empty-state")) return;

  customElements.define("tapsi-empty-state", EmptyState);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-empty-state": EmptyState;
  }
}
