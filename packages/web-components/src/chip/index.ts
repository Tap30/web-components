import { isSsr } from "../utils/index.ts";
import { Chip } from "./chip.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { Chip };

export const register = () => {
  if (isSsr()) return;
  if (customElements.get("tapsi-chip")) return;

  customElements.define("tapsi-chip", Chip);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-chip": Chip;
  }
}
