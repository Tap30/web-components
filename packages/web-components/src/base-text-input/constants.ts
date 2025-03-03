export const Slots = {
  LEADING_ICON: "leading-icon",
  TRAILING: "trailing",
} as const;

export const ErrorMessages = {
  SET_VALID_LABEL_OR_LABELLEDBY_ATTRIBUTE: [
    "Expected a valid `label` or `labelledby` attribute, received none.",
    "If you want to hide the label, provide both `label` and `hide-label` attributes.",
  ].join(" "),
} as const;
