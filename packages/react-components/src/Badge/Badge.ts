import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Badge as BadgeElementClass,
  BadgeSlots,
  registerBadge,
} from "@tapsioss/web-components";

registerBadge();

export const Badge = LitReact.createComponent({
  tagName: "tapsi-badge",
  elementClass: BadgeElementClass,
  react: React,
  events: {},
});

export { BadgeElementClass, BadgeSlots };
