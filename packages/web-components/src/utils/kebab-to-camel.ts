const kebabToCamel = (kebabcase: string) =>
  kebabcase.replace(/-./g, x => x.toUpperCase()?.[1] ?? "");

export default kebabToCamel;
