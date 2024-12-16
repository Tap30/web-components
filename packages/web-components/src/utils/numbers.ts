export const toFaNumber = (enNumber: string) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return enNumber.replace(
    /[0-9]/g,
    digit => persianDigits[Number(digit)] as string,
  );
};
