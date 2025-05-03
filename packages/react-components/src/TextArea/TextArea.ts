import * as LitReact from "@lit/react";
import * as React from "react";

import {
  registerTextArea,
  TextArea as TextAreaInput,
  TextAreaSlots,
} from "@tapsioss/web-components";

registerTextArea();

export const TextArea = LitReact.createComponent({
  tagName: "tapsi-text-area",
  elementClass: TextAreaInput,
  react: React,
  events: { onChange: "input", onInput: "input" },
});

export { TextAreaInput, TextAreaSlots };
