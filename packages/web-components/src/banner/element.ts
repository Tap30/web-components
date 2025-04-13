import { Banner } from "./banner.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-banner": Banner;
  }
}

export const registerBannerElement = () => {
  customElements.define("tapsi-banner", Banner);
};
