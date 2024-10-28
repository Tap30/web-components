import { type LitElement } from "lit";
import type { MixinBase, MixinReturn } from "./types";

export const internals = Symbol("internals");

export interface WithElementInternals {
  [internals]: ElementInternals;
}

const withElementInternals = <T extends MixinBase<LitElement>>(
  BaseClass: T,
): MixinReturn<T, WithElementInternals> => {
  abstract class WithElementInternalsClass
    extends BaseClass
    implements WithElementInternals
  {
    private _internals?: ElementInternals;

    public get [internals](): ElementInternals {
      if (!this._internals) {
        this._internals = (this as HTMLElement).attachInternals();
      }

      return this._internals;
    }
  }

  return WithElementInternalsClass;
};

export default withElementInternals;
