import { EmptyState } from "./empty-state.ts";

export { Slots } from "./constants.ts";
export { EmptyState };

export const register = () => {
  customElements.define("tapsi-empty-state", EmptyState);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-empty-state": EmptyState;
  }
}
