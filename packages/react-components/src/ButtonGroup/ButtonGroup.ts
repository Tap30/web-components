import * as LitReact from "@lit/react";
import * as React from "react";

import {
  ButtonGroup as ButtonGroupInput,
  ButtonGroupSlots,
  registerButtonGroup,
} from "@tapsioss/web-components";

registerButtonGroup();

export const ButtonGroup = LitReact.createComponent({
  tagName: "tapsi-button-group",
  elementClass: ButtonGroupInput,
  react: React,
  events: {},
});

export { ButtonGroupInput, ButtonGroupSlots };
