import * as LitReact from "@lit/react";
import * as React from "react";

import {
  registerTextArea,
  TextArea as TextAreaElementClass,
  TextAreaSlots,
} from "@tapsioss/web-components";

registerTextArea();

const __TextArea = LitReact.createComponent({
  tagName: "tapsi-text-area",
  elementClass: TextAreaElementClass,
  react: React,
  events: {},
});

export { TextAreaSlots };

const TextArea = __TextArea;

export { TextArea };
