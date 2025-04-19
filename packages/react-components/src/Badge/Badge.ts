import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Badge as BadgeElementClass,
  BadgeSlots,
  registerBadgeElement,
} from "@tapsioss/web-components";

registerBadgeElement();

const __Badge = LitReact.createComponent({
  tagName: "tapsi-badge",
  elementClass: BadgeElementClass,
  react: React,
  events: {},
});

export { BadgeSlots };

const Badge = __Badge;

export { Badge };
