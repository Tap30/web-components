import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  ProgressIndicator as ProgressIndicatorElement,
  registerProgressIndicator,
} from "@tapsioss/web-components";

registerProgressIndicator();

export const ProgressIndicator: ReactWebComponent<ProgressIndicatorElement> =
  createComponent({
    tagName: "tapsi-progress-indicator",
    elementClass: ProgressIndicatorElement,
    react: React,
    events: {},
  });
