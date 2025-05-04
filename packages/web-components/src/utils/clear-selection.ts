/**
 * Clears any user selected content.
 */
const clearSelection = (): void => {
  // Get the current text selection
  const selection = window.getSelection();

  if (!selection) return;

  if (selection.empty) {
    // Clear selection for Chrome, Edge, Safari
    selection.empty();
  } else if (selection.removeAllRanges) {
    // Clear selection for Firefox
    selection.removeAllRanges();
  }
};

export default clearSelection;
