import { customElement } from "lit/decorators.js";
import { Skeleton } from "./skeleton";
import styles from "./skeleton.style";

export { Slots } from "./constants";

/**
 * @summary The skeleton component.
 *
 * @tag tap-skeleton
 *
 * @prop {"rectangular" | "circular" | "pill" | "text"} [variant="rectangular"] -
 * The type of content that will be rendered.
 * @prop {string} [width=""] - Width of the skeleton.
 * @prop {string} [height=""] - Height of the skeleton.
 * @prop {number} [ratio=NaN] -
 * The ratio of the width to the height.
 * If the value is invalid, it will default to 1.
 *
 * Only works when `variant="rectangular"`.
 */

@customElement("tap-skeleton")
export class TapSkeleton extends Skeleton {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-skeleton": TapSkeleton;
  }
}
