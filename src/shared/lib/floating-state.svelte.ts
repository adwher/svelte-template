import { autoUpdate, computePosition, type Placement, type Middleware } from "@floating-ui/dom";
import type { Attachment } from "svelte/attachments";

type AnchorEvent = PointerEvent | FocusEvent;

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

export class FloatingState {
  /** The options to configure the floating element. */
  #options: Required<FloatingStateOptions>;
  /** The middlewares to be used for computing the position of floating element. */
  #middlewares: Middleware[] = [];

  /** The anchor element that triggered the floating element. */
  anchor: HTMLElement | null = null;
  /** The element that is being floated. */
  element: HTMLElement | null = null;

  /** A callback when unmounting a floating element. */
  #unsubscribe: (() => void) | null = null;

  /** Whether the floating element is visible. */
  visible = $state(false);
  /** The current placement of floating element. */
  placement: FloatingPlacement = $state("top");

  constructor({ placement = "top", middlewares = [] }: FloatingStateOptions) {
    this.placement = placement;

    this.#options = { placement, middlewares };
    this.#middlewares = middlewares;
  }

  /**
   * Attaches an anchor element to the floating state.
   * @returns An attachment function for Svelte components.
   */
  from(): Attachment<HTMLElement> {
    return (node) => {
      this.anchor = node;
      this.#subscribe();

      return () => {
        this.anchor = null;
        this.#unsubscribe?.();
      };
    };
  }

  /**
   * Attaches an element to the floating state.
   * @returns An attachment function for Svelte components.
   */
  to(): Attachment<HTMLElement> {
    return (node) => {
      this.element = node;
      this.#subscribe();

      return () => {
        this.element = null;
        this.#unsubscribe?.();
      };
    };
  }

  #catchAnchorEvent(event?: AnchorEvent) {
    const target = event?.currentTarget;

    if (!event || !target) {
      return;
    }

    this.anchor = target as HTMLElement;
  }

  /**
   * Shows the floating element.
   * @param event The event that triggered the action.
   */
  show = (event?: AnchorEvent) => {
    this.#catchAnchorEvent(event);
    this.visible = true;
  };

  /**
   * Toggles the visibility of the floating element.
   * @param event The event that triggered the action.
   */
  toggle = (event?: AnchorEvent) => {
    this.#catchAnchorEvent(event);
    this.visible = !this.visible;
  };

  /**
   * Hides the floating element.
   */
  hide = () => {
    this.visible = false;
  };

  #refreshPosition = async () => {
    if (!this.anchor || !this.element) {
      return;
    }

    const position = await computePosition(this.anchor, this.element, {
      placement: this.#options.placement,
      middleware: this.#middlewares,
    });

    this.placement = position.placement;

    this.element.style.top = `${position.y}px`;
    this.element.style.left = `${position.x}px`;
  };

  #subscribe = () => {
    if (this.#unsubscribe) {
      this.#unsubscribe();
    }

    if (!this.anchor || !this.element) {
      return;
    }

    const stopAutoUpdate = autoUpdate(this.anchor, this.element, this.#refreshPosition, {
      elementResize: false,
    });

    this.#unsubscribe = () => {
      stopAutoUpdate();
      this.#unsubscribe = null;
    };
  };
}
