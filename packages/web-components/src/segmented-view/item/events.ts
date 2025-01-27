import { BaseEvent } from "../../utils/index.ts";

export class ActivateEvent extends BaseEvent<null> {
  public static readonly type = "activate";

  constructor() {
    super(ActivateEvent.type, {
      details: null,
      bubbles: true,
      composed: true,
    });
  }
}
