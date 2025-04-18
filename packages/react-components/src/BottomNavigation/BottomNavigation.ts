import * as LitReact from "@lit/react";
import * as React from "react";

/* START: AUTO-GENERATED [DO_NOT_REMOVE] */
import {
  BottomNavigationActiveChangeEvent,
  BottomNavigation as BottomNavigationElementClass,
  BottomNavigationItemSlots,
  BottomNavigationSlots,
  registerBottomNavigationElement,
} from "@tapsioss/web-components";

registerBottomNavigationElement();

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

/* END: AUTO-GENERATED [DO_NOT_REMOVE] */

const BottomNavigation = __BottomNavigation;

export { BottomNavigation };
