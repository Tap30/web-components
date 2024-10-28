import { customElement } from "lit/decorators.js";
import { Route } from "./route";
import styles from "./route.style";

/**
 * @summary A route component.
 *
 * @prop {boolean} [editable=false] - The size of the row. Defaults to `standard`.
 * @prop {'circle'|'square'|'plus'} [leading-icon='circle'] - Indicates whether the row is navigable (clickable).
 * @prop {'first'|'middle'|'last'} [ordinal='first'] - Indicates whether the row is navigable (clickable).
 *
 * @slot [content] - the content slot of the row
 *
 *  @cssprop [--tap-font-family=--tap-sys-font-family] - The font family used in the row.
 * @cssprop [--tap-row-background-color=--tap-palette-white] - The background color of the row.
 * @cssprop [--tap-row-leading-vertical-padding] - The vertical padding for the leading slot.
 * @cssprop [--tap-row-leading-horizontal-padding=--tap-sys-spacing-4] - The horizontal padding for the leading slot.
 * @cssprop [--tap-row-content-padding=--tap-sys-spacing-4] - The padding for the content slot.
 * @cssprop [--tap-row-trailing-vertical-padding] - The vertical padding for the trailing slot.
 * @cssprop [--tap-row-trailing-horizontal-padding=--tap-sys-spacing-4] - The horizontal padding for the trailing slot.
 * @cssprop [--tap-row-standard-height=--tap-sys-spacing-13] - The height of the standard size row.
 * @cssprop [--tap-row-compact-height=--tap-sys-spacing-12] - The height of the compact size row.
 *
 * @event slotchange - Dispatched when the content of any slot changes.
 */
@customElement("tap-route")
export class TapRoute extends Route {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-route": TapRoute;
  }
}
