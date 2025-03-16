export const Slots = {
  DEFAULT: "",
} as const;

export const scope = "pinwheel";

export const ErrorMessages = {
  SET_VALID_LABEL_OR_LABELLEDBY_ATTRIBUTE:
    "Expected a valid `label` or `labelledby` attribute, received none.",
  USE_VALUE_MIN_AND_VALUE_MAX:
    "When your items have sequential numeric values, " +
    "include the `valuemax` and `valuemin` attributes to enhance accessibility.",
} as const;
