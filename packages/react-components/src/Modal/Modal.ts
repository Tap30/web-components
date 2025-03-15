import * as LitReact from "@lit/react";
import * as ComponentNamespace from "@tapsioss/web-components/modal";
import * as React from "react";

/* START: AUTO-GENERATED [DO_NOT_REMOVE] */
const __Modal = LitReact.createComponent({
  tagName: "tapsi-modal",
  elementClass: ComponentNamespace.TapsiModal,
  react: React,
  events: {
    onShow: "show" as LitReact.EventName<ComponentNamespace.ShowEvent>,
    onHide: "hide" as LitReact.EventName<ComponentNamespace.HideEvent>,
  },
});

export { HideEvent, ShowEvent, Slots } from "@tapsioss/web-components/modal";

/* END: AUTO-GENERATED [DO_NOT_REMOVE] */

const Modal = __Modal;

export { Modal };
