import { customElement } from "lit/decorators.js";
import { Badge } from "./badge";
import styles from "./badge.style";

export { Slots } from "./constants";

/**
 * @summary The badge component.
 *
 * @tag tapsi-badge
 *
 * @slot icon - The slot for icon element.
 *
 * @prop {string | number} [value=''] - The value of the badge.
 * @prop {'pill' | 'numeral' | 'dot'} [variant='pill'] - The variant of the badge.
 * @prop {'success' | 'error' | 'info' | 'warning' | 'neutral'} [color='neutral'] - The color of the badge.
 * @prop {'high' | 'low'} [priority='high'] - The priority level of the badge.
 * @prop {'md' | 'sm'} [size='md'] - The size of the badge.
 */
@customElement("tapsi-badge")
export class TapsiBadge extends Badge {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-badge": TapsiBadge;
  }
}
