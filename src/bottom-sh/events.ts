import { BaseEvent } from "../utils";

export class OpenChangeEvent extends BaseEvent<{
  open: boolean;
}> {
  constructor(openState: boolean) {
    super("openchange", {
      bubbles: true,
      cancelable: true,
      composed: true,
      details: {
        open: openState,
      },
    });
  }
}
