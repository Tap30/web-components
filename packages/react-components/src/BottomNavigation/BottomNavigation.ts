import * as LitReact from "@lit/react";
import * as React from "react";

import {
  BottomNavigationActiveChangeEvent,
  BottomNavigation as BottomNavigationElementClass,
  BottomNavigationItemSlots,
  BottomNavigationSlots,
  registerBottomNavigation,
} from "@tapsioss/web-components";

registerBottomNavigation();

const __BottomNavigation = LitReact.createComponent({
  tagName: "tapsi-bottom-navigation",
  elementClass: BottomNavigationElementClass,
  react: React,
  events: {
    onActiveChange:
      "activechange" as LitReact.EventName<BottomNavigationActiveChangeEvent>,
  },
});

export {
  BottomNavigationActiveChangeEvent,
  BottomNavigationItemSlots,
  BottomNavigationSlots,
};

const BottomNavigation = __BottomNavigation;

export { BottomNavigation };
