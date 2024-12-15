export const areEqualArrays = <T>(arr1: T[], arr2: T[]): boolean => {
  if (arr1.length !== arr2.length) return false;

  const length = arr1.length;

  for (let i = 0; i < length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
};
