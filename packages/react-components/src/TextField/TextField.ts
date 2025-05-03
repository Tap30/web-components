import * as LitReact from "@lit/react";
import * as React from "react";

import {
  registerTextField,
  TextField as TextFieldInput,
  TextFieldSlots,
} from "@tapsioss/web-components";

registerTextField();

export const TextField = LitReact.createComponent({
  tagName: "tapsi-text-field",
  elementClass: TextFieldInput,
  react: React,
  events: { onChange: "input", onInput: "input" },
});

export { TextFieldInput, TextFieldSlots };
