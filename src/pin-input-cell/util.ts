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

const deletionKeys = ['Meta', 'Delete', 'Backspace'];

export function isDeletionKey(key: string): boolean {
  return deletionKeys.includes(key);
}
