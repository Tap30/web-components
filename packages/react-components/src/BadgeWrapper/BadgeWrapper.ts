import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  BadgeWrapper as BadgeWrapperElement,
  BadgeWrapperSlots,
  registerBadgeWrapper,
} from "@tapsioss/web-components";

registerBadgeWrapper();

export const BadgeWrapper: ReactWebComponent<BadgeWrapperElement> =
  createComponent({
    tagName: "tapsi-badge-wrapper",
    elementClass: BadgeWrapperElement,
    react: React,
    events: {},
  });

export { BadgeWrapperElement, BadgeWrapperSlots };
