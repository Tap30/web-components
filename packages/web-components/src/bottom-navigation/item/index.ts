import { BottomNavigationItem } from "./item.ts";

export { Slots } from "./constants.ts";
export * from "./events.ts";
export { BottomNavigationItem };

export const register = () => {
  customElements.define("tapsi-bottom-navigation-item", BottomNavigationItem);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-bottom-navigation-item": BottomNavigationItem;
  }
}
