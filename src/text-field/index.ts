import { customElement } from 'lit/decorators.js';
import { TextField } from './text-field';
import styles from './text-field.style';
import { inputStyles } from '../input';

/**
 * @summary A text field component.
 *
 * @prop {string} [value=''] - The value of the text field.
 * @prop {boolean} [disabled=false] - Indicates whether the text field is disabled.
 * @prop {boolean} [error=false] - Indicates whether the text field has an error.
 * @prop {string} [caption=''] - The caption text for the text field.
 * @prop {string} [label=''] - The label for the text field.
 * @prop {string} [name=''] - The name of the text field.
 * @prop {string} [placeholder=''] - The placeholder text for the text field.
 * @prop {string} [inputmode=''] - The input mode for the text field.
 * @prop {'text'|'date'|'month'|'time'|'week'|'datetime-local'|'number'|'password'|'search'|'tel'|'url'|'email'} [type='text'] - The type of the text field.
 * @prop {string} [autocomplete=''] - The autocomplete attribute for the text field.
 * @prop {number} [max] - The Maximum value of the text field; only applying to text fields with these types: `date`, `month`, `week`, `time`, `datetime-local`, `number`.
 * @prop {number} [min] - The Minimum value of the text field; only applying to text fields with these types: `date`, `month`, `week`, `time`, `datetime-local`, `number`.
 *
 * @csspart [field] - The main container for the text field.
 * @csspart [label] - The label for the text field.
 * @csspart [container] - The container for the input and any leading/trailing elements.
 * @csspart [input] - The input element.
 * @csspart [caption] - The caption for the text field.
 *
 * @cssprop [--tap-font-family=--tap-sys-font-family] - The font family used in the text field.
 * @cssprop [--tap-input-field-gap=--tap-sys-spacing-4] - The gap between the elements in the text field.
 * @cssprop [--tap-input-label-color=--tap-sys-color-content-primary] - The color of the label.
 * @cssprop [--tap-input-label-line-height=--tap-sys-typography-label-sm-height] - The line height of the label.
 * @cssprop [--tap-input-label-font-size=--tap-sys-typography-label-sm-size] - The font size of the label.
 * @cssprop [--tap-input-label-font-weight=--tap-sys-typography-label-sm-weight] - The font weight of the label.
 * @cssprop [--tap-input-caption-color=--tap-sys-color-content-tertiary] - The color of the caption.
 * @cssprop [--tap-input-caption-line-height=--tap-sys-typography-body-sm-height] - The line height of the caption.
 * @cssprop [--tap-input-caption-font-size=--tap-sys-typography-body-sm-size] - The font size of the caption.
 * @cssprop [--tap-input-caption-font-weight=--tap-sys-typography-body-sm-weight] - The font weight of the caption.
 * @cssprop [--tap-input-container-height=--tap-sys-spacing-11] - The height of the container.
 * @cssprop [--tap-input-container-padding=--tap-sys-spacing-6] - The padding inside the container.
 * @cssprop [--tap-input-container-gap=--tap-sys-spacing-4] - The gap between elements in the container.
 * @cssprop [--tap-input-container-background-color=--tap-sys-color-surface-tertiary] - The background color of the container.
 * @cssprop [--tap-input-container-border-radius=--tap-sys-radius-3] - The border radius of the container.
 * @cssprop [--tap-input-focus-background-color=--tap-sys-color-surface-secondary] - The background color of the container when focused.
 * @cssprop [--tap-input-focus-border-width=--tap-sys-color-border-inverse-primary] - The border width of the container when focused.
 * @cssprop [--tap-text-field-input-color=--tap-sys-color-content-primary] - The color of the input text.
 * @cssprop [--tap-text-field-input-line-height=--tap-sys-typography-body-md-height] - The line height of the input text.
 * @cssprop [--tap-text-field-input-font-size=--tap-sys-typography-body-md-size] - The font size of the input text.
 * @cssprop [--tap-text-field-input-font-weight=--tap-sys-typography-body-md-weight] - The font weight of the input text.
 * @cssprop [--tap-text-field-input-placeholder-color=--tap-sys-color-content-tertiary] - The color of the placeholder text.
 * @cssprop [--tap-text-field-input-placeholder-line-height=--tap-sys-typography-body-md-height] - The line height of the placeholder text.
 * @cssprop [--tap-text-field-input-placeholder-font-size=--tap-sys-typography-body-md-size] - The font size of the placeholder text.
 * @cssprop [--tap-text-field-input-placeholder-font-weight=--tap-sys-typography-body-md-weight] - The font weight of the placeholder text.
 * @cssprop [--tap-input-error-caption-color=--tap-sys-color-content-negative] - The color of the caption when there is an error.
 * @cssprop [--tap-input-error-container-background-color=--tap-sys-color-surface-negative-light] - The background color of the container when there is an error.
 * @cssprop [--tap-input-error-container-border-color=--tap-sys-color-border-negative] - The border color of the container when there is an error.
 * @cssprop [--tap-input-disabled-container-background-color=--tap-sys-color-surface-disabled] - The background color of the container when disabled.
 * @cssprop [--tap-input-disabled-container-color=--tap-sys-color-content-disabled] - The color of the text and elements when disabled.
 */
@customElement('tap-text-field')
export class TapTextField extends TextField {
  static readonly styles = [inputStyles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-text-field': TapTextField;
  }
}
