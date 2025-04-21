import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Badge as BadgeElementClass,
  BadgeSlots,
  registerBadge,
} from "@tapsioss/web-components";

registerBadge();

const __Badge = LitReact.createComponent({
  tagName: "tapsi-badge",
  elementClass: BadgeElementClass,
  react: React,
  events: {},
});

export { BadgeSlots };

const Badge = __Badge;

export { Badge };
