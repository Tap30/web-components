import { ChatBubbleOut } from "./out.ts";

export { ChatBubbleOut };

export const register = () => {
  customElements.define("tapsi-chat-bubble-out", ChatBubbleOut);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-chat-bubble-out": ChatBubbleOut;
  }
}
