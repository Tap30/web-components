import * as LitReact from "@lit/react";
import * as React from "react";

import {
  registerTextArea,
  TextArea as TextAreaElementClass,
  TextAreaSlots,
} from "@tapsioss/web-components";

registerTextArea();

export const TextArea = LitReact.createComponent({
  tagName: "tapsi-text-area",
  elementClass: TextAreaElementClass,
  react: React,
  events: { onChange: "input", onInput: "input" },
});

export { TextAreaSlots };
