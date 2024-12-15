import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { Pinwheel } from "../pinwheel/pinwheel";
import {
  areEqualArrays,
  getRenderRootSlot,
  isSSR,
  logger,
  runAfterRepaint,
  waitAMicrotask,
} from "../utils";
import { Slots } from "./constants";

export class PinwheelGroup extends LitElement {
  private _value: string[] = [];

  /**
   * Defines a string value that can be used to set a label
   * for assistive technologies.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  @property({ type: String })
  public label = "";

  constructor() {
    super();

    this._handlePinwheelChange = this._handlePinwheelChange.bind(this);
  }

  public override connectedCallback() {
    super.connectedCallback();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.addEventListener("change", this._handlePinwheelChange);
  }

  public override disconnectedCallback() {
    super.disconnectedCallback();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.removeEventListener("change", this._handlePinwheelChange);
  }

  /**
   * The value of the currently selected items.
   * It's not an attribute and will only work in CSR.
   */
  @property({ attribute: false })
  public get value() {
    return this._value;
  }

  public set value(newValue: string[]) {
    if (isSSR()) return;
    if (areEqualArrays(newValue, this._value)) return;

    this._value = newValue;

    this._setPinwheelValues(newValue);
  }

  private get _items() {
    const wheelsSlot = getRenderRootSlot(this.renderRoot, Slots.DEFAULT);

    if (!wheelsSlot) return [];

    const items = wheelsSlot
      .assignedNodes()
      .filter(node => node instanceof Pinwheel);

    return items;
  }

  private _setPinwheelValues(newValue: string[]) {
    const items = this._items;

    newValue.forEach((v, idx) => {
      const pinwheel = items[idx];

      if (!pinwheel) return;

      runAfterRepaint(() => {
        pinwheel.value = v;
        pinwheel.lockOnItem(v);
      });
    });
  }

  private async _handlePinwheelChange(event: Event) {
    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    const pinwheelValues = this._items.map(item => item.value);

    this._value = pinwheelValues;
  }

  private _handleSlotChange() {
    const newValue = this._items.map(pinwheel => pinwheel.value);

    this._value = newValue;
  }

  protected override render() {
    if (!this.label) {
      logger(
        "Expected a valid `label` attribute, received none.",
        "pinwheel-group",
        "error",
      );
    }

    return html`
      <div
        id="root"
        class="root"
        part="root"
        role="group"
        aria-label=${this.label || nothing}
      >
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}
