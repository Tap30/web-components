import { requestFormSubmit } from "../../base-input/utils";
import { KeyboardKeys } from "../../internals";
import { clamp, SelectionController, type SelectionElement } from "../../utils";
import type { Pinwheel } from "../pinwheel";
import type { PinwheelItem } from "./item";

type Host = SelectionElement<PinwheelItem>;

/*
 * To use, elements should add the controller and call
 * `controller.handleSelectionChange()` in a getter/setter. This must
 * be synchronous to match native behavior.
 */
class ItemSelectionController extends SelectionController<PinwheelItem> {
  constructor(host: Host) {
    super(host, {
      tagName: "tapsi-pinwheel-item",
      resolveParentTarget: () => host.closest("tapsi-pinwheel"),
      selectionProperties: {
        member: "selected",
        mode: "single",
        required: true,
      },
    });
  }

  private _emitValueChange(newValue: string) {
    const parent = this._parentTarget as Pinwheel | null;

    if (!parent) return;
    if (parent.disabled) return;

    parent.value = newValue;

    this._host.dispatchEvent(new Event("change", { bubbles: true }));
  }

  public override handleSelectionChange() {
    super.handleSelectionChange();

    const parent = this._parentTarget as Pinwheel | null;

    if (!parent) return;
    if (parent.disabled) return;

    const selectedItem = this._elements.find(item => item.selected);

    if (!selectedItem) return;

    parent.value = selectedItem.value;
  }

  public override async handleClick(event: MouseEvent) {
    if (!(await super.handleClick(event))) return false;

    this._emitValueChange(this._host.value);

    return true;
  }

  public override async handleKeyDown(event: KeyboardEvent) {
    if (!(await super.handleKeyDown(event))) return false;

    const parent = this._parentTarget as Pinwheel | null;

    if (!parent) return false;
    if (parent.disabled) return false;

    const items = this._elements;

    switch (event.key) {
      case KeyboardKeys.ENTER: {
        event.preventDefault();

        requestFormSubmit(parent);

        return true;
      }

      case KeyboardKeys.UP: {
        event.preventDefault();

        if (items.length === 0) return false;

        const idx = items.findIndex(item => item.selected);
        const nextIdx = idx === -1 ? 0 : clamp(idx - 1, 0, items.length - 1);
        const newValue = items[nextIdx]?.value;

        if (!newValue) return false;

        this._emitValueChange(newValue);

        return true;
      }

      case KeyboardKeys.DOWN: {
        event.preventDefault();

        if (items.length === 0) return false;

        const idx = items.findIndex(item => item.selected);
        const nextIdx = clamp(idx + 1, 0, items.length - 1);
        const newValue = items[nextIdx]?.value;

        if (!newValue) return false;

        this._emitValueChange(newValue);

        return true;
      }

      case KeyboardKeys.HOME: {
        event.preventDefault();

        const nextIdx = 0;
        const newValue = items[nextIdx]?.value;

        if (!newValue) return false;

        this._emitValueChange(newValue);

        return true;
      }

      case KeyboardKeys.END: {
        event.preventDefault();

        const nextIdx = items.length - 1;
        const newValue = items[nextIdx]?.value;

        if (!newValue) return false;

        this._emitValueChange(newValue);

        return true;
      }

      default:
        return false;
    }
  }
}

export default ItemSelectionController;
