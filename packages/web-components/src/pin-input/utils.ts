import type { PropertyDeclaration } from "lit";

export const stringConverter: PropertyDeclaration["converter"] = {
  fromAttribute(value: string | null): string {
    return value ?? "";
  },
  toAttribute(value: string): string | null {
    return value || null;
  },
};

export const isNumeric = (str: string): boolean => /^[0-9]+$/.test(str);
export const isAlphaNumeric = (str: string): boolean =>
  /^[a-zA-Z0-9]+$/i.test(str);
