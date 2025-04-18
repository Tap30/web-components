import * as LitReact from "@lit/react";
import * as React from "react";

/* START: AUTO-GENERATED [DO_NOT_REMOVE] */
import {
  Modal as ModalElementClass,
  ModalHideEvent,
  ModalShowEvent,
  ModalSlots,
  registerModalElement,
} from "@tapsioss/web-components";

registerModalElement();

const __Modal = LitReact.createComponent({
  tagName: "tapsi-modal",
  elementClass: ModalElementClass,
  react: React,
  events: {
    onShow: "show" as LitReact.EventName<ModalShowEvent>,
    onHide: "hide" as LitReact.EventName<ModalHideEvent>,
  },
});

export { ModalHideEvent, ModalShowEvent, ModalSlots };

/* END: AUTO-GENERATED [DO_NOT_REMOVE] */

const Modal = __Modal;

export { Modal };
