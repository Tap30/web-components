import * as LitReact from "@lit/react";
import * as React from "react";

import {
  registerSnackbar,
  Snackbar as SnackbarElementClass,
  SnackbarHideEvent,
  SnackbarShowEvent,
  SnackbarSlots,
} from "@tapsioss/web-components";

registerSnackbar();

export const Snackbar = LitReact.createComponent({
  tagName: "tapsi-snackbar",
  elementClass: SnackbarElementClass,
  react: React,
  events: {
    onShow: "show" as LitReact.EventName<SnackbarShowEvent>,
    onHide: "hide" as LitReact.EventName<SnackbarHideEvent>,
  },
});

export {
  SnackbarElementClass,
  SnackbarHideEvent,
  SnackbarShowEvent,
  SnackbarSlots,
};
