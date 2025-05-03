import * as LitReact from "@lit/react";
import * as React from "react";

import {
  ModalHideEvent,
  Modal as ModalInput,
  ModalShowEvent,
  ModalSlots,
  registerModal,
} from "@tapsioss/web-components";

registerModal();

export const Modal = LitReact.createComponent({
  tagName: "tapsi-modal",
  elementClass: ModalInput,
  react: React,
  events: {
    onShow: "show" as LitReact.EventName<ModalShowEvent>,
    onHide: "hide" as LitReact.EventName<ModalHideEvent>,
  },
});

export { ModalHideEvent, ModalInput, ModalShowEvent, ModalSlots };
