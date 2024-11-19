import type { ReactiveController, ReactiveControllerHost } from "lit";
import { KeyboardKeys } from "../../internals";
import { ActivateEvent, DeactivateEvent } from "./events";
import type { BottomNavigationItem } from "./item";

class Controller implements ReactiveController {
  private _lastActive: boolean;
  private _firstUpdate = true;

  private readonly _host: ReactiveControllerHost & BottomNavigationItem;

  constructor(host: ReactiveControllerHost & BottomNavigationItem) {
    this._host = host;
    this._lastActive = host.active;

    host.addController(this);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  public handleClick() {
    if (this._host.active) return;

    this._host.dispatchEvent(
      new ActivateEvent({
        itemValue: this._host.value,
      }),
    );
  }

  public handleKeyDown(event: KeyboardEvent) {
    if (event.key !== KeyboardKeys.ENTER) return;

    this.handleClick();
  }

  public hostUpdated() {
    // Do not dispatch event on first update/boot-up.
    if (this._lastActive !== this._host.active && !this._firstUpdate) {
      // This section is really useful for when the user sets `active` on the
      // item programmatically. Most other cases (click and keyboard) are
      // handled by parent because it needs to coordinate the
      // single-active behavior.

      const details = { itemValue: this._host.value };

      if (this._host.active) {
        this._host.dispatchEvent(new ActivateEvent(details));
      } else {
        this._host.dispatchEvent(new DeactivateEvent(details));
      }
    }

    this._lastActive = this._host.active;
    this._firstUpdate = false;
  }
}

export default Controller;
