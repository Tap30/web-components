import { KeyboardKeys } from "../internals";
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
    super(host, {
      tagName: "tapsi-chip",
      resolveParentTarget: () => this._host.closest("tapsi-chip-group"),
      selectionProperties: () => {
        const chipGroup = this._host.closest("tapsi-chip-group");

        return {
          member: "selected",
          mode: chipGroup?.selectMode ?? "multiple",
          required: chipGroup?.selectionRequired ?? false,
        };
      },
    });
  }

  public override async handleClick(event: MouseEvent) {
    if (!(await super.handleClick(event))) return false;

    let targetEvent: SelectEvent | DeselectEvent;

    const { member } = this._selectionProperties;

    const newSelectedState = !this._host[member];

    if (!newSelectedState) targetEvent = new DeselectEvent();
    else targetEvent = new SelectEvent();

    this._host.dispatchEvent(targetEvent);

    return true;
  }

  public override async handleKeyDown(event: KeyboardEvent) {
    if (!(await super.handleKeyDown(event))) return false;

    if (!event.currentTarget) return false;
    if (![KeyboardKeys.SPACE, KeyboardKeys.ENTER].includes(event.key)) {
      return false;
    }

    event.preventDefault();

    (event.target as HTMLElement).click();

    return true;
  }
}

export default ChipSelectionController;
