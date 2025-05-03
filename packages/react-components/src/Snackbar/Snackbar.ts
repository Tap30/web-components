import {
  createComponent,
  type EventName,
  type ReactWebComponent,
} from "@lit/react";
import * as React from "react";

import {
  registerSnackbar,
  Snackbar as SnackbarElement,
  SnackbarHideEvent,
  SnackbarShowEvent,
  SnackbarSlots,
} from "@tapsioss/web-components";

registerSnackbar();

export const Snackbar: ReactWebComponent<
  SnackbarElement,
  { onShow: EventName<SnackbarShowEvent>; onHide: EventName<SnackbarHideEvent> }
> = createComponent({
  tagName: "tapsi-snackbar",
  elementClass: SnackbarElement,
  react: React,
  events: {
    onShow: "show" as EventName<SnackbarShowEvent>,
    onHide: "hide" as EventName<SnackbarHideEvent>,
  },
});

export { SnackbarElement, SnackbarHideEvent, SnackbarShowEvent, SnackbarSlots };
