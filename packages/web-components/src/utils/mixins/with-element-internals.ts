import { type LitElement } from "lit";
import type { MixinBase, MixinReturn } from "./types";

export const internals = Symbol("internals");

export interface WithElementInternals {
  [internals]: ElementInternals;
}

/**
 * Mixes in an attached `ElementInternals` instance.
 *
 * This mixin is only needed when other shared code needs access to a
 * component's `ElementInternals`, such as form-associated mixins.
 *
 * @param base The class to mix functionality into.
 */
const withElementInternals = <T extends MixinBase<LitElement>>(
  BaseClass: T,
): MixinReturn<T, WithElementInternals> => {
  abstract class WithElementInternalsClass
    extends BaseClass
    implements WithElementInternals
  {
    private _internals: ElementInternals;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(args);

      this._internals = (this as HTMLElement).attachInternals();
    }

    public get [internals](): ElementInternals {
      return this._internals;
    }
  }

  return WithElementInternalsClass;
};

export default withElementInternals;
