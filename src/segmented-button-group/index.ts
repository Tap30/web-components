import { customElement } from 'lit/decorators.js';
import { SegmentedButtonGroup } from './segmented-button-group';
import styles from './segmented-button-group.style';

/**
 * ### Example
 *
 *
 * ##### Simple
 *
 * ```html
 * <tap-segmented-button-group>
 *   <tap-segmented-button>Button 1</tap-segmented-button>
 *   <tap-segmented-button>Button 2</tap-segmented-button>
 *   <tap-segmented-button>Button 3</tap-segmented-button>
 * </tap-segmented-button-group>
 * ```
 *
 * ##### With Sizes
 *
 * ```html
 * <tap-segmented-button-group size="sm">
 *   <tap-segmented-button>Small Button 1</tap-segmented-button>
 *   <tap-segmented-button>Small Button 2</tap-segmented-button>
 * </tap-segmented-button-group>
 *
 * <tap-segmented-button-group size="md">
 *   <tap-segmented-button>Medium Button 1</tap-segmented-button>
 *   <tap-segmented-button>Medium Button 2</tap-segmented-button>
 * </tap-segmented-button-group>
 * ```
 *
 * @summary A group of segmented buttons.
 *
 * @prop {'sm' | 'md'} [size='md'] - The size of the segmented button group.
 *
 * @csspart [button-group] - The main container for the button group.
 *
 * @cssprop [--tap-segmented-button-group-color-surface=--tap-sys-color-surface-secondary] - The background color of the button group.
 * @cssprop [--tap-segmented-button-group-border-radius=--tap-sys-radius-full] - The border radius of the button group.
 * @cssprop [--tap-segmented-button-group-padding=--tap-sys-spacing-3] - The padding inside the button group.
 * @cssprop [--tap-segmented-button-group-sm-height=--tap-sys-spacing-10] - The height of the small size button group.
 * @cssprop [--tap-segmented-button-group-md-height=--tap-sys-spacing-11] - The height of the medium size button group.
 *
 * @fires segmented-button-group-change - Fires when the button group is changed
 */
@customElement('tap-segmented-button-group')
export class TapSegmentedButtonGroup extends SegmentedButtonGroup {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-segmented-button-group': TapSegmentedButtonGroup;
  }
}
