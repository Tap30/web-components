import { BaseEvent } from "../utils";

type EventDetails = {
  activeItem: string;
};

export class ActiveChangeEvent extends BaseEvent<EventDetails> {
  public static type = "activechange";

  constructor(details: EventDetails) {
    super(ActiveChangeEvent.type, {
      details,
      composed: true,
      bubbles: true,
      cancelable: true,
    });
  }
}
