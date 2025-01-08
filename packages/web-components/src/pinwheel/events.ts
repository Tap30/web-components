export class SynchronizeRequestEvent extends Event {
  public static readonly type = "synchronizerequest";

  constructor() {
    super(SynchronizeRequestEvent.type, { bubbles: true });
  }
}
