import { Banner } from "./banner.ts";

export { Slots } from "./constants.ts";
export { Banner };

export const register = () => {
  customElements.define("tapsi-banner", Banner);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-banner": Banner;
  }
}
