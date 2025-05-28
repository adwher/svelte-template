import { autoUpdate, computePosition, type Middleware, type Placement } from "@floating-ui/dom";

export type FloatingPlacement = Placement;

export interface FloatingStateOptions {
  /**
   * The placement of floating element.
   * @default "top"
   */
  placement?: FloatingPlacement;

  /** Additional middlewares to modify the position of the floating element. */
  middlewares?: Middleware[];
}

/**
 * The event type that can be used to trigger the floating element.
 * It can be a `PointerEvent` or a `FocusEvent`.
 */
export type FloatingTriggerEvent = PointerEvent | FocusEvent;

/**
 * Represents the state and behavior of a floating UI element, such as a tooltip or dropdown.
 * This class manages the visibility, positioning, and interaction of the floating element relative to an anchor element.
 *
 * @remarks
 * The `FloatingState` class provides methods to show, hide, and toggle the visibility of the floating element. It also handles positioning using middlewares and updates the position dynamically when the anchor or floating element changes.
 */
export class FloatingState {
  /** The options to configure the floating element. */
  #options: Required<FloatingStateOptions>;

  /** The middlewares to be used for computing the position of floating element. */
  #middlewares: Middleware[] = [];

  /**
   * Whether the floating element is visible.
   * @state
   */
  visible = $state(false);

  /**
   * The current placement of floating element.
   * @state
   */
  placement: FloatingPlacement = $state("top");

  /** The anchor element that triggered the floating element. */
  #anchor: HTMLElement | null = $state(null);

  /** Reference to the the floating element. */
  #binding: HTMLElement | null = $state(null);

  /** The unsubscribe function to stop updating the floating element. */
  #unsubscribe: (() => void) | null = null;

  constructor({ placement = "top", middlewares = [] }: FloatingStateOptions) {
    this.placement = placement;

    this.#options = { placement, middlewares };
    this.#middlewares = middlewares;
  }

  /**
   * The anchor element that triggered the floating element.
   * @bindable
   */
  get anchor() {
    return this.#anchor;
  }

  set anchor(value: HTMLElement | null) {
    this.#anchor = value;
    this.#subscribe();
  }

  /**
   * Reference to the the floating element.
   * @bindable
   */
  get binding() {
    return this.#binding;
  }

  set binding(value: HTMLElement | null) {
    this.#binding = value;
    this.#subscribe();
  }

  /**
   * Handles mouse or focus events, preventing their default behavior and setting the current target element as the anchor.
   * @param event - The event object, which can be either a `MouseEvent`, `FocusEvent` or `PointerEvent`. The `currentTarget` property of the event is used to determine the anchor element.
   */
  #catchEvent = (event?: FloatingTriggerEvent) => {
    const target = event?.currentTarget;

    if (!event || !target) {
      return;
    }

    this.anchor = target as HTMLElement;
  };

  /**
   * Shows the floating element.
   * @param event The event that triggered the action.
   */
  show = (event?: FloatingTriggerEvent) => {
    this.#catchEvent(event);
    this.visible = true;
  };

  /**
   * Toggles the visibility of the floating element.
   * @param event The event that triggered the action.
   */
  toggle = (event?: FloatingTriggerEvent) => {
    this.#catchEvent(event);
    this.visible = !this.visible;
  };

  /**
   * Hides the floating element and resets the anchor element.
   */
  hide = () => {
    this.visible = false;
  };

  /** Refreshes the position of the floating element. */
  #refreshPosition = async () => {
    if (!this.#anchor || !this.#binding) {
      return;
    }

    const position = await computePosition(this.#anchor, this.#binding, {
      placement: this.#options.placement,
      middleware: this.#middlewares,
    });

    this.placement = position.placement;

    this.#binding.style.top = `${position.y}px`;
    this.#binding.style.left = `${position.x}px`;
  };

  /** Subscribes to the anchor and binding elements to update the position of the floating element. */
  #subscribe = () => {
    if (this.#unsubscribe) {
      this.#unsubscribe();
    }

    if (!this.#anchor || !this.#binding) {
      return;
    }

    const cleanup = autoUpdate(this.#anchor, this.#binding, this.#refreshPosition, {
      elementResize: false,
    });

    this.#unsubscribe = () => {
      cleanup();
      this.#unsubscribe = null;
    };
  };
}
