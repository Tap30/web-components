import { customElement } from "lit/decorators.js";
import styles from "./empty-state.style.ts";
import { EmptyState } from "./empty-state.ts";

export { Slots } from "./constants.ts";

/**
 * @summary An empty state component with icon and action slots.
 *
 * @tag tapsi-empty-state
 *
 * @slot icon - The slot for icon element.
 * @slot action - The slot for action element.
 *
 * @prop {string} [title=''] - The title of the empty state.
 * @prop {string} [description=''] - The description of the empty state.
 * @prop {'auto' | 'center'} [content-alignment='auto'] - The alignment of the content.
 */

@customElement("tapsi-empty-state")
export class TapsiEmptyState extends EmptyState {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-empty-state": TapsiEmptyState;
  }
}
