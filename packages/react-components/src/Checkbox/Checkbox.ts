import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Checkbox as CheckboxElementClass,
  registerCheckbox,
} from "@tapsioss/web-components";

registerCheckbox();

const __Checkbox = LitReact.createComponent({
  tagName: "tapsi-checkbox",
  elementClass: CheckboxElementClass,
  react: React,
  events: {},
});

const Checkbox = __Checkbox;

export { Checkbox };
