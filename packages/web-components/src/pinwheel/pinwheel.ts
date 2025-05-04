import {
  html,
  LitElement,
  nothing,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { requestFormSubmit } from "../base-input/utils.ts";
import { KeyboardKeys } from "../internals/keyboard.ts";
import {
  clamp,
  debounce,
  dispatchActivationClick,
  getBoundingClientRect,
  getFormValue,
  getRenderRootSlot,
  isActivationClick,
  isSsr,
  logger,
  runAfterRepaint,
  waitAMicrotask,
  withElementInternals,
  withFormAssociated,
} from "../utils/index.ts";
import { ErrorMessages, scope, Slots } from "./constants.ts";
import { PinwheelItem } from "./item/index.ts";
import styles from "./pinwheel.style.ts";

const BaseClass = withFormAssociated(withElementInternals(LitElement));

/**
 * @summary Used to select options.
 *
 * @tag tapsi-pinwheel
 *
 * @slot - The default slot for the content.
 *
 * @fires {Event} change - Fires when the pinwheel selected state changes. (bubbles)
 */
export class Pinwheel extends BaseClass {
  /** @internal */
  public static override readonly styles: CSSResultGroup = [styles];

  /** @internal */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * Defines the minimum allowed value for pinwheel.
   * Use it when your items' values are sequential numbers.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuemin
   *
   * @prop {string} valueMin
   * @attr {string} valuemin
   * @default ""
   */
  @property()
  public valueMin = "";

  /**
   * Defines the maximum allowed value for pinwheel.
   * Use it when your items' values are sequential numbers.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuemax
   *
   * @prop {string} valueMax
   * @attr {string} valuemax
   * @default ""
   */
  @property()
  public valueMax = "";

  /**
   * Defines a string value that can be used to name input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   *
   * @prop {string} label
   * @attr {string} label
   * @default ""
   */
  @property()
  public label = "";

  /**
   * Identifies the element (or elements) that labels the input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   *
   * @prop {string} labelledBy
   * @attr {string} labelledby
   * @default ""
   */
  @property()
  public labelledBy = "";

  /**
   * Indicates that the element should be focused on page load.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus
   *
   * @prop {boolean} autofocus
   * @attr {string} autofocus
   * @default false
   */
  @property({ type: Boolean })
  public override autofocus = false;

  /**
   * The value of the currently selected item.
   *
   * @prop {string} value
   * @attr {string} value
   * @default ""
   */
  @property({ attribute: false })
  public get value(): string {
    return this._value;
  }

  public set value(newValue: string) {
    if (newValue === this._value) return;

    this._value = newValue;

    if (isSsr() || !this.isConnected) return;

    if (!this.hasUpdated && newValue !== "") {
      void this.updateComplete.then(() => {
        this._setSelectedItem(newValue);
      });
    } else this._setSelectedItem(newValue);
  }

  @state()
  private _spinArias: {
    valueNow: string;
    valueText: string;
  } = {
    valueNow: "",
    valueText: "",
  };

  @state()
  private _cachedItems: PinwheelItem[] | null = null;

  @state()
  private _noTransition = true;

  @query("#root")
  private _root!: HTMLElement | null;

  @query("#container")
  private _container!: HTMLElement | null;

  private _value: string = "";

  private _isProgrammaticallyScrolling = false;

  constructor() {
    super();

    if (!isSsr()) {
      /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
      this.addEventListener("click", async event => {
        if (this.disabled) return;

        // allow event to propagate to user code after a microtask.
        await waitAMicrotask();

        if (event.defaultPrevented) return;
        if (!isActivationClick(event)) return;

        this.focus();

        dispatchActivationClick(this);
      });
    }
  }

  protected override firstUpdated(changed: PropertyValues<this>): void {
    super.firstUpdated(changed);

    if (!this.valueMax || !this.valueMin) {
      logger(ErrorMessages.USE_VALUE_MIN_AND_VALUE_MAX, scope, "warning");
    }

    runAfterRepaint(() => {
      if (!this.autofocus) return;

      this.focus();
    });
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    if (changed.has("value")) {
      if (!this.value) this._selectFirstItem();

      runAfterRepaint(() => {
        this.setViewOnItem(this.value);
      });
    }
  }

  private _getScrollDistance(value = this.value): number {
    // Invalidate cache since this function will only be called programmatically
    // and we need to get the latest items every time.
    this._cachedItems = null;

    const items = this._items;

    if (items.length <= 1) return 0;
    if (!this._container) return 0;

    const itemIdx = items.findIndex(item => item.value === value);

    if (itemIdx === -1) return 0;

    const containerRect = getBoundingClientRect(this._container);

    const itemHeight =
      containerRect.height / (items.length + /* Two placeholders */ 2);

    const dy = itemHeight * itemIdx;

    return dy;
  }

  public setViewOnItem(itemValue: string): void {
    if (!this._container || !this._root) return;

    const dy = this._getScrollDistance(itemValue);

    if (this._root.scrollTop !== dy) {
      this._isProgrammaticallyScrolling = true;
      this._root.scrollTop = dy;
    }
  }

  /** @internal */
  public override focus(options?: FocusOptions): void {
    this._root?.focus(options);
  }

  /** @internal */
  public override blur(): void {
    this._root?.blur();
  }

  private get _items() {
    if (this._cachedItems) return this._cachedItems;

    const itemsSlot = getRenderRootSlot(this.renderRoot, Slots.DEFAULT);

    if (!itemsSlot) return [];

    const items = itemsSlot
      .assignedNodes()
      .filter(node => node instanceof PinwheelItem);

    this._cachedItems = items;

    return items;
  }

  private _selectFirstItem() {
    // Invalidate cache since this function will only be called
    // programatically and we need to get the latest items every time.
    this._cachedItems = null;

    const firstItem = this._items[0];

    if (!firstItem) return;
    if (firstItem.selected) return;

    this._setSelectedItem(firstItem.value);
  }

  private _setSelectedItem(itemValue: string) {
    // Invalidate cache since this function will only be called
    // programatically and we need to get the latest items every time.
    this._cachedItems = null;

    const items = this._items;

    const targetItem = items.find(item => {
      return item.value === itemValue;
    });

    if (!targetItem) return;
    if (targetItem.selected) return;

    items.forEach(item => {
      if (item !== targetItem) item.selected = false;
    });

    targetItem.selected = true;

    this._spinArias = {
      valueNow: targetItem.value,
      valueText: targetItem.textContent?.trim() ?? "",
    };
  }

  private _emitValueChange(newValue: string) {
    if (this.disabled) return;

    this.setViewOnItem(newValue);

    this.value = newValue;

    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  private _handleKeyDown = async (event: KeyboardEvent) => {
    if (this.disabled) return;
    if (!this._root) return;

    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    const items = this._items;

    switch (event.key) {
      case KeyboardKeys.ENTER: {
        event.preventDefault();

        requestFormSubmit(this);

        return true;
      }

      case KeyboardKeys.UP: {
        event.preventDefault();

        if (items.length === 0) return false;

        const idx = items.findIndex(item => item.selected);
        const nextIdx = idx === -1 ? 0 : clamp(idx - 1, 0, items.length - 1);
        const nextItem = items[nextIdx];

        if (!nextItem) return false;

        nextItem.selected = true;

        this._emitValueChange(nextItem.value);

        return true;
      }

      case KeyboardKeys.DOWN: {
        event.preventDefault();

        if (items.length === 0) return false;

        const idx = items.findIndex(item => item.selected);
        const nextIdx = clamp(idx + 1, 0, items.length - 1);
        const nextItem = items[nextIdx];

        if (!nextItem) return false;

        nextItem.selected = true;

        this._emitValueChange(nextItem.value);

        return true;
      }

      case KeyboardKeys.HOME: {
        event.preventDefault();

        const nextIdx = 0;
        const nextItem = items[nextIdx];

        if (!nextItem) return false;

        nextItem.selected = true;

        this._emitValueChange(nextItem.value);

        return true;
      }

      case KeyboardKeys.END: {
        event.preventDefault();

        const nextIdx = items.length - 1;
        const nextItem = items[nextIdx];

        if (!nextItem) return false;

        nextItem.selected = true;

        this._emitValueChange(nextItem.value);

        return true;
      }

      default:
        return false;
    }
  };

  private _handleScroll = debounce(() => {
    if (!this._root) return;

    if (this._isProgrammaticallyScrolling) {
      this._isProgrammaticallyScrolling = false;

      const dy = this._getScrollDistance();

      if (dy === this._root.scrollTop) this._noTransition = false;

      return;
    }

    const frameNumber = this._getClosestFrameNumber();
    const item = this._items[frameNumber];

    if (!item) return;

    this._emitValueChange(item.value);
  }, 120);

  private _getClosestFrameNumber() {
    if (!this._container || !this._root) return 0;

    const containerRect = getBoundingClientRect(this._container);

    const blockCount = this._items.length + /* Two placeholders */ 2;
    const itemHeight = containerRect.height / blockCount;
    const dy = this._root.scrollTop;

    let reached = 0;

    for (let i = 0; i < blockCount; i++) {
      reached += itemHeight;

      if (reached >= dy + itemHeight / 2) return i;
    }

    return 0;
  }

  public override formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  /** @internal */
  public override [getFormValue](): string {
    return this.value;
  }

  /** @internal */
  public override formResetCallback(): void {
    this.value = this.getAttribute("value") ?? "";
  }

  /** @internal */
  public override formStateRestoreCallback(state: string): void {
    this.value = state;
  }

  protected override render(): TemplateResult {
    const hasValidLabel = Boolean(this.label || this.labelledBy);

    if (!hasValidLabel) {
      logger(
        ErrorMessages.SET_VALID_LABEL_OR_LABELLEDBY_ATTRIBUTE,
        scope,
        "error",
      );
    }

    const ariaLabelledBy = this.label ? nothing : this.labelledBy || nothing;

    const containerClasses = classMap({
      container: true,
    });

    const rootClasses = classMap({
      root: true,
      disabled: this.disabled,
      "no-transition": this._noTransition,
    });

    return html`
      <div
        id="root"
        class=${rootClasses}
        part="root"
        role="spinbutton"
        ?inert=${this.disabled}
        tabindex=${this.disabled ? "-1" : "0"}
        aria-disabled=${this.disabled}
        aria-label=${this.label || nothing}
        aria-labelledby=${ariaLabelledBy}
        aria-valuemax=${this.valueMax || nothing}
        aria-valuemin=${this.valueMin || nothing}
        aria-valuenow=${this._spinArias.valueNow || nothing}
        aria-valuetext=${this._spinArias.valueText || nothing}
        @scroll=${this._handleScroll}
        @keydown=${this._handleKeyDown}
      >
        <div
          id="container"
          class=${containerClasses}
        >
          <div
            aria-hidden="true"
            class="placeholder"
          ></div>
          <slot></slot>
          <div
            aria-hidden="true"
            class="placeholder"
          ></div>
        </div>
      </div>
    `;
  }
}
