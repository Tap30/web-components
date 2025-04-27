import * as LitReact from "@lit/react";
import * as React from "react";

import {
  registerTextField,
  TextField as TextFieldElementClass,
  TextFieldSlots,
} from "@tapsioss/web-components";

registerTextField();

export const TextField = LitReact.createComponent({
  tagName: "tapsi-text-field",
  elementClass: TextFieldElementClass,
  react: React,
  events: { onChange: "input", onInput: "input" },
});

export { TextFieldSlots };
