import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Button as ButtonElementClass,
  ButtonSlots,
  registerButton,
} from "@tapsioss/web-components";

registerButton();

const __Button = LitReact.createComponent({
  tagName: "tapsi-button",
  elementClass: ButtonElementClass,
  react: React,
  events: {},
});

export { ButtonSlots };

const Button = __Button;

export { Button };
