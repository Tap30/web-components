import { BadgeWrapper } from "./badge-wrapper.ts";

export { Slots } from "./constants.ts";
export { BadgeWrapper };

export const register = () => {
  customElements.define("tapsi-badge-wrapper", BadgeWrapper);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-badge-wrapper": BadgeWrapper;
  }
}
