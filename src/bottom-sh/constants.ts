export const BASENAME = "bottom-sheet";

export enum Parts {
  ROOT = "root",
  HEADER = "header",
  BODY = "body",
  ACTION_BAR = "action-bar",
  OVERLAY = "overlay",
  GRABBER = "grabber",
  DISMISS = "dismiss",
  DISMISS_ICON = "dismiss-icon",
}

export enum Slots {
  HEADER = `${BASENAME}-header`,
  BODY = `${BASENAME}-body`,
  ACTION_BAR = `${BASENAME}-action-bar`,
}
