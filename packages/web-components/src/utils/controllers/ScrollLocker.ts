type LockOptions = {
  reserveScrollBarGap?: boolean;
  allowTouchMove?: (element: HTMLElement) => boolean;
};

type Lock = {
  targetElement: HTMLElement;
  options?: LockOptions;
};

type HandleScrollEvent = TouchEvent;

class ScrollLocker {
  private _locks: Array<Lock> = [];

  private _cachedBodySettings: {
    overflow: string;
    positioning: {
      position: string;
      left: string;
      right: string;
      top: string;
    } | null;
    paddingRight: string;
  } = {
    overflow: "",
    positioning: null,
    paddingRight: "",
  };

  constructor() {
    this._preventDefault = this._preventDefault.bind(this);
  }

  /**
   * Returns true if `element` should be allowed to receive touchmove events.
   */
  public _allowTouchMove(element: HTMLElement): boolean {
    return this._locks.some(
      lock => lock.options?.allowTouchMove?.(element) ?? false,
    );
  }

  private _preventDefault(rawEvent: HandleScrollEvent): boolean {
    const event = rawEvent;

    // For the case whereby consumers adds a touchmove event listener to document.
    // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
    // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
    // the touchmove event on document will break.
    if (this._allowTouchMove(event.target as HTMLElement)) return true;

    // Do not prevent if the event has more than one touch
    // (usually meaning this is a multi touch gesture like pinch to zoom).
    if (event.touches.length > 1) return true;

    if (event.preventDefault) event.preventDefault();

    return false;
  }

  private _setOverflowHidden(options?: LockOptions) {
    const { reserveScrollBarGap = true } = options ?? {};

    if (!this._cachedBodySettings.paddingRight) {
      const scrollBarGap =
        window.innerWidth - document.documentElement.clientWidth;

      if (reserveScrollBarGap && scrollBarGap > 0) {
        const computedBodyPaddingRight = parseInt(
          window
            .getComputedStyle(document.body)
            .getPropertyValue("padding-right"),
          10,
        );

        this._cachedBodySettings.paddingRight =
          document.body.style.paddingRight;

        document.body.style.paddingRight = `${computedBodyPaddingRight + scrollBarGap}px`;
      }
    }

    if (!this._cachedBodySettings.overflow) {
      this._cachedBodySettings.overflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
  }

  private _restoreOverflowSetting() {
    document.body.style.paddingRight = this._cachedBodySettings.paddingRight;
    this._cachedBodySettings.paddingRight = "";

    document.body.style.overflow = this._cachedBodySettings.overflow;
    this._cachedBodySettings.overflow = "";
  }

  public lock(targetElement: HTMLElement, options?: LockOptions): void {
    const alreadyLocked = this._locks.some(
      lock => lock.targetElement === targetElement,
    );

    if (alreadyLocked) return;

    const lock: Lock = {
      targetElement,
      options,
    };

    this._locks.push(lock);
    this._setOverflowHidden(options);
  }

  public clearLocks(): void {
    this._restoreOverflowSetting();

    this._locks = [];
  }

  public unlock(targetElement: HTMLElement): void {
    this._locks = this._locks.filter(
      lock => lock.targetElement !== targetElement,
    );

    this._restoreOverflowSetting();
  }
}

export default ScrollLocker;
