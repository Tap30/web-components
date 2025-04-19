import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Banner as BannerElementClass,
  BannerSlots,
  registerBannerElement,
} from "@tapsioss/web-components";

registerBannerElement();

const __Banner = LitReact.createComponent({
  tagName: "tapsi-banner",
  elementClass: BannerElementClass,
  react: React,
  events: {},
});

export { BannerSlots };

const Banner = __Banner;

export { Banner };
