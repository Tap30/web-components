import {
  createComponent,
  type EventName,
  type ReactWebComponent,
} from "@lit/react";
import * as React from "react";

import {
  Notice as NoticeElement,
  NoticeHideEvent,
  NoticeShowEvent,
  NoticeSlots,
  registerNotice,
} from "@tapsioss/web-components";

registerNotice();

export const Notice: ReactWebComponent<
  NoticeElement,
  { onShow: EventName<NoticeShowEvent>; onHide: EventName<NoticeHideEvent> }
> = createComponent({
  tagName: "tapsi-notice",
  elementClass: NoticeElement,
  react: React,
  events: {
    onShow: "show" as EventName<NoticeShowEvent>,
    onHide: "hide" as EventName<NoticeHideEvent>,
  },
});

export { NoticeElement, NoticeHideEvent, NoticeShowEvent, NoticeSlots };
