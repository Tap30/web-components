import { html, LitElement, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { requestFormSubmit } from "../base-input/utils";
import { KeyboardKeys } from "../internals";
import {
  clamp,
  debounce,
  dispatchActivationClick,
  getBoundingClientRect,
  getFormValue,
  getRenderRootSlot,
  isActivationClick,
  isSSR,
  logger,
  runAfterRepaint,
  waitAMicrotask,
  withElementInternals,
  withFormAssociated,
} from "../utils";
import { Slots } from "./constants";
import { PinwheelItem } from "./item";

const BaseClass = withFormAssociated(withElementInternals(LitElement));

export class Pinwheel extends BaseClass {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * Defines the minimum allowed value for pinwheel.
   * Use it when your items' values are sequential numbers.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuemin
   */
  @property({ type: String })
  public valueMin = "";

  /**
   * Defines the maximum allowed value for pinwheel.
   * Use it when your items' values are sequential numbers.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuemax
   */
  @property({ type: String })
  public valueMax = "";

  /**
   * Defines a string value that can be used to name input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  @property({ type: String })
  public label = "";

  /**
   * Identifies the element (or elements) that labels the input.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   */
  @property({ type: String })
  public labelledBy = "";

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

  @query("#root")
  private _root!: HTMLElement | null;

  @query("#container")
  private _container!: HTMLElement | null;

  private _value = "";

  private _isProgrammaticallyScrolling = false;

  constructor() {
    super();

    this._handleKeyDown = this._handleKeyDown.bind(this);

    if (!isSSR()) {
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

  public override connectedCallback() {
    super.connectedCallback();

    /* eslint-disable @typescript-eslint/no-misused-promises */
    this.addEventListener("keydown", this._handleKeyDown);
    /* eslint-enable @typescript-eslint/no-misused-promises */
  }

  public override disconnectedCallback() {
    super.disconnectedCallback();

    /* eslint-disable @typescript-eslint/no-misused-promises */
    this.removeEventListener("keydown", this._handleKeyDown);
    /* eslint-enable @typescript-eslint/no-misused-promises */
  }

  protected override firstUpdated(changed: PropertyValues<this>) {
    super.firstUpdated(changed);

    if (!this.valueMax || !this.valueMin) {
      logger(
        "When your items have sequential numeric values, " +
          "include the `valuemax` and `valuemin` attributes to enhance accessibility.",
        "pinwheel",
        "warning",
      );
    }
  }

  protected override updated(changed: PropertyValues<this>) {
    super.updated(changed);

    if (changed.has("value")) {
      runAfterRepaint(() => {
        const selected = this._items.find(item => item.selected) ?? null;

        this._spinArias = {
          valueNow: selected?.value ?? "",
          valueText: selected?.textContent?.trim() ?? "",
        };
      });
    }
  }

  /**
   * Locks the frame on a specific item based on its value.
   *
   * @param {string} itemValue - The value of the item to lock onto.
   */
  public lockOnItem(itemValue: string): void {
    // Invalidate cache since this function will only be called programmatically
    // and we need to get the latest items every time.
    this._cachedItems = null;

    const itemIdx = this._items.findIndex(item => item.value === itemValue);

    if (itemIdx === -1) return;

    this._isProgrammaticallyScrolling = true;
    // Lock the frame on the found item.
    this._lockFrameOnItem(itemIdx);
  }

  public override focus(options?: FocusOptions) {
    this._root?.focus(options);
  }

  public override blur() {
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

  /**
   * The value of the currently selected item.
   */
  @property({ attribute: false })
  public get value() {
    return this._value;
  }

  public set value(newValue: string) {
    if (isSSR()) return;
    if (newValue === this._value) return;

    this._value = newValue;

    this._setSelectedItem(newValue);
  }

  private _setSelectedItem(itemValue: string) {
    // Invalidate cache since this function will only be called
    // programatically and we need to get the latest items every time.
    this._cachedItems = null;

    const items = this._items;

    const targetItem = items.find(item => {
      return item.value === itemValue;
    });

    if (!targetItem || targetItem.selected) return;

    items.forEach(item => {
      if (item !== targetItem) item.selected = false;
    });

    targetItem.selected = true;
  }

  private _emitValueChange(newValue: string) {
    if (this.disabled) return false;

    const prevValue = this.value;

    if (newValue === prevValue) return;

    this.value = newValue;

    const eventAllowed = this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        cancelable: true,
      }),
    );

    // Revert the change since the event is prevented.
    if (!eventAllowed) this.value = prevValue;

    return eventAllowed;
  }

  private _handleItemsSlotChange() {
    const items = this._items;

    const firstItem = items[0];
    const hasActiveItem = items.some(item => item.selected);

    if (hasActiveItem || !firstItem) return;

    firstItem.selected = true;
    this._value = firstItem.value;
  }

  private _handleScroll = debounce(() => {
    if (!this._root) return;

    if (this._isProgrammaticallyScrolling) {
      this._isProgrammaticallyScrolling = false;

      return;
    }

    const frameNumber = this._getClosestFrameNumber();
    const item = this._items[frameNumber];

    if (!item) return;

    this._emitValueChange(item.value);
    this._lockFrameOnItem(frameNumber);
  }, 120);

  private _lockFrameOnItem(itemIdx: number) {
    if (!this._container || !this._root) return;
    if (this._items.length <= 1) return;

    const containerRect = getBoundingClientRect(this._container);

    const itemHeight =
      containerRect.height / (this._items.length + /* Two placeholders */ 2);

    const dy = itemHeight * itemIdx;

    this._root.scrollTop = dy;
  }

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

  private _handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!(target instanceof PinwheelItem)) return;

    const itemIdx = this._items.findIndex(item => item.value === target.value);
    const emitted = this._emitValueChange(target.value);

    if (emitted && itemIdx >= 0) this._lockFrameOnItem(itemIdx);

    this._isProgrammaticallyScrolling = true;
  }

  private async _handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;

    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    const items = this._items;

    switch (event.key) {
      case KeyboardKeys.ENTER: {
        event.preventDefault();

        return requestFormSubmit(this);
      }

      case KeyboardKeys.UP: {
        event.preventDefault();

        if (items.length === 0) return;

        const idx = items.findIndex(item => item.selected);
        const nextIdx = idx === -1 ? 0 : clamp(idx - 1, 0, items.length - 1);
        const newValue = items[nextIdx]?.value;

        if (!newValue) return;

        const emitted = this._emitValueChange(newValue);

        if (emitted) this._lockFrameOnItem(nextIdx);

        this._isProgrammaticallyScrolling = true;

        return;
      }

      case KeyboardKeys.DOWN: {
        event.preventDefault();

        if (items.length === 0) return;

        const idx = items.findIndex(item => item.selected);
        const nextIdx = clamp(idx + 1, 0, items.length - 1);
        const newValue = items[nextIdx]?.value;

        if (!newValue) return;

        const emitted = this._emitValueChange(newValue);

        if (emitted) this._lockFrameOnItem(nextIdx);

        this._isProgrammaticallyScrolling = true;

        return;
      }

      case KeyboardKeys.HOME: {
        event.preventDefault();

        const nextIdx = 0;
        const newValue = items[nextIdx]?.value;

        if (!newValue) return;

        const emitted = this._emitValueChange(newValue);

        if (emitted) this._lockFrameOnItem(nextIdx);

        this._isProgrammaticallyScrolling = true;

        return;
      }

      case KeyboardKeys.END: {
        event.preventDefault();

        const nextIdx = items.length - 1;
        const newValue = items[nextIdx]?.value;

        if (!newValue) return;

        const emitted = this._emitValueChange(newValue);

        if (emitted) this._lockFrameOnItem(nextIdx);

        this._isProgrammaticallyScrolling = true;

        return;
      }

      default:
        return;
    }
  }

  public override formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  public override [getFormValue]() {
    return this.value;
  }

  public override formResetCallback() {
    this.value = this.getAttribute("value") ?? "";
  }

  public override formStateRestoreCallback(state: string) {
    this.value = state;
  }

  protected override render() {
    const hasValidLabel = Boolean(this.label || this.labelledBy);

    if (!hasValidLabel) {
      logger(
        "Expected a valid `label` or `labelledby` attribute, received none.",
        "pinwheel",
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
        @click=${this._handleClick}
        @scroll=${this._handleScroll}
      >
        <div
          id="container"
          class=${containerClasses}
        >
          <div
            aria-hidden="true"
            class="placeholder"
          ></div>
          <slot @slotchange=${this._handleItemsSlotChange}></slot>
          <div
            aria-hidden="true"
            class="placeholder"
          ></div>
        </div>
      </div>
    `;
  }
}
