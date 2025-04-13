import { ChatBubbleIn } from "./in.ts";

export { ChatBubbleIn };

export const register = () => {
  customElements.define("tapsi-chat-bubble-in", ChatBubbleIn);
};

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-chat-bubble-in": ChatBubbleIn;
  }
}
