import { inside } from "$lib/shared/floating.ts";

import {
  FloatingState,
  type FloatingPlacement,
  type FloatingStateOptions,
} from "./floating.svelte.ts";

export interface DialogStateOptions extends Omit<FloatingStateOptions, "middlewares"> {
  /**
   * The placement of the floating element relative to the anchor.
   * @default "top"
   */
  placement?: FloatingPlacement;

  /**
   * The padding between the anchor, the border of the screen and the floating element.
   * @default 16
   */
  padding?: number;
}

/**
 * Represents the state of a dialog component, extending the functionality of `FloatingState`.
 * This class manages the visibility and positioning of a floating dialog element.
 */
export class DialogState extends FloatingState {
  /** The padding between the anchor, the border of the screen and the floating element. */
  readonly padding: number = 16;

  constructor({ padding = 16, placement = "top" }: DialogStateOptions = {}) {
    super({
      placement,
      middlewares: [inside(padding)],
    });

    this.padding = padding;
  }

  // Override the `show` method to avoid overlapping with the anchor.
  override show = () => {
    this.visible = true;
  };
}
