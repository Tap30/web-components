export type ToastColors = "success" | "error" | "info" | "inverse" | "warning";

export type ToastOptions = {
  color?: ToastColors;
  showDismissButton?: boolean;
  dismissOnClickingOutside?: boolean;
  autoHideDuration?: number;
  onClose?: () => void;
  onOpen?: () => void;
}

type ToastProps = ToastOptions & {
  message: string;
};

export default ToastProps;
