import * as LitReact from "@lit/react";
import * as ComponentNamespace from "@tapsioss/web-components/notice";
import * as React from "react";

/* START: AUTO-GENERATED [DO_NOT_REMOVE] */
const __Notice = LitReact.createComponent({
  tagName: "tapsi-notice",
  elementClass: ComponentNamespace.TapsiNotice,
  react: React,
  events: {
    onShow: "show" as LitReact.EventName<ComponentNamespace.ShowEvent>,
    onHide: "hide" as LitReact.EventName<ComponentNamespace.HideEvent>,
  },
});

export { HideEvent, ShowEvent, Slots } from "@tapsioss/web-components/notice";

/* END: AUTO-GENERATED [DO_NOT_REMOVE] */

const Notice = __Notice;

export { Notice };
