export const getStyleValue = (
  computedStyle: CSSStyleDeclaration,
  property: keyof CSSStyleDeclaration,
): number => {
  const style = computedStyle[property] as string | null | undefined;

  if (!style) return 0;

  return parseInt(style, 10);
};
