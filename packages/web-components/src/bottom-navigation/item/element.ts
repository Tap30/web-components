import type { RegisteredCustomElement } from "../../internals/types.ts";
import { Slots } from "./constants.ts";
import { ActivateEvent } from "./events.ts";
import { BottomNavigationItem } from "./item.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-bottom-navigation-item": BottomNavigationItem;
  }
}

export const registerBottomNavigationItemElement = () => {
  customElements.define("tapsi-bottom-navigation-item", BottomNavigationItem);

  return {
    Slots,
    eventsMap: {
      [ActivateEvent.type]: ActivateEvent,
    },
    tagName: "tapsi-bottom-navigation-item",
    elementClass: BottomNavigationItem,
  } as const satisfies RegisteredCustomElement;
};
