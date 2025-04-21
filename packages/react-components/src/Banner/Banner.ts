import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Banner as BannerElementClass,
  BannerSlots,
  registerBanner,
} from "@tapsioss/web-components";

registerBanner();

const __Banner = LitReact.createComponent({
  tagName: "tapsi-banner",
  elementClass: BannerElementClass,
  react: React,
  events: {},
});

export { BannerSlots };

const Banner = __Banner;

export { Banner };
