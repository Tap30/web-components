import { BaseEvent } from "../utils";

type EventDetails = {
  value: string;
};

export class ActiveChangeEvent extends BaseEvent<EventDetails> {
  public static readonly type = "activechange";

  constructor(details: EventDetails) {
    super(ActiveChangeEvent.type, {
      details,
      composed: true,
      bubbles: true,
    });
  }
}
