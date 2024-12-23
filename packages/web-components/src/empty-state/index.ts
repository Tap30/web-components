import { customElement } from "lit/decorators.js";
import { EmptyState } from "./empty-state";
import styles from "./empty-state.style";

export { Slots } from "./constants";

/**
 * @summary An empty state component with icon and action slots.
 *
 * @tag tap-empty-state
 *
 * @slot icon - The slot for icon element.
 * @slot action - The slot for action element.
 *
 * @prop {string} [title=''] - The title of the empty state.
 * @prop {string} [description=''] - The description of the empty state.
 * @prop {'auto' | 'center'} [content-alignment='auto'] - The alignment of the content.
 */

@customElement("tap-empty-state")
export class TapEmptyState extends EmptyState {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-empty-state": TapEmptyState;
  }
}
