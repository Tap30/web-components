import * as LitReact from "@lit/react";
import * as React from "react";

import {
  registerSnackbarElement,
  Snackbar as SnackbarElementClass,
  SnackbarHideEvent,
  SnackbarShowEvent,
  SnackbarSlots,
} from "@tapsioss/web-components";

registerSnackbarElement();

const __Snackbar = LitReact.createComponent({
  tagName: "tapsi-snackbar",
  elementClass: SnackbarElementClass,
  react: React,
  events: {
    onShow: "show" as LitReact.EventName<SnackbarShowEvent>,
    onHide: "hide" as LitReact.EventName<SnackbarHideEvent>,
  },
});

export { SnackbarHideEvent, SnackbarShowEvent, SnackbarSlots };

const Snackbar = __Snackbar;

export { Snackbar };
