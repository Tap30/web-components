import { BaseEvent } from "../utils";

type EventDetails = {
  chipValue: string;
};

export class SelectEvent extends BaseEvent<EventDetails> {
  public static type = "select";

  constructor(details: EventDetails) {
    super(SelectEvent.type, {
      details,
      bubbles: true,
      composed: true,
    });
  }
}

export class DeselectEvent extends BaseEvent<EventDetails> {
  public static type = "deselect";

  constructor(details: EventDetails) {
    super(DeselectEvent.type, {
      details,
      bubbles: true,
      composed: true,
    });
  }
}
