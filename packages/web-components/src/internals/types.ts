/* eslint-disable @typescript-eslint/no-explicit-any */
import { type BaseEvent } from "../utils/index.ts";

interface CustomEventConstructor {
  new (...params: any[]): BaseEvent<any>;
}

export type RegisteredCustomElement = {
  Slots?: Readonly<Record<string, string>>;
  eventsMap?: Readonly<Record<string, CustomEventConstructor>>;
  tagName: string;
  elementClass: CustomElementConstructor;
};
/* eslint-enable @typescript-eslint/no-explicit-any */
