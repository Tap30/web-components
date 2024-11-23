import { customElement } from "lit/decorators.js";
import { baseStyles, BaseSlots as Slots } from "../base";
import ChatBubbleOut from "./out";
import styles from "./out.style";

export { Slots };

/**
 * @summary Display chat-bubble-out element
 *
 * @tag tap-chat-bubble-out
 *
 * @slot - The default slot for the content.
 *
 * @prop {string} [timestamp=""] - The timestamp of chat element.
 * @prop {string} [avatar-src=""] - The source of the avatar image.
 * @prop {boolean} [fully-rounded=false] - Whether or not the bubble should be fully rounded.
 */
@customElement("tap-chat-bubble-out")
export class TapChatBubbleOut extends ChatBubbleOut {
  public static override readonly styles = [baseStyles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-chat-bubble-out": TapChatBubbleOut;
  }
}
