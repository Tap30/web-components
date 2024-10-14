import { BaseEvent } from "../utils";

export default class NpsChangeEvent extends BaseEvent<{ value: number }> {
  constructor(value: number) {
    super("npschange", {
      details: {
        value,
      },
      bubbles: true,
      composed: true,
    });
  }
}
