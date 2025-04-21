import { isSsr } from "../../utils/index.ts";
import { ChatBubbleOut } from "./out.ts";

export { Slots } from "../base/constants.ts";
export { ChatBubbleOut };

export const register = () => {
  if (isSsr()) return;

  customElements.define("tapsi-chat-bubble-out", ChatBubbleOut);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-chat-bubble-out": ChatBubbleOut;
  }
}
