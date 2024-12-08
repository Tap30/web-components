import {
  html,
  type LitElement,
  type ReactiveController,
  type ReactiveControllerHost,
  type TemplateResult,
} from "lit";
import { createRef, ref, type Ref } from "lit/directives/ref.js";
import { styleMap } from "lit/directives/style-map.js";
import { isElementFocusable } from "../dom";
import isSSR from "../is-ssr";

type Host = ReactiveControllerHost & LitElement;

const TrapperTypes = {
  START: "start",
  END: "end",
} as const;

type TypesOfEnumValues<Enum extends Record<string, unknown>> = Enum[keyof Enum];

class FocusTrapper implements ReactiveController {
  // This TreeWalker is used to walk through a host's children to find
  // focusable elements. TreeWalker is faster than `querySelectorAll('*')`.
  // We check for SSR because there isn't a "document" during an SSR
  // run.
  private readonly _treeWalker: TreeWalker | null;

  private _firstTrapperRef: Ref<HTMLInputElement> = createRef();

  constructor(host: Host) {
    host.addController(this);

    this._treeWalker = isSSR()
      ? null
      : document.createTreeWalker(host, NodeFilter.SHOW_ELEMENT);

    this._handleTrapperFocus = this._handleTrapperFocus.bind(this);
  }

  public trap() {
    this._firstTrapperRef.value?.focus();
  }

  private _handleTrapperFocus(event: FocusEvent) {
    const [firstFocusableChild, lastFocusableChild] =
      this._getFirstAndLastFocusableChildren();

    const trapperType = this._getTrapperType(event.target as HTMLElement);

    const isFirstTrapper = trapperType === "start";
    const isLastTrapper = !isFirstTrapper;

    // When the host does not have focusable children
    if (!firstFocusableChild || !lastFocusableChild) {
      // Keep the focus trapped
      if (isLastTrapper) this._firstTrapperRef.value?.focus();

      return;
    }

    // Where the focus came from (what was previously focused).
    const focusCameFromFirstChild = event.relatedTarget === firstFocusableChild;
    const focusCameFromLastChild = event.relatedTarget === lastFocusableChild;

    // Although this is a focus trap, focus can come from outside the trap.
    // This can happen when elements are programmatically `focus()`'d. It also
    // happens when focus leaves and returns to the window, such as clicking on
    // the browser's URL bar and pressing Tab, or switching focus between
    // iframes.
    const focusCameFromOutside =
      !focusCameFromFirstChild && !focusCameFromLastChild;

    // Focus the host's first child when we reach the end of the host and
    // focus is moving forward. Or, when focus is moving forwards into the
    // host from outside of the window.
    const shouldFocusFirstChild =
      (isLastTrapper && focusCameFromLastChild) ||
      (isFirstTrapper && focusCameFromOutside);

    if (shouldFocusFirstChild) {
      firstFocusableChild.focus();

      return;
    }

    // Focus the host's last child when we reach the beginning of the host
    // and focus is moving backward. Or, when focus is moving backwards into the
    // host from outside of the window.
    const shouldFocusLastChild =
      (isFirstTrapper && focusCameFromFirstChild) ||
      (isLastTrapper && focusCameFromOutside);

    if (shouldFocusLastChild) {
      lastFocusableChild.focus();

      return;
    }
  }

  private _getTrapperType(
    trapper: HTMLElement,
  ): TypesOfEnumValues<typeof TrapperTypes> | null {
    return trapper.getAttribute("data-trapper-type") as TypesOfEnumValues<
      typeof TrapperTypes
    > | null;
  }

  private _getFirstAndLastFocusableChildren():
    | [HTMLElement, HTMLElement]
    | [null, null] {
    if (!this._treeWalker) return [null, null];

    let firstFocusableChild: HTMLElement | null = null;
    let lastFocusableChild: HTMLElement | null = null;

    // Reset the current node back to the root host element.
    this._treeWalker.currentNode = this._treeWalker.root;
    while (this._treeWalker.nextNode()) {
      const nextChild = this._treeWalker.currentNode as Element;

      if (!isElementFocusable(nextChild)) continue;

      if (!firstFocusableChild) firstFocusableChild = nextChild as HTMLElement;

      lastFocusableChild = nextChild as HTMLElement;
    }

    return [firstFocusableChild, lastFocusableChild] as
      | [HTMLElement, HTMLElement]
      | [null, null];
  }

  public wrap(tree: TemplateResult) {
    const styles = styleMap({
      position: "absolute",
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      border: 0,
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
    });

    return html`
      <div
        ${ref(this._firstTrapperRef)}
        aria-hidden="true"
        tabindex="0"
        style=${styles}
        data-trapper-type=${TrapperTypes.START}
        @focus=${this._handleTrapperFocus}
      ></div>
      ${tree}
      <div
        aria-hidden="true"
        tabindex="0"
        style=${styles}
        data-trapper-type=${TrapperTypes.END}
        @focus=${this._handleTrapperFocus}
      ></div>
    `;
  }

  public hostConnected() {}
  public hostDisconnected() {}
  public hostUpdate() {}
  public hostUpdated() {}
}

export default FocusTrapper;
