import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Stepper as StepperInput,
  registerStepper,
} from "@tapsioss/web-components";

registerStepper();

export const Stepper = LitReact.createComponent({
  tagName: "tapsi-stepper",
  elementClass: StepperInput,
  react: React,
  events: { onChange: "change", onInput: "change" },
});

export { StepperInput };
