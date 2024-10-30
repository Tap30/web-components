import { BaseEvent } from "../utils";

export default class ValueChangeEvent extends BaseEvent<{
  value: number;
}> {
  public static type = "valuechange";

  constructor(value: number) {
    super(ValueChangeEvent.type, {
      details: {
        value,
      },
      bubbles: true,
      composed: true,
    });
  }
}
