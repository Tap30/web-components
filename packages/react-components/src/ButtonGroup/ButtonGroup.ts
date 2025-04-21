import * as LitReact from "@lit/react";
import * as React from "react";

import {
  ButtonGroup as ButtonGroupElementClass,
  ButtonGroupSlots,
  registerButtonGroup,
} from "@tapsioss/web-components";

registerButtonGroup();

const __ButtonGroup = LitReact.createComponent({
  tagName: "tapsi-button-group",
  elementClass: ButtonGroupElementClass,
  react: React,
  events: {},
});

export { ButtonGroupSlots };

const ButtonGroup = __ButtonGroup;

export { ButtonGroup };
