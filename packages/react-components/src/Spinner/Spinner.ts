import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Spinner as SpinnerElementClass,
  registerSpinner,
} from "@tapsioss/web-components";

registerSpinner();

const __Spinner = LitReact.createComponent({
  tagName: "tapsi-spinner",
  elementClass: SpinnerElementClass,
  react: React,
  events: {},
});

const Spinner = __Spinner;

export { Spinner };
