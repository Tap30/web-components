import { KeyboardKeys } from "../internals/index.ts";
import { SelectionController, type SelectionElement } from "../utils/index.ts";
import type { Chip } from "./chip.ts";
import { DeselectEvent, SelectEvent } from "./events.ts";

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

  public override async handleClick(event: MouseEvent): Promise<boolean> {
    if (!(await super.handleClick(event))) return false;

    let targetEvent: SelectEvent | DeselectEvent;

    const { member } = this._selectionProperties;

    const newSelectedState = !this._host[member];

    if (!newSelectedState) targetEvent = new DeselectEvent();
    else targetEvent = new SelectEvent();

    this._host.dispatchEvent(targetEvent);

    return true;
  }

  public override async handleKeyDown(event: KeyboardEvent): Promise<boolean> {
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
