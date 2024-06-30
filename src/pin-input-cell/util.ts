export function englishToPersian(input: string): string {
  const localInput = `${input}`;
  const englishDigits = '0123456789';
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  let output = '';

  for (const char of localInput) {
    const index = englishDigits.indexOf(char);
    if (index !== -1) {
      output += persianDigits[index];
    } else {
      output += char;
    }
  }

  return output;
}

export function persianToEnglish(input: string): string {
  const localInput = `${input}`;
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const englishDigits = '0123456789';
  let output = '';

  for (const char of localInput) {
    const index = persianDigits.indexOf(char);
    if (index !== -1) {
      output += englishDigits[index];
    } else {
      output += char;
    }
  }

  return output;
}

export function isValidDigit(input: string): boolean {
  const englishDigits = '0123456789۰۱۲۳۴۵۶۷۸۹';

  if (typeof input === 'string' && input.length === 1) {
    return englishDigits.indexOf(input) !== -1;
  }

  return false;
}

export function isArrowKeyPressed(
  input: string,
): input is 'ArrowLeft' | 'ArrowRight' {
  return ['ArrowLeft', 'ArrowRight'].includes(input);
}

export function isDeletionKeyPressed(input: string): boolean {
  return ['Backspace', 'Delete'].includes(input);
}

export function isDeletionKeyWithCtrlOrMetaPressed({
  input,
  metaKey = false,
  ctrlKey = false,
}: {
  input: string;
  metaKey: boolean;
  ctrlKey: boolean;
}) {
  if (isDeletionKeyPressed(input) && (metaKey || ctrlKey)) {
    return true;
  }
  return false;
}
