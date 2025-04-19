import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Stepper as StepperElementClass,
  registerStepperElement,
} from "@tapsioss/web-components";

registerStepperElement();

const __Stepper = LitReact.createComponent({
  tagName: "tapsi-stepper",
  elementClass: StepperElementClass,
  react: React,
  events: {},
});

const Stepper = __Stepper;

export { Stepper };
