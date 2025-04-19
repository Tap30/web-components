import * as LitReact from "@lit/react";
import * as React from "react";

import {
  ProgressIndicator as ProgressIndicatorElementClass,
  registerProgressIndicatorElement,
} from "@tapsioss/web-components";

registerProgressIndicatorElement();

const __ProgressIndicator = LitReact.createComponent({
  tagName: "tapsi-progress-indicator",
  elementClass: ProgressIndicatorElementClass,
  react: React,
  events: {},
});

const ProgressIndicator = __ProgressIndicator;

export { ProgressIndicator };
