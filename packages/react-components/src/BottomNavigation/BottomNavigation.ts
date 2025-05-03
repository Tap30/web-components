import * as LitReact from "@lit/react";
import * as React from "react";

import {
  BottomNavigationActiveChangeEvent,
  BottomNavigation as BottomNavigationInput,
  BottomNavigationItemSlots,
  BottomNavigationSlots,
  registerBottomNavigation,
} from "@tapsioss/web-components";

registerBottomNavigation();

export const BottomNavigation = LitReact.createComponent({
  tagName: "tapsi-bottom-navigation",
  elementClass: BottomNavigationInput,
  react: React,
  events: {
    onActiveChange:
      "activechange" as LitReact.EventName<BottomNavigationActiveChangeEvent>,
  },
});

export {
  BottomNavigationActiveChangeEvent,
  BottomNavigationInput,
  BottomNavigationItemSlots,
  BottomNavigationSlots,
};
