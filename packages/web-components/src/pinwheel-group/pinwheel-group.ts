import { html, LitElement, nothing, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { SynchronizeRequestEvent } from "../pinwheel/events";
import { Pinwheel } from "../pinwheel/pinwheel";
import {
  areEqualArrays,
  getRenderRootSlot,
  isSSR,
  logger,
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

  private _initiallySynced = false;

  constructor() {
    super();

    this._handlePinwheelChange = this._handlePinwheelChange.bind(this);
    this._synchronize = this._synchronize.bind(this);
  }

  public override connectedCallback() {
    super.connectedCallback();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.addEventListener("change", this._handlePinwheelChange);
    this.addEventListener(SynchronizeRequestEvent.type, this._synchronize);
  }

  public override disconnectedCallback() {
    super.disconnectedCallback();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.removeEventListener("change", this._handlePinwheelChange);
    this.removeEventListener(SynchronizeRequestEvent.type, this._synchronize);
  }

  protected override willUpdate(changed: PropertyValues<this>) {
    super.willUpdate(changed);

    if (this._initiallySynced) return;

    const sync = () => {
      this._synchronize();

      this._initiallySynced = true;
    };

    if (!this.hasUpdated) void this.updateComplete.then(sync);
    else sync();
  }

  private _synchronize() {
    const values = this._pinwheels.map(wheel => wheel.value);

    this.value = values;
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
    if (areEqualArrays(newValue, this._value)) return;

    this._value = newValue;

    if (isSSR()) return;

    this._setPinwheelValues(newValue);
  }

  private get _pinwheels() {
    const wheelsSlot = getRenderRootSlot(this.renderRoot, Slots.DEFAULT);

    if (!wheelsSlot) return [];

    const items = wheelsSlot
      .assignedNodes()
      .filter(node => node instanceof Pinwheel);

    return items;
  }

  private _setPinwheelValues(newValue: string[]) {
    const pinwheels = this._pinwheels;

    newValue.forEach((v, idx) => {
      const pinwheel = pinwheels[idx];

      if (!pinwheel) return;

      pinwheel.value = v;
    });
  }

  private async _handlePinwheelChange(event: Event) {
    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    const pinwheelValues = this._pinwheels.map(item => item.value);

    this._value = pinwheelValues;
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
        <slot></slot>
      </div>
    `;
  }
}
