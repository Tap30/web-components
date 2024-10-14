abstract class BaseEvent<T> extends Event {
  private _details?: T;

  public get details(): T | undefined {
    return this._details;
  }

  constructor(name: string, eventInit?: EventInit & { details?: T }) {
    const { details, ...init } = eventInit ?? {};

    super(name, init);

    this._details = details;
  }
}

export default BaseEvent;
