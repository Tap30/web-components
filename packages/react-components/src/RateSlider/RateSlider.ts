import * as LitReact from "@lit/react";
import * as React from "react";

import {
  RateSlider as RateSliderElementClass,
  registerRateSlider,
} from "@tapsioss/web-components";

registerRateSlider();

const __RateSlider = LitReact.createComponent({
  tagName: "tapsi-rate-slider",
  elementClass: RateSliderElementClass,
  react: React,
  events: {},
});

const RateSlider = __RateSlider;

export { RateSlider };
