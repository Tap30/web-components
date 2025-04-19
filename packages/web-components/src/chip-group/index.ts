import { ChipGroup } from "./chip-group.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { ChipGroup };

export const register = () => {
  customElements.define("tapsi-chip-group", ChipGroup);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-chip-group": ChipGroup;
  }
}
