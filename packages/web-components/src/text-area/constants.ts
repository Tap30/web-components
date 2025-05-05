export const ErrorMessages = {
  SET_VALID_MIN_ROWS: [
    "Expected a valid `min-rows`.",
    "The `min-rows` property should be less than `rows` which has a default value of 2.",
  ].join(" "),
} as const;
