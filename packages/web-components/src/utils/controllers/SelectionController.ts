import { type ReactiveController, type ReactiveControllerHost } from "lit";
import { waitAMicrotask } from "../../utils";

type Getter<T> = () => T;

type RootNode = ShadowRoot | Document | HTMLElement;

export type SelectionElement<T extends HTMLElement> = ReactiveControllerHost &
  T;

export type SelectionProperties<T extends HTMLElement> = {
  /**
   * The class boolean field member represents selected state.
   */
  member: keyof T;
  /**
   * The selection mode.
   */
  mode: "single" | "multiple";
  /**
   * Determines if selection is required.
   */
  required?: boolean;
};

export type SelectionControllerConfig<T extends HTMLElement> = {
  tagName: keyof HTMLElementTagNameMap;
  resolveParentTarget: (rootNode: RootNode) => HTMLElement | null;
  selectionProperties: SelectionProperties<T> | Getter<SelectionProperties<T>>;
};

/*
 * To use, elements should add the controller and call
 * `controller.handleSelectionChange()` in a getter/setter. This must
 * be synchronous to match native behavior.
 */
class SelectionController<T extends HTMLElement> implements ReactiveController {
  protected readonly _host: SelectionElement<T>;

  private readonly _hostTagName: string;
  private readonly _selectionPropertiesResolver:
    | SelectionProperties<T>
    | Getter<SelectionProperties<T>>;
  private readonly _resolveParentTarget: (
    rootNode: RootNode,
  ) => HTMLElement | null;

  constructor(host: SelectionElement<T>, config: SelectionControllerConfig<T>) {
    const { resolveParentTarget, selectionProperties, tagName } = config;

    this._host = host;
    this._hostTagName = tagName;
    this._selectionPropertiesResolver = selectionProperties;
    this._resolveParentTarget = resolveParentTarget;

    host.addController(this);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  protected get _elements(): [SelectionElement<T>, ...SelectionElement<T>[]] {
    const parentTarget = this._parentTarget;

    if (!parentTarget || !this._host.isConnected) return [this._host];

    return Array.from(
      parentTarget.querySelectorAll<SelectionElement<T>>(
        `${this._hostTagName}`,
      ),
    ) as unknown as [SelectionElement<T>, ...SelectionElement<T>[]];
  }

  private get _rootNode() {
    const rootNode = this._host.getRootNode() as RootNode | null;

    return rootNode;
  }

  protected get _parentTarget() {
    const rootNode = this._rootNode;

    if (!rootNode) return null;

    return this._resolveParentTarget(rootNode);
  }

  protected get _siblings() {
    return this._elements.filter(element => element !== this._host);
  }

  protected get _selectionProperties() {
    if (typeof this._selectionPropertiesResolver === "function") {
      return this._selectionPropertiesResolver();
    }

    return this._selectionPropertiesResolver;
  }

  public hostConnected() {
    const { member: selectionMember } = this._selectionProperties;

    if (this._host[selectionMember]) this._applySelectionProperties();
  }

  public hostDisconnected() {}
  public hostUpdate() {}
  public hostUpdated() {}

  /**
   * Should be called whenever the host's selection property changes
   * synchronously.
   */
  public handleSelectionChange() {
    this._applySelectionProperties();
  }

  private _applySelectionProperties() {
    const properties = this._selectionProperties;

    if (!properties) return;

    const { member, mode } = properties;

    const siblings = this._siblings;
    const selectedSiblings = siblings.filter(el => el[member]);
    const hostSelected = this._host[member];
    const isSingleSelect = mode === "single";

    if (isSingleSelect && hostSelected && selectedSiblings.length !== 0) {
      selectedSiblings.forEach(el => {
        // @ts-expect-error This is alright, because we expect to recieve a
        // boolean member.
        el[member] = false;
      });
    }
  }

  public async handleClick(event: MouseEvent) {
    if ("disabled" in this._host && this._host.disabled) return false;

    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return false;

    const properties = this._selectionProperties;

    if (!properties) return false;

    const { member, required = false } = properties;

    const selectedSiblings = this._siblings.filter(el => el[member]);

    const hostSelected = this._host[member];
    const newHostSelected = !hostSelected;

    if (required && !newHostSelected && selectedSiblings.length === 0) {
      return false;
    }

    if (hostSelected === newHostSelected) return false;

    // @ts-expect-error This is alright, because we expect to recieve a
    // boolean member.
    this._host[member] = newHostSelected;

    return true;
  }

  public async handleKeyDown(event: KeyboardEvent) {
    if ("disabled" in this._host && this._host.disabled) return false;

    // allow event to propagate to user code after a microtask.
    await waitAMicrotask();

    if (event.defaultPrevented) return false;

    return true;
  }
}

export default SelectionController;
