import * as LitReact from "@lit/react";
import * as React from "react";

import {
  registerTextFieldElement,
  TextField as TextFieldElementClass,
  TextFieldSlots,
} from "@tapsioss/web-components";

registerTextFieldElement();

const __TextField = LitReact.createComponent({
  tagName: "tapsi-text-field",
  elementClass: TextFieldElementClass,
  react: React,
  events: {},
});

export { TextFieldSlots };

const TextField = __TextField;

export { TextField };
