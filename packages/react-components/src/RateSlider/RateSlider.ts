import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  RateSlider as RateSliderElement,
  registerRateSlider,
} from "@tapsioss/web-components";

registerRateSlider();

export const RateSlider: ReactWebComponent<
  RateSliderElement,
  { onChange: string; onInput: string }
> = createComponent({
  tagName: "tapsi-rate-slider",
  elementClass: RateSliderElement,
  react: React,
  events: { onChange: "change", onInput: "change" },
});

export { RateSliderElement };
