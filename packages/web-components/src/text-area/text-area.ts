import {
  html,
  nothing,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, state } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import { createRef, ref } from "lit/directives/ref.js";
import { styleMap } from "lit/directives/style-map.js";
import BaseTextInput, {
  baseTextInputStyles,
} from "../base-text-input/index.ts";
import {
  createValidator,
  getWindow,
  isResizeSensorSupported,
  logger,
  ResizeSensor,
  type Validator,
} from "../utils/index.ts";
import TextAreaValidator from "./Validator.ts";
import { ErrorMessages } from "./constants.ts";
import styles from "./text-area.style.ts";
import { getStyleValue } from "./utils.ts";

/**
 * @summary A multi-line input that enables user to type in text information.
 *
 * @tag tapsi-text-area
 */
export class TextArea extends BaseTextInput {
  /** @internal */
  public static override readonly styles: CSSResultGroup = [
    ...baseTextInputStyles,
    styles,
  ];

  /**
   * The number of rows to display for the text input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#rows
   *
   * @prop {number} rows
   * @attr {string} rows
   * @default 2
   */
  @property({ type: Number })
  public rows = 2;

  /**
   * Minimum number of rows to display.
   * If specified will automatically adjust the height.
   *
   * @prop {number} minRows
   * @attr {string} min-rows
   * @default NaN
   */
  @property({ type: Number, attribute: "min-rows" })
  public minRows: number = NaN;

  /**
   * The number of cols to display for the text input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#cols
   *
   * @prop {number} cols
   * @attr {string} cols
   * @default 20
   */
  @property({ type: Number })
  public cols = 20;

  /**
   * Hints at the type of data that might be entered by the user while editing
   * the element or its contents. This allows a browser to display an
   * appropriate virtual keyboard.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode
   *
   * @prop {string} inputMode
   * @attr {string} inputMode
   * @default ""
   */
  @property()
  public override inputMode = "";

  @state()
  private _inputStyleState: {
    overflow?: boolean;
    outerHeightStyle?: number;
  } = {};

  private _shadowRef = createRef<HTMLTextAreaElement>();
  private _inputRef = createRef<HTMLTextAreaElement>();

  private readonly _resizeSensor: ResizeSensor | null = null;

  constructor() {
    super();

    this._handleChange = this._handleChange.bind(this);
    this._handleInput = this._handleInput.bind(this);

    const shouldSpinupSensor =
      isResizeSensorSupported() && this._isAutoResizable();

    this._resizeSensor = shouldSpinupSensor
      ? new ResizeSensor(() => {
          this._syncHeights();
        }, 120)
      : null;
  }

  private _isAutoResizable() {
    if (Number.isNaN(this.minRows)) return false;

    return this.minRows >= 1 && this.minRows < this.rows;
  }

  /** @internal */
  public override connectedCallback(): void {
    super.connectedCallback();

    this._resizeSensor?.observe(this);
  }

