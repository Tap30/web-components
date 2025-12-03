/**
 * Builds a message indicating that the current text exceeds the allowed length.
 *
 * @param {Object} params
 * @param {number} params.currentLength - Number of characters currently used.
 * @param {number} params.maxLength - Maximum allowed number of characters.
 * @returns {string} A user-facing message describing how many characters must be trimmed.
 */
export const getTooLongValidationMessage = (params: {
  currentLength: number;
  maxLength: number;
}): string => {
  const { currentLength, maxLength } = params;

  return `Please shorten this text to ${maxLength} characters or less (you are currently using ${currentLength} characters).`;
};

/**
 * Builds a message indicating that the current text is shorter than the required minimum.
 *
 * @param {Object} params
 * @param {number} params.currentLength - Number of characters currently used.
 * @param {number} params.minLength - Minimum required number of characters.
 * @returns {string} A user-facing message explaining how many more characters are needed.
 */
export const getTooShortValidationMessage = (params: {
  currentLength: number;
  minLength: number;
}): string => {
  const { currentLength, minLength } = params;

  return `Please use at least ${minLength} characters (you are currently using ${currentLength} characters).`;
};
