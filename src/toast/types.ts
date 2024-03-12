export enum TOAST_COLORS {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  INVERSE = "inverse",
  WARNING = "warning",
}
export type ToastOptions = {
  color?: TOAST_COLORS;
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
