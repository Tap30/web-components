import type { RegisteredCustomElement } from "../internals/types.ts";
import { Slots } from "./constants.ts";
import { HideEvent, ShowEvent } from "./events.ts";
import { Notice } from "./notice.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-notice": Notice;
  }
}

export const registerNoticeElement = () => {
  customElements.define("tapsi-notice", Notice);

  return {
    Slots,
    tagName: "tapsi-notice",
    elementClass: Notice,
    eventsMap: {
      [HideEvent.type]: HideEvent,
      [ShowEvent.type]: ShowEvent,
    },
  } as const satisfies RegisteredCustomElement;
};
