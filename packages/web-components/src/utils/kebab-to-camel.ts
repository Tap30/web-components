const kebabToCamel = (kebabcase: string): string =>
  kebabcase.replace(/-./g, x => x.toUpperCase()?.[1] ?? "");

export default kebabToCamel;
