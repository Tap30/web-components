import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Banner as BannerInput,
  BannerSlots,
  registerBanner,
} from "@tapsioss/web-components";

registerBanner();

export const Banner = LitReact.createComponent({
  tagName: "tapsi-banner",
  elementClass: BannerInput,
  react: React,
  events: {},
});

export { BannerInput, BannerSlots };
