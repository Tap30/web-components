import {
  createComponent,
  type EventName,
  type ReactWebComponent,
} from "@lit/react";
import * as React from "react";

import {
  BottomNavigationActiveChangeEvent,
  BottomNavigation as BottomNavigationElement,
  BottomNavigationItemSlots,
  BottomNavigationSlots,
  registerBottomNavigation,
} from "@tapsioss/web-components";

registerBottomNavigation();

export const BottomNavigation: ReactWebComponent<
  BottomNavigationElement,
  { onActiveChange: EventName<BottomNavigationActiveChangeEvent> }
> = createComponent({
  tagName: "tapsi-bottom-navigation",
  elementClass: BottomNavigationElement,
  react: React,
  events: {
    onActiveChange:
      "activechange" as EventName<BottomNavigationActiveChangeEvent>,
  },
});

export {
  BottomNavigationActiveChangeEvent,
  BottomNavigationElement,
  BottomNavigationItemSlots,
  BottomNavigationSlots,
};
