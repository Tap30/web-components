export const Slots = {
  ACTION: "action",
  THUMBNAIL: "thumbnail",
  HEADER_ICON: "header-icon",
} as const;

export const ErrorMessages = {
  HEADER_TITLE_IS_REQUIRED_WHEN_VARIANT_IS_NOT_NONE:
    "`headerTitle` is required when `variant` is not `none`",
  HEADER_ICON_IS_REQUIRED_WHEN_VARIANT_IS_NOT_NONE:
    "`headerIcon` is required when `variant` is not `none`",
} as const;
