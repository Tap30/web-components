import * as LitReact from "@lit/react";
import * as React from "react";

import {
  BadgeWrapper as BadgeWrapperInput,
  BadgeWrapperSlots,
  registerBadgeWrapper,
} from "@tapsioss/web-components";

registerBadgeWrapper();

export const BadgeWrapper = LitReact.createComponent({
  tagName: "tapsi-badge-wrapper",
  elementClass: BadgeWrapperInput,
  react: React,
  events: {},
});

export { BadgeWrapperInput, BadgeWrapperSlots };
