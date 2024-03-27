import type { ToastOptions } from "./types";
import "./index";
const getToastContainer = (): HTMLElement => {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    const body = document.getElementsByTagName("body")[0];
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.style.padding = "20px";
    toastContainer.style.pointerEvents = "none";
    toastContainer.style.position = "absolute";
    toastContainer.style.top = "0";
    toastContainer.style.left = "0";
    toastContainer.style.right = "0";
    toastContainer.style.display = "flex";
    toastContainer.style.justifyContent = "center";
    toastContainer.style.flexDirection = "column";
    toastContainer.style.alignItems = "center";
    toastContainer.style.gap = "20px";
    body.appendChild(toastContainer);
  }
  return toastContainer;
};

/**
 * Enqueues a toast message to be displayed.
 * @param {string} message - The message to be displayed in the toast.
 * @param {ToastOptions} [options] - Optional options for customizing the toast behavior.
 * @returns {void}
 */
export const enqueueToast = (message: string, options?: ToastOptions): void => {
  if (message) {
    const toastContainer = getToastContainer();
    const toast = document.createElement("tap-toast");
    toast.message = message;
    toast.color = options?.color || 'inverse';
    toast.showDismissButton = options?.showDismissButton;
    toast.autoHideDuration = options?.autoHideDuration || 3000;
    toast.onClose = options?.onClose;
    toast.onOpen = options?.onOpen;
    toastContainer.appendChild(toast);
  }
};
