import { BottomNavigation } from "./bottom-navigation.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-bottom-navigation": BottomNavigation;
  }
}

export const registerBottomNavigationElement = () => {
  customElements.define("tapsi-bottom-navigation", BottomNavigation);
};
