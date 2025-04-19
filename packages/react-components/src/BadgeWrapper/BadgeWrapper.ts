import * as LitReact from "@lit/react";
import * as React from "react";

import {
  BadgeWrapper as BadgeWrapperElementClass,
  BadgeWrapperSlots,
  registerBadgeWrapperElement,
} from "@tapsioss/web-components";

registerBadgeWrapperElement();

const __BadgeWrapper = LitReact.createComponent({
  tagName: "tapsi-badge-wrapper",
  elementClass: BadgeWrapperElementClass,
  react: React,
  events: {},
});

export { BadgeWrapperSlots };

const BadgeWrapper = __BadgeWrapper;

export { BadgeWrapper };
