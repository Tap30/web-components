import { KeyboardKeys } from "../../internals/index.ts";
import {
  SelectionController,
  type SelectionElement,
} from "../../utils/index.ts";
import type { BottomNavigation } from "../bottom-navigation.ts";
import { ActivateEvent } from "./events.ts";
import type { BottomNavigationItem } from "./item.ts";

type Host = SelectionElement<BottomNavigationItem>;

/*
 * To use, elements should add the controller and call
 * `controller.handleSelectionChange()` in a getter/setter. This must
 * be synchronous to match native behavior.
 */
class NavItemSelectionController extends SelectionController<BottomNavigationItem> {
  constructor(host: Host) {
    super(host, {
      tagName: "tapsi-bottom-navigation-item",
      resolveParentTarget: () => host.closest("tapsi-bottom-navigation"),
      selectionProperties: {
        member: "active",
        mode: "single",
        required: true,
      },
    });
  }

  public override async handleClick(event: MouseEvent): Promise<boolean> {
    const parent = this._parentTarget as BottomNavigation | null;

    if (!parent) return false;
    if (!(await super.handleClick(event))) return false;

    this._host.dispatchEvent(new ActivateEvent());

    return true;
  }

  public override async handleKeyDown(event: KeyboardEvent): Promise<boolean> {
    const parent = this._parentTarget as BottomNavigation | null;

    if (!parent) return false;
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

export default NavItemSelectionController;