  /** @internal */
  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    this._resizeSensor?.disconnect();
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    if (changed.has("value")) this._syncHeights();
  }

  /** @internal */
  public override [createValidator](): Validator<unknown> {
    return new TextAreaValidator(() => ({
      state: this,
      control: this.getInputElement() as HTMLTextAreaElement | null,
    }));
  }

  private _syncHeights() {
    if (!this._isAutoResizable()) return;

    const input = this._inputRef.value;
    const shadow = this._shadowRef.value;

    if (!input || !shadow) return;

    const ownerWindow = getWindow(input);
    const inputComputedStyle = ownerWindow.getComputedStyle(input);

    // If input's width is shrunk and it's not visible, don't sync height.
    if (inputComputedStyle.width === "0px") return;

    shadow.style.width = inputComputedStyle.width;
    shadow.value = input.value || this.placeholder || " ";

    if (shadow.value.slice(-1) === "\n") {
      // Certain fonts which overflow the line height will cause the textarea
      // to report a different scrollHeight depending on whether the last line
      // is empty. Make it non-empty to avoid this issue.
      shadow.value += " ";
    }

    const boxSizing = inputComputedStyle.boxSizing;

    const padding =
      getStyleValue(inputComputedStyle, "paddingBottom") +
      getStyleValue(inputComputedStyle, "paddingTop");

    const border =
      getStyleValue(inputComputedStyle, "borderBottomWidth") +
      getStyleValue(inputComputedStyle, "borderTopWidth");

    // The height of the inner content
    const innerHeight = shadow.scrollHeight;

    // Measure height of a textarea with a single row
    shadow.value = " ";
    const singleRowHeight = shadow.scrollHeight;

    // The height of the outer content
    let outerHeight = innerHeight;

    if (this.minRows) {
      outerHeight = Math.max(
        Number(this.minRows) * singleRowHeight,
        outerHeight,
      );
    }

    if (this.rows) {
      outerHeight = Math.min(Number(this.rows) * singleRowHeight, outerHeight);
    }

    outerHeight = Math.max(outerHeight, singleRowHeight);

    // Take the box sizing into account for applying this value as a style.
    const outerHeightStyle =
      outerHeight + (boxSizing === "border-box" ? padding + border : 0);

    const overflow = Math.abs(outerHeight - innerHeight) <= 1;

    if (
      (outerHeightStyle > 0 &&
        Math.abs(
          (this._inputStyleState.outerHeightStyle || 0) - outerHeightStyle,
        ) > 1) ||
      this._inputStyleState.overflow !== overflow
    ) {
      this._inputStyleState = {
        overflow,
        outerHeightStyle,
      };
    }
  }

  private _handleInput(event: Event) {
    this.handleInput(event);
  }

  private _handleChange(event: Event) {
    this.handleChange(event);
  }

  private _renderShadowTextArea() {
    if (!Number.isNaN(this.minRows) && !this._isAutoResizable()) {
      logger(ErrorMessages.SET_VALID_MIN_ROWS, "text-area", "warning");
    }

    if (!this._isAutoResizable()) return null;

    return html`
      <textarea
        ${ref(this._shadowRef)}
        aria-hidden
        readonly
        class="input shadow"
        tabindex="-1"
      ></textarea>
    `;
  }

  protected override renderInput(): TemplateResult {
    if (!this.hasValidLabel()) {
      logger(
        [
          "Expected a valid `label` or `labelledby` attribute, received none.",
          "If you want to hide the label, provide both `label` and `hide-label` attributes.",
        ].join(" "),
        "text-area",
        "error",
      );
    }

    const ariaLabel = this.hideLabel ? this.label || nothing : nothing;
    const ariaLabelledBy = this.label ? nothing : this.labelledBy || nothing;
    const ariaDescribedBy = this.supportingText ? "supporting-text" : nothing;

    const maxLength = this.maxLength === -1 ? nothing : this.maxLength;
    const minLength = this.minLength === -1 ? nothing : this.minLength;

    const inputStyles = styleMap({
      height:
        typeof this._inputStyleState.outerHeightStyle !== "undefined"
          ? `${this._inputStyleState.outerHeightStyle}px`
          : undefined,
      overflow: this._inputStyleState.overflow ? "hidden" : undefined,
    });

    return html`
      <textarea
        ${ref(this._inputRef)}
        style=${inputStyles}
        id="input"
        class="input"
        part="input"
        dir=${this.dir || nothing}
        aria-invalid=${this.hasError()}
        aria-label=${ariaLabel}
        aria-labelledby=${ariaLabelledBy}
        aria-describedby=${ariaDescribedBy}
        ?required=${!!this.required}
        ?disabled=${this.disabled}
        ?readonly=${this.readOnly}
        cols=${this.cols || nothing}
        rows=${this.minRows || this.rows || nothing}
        inputmode=${this.inputMode || nothing}
        placeholder=${this.placeholder || nothing}
        autocomplete=${this.autocomplete || nothing}
        name=${this.name || nothing}
        maxlength=${maxLength}
        minlength=${minLength}
        .value=${live(this.value)}
        @input=${this._handleInput}
        @change=${this._handleChange}
        @select=${this.handleSelect}
      ></textarea>
      ${this._renderShadowTextArea()}
    `;
  }
}
