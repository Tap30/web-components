import { registerBottomNavigationElement } from "./element.ts";

export {
  BottomNavigationItem,
  eventsMap as ItemEventMap,
  Slots as ItemSlots,
  tagName as ItemTagName,
} from "./item/index.ts";

export const {
  elementClass: BottomNavigation,
  tagName,
  Slots,
  eventsMap,
} = registerBottomNavigationElement();
