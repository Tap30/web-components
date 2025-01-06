import { BaseEvent } from "../utils";

type EventDetails = {
  values: string[];
};

export class SelectChangeEvent extends BaseEvent<EventDetails> {
  public static readonly type = "selectchange";

  constructor(details: EventDetails) {
    super(SelectChangeEvent.type, {
      details,
      composed: true,
      bubbles: true,
      cancelable: true,
    });
  }
}
