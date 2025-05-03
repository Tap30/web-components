import { createComponent, type ReactWebComponent } from "@lit/react";
import * as React from "react";

import {
  registerTextArea,
  TextArea as TextAreaElement,
  TextAreaSlots,
} from "@tapsioss/web-components";

registerTextArea();

export const TextArea: ReactWebComponent<
  TextAreaElement,
  { onChange: string; onInput: string }
> = createComponent({
  tagName: "tapsi-text-area",
  elementClass: TextAreaElement,
  react: React,
  events: { onChange: "input", onInput: "input" },
});

export { TextAreaElement, TextAreaSlots };
