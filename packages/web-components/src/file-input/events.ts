import { BaseEvent } from "../utils/index.ts";

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

export class ClearEvent extends BaseEvent<null> {
  public static readonly type = "clear";

  constructor() {
    super(ClearEvent.type, {
      bubbles: true,
      composed: true,
      details: null,
    });
  }
}
