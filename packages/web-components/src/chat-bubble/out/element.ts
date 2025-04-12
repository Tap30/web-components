import type { RegisteredCustomElement } from "../../internals";
import { Slots } from "../base/constants.ts";
import ChatBubbleOut from "./out.ts";

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-chat-bubble-out": ChatBubbleOut;
  }
}

export const registerChatBubbleOutElement = () => {
  customElements.define("tapsi-chat-bubble-out", ChatBubbleOut);

  return {
    Slots,
    tagName: "tapsi-chat-bubble-out",
    elementClass: ChatBubbleOut,
  } as const satisfies RegisteredCustomElement;
};
