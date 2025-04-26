import { isSsr } from "../../utils/index.ts";
import { ChatBubbleIn } from "./in.ts";

export { Slots } from "../base/constants.ts";
export { ChatBubbleIn };

export const register = () => {
  if (isSsr()) return;
  if (customElements.get("tapsi-chat-bubble-in")) return;

  customElements.define("tapsi-chat-bubble-in", ChatBubbleIn);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-chat-bubble-in": ChatBubbleIn;
  }
}
