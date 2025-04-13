import { Chip } from "./chip.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { Chip };

export const register = () => {
  customElements.define("tapsi-chip", Chip);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-chip": Chip;
  }
}
