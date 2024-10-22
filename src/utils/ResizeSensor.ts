import debounce from "./debounce";

export type SizeChangeProps = {
  width: number;
  height: number;
  element: Element;
};

class ResizeSensor {
  private _observer: ResizeObserver;

  constructor(
    onSizeChange: (sizeProps: SizeChangeProps) => void,
    debounceDelay?: number,
  ) {
    let resizeCallback: ResizeObserverCallback = entries => {
      entries.forEach(entry => {
        const { width, height } = entry.contentRect;

        onSizeChange({ width, height, element: entry.target });
      });
    };

    if (typeof debounceDelay !== "undefined") {
      resizeCallback = debounce(resizeCallback, debounceDelay);
    }

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
