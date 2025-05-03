import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Badge as BadgeInput,
  BadgeSlots,
  registerBadge,
} from "@tapsioss/web-components";

registerBadge();

export const Badge = LitReact.createComponent({
  tagName: "tapsi-badge",
  elementClass: BadgeInput,
  react: React,
  events: {},
});

export { BadgeInput, BadgeSlots };
