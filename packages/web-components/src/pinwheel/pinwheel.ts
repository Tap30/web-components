import { html, LitElement, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { requestFormSubmit } from "../base-input/utils";
import { KeyboardKeys } from "../internals";
import {
  clamp,
  dispatchActivationClick,
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

  @query("#root")
  private _root!: HTMLElement | null;

  private _value = "";

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

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.addEventListener("keydown", this._handleKeyDown);
  }

  public override disconnectedCallback() {
    super.disconnectedCallback();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.removeEventListener("keydown", this._handleKeyDown);
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

    runAfterRepaint(() => {
      const selected = this._items.find(item => item.selected) ?? null;

      this._spinArias = {
        valueNow: selected?.value ?? "",
        valueText: selected?.textContent?.trim() ?? "",
      };
    });
  }

  public override focus(options?: FocusOptions) {
    this._root?.focus(options);
  }

  public override blur() {
    this._root?.blur();
  }

  /**
   * The value of the currently selected item.
   */
  @property({ type: String, attribute: false })
  public get value() {
    return this._value;
  }

  public set value(value: string) {
    if (isSSR()) return;

    this._select(value);
  }

  private get _items() {
    const itemsSlot = getRenderRootSlot(this.renderRoot, Slots.DEFAULT);

    if (!itemsSlot) return [];

    const items = itemsSlot
      .assignedNodes()
      .filter(node => node instanceof PinwheelItem);

    return items;
  }

  private _select(itemValue: string) {
    const items = this._items;

    const targetItem = items.find(item => {
      return item.value === itemValue;
    });

    if (!targetItem || targetItem.selected) return;

    items.forEach(item => {
      if (item !== targetItem) item.selected = false;
    });

    this.value = itemValue;
    targetItem.selected = true;
  }

  private _emitValueChange(newValue: string) {
    if (this.disabled) return;

    const prevValue = this.value;

    this.value = newValue;

    const eventAllowed = this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        cancelable: true,
      }),
    );

    // Revert the change since the event is prevented.
    if (!eventAllowed) this.value = prevValue;
  }

  private _handleItemsSlotChange() {
    const items = this._items;

    const firstItem = items[0];
    const hasActiveItem = items.some(item => item.selected);

    if (hasActiveItem || !firstItem) return;

    firstItem.selected = true;
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
        const nextIdx = clamp(idx + 1, 0, items.length);
        const newValue = items[nextIdx]?.value;

        if (!newValue) return;

        return this._emitValueChange(newValue);
      }

      case KeyboardKeys.DOWN: {
        event.preventDefault();

        if (items.length === 0) return;

        const idx = items.findIndex(item => item.selected);
        const nextIdx = idx === -1 ? 0 : clamp(idx - 1, 0, items.length);
        const newValue = items[nextIdx]?.value;

        if (!newValue) return;

        return this._emitValueChange(newValue);
      }

      case KeyboardKeys.HOME: {
        event.preventDefault();

        const newValue = items[0]?.value;

        if (!newValue) return;

        return this._emitValueChange(newValue);
      }

      case KeyboardKeys.END: {
        event.preventDefault();

        const newValue = items[items.length - 1]?.value;

        if (!newValue) return;

        return this._emitValueChange(newValue);
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
      >
        <slot @slotchange=${this._handleItemsSlotChange}></slot>
      </div>
    `;
  }
}

// export class Pinwheel extends LitElement {
//   @state()
//   private _selectedIndex = 0;

//   @property({ type: Array, attribute: false })
//   public items: Array<string> = [];

//   private _itemHeight = 48;

//   public override connectedCallback() {
//     super.connectedCallback();
//     this.addEventListener("scroll", event =>
//       this._handleScroll(event.target as HTMLElement),
//     );
//   }

//   public override disconnectedCallback() {
//     this.removeEventListener("scroll", event =>
//       this._handleScroll(event.target as HTMLElement),
//     );
//     super.disconnectedCallback();
//   }

//   private _dispatchChangeEvent = () => {
//     this.dispatchEvent(
//       new CustomEvent("pinwheel-change", {
//         detail: {
//           selectedIndex: this._selectedIndex,
//         },
//         bubbles: true,
//         composed: true,
//       }),
//     );
//   };

//   private _handleScroll = debounce((target: HTMLElement) => {
//     this._selectedIndex = Math.round(target?.scrollTop / this._itemHeight);
//     const isActiveElementInCenter = target?.scrollTop % this._itemHeight === 0;

//     if (!isActiveElementInCenter) {
//       this._scrollToActiveItem();
//     } else {
//       this._dispatchChangeEvent();
//     }
//   }, 100);

//   private _handleClickItem = (index: number) => {
//     this._selectedIndex = index;
//     this._scrollToActiveItem();
//   };

//   private _scrollToActiveItem = () => {
//     const scrollTopPosition = this._selectedIndex * this._itemHeight;

//     this.scrollTo({ top: scrollTopPosition, behavior: "smooth" });
//   };

//   private _renderItems() {
//     return this.items.map((item, idx) => {
//       return html`<div
//         part="pinwheel-item"
//         class=${classMap({
//           item: true,
//           active: this._selectedIndex === idx,
//         })}
//         @click="${() => this._handleClickItem(idx)}"
//         tabindex="0"
//       >
//         ${item}
//       </div>`;
//     });
//   }

//   protected override render() {
//     return html`
//       <div
//         class="pinwheel"
//         part="pinwheel"
//       >
//         ${this._renderItems()}
//       </div>
//     `;
//   }
// }
