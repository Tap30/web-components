import { BaseEvent } from "../utils";

export class RetryEvent extends BaseEvent<null> {
  public static readonly type = "retry";

  constructor() {
    super(RetryEvent.type, {
      bubbles: true,
      composed: true,
      details: null,
    });
  }
}
