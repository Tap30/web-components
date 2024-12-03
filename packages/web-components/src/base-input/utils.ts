export const isSubmitAction = (
  element: Element,
): element is HTMLButtonElement => {
  const isHTMLInputElement = (element: Element): element is HTMLInputElement =>
    element.tagName === "INPUT";

  const isHTMLButtonElement = (
    element: Element,
  ): element is HTMLButtonElement => element.tagName === "BUTTON";

  return (
    (isHTMLInputElement(element) && element.type === "submit") ||
    (isHTMLButtonElement(element) && element.type === "submit") ||
    (isHTMLInputElement(element) && element.type === "image")
  );
};

export const requestFormSubmit = <E extends HTMLElement>(element: E) => {
  const form =
    element instanceof HTMLInputElement
      ? element.form
      : element.closest("form");

  if (!form) return;

  Array.from(form.elements).forEach(formElement => {
    if (isSubmitAction(formElement)) return formElement.click();
  });
};
