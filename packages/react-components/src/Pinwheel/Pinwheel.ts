import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  Pinwheel as PinwheelElement,
  PinwheelItemSlots,
  PinwheelSlots,
  registerPinwheel,
} from "@tapsioss/web-components";

registerPinwheel();

export const Pinwheel: ReactWebComponent<
  PinwheelElement,
  { onChange: string; onInput: string }
> = createComponent({
  tagName: "tapsi-pinwheel",
  elementClass: PinwheelElement,
  react: React,
  events: { onChange: "change", onInput: "change" },
});

export { PinwheelElement, PinwheelItemSlots, PinwheelSlots };
