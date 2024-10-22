import { customElement } from "lit/decorators.js";
import { MediaUploader } from "./media-uploader";
import styles from "./media-uploader.style";

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
@customElement("tap-media-uploader")
export class TapMediaUploader extends MediaUploader {
  public static override readonly styles = [styles];
}
declare global {
  interface HTMLElementTagNameMap {
    "tap-media-uploader": TapMediaUploader;
  }
}
