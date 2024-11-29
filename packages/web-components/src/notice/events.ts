import { BaseEvent } from "../utils";

type EventDetails = null;

export class DismissEvent extends BaseEvent<EventDetails> {
  public static type = "dismiss";

  constructor(details?: EventDetails) {
    super(DismissEvent.type, {
      details,
      bubbles: false,
      composed: true,
    });
  }
}
