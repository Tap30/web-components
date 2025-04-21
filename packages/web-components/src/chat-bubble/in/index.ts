import { isSsr } from "../../utils/index.ts";
import { ChatBubbleIn } from "./in.ts";

export { Slots } from "../base/constants.ts";
export { ChatBubbleIn };

export const register = () => {
  if (isSsr()) return;

  customElements.define("tapsi-chat-bubble-in", ChatBubbleIn);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-chat-bubble-in": ChatBubbleIn;
  }
}
