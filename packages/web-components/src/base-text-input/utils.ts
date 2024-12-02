import type { PropertyDeclaration } from "lit";

export const stringConverter: PropertyDeclaration["converter"] = {
  fromAttribute(value: string | null): string {
    return value ?? "";
  },
  toAttribute(value: string): string | null {
    return value || null;
  },
};
