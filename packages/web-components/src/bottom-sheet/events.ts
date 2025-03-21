import { BaseEvent } from "../utils/index.ts";

type SnappedEventDetails = {
  snapPoint: number;
};

export class SnappedEvent extends BaseEvent<SnappedEventDetails> {
  public static readonly type = "snapped";

  constructor(details: SnappedEventDetails) {
    super(SnappedEvent.type, {
      composed: true,
      details,
    });
  }
}

export class OpeningEvent extends BaseEvent<null> {
  public static readonly type = "opening";

  constructor() {
    super(OpeningEvent.type, {
      composed: true,
      cancelable: true,
      details: null,
    });
  }
}

export class ClosingEvent extends BaseEvent<null> {
  public static readonly type = "closing";

  constructor() {
    super(ClosingEvent.type, {
      composed: true,
      cancelable: true,
      details: null,
    });
  }
}

export class OpenedEvent extends BaseEvent<null> {
  public static readonly type = "opened";

  constructor() {
    super(OpenedEvent.type, {
      composed: true,
      details: null,
    });
  }
}

export class ClosedEvent extends BaseEvent<null> {
  public static readonly type = "closed";

  constructor() {
    super(ClosedEvent.type, {
      composed: true,
      details: null,
    });
  }
}

export class HideEvent extends BaseEvent<null> {
  public static readonly type = "hide";

  constructor() {
    super(HideEvent.type, {
      composed: true,
      cancelable: true,
      details: null,
    });
  }
}

export class ShowEvent extends BaseEvent<null> {
  public static readonly type = "show";

  constructor() {
    super(ShowEvent.type, {
      composed: true,
      cancelable: true,
      details: null,
    });
  }
}
