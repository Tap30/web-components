import * as LitReact from "@lit/react";
import * as React from "react";

import {
  NoticeHideEvent,
  Notice as NoticeInput,
  NoticeShowEvent,
  NoticeSlots,
  registerNotice,
} from "@tapsioss/web-components";

registerNotice();

export const Notice = LitReact.createComponent({
  tagName: "tapsi-notice",
  elementClass: NoticeInput,
  react: React,
  events: {
    onShow: "show" as LitReact.EventName<NoticeShowEvent>,
    onHide: "hide" as LitReact.EventName<NoticeHideEvent>,
  },
});

export { NoticeHideEvent, NoticeInput, NoticeShowEvent, NoticeSlots };
