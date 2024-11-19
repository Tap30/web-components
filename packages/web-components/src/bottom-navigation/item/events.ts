import { BaseEvent } from "../../utils";

type EventDetails = {
  itemValue: string;
};

export class ActivateEvent extends BaseEvent<EventDetails> {
  public static type = "activate";

  constructor(details: EventDetails) {
    super(ActivateEvent.type, {
      details,
      bubbles: true,
      composed: true,
    });
  }
}

export class DeactivateEvent extends BaseEvent<EventDetails> {
  public static type = "deactivate";

  constructor(details: EventDetails) {
    super(DeactivateEvent.type, {
      details,
      bubbles: true,
      composed: true,
    });
  }
}
