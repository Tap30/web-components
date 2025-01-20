import { html, LitElement, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import {
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

  /**
   * The value of the currently selected item.
   */
  @property({ attribute: false })
  public get value() {
    return this._value;
  }

  public set value(newValue: string) {
    if (newValue === this._value) return;

    this._value = newValue;

    if (isSSR() || !this.isConnected) return;

    if (!this.hasUpdated && newValue !== "") {
      void this.updateComplete.then(() => this._setSelectedItem(newValue));
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

  @query("#root")
  private _root!: HTMLElement | null;

  @query("#container")
  private _container!: HTMLElement | null;

  private _value: string = "";

  private _isProgrammaticallyScrolling = false;

  constructor() {
    super();

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
      if (!this.value) this._selectFirstItem();

      runAfterRepaint(() => {
        this.setViewOnItem(this.value);
      });
    }
  }

  public setViewOnItem(itemValue: string): void {
    // Invalidate cache since this function will only be called programmatically
    // and we need to get the latest items every time.
    this._cachedItems = null;

    if (!this._container || !this._root) return;

    const items = this._items;

    if (items.length <= 1) return;

    const itemIdx = items.findIndex(item => item.value === itemValue);

    if (itemIdx === -1) return;

    const containerRect = getBoundingClientRect(this._container);

    const itemHeight =
      containerRect.height / (items.length + /* Two placeholders */ 2);

    const dy = itemHeight * itemIdx;

    if (this._root.scrollTop !== dy) {
      this._isProgrammaticallyScrolling = true;
      this._root.scrollTop = dy;
    }
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

    if (newValue === this.value) {
      this.setViewOnItem(newValue);

      return;
    }

    this.value = newValue;

    this.dispatchEvent(new Event("change", { bubbles: true }));
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
