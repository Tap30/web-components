import { BaseEvent } from "../utils/index.ts";

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
