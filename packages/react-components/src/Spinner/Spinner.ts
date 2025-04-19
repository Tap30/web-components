import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Spinner as SpinnerElementClass,
  registerSpinnerElement,
} from "@tapsioss/web-components";

registerSpinnerElement();

const __Spinner = LitReact.createComponent({
  tagName: "tapsi-spinner",
  elementClass: SpinnerElementClass,
  react: React,
  events: {},
});

const Spinner = __Spinner;

export { Spinner };
