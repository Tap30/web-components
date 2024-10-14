export const BASENAME = "nps";

export enum GradientColorClass {
  RED = `${BASENAME}__gradient_red`,
  YELLOW = `${BASENAME}__gradient_yellow`,
  GRAY = `${BASENAME}__gradient_gray`,
  GREEN = `${BASENAME}__gradient_green`,
}

export enum Parts {
  CONTAINER = `${BASENAME}-container`,
  DOT = `${BASENAME}-dot`,
  LABEL = `${BASENAME}-label`,
  RATE = `${BASENAME}-rate`,
  RATE_WRAPPER = `${BASENAME}-rate-wrapper`,
  GRADIENT = `${BASENAME}-gradient`,
  SLIDER = `${BASENAME}-slider`,
}
