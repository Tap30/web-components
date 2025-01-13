import { type ReactiveController, type ReactiveControllerHost } from "lit";
import { KeyboardKeys } from "../internals";
import { waitAMicrotask } from "../utils";
import type { Chip } from "./chip";
import { DeselectEvent, SelectEvent } from "./events";

type Host = ReactiveControllerHost & Chip;

/*
 * To use, elements should add the controller and call
 * `controller.handleCheckedChange()` in a getter/setter. This must
 * be synchronous to match native behavior.
 */
class ChipSelectionController implements ReactiveController {
  private readonly _host: Host;

  constructor(host: Host) {
    this._host = host;

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSelectedChange = this.handleSelectedChange.bind(this);
  }

  private get _rootNode() {
    const rootNode = this._host.getRootNode() as
      | ShadowRoot
      | Document
      | HTMLElement
      | null;

    return rootNode;
  }

  private get _selectionProperties() {
    const chipGroup = this._host.closest("tapsi-chip-group");

    if (!chipGroup) return null;

    return {
      selectMode: chipGroup.selectMode,
      selectionRequired: chipGroup.selectionRequired,
    };
  }

  private get _elements(): [Host, ...Host[]] {
    if (!this._rootNode || !this._host.isConnected) return [this._host];

    return Array.from(
      this._rootNode.querySelectorAll<Host>("tapsi-chip"),
    ) as unknown as [Host, ...Host[]];
  }

  private get _siblings() {
    return this._elements.filter(element => element !== this._host);
  }

  public hostConnected() {
    if (this._host.selected) this._applySelectionProperties();
  }

  /**
   * Should be called whenever the host's `selected` property changes
   * synchronously.
   */
  public handleSelectedChange() {
    this._applySelectionProperties();
  }

  private _applySelectionProperties() {
    const properties = this._selectionProperties;

    if (!properties) return;

    const siblings = this._siblings;
    const selectedSiblings = siblings.filter(chip => chip.selected);
    const hostSelected = this._host.selected;

    const { selectMode } = properties;
    const isSingleSelect = selectMode === "single";

    if (isSingleSelect && hostSelected && selectedSiblings.length !== 0) {
      selectedSiblings.forEach(chip => {
        chip.selected = false;
      });
    }
  }

  public async handleClick(event: MouseEvent) {
    if (this._host.disabled) return;

    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    const properties = this._selectionProperties;

    if (!properties) return;

    const selectedSiblings = this._siblings.filter(chip => chip.selected);

    const { selectionRequired } = properties;

    let targetEvent: SelectEvent | DeselectEvent;

    const hostSelected = this._host.selected;
    const newHostSelected = !hostSelected;

    if (
      selectionRequired &&
      !newHostSelected &&
      selectedSiblings.length === 0
    ) {
      return;
    }

    if (hostSelected) targetEvent = new DeselectEvent();
    else targetEvent = new SelectEvent();

    this._host.selected = !hostSelected;

    this._host.dispatchEvent(targetEvent);
  }

  public async handleKeyDown(event: KeyboardEvent) {
    if (this._host.disabled) return;

    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return;

    if (event.key !== KeyboardKeys.ENTER) return;
    if (!event.currentTarget) return;

    (event.currentTarget as HTMLElement).click();
  }
}

export default ChipSelectionController;
