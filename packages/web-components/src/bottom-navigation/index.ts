import { BottomNavigation } from "./bottom-navigation.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { BottomNavigation };

export const register = () => {
  customElements.define("tapsi-bottom-navigation", BottomNavigation);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-bottom-navigation": BottomNavigation;
  }
}
