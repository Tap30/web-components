import { customElement } from "lit/decorators.js";
import { Badge } from "./badge";
import styles from "./badge.style";

export { Slots } from "./constants";

/**
 * @summary The badge component.
 *
 * @prop {string | number} [value=''] - The value of the badge.
 * @prop {'pill' | 'numeral' | 'dot'} [variant='pill'] - The variant of the badge.
 * @prop {'success' | 'error' | 'info' | 'warning' | 'neutral'} [color='neutral'] - The color of the badge.
 * @prop {'high' | 'low'} [priority='high'] - The priority level of the badge.
 * @prop {'md' | 'sm'} [size='md'] - The size of the badge.
 */
@customElement("tap-badge")
export class TapBadge extends Badge {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-badge": TapBadge;
  }
}
