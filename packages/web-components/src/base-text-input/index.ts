import type { CSSResult } from "lit";
import { baseInputStyles } from "../base-input";
import { default as styles } from "./base-text-input.style";

export { BaseTextInput as default } from "./base-text-input";
export { Slots as BaseTextInputSlots } from "./constants";

export const baseTextInputStyles: CSSResult[] = [baseInputStyles, styles];
