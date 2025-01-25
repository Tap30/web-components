import { customElement } from "lit/decorators.js";
import styles from "./skeleton.style.ts";
import { Skeleton } from "./skeleton.ts";

export { Slots } from "./constants.ts";

/**
 * @summary The skeleton component.
 *
 * @tag tapsi-skeleton
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

@customElement("tapsi-skeleton")
export class TapsiSkeleton extends Skeleton {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-skeleton": TapsiSkeleton;
  }
}
