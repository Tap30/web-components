import type { CSSResult } from "lit";
import { baseInputStyles } from "../base-input/index.ts";
import { default as styles } from "./base-text-input.style.ts";

export { BaseTextInput as default } from "./base-text-input.ts";
export { Slots as BaseTextInputSlots } from "./constants.ts";

export const baseTextInputStyles: CSSResult[] = [baseInputStyles, styles];
