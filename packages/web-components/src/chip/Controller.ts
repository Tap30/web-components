import type { ReactiveController, ReactiveControllerHost } from "lit";
import { KeyboardKeys } from "../internals";
import type { Chip } from "./chip";
import { DeselectEvent, SelectEvent } from "./events";

class Controller implements ReactiveController {
  private _lastSelected: boolean;
  private _firstUpdate = true;

  private readonly _host: ReactiveControllerHost & Chip;

  constructor(host: ReactiveControllerHost & Chip) {
    this._host = host;
    this._lastSelected = host.selected;

    host.addController(this);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  public handleClick() {
    if (this._host.disabled) return;

    let event: SelectEvent | DeselectEvent;

    if (this._host.selected) event = new DeselectEvent();
    else event = new SelectEvent();

    this._host.dispatchEvent(event);
  }

  public handleKeyDown(event: KeyboardEvent) {
    if (this._host.disabled) return;
    if (event.key !== KeyboardKeys.ENTER) return;
    if (!event.currentTarget) return;

    (event.currentTarget as HTMLElement).click();
  }

  public hostUpdated() {
    // Do not dispatch event on first update/boot-up.
    if (this._lastSelected !== this._host.selected && !this._firstUpdate) {
      // This section is really useful for when the user sets `selected` on the
      // chip programmatically. Most other cases (click and keyboard) are
      // handled by parent because it needs to coordinate the
      // select-mode behavior.

      let event: SelectEvent | DeselectEvent;

      if (this._host.selected) event = new SelectEvent();
      else event = new DeselectEvent();

      this._host.dispatchEvent(event);
    }

    this._lastSelected = this._host.selected;
    this._firstUpdate = false;
  }
}

export default Controller;
