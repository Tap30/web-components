import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Radio as RadioElementClass,
  registerRadio,
} from "@tapsioss/web-components";

registerRadio();

const __Radio = LitReact.createComponent({
  tagName: "tapsi-radio",
  elementClass: RadioElementClass,
  react: React,
  events: {},
});

const Radio = __Radio;

export { Radio };
