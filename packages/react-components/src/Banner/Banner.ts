import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  Banner as BannerElement,
  BannerSlots,
  registerBanner,
} from "@tapsioss/web-components";

registerBanner();

export const Banner: ReactWebComponent<BannerElement> = createComponent({
  tagName: "tapsi-banner",
  elementClass: BannerElement,
  react: React,
  events: {},
});

export { BannerElement, BannerSlots };
