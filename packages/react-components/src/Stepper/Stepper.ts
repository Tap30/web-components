import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Stepper as StepperElementClass,
  registerStepper,
} from "@tapsioss/web-components";

registerStepper();

const __Stepper = LitReact.createComponent({
  tagName: "tapsi-stepper",
  elementClass: StepperElementClass,
  react: React,
  events: {},
});

const Stepper = __Stepper;

export { Stepper };
