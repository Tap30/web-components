import type { RegisteredCustomElement } from "../../internals";
import { Slots } from "../base/constants.ts";
import ChatBubbleIn from "./in.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-chat-bubble-in": ChatBubbleIn;
  }
}

export const registerChatBubbleInElement = () => {
  customElements.define("tapsi-chat-bubble-in", ChatBubbleIn);

  return {
    Slots,
    tagName: "tapsi-chat-bubble-in",
    elementClass: ChatBubbleIn,
  } as const satisfies RegisteredCustomElement;
};
