import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  DiscountCard as DiscountCardElement,
  DiscountCardSlots,
  registerDiscountCard,
} from "@tapsioss/web-components";

registerDiscountCard();

export const DiscountCard: ReactWebComponent<DiscountCardElement> =
  createComponent({
    tagName: "tapsi-discount-card",
    elementClass: DiscountCardElement,
    react: React,
    events: {},
  });

export { DiscountCardElement, DiscountCardSlots };
