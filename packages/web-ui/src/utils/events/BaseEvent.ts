type Config<T> = EventInit & {
  details: T;
};

abstract class BaseEvent<T> extends Event {
  private _details: T;

  public get details(): T {
    return this._details;
  }

  constructor(name: string, config: Config<T>) {
    const { details, ...init } = config;

    super(name, init);

    this._details = details;
  }
}

export default BaseEvent;
