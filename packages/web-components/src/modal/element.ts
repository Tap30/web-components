import type { RegisteredCustomElement } from "../internals/types.ts";
import { Slots } from "./constants.ts";
import { HideEvent, ShowEvent } from "./events.ts";
import { Modal } from "./modal.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-modal": Modal;
  }
}

export const registerModalElement = () => {
  customElements.define("tapsi-modal", Modal);

  return {
    Slots,
    tagName: "tapsi-modal",
    elementClass: Modal,
    eventsMap: {
      [HideEvent.type]: HideEvent,
      [ShowEvent.type]: ShowEvent,
    },
  } as const satisfies RegisteredCustomElement;
};
