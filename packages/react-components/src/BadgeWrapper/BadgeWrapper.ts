import * as LitReact from "@lit/react";
import * as React from "react";

import {
  BadgeWrapper as BadgeWrapperElementClass,
  BadgeWrapperSlots,
  registerBadgeWrapper,
} from "@tapsioss/web-components";

registerBadgeWrapper();

export const BadgeWrapper = LitReact.createComponent({
  tagName: "tapsi-badge-wrapper",
  elementClass: BadgeWrapperElementClass,
  react: React,
  events: {},
});

export { BadgeWrapperSlots };
