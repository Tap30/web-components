import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Modal as ModalElementClass,
  ModalHideEvent,
  ModalShowEvent,
  ModalSlots,
  registerModal,
} from "@tapsioss/web-components";

registerModal();

export const Modal = LitReact.createComponent({
  tagName: "tapsi-modal",
  elementClass: ModalElementClass,
  react: React,
  events: {
    onShow: "show" as LitReact.EventName<ModalShowEvent>,
    onHide: "hide" as LitReact.EventName<ModalHideEvent>,
  },
});

export { ModalHideEvent, ModalShowEvent, ModalSlots };
