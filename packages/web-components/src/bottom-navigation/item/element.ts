import { BottomNavigationItem } from "./item.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-bottom-navigation-item": BottomNavigationItem;
  }
}

export const registerBottomNavigationItemElement = () => {
  customElements.define("tapsi-bottom-navigation-item", BottomNavigationItem);
};
