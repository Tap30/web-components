import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { DirectiveResult } from "lit/async-directive";
import { live, type LiveDirective } from "lit/directives/live.js";
import kebabToCamel from "../kebab-to-camel";
import SystemError from "../SystemError";

class ControlledPropController<
  T,
  H extends ReactiveControllerHost = ReactiveControllerHost,
> implements ReactiveController
{
  private _host: ReactiveControllerHost;

  private _isControlled: boolean = false;
  private _propKey: PropertyKey;
  private _controlBehaviorPropKey: PropertyKey;

  constructor(host: H, propKey: keyof H, controlBehaviorPropKey?: string) {
    host.addController(this);

    this._host = host;
    this._propKey = propKey;

    if (typeof controlBehaviorPropKey === "undefined") {
      let key: PropertyKey;

      if (typeof propKey === "symbol") {
        key = Symbol(kebabToCamel(`controlled-${propKey.description}`));
      } else {
        key = kebabToCamel(`controlled-${String(propKey)}`);
      }

      this._controlBehaviorPropKey = key;
    } else this._controlBehaviorPropKey = controlBehaviorPropKey;
  }

  private _getPropDescriptor(propKey: PropertyKey): PropertyDescriptor {
    const proto = Object.getPrototypeOf(this._host) as object;
    const prop = Object.getOwnPropertyDescriptor(proto, propKey);

    if (!prop) {
      throw new SystemError(
        [
          `The required member \`${String(propKey)}\` is not present in the prototype.`,
          "Please ensure it is included for correct functionality.",
        ].join("\n"),
        `${proto.constructor.name}`,
      );
    }

    return prop;
  }

  private _getControlledProp(): PropertyDescriptor {
    return this._getPropDescriptor(this._propKey);
  }

  private _getBehaviorProp(): PropertyDescriptor {
    return this._getPropDescriptor(this._controlBehaviorPropKey);
  }

  private _setProp(newValue: T): void {
    const prop = this._getControlledProp();

    prop.set?.call(this._host, newValue);
  }

  public get isControlled(): boolean {
    return this._isControlled;
  }

  public get value(): T {
    return this._getControlledProp().get?.call(this._host) as T;
  }

  public get liveInputBinding(): DirectiveResult<typeof LiveDirective> {
    return live(this.value);
  }

  public set value(newValue: T) {
    if (this._isControlled) {
      this._host.requestUpdate();

      return;
    }

    this._setProp(newValue);
  }

  hostConnected(): void {
    const behaviorProp = this._getBehaviorProp();

    this._isControlled = Boolean(behaviorProp.get?.call(this._host));
  }

  hostDisconnected(): void {}
}

export default ControlledPropController;
