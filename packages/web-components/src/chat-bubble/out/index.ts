import { customElement } from "lit/decorators.js";
import { baseStyles, BaseSlots as Slots } from "../base/index.ts";
import styles from "./out.style.ts";
import ChatBubbleOut from "./out.ts";

export { Slots };

/**
 * @summary Display chat-bubble-out element
 *
 * @tag tapsi-chat-bubble-out
 *
 * @slot - The default slot for the content.
 *
 * @prop {string} [timestamp=""] - The timestamp of chat element.
 * @prop {string} [avatar-src=""] - The source of the avatar image.
 * @prop {boolean} [fully-rounded=false] - Whether or not the bubble should be fully rounded.
 */
@customElement("tapsi-chat-bubble-out")
export class TapsiChatBubbleOut extends ChatBubbleOut {
  public static override readonly styles = [baseStyles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-chat-bubble-out": TapsiChatBubbleOut;
  }
}
