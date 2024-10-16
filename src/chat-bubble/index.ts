import { customElement } from "lit/decorators.js";
import { ChatBubbleIn } from "./chat-bubble-in";
import inStyles from "./chat-bubble-in.style";
import { ChatBubbleOut } from "./chat-bubble-out";
import outStyles from "./chat-bubble-out.style";

export { Slots } from "./constants";

/**
 * @summary Display chat-bubble-in element
 *
 * @prop {string} timestamp - The timestamp of chat element.
 * @prop {"sent" | "seen" | "pending" | "failed"} [status="sent"] - The status of the chat element.
 * @prop {boolean} [fullyRounded=false] - Whether or not the bubble should be fully rounded.
 *
 * @csspart [root] - The root of the element.
 * @csspart [base] - The base-bubble element.
 */
@customElement("tap-chat-bubble-in")
export class TapChatBubbleIn extends ChatBubbleIn {
  public static override readonly styles = [inStyles];
}

/**
 * @summary Display chat-bubble-out element
 *
 * @prop {string} timestamp - The timestamp of chat element.
 * @prop {string} [avatarSrc] - The source of the avatar image.
 * @prop {boolean} [fullyRounded=false] - Whether or not the bubble should be fully rounded.
 *
 * @csspart [root] - The root of the element.
 * @csspart [avatar] - The avatar element.
 * @csspart [base] - The base-bubble element.
 */
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
