const clearSelection = () => {
  const selection = window.getSelection();

  if (!selection) return;

  if (selection.empty) {
    // Chrome, Edge, Safari
    selection.empty();
  } else if (selection.removeAllRanges) {
    // Firefox
    selection.removeAllRanges();
  }
};

export default clearSelection;
