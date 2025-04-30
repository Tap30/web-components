import { isSsr } from "../utils/index.ts";
import { DiscountCard } from "./discount-card.ts";

export { Slots } from "./constants.ts";
export { DiscountCard };

export const register = () => {
  if (isSsr()) return;

  if (customElements.get("tapsi-discount-card")) return;

  customElements.define("tapsi-discount-card", DiscountCard);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-discount-card": DiscountCard;
  }
}
