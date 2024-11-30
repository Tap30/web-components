import { type LitElement } from "lit";
import { property } from "lit/decorators.js";
import type { MixinBase, MixinReturn } from "./types";

/**
 * A property symbol that indicates whether or not a `Focusable` element can be
 * focused.
 */
export const isFocusable = Symbol("isFocusable");

export interface Focusable {
  /**
   * Whether or not the element can be focused. Defaults to true. Set to false
   * to disable focusing (unless a user has set a `tabindex`).
   */
  [isFocusable]: boolean;
}

/**
 * Mixes in focusable functionality for a class.
 *
 * Elements can enable and disable their focusability with the `isFocusable`
 * symbol property. Changing `tabIndex` will trigger a lit render, meaning
 * `this.tabIndex` can be used in template expressions.
 *
 * This mixin will preserve externally-set tabindices. If an element turns off
 * focusability, but a user sets `tabindex="0"`, it will still be focusable.
 *
 * To remove user overrides and restore focusability control to the element,
 * remove the `tabindex` attribute.
 *
 * @param base The class to mix functionality into.
 */
const withFocusable = <T extends MixinBase<LitElement>>(
  base: T,
): MixinReturn<T, Focusable> => {
  abstract class WithFocusable extends base implements Focusable {
    @property({ type: Number, noAccessor: true })
    public override tabIndex!: number;

    private _isFocusable = false;
    private _externalTabIndex: number | null = null;
    private _isUpdatingTabIndex = false;

    public get [isFocusable]() {
      return this._isFocusable;
    }

    public set [isFocusable](value: boolean) {
      if (this._isFocusable === value) return;

      this._isFocusable = value;
      this._updateTabIndex();
    }

    public override connectedCallback() {
      super.connectedCallback();

      this._updateTabIndex();
    }

    public override attributeChangedCallback(
      name: string,
      old: string | null,
      value: string | null,
    ) {
      if (name !== "tabindex") {
        super.attributeChangedCallback(name, old, value);

        return;
      }

      this.requestUpdate("tabIndex", Number(old ?? -1));

      if (this._isUpdatingTabIndex) {
        // Not an externally-initiated update.
        return;
      }

      if (!this.hasAttribute("tabindex")) {
        // User removed the attribute, can now use internal tabIndex
        this._externalTabIndex = null;
        this._updateTabIndex();

        return;
      }

      this._externalTabIndex = this.tabIndex;
    }

    private _updateTabIndex() {
      const internalTabIndex = this._isFocusable ? 0 : -1;
      const computedTabIndex = this._externalTabIndex ?? internalTabIndex;

      this._isUpdatingTabIndex = true;
      this.tabIndex = computedTabIndex;
      this._isUpdatingTabIndex = false;
    }
  }

  return WithFocusable;
};

export default withFocusable;
