import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Checkbox as CheckboxInput,
  registerCheckbox,
} from "@tapsioss/web-components";

registerCheckbox();

export const Checkbox = LitReact.createComponent({
  tagName: "tapsi-checkbox",
  elementClass: CheckboxInput,
  react: React,
  events: { onChange: "input", onInput: "input" },
});

export { CheckboxInput };
