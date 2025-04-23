import * as LitReact from "@lit/react";
import * as React from "react";

import {
  ProgressIndicator as ProgressIndicatorElementClass,
  registerProgressIndicator,
} from "@tapsioss/web-components";

registerProgressIndicator();

export const ProgressIndicator = LitReact.createComponent({
  tagName: "tapsi-progress-indicator",
  elementClass: ProgressIndicatorElementClass,
  react: React,
  events: {},
});
