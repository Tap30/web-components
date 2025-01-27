import { customElement } from "lit/decorators.js";
import { baseStyles, BaseSlots as Slots } from "../base/index.ts";
import styles from "./in.style.ts";
import ChatBubbleIn from "./in.ts";

export { Slots };

/**
 * @summary Display chat-bubble-in element
 *
 * @tag tapsi-chat-bubble-in
 *
 * @slot - The default slot for the content.
 *
 * @prop {string} [timestamp=""] - The timestamp of chat element.
 * @prop {"sent" | "seen" | "pending" | "failed"} [status="sent"] - The status of the chat element.
 * @prop {boolean} [fully-rounded=false] - Whether or not the bubble should be fully rounded.
 */
@customElement("tapsi-chat-bubble-in")
export class TapsiChatBubbleIn extends ChatBubbleIn {
  public static override readonly styles = [baseStyles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-chat-bubble-in": TapsiChatBubbleIn;
  }
}
