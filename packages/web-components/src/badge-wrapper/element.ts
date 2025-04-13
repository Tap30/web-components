import { BadgeWrapper } from "./badge-wrapper.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-badge-wrapper": BadgeWrapper;
  }
}

export const registerBadgeWrapperElement = () => {
  customElements.define("tapsi-badge-wrapper", BadgeWrapper);
};
