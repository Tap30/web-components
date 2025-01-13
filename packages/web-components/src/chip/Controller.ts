import { SelectionController, type SelectionElement } from "../utils";
import type { Chip } from "./chip";
import { DeselectEvent, SelectEvent } from "./events";

type Host = SelectionElement<Chip>;

/*
 * To use, elements should add the controller and call
 * `controller.handleSelectionChange()` in a getter/setter. This must
 * be synchronous to match native behavior.
 */
class ChipSelectionController extends SelectionController<Chip> {
  constructor(host: Host) {
    super(
      host,
      "tapsi-chip",
      () => {
        const chipGroup = this._host.closest("tapsi-chip-group");

        return {
          member: "selected",
          mode: chipGroup?.selectMode ?? "multiple",
          required: chipGroup?.selectionRequired ?? false,
        };
      },
      selected => {
        let targetEvent: SelectEvent | DeselectEvent;

        if (!selected) targetEvent = new DeselectEvent();
        else targetEvent = new SelectEvent();

        this._host.dispatchEvent(targetEvent);
      },
    );
  }
}

export default ChipSelectionController;
