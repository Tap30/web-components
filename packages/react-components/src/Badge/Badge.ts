import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  Badge as BadgeElement,
  BadgeSlots,
  registerBadge,
} from "@tapsioss/web-components";

registerBadge();

export const Badge: ReactWebComponent<BadgeElement> = createComponent({
  tagName: "tapsi-badge",
  elementClass: BadgeElement,
  react: React,
  events: {},
});

export { BadgeElement, BadgeSlots };
