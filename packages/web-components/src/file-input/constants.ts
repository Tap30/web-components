export const Slots = {
  PLACEHOLDER_ICON: "placeholder-icon",
} as const;

export const scope = "file-input";

export const ErrorMessages = {
  SET_VALID_LABEL_OR_LABELLEDBY_ATTRIBUTE: [
    "Expected a valid `label` or `labelledby` attribute, received none.",
    "If you want to hide the label, provide both `label` and `hide-label` attributes.",
  ].join(" "),
  INVALID_LOADING_VALUE: "the `loading` value should be between 0 and 100",
  ERROR_AND_LOADING_ATTRIBUTES_AT_THE_SAME_TIME:
    "The File input cannot have `error` and `loading` state at the same time.",
  INVALID_VALUE: [
    "Failed to set the 'value' property on 'TapsiFileInput':",
    "This input element accepts a filename, which may only be",
    "programmatically set to the empty string.",
  ].join(" "),
} as const;
