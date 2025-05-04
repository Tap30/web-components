import {
  createComponent,
  type EventName,
  type ReactWebComponent,
} from "@lit/react";
import * as React from "react";

import {
  Modal as ModalElement,
  ModalHideEvent,
  ModalShowEvent,
  ModalSlots,
  registerModal,
} from "@tapsioss/web-components";

registerModal();

export const Modal: ReactWebComponent<
  ModalElement,
  { onShow: EventName<ModalShowEvent>; onHide: EventName<ModalHideEvent> }
> = createComponent({
  tagName: "tapsi-modal",
  elementClass: ModalElement,
  react: React,
  events: {
    onShow: "show" as EventName<ModalShowEvent>,
    onHide: "hide" as EventName<ModalHideEvent>,
  },
});

export { ModalElement, ModalHideEvent, ModalShowEvent, ModalSlots };
