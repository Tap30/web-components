import * as LitReact from "@lit/react";
import * as React from "react";

import {
  RateSlider as RateSliderInput,
  registerRateSlider,
} from "@tapsioss/web-components";

registerRateSlider();

export const RateSlider = LitReact.createComponent({
  tagName: "tapsi-rate-slider",
  elementClass: RateSliderInput,
  react: React,
  events: { onChange: "change", onInput: "change" },
});

export { RateSliderInput };
