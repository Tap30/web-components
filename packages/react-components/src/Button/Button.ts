import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  Button as ButtonElement,
  ButtonSlots,
  registerButton,
} from "@tapsioss/web-components";

registerButton();

export const Button: ReactWebComponent<ButtonElement> = createComponent({
  tagName: "tapsi-button",
  elementClass: ButtonElement,
  react: React,
  events: {},
});

export { ButtonElement, ButtonSlots };
