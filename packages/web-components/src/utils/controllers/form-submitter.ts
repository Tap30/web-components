import { isServer, type ReactiveElement } from "lit";
import {
  internals,
  type WithElementInternals,
} from "../mixins/with-element-internals";

/**
 * A string indicating the form submission behavior of the element.
 *
 * - submit: The element submits the form. This is the default value if the
 * attribute is not specified, or if it is dynamically changed to an empty or
 * invalid value.
 * - reset: The element resets the form.
 * - button: The element does nothing.
 */
export type FormSubmitterType = "button" | "submit" | "reset";

/**
 * An element that can submit or reset a `<form>`, similar to
 * `<button type="submit">`.
 */
export interface FormSubmitter extends ReactiveElement, WithElementInternals {
  /**
   * A string indicating the form submission behavior of the element.
   *
   * - submit: The element submits the form. This is the default value if the
   * attribute is not specified, or if it is dynamically changed to an empty or
   * invalid value.
   * - reset: The element resets the form.
   * - button: The element does nothing.
   */
  type: FormSubmitterType;
}

type FormSubmitterConstructor =
  | (new () => FormSubmitter)
  | (abstract new () => FormSubmitter);

/**
 * Sets up an element's constructor to enable form submission. The element
 * instance should be form associated and have a `type` property.
 *
 * A click listener is added to each element instance. If the click is not
 * default prevented, it will submit the element's form, if any.
 *
 * @example
 * ```ts
 * class MyElement extends mixinElementInternals(LitElement) {
 *   static {
 *     setupFormSubmitter(MyElement);
 *   }
 *
 *   static formAssociated = true;
 *
 *   type: FormSubmitterType = 'submit';
 * }
 * ```
 *
 * @param ctor The form submitter element's constructor.
 */
export function setupFormSubmitter(ctor: FormSubmitterConstructor) {
  if (isServer) {
    return;
  }

  (ctor as unknown as typeof ReactiveElement).addInitializer(instance => {
    const submitter = instance as FormSubmitter;

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    submitter.addEventListener("click", async event => {
      const { type, [internals]: elementInternals } = submitter;
      const { form } = elementInternals;

      if (!form || type === "button") return;

      // Wait a full task for event bubbling to complete.
      await new Promise<void>(resolve => {
        setTimeout(resolve);
      });

      if (event.defaultPrevented) return;

      if (type === "reset") {
        form.reset();

        return;
      }

      // form.requestSubmit(submitter) does not work with form associated custom
      // elements. This patches the dispatched submit event to add the correct
      // `submitter`.
      // See https://github.com/WICG/webcomponents/issues/814
      form.addEventListener(
        "submit",
        submitEvent => {
          Object.defineProperty(submitEvent, "submitter", {
            configurable: true,
            enumerable: true,
            get: () => submitter,
          });
        },
        { capture: true, once: true },
      );

      form.requestSubmit();
    });
  });
}
