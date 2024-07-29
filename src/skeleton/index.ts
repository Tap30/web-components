import { customElement } from 'lit/decorators.js';
import { Skeleton } from './skeleton';
import styles from './skeleton.style';

/**
 * @summary Display Skeleton component with different styles and types.
 *
 * @prop {"line" | "rect" | "circle"} [variant="line"] - The variant of the skeleton.
 * @prop {"progress" | "pulse" | "none"} [animation-mode="progress"] - The animation mode of the skeleton.
 * @prop {string} [width="100%"] - The width value of the skeleton.
 * @prop {string} [height="20px"] - The height value of the skeleton.
 *
 * @csspart [skeleton] - The skeleton element
 *
 * @cssprop [--tap-skeleton-background=--tap-sys-color-surface-tertiary] - Background color of the skeleton
 * @cssprop [--tap-skeleton-radius=--tap-sys-radius-2] - Border radius of the skeleton
 * @cssprop [--tap-skeleton-width=100%] - Width of the skeleton
 * @cssprop [--tap-skeleton-height=--tap-sys-spacing-8] - Height of the skeleton
 * @cssprop [--tap-skeleton-rect-radius=--tap-sys-spacing-0] - Border radius of the skeleton variant rect
 * @cssprop [--tap-skeleton-circle-radius=--tap-sys-radius-full] - Border radius of the skeleton variant circle
 * @cssprop [--tap-skeleton-circle-width=--tap-sys-spacing-10] - Width of the skeleton variant circle
 * @cssprop [--tap-skeleton-circle-height=--tap-sys-spacing-10] - Height of the skeleton variant circle
 */

@customElement('tap-skeleton')
export class TapSkeleton extends Skeleton {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-skeleton': TapSkeleton;
  }
}
