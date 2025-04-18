import * as LitReact from "@lit/react";
import * as React from "react";

/* START: AUTO-GENERATED [DO_NOT_REMOVE] */
import {
  Notice as NoticeElementClass,
  NoticeHideEvent,
  NoticeShowEvent,
  NoticeSlots,
  registerNoticeElement,
} from "@tapsioss/web-components";

registerNoticeElement();

const __Notice = LitReact.createComponent({
  tagName: "tapsi-notice",
  elementClass: NoticeElementClass,
  react: React,
  events: {
    onShow: "show" as LitReact.EventName<NoticeShowEvent>,
    onHide: "hide" as LitReact.EventName<NoticeHideEvent>,
  },
});

export { NoticeHideEvent, NoticeShowEvent, NoticeSlots };

/* END: AUTO-GENERATED [DO_NOT_REMOVE] */

const Notice = __Notice;

export { Notice };
