import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import { BottomNavigationItem as BottomNavigationItemElement } from "@tapsioss/web-components";

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

export const BottomNavigationItem: ReactWebComponent<BottomNavigationItemElement> =
  createComponent({
    tagName: "tapsi-bottom-navigation-item",
    elementClass: BottomNavigationItemElement,
    react: React,
    events: {},
  });
