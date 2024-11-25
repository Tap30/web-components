export type ValidityAndMessage = {
  /**
   * The validity flags.
   */
  validity: ValidityStateFlags;

  /**
   * The validation message for the associated flags. It may not be an empty
   * string if any of the validity flags are `true`.
   */
  validationMessage: string;
};

/**
 * A class that computes and caches `ValidityStateFlags` for a component with
 * a given `State` interface.
 *
 * Cached performance before computing validity is important since constraint
 * validation must be checked frequently and synchronously when properties
 * change.
 *
 * @template State The expected interface of properties relevant to constraint
 *     validation.
 */
abstract class Validator<State> {
  private _prevState?: State;

  private _currentValidity: ValidityAndMessage = {
    validity: {},
    validationMessage: "",
  };

  private readonly _getCurrentState: () => State;

  /**
   * @param getCurrentState A callback that returns the current state of
   * constraint validation-related properties.
   */
  constructor(getCurrentState: () => State) {
    this._getCurrentState = getCurrentState;
  }

  /**
   * Returns the current `ValidityStateFlags` and validation message for the
   * validator.
   *
   * If the constraint validation state has not changed, this will return a
   * cached result. This is important since `getValidity()` can be called
   * frequently in response to synchronous property changes.
   */
  public getValidity(): ValidityAndMessage {
    const state = this._getCurrentState();
    const hasStateChanged =
      !this._prevState || !this.equals(this._prevState, state);

    if (!hasStateChanged) return this._currentValidity;

    const { validity, validationMessage } = this.computeValidity(state);

    this._prevState = this.copy(state);
    this._currentValidity = {
      validationMessage,
      validity: {
        badInput: validity.badInput,
        customError: validity.customError,
        patternMismatch: validity.patternMismatch,
        rangeOverflow: validity.rangeOverflow,
        rangeUnderflow: validity.rangeUnderflow,
        stepMismatch: validity.stepMismatch,
        tooLong: validity.tooLong,
        tooShort: validity.tooShort,
        typeMismatch: validity.typeMismatch,
        valueMissing: validity.valueMissing,
      },
    };

    return this._currentValidity;
  }

  /**
   * Computes the `ValidityStateFlags` and validation message for a given set
   * of constraint validation properties.
   *
   * Implementations can use platform elements like `<input>` and `<select>` to
   * sync state and compute validation along with i18n'd messages. This function
   * may be expensive, and is only called when state changes.
   *
   * @param state The new state of constraint validation properties.
   */
  protected abstract computeValidity(state: State): ValidityAndMessage;

  /**
   * Checks if two states are equal. This is used to check against cached state
   * to see if validity needs to be re-computed.
   *
   * @param prev The previous state.
   * @param next The next state.
   */
  protected abstract equals(prev: State, next: State): boolean;

  /**
   * Creates a copy of a state. This is used to cache state and check if it
   * changes.
   *
   * Note: do NOT spread the {...state} to copy it. The actual state object is
   * a web component, and trying to spread its getter/setter properties won't
   * work.
   *
   * @param state The state to copy.
   */
  protected abstract copy(state: State): State;
}

export default Validator;
