import { isSsr } from "../utils/index.ts";
import { BottomNavigation } from "./bottom-navigation.ts";
import { BottomNavigationItem } from "./item/item.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { Slots as ItemSlots } from "./item/index.ts";
export { BottomNavigation, BottomNavigationItem };

export const register = () => {
  if (isSsr()) return;

  customElements.define("tapsi-bottom-navigation", BottomNavigation);
  customElements.define("tapsi-bottom-navigation-item", BottomNavigationItem);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-bottom-navigation": BottomNavigation;
    "tapsi-bottom-navigation-item": BottomNavigationItem;
  }
}
