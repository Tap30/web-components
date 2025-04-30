import * as LitReact from "@lit/react";
import * as React from "react";

import {
  DiscountCard as DiscountCardElementClass,
  DiscountCardSlots,
  registerDiscountCard,
} from "@tapsioss/web-components";

registerDiscountCard();

export const DiscountCard = LitReact.createComponent({
  tagName: "tapsi-discount-card",
  elementClass: DiscountCardElementClass,
  react: React,
  events: {},
});

export { DiscountCardSlots };
