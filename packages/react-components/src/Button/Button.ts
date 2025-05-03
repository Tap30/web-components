import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Button as ButtonInput,
  ButtonSlots,
  registerButton,
} from "@tapsioss/web-components";

registerButton();

export const Button = LitReact.createComponent({
  tagName: "tapsi-button",
  elementClass: ButtonInput,
  react: React,
  events: {},
});

export { ButtonInput, ButtonSlots };
