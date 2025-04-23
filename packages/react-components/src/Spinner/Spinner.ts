import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Spinner as SpinnerElementClass,
  registerSpinner,
} from "@tapsioss/web-components";

registerSpinner();

export const Spinner = LitReact.createComponent({
  tagName: "tapsi-spinner",
  elementClass: SpinnerElementClass,
  react: React,
  events: {},
});
