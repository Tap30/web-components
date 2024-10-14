import { customElement } from 'lit/decorators.js';
import { PinInput } from './pin-input.js';
import styles from './pin-input.style.js';
export * from './constants.js';
export * from './events.js';

/**
 * @summary A flexible Pin Input component used for entering multi-digit codes.
 *
 * @prop {boolean} [disabled=false] - When true, disables the component, rendering all elements (title, description, and input cells) in light gray and preventing user interaction.
 * @prop {boolean} [has-error=false] - When true, adds a red border around the input cells and changes the description text to red, indicating an error.
 * @prop {boolean} [auto-focus=false] - Automatically focuses on the first input cell when the component is loaded.
 * @prop {string} [label=""] - A label that provides additional context, typically used for accessibility.
 * @prop {string} [title=""] - Optional text displayed above the input cells in solid black to describe the input.
 * @prop {string} [description=""] - Optional helper text displayed below the input cells in gray, turning red if `has-error` is true.
 * @prop {number} [count=5] - Specifies the number of input cells for the pin code.
 * @prop {'small' | 'medium' | 'large'} [size='medium'] - Defines the size of the input cells, adjusting the overall look and feel of the component.
 *
 * @csspart [pin-input] - The container element that wraps the entire pin input component.
 * @csspart [pin-input-cell] - Each individual input cell where users enter digits.
 * @csspart [title] - The element responsible for rendering the title above the input cells.
 * @csspart [description] - The element that renders the description below the input cells.
 * @csspart [input-cells] - The container that holds all the input cells together.
 */
@customElement('tap-pin-input')
export class TapPinInput extends PinInput {
  static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-pin-input': TapPinInput;
  }
}
