import * as LitReact from "@lit/react";
import * as React from "react";

import {
  RateSlider as RateSliderElementClass,
  registerRateSlider,
} from "@tapsioss/web-components";

registerRateSlider();

export const RateSlider = LitReact.createComponent({
  tagName: "tapsi-rate-slider",
  elementClass: RateSliderElementClass,
  react: React,
  events: {},
});
