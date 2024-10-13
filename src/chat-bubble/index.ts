import { customElement } from "lit/decorators.js";
import { ChatBubbleBase } from "./chat-bubble-base";
import baseStyles from "./chat-bubble-base.style";
import { ChatBubbleIn } from "./chat-bubble-in";
import inStyles from "./chat-bubble-in.style";
import { ChatBubbleOut } from "./chat-bubble-out";
import outStyles from "./chat-bubble-out.style";

export { Parts, Slots } from "./constants";

@customElement("tap-chat-bubble-base")
export class TapChatBubbleBase extends ChatBubbleBase {
  public static override readonly styles = [baseStyles];
}

@customElement("tap-chat-bubble-in")
export class TapChatBubbleIn extends ChatBubbleIn {
  public static override readonly styles = [inStyles];
}

@customElement("tap-chat-bubble-out")
export class TapChatBubbleOut extends ChatBubbleOut {
  public static override readonly styles = [outStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-chat-bubble-in": TapChatBubbleIn;
    "tap-chat-bubble-out": TapChatBubbleOut;
  }
}
