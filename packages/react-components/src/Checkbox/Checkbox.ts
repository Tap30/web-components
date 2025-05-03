import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  Checkbox as CheckboxElement,
  registerCheckbox,
} from "@tapsioss/web-components";

registerCheckbox();

export const Checkbox: ReactWebComponent<
  CheckboxElement,
  { onChange: string; onInput: string }
> = createComponent({
  tagName: "tapsi-checkbox",
  elementClass: CheckboxElement,
  react: React,
  events: { onChange: "input", onInput: "input" },
});

export { CheckboxElement };
