import debounce from "./debounce";

export type SizeChangeProps = {
  width: number;
  height: number;
  element: Element;
};

/**
 * Handles resize events using ResizeObserver.
 */
class ResizeSensor {
  private _observer: ResizeObserver;

  constructor(
    onSizeChange: (sizeProps: SizeChangeProps) => void,
    debounceDelay?: number,
  ) {
    // Define the callback for the ResizeObserver
    let resizeCallback: ResizeObserverCallback = entries => {
      entries.forEach(entry => {
        const { width, height } = entry.contentRect;

        // Invoke the onSizeChange callback with the new dimensions
        onSizeChange({ width, height, element: entry.target });
      });
    };

    // Apply debouncing if debounceDelay is provided
    if (typeof debounceDelay !== "undefined") {
      resizeCallback = debounce(resizeCallback, debounceDelay);
    }

    // Initialize the ResizeObserver with the callback
    this._observer = new ResizeObserver(resizeCallback);
  }

  public observe(target: Element): void {
    this._observer.observe(target);
  }

  public unobserve(target: Element): void {
    this._observer.unobserve(target);
  }

  public disconnect(): void {
    this._observer.disconnect();
  }
}

export default ResizeSensor;
