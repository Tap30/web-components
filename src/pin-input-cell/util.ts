export function isArrowKeyPressed(
  input: string,
): input is 'ArrowLeft' | 'ArrowRight' {
  return ['ArrowLeft', 'ArrowRight'].includes(input);
}

export function isDeletionKeyPressed(input: string): boolean {
  return ['Backspace', 'Delete'].includes(input);
}

export function isDeletionKeyWithCtrlOrMetaPressed(event: KeyboardEvent) {
  if (isDeletionKeyPressed(event.key) && (event.metaKey || event.ctrlKey)) {
    return true;
  }
  return false;
}
