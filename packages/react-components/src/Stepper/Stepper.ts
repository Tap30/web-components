import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  Stepper as StepperElement,
  registerStepper,
} from "@tapsioss/web-components";

registerStepper();

export const Stepper: ReactWebComponent<
  StepperElement,
  { onChange: string; onInput: string }
> = createComponent({
  tagName: "tapsi-stepper",
  elementClass: StepperElement,
  react: React,
  events: { onChange: "change", onInput: "change" },
});

export { StepperElement };
