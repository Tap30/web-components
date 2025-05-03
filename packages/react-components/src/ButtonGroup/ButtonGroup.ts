import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  ButtonGroup as ButtonGroupElement,
  ButtonGroupSlots,
  registerButtonGroup,
} from "@tapsioss/web-components";

registerButtonGroup();

export const ButtonGroup: ReactWebComponent<ButtonGroupElement> =
  createComponent({
    tagName: "tapsi-button-group",
    elementClass: ButtonGroupElement,
    react: React,
    events: {},
  });

export { ButtonGroupElement, ButtonGroupSlots };
