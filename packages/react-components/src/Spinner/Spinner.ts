import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  Spinner as SpinnerElement,
  registerSpinner,
} from "@tapsioss/web-components";

registerSpinner();

export const Spinner: ReactWebComponent<SpinnerElement> = createComponent({
  tagName: "tapsi-spinner",
  elementClass: SpinnerElement,
  react: React,
  events: {},
});
