import * as LitReact from "@lit/react";
import * as React from "react";

import {
  Notice as NoticeElementClass,
  NoticeHideEvent,
  NoticeShowEvent,
  NoticeSlots,
  registerNotice,
} from "@tapsioss/web-components";

registerNotice();

export const Notice = LitReact.createComponent({
  tagName: "tapsi-notice",
  elementClass: NoticeElementClass,
  react: React,
  events: {
    onShow: "show" as LitReact.EventName<NoticeShowEvent>,
    onHide: "hide" as LitReact.EventName<NoticeHideEvent>,
  },
});

export { NoticeElementClass, NoticeHideEvent, NoticeShowEvent, NoticeSlots };
