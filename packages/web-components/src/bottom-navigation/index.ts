import { registerBottomNavigationElement } from "./element.ts";

export { BottomNavigation } from "./bottom-navigation.ts";
export { Slots } from "./constants.ts";
export * from "./events.ts";

export {
  BottomNavigationItem,
  ActivateEvent as ItemActivateEvent,
  Slots as ItemSlots,
} from "./item/index.ts";

registerBottomNavigationElement();
