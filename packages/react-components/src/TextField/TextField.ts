import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  registerTextField,
  TextField as TextFieldElement,
  TextFieldSlots,
} from "@tapsioss/web-components";

registerTextField();

export const TextField: ReactWebComponent<
  TextFieldElement,
  { onChange: string; onInput: string }
> = createComponent({
  tagName: "tapsi-text-field",
  elementClass: TextFieldElement,
  react: React,
  events: { onChange: "input", onInput: "input" },
});

export { TextFieldElement, TextFieldSlots };
