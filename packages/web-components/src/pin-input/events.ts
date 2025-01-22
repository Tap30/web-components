import { BaseEvent } from "../utils";

export class CompleteEvent extends BaseEvent<null> {
  public static readonly type = "complete";

  constructor() {
    super(CompleteEvent.type, {
      details: null,
      composed: true,
      bubbles: true,
    });
  }
}
