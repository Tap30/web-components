import {
  SelectionController,
  type SelectionElement,
} from "../../utils/index.ts";
import type { Pinwheel } from "../pinwheel.ts";
import type { PinwheelItem } from "./item.ts";

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

  private _emitValueChange() {
    this._host.dispatchEvent(new Event("change", { bubbles: true }));
  }

  public override async handleClick(event: MouseEvent): Promise<boolean> {
    const parent = this._parentTarget as Pinwheel | null;

    if (!parent) return false;
    if (parent.disabled) return false;

    if (!(await super.handleClick(event))) return false;

    this._emitValueChange();
    parent.setViewOnItem(this._host);

    return true;
  }
}

export default ItemSelectionController;
