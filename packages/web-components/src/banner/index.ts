import { customElement } from "lit/decorators.js";
import { Banner } from "./banner";
import styles from "./banner.style";

export { Slots } from "./constants";

/**
 * @summary The banner component
 *
 * @tag tapsi-banner
 *
 * @slot - The default slot to render extra elements when variant is `hero`.
 * @slot action - The slot for action element.
 *
 * @prop {string} [heading] - The heading text to display in the banner.
 * @prop {string} [description] - The description text to display in the banner.
 * @prop {string} [image] - The URL of the background image to display in the banner.
 * @prop {'default' | 'hero'} variant - The variant style of the banner.
 * @prop {string} [background-color] - The background color of the banner.
 * @prop {string} [text-color] - The text color of the banner.
 */
@customElement("tapsi-banner")
export class TapsiBanner extends Banner {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-banner": TapsiBanner;
  }
}
