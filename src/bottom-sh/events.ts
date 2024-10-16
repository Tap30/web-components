import { BaseEvent } from "../utils";

export class OpenChangeEvent extends BaseEvent<{
  open: boolean;
}> {
  public static type = "openchange";

  constructor(openState: boolean) {
    super(OpenChangeEvent.type, {
      bubbles: true,
      cancelable: true,
      composed: true,
      details: {
        open: openState,
      },
    });
  }
}
