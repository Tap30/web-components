import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Checkbox as CheckboxElementClass,
  registerCheckboxElement,
} from "@tapsioss/web-components";

registerCheckboxElement();

const __Checkbox = LitReact.createComponent({
  tagName: "tapsi-checkbox",
  elementClass: CheckboxElementClass,
  react: React,
  events: {},
});

const Checkbox = __Checkbox;

export { Checkbox };
