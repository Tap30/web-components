import { customElement } from "lit/decorators.js";
import { ChatBubbleBase } from "./chat-bubble-base";
import baseStyles from "./chat-bubble-base.style";
import { ChatBubbleDriver } from "./chat-bubble-driver";
import driverStyles from "./chat-bubble-driver.style";
import { ChatBubblePassenger } from "./chat-bubble-passanger";
import passengerStyles from "./chat-bubble-passenger.style";

export { Parts, Slots } from "./constants";

@customElement("tap-chat-bubble-base")
export class TapChatBubbleBase extends ChatBubbleBase {
  public static override readonly styles = [baseStyles];
}

@customElement("tap-chat-bubble-passenger")
export class TapChatBubblePassenger extends ChatBubblePassenger {
  public static override readonly styles = [passengerStyles];
}

@customElement("tap-chat-bubble-driver")
export class TapChatBubbleDriver extends ChatBubbleDriver {
  public static override readonly styles = [driverStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-chat-bubble-passenger": TapChatBubblePassenger;
    "tap-chat-bubble-driver": TapChatBubbleDriver;
  }
}
