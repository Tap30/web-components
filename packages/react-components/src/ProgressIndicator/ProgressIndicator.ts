import * as LitReact from "@lit/react";
import * as React from "react";

import {
  ProgressIndicator as ProgressIndicatorInput,
  registerProgressIndicator,
} from "@tapsioss/web-components";

registerProgressIndicator();

export const ProgressIndicator = LitReact.createComponent({
  tagName: "tapsi-progress-indicator",
  elementClass: ProgressIndicatorInput,
  react: React,
  events: {},
});
