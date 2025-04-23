import * as LitReact from "@lit/react";
import * as React from "react";

import { BottomNavigationItem as BottomNavigationItemElementClass } from "@tapsioss/web-components";

if (
  typeof window !== "undefined" &&
  !customElements.get("tapsi-bottom-navigation")
) {
  /* eslint-disable no-console */
  console.warn(
    "[TAPSI][BottomNavigationItem]: The `tapsi-bottom-navigation` tag is not registered. Since `BottomNavigationItem` is a compound component, it should be wrapped inside `BottomNavigation` component.",
  );
  /* eslint-enable no-console */
}

export const BottomNavigationItem = LitReact.createComponent({
  tagName: "tapsi-bottom-navigation-item",
  elementClass: BottomNavigationItemElementClass,
  react: React,
  events: {},
});
