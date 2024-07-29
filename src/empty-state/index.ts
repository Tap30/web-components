import { customElement } from "lit/decorators.js";
import { EmptyState } from "./empty-state";
import styles from "./empty-state.style";

/**
 * @summary An empty state component with icon and actions slots.
 *
 * @cssprop [--tap-font-family=--tap-sys-font-family] - The font family used in the empty state.
 * @cssprop [--tap-empty-state-icon-horizontal-margin] - The horizontal margin for the icon slot.
 * @cssprop [--tap-empty-state-icon-vertical-margin=--tap-sys-spacing-6] - The vertical margin for the icon slot.
 * @cssprop [--tap-empty-state-actions-horizontal-margin] - The horizontal margin for the actions slot.
 * @cssprop [--tap-empty-state-actions-vertical-margin=--tap-sys-spacing-6] - The vertical margin for the actions slot.
 * @cssprop [--tap-empty-state-content-horizontal-padding=--tap-sys-spacing-6] - The horizontal padding for the content slot.
 * @cssprop [--tap-empty-state-content-vertical-padding=--tap-sys-spacing-4] - The vertical padding for the content slot.
 * @cssprop [--tap-empty-state-title-font-size=--tap-sys-typography-headline-sm-size] - The font size used for the title in the empty state.
 * @cssprop [--tap-empty-state-title-font-weight=--tap-sys-typography-headline-sm-weight] - The font weight used for the title in the empty state.
 * @cssprop [--tap-empty-state-title-line-height=--tap-sys-typography-headline-sm-height] - The line height used for the title in the empty state.
 * @cssprop [--tap-empty-state-description-font-size=--tap-sys-typography-headline-sm-size] - The font size used for the description in the empty state.
 * @cssprop [--tap-empty-state-description-font-weight=--tap-sys-typography-headline-sm-size] - The font weight used for the description in the empty state.
 * @cssprop [--tap-empty-state-description-line-height=--tap-sys-typography-headline-sm-size] - The line height used for the description in the empty state.
 * @cssprop [--tap-empty-state-description-color=--tap-sys-typography-headline-sm-size] - The color used for the description in the empty state.
 * @cssprop [--tap-empty-state-description-top-margin=--tap-sys-spacing-4] - The top margin used for the description in the empty state.
 *
 * @csspart [container] - The root container of the empty state component a `div`.
 * @csspart [icon] - The container of the icon slot, a `span`.
 * @csspart [content] - The wrapper around heading and description, a `div`.
 * @csspart [heading] - The heading element, a `span`.
 * @csspart [description] - The description element, a `p`.
 * @csspart [actions] - The container of the actions slot, a `div`.
 *
 * @slot [icon] - the icon slot of the empty state.
 * @slot [actions] - the actions slot of the empty state.
 *
 * @prop {string} [title=''] - The title of the empty state.
 * @prop {string} [description=''] - The description for the empty state.
 */

@customElement('tap-empty-state')
export class TapEmptyState extends EmptyState {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-empty-state': TapEmptyState;
  }
}
