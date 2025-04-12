import type { RegisteredCustomElement } from "../internals/types.ts";
import { BottomNavigation } from "./bottom-navigation.ts";
import { Slots } from "./constants.ts";
import { ActiveChangeEvent } from "./events.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-bottom-navigation": BottomNavigation;
  }
}

export const registerBottomNavigationElement = () => {
  customElements.define("tapsi-bottom-navigation", BottomNavigation);

  return {
    Slots,
    eventsMap: {
      [ActiveChangeEvent.type]: ActiveChangeEvent,
    },
    tagName: "tapsi-bottom-navigation",
    elementClass: BottomNavigation,
  } as const satisfies RegisteredCustomElement;
};
